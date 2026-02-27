import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import type { Tilstand } from "../types/cms";
import { getImageUrl } from "../lib/directus";
import styles from "../conditions/urinary-incontinence/components/section-content.module.css";

interface TilstandIntroductionProps {
    tilstand: Tilstand;
}

/** Normalize any YouTube / Vimeo URL or bare video ID to a proper embed URL. */
function toEmbedUrl(videoId: string): string {
    if (!videoId) return "";
    const id = videoId.trim();
    if (id.includes("youtube.com/embed/")) return id;
    if (id.includes("youtube.com/watch")) {
        const m = id.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        return m ? `https://www.youtube.com/embed/${m[1]}` : id;
    }
    if (id.includes("youtu.be/")) {
        const m = id.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
        return m ? `https://www.youtube.com/embed/${m[1]}` : id;
    }
    if (id.startsWith("http")) return id; // Vimeo or other
    // Bare 11-char YouTube ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(id)) {
        return `https://www.youtube.com/embed/${id}`;
    }
    return `https://player.vimeo.com/video/${id}`;
}

/**
 * Parse side_intro HTML:
 *  - extracts the FIRST <img> → returns its src + alt
 *  - strips h1/h2 headings (already shown as section title)
 *  - strips empty paragraphs (nbsp-only)
 *  - returns cleaned text HTML
 */
function parseSideIntro(html: string): { imgSrc: string; imgAlt: string; textHtml: string } {
    if (typeof document === "undefined") return { imgSrc: "", imgAlt: "", textHtml: html };

    const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
    const root = doc.body.firstChild as HTMLElement;
    if (!root) return { imgSrc: "", imgAlt: "", textHtml: html };

    // Extract first image
    const firstImg = root.querySelector("img");
    let imgSrc = "";
    let imgAlt = "";
    if (firstImg) {
        imgSrc = firstImg.getAttribute("src") || "";
        imgAlt = firstImg.getAttribute("alt") || "";
    }

    // Clone and clean for text content
    const clone = root.cloneNode(true) as HTMLElement;

    // Remove h1, h2 (section title already shown above)
    clone.querySelectorAll("h1, h2").forEach((el) => el.remove());

    // Remove elements containing <img>
    clone.querySelectorAll("img").forEach((img) => {
        const parent = img.closest("p, figure, div");
        if (parent) parent.remove();
        else img.remove();
    });

    // Remove nbsp-only paragraphs (caption lines full of spaces)
    clone.querySelectorAll("p").forEach((p) => {
        if (!p.textContent?.replace(/\u00a0|\s/g, "").trim()) p.remove();
    });

    return { imgSrc, imgAlt, textHtml: clone.innerHTML.trim() };
}

/**
 * Intro block shown above the section container.
 * Layout:
 *   TOP:        full-width image (not clickable)
 *   BOTTOM ROW: video left | intro text right
 */
export const TilstandIntroduction = ({ tilstand }: TilstandIntroductionProps) => {
    const { language } = useLanguage();
    const { resolvedTheme } = useTheme();

    const sideIntro = (language === "en" && tilstand.side_intro_en) || tilstand.side_intro;
    const videoId = tilstand.funksjon_video_id;
    const videoTitle = (language === "en" && tilstand.funksjon_video_tittel_en) || tilstand.funksjon_video_tittel || "Video";

    // Also support a dedicated side_intro_Image field (used by other conditions)
    const dedicatedImgSrc = tilstand.side_intro_Image ? getImageUrl(tilstand.side_intro_Image) : null;

    if (!sideIntro && !videoId && !dedicatedImgSrc) return null;

    // Parse the HTML to separate image from text
    const { imgSrc: parsedImgSrc, imgAlt, textHtml } = parseSideIntro(sideIntro || "");
    const finalImgSrc = dedicatedImgSrc || parsedImgSrc;
    const embedUrl = videoId ? toEmbedUrl(videoId) : "";

    const hasText = !!textHtml;

    if (!finalImgSrc && !embedUrl && !hasText) return null;

    return (
        <div className={`${styles.introductionContainer} ${resolvedTheme === "dark" ? styles.darkMode : ""}`}>

            {/* TOP — full-width image (not clickable) */}
            {finalImgSrc && (
                <img
                    src={finalImgSrc}
                    alt={imgAlt || tilstand.side_tittel || ""}
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        borderRadius: "10px",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                        marginBottom: "1.5rem",
                    }}
                />
            )}

            {/* BOTTOM ROW — video left | text right */}
            {(embedUrl || hasText) && (
                <div
                    className={styles.sideBySideContainer}
                    style={{ alignItems: "flex-start", margin: 0 }}
                >
                    {/* LEFT — video */}
                    {embedUrl && (
                        <div style={{ flex: "0 0 45%" }}>
                            <div style={{
                                position: "relative",
                                width: "100%",
                                paddingBottom: "56.25%",
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}>
                                <iframe
                                    src={embedUrl}
                                    title={videoTitle}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        position: "absolute", top: 0, left: 0,
                                        width: "100%", height: "100%", border: "none",
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* RIGHT — intro text */}
                    {hasText && (
                        <div
                            style={{ flex: 1 }}
                            className={styles.introductionText}
                            dangerouslySetInnerHTML={{ __html: textHtml }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
