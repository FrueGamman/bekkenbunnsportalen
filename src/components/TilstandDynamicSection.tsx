import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { SectionAccordion } from "./SectionAccordion";
import { CommonExerciseSection, type ExerciseStep, type GenderInstruction, type Video, type SmartphoneApps } from "./CommonExerciseSection";
import { ImageModal } from "./ui/ImageModal";
import type { Tilstand, TilstandAccordionItem, TilstandUnderseksjon } from "../types/cms";
import { getImageUrl } from "../lib/directus";
import styles from "../conditions/urinary-incontinence/components/section-content.module.css";

/** One container for paragraph + single image; for intro only, uses block layout when image is horizontal. */
function ParagraphWithImageContainer({
    content,
    image,
    isIntro,
    setSelectedImage,
}: {
    content: React.ReactNode;
    image: { src: string; alt: string; caption: string };
    isIntro: boolean;
    setSelectedImage: (x: { src: string; alt: string }) => void;
}) {
    const [useBlockLayout, setUseBlockLayout] = useState(false);
    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (!isIntro) return;
        const img = e.currentTarget;
        if (img.naturalWidth >= img.naturalHeight) setUseBlockLayout(true);
    };
    const containerClass = useBlockLayout
        ? `${styles.sideBySideContainer} ${styles.sideBySideContainerBlock}`
        : styles.sideBySideContainer;
    return (
        <div className={containerClass}>
            <div className={styles.sideBySideText}>{content}</div>
            <div className={styles.sideBySideImage}>
                <div className={styles.anatomyItem}>
                    <img
                        src={image.src}
                        alt={image.alt}
                        className={styles.anatomyImage}
                        onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedImage({ src: image.src, alt: image.alt });
                            }
                        }}
                        onLoad={onImageLoad}
                        role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                        tabIndex={0}
                        style={{ cursor: "pointer" }}
                    />
                    {image.caption && (
                        <p className={styles.sideBySideImageCaption}>{image.caption}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

interface TilstandDynamicSectionProps {
    tilstand: Tilstand;
    activeSection: string;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export const TilstandDynamicSection = ({
    tilstand,
    activeSection,
}: TilstandDynamicSectionProps) => {
    const { language } = useLanguage();
    const { resolvedTheme } = useTheme();
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

    // -----------------------------------------------------------------------
    // Section → field prefix mapping
    // -----------------------------------------------------------------------
    const sectionMap: Record<string, string> = {
        "normal-functions": "funksjon",
        "symptoms": "symptomer",
        "causes": "arsaker",
        "diagnosis": "utredning",
        "treatment": "behandling",
        "exercises": "ovelse",
        "resources": "ressurser",
        "references": "referanser",
        "textbook": "funksjon",
    };

    const prefix = sectionMap[activeSection];
    if (!prefix) return null;

    // -----------------------------------------------------------------------
    // Section icon
    // -----------------------------------------------------------------------
    const sectionIconMap: Record<string, string> = {
        "normal-functions": "/inNormal.svg",
        "symptoms": "/inSymptoms.png",
        "causes": "/couse.png",
        "diagnosis": "/solae.png",
        "treatment": "/treat.png",
        "exercises": "/exercises.png",
        "resources": "/resource.png",
        "references": "/resource.png",
        "textbook": "/inNormal.svg",
    };

    const conditionSlug = (tilstand as { slug?: string }).slug;
    const sectionIcon =
        conditionSlug === "urinary-incontinence" && activeSection === "treatment"
            ? "/solae.png"
            : (sectionIconMap[activeSection] ?? "/inNormal.svg");

    // -----------------------------------------------------------------------
    // CMS field extraction
    // -----------------------------------------------------------------------
    const t = tilstand as unknown as Record<string, any>;

    const title = ((language === "en" && t[`${prefix}_tittel_en`]) ||
        t[`${prefix}_tittel`]) as string | undefined;

    const intro = ((language === "en" && t[`${prefix}_intro_en`]) ||
        t[`${prefix}_intro`]) as string | undefined;

    let trekkspill = t[`${prefix}_trekkspill`] as TilstandAccordionItem[] | string | undefined;
    if (typeof trekkspill === "string" && trekkspill.trim()) {
        try {
            trekkspill = JSON.parse(trekkspill) as TilstandAccordionItem[];
        } catch {
            trekkspill = undefined;
        }
    }

    const sitat = ((language === "en" && t[`${prefix}_sitat_en`]) ||
        t[`${prefix}_sitat`]) as string | undefined;

    const sitatKilde = ((language === "en" && t[`${prefix}_sitat_kilde_en`]) ||
        t[`${prefix}_sitat_kilde`]) as string | undefined;

    // -----------------------------------------------------------------------
    // Helper: build exercise props from Directus structured fields
    // (used for exercises page, treatment injection, and exercise accordions)
    // -----------------------------------------------------------------------
    const buildExerciseComponentProps = () => {
        const tryTitle = ((language === "en" && t.ovelse_try_yourself_title_en) ||
            t.ovelse_try_yourself_title || "") as string;
        const step1Text = ((language === "en" && t.ovelse_step1_text_en) ||
            t.ovelse_step1_text || "") as string;
        const tipsTitle = ((language === "en" && t.ovelse_tips_title_en) ||
            t.ovelse_tips_title || "") as string;
        const tipsText = ((language === "en" && t.ovelse_tips_text_en) ||
            t.ovelse_tips_text || "") as string;
        const videoSectionTitle = ((language === "en" && t.ovelse_video_section_title_en) ||
            t.ovelse_video_section_title || "") as string;
        const videoSectionDesc = ((language === "en" && t.ovelse_video_section_description_en) ||
            t.ovelse_video_section_description || "") as string;

        const videosRaw = (t.ovelse_videos as { src: string; title?: string; title_en?: string }[] | null) || [];
        const stepsRaw = (t.ovelse_steps as { number: number; text?: string; text_en?: string }[] | null) || [];
        const genderRaw = (t.ovelse_gender_instructions as {
            title?: string; title_en?: string; text?: string; text_en?: string;
            icon?: string; iconColor?: string;
        }[] | null) || [];
        const appsRaw = t.ovelse_smartphone_apps as SmartphoneApps | null | undefined;

        // Extract per-video titles from description headings when videos lack titles
        let descHeadings: string[] = [];
        if (videoSectionDesc) {
            try {
                const descDoc = new DOMParser().parseFromString(`<div>${videoSectionDesc}</div>`, "text/html");
                descHeadings = Array.from(descDoc.querySelectorAll("h4, h5"))
                    .map((el) => el.textContent?.trim() || "")
                    .filter(Boolean);
            } catch { /* ignore */ }
        }

        const videos: Video[] = videosRaw.map((v, i) => ({
            src: v.src,
            title: (language === "en" && v.title_en)
                ? v.title_en
                : (v.title || descHeadings[i] || ""),
        }));

        const exerciseSteps: ExerciseStep[] = stepsRaw
            .sort((a, b) => a.number - b.number)
            .map((s) => ({
                number: s.number,
                text: (language === "en" && s.text_en) ? s.text_en : (s.text || ""),
            }));

        const genderInstructions: GenderInstruction[] = genderRaw.map((g) => ({
            title: (language === "en" && g.title_en) ? g.title_en : (g.title || ""),
            text: (language === "en" && g.text_en) ? g.text_en : (g.text || ""),
            icon: g.icon || "",
            iconColor: g.iconColor || "#053870",
        }));

        const app = appsRaw as Record<string, string | undefined> | null | undefined;
        const smartphoneApps: SmartphoneApps | undefined = app
            ? {
                title: (language === "en" && app.title_en) ? app.title_en : (app.title || ""),
                description: (language === "en" && app.description_en) ? app.description_en : (app.description || ""),
                linkText: (language === "en" && app.linkText_en) ? app.linkText_en : (app.linkText || ""),
                linkUrl: app.linkUrl || "",
            }
            : undefined;

        const hasStructured = !!(tryTitle || step1Text || videoSectionTitle || videosRaw.length > 0);
        // Suppress description if headings were extracted (avoids duplicate h4 rendering)
        const finalVideoSectionDesc = descHeadings.length > 0 ? undefined : (videoSectionDesc || undefined);

        return {
            tryTitle, step1Text, tipsTitle, tipsText,
            videoSectionTitle, videoSectionDesc: finalVideoSectionDesc,
            videos, exerciseSteps, genderInstructions, smartphoneApps,
            hasStructured,
        };
    };

    // -----------------------------------------------------------------------
    // Exercises section — when structured Directus fields are present, render
    // quote (if any) then CommonExerciseSection so quote is visible.
    // -----------------------------------------------------------------------
    if (activeSection === "exercises") {
        const exProps = buildExerciseComponentProps();
        if (exProps.hasStructured) {
            return (
                <>
                    {sitat && (
                        <div className={styles.highlightBox}>
                            <blockquote className={styles.patientQuote}>
                                <p className={styles.quoteText}>"{sitat}"</p>
                                {sitatKilde && <cite className={styles.quoteAuthor}>— {sitatKilde}</cite>}
                            </blockquote>
                        </div>
                    )}
                    <CommonExerciseSection
                        pageTitle={title || (language === "no" ? "Øvelser" : "Exercises")}
                        tryYourselfTitle={exProps.tryTitle}
                        step1Text={exProps.step1Text}
                        genderInstructions={exProps.genderInstructions}
                        tipsTitle={exProps.tipsTitle}
                        tipsText={exProps.tipsText}
                        exerciseSteps={exProps.exerciseSteps}
                        videoSectionTitle={exProps.videoSectionTitle}
                        videoSectionDescription={exProps.videoSectionDesc}
                        videos={exProps.videos}
                        smartphoneApps={exProps.smartphoneApps}
                    />
                </>
            );
        }
    }

    // -----------------------------------------------------------------------
    // Diagnosis intro parsing — urinary-incontinence only
    // Extracts: blockquote → testimonial, first img → side image, rest → paragraphs
    // -----------------------------------------------------------------------
    const isDiagnosisSection = activeSection === "diagnosis";
    const diagnosisParsed = (() => {
        if (!isDiagnosisSection || !intro || conditionSlug !== "urinary-incontinence") return null;
        try {
            const doc = new DOMParser().parseFromString(`<div>${intro}</div>`, "text/html");
            const root = doc.body.firstChild as HTMLElement;
            if (!root) return null;

            let testimonial = sitat || "";
            let attribution = sitatKilde || "";
            let imageSrc = "";
            let imageAlt = "";

            const bq = root.querySelector("blockquote");
            if (bq && !sitat) {
                const texts = Array.from(bq.querySelectorAll("p"))
                    .map((p) => p.textContent?.trim() || "")
                    .filter(Boolean);
                testimonial = texts.length >= 2 ? texts.slice(0, -1).join(" ") : (texts[0] || "");
                if (texts.length >= 2) attribution = texts[texts.length - 1];
                bq.remove();
            }

            const img = root.querySelector("img");
            if (img) {
                imageSrc = img.getAttribute("src") || "";
                imageAlt = img.getAttribute("alt") || "";
                const wrap = img.closest("p, figure") as HTMLElement | null;
                if (wrap && wrap !== root) wrap.remove();
                else img.remove();
            }

            const paragraphs: string[] = [];
            Array.from(root.childNodes).forEach((node) => {
                const n = node as HTMLElement;
                if (n.nodeType === 3 && n.textContent?.trim()) {
                    paragraphs.push(`<p>${n.textContent.trim()}</p>`);
                } else if (n.nodeType === 1 && n.textContent?.trim()) {
                    paragraphs.push(n.outerHTML);
                }
            });

            return { testimonial, attribution, imageSrc, imageAlt, paragraphs };
        } catch {
            return null;
        }
    })();

    // -----------------------------------------------------------------------
    // Treatment section — compute exercise accordion items to inject after
    // the "Konservativ behandling" accordion (urinary-incontinence only).
    // -----------------------------------------------------------------------
    let exerciseSectionItems: TilstandAccordionItem[] | null = null;
    if (activeSection === "treatment" && conditionSlug === "urinary-incontinence") {
        let ovelseTrekkspill = t.ovelse_trekkspill as TilstandAccordionItem[] | string | undefined;
        if (typeof ovelseTrekkspill === "string" && ovelseTrekkspill.trim()) {
            try {
                ovelseTrekkspill = JSON.parse(ovelseTrekkspill) as TilstandAccordionItem[];
            } catch {
                ovelseTrekkspill = undefined;
            }
        }
        if (Array.isArray(ovelseTrekkspill) && ovelseTrekkspill.length > 0) {
            exerciseSectionItems = ovelseTrekkspill;
        } else {
            // Fall back to building synthetic accordion items from structured fields
            const exProps = buildExerciseComponentProps();
            if (exProps.hasStructured) {
                const esc = (s: string) =>
                    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                const syntheticItems: TilstandAccordionItem[] = [];

                // "Try yourself" accordion item
                const videosRaw = (t.ovelse_videos as { src: string; title?: string; title_en?: string }[] | null) || [];
                const stepsRaw = (t.ovelse_steps as { number: number; text?: string; text_en?: string }[] | null) || [];
                const genderRaw = (t.ovelse_gender_instructions as {
                    title?: string; title_en?: string; text?: string; text_en?: string;
                    icon?: string; iconColor?: string;
                }[] | null) || [];
                const app = t.ovelse_smartphone_apps as Record<string, string | undefined> | null | undefined;

                let tryHtml = "";
                if (exProps.step1Text) tryHtml += `<p><strong>1.</strong> ${esc(exProps.step1Text)}</p>`;
                genderRaw.forEach((g) => {
                    const gTitle = (language === "en" && g.title_en) ? g.title_en : (g.title || "");
                    const gText = (language === "en" && g.text_en) ? g.text_en : (g.text || "");
                    tryHtml += `<p><strong>${esc(g.icon || "")} ${esc(gTitle)}</strong></p><p>${esc(gText)}</p>`;
                });
                if (exProps.tipsTitle || exProps.tipsText) {
                    tryHtml += `<blockquote><p><strong>${esc(exProps.tipsTitle)}</strong></p><p>${esc(exProps.tipsText)}</p></blockquote>`;
                }
                stepsRaw.sort((a, b) => a.number - b.number).forEach((s) => {
                    const sText = (language === "en" && s.text_en) ? s.text_en : (s.text || "");
                    tryHtml += `<p><strong>${s.number}.</strong> ${esc(sText)}</p>`;
                });
                if (exProps.tryTitle && tryHtml) {
                    syntheticItems.push({ tittel: exProps.tryTitle, innhold: tryHtml });
                }

                // Video accordion item
                let videoHtml = "";
                if (exProps.videoSectionDesc) videoHtml += `<p>${esc(exProps.videoSectionDesc)}</p>`;
                videosRaw.forEach((v) => {
                    const vTitle = (language === "en" && v.title_en) ? v.title_en : (v.title || "");
                    if (vTitle) videoHtml += `<p><strong>${esc(vTitle)}</strong></p>`;
                    videoHtml += `<div style="position:relative;padding-bottom:56.25%;height:0;margin:1rem 0"><iframe src="${v.src}" title="${esc(vTitle)}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;border-radius:8px" allowfullscreen loading="lazy"></iframe></div>`;
                });
                if (app) {
                    const appTitle = (language === "en" && app.title_en) ? app.title_en : (app.title || "");
                    const appDesc = (language === "en" && app.description_en) ? app.description_en : (app.description || "");
                    const appLinkText = (language === "en" && app.linkText_en) ? app.linkText_en : (app.linkText || "");
                    videoHtml += `<blockquote><p><strong>${esc(appTitle)}</strong></p><p>${esc(appDesc)}</p><p><a href="${app.linkUrl || ""}" target="_blank" rel="noopener noreferrer">${esc(appLinkText)}</a></p></blockquote>`;
                }
                if (exProps.videoSectionTitle && videoHtml) {
                    syntheticItems.push({ tittel: exProps.videoSectionTitle, innhold: videoHtml });
                }

                if (syntheticItems.length > 0) exerciseSectionItems = syntheticItems;
            }
        }
    }

    // -----------------------------------------------------------------------
    // Guard: nothing to render
    // -----------------------------------------------------------------------
    const hasTrekkspill = Array.isArray(trekkspill) && trekkspill.length > 0;
    if (!title && !intro && !hasTrekkspill && !sitat) return null;

    // Exercises: skip accordion items that duplicate the quote or intro blockquote (e.g. smartphone apps shown in intro + accordion)
    const trekkspillToRender = ((): TilstandAccordionItem[] | undefined => {
        if (!Array.isArray(trekkspill)) return undefined;
        if (activeSection !== "exercises") return trekkspill;
        const norm = (s: string) => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
        const alreadyShown: string[] = [];
        if (sitat) alreadyShown.push(norm(sitat));
        if (intro) {
            try {
                const doc = new DOMParser().parseFromString(`<div>${intro}</div>`, "text/html");
                doc.querySelectorAll("blockquote").forEach((bq) => {
                    const t = norm(bq.textContent || "");
                    if (t.length > 15) alreadyShown.push(t);
                });
            } catch { /* ignore */ }
        }
        if (alreadyShown.length === 0) return trekkspill;
        return trekkspill.filter((item) => {
            const content = (language === "en" && item.innhold_en) ? item.innhold_en : item.innhold;
            if (typeof content !== "string" || !content.trim()) return true;
            const text = norm(content);
            if (text.length < 5) return true;
            for (const shown of alreadyShown) {
                if (text === shown) return false;
                if (shown.length > 20 && text.includes(shown) && text.length < shown.length + 120) return false;
                if (text.length > 20 && shown.includes(text) && shown.length < text.length + 120) return false;
            }
            return true;
        });
    })();

    // -----------------------------------------------------------------------
    // Utility helpers
    // -----------------------------------------------------------------------

    /** Language-aware field getter for accordion items */
    const getField = (item: TilstandAccordionItem, field: "tittel" | "innhold") => {
        const enField = `${field}_en` as keyof TilstandAccordionItem;
        return (language === "en" && item[enField]) ? String(item[enField]) : String(item[field]);
    };

    /** Slugify for deep-link anchors */
    const slugify = (text: string) => {
        const trimmed = (text || "").trim();
        const base = trimmed.replace(/^\s*\d+\.\s*/, "") || trimmed;
        return base
            .toLowerCase()
            .replace(/[ææ]/g, "ae")
            .replace(/[øø]/g, "o")
            .replace(/[åå]/g, "a")
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const isBlankHtml = (html: string) =>
        html.replace(/&nbsp;/gi, " ").replace(/\u00a0/g, " ").replace(/<[^>]*>/g, "").trim().length === 0;

    // -----------------------------------------------------------------------
    // parseContentAndImages — extracts images/captions from Directus HTML
    // -----------------------------------------------------------------------
    const parseContentAndImages = (
        html: string,
    ): { textHtml: string; images: { src: string; alt: string; caption: string }[] } => {
        if (!html) return { textHtml: "", images: [] };
        const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
        const root = doc.body.firstChild as HTMLElement;
        if (!root) return { textHtml: "", images: [] };

        const images: { src: string; alt: string; caption: string }[] = [];
        const captionTexts = new Set<string>();

        root.querySelectorAll("img").forEach((img) => {
            const src = img.getAttribute("src") || "";
            const alt = (img.getAttribute("alt") || "").trim();
            let caption = "";
            const figure = img.closest("figure");
            if (figure) {
                caption = figure.querySelector("figcaption")?.textContent?.trim() || "";
            } else {
                let nextEl: Element | null = img.nextElementSibling;
                const imgParent = img.parentElement;
                if (!nextEl && imgParent && imgParent !== root) nextEl = imgParent.nextElementSibling;
                if (nextEl?.tagName === "P") {
                    const capText = nextEl.textContent?.replace(/\u00a0/g, " ").trim() || "";
                    if (capText) { caption = capText; captionTexts.add(capText); }
                }
            }
            images.push({ src, alt, caption: caption || alt });
        });

        const clone = root.cloneNode(true) as HTMLElement;
        clone.querySelectorAll("figure").forEach((el) => el.remove());
        clone.querySelectorAll("div").forEach((div) => { if (div.querySelector("img")) div.remove(); });
        clone.querySelectorAll("img").forEach((img) => {
            const parent = img.parentElement;
            const nextSib = (parent && parent !== clone && parent.children.length <= 2)
                ? parent.nextElementSibling : img.nextElementSibling;
            if (parent && parent !== clone && parent.children.length <= 2) parent.remove();
            else img.remove();
            if (nextSib?.tagName === "P") {
                const txt = nextSib.textContent?.replace(/\u00a0/g, " ").trim() || "";
                if (!txt || captionTexts.has(txt)) nextSib.remove();
            }
        });
        clone.querySelectorAll("p, div").forEach((el) => {
            const txt = el.textContent?.replace(/\u00a0/g, " ").trim() || "";
            if (!txt && !el.querySelector("img, iframe")) el.remove();
        });

        return { textHtml: clone.innerHTML.trim(), images };
    };

    // -----------------------------------------------------------------------
    // renderRichText — renders HTML; blockquotes → highlightBox
    // -----------------------------------------------------------------------
    const renderRichText = (html: string, style?: React.CSSProperties): React.ReactNode => {
        if (!html) return null;
        const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
        const root = doc.body.firstChild as HTMLElement;
        if (!root) return <div className={styles.enhancedParagraph} style={style} dangerouslySetInnerHTML={{ __html: html }} />;

        const nodes = Array.from(root.childNodes);
        const hasBlockquote = nodes.some((n) => (n as HTMLElement).tagName === "BLOCKQUOTE");

        if (!hasBlockquote) {
            return <div className={styles.enhancedParagraph} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
        }

        return (
            <>
                {nodes.map((node, i) => {
                    const el = node as HTMLElement;
                    if (el.nodeType === 1 && el.tagName === "BLOCKQUOTE") {
                        return (
                            <div key={i} className={styles.highlightBox}>
                                <div dangerouslySetInnerHTML={{ __html: el.innerHTML }} />
                            </div>
                        );
                    }
                    if (el.nodeType === 1 && (el.textContent?.trim() || el.querySelector?.("iframe, video"))) {
                        return (
                            <div key={i} className={styles.enhancedParagraph} style={style}
                                dangerouslySetInnerHTML={{ __html: el.outerHTML }} />
                        );
                    }
                    return null;
                })}
            </>
        );
    };

    // -----------------------------------------------------------------------
    // parseResourceItems — two CMS formats supported
    // -----------------------------------------------------------------------
    type ResourceTableItem = {
        title: string; description: string; type: string;
        links: { text: string; url: string }[];
    };

    const parseResourceItems = (html: string): ResourceTableItem[] | null => {
        if (!html?.trim()) return null;
        try {
            const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
            const root = doc.body.firstChild as HTMLElement;
            if (!root) return null;
            const items: ResourceTableItem[] = [];

            // Format A: .resource-item divs
            const divs = root.querySelectorAll(".resource-item, div.resource-item");
            if (divs.length > 0) {
                divs.forEach((div) => {
                    const title = div.querySelector("h4")?.textContent?.trim() || "";
                    let description = "", type = "";
                    const links: { text: string; url: string }[] = [];
                    div.querySelectorAll("p").forEach((p) => {
                        const anchors = p.querySelectorAll("a");
                        if (anchors.length > 0) {
                            anchors.forEach((a) => links.push({ text: a.textContent?.trim() || "", url: a.getAttribute("href") || "#" }));
                        } else if (p.querySelector("em")) {
                            type = p.querySelector("em")!.textContent?.trim() || "";
                        } else if (!description && p.textContent?.trim()) {
                            description = p.textContent.trim();
                        }
                    });
                    if (title || description || links.length > 0) items.push({ title, description, type, links });
                });
                return items.length > 0 ? items : null;
            }

            // Format B: h4 + ul > li
            const h4s = root.querySelectorAll("h4");
            if (h4s.length > 0) {
                h4s.forEach((h4) => {
                    const sectionType = h4.textContent?.trim() || "";
                    let next: Element | null = h4.nextElementSibling;
                    while (next && next.tagName !== "UL") next = next.nextElementSibling;
                    if (!next) return;
                    next.querySelectorAll("li").forEach((li) => {
                        const title = li.querySelector("strong")?.textContent?.trim() || "";
                        const dashMatch = (li.innerHTML || "").match(/[–\-]\s*([^<]*?)(?:<br\s*\/?>|<a)/i);
                        const description = dashMatch ? dashMatch[1].replace(/<[^>]*>/g, "").trim() : "";
                        const links: { text: string; url: string }[] = [];
                        li.querySelectorAll("a").forEach((a) => links.push({ text: a.textContent?.trim() || "", url: a.getAttribute("href") || "#" }));
                        if (title || description || links.length > 0) items.push({ title, description, type: sectionType, links });
                    });
                });
                return items.length > 0 ? items : null;
            }
            return null;
        } catch {
            return null;
        }
    };

    const renderResourceTable = (items: ResourceTableItem[]) => (
        <div className={styles.resourceTable}>
            <div className={styles.resourceHeader}>
                <div className={styles.resourceColumn}>{language === "en" ? "RESOURCE" : "RESSURS"}</div>
                <div className={styles.resourceColumn}>{language === "en" ? "LINK" : "LENKE"}</div>
            </div>
            {items.map((item, i) => (
                <div key={i} className={styles.resourceRow}>
                    <div className={styles.resourceDescription}>
                        <h4 className={styles.resourceName}>{item.title}</h4>
                        {item.description && <p className={styles.resourceDesc}>{item.description}</p>}
                        {item.type && <span className={styles.resourceType}>{item.type}</span>}
                    </div>
                    <div className={styles.resourceLinks}>
                        {item.links.map((link, j) => (
                            <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                                {link.text}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    // -----------------------------------------------------------------------
    // renderPatientStoryCards — depth-first walk; supports photoCredit
    // -----------------------------------------------------------------------
    const renderPatientStoryCards = (html: string) => {
        if (!html) return null;
        try {
            const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
            const root = doc.body.firstChild as HTMLElement;
            if (!root) return null;

            type StoryCard = {
                name: string; imageSrc: string; imageAlt: string;
                description: string; linkUrl: string; linkText: string; photoCredit?: string;
            };

            const stories: StoryCard[] = [];
            let current: StoryCard | null = null;

            const walk = (el: Element): void => {
                const tag = el.tagName;
                if (tag === "H4" || tag === "H3") {
                    if (current) stories.push(current);
                    current = { name: el.textContent?.trim() || "", imageSrc: "", imageAlt: "", description: "", linkUrl: "", linkText: "", photoCredit: "" };
                    return;
                }
                if (!current) { Array.from(el.children).forEach(walk); return; }

                if (tag === "IMG") {
                    if (!current.imageSrc) {
                        current.imageSrc = (el as HTMLImageElement).getAttribute("src") || "";
                        current.imageAlt = (el as HTMLImageElement).getAttribute("alt") || current.name;
                    }
                    return;
                }
                if (tag === "FIGURE") {
                    const img = el.querySelector("img");
                    if (img && !current.imageSrc) {
                        current.imageSrc = img.getAttribute("src") || "";
                        current.imageAlt = img.getAttribute("alt") || current.name;
                    }
                    const figcap = el.querySelector("figcaption");
                    if (figcap && !current.photoCredit) current.photoCredit = figcap.textContent?.trim() || "";
                    return;
                }
                if (tag === "A") {
                    if (!current.linkUrl) {
                        current.linkUrl = (el as HTMLAnchorElement).getAttribute("href") || "#";
                        current.linkText = el.textContent?.trim() || (language === "en" ? "Read the story" : "Les historien");
                    }
                    return;
                }
                if (tag === "P") {
                    const img = el.querySelector("img");
                    const anchor = el.querySelector("a");
                    const text = el.textContent?.trim() || "";
                    if (img && !current.imageSrc) {
                        current.imageSrc = img.getAttribute("src") || "";
                        current.imageAlt = img.getAttribute("alt") || current.name;
                        const noImg = text.replace(img.alt || "", "").trim();
                        if (noImg && !current.description) current.description = noImg;
                    } else if (/^(Foto|Photo):/i.test(text) && !current.photoCredit) {
                        current.photoCredit = text;
                    } else if (anchor && !current.linkUrl) {
                        current.linkUrl = anchor.getAttribute("href") || "#";
                        current.linkText = anchor.textContent?.trim() || (language === "en" ? "Read the story" : "Les historien");
                    } else if (text && !current.description) {
                        current.description = text;
                    }
                    return;
                }
                if (tag === "DIV") Array.from(el.children).forEach(walk);
            };

            Array.from(root.children).forEach(walk);
            if (current) stories.push(current);
            if (stories.length === 0) return null;

            const linkLabel = language === "en" ? "Read the story" : "Les historien";
            return (
                <div className={styles.patientStorySection}>
                    <div className={styles.patientStoryGrid}>
                        {stories.map((story, i) => (
                            <div key={i} className={styles.patientStoryCard}>
                                <h4 className={styles.patientStoryName}>{story.name}</h4>
                                {story.imageSrc && (
                                    <div className={styles.patientStoryImageWrapper}>
                                        <img src={story.imageSrc} alt={story.imageAlt} className={styles.patientStoryImage} />
                                        {story.photoCredit && <p className={styles.patientStoryPhotoCredit}>{story.photoCredit}</p>}
                                    </div>
                                )}
                                {story.description && <p className={styles.patientStoryDescription}>{story.description}</p>}
                                {story.linkUrl && story.linkUrl !== "#" && (
                                    <a href={story.linkUrl} target="_blank" rel="noopener noreferrer" className={styles.patientStoryLink}>
                                        <span className={styles.patientStoryLinkIcon} aria-hidden>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        {story.linkText || linkLabel}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        } catch {
            return null;
        }
    };

    // -----------------------------------------------------------------------
    // renderGenderCardSection — parses gender-card HTML (Prøv selv structure)
    // Used in both exercises intro and accordion item content.
    // Returns JSX or null if the structure is not detected.
    // -----------------------------------------------------------------------
    const renderGenderCardSection = (
        html: string,
        extraLinks?: React.ReactNode,
    ): React.ReactNode | null => {
        if (!html) return null;
        try {
            const gDoc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
            const gRoot = gDoc.body.firstChild as HTMLElement;

            const GENDER_ICONS: Record<string, { icon: string; color: string }> = {
                kvinner: { icon: "♀", color: "#08488a" }, women: { icon: "♀", color: "#08488a" },
                menn: { icon: "♂", color: "#053870" }, men: { icon: "♂", color: "#053870" },
            };

            const genderWrapper = Array.from(gRoot.children).find((el) => {
                if (el.tagName !== "DIV") return false;
                const style = (el as HTMLElement).getAttribute("style") || "";
                const h4Text = Array.from(el.querySelectorAll("h4, h5"))
                    .map((h) => h.textContent?.trim().toLowerCase() || "");
                return style.includes("flex") && h4Text.some((t) =>
                    t.includes("kvinner") || t.includes("menn") || t.includes("women") || t.includes("men"),
                );
            }) as HTMLElement | undefined;

            if (!genderWrapper) return null;

            // Steps before the gender wrapper
            const step1Paragraphs: { num: string; text: string }[] = [];
            let prevEl: Element | null = genderWrapper.previousElementSibling;
            while (prevEl) {
                if (prevEl.tagName === "P") {
                    const m = (prevEl.textContent?.trim() || "").match(/^(\d+)\.\s+(.+)$/s);
                    if (m) step1Paragraphs.unshift({ num: m[1], text: m[2] });
                }
                prevEl = prevEl.previousElementSibling;
            }

            // Gender cards
            const genderCards = (Array.from(genderWrapper.children).filter(
                (c) => c.tagName === "DIV" && c.querySelector("h4, h5"),
            ) as HTMLElement[]).map((col) => {
                const heading = col.querySelector("h4, h5");
                const title = heading?.textContent?.trim() || "";
                const iconInfo = Object.entries(GENDER_ICONS).find(([k]) => title.toLowerCase().includes(k));
                const { icon = "♀", color = "#08488a" } = iconInfo?.[1] ?? {};
                const iconChar = col.querySelector("span")?.textContent?.trim() || icon;
                const bodyHtml = Array.from(col.querySelectorAll("p")).map((p) => p.outerHTML).join("");
                return { title, icon: iconChar, color, bodyHtml };
            });

            if (genderCards.length === 0) return null;

            // Tips box
            let tipsTitle = "", tipsText = "";
            const tipsDiv = genderWrapper.nextElementSibling as HTMLElement | null;
            if (tipsDiv?.tagName === "DIV") {
                const ts = tipsDiv.getAttribute("style") || "";
                if (ts.includes("#fff8e1") || ts.includes("#fef3c7") || ts.includes("#ffc107") || ts.includes("#f59e0b")) {
                    const paras = Array.from(tipsDiv.querySelectorAll("p"));
                    tipsText = paras.slice(1).map((p) => p.textContent?.trim() || "").join(" ");
                    tipsTitle = tipsDiv.querySelector("p:first-child, strong")?.textContent?.trim() || "Tips:";
                    if (!paras.slice(1).length) { tipsText = paras.map((p) => p.textContent?.trim() || "").join(" "); tipsTitle = "Tips:"; }
                }
            }

            // Remaining steps after tips/gender wrapper
            const afterEl = (tipsTitle && tipsDiv) ? tipsDiv.nextElementSibling : genderWrapper.nextElementSibling;
            const remainingSteps: { num: number; text: string }[] = [];
            let cur: Element | null = afterEl;
            while (cur) {
                if (cur.tagName === "OL") {
                    const start = parseInt(cur.getAttribute("start") || "1", 10);
                    Array.from(cur.querySelectorAll("li")).forEach((li, idx) =>
                        remainingSteps.push({ num: start + idx, text: li.textContent?.trim() || "" }),
                    );
                } else if (cur.tagName === "P") {
                    const m = (cur.textContent?.trim() || "").match(/^(\d+)\.\s+(.+)$/s);
                    if (m) remainingSteps.push({ num: parseInt(m[1], 10), text: m[2] });
                }
                cur = cur.nextElementSibling;
            }

            return (
                <div className={styles.normalFunctionContent}>
                    <div className={styles.pelvicFloorExerciseSection}>
                        {step1Paragraphs.map((s, si) => (
                            <div key={si} className={styles.exerciseStep}>
                                <div className={styles.stepNumber}>{s.num}</div>
                                <p className={styles.enhancedParagraph}>{s.text}</p>
                            </div>
                        ))}
                        <div className={styles.genderInstructions}>
                            {genderCards.map((card, ci) => (
                                <div key={ci} className={styles.genderCard}>
                                    <div className={styles.genderIcon}>
                                        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: card.color }}>{card.icon}</span>
                                    </div>
                                    <h6 className={styles.genderTitle}>{card.title}</h6>
                                    <div className={styles.genderText} dangerouslySetInnerHTML={{ __html: card.bodyHtml }} />
                                </div>
                            ))}
                        </div>
                        {tipsTitle && (
                            <div className={styles.tipsBox}>
                                <h6 className={styles.tipsTitle}>{tipsTitle}</h6>
                                <p className={styles.enhancedParagraph}>{tipsText}</p>
                            </div>
                        )}
                        {remainingSteps.length > 0 && (
                            <div className={styles.exerciseSteps}>
                                {remainingSteps.map((s) => (
                                    <div key={s.num} className={styles.exerciseStep}>
                                        <div className={styles.stepNumber}>{s.num}</div>
                                        <p className={styles.enhancedParagraph}>{s.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {extraLinks}
                </div>
            );
        } catch {
            return null;
        }
    };

    // -----------------------------------------------------------------------
    // renderCommonExerciseSectionFromProps — convenience wrapper for inline
    // CommonExerciseSection injection inside treatment accordions.
    // -----------------------------------------------------------------------
    const renderCommonExerciseSectionFromProps = (pageTitle: string) => {
        const exProps = buildExerciseComponentProps();
        return (
            <CommonExerciseSection
                pageTitle={pageTitle}
                tryYourselfTitle={exProps.tryTitle || (language === "no" ? "Prøv selv" : "Try it yourself")}
                step1Text={exProps.step1Text}
                genderInstructions={exProps.genderInstructions}
                tipsTitle={exProps.tipsTitle}
                tipsText={exProps.tipsText}
                exerciseSteps={exProps.exerciseSteps}
                videoSectionTitle={exProps.videoSectionTitle}
                videoSectionDescription={exProps.videoSectionDesc}
                videos={exProps.videos}
                smartphoneApps={exProps.smartphoneApps}
            />
        );
    };

    // -----------------------------------------------------------------------
    // renderContentWithImageCards — main HTML → React renderer
    //
    // Supports two heading-level tiers:
    //   H1/H2  → top-level sections
    //   H3-H6  → content blocks within a section
    //
    // When no headings are present it falls back to rich media handling
    // (video grid, 2-column image grid, side-by-side, etc.).
    //
    // options.isIntro        — enables ParagraphWithImageContainer for
    //                          single-image intros (landscape detection)
    // options.reverseImages  — reverse image order (urinveienes)
    // options.injectExerciseAfterHeading / options.exerciseSectionNode
    //                        — inject an exercise block after a named heading
    // -----------------------------------------------------------------------
    const renderContentWithImageCards = (
        html: string,
        options?: {
            isIntro?: boolean;
            reverseImages?: boolean;
            injectExerciseAfterHeading?: RegExp | string;
            exerciseSectionNode?: React.ReactNode;
            /** Causes (urinary-incontinence): one image per segment so each image is right-aligned beside text (pre-merge layout) */
            singleImagePerSegment?: boolean;
            /** Causes (constipation): image on left, text on right in single-image side-by-side block */
            imageOnLeft?: boolean;
        },
    ): React.ReactNode => {
        if (!html) return null;
        const isIntro = options?.isIntro === true;
        const reverseImages = options?.reverseImages === true;
        const singleImagePerSegment = options?.singleImagePerSegment === true;
        const imageOnLeft = options?.imageOnLeft === true;
        const injectExerciseAfterHeading = options?.injectExerciseAfterHeading;
        const exerciseSectionNode = options?.exerciseSectionNode;

        const matchesInjectHeading = (heading: string) => {
            if (!injectExerciseAfterHeading || !exerciseSectionNode) return false;
            const text = (heading || "").trim();
            if (!text) return false;
            if (typeof injectExerciseAfterHeading === "string")
                return text.toLowerCase() === injectExerciseAfterHeading.toLowerCase();
            return injectExerciseAfterHeading.test(text);
        };

        try {
            const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
            const root = doc.body.firstChild as HTMLElement;
            if (!root) return null;

            // -- Types -------------------------------------------------------
            type ContentItem =
                | { type: "paragraph"; html: string }
                | { type: "image"; src: string; alt: string; caption: string };

            type ContentBlock = {
                headingTag?: "h3" | "h4" | "h5" | "h6";
                headingText?: string;
                items: ContentItem[];
                links: { text: string; url: string }[];
            };

            type Section = {
                mainHeadingTag: "h1" | "h2";
                mainHeadingText: string;
                blocks: ContentBlock[];
            };

            // -- Flatten nodes -----------------------------------------------
            const isHeadingTag = (tag: string) => /^H[1-6]$/.test(tag);
            const isSectionStarter = (tag: string) => tag === "H1" || tag === "H2";

            const flatNodes: HTMLElement[] = [];
            const collectRelevant = (node: ChildNode) => {
                if (node.nodeType === 3) {
                    const text = node.textContent?.trim();
                    if (text) {
                        const docForNode = node.ownerDocument || doc;
                        const p = docForNode.createElement("p");
                        p.textContent = text;
                        flatNodes.push(p);
                    }
                    return;
                }
                if (node.nodeType !== 1) return;
                const el = node as HTMLElement;
                const tag = el.tagName.toUpperCase();
                if (isHeadingTag(tag) || tag === "UL" || tag === "OL" || tag === "BLOCKQUOTE") { flatNodes.push(el); return; }
                if (tag === "IMG") { flatNodes.push(el); return; }
                if (tag === "P") {
                    const imgs = el.querySelectorAll("img");
                    const textOnly = el.textContent?.replace(/\s+/g, "").replace(/\u00a0/g, "").trim() || "";
                    if (imgs.length > 0 && textOnly === "") { imgs.forEach((img) => flatNodes.push(img as HTMLElement)); return; }
                    if (isBlankHtml(el.innerHTML)) return;
                    flatNodes.push(el); return;
                }
                if (tag === "FIGURE") { if (el.querySelector("img")) flatNodes.push(el); return; }
                if (tag === "IFRAME" || tag === "VIDEO") { flatNodes.push(el); return; }
                if (el.querySelector?.("iframe, video") && !el.querySelector?.("p, h1, h2, h3, h4, h5, h6")) { flatNodes.push(el); return; }
                if (el.hasAttribute("style")) { flatNodes.push(el); return; }
                Array.from(el.childNodes).forEach(collectRelevant);
            };
            collectRelevant(root);

            // -- Build section/block tree ------------------------------------
            const introElements: string[] = [];
            const sections: Section[] = [];
            let currentSection: Section | null = null;
            let currentBlock: ContentBlock | null = null;

            const pushContentToBlock = (block: ContentBlock, el: HTMLElement) => {
                const isPureImg = el.nodeType === 1 && (el.tagName === "IMG" || (el.tagName === "FIGURE" && !el.querySelector("p")));
                const isMixedContainer = el.nodeType === 1 && !isPureImg && !!el.querySelector?.("img");

                if (isPureImg) {
                    const img = el.tagName === "IMG" ? el : (el.querySelector("img") as HTMLImageElement);
                    if (img) {
                        const src = img.getAttribute("src") || "";
                        const alt = img.getAttribute("alt") || "";
                        const figure = el.tagName === "FIGURE" ? el : img.closest("figure");
                        const caption = figure?.querySelector("figcaption")?.textContent?.trim() || "";
                        block.items.push({ type: "image", src, alt: alt || caption, caption: caption || alt });
                    }
                } else if (isMixedContainer) {
                    // Walk content in document order to preserve picture position and avoid duplicating content
                    const mixedItems: ContentItem[] = [];
                    const mixedLinks: { text: string; url: string }[] = [];
                    const ownerDoc = el.ownerDocument || doc;
                    const buffer: HTMLElement[] = [];

                    const flushParagraph = () => {
                        if (buffer.length === 0) return;
                        const wrapper = ownerDoc.createElement("div");
                        buffer.forEach((n) => wrapper.appendChild(n.cloneNode(true)));
                        const html = wrapper.innerHTML.trim();
                        if (html && !isBlankHtml(html)) {
                            wrapper.querySelectorAll("a").forEach((a) => {
                                mixedLinks.push({
                                    text: a.textContent?.trim() || "",
                                    url: a.getAttribute("href") || "#",
                                });
                            });
                            mixedItems.push({ type: "paragraph", html });
                        }
                        buffer.length = 0;
                    };

                    const getCaption = (imgEl: HTMLImageElement) => {
                        const figure = imgEl.closest("figure");
                        if (figure) {
                            const fc = figure.querySelector("figcaption");
                            return fc?.textContent?.trim() || "";
                        }
                        return "";
                    };

                    const walk = (node: ChildNode) => {
                        if (node.nodeType === 3) {
                            const t = node.textContent?.trim();
                            if (t) {
                                const p = ownerDoc.createElement("p");
                                p.textContent = t;
                                buffer.push(p);
                            }
                            return;
                        }
                        if (node.nodeType !== 1) return;
                        const e = node as HTMLElement;
                        const tag = e.tagName.toUpperCase();
                        if (tag === "IMG") {
                            flushParagraph();
                            const src = e.getAttribute("src") || "";
                            const alt = (e.getAttribute("alt") || "").trim();
                            const caption = getCaption(e as HTMLImageElement);
                            mixedItems.push({ type: "image", src, alt, caption: caption || alt });
                            return;
                        }
                        if (tag === "FIGURE" && e.querySelector("img")) {
                            flushParagraph();
                            const img = e.querySelector("img") as HTMLImageElement;
                            if (img) {
                                const src = img.getAttribute("src") || "";
                                const alt = (img.getAttribute("alt") || "").trim();
                                const caption = getCaption(img);
                                mixedItems.push({ type: "image", src, alt, caption: caption || alt });
                            }
                            return;
                        }
                        if (e.querySelector("img, figure")) {
                            Array.from(e.childNodes).forEach(walk);
                            return;
                        }
                        buffer.push(e);
                    };

                    Array.from(el.childNodes).forEach(walk);
                    flushParagraph();
                    mixedItems.forEach((item) => block.items.push(item));
                    mixedLinks.forEach((link) => block.links.push(link));
                } else if (el.nodeType === 1 && el.tagName === "BLOCKQUOTE") {
                    block.items.push({ type: "paragraph", html: el.outerHTML });
                } else if (el.nodeType === 1 && (el.tagName === "IFRAME" || el.tagName === "VIDEO" || el.querySelector?.("iframe, video"))) {
                    block.items.push({ type: "paragraph", html: el.outerHTML });
                } else if (el.nodeType === 1) {
                    const preserveWrapper = el.tagName !== "P" || el.hasAttribute("style");
                    const anchors = el.querySelectorAll("a");
                    const html = preserveWrapper ? el.outerHTML : el.innerHTML;
                    if (anchors.length > 0) {
                        const textWithoutLinks = el.textContent?.trim() || "";
                        anchors.forEach((a) => block.links.push({ text: a.textContent?.trim() || "", url: a.getAttribute("href") || "#" }));
                        if (textWithoutLinks !== anchors[0].textContent?.trim() && !isBlankHtml(html)) {
                            block.items.push({ type: "paragraph", html });
                        }
                    } else {
                        const text = el.textContent?.trim();
                        const toPush = html || text;
                        if (toPush && !isBlankHtml(toPush)) block.items.push({ type: "paragraph", html: toPush });
                    }
                }
            };

            const ensureBlock = () => {
                if (!currentBlock) {
                    currentBlock = { items: [], links: [] };
                    if (currentSection) currentSection.blocks.push(currentBlock);
                }
                return currentBlock;
            };

            flatNodes.forEach((el) => {
                const tag = el.tagName.toUpperCase();
                if (isHeadingTag(tag)) {
                    const text = el.textContent?.trim() || "";
                    if (isSectionStarter(tag)) {
                        currentBlock = null;
                        if (currentSection) sections.push(currentSection);
                        currentSection = { mainHeadingTag: tag === "H1" ? "h1" : "h2", mainHeadingText: text, blocks: [] };
                    } else {
                        if (!currentSection) {
                            // First heading is H3-H6 with no parent section — use it as a section
                            currentSection = { mainHeadingTag: "h2", mainHeadingText: text, blocks: [] };
                            currentBlock = null;
                        } else {
                            currentBlock = {
                                headingTag: tag.toLowerCase() as ContentBlock["headingTag"],
                                headingText: text,
                                items: [], links: [],
                            };
                            currentSection.blocks.push(currentBlock);
                        }
                    }
                } else if (currentSection) {
                    pushContentToBlock(ensureBlock(), el);
                } else {
                    if (!isBlankHtml(el.outerHTML)) introElements.push(el.outerHTML);
                }
            });

            if (currentSection) sections.push(currentSection);

            // ----------------------------------------------------------------
            // No headings — rich media fallback
            // ----------------------------------------------------------------
            if (sections.length === 0) {
                // Intro + exactly one image: orientation-aware layout
                if (isIntro) {
                    const { textHtml, images } = parseContentAndImages(html);
                    if (textHtml && images.length === 1) {
                        return (
                            <ParagraphWithImageContainer
                                content={renderRichText(textHtml, { width: "100%" })}
                                image={images[0]}
                                isIntro={true}
                                setSelectedImage={setSelectedImage}
                            />
                        );
                    }
                }

                // Scan children for media vs text
                type MediaItem = { type: "img" | "media"; src: string; alt: string; caption: string; html?: string };
                let textBefore: string[] = [];
                let textAfter: string[] = [];
                let foundMedia = false;
                const medias: MediaItem[] = [];

                Array.from(root.childNodes).forEach((node) => {
                    const el = node as HTMLElement;
                    const isPureMedia = el.nodeType === 1 && (
                        el.tagName === "IMG" || el.tagName === "IFRAME" || el.tagName === "VIDEO" ||
                        (el.tagName === "FIGURE" && !el.querySelector("p")) ||
                        (el.classList && el.classList.contains("video-wrapper"))
                    );
                    const isMixedContainer = el.nodeType === 1 && !isPureMedia && !!el.querySelector?.("img, iframe, video");

                    if (isPureMedia || isMixedContainer) {
                        foundMedia = true;
                        if (isPureMedia) {
                            const img = el.tagName === "IMG" ? el : (el.querySelector("img") as HTMLImageElement | null);
                            const iframeOrVideo = (el.tagName === "IFRAME" || el.tagName === "VIDEO" || el.classList?.contains("video-wrapper"))
                                ? el : (el.querySelector("iframe, video") as HTMLElement | null);
                            const figure = el.tagName === "FIGURE" ? el : el.closest("figure");
                            const caption = figure?.querySelector("figcaption")?.textContent?.trim() || "";
                            const imgAlt = (img?.getAttribute("alt") || "").trim();
                            if (img) {
                                medias.push({ type: "img", src: img.getAttribute("src") || "", alt: imgAlt || caption, caption: caption || imgAlt });
                            } else if (iframeOrVideo) {
                                medias.push({ type: "media", src: "", alt: caption, caption, html: iframeOrVideo.outerHTML });
                            }
                        } else if (isMixedContainer) {
                            el.querySelectorAll("img, iframe, video").forEach((mediaEl) => {
                                const isImg = mediaEl.tagName === "IMG";
                                const caption = mediaEl.closest("figure")?.querySelector("figcaption")?.textContent?.trim() || "";
                                if (isImg) {
                                    const img = mediaEl as HTMLImageElement;
                                    const imgAlt = (img.getAttribute("alt") || "").trim();
                                    medias.push({ type: "img", src: img.getAttribute("src") || "", alt: imgAlt || caption, caption: caption || imgAlt });
                                } else {
                                    medias.push({ type: "media", src: "", alt: caption, caption, html: mediaEl.outerHTML });
                                }
                            });
                            const clone = el.cloneNode(true) as HTMLElement;
                            clone.querySelectorAll("figure, img, iframe, video").forEach((m) => {
                                const p = m.parentElement;
                                m.remove();
                                if (p && p !== clone && !p.textContent?.trim()) p.remove();
                            });
                            const remaining = clone.innerHTML.trim();
                            if (remaining && !isBlankHtml(remaining)) textAfter.push(remaining);
                        }
                    } else {
                        const content = el.nodeType === 1 ? el.outerHTML : (el.textContent || "");
                        if (content.trim() && !isBlankHtml(content)) {
                            if (foundMedia) textAfter.push(content);
                            else textBefore.push(content);
                        }
                    }
                });

                if (medias.length > 0) {
                    if (reverseImages) medias.reverse();
                    textBefore = textBefore.filter((p) => !isBlankHtml(p));
                    textAfter = textAfter.filter((p) => !isBlankHtml(p));

                    const videoMedias = medias.filter((m) => m.type === "media");
                    const imageMedias = medias.filter((m) => m.type === "img");

                    // Multiple videos → video grid
                    if (videoMedias.length > 1 && imageMedias.length === 0) {
                        return (
                            <>
                                {textBefore.length > 0 && (
                                    <div style={{ marginBottom: "1rem" }}>
                                        {textBefore.map((p, j) => <React.Fragment key={j}>{renderRichText(p)}</React.Fragment>)}
                                    </div>
                                )}
                                <div className={styles.videoGrid}>
                                    {videoMedias.map((media, j) => (
                                        <div key={j} className={styles.videoItem}>
                                            <div className={styles.videoContainer} dangerouslySetInnerHTML={{ __html: media.html || "" }} />
                                        </div>
                                    ))}
                                </div>
                                {textAfter.length > 0 && (
                                    <div style={{ marginTop: "1rem" }}>
                                        {textAfter.map((p, j) => <React.Fragment key={j}>{renderRichText(p)}</React.Fragment>)}
                                    </div>
                                )}
                            </>
                        );
                    }

                    // Single image + any text (before and/or after) → side-by-side horizontal (not symptoms)
                    const hasAnyText = textBefore.length > 0 || textAfter.length > 0;
                    if (imageMedias.length === 1 && hasAnyText && activeSection !== "symptoms") {
                        const allText = [...textBefore, ...textAfter].join("");
                        const m0 = imageMedias[0];
                        const label = m0.caption || m0.alt;
                        return (
                            <div className={`${styles.sideBySideContainer} ${imageOnLeft ? styles.sideBySideImageLeft : ""}`}>
                                <div className={styles.sideBySideText}>
                                    {allText && <div className={styles.enhancedParagraph} dangerouslySetInnerHTML={{ __html: allText }} />}
                                </div>
                                <div className={styles.sideBySideImage}>
                                    <img src={m0.src} alt={m0.alt}
                                        className={styles.introImage} style={{ borderRadius: "0.75rem" }} />
                                    {label && <p className={styles.sideBySideImageCaption}>{label}</p>}
                                </div>
                            </div>
                        );
                    }

                    // Two or more images — singleImagePerSegment (causes): one image per row, right-aligned (pre-merge layout)
                    if (imageMedias.length >= 2 && singleImagePerSegment) {
                        return (
                            <>
                                {imageMedias.map((media, j) => {
                                    const label = media.caption || media.alt;
                                    const textLeft = j === 0 && textBefore.length > 0
                                        ? textBefore.map((p, k) => <React.Fragment key={k}>{renderRichText(p)}</React.Fragment>)
                                        : null;
                                    return (
                                        <div key={j} className={styles.sideBySideContainer}>
                                            <div className={styles.sideBySideText}>{textLeft}</div>
                                            <div className={styles.sideBySideImage}>
                                                <img src={media.src} alt={media.alt} className={styles.anatomyImage}
                                                    onClick={() => setSelectedImage({ src: media.src, alt: media.alt })}
                                                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedImage({ src: media.src, alt: media.alt }); } }}
                                                    role="button" tabIndex={0}
                                                    style={{ cursor: "pointer", borderRadius: "0.75rem", objectFit: "contain" }} />
                                                {label && <p className={styles.sideBySideImageCaption}>{label}</p>}
                                            </div>
                                        </div>
                                    );
                                })}
                                {textAfter.length > 0 && (
                                    <div style={{ marginTop: "1rem" }}>
                                        {textAfter.map((p, j) => <React.Fragment key={j}>{renderRichText(p)}</React.Fragment>)}
                                    </div>
                                )}
                            </>
                        );
                    }

                    // Two or more images → 2-column flex grid
                    if (imageMedias.length >= 2) {
                        return (
                            <>
                                {textBefore.map((p, j) => <React.Fragment key={j}>{renderRichText(p)}</React.Fragment>)}
                                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
                                    {imageMedias.map((media, j) => {
                                        const label = media.caption || media.alt;
                                        return (
                                            <div key={j} style={{ flex: "1 1 calc(50% - 0.5rem)", minWidth: 0 }}>
                                                <img src={media.src} alt={media.alt} className={styles.anatomyImage}
                                                    onClick={() => setSelectedImage({ src: media.src, alt: media.alt })}
                                                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedImage({ src: media.src, alt: media.alt }); } }}
                                                    role="button" tabIndex={0}
                                                    style={{ cursor: "pointer", width: "100%", height: "340px", objectFit: "contain", display: "block" }} />
                                                {label && <p className={styles.anatomyCaption}>{label}</p>}
                                            </div>
                                        );
                                    })}
                                </div>
                                {textAfter.map((p, j) => <React.Fragment key={j}>{renderRichText(p)}</React.Fragment>)}
                            </>
                        );
                    }

                    // General media (single or mixed)
                    return (
                        <>
                            {textBefore.map((p, j) => <React.Fragment key={j}>{renderRichText(p)}</React.Fragment>)}
                            {medias.map((media, j) => {
                                const label = media.caption || media.alt;
                                return (
                                    <div key={j} style={{ margin: "1rem 0", textAlign: "center" }}>
                                        {media.type === "img" ? (
                                            <img src={media.src} alt={media.alt}
                                                onClick={() => setSelectedImage({ src: media.src, alt: media.alt })}
                                                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedImage({ src: media.src, alt: media.alt }); } }}
                                                role="button" tabIndex={0}
                                                style={{ cursor: "pointer", width: "100%", maxWidth: "900px", height: "auto", display: "inline-block", borderRadius: "0.75rem", objectFit: "contain" }} />
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: media.html || "" }} />
                                        )}
                                        {label && <p className={styles.anatomyCaption}>{label}</p>}
                                    </div>
                                );
                            })}
                            {textAfter.map((p, j) => <React.Fragment key={j}>{renderRichText(p)}</React.Fragment>)}
                        </>
                    );
                }

                // Text-only fallback
                const { textHtml } = parseContentAndImages(html);
                return <>{textHtml && renderRichText(textHtml, { width: "100%" })}</>;
            }

            // ----------------------------------------------------------------
            // Heading-based rendering — section/block tree
            // ----------------------------------------------------------------
            const renderBlock = (block: ContentBlock, blockIdx: number) => {
                type Seg = { paragraphs: string[]; images: { src: string; alt: string; caption: string }[] };
                const segs: Seg[] = [];
                let segParas: string[] = [];
                let segImgs: { src: string; alt: string; caption: string }[] = [];

                for (const item of block.items) {
                    if (item.type === "paragraph") {
                        if (segImgs.length > 0) {
                            if (singleImagePerSegment && segImgs.length > 1) {
                                // One segment per image: paragraph(s) only beside the first image (photo beside paragraph before it)
                                segs.push({ paragraphs: [...segParas], images: [segImgs[0]] });
                                segImgs.slice(1).forEach((img) => segs.push({ paragraphs: [], images: [img] }));
                                segParas = [];
                                segImgs = [];
                            } else {
                                segs.push({ paragraphs: segParas, images: segImgs });
                                segParas = [];
                                segImgs = [];
                            }
                        }
                        segParas.push(item.html);
                    } else {
                        if (singleImagePerSegment && segImgs.length >= 1) {
                            segs.push({ paragraphs: segParas, images: segImgs });
                            segParas = [];
                            segImgs = [];
                        }
                        segImgs.push({ src: item.src, alt: item.alt, caption: item.caption });
                    }
                }
                if (segParas.length > 0 || segImgs.length > 0) segs.push({ paragraphs: segParas, images: segImgs });

                const hasContent = block.items.length > 0 || block.links.length > 0;
                const headingOnly = !hasContent && block.headingTag != null && !!block.headingText;

                const headingEl = block.headingTag && block.headingText
                    ? React.createElement(block.headingTag, {
                        className: headingOnly
                            ? `${styles.enhancedSubheading} ${styles.enhancedSubheadingStandalone}`
                            : styles.enhancedSubheading,
                        style: {
                            ...(blockIdx > 0 ? { marginTop: "1.5rem" } : {}),
                            ...(headingOnly ? { textAlign: "center" as const } : {}),
                        },
                    }, block.headingText)
                    : null;

                const wrappedHeading = headingOnly && headingEl
                    ? <div style={{ textAlign: "center" }}>{headingEl}</div>
                    : headingEl;

                const renderParas = (paras: string[]) =>
                    paras.filter((p) => !isBlankHtml(p)).map((p, j) => <React.Fragment key={j}>{renderRichText(p)}</React.Fragment>);

                const renderImgEl = (img: { src: string; alt: string; caption: string }, j: number, captionClass: string) => {
                    const label = img.caption || img.alt;
                    return (
                        <div key={j}>
                            <img src={img.src} alt={img.alt} className={styles.anatomyImage}
                                onClick={() => setSelectedImage({ src: img.src, alt: img.alt })}
                                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedImage({ src: img.src, alt: img.alt }); } }}
                                role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                                tabIndex={0} style={{ cursor: "pointer" }} />
                            {label && <p className={captionClass}>{label}</p>}
                        </div>
                    );
                };

                const hasLinksInParas = block.items.some((it) => it.type === "paragraph" && it.html.includes("<a "));
                const renderBlockLinks = () => {
                    if (block.links.length === 0 || hasLinksInParas) return null;
                    if (block.links.length === 1) {
                        return (
                            <p className={styles.enhancedParagraph}>
                                <a href={block.links[0].url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                                    {block.links[0].text}
                                </a>
                            </p>
                        );
                    }
                    return (
                        <p className={styles.enhancedParagraph}>
                            {block.links.map((link, j) => (
                                <span key={j}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>{link.text}</a>
                                    {j < block.links.length - 1 && " og "}
                                </span>
                            ))}
                        </p>
                    );
                };

                return (
                    <React.Fragment key={blockIdx}>
                        {wrappedHeading}
                        {segs.map((seg, si) => {
                            if (seg.images.length === 0) return <React.Fragment key={si}>{renderParas(seg.paragraphs)}</React.Fragment>;
                            if (seg.images.length === 1) {
                                return (
                                    <div key={si} className={`${styles.sideBySideContainer} ${imageOnLeft ? styles.sideBySideImageLeft : ""}`}>
                                        <div className={styles.sideBySideText}>{renderParas(seg.paragraphs)}</div>
                                        <div className={styles.sideBySideImage}>{renderImgEl(seg.images[0], 0, styles.sideBySideImageCaption)}</div>
                                    </div>
                                );
                            }
                            return (
                                <React.Fragment key={si}>
                                    {renderParas(seg.paragraphs)}
                                    <div className={`${styles.anatomyGrid} ${styles.anatomyGridTwoCol}`}>
                                        {seg.images.map((img, j) => <div key={j} className={styles.anatomyItem}>{renderImgEl(img, j, styles.anatomyCaption)}</div>)}
                                    </div>
                                </React.Fragment>
                            );
                        })}
                        {renderBlockLinks()}
                    </React.Fragment>
                );
            };

            return (
                <>
                    {introElements.map((elHtml, i) => (
                        <React.Fragment key={`intro-${i}`}>{renderRichText(elHtml)}</React.Fragment>
                    ))}
                    {sections.map((section, i) => (
                        <div key={i} className={section.blocks.length === 0
                            ? `${styles.normalFunctionSection} ${styles.sectionTitleOnly}`
                            : styles.normalFunctionSection}>
                            {section.mainHeadingText
                                ? React.createElement(section.mainHeadingTag, { className: styles.normalFunctionTitle }, section.mainHeadingText)
                                : null}
                            {section.blocks.map((block, j) => (
                                <React.Fragment key={j}>
                                    {renderBlock(block, j)}
                                    {(matchesInjectHeading(block.headingText || "") ||
                                        (j === 0 && matchesInjectHeading(section.mainHeadingText || "")))
                                        ? exerciseSectionNode
                                        : null}
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </>
            );
        } catch (e) {
            console.error("renderContentWithImageCards error:", e);
            return html ? <div className={styles.enhancedParagraph} dangerouslySetInnerHTML={{ __html: html }} /> : null;
        }
    };

    // -----------------------------------------------------------------------
    // renderImage — standalone image for accordion items
    // -----------------------------------------------------------------------
    const renderImage = (item: TilstandAccordionItem) => {
        const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url;
        if (!imgSrc || item.bilde_posisjon === "none") return null;
        const altText = (language === "en" && item.bilde_alt_en) ? item.bilde_alt_en : (item.bilde_alt || item.tittel);
        const captionText = (language === "en" && item.bilde_caption_en) ? item.bilde_caption_en : item.bilde_caption;
        return (
            <div className={`${styles.anatomyItem} ${styles.anatomyItemStandalone}`}>
                <img src={imgSrc} alt={altText} className={styles.anatomyImage}
                    onClick={() => setSelectedImage({ src: imgSrc, alt: altText })}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedImage({ src: imgSrc, alt: altText }); } }}
                    role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    tabIndex={0} style={{ cursor: "pointer" }} />
                {captionText && <p className={styles.anatomyCaption}>{captionText}</p>}
            </div>
        );
    };

    // -----------------------------------------------------------------------
    // renderLinks — structured CMS links for accordion items
    // -----------------------------------------------------------------------
    const renderLinks = (item: TilstandAccordionItem) => {
        if (!item.lenker || item.lenker.length === 0) return null;
        return (
            <div style={{ marginTop: "1rem" }}>
                {item.lenker.map((link, i) => (
                    <p key={i} className={styles.enhancedParagraph}>
                        <a href={link.url}
                            target={link.url.startsWith("http") ? "_blank" : undefined}
                            rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                            className={styles.resourceLink}>
                            {(language === "en" && link.tekst_en) ? link.tekst_en : link.tekst}
                        </a>
                    </p>
                ))}
            </div>
        );
    };

    // -----------------------------------------------------------------------
    // renderSubContent — renders content for underseksjon (sub-accordion)
    // -----------------------------------------------------------------------
    const renderSubContent = (sub: TilstandUnderseksjon) => {
        const subContent = (language === "en" && sub.innhold_en) ? sub.innhold_en : sub.innhold;
        const subImgSrc = sub.bilde_url;
        const subAlt = sub.bilde_alt || sub.tittel;
        const subCaption = sub.bilde_caption;

        const linkEl = sub.lenke_url ? (
            <p className={styles.enhancedParagraph}>
                <a href={sub.lenke_url}
                    target={sub.lenke_ekstern ? "_blank" : undefined}
                    rel={sub.lenke_ekstern ? "noopener noreferrer" : undefined}
                    className={styles.resourceLink}>
                    {(language === "en" && sub.lenke_tekst_en) ? sub.lenke_tekst_en : (sub.lenke_tekst || sub.lenke_url)}
                </a>
            </p>
        ) : null;

        if (subImgSrc) {
            return (
                <div className={styles.sideBySideContainer}>
                    <div className={styles.sideBySideText}>
                        {renderContentWithImageCards(subContent)}
                        {linkEl}
                    </div>
                    <div className={`${styles.sideBySideImage} ${styles.anatomyItem}`}>
                        <img src={subImgSrc} alt={subAlt} className={styles.anatomyImage}
                            onClick={() => setSelectedImage({ src: subImgSrc, alt: subAlt })}
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedImage({ src: subImgSrc, alt: subAlt }); } }}
                            role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                            tabIndex={0} style={{ cursor: "pointer" }} />
                        {subCaption && <p className={styles.anatomyCaption}>{subCaption}</p>}
                    </div>
                </div>
            );
        }

        return (
            <>
                {renderContentWithImageCards(subContent)}
                {subImgSrc === undefined && sub.bilde_url === undefined ? null : (
                    sub.bilde_url ? (
                        <div className={`${styles.anatomyItem} ${styles.anatomyItemStandalone}`}>
                            <img src={sub.bilde_url} alt={subAlt} className={styles.anatomyImage}
                                onClick={() => setSelectedImage({ src: sub.bilde_url!, alt: subAlt })}
                                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedImage({ src: sub.bilde_url!, alt: subAlt }); } }}
                                role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                                tabIndex={0} style={{ cursor: "pointer" }} />
                            {subCaption && <p className={styles.anatomyCaption}>{subCaption}</p>}
                        </div>
                    ) : null
                )}
                {linkEl}
            </>
        );
    };

    // -----------------------------------------------------------------------
    // renderAccordionItemContent — resolves the correct renderer for each
    // accordion item based on content type and active section.
    // -----------------------------------------------------------------------
    const renderAccordionItemContent = (
        item: TilstandAccordionItem,
        index: number,
    ): React.ReactNode => {
        const itemTitle = getField(item, "tittel");
        const itemTitleNo = item.tittel;
        const itemContent = getField(item, "innhold");
        const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url;
        // bilde_posisjon defaults to 'side' when an image exists
        const bildePosisjon = item.bilde_posisjon ?? (imgSrc ? "side" : "none");
        const isSideBySide = bildePosisjon === "side" && !!imgSrc;
        const itemId = slugify(itemTitleNo);
        const hasUnderseksjoner = !!(item.underseksjoner && item.underseksjoner.length > 0);

        const imgAlt = (language === "en" && item.bilde_alt_en) ? item.bilde_alt_en : (item.bilde_alt || itemTitle);
        const imgCaption = (language === "en" && item.bilde_caption_en) ? item.bilde_caption_en : item.bilde_caption;

        const isCausesUrinary = activeSection === "causes" && conditionSlug === "urinary-incontinence";

        // Exercise injection options for "Konservativ behandling" in treatment
        const isKonservativBehandling =
            itemId === "konservativ-behandling" || itemId === "conservative-treatment" ||
            /konservativ|conservative/i.test(String(itemTitleNo ?? itemTitle));
        const showExerciseSectionHere = isKonservativBehandling && exerciseSectionItems && exerciseSectionItems.length > 0;

        const exerciseSectionNodeForInject = showExerciseSectionHere ? (
            <>
                <div className={styles.sectionHeader} style={{ marginTop: "2rem" }}>
                    <div className={styles.sectionIcon}>
                        <img src="/exercises.png" alt={language === "no" ? "Øvelser" : "Exercises"} width="24" height="24" />
                    </div>
                    <h2 className={styles.sectionTitle}>{language === "no" ? "Øvelser" : "Exercises"}</h2>
                </div>
                <div className={styles.sectionContent}>
                    {exerciseSectionItems!.map((exItem: TilstandAccordionItem, exIndex: number) => {
                        const exTitle = getField(exItem, "tittel");
                        const exContent = getField(exItem, "innhold");
                        const exId = slugify(exItem.tittel);
                        return (
                            <SectionAccordion key={exIndex} title={exTitle} id={exId}
                                isDarkMode={resolvedTheme === "dark"} defaultOpen={false}>
                                {renderContentWithImageCards(exContent)}
                            </SectionAccordion>
                        );
                    })}
                </div>
            </>
        ) : null;

        const injectOptions = showExerciseSectionHere ? {
            injectExerciseAfterHeading: /bekkenbunnstrening|pelvic floor training/i,
            exerciseSectionNode: exerciseSectionNodeForInject,
        } : undefined;
        const isConstipationImageLeft = (activeSection === "causes" || activeSection === "treatment") && conditionSlug === "constipation";
        const contentOptions = {
            ...injectOptions,
            ...(isCausesUrinary ? { singleImagePerSegment: true } : {}),
            ...(isConstipationImageLeft ? { imageOnLeft: true } : {}),
        };

        // Side-by-side wrapper: same DOM order everywhere (text then image). Image-on-left for constipation causes/treatment via CSS only.
        const wrapSideBySide = (contentNode: React.ReactNode) => (
            <div className={`${styles.sideBySideContainer} ${isConstipationImageLeft ? styles.sideBySideImageLeft : ""}`}>
                <div className={styles.sideBySideText}>{contentNode}{renderLinks(item)}</div>
                <div className={`${styles.sideBySideImage} ${styles.anatomyItem}`}>
                    <img src={imgSrc!} alt={imgAlt} className={styles.anatomyImage}
                        onClick={() => setSelectedImage({ src: imgSrc!, alt: imgAlt })}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedImage({ src: imgSrc!, alt: imgAlt }); } }}
                        role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                        tabIndex={0} style={{ cursor: "pointer" }} />
                    {imgCaption && <p className={styles.anatomyCaption}>{imgCaption}</p>}
                </div>
            </div>
        );

        // -- Resource table --------------------------------------------------
        if (activeSection === "resources" && typeof itemContent === "string" && !isBlankHtml(itemContent)) {
            const resourceItems = parseResourceItems(itemContent);
            if (resourceItems && resourceItems.length > 0) {
                return <>{renderResourceTable(resourceItems)}{renderImage(item)}{renderLinks(item)}</>;
            }
        }

        // -- Patient stories -------------------------------------------------
        const isPatientStories = /pasienthistori/i.test(itemTitleNo) || /patient\s*stor/i.test(itemTitle);
        if (isPatientStories && itemContent) {
            return <>{renderPatientStoryCards(itemContent)}{renderImage(item)}{renderLinks(item)}</>;
        }

        // -- Items with sub-accordions ---------------------------------------
        if (hasUnderseksjoner) {
            return (
                <>
                    {itemContent && (
                        isSideBySide
                            ? wrapSideBySide(renderContentWithImageCards(itemContent, contentOptions))
                            : <>{renderContentWithImageCards(itemContent, contentOptions)}{renderImage(item)}{renderLinks(item)}</>
                    )}
                    {item.underseksjoner!.map((sub, subIndex) => {
                        const subTitle = (language === "en" && sub.tittel_en) ? sub.tittel_en : sub.tittel;
                        const subId = slugify(sub.tittel);
                        return (
                            <SectionAccordion key={subIndex} title={subTitle} id={`${itemId}-${subId}`}
                                isDarkMode={resolvedTheme === "dark"} defaultOpen={false}>
                                {renderSubContent(sub)}
                            </SectionAccordion>
                        );
                    })}
                </>
            );
        }

        // -- Side-by-side (no sub-accordions) --------------------------------
        if (isSideBySide) return wrapSideBySide(renderContentWithImageCards(itemContent, contentOptions));

        // -- Treatment: inject CommonExerciseSection via marker or append ----
        const isFirstTreatmentAccordion = activeSection === "treatment" && index === 0 && conditionSlug === "urinary-incontinence";
        const exProps = isFirstTreatmentAccordion ? buildExerciseComponentProps() : null;
        const shouldInjectExercise = isFirstTreatmentAccordion && exProps?.hasStructured &&
            !(exerciseSectionItems && exerciseSectionItems.length > 0);

        if (shouldInjectExercise) {
            const exTitle = language === "no" ? "Bekkenbunnstrening" : "Pelvic floor training";
            const exerciseMarker = "<!-- INJECT_EXERCISE_SECTION -->";
            if (typeof itemContent === "string" && itemContent.includes(exerciseMarker)) {
                const parts = itemContent.split(exerciseMarker);
                return (
                    <>
                        {renderContentWithImageCards(parts[0].trim())}
                        {renderCommonExerciseSectionFromProps(exTitle)}
                        {renderContentWithImageCards(parts[1].trim())}
                        {renderImage(item)}{renderLinks(item)}
                    </>
                );
            }
            return (
                <>
                    {renderContentWithImageCards(itemContent)}
                    {renderCommonExerciseSectionFromProps(exTitle)}
                    {renderImage(item)}{renderLinks(item)}
                </>
            );
        }

        // -- Gender card structure (Prøv selv) --------------------------------
        const genderCardResult = renderGenderCardSection(itemContent, renderLinks(item));
        if (genderCardResult) return genderCardResult;

        // -- Embedded iframes → video grid (each video with its title) + content after (e.g. blockquote with lamp)
        try {
            const vDoc = new DOMParser().parseFromString(`<div>${itemContent}</div>`, "text/html");
            const vRoot = vDoc.body.firstChild as HTMLElement;
            const vIframes = Array.from(vRoot.querySelectorAll("iframe, [data-oembed-url]"));
            if (vIframes.length > 0) {
                const videoCards: { src: string; title: string }[] = vIframes.map((iframe) => {
                    const card = iframe.parentElement;
                    const titleEl = card?.querySelector("h4, h3, h5");
                    const title = (titleEl?.textContent?.trim() || "").trim();
                    const src = iframe.getAttribute("src") || iframe.getAttribute("data-oembed-url") || "";
                    return { src, title };
                });
                const clone = vRoot.cloneNode(true) as HTMLElement;
                clone.querySelectorAll("iframe, [data-oembed-url]").forEach((el) => {
                    const card = el.parentElement;
                    if (card && card !== clone) card.remove();
                });
                const contentAfterVideos = clone.innerHTML.trim();
                return (
                    <>
                        <div className={styles.videoGrid}>
                            {videoCards.map((card, vi) => (
                                <div key={vi} className={styles.videoItem}>
                                    <div className={styles.videoContainer}>
                                        <iframe src={card.src} title={card.title || `Video ${vi + 1}`} allowFullScreen
                                            className={styles.videoIframe}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            loading="lazy" />
                                    </div>
                                    {card.title && (
                                        <p className={styles.videoTitle}>{card.title}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        {contentAfterVideos && !isBlankHtml(contentAfterVideos) && (
                            <div style={{ marginTop: "1.5rem" }}>
                                {renderContentWithImageCards(contentAfterVideos, contentOptions)}
                            </div>
                        )}
                        {renderLinks(item)}
                    </>
                );
            }
        } catch { /* fall through */ }

        // -- Treatment (pelvic-pain): quote first, then image aligned with first non-quote paragraph, then rest ----
        if (activeSection === "treatment" && conditionSlug === "pelvic-pain" && typeof itemContent === "string") {
            try {
                const doc = new DOMParser().parseFromString(`<div>${itemContent}</div>`, "text/html");
                const root = doc.body.firstChild as HTMLElement;
                if (root) {
                    let quoteHtml = "";
                    const bq = root.querySelector("blockquote");
                    if (bq) {
                        quoteHtml = bq.outerHTML;
                        bq.remove();
                    }
                    let imgSrc = "", imgAlt = "", imgCaption = "";
                    const img = root.querySelector("img");
                    if (img) {
                        imgSrc = img.getAttribute("src") || "";
                        imgAlt = img.getAttribute("alt") || "";
                        const figure = img.closest("figure");
                        if (figure) {
                            const cap = figure.querySelector("figcaption");
                            imgCaption = (cap?.textContent?.trim() || "").replace(/\s+/g, " ").trim();
                            figure.remove();
                        } else {
                            const parent = img.parentElement;
                            img.remove();
                            if (parent && parent !== root && !parent.textContent?.trim()) parent.remove();
                        }
                    }
                    let firstParagraphHtml = "";
                    const firstP = root.querySelector("p");
                    if (firstP && firstP.textContent?.trim()) {
                        firstParagraphHtml = firstP.outerHTML;
                        firstP.remove();
                    }
                    const restHtml = root.innerHTML.trim();
                    const hasStructured = quoteHtml || imgSrc || firstParagraphHtml || (!isBlankHtml(restHtml));
                    if (hasStructured) {
                        return (
                            <>
                                {quoteHtml && (
                                    <div className={styles.diagnosisTestimonialBox}>
                                        {renderRichText(quoteHtml)}
                                    </div>
                                )}
                                {imgSrc && firstParagraphHtml ? (
                                    <div className={styles.sideBySideContainer}>
                                        <div className={styles.sideBySideText}>{renderRichText(firstParagraphHtml)}</div>
                                        <div className={styles.sideBySideImage}>
                                            <img src={imgSrc} alt={imgAlt} className={styles.introImage} style={{ borderRadius: "0.75rem" }} />
                                            {imgCaption && <p className={styles.sideBySideImageCaption}>{imgCaption}</p>}
                                        </div>
                                    </div>
                                ) : imgSrc ? (
                                    <div className={styles.sideBySideContainer}>
                                        <div className={styles.sideBySideText} />
                                        <div className={styles.sideBySideImage}>
                                            <img src={imgSrc} alt={imgAlt} className={styles.introImage} style={{ borderRadius: "0.75rem" }} />
                                            {imgCaption && <p className={styles.sideBySideImageCaption}>{imgCaption}</p>}
                                        </div>
                                    </div>
                                ) : firstParagraphHtml ? renderRichText(firstParagraphHtml) : null}
                                {restHtml && !isBlankHtml(restHtml) && (
                                    <div className={styles.enhancedParagraph} style={{ marginTop: "1rem" }}>
                                        {renderRichText(restHtml)}
                                    </div>
                                )}
                                {renderLinks(item)}
                            </>
                        );
                    }
                }
            } catch { /* fall through to default */ }
        }

        // -- Default: strip orphan h4/h5 and render --------------------------
        const isUrinveienes = activeSection === "normal-functions" && slugify(itemTitleNo) === "urinveienes-oppbygging";
        let safeContent = itemContent;
        try {
            const sd = new DOMParser().parseFromString(`<div>${itemContent}</div>`, "text/html");
            const sr = sd.body.firstChild as HTMLElement;
            // Only strip headings if there are no h1/h2; do NOT strip for causes (urinary/pelvic-pain) or treatment (constipation) so subsection titles and image positions stay
            const keepSubheadings = isCausesUrinary
                || (activeSection === "treatment" && conditionSlug === "constipation")
                || (activeSection === "causes" && conditionSlug === "pelvic-pain");
            if (!sr.querySelector("h1, h2") && !keepSubheadings) sr.querySelectorAll("h4, h5").forEach((h) => h.remove());
            safeContent = sr.innerHTML;
        } catch { /* use original */ }

        return (
            <>
                {renderContentWithImageCards(safeContent, { reverseImages: isUrinveienes, ...contentOptions })}
                {renderImage(item)}{renderLinks(item)}
            </>
        );
    };

    // -----------------------------------------------------------------------
    // JSX — main render
    // -----------------------------------------------------------------------
    return (
        <div className={`${styles.sectionContainer} ${resolvedTheme === "dark" ? styles.darkMode : ""}`}>
            {/* Section header */}
            <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                    <img src={sectionIcon} alt={title} width="24" height="24" />
                </div>
                <h2 className={styles.sectionTitle}>
                    {title || (activeSection === "normal-functions"
                        ? (language === "no" ? "Funksjon" : "Normal Functions")
                        : activeSection)}
                </h2>
            </div>

            {/* Quote — shown above content for most sections except causes/diagnosis
                Exercises: lamp icon (highlightBox); others: quoteContainer.
                Other sections show quote only when CMS has sitat for that section (e.g. symptomer_sitat, behandling_sitat). */}
            {sitat && activeSection !== "causes" && activeSection !== "diagnosis" && (
                <div className={activeSection === "exercises" ? styles.highlightBox : styles.quoteContainer}>
                    <blockquote className={styles.patientQuote}>
                        <p className={styles.quoteText}>"{sitat}"</p>
                        {sitatKilde && <cite className={styles.quoteAuthor}>— {sitatKilde}</cite>}
                    </blockquote>
                </div>
            )}

            <div className={styles.sectionContent}>
                {/* ── Diagnosis (urinary-incontinence) ─────────────────────── */}
                {diagnosisParsed && (
                    <div className={styles.diagnosisContentCard}>
                        {diagnosisParsed.testimonial && (
                            <div className={styles.diagnosisTestimonialBox}>
                                <p className={styles.quoteText}>"{diagnosisParsed.testimonial}"</p>
                                {diagnosisParsed.attribution && (
                                    <cite className={styles.quoteAuthor}>— {diagnosisParsed.attribution}</cite>
                                )}
                            </div>
                        )}
                        {diagnosisParsed.imageSrc ? (
                            <div className={styles.sideBySideContainer}>
                                <div className={styles.sideBySideText}>
                                    {diagnosisParsed.paragraphs.map((p, i) => (
                                        <div key={i} className={styles.enhancedParagraph} dangerouslySetInnerHTML={{ __html: p }} />
                                    ))}
                                </div>
                                <div className={styles.sideBySideImage}>
                                    <img src={diagnosisParsed.imageSrc} alt={diagnosisParsed.imageAlt || ""}
                                        className={styles.diagnosisImage}
                                        onClick={() => setSelectedImage({ src: diagnosisParsed.imageSrc, alt: diagnosisParsed.imageAlt })}
                                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedImage({ src: diagnosisParsed.imageSrc, alt: diagnosisParsed.imageAlt }); } }}
                                        role="button" tabIndex={0} style={{ cursor: "pointer" }} />
                                </div>
                            </div>
                        ) : (
                            diagnosisParsed.paragraphs.map((p, i) => (
                                <div key={i} className={styles.enhancedParagraph} dangerouslySetInnerHTML={{ __html: p }} />
                            ))
                        )}
                    </div>
                )}

                {/* ── Diagnosis (other conditions) ────────────────────────────
                    Layout: quote first, then image aligned only with first non-quote paragraph, then rest below. */}
                {intro && isDiagnosisSection && !diagnosisParsed && (() => {
                    let quoteHtml = "";
                    let firstParagraphHtml = "";
                    let restHtml = "";
                    let diagImgSrc = "";
                    let diagImgAlt = "";
                    let diagImgCaption = "";
                    try {
                        const doc = new DOMParser().parseFromString(`<div>${intro}</div>`, "text/html");
                        const root = doc.body.firstChild as HTMLElement;
                        if (!root) return renderContentWithImageCards(intro);

                        const bq = root.querySelector("blockquote");
                        if (bq) {
                            quoteHtml = bq.outerHTML;
                            bq.remove();
                        }

                        const img = root.querySelector("img");
                        if (img) {
                            diagImgSrc = img.getAttribute("src") || "";
                            diagImgAlt = img.getAttribute("alt") || "";
                            const figure = img.closest("figure");
                            if (figure) {
                                diagImgCaption = figure.querySelector("figcaption")?.textContent?.trim() || "";
                                figure.remove();
                            } else {
                                const parent = img.parentElement;
                                img.remove();
                                if (parent && parent !== root && !parent.textContent?.trim()) parent.remove();
                            }
                        }

                        const firstP = root.querySelector("p");
                        if (firstP && firstP.textContent?.trim()) {
                            firstParagraphHtml = firstP.outerHTML;
                            firstP.remove();
                        }
                        restHtml = root.innerHTML.trim();
                    } catch { /* fallback below */ }

                    if (!quoteHtml && !firstParagraphHtml && !restHtml && !diagImgSrc) return renderContentWithImageCards(intro);

                    // Intro is only a quote (blockquote or single paragraph with no image/rest): show as testimonial only, not as sections
                    const onlyQuote = quoteHtml && !diagImgSrc && !firstParagraphHtml && isBlankHtml(restHtml);
                    const onlySingleParagraphAsQuote = !quoteHtml && firstParagraphHtml && !diagImgSrc && isBlankHtml(restHtml);
                    if (onlyQuote || onlySingleParagraphAsQuote) {
                        const toShow = onlyQuote ? quoteHtml : firstParagraphHtml;
                        return (
                            <div className={styles.diagnosisTestimonialBox}>
                                {onlySingleParagraphAsQuote ? (
                                    <blockquote className={styles.patientQuote}>
                                        {renderRichText(firstParagraphHtml)}
                                    </blockquote>
                                ) : (
                                    renderRichText(toShow)
                                )}
                            </div>
                        );
                    }

                    return (
                        <>
                            {quoteHtml && (
                                <div className={styles.diagnosisTestimonialBox}>
                                    {renderRichText(quoteHtml)}
                                </div>
                            )}
                            {diagImgSrc && firstParagraphHtml ? (
                                <div className={styles.sideBySideContainer}>
                                    <div className={styles.sideBySideText}>{renderRichText(firstParagraphHtml)}</div>
                                    <div className={styles.sideBySideImage}>
                                        <img src={diagImgSrc} alt={diagImgAlt} className={styles.introImage}
                                            style={{ borderRadius: "0.75rem" }} />
                                        {diagImgCaption && <p className={styles.sideBySideImageCaption}>{diagImgCaption}</p>}
                                    </div>
                                </div>
                            ) : diagImgSrc ? (
                                <div className={styles.sideBySideContainer}>
                                    <div className={styles.sideBySideText} />
                                    <div className={styles.sideBySideImage}>
                                        <img src={diagImgSrc} alt={diagImgAlt} className={styles.introImage}
                                            style={{ borderRadius: "0.75rem" }} />
                                        {diagImgCaption && <p className={styles.sideBySideImageCaption}>{diagImgCaption}</p>}
                                    </div>
                                </div>
                            ) : firstParagraphHtml ? renderRichText(firstParagraphHtml) : null}
                            {restHtml && !isBlankHtml(restHtml) && (
                                <div className={styles.enhancedParagraph} style={{ marginTop: "1rem" }}>
                                    {renderRichText(restHtml)}
                                </div>
                            )}
                        </>
                    );
                })()}

                {/* ── Causes ───────────────────────────────────────────────── */}
                {activeSection === "causes" && (sitat || intro) && (() => {
                    let causesTextHtml = intro || "";
                    let causesImgSrc = "";
                    let causesImgAlt = "";
                    if (intro) {
                        try {
                            const doc = new DOMParser().parseFromString(`<div>${intro}</div>`, "text/html");
                            const root = doc.body.firstChild as HTMLElement;
                            if (root) {
                                const img = root.querySelector("img");
                                if (img) {
                                    causesImgSrc = img.getAttribute("src") || "";
                                    causesImgAlt = img.getAttribute("alt") || "";
                                    const parent = img.parentElement;
                                    img.remove();
                                    if (parent && parent !== root && !parent.textContent?.trim()) parent.remove();
                                    causesTextHtml = root.innerHTML;
                                }
                            }
                        } catch { /* use raw intro */ }
                    }
                    return (
                        <div className={styles.causesCard}>
                            {sitat && (
                                <div className={styles.causesQuoteWrap}>
                                    <p className={styles.causesQuote}>"{sitat}"</p>
                                    {sitatKilde && <cite className={styles.causesQuoteAuthor}>— {sitatKilde}</cite>}
                                </div>
                            )}
                            {causesTextHtml && (
                                <div className={causesImgSrc ? styles.sideBySideContainer : styles.causesIntro}>
                                    <div className={causesImgSrc ? styles.sideBySideText : undefined}>
                                        {renderRichText(causesTextHtml)}
                                    </div>
                                    {causesImgSrc && (
                                        <div className={styles.sideBySideImage}>
                                            <img src={causesImgSrc} alt={causesImgAlt} className={styles.introImage}
                                                style={{ borderRadius: "0.75rem" }} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })()}

                {/* ── All other sections: intro rendering ─────────────────────
                    Skip symptoms: TilstandIntroduction already renders symptomer_intro above (ConditionPage). */}
                {intro && !isDiagnosisSection && activeSection !== "causes" && activeSection !== "symptoms" && (() => {
                    // Exercises intro: try gender-card parser first
                    if (activeSection === "exercises") {
                        const genderResult = renderGenderCardSection(intro);
                        if (genderResult) return genderResult;
                    }
                    return renderContentWithImageCards(intro, { isIntro: true });
                })()}

                {/* ── Accordion items ──────────────────────────────────────── */}
                {Array.isArray(trekkspillToRender) && trekkspillToRender.map((item: TilstandAccordionItem, index: number) => {
                    const itemTitle = getField(item, "tittel");
                    const itemTitleNo = item.tittel;
                    const itemContent = getField(item, "innhold");
                    const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url;
                    const bildePosisjon = item.bilde_posisjon ?? (imgSrc ? "side" : "none");
                    // Urinary-incontinence causes: keep pre-merge picture alignment (side-by-side) without affecting other sections
                    const isCausesUrinary = activeSection === "causes" && conditionSlug === "urinary-incontinence";
                    const isSideBySide = (bildePosisjon === "side" && !!imgSrc) || (isCausesUrinary && !!imgSrc);
                    const itemId = slugify(itemTitleNo);

                    // GROUP_HEADER: centered dividers between accordion groups
                    if (itemTitleNo.startsWith("GROUP_HEADER:")) {
                        const headerText = (language === "en"
                            ? (item.tittel_en || itemTitleNo)
                            : itemTitleNo
                        ).replace("GROUP_HEADER:", "");
                        return <div key={index} className={styles.groupHeader}>{headerText}</div>;
                    }

                    const resourceItems = activeSection === "resources" && typeof itemContent === "string"
                        ? parseResourceItems(itemContent)
                        : null;
                    const isResourceAccordion = !!(resourceItems && resourceItems.length > 0);
                    const isPatientStoryAccordion = /pasienthistorier|patient\s*stories/i.test(itemTitleNo);

                    // Render image for underseksjon (sub.bilde_url)
                    const renderUnderseksjonImage = (sub: TilstandUnderseksjon) => {
                        const src = sub.bilde_url;
                        if (!src) return null;
                        const alt = sub.bilde_alt || sub.tittel;
                        const caption = sub.bilde_caption;
                        return (
                            <div className={`${styles.anatomyItem} ${styles.anatomyItemStandalone}`}>
                                <img
                                    src={src}
                                    alt={alt}
                                    className={styles.anatomyImage}
                                    onClick={() => setSelectedImage({ src, alt })}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage({ src, alt }); } }}
                                    role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                                    tabIndex={0}
                                    style={{ cursor: 'pointer' }}
                                />
                                {caption && <p className={styles.anatomyCaption}>{caption}</p>}
                            </div>
                        );
                    };

                    const renderSubContent = (sub: TilstandUnderseksjon) => {
                        const subContent = (language === 'en' && sub.innhold_en) ? sub.innhold_en : sub.innhold;
                        const subImgSrc = sub.bilde_url;
                        const subAlt = sub.bilde_alt || sub.tittel;
                        const subCaption = sub.bilde_caption;

                        if (subImgSrc) {
                            return (
                                <div className={styles.sideBySideContainer}>
                                    <div className={styles.sideBySideText}>
                                        {renderContentWithImageCards(subContent)}
                                        {sub.lenke_url && (
                                            <p className={styles.enhancedParagraph}>
                                                <a
                                                    href={sub.lenke_url}
                                                    target={sub.lenke_ekstern ? '_blank' : undefined}
                                                    rel={sub.lenke_ekstern ? 'noopener noreferrer' : undefined}
                                                    className={styles.resourceLink}
                                                >
                                                    {(language === 'en' && sub.lenke_tekst_en) ? sub.lenke_tekst_en : (sub.lenke_tekst || sub.lenke_url)}
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                    <div className={`${styles.sideBySideImage} ${styles.anatomyItem}`}>
                                        <img
                                            src={subImgSrc}
                                            alt={subAlt}
                                            className={styles.anatomyImage}
                                            onClick={() => setSelectedImage({ src: subImgSrc, alt: subAlt })}
                                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage({ src: subImgSrc, alt: subAlt }); } }}
                                            role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                                            tabIndex={0}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        {subCaption && <p className={styles.anatomyCaption}>{subCaption}</p>}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <>
                                {renderContentWithImageCards(subContent)}
                                {renderUnderseksjonImage(sub)}
                                {sub.lenke_url && (
                                    <p className={styles.enhancedParagraph}>
                                        <a
                                            href={sub.lenke_url}
                                            target={sub.lenke_ekstern ? '_blank' : undefined}
                                            rel={sub.lenke_ekstern ? 'noopener noreferrer' : undefined}
                                            className={styles.resourceLink}
                                        >
                                            {(language === 'en' && sub.lenke_tekst_en) ? sub.lenke_tekst_en : (sub.lenke_tekst || sub.lenke_url)}
                                        </a>
                                    </p>
                                )}
                            </>
                        );
                    };

                    // Exercise section: under Bekkenbunnstrening paragraph, above Biofeedback/Elektrostimulering (injected inside content).
                    const isKonservativBehandling =
                        itemId === "konservativ-behandling" || itemId === "conservative-treatment" ||
                        /konservativ|conservative/i.test(String(itemTitleNo ?? itemTitle));
                    const showExerciseSectionHere = isKonservativBehandling && exerciseSectionItems && exerciseSectionItems.length > 0;
                    const exerciseSectionNodeForInject = showExerciseSectionHere ? (
                        <>
                            <div className={styles.sectionHeader} style={{ marginTop: "2rem" }}>
                                <div className={styles.sectionIcon}>
                                    <img src="/exercises.png" alt={language === "no" ? "Øvelser" : "Exercises"} width="24" height="24" />
                                </div>
                                <h2 className={styles.sectionTitle}>{language === "no" ? "Øvelser" : "Exercises"}</h2>
                            </div>
                            <div className={styles.sectionContent}>
                                {exerciseSectionItems!.map((exItem: TilstandAccordionItem, exIndex: number) => {
                                    const exTitle = getField(exItem, "tittel");
                                    const exContent = getField(exItem, "innhold");
                                    const exId = slugify(exItem.tittel);
                                    return (
                                        <SectionAccordion key={exIndex} title={exTitle} id={exId}
                                            isDarkMode={resolvedTheme === "dark"} defaultOpen={false}>
                                            {renderContentWithImageCards(exContent)}
                                        </SectionAccordion>
                                    );
                                })}
                            </div>
                        </>
                    ) : null;
                    const injectOptions = showExerciseSectionHere ? {
                        injectExerciseAfterHeading: /bekkenbunnstrening|pelvic floor training/i,
                        exerciseSectionNode: exerciseSectionNodeForInject,
                    } : undefined;

                    return (
                        <SectionAccordion key={index} title={itemTitle} id={itemId}
                            isDarkMode={resolvedTheme === "dark"} defaultOpen={false}>
                            {renderAccordionItemContent(item, index)}
                        </SectionAccordion>
                    );
                })}
            </div>

            {/* Image lightbox */}
            {selectedImage && (
                <ImageModal isOpen={!!selectedImage} imageSrc={selectedImage.src} imageAlt={selectedImage.alt}
                    onClose={() => setSelectedImage(null)} />
            )}
        </div>
    );
};