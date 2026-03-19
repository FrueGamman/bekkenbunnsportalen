type VideoProvider = "youtube" | "vimeo";

const YOUTUBE_ID_RE = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/i;
const VIMEO_ID_RE = /(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/i;

function extractYouTubeId(input: string): string | null {
  const match = input.match(YOUTUBE_ID_RE);
  return match?.[1] ?? null;
}

function extractVimeoId(input: string): string | null {
  const match = input.match(VIMEO_ID_RE);
  return match?.[1] ?? null;
}

export function toVideoEmbed(input: string): { provider: VideoProvider; embedUrl: string; id: string } | null {
  const raw = (input || "").trim();
  if (!raw) return null;

  const youtubeId = extractYouTubeId(raw);
  if (youtubeId) {
    return {
      provider: "youtube",
      id: youtubeId,
      embedUrl: `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`,
    };
  }

  const vimeoId = extractVimeoId(raw);
  if (vimeoId) {
    return {
      provider: "vimeo",
      id: vimeoId,
      embedUrl: `https://player.vimeo.com/video/${vimeoId}`,
    };
  }

  // Allow plain IDs in CMS content, e.g. "Vimeo: 955797868" or "YouTube: ZTMpEr6GLp8"
  const vimeoPlain = raw.match(/vimeo\s*:\s*(\d{6,})/i)?.[1];
  if (vimeoPlain) {
    return {
      provider: "vimeo",
      id: vimeoPlain,
      embedUrl: `https://player.vimeo.com/video/${vimeoPlain}`,
    };
  }

  const ytPlain = raw.match(/youtube\s*:\s*([a-z0-9_-]{6,})/i)?.[1];
  if (ytPlain) {
    return {
      provider: "youtube",
      id: ytPlain,
      embedUrl: `https://www.youtube.com/embed/${ytPlain}?rel=0&modestbranding=1`,
    };
  }

  return null;
}

function makeEmbedHtml(embedUrl: string, title: string) {
  const safeTitle = (title || "").replace(/"/g, "&quot;");
  const safeSrc = embedUrl.replace(/"/g, "%22");
  return `
<div class="directus-video-embed">
  <div class="directus-video-embed__inner">
    <iframe
      src="${safeSrc}"
      title="${safeTitle}"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowfullscreen
    ></iframe>
  </div>
</div>`.trim();
}

function isLinkOnlyBlock(el: Element) {
  const text = (el.textContent || "").replace(/\u00a0/g, " ").trim();
  const links = el.querySelectorAll("a");
  if (links.length !== 1) return false;
  const onlyLink = links[0];
  const linkText = (onlyLink.textContent || "").replace(/\u00a0/g, " ").trim();
  // Treat as link-only if the visible text is just the link text (or URL).
  return text === linkText || text === (onlyLink.getAttribute("href") || "").trim();
}

/**
 * Turns Vimeo/YouTube links (or "Vimeo: 123" / "YouTube: abc") inside CMS rich text into responsive embeds.
 * This lets editors paste simple links/IDs in Directus while users see the video immediately.
 */
export function transformRichTextEmbeds(html: string): string {
  const input = (html || "").trim();
  if (!input) return html;

  if (typeof DOMParser === "undefined") return html;

  try {
    const doc = new DOMParser().parseFromString(`<div>${input}</div>`, "text/html");
    const root = doc.body.firstChild as HTMLElement | null;
    if (!root) return html;

    // 1) Convert anchor links.
    const anchors = Array.from(root.querySelectorAll("a"));
    anchors.forEach((a) => {
      const href = (a.getAttribute("href") || "").trim();
      const embed = toVideoEmbed(href);
      if (!embed) return;

      const title = (a.textContent || "").trim() || (embed.provider === "vimeo" ? "Vimeo video" : "YouTube video");
      const wrapper = a.closest("p, div, figure") || a.parentElement;
      if (!wrapper) return;

      const embedHtml = makeEmbedHtml(embed.embedUrl, title);

      if (wrapper && isLinkOnlyBlock(wrapper)) {
        wrapper.outerHTML = embedHtml;
      } else {
        wrapper.insertAdjacentHTML("afterend", embedHtml);
      }
    });

    // 2) Convert plain "Vimeo: 123" / "YouTube: abc" lines that editors might paste.
    const candidates = Array.from(root.querySelectorAll("p, li, div"));
    candidates.forEach((el) => {
      if (el.querySelector("iframe, a")) return;
      const text = (el.textContent || "").replace(/\u00a0/g, " ").trim();
      const embed = toVideoEmbed(text);
      if (!embed) return;

      const title = embed.provider === "vimeo" ? "Vimeo video" : "YouTube video";
      el.outerHTML = makeEmbedHtml(embed.embedUrl, title);
    });

    return root.innerHTML;
  } catch {
    return html;
  }
}

