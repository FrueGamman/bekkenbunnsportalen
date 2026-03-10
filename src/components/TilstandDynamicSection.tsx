import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { SectionAccordion } from "./SectionAccordion";
import { CommonExerciseSection } from "./CommonExerciseSection";
import type { ExerciseStep, GenderInstruction, Video, SmartphoneApps } from "./CommonExerciseSection";
import { ImageModal } from "./ui/ImageModal";
import type { Tilstand, TilstandAccordionItem, TilstandUnderseksjon } from "../types/cms";
import { getImageUrl } from "../lib/directus";
import styles from "../conditions/urinary-incontinence/components/section-content.module.css";

interface TilstandDynamicSectionProps {
    tilstand: Tilstand;
    activeSection: string;
}

/**
 * Renders one section (funksjon, symptomer, årsaker, utredning, behandling, etc.) from Directus tilstand.
 * Keeps original frontend: same layout (sectionContainer, sectionHeader, sectionContent), SectionAccordion, and section-content.module.css.
 */
export const TilstandDynamicSection = ({ tilstand, activeSection }: TilstandDynamicSectionProps) => {
    const { language } = useLanguage();
    const { resolvedTheme } = useTheme();
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

    // Map activeSection to tilstand field prefixes
    const sectionMap: Record<string, string> = {
        "normal-functions": "funksjon",
        "symptoms": "symptomer",
        "causes": "arsaker",
        "diagnosis": "utredning",
        "treatment": "behandling",
        "exercises": "ovelse",
        "resources": "ressurser",
        "references": "referanser",
        "textbook": "funksjon"
    };

    const prefix = sectionMap[activeSection];
    if (!prefix) return null;

    // Section icons matching original condition pages; urinary-incontinence treatment uses /solae.png on original site
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

    // Use type assertion to access fields dynamically
    const t = tilstand as unknown as Record<string, any>;
    const title = ((language === 'en' && t[`${prefix}_tittel_en`]) || t[`${prefix}_tittel`]) as string | undefined;
    const intro = ((language === 'en' && t[`${prefix}_intro_en`]) || t[`${prefix}_intro`]) as string | undefined;
    let trekkspill = t[`${prefix}_trekkspill`] as TilstandAccordionItem[] | string | undefined;
    if (typeof trekkspill === "string" && trekkspill.trim()) {
        try {
            trekkspill = JSON.parse(trekkspill) as TilstandAccordionItem[];
        } catch {
            trekkspill = undefined;
        }
    }

    // Specific fields for symptoms/causes
    const sitat = ((language === 'en' && t[`${prefix}_sitat_en`]) || t[`${prefix}_sitat`]) as string | undefined;
    const sitatKilde = ((language === 'en' && t[`${prefix}_sitat_kilde_en`]) || t[`${prefix}_sitat_kilde`]) as string | undefined;
    const isDiagnosisSection = activeSection === "diagnosis";

    // Parse diagnosis intro: blockquote → testimonial, img → side image, text → paragraphs
    // Only for urinary incontinence — other conditions use the default flow layout
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

            // 1. Extract blockquote
            const bq = root.querySelector("blockquote");
            if (bq && !sitat) {
                const ps = Array.from(bq.querySelectorAll("p"));
                const texts = ps.map(p => p.textContent?.trim() || "").filter(Boolean);
                if (texts.length >= 2) {
                    testimonial = texts.slice(0, -1).join(" ");
                    attribution = texts[texts.length - 1];
                } else if (texts.length === 1) {
                    testimonial = texts[0];
                }
                bq.remove();
            }

            // 2. Extract image
            const img = root.querySelector("img");
            if (img) {
                imageSrc = img.getAttribute("src") || "";
                imageAlt = img.getAttribute("alt") || "";
                const imgWrap = img.closest("p, figure") as HTMLElement | null;
                if (imgWrap && imgWrap !== root) imgWrap.remove(); else img.remove();
            }

            // 3. Collect all remaining content blocks (preserve lists, headings, etc.)
            const paragraphs: string[] = [];
            Array.from(root.childNodes).forEach(node => {
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

    // Exercises: render original design (CommonExerciseSection) when structured data from Directus exists
    if (activeSection === "exercises") {
        const tryTitle = ((language === "en" && t.ovelse_try_yourself_title_en) || t.ovelse_try_yourself_title || "") as string;
        const step1 = ((language === "en" && t.ovelse_step1_text_en) || t.ovelse_step1_text || "") as string;
        const tipsTitle = ((language === "en" && t.ovelse_tips_title_en) || t.ovelse_tips_title || "") as string;
        const tipsText = ((language === "en" && t.ovelse_tips_text_en) || t.ovelse_tips_text || "") as string;
        const videoSectionTitle = ((language === "en" && t.ovelse_video_section_title_en) || t.ovelse_video_section_title || "") as string;
        const videoSectionDesc = ((language === "en" && t.ovelse_video_section_description_en) || t.ovelse_video_section_description || "") as string;
        const videosRaw = (t.ovelse_videos as { src: string; title?: string; title_en?: string }[] | null) || [];
        const stepsRaw = (t.ovelse_steps as { number: number; text?: string; text_en?: string }[] | null) || [];
        const genderRaw = (t.ovelse_gender_instructions as { title?: string; title_en?: string; text?: string; text_en?: string; icon?: string; iconColor?: string }[] | null) || [];
        const appsRaw = t.ovelse_smartphone_apps as SmartphoneApps | null | undefined;

        const hasStructured = tryTitle || step1 || videoSectionTitle || videosRaw.length > 0;
        if (hasStructured) {
            // Extract h4/h5 headings from videoSectionDesc to use as per-video titles
            let descHeadings: string[] = [];
            if (videoSectionDesc) {
                try {
                    const descDoc = new DOMParser().parseFromString(`<div>${videoSectionDesc}</div>`, 'text/html');
                    const headingEls = descDoc.querySelectorAll('h4, h5');
                    descHeadings = Array.from(headingEls).map(el => el.textContent?.trim() || '').filter(Boolean);
                } catch { /* ignore */ }
            }

            const videos: Video[] = videosRaw.map((v, i) => ({
                src: v.src,
                title: (language === "en" && v.title_en)
                    ? v.title_en
                    : (v.title || descHeadings[i] || "")
            }));
            const exerciseSteps: ExerciseStep[] = stepsRaw
                .sort((a, b) => a.number - b.number)
                .map((s) => ({
                    number: s.number,
                    text: (language === "en" && s.text_en) ? s.text_en : (s.text || "")
                }));
            const genderInstructions: GenderInstruction[] = genderRaw.map((g) => ({
                title: (language === "en" && g.title_en) ? g.title_en : (g.title || ""),
                text: (language === "en" && g.text_en) ? g.text_en : (g.text || ""),
                icon: g.icon || "",
                iconColor: g.iconColor || "#053870"
            }));
            const app = appsRaw as Record<string, string | undefined> | null | undefined;
            const smartphoneApps: SmartphoneApps | undefined = app
                ? {
                    title: (language === "en" && app.title_en) ? app.title_en : (app.title || ""),
                    description: (language === "en" && app.description_en) ? app.description_en : (app.description || ""),
                    linkText: (language === "en" && app.linkText_en) ? app.linkText_en : (app.linkText || ""),
                    linkUrl: app.linkUrl || ""
                }
                : undefined;

            // If we extracted titles from the description headings, don't pass the description
            // (to avoid rendering the h4 list as cards below the video grid)
            const finalDesc = descHeadings.length > 0 ? undefined : (videoSectionDesc || undefined);

            return (
                <CommonExerciseSection
                    pageTitle={title || (language === "no" ? "Øvelser" : "Exercises")}
                    tryYourselfTitle={tryTitle}
                    step1Text={step1}
                    genderInstructions={genderInstructions}
                    tipsTitle={tipsTitle}
                    tipsText={tipsText}
                    exerciseSteps={exerciseSteps}
                    videoSectionTitle={videoSectionTitle}
                    videoSectionDescription={finalDesc}
                    videos={videos}
                    smartphoneApps={smartphoneApps}
                />
            );
        }
    }

    const hasTrekkspill = Array.isArray(trekkspill) && trekkspill.length > 0;
    if (!title && !intro && !hasTrekkspill && !sitat) return null;

    // Helper: get language-aware field from accordion item
    const getField = (item: TilstandAccordionItem, field: 'tittel' | 'innhold') => {
        const enField = `${field}_en` as keyof TilstandAccordionItem;
        return (language === 'en' && item[enField]) ? String(item[enField]) : String(item[field]);
    };

    // Helper to slugify title for deep linking (match original site anchors e.g. #konservativ-behandling)
    const slugify = (text: string) => {
        const trimmed = (text || '').trim();
        const withoutLeadingNumber = trimmed.replace(/^\s*\d+\.\s*/, '');
        const base = withoutLeadingNumber || trimmed;
        return base
            .toLowerCase()
            .replace(/[ææ]/g, 'ae')
            .replace(/[øø]/g, 'o')
            .replace(/[åå]/g, 'a')
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    // Extract images+captions from Directus HTML; handles grid containers, <figure>, and standalone <img>
    const parseContentAndImages = (html: string): { textHtml: string; images: { src: string; alt: string; caption: string }[] } => {
        if (!html) return { textHtml: '', images: [] };
        const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
        const root = doc.body.firstChild as HTMLElement;
        if (!root) return { textHtml: '', images: [] };
        const images: { src: string; alt: string; caption: string }[] = [];

        root.querySelectorAll('img').forEach((img) => {
            const src = img.getAttribute('src') || '';
            const alt = img.getAttribute('alt') || '';
            let caption = '';

            const figure = img.closest('figure');
            if (figure) {
                const fc = figure.querySelector('figcaption');
                caption = fc?.textContent?.trim() || '';
            } else {
                const parent = img.parentElement;
                if (parent) {
                    const siblingP = Array.from(parent.children).find(
                        (el) => el.tagName === 'P' && el !== img
                    );
                    if (siblingP) caption = siblingP.textContent?.trim() || '';
                }
            }

            if (!caption) caption = alt;
            images.push({ src, alt, caption });
        });

        // Build clean text HTML by removing all image-containing elements
        const clone = root.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('figure').forEach((el) => el.remove());
        clone.querySelectorAll('div').forEach((div) => {
            if (div.querySelector('img')) div.remove();
        });
        clone.querySelectorAll('img').forEach((img) => {
            const parent = img.parentElement;
            if (parent && parent.children.length <= 2) parent.remove();
            else img.remove();
        });
        clone.querySelectorAll('p, div').forEach((el) => {
            if (!el.textContent?.trim() && !el.querySelector('img, iframe')) el.remove();
        });

        return { textHtml: clone.innerHTML.trim(), images };
    };

    // Render HTML with blockquote → highlightBox support
    const renderRichText = (html: string, style?: React.CSSProperties): React.ReactNode => {
        if (!html) return null;
        const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
        const root = doc.body.firstChild as HTMLElement;
        if (!root) return <div className={styles.enhancedParagraph} style={style} dangerouslySetInnerHTML={{ __html: html }} />;

        const nodes = Array.from(root.childNodes);
        const hasBlockquote = nodes.some(n => (n as HTMLElement).tagName === 'BLOCKQUOTE');

        if (!hasBlockquote) {
            return <div className={styles.enhancedParagraph} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
        }

        return (
            <>
                {nodes.map((node, i) => {
                    const el = node as HTMLElement;
                    if (el.nodeType === 1 && el.tagName === 'BLOCKQUOTE') {
                        return (
                            <div key={i} className={styles.highlightBox}>
                                <div dangerouslySetInnerHTML={{ __html: el.innerHTML }} />
                            </div>
                        );
                    }
                    if (el.nodeType === 1 && el.textContent?.trim()) {
                        return <div key={i} className={styles.enhancedParagraph} style={style} dangerouslySetInnerHTML={{ __html: el.outerHTML }} />;
                    }
                    return null;
                })}
            </>
        );
    };

    const renderPatientStoryCards = (html: string) => {
        if (!html) return null;
        try {
            const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
            let root = doc.body.firstChild as HTMLElement;
            if (!root) return null;

            // Unwrap if content is wrapped in a single <div>
            if (root.children.length === 1 && root.children[0].tagName === 'DIV') {
                root = root.children[0] as HTMLElement;
            }

            type StoryCard = {
                name: string;
                imageSrc: string;
                imageAlt: string;
                description: string;
                linkUrl: string;
                linkText: string;
            };

            const stories: StoryCard[] = [];
            let current: StoryCard | null = null;

            Array.from(root.childNodes).forEach((node) => {
                const el = node as HTMLElement;
                if (el.nodeType !== 1) return;

                if (el.tagName === 'H4' || el.tagName === 'H3') {
                    if (current) stories.push(current);
                    current = { name: el.textContent?.trim() || '', imageSrc: '', imageAlt: '', description: '', linkUrl: '', linkText: '' };
                } else if (current) {
                    const img = el.tagName === 'IMG' ? el as HTMLImageElement : el.querySelector('img');
                    const anchor = el.tagName === 'A' ? el as HTMLAnchorElement : el.querySelector('a');

                    if (img && !current.imageSrc) {
                        current.imageSrc = img.getAttribute('src') || '';
                        current.imageAlt = img.getAttribute('alt') || current.name;
                    } else if (anchor && !current.linkUrl) {
                        current.linkUrl = anchor.getAttribute('href') || '#';
                        current.linkText = anchor.textContent?.trim() || (language === 'en' ? 'Read the story' : 'Les historien');
                    } else {
                        const text = el.textContent?.trim();
                        if (text && !current.description) {
                            current.description = text;
                        }
                    }
                }
            });
            if (current) stories.push(current);

            if (stories.length === 0) return renderContentWithImageCards(html);

            return (
                <div className={styles.patientStoryGrid}>
                    {stories.map((story, i) => (
                        <div key={i} className={styles.patientStoryCard}>
                            <h4 className={styles.patientStoryName}>{story.name}</h4>
                            {story.imageSrc && (
                                <div className={styles.patientStoryImageWrapper}>
                                    <img
                                        src={story.imageSrc}
                                        alt={story.imageAlt}
                                        className={styles.patientStoryImage}
                                    />
                                </div>
                            )}
                            {story.description && (
                                <p className={styles.patientStoryDescription}>{story.description}</p>
                            )}
                            {story.linkUrl && (
                                <a
                                    href={story.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.patientStoryLink}
                                >
                                    {story.linkText}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            );
        } catch {
            return renderContentWithImageCards(html);
        }
    };

    const renderContentWithImageCards = (html: string, reverseImages = false, sideBySideImages = false) => {
        if (!html) return null;
        try {
            const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
            const root = doc.body.firstChild as HTMLElement;
            if (!root) return null;

            // Split content at h4/h3 boundaries into separate sections
            type CardSection = {
                headingText: string;
                headingTag: string;
                paragraphs: string[];
                links: { text: string; url: string }[];
                images: { src: string; alt: string; caption: string }[];
            };

            const introElements: string[] = [];
            const cards: CardSection[] = [];
            let currentCard: CardSection | null = null;

            Array.from(root.childNodes).forEach((node) => {
                const el = node as HTMLElement;
                const isHeading = el.nodeType === 1 && (el.tagName === 'H4' || el.tagName === 'H3');

                if (isHeading) {
                    if (currentCard) cards.push(currentCard);
                    currentCard = {
                        headingText: el.textContent?.trim() || '',
                        headingTag: el.tagName.toLowerCase(),
                        paragraphs: [],
                        links: [],
                        images: []
                    };
                } else if (currentCard) {
                    // Check if this node is purely an image element
                    const isPureImg = el.nodeType === 1 && (
                        el.tagName === 'IMG' ||
                        (el.tagName === 'FIGURE' && !el.querySelector('p'))
                    );
                    // Check if this node is a container that has an image mixed with text
                    const isMixedContainer = el.nodeType === 1 && !isPureImg &&
                        el.querySelector && el.querySelector('img');

                    if (isPureImg) {
                        const img = el.tagName === 'IMG' ? el : (el.querySelector('img') as HTMLImageElement);
                        if (img) {
                            const src = img.getAttribute('src') || '';
                            const alt = img.getAttribute('alt') || '';
                            let caption = '';
                            const figure = el.tagName === 'FIGURE' ? el : img.closest('figure');
                            if (figure) {
                                const fc = figure.querySelector('figcaption');
                                caption = fc?.textContent?.trim() || '';
                            }
                            if (!caption) caption = alt;
                            currentCard.images.push({ src, alt, caption });
                        }
                    } else if (isMixedContainer) {
                        // Container has both text and images — extract both
                        // Extract images
                        el.querySelectorAll('img').forEach((img: HTMLImageElement) => {
                            const src = img.getAttribute('src') || '';
                            const alt = img.getAttribute('alt') || '';
                            let caption = '';
                            const figure = img.closest('figure');
                            if (figure) {
                                const fc = figure.querySelector('figcaption');
                                caption = fc?.textContent?.trim() || '';
                            }
                            if (!caption) caption = alt;
                            currentCard!.images.push({ src, alt, caption });
                        });
                        // Extract text content (remove image elements first)
                        const clone = el.cloneNode(true) as HTMLElement;
                        const imgEls = Array.from(clone.querySelectorAll('figure, img'));
                        imgEls.forEach(imgEl => {
                            const parent = imgEl.parentElement;
                            imgEl.remove();
                            if (parent && parent !== clone && !parent.textContent?.trim()) {
                                parent.remove();
                            }
                        });
                        // Extract remaining text paragraphs
                        const remainingText = clone.textContent?.trim();
                        if (remainingText) {
                            // Check for links
                            const anchors = clone.querySelectorAll('a');
                            if (anchors.length > 0) {
                                anchors.forEach((a) => {
                                    currentCard!.links.push({
                                        text: a.textContent?.trim() || '',
                                        url: a.getAttribute('href') || '#'
                                    });
                                });
                            }
                            currentCard.paragraphs.push(clone.innerHTML.trim());
                        }
                    } else if (el.nodeType === 1 && el.tagName === 'BLOCKQUOTE') {
                        currentCard.paragraphs.push(el.outerHTML);
                    } else if (el.nodeType === 1) {
                        const anchors = el.querySelectorAll('a');
                        if (anchors.length > 0) {
                            const textWithoutLinks = el.textContent?.trim() || '';
                            anchors.forEach((a) => {
                                currentCard!.links.push({
                                    text: a.textContent?.trim() || '',
                                    url: a.getAttribute('href') || '#'
                                });
                            });
                            if (anchors.length > 0 && textWithoutLinks !== anchors[0].textContent?.trim()) {
                                currentCard.paragraphs.push(el.innerHTML);
                            }
                        } else {
                            const text = el.textContent?.trim();
                            if (text) {
                                currentCard.paragraphs.push(el.innerHTML || text);
                            }
                        }
                    }
                } else {
                    // Before any h4 — intro text
                    if (el.nodeType === 1) {
                        const text = el.textContent?.trim();
                        if (text) introElements.push(el.outerHTML);
                    }
                }
            });

            if (currentCard) cards.push(currentCard);

            // If there are no h4 cards, render as a simple layout (side by side if media present)
            if (cards.length === 0) {
                let textBefore: string[] = [];
                let textAfter: string[] = [];
                let foundMedia = false;
                const medias: { type: 'img' | 'media'; src: string; alt: string; caption: string; html?: string }[] = [];

                Array.from(root.childNodes).forEach((node) => {
                    const el = node as HTMLElement;

                    const isPureMedia = el.nodeType === 1 && (
                        el.tagName === 'IMG' ||
                        el.tagName === 'IFRAME' ||
                        el.tagName === 'VIDEO' ||
                        (el.tagName === 'FIGURE' && !el.querySelector('p')) ||
                        (el.classList && el.classList.contains('video-wrapper'))
                    );
                    const isMixedContainer = el.nodeType === 1 && !isPureMedia && !!el.querySelector?.('img, iframe, video');

                    if (isPureMedia || isMixedContainer) {
                        foundMedia = true;

                        // Extract media
                        if (isPureMedia) {
                            const img = el.tagName === 'IMG' ? el : (el.querySelector('img') as HTMLImageElement);
                            const iframeOrVideo = (el.tagName === 'IFRAME' || el.tagName === 'VIDEO' || el.classList?.contains('video-wrapper'))
                                ? el
                                : (el.querySelector('iframe, video') as HTMLElement);

                            let caption = '';
                            const figure = el.tagName === 'FIGURE' ? el : el.closest('figure');
                            if (figure) {
                                const fc = figure.querySelector('figcaption');
                                caption = fc?.textContent?.trim() || '';
                            }

                            if (img) {
                                const src = img.getAttribute('src') || '';
                                const alt = img.getAttribute('alt') || '';
                                medias.push({ type: 'img', src, alt: alt || caption, caption });
                            } else if (iframeOrVideo) {
                                medias.push({ type: 'media', src: '', alt: caption, caption, html: iframeOrVideo.outerHTML });
                            }
                        } else if (isMixedContainer) {
                            el.querySelectorAll('img, iframe, video').forEach((mediaEl: Element) => {
                                const isImg = mediaEl.tagName === 'IMG';
                                let caption = '';
                                const figure = mediaEl.closest('figure');
                                if (figure) {
                                    const fc = figure.querySelector('figcaption');
                                    caption = fc?.textContent?.trim() || '';
                                }

                                if (isImg) {
                                    const img = mediaEl as HTMLImageElement;
                                    const src = img.getAttribute('src') || '';
                                    const alt = img.getAttribute('alt') || '';
                                    medias.push({ type: 'img', src, alt: alt || caption, caption });
                                } else {
                                    medias.push({ type: 'media', src: '', alt: caption, caption, html: mediaEl.outerHTML });
                                }
                            });

                            // Extract remaining text
                            const clone = el.cloneNode(true) as HTMLElement;
                            clone.querySelectorAll('figure, img, iframe, video').forEach(mediaEl => {
                                const parent = mediaEl.parentElement;
                                mediaEl.remove();
                                if (parent && parent !== clone && !parent.textContent?.trim()) {
                                    parent.remove();
                                }
                            });

                            const remainingHtml = clone.innerHTML.trim();
                            if (remainingHtml) {
                                textAfter.push(remainingHtml);
                            }
                        }
                    } else {
                        const content = el.nodeType === 1 ? el.outerHTML : (el.textContent || '');
                        if (content.trim()) {
                            if (foundMedia) textAfter.push(content);
                            else textBefore.push(content);
                        }
                    }
                });

                if (medias.length > 0) {
                    if (reverseImages) medias.reverse();
                    // Remove blank/whitespace-only entries so they don't render as empty cards
                    const cleanedTextBefore = textBefore.filter(p => p.replace(/<[^>]*>/g, '').trim() !== '');
                    textBefore.length = 0;
                    cleanedTextBefore.forEach(p => textBefore.push(p));
                    const cleanedTextAfter = textAfter.filter(p => p.replace(/<[^>]*>/g, '').trim() !== '');
                    textAfter.length = 0;
                    cleanedTextAfter.forEach(p => textAfter.push(p));
                    const videoMedias = medias.filter(m => m.type === 'media');
                    const imageMedias = medias.filter(m => m.type === 'img');
                    const isVideoGrid = videoMedias.length > 1 && imageMedias.length === 0;

                    if (isVideoGrid) {
                        return (
                            <>
                                {textBefore.length > 0 && (
                                    <div style={{ marginBottom: '1rem' }}>
                                        {textBefore.map((p, j) => (
                                            <React.Fragment key={j}>
                                                {renderRichText(p)}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}
                                <div className={styles.videoGrid}>
                                    {videoMedias.map((media, j) => (
                                        <div key={j} className={styles.videoItem}>
                                            <div className={styles.videoContainer} dangerouslySetInnerHTML={{ __html: media.html || '' }} />
                                        </div>
                                    ))}
                                </div>
                                {textAfter.length > 0 && (
                                    <div style={{ marginTop: '1rem' }}>
                                        {textAfter.map((p, j) => (
                                            <React.Fragment key={j}>
                                                {renderRichText(p)}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}
                            </>
                        );
                    }

                    const imageMediasDefault = medias.filter(m => m.type === 'img');
                    const useSideBySide = imageMediasDefault.length === 1 && textBefore.length > 0 && activeSection !== "symptoms";

                    if (useSideBySide) {
                        const allText = [...textBefore, ...textAfter].join('');
                        return (
                            <div className={styles.sideBySideContainer}>
                                <div className={styles.sideBySideText}>
                                    {allText && (
                                        <div className={styles.enhancedParagraph} dangerouslySetInnerHTML={{ __html: allText }} />
                                    )}
                                </div>
                                <div className={styles.sideBySideImage}>
                                    {imageMediasDefault.map((media, j) => (
                                        <img
                                            key={j}
                                            src={media.src}
                                            alt={media.alt}
                                            className={styles.introImage}
                                            style={{ borderRadius: '0.75rem' }}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    // Auto 2-column grid when there are 2+ images (covers urinveienes, tarmtomming, nervesystemet etc.)
                    if (imageMedias.length >= 2) {
                        return (
                            <>
                                {textBefore.map((p, j) => (
                                    <React.Fragment key={j}>
                                        {renderRichText(p)}
                                    </React.Fragment>
                                ))}
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                                    {imageMedias.map((media, j) => (
                                        <div key={j} style={{ flex: '1 1 calc(50% - 0.5rem)', minWidth: 0 }}>
                                            <img
                                                src={media.src}
                                                alt={media.alt}
                                                className={styles.anatomyImage}
                                                onClick={() => setSelectedImage({ src: media.src, alt: media.alt })}
                                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage({ src: media.src, alt: media.alt }); } }}
                                                role="button"
                                                tabIndex={0}
                                                style={{ cursor: 'pointer', width: '100%', height: '340px', objectFit: 'contain', display: 'block' }}
                                            />
                                            {media.caption && (
                                                <p className={styles.anatomyCaption}>{media.caption}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {textAfter.map((p, j) => (
                                    <React.Fragment key={j}>
                                        {renderRichText(p)}
                                    </React.Fragment>
                                ))}
                            </>
                        );
                    }

                    return (
                        <>
                            {textBefore.map((p, j) => (
                                <React.Fragment key={j}>
                                    {renderRichText(p)}
                                </React.Fragment>
                            ))}
                            {medias.map((media, j) => (
                                <div key={j} style={{ margin: '1rem 0', textAlign: 'center' }}>
                                    {media.type === 'img' ? (
                                        <img
                                            src={media.src}
                                            alt={media.alt}
                                            onClick={() => setSelectedImage({ src: media.src, alt: media.alt })}
                                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage({ src: media.src, alt: media.alt }); } }}
                                            role="button"
                                            tabIndex={0}
                                            style={{ cursor: 'pointer', width: '100%', maxWidth: '900px', height: 'auto', display: 'inline-block', borderRadius: '0.75rem', objectFit: 'contain' }}
                                        />
                                    ) : (
                                        <div dangerouslySetInnerHTML={{ __html: media.html || '' }} />
                                    )}
                                    {media.caption && (
                                        <p className={styles.anatomyCaption}>{media.caption}</p>
                                    )}
                                </div>
                            ))}
                            {textAfter.map((p, j) => (
                                <React.Fragment key={j}>
                                    {renderRichText(p)}
                                </React.Fragment>
                            ))}
                        </>
                    );
                }

                // Fallback for text only
                const { textHtml } = parseContentAndImages(html);
                return (
                    <>
                        {textHtml && renderRichText(textHtml, { width: '100%' })}
                    </>
                );
            }

            // Render using original CSS module classes
            return (
                <>
                    {introElements.map((elHtml, i) => (
                        <React.Fragment key={`intro-${i}`}>
                            {renderRichText(elHtml)}
                        </React.Fragment>
                    ))}

                    {/* Each subsection: use h3.subsectionTitle when original was h3 (match urinary-incontinence treatment layout) */}
                    {cards.map((card, i) => {
                        const HeadingTag = card.headingTag === "h3" ? "h3" : "h4";
                        const headingClass = card.headingTag === "h3" ? styles.subsectionTitle : styles.normalFunctionTitle;
                        return (
                            <div key={i} className={styles.normalFunctionSection}>
                                <HeadingTag className={headingClass}>{card.headingText}</HeadingTag>

                                {/* Side-by-side layout for causes with images */}
                                {card.images.length > 0 ? (
                                    <div className={styles.sideBySideContainer}>
                                        <div className={styles.sideBySideText}>
                                            {card.paragraphs.map((p, j) => (
                                                <React.Fragment key={j}>
                                                    {renderRichText(p)}
                                                </React.Fragment>
                                            ))}
                                            {card.links.length > 0 && card.links.length <= 1 && (
                                                <p className={styles.enhancedParagraph}>
                                                    {card.links.map((link, j) => (
                                                        <a key={j}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={styles.resourceLink}
                                                        >
                                                            {link.text}
                                                        </a>
                                                    ))}
                                                </p>
                                            )}
                                        </div>
                                        <div className={styles.sideBySideImage}>
                                            {card.images.map((img, j) => (
                                                <div key={j} className={styles.causesImageWrapper}>
                                                    <img src={img.src} alt={img.alt} className={styles.introImage} />
                                                    {img.caption && (
                                                        <p className={styles.sideBySideImageCaption}>{img.caption}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {card.paragraphs.map((p, j) => (
                                            <React.Fragment key={j}>
                                                {renderRichText(p)}
                                            </React.Fragment>
                                        ))}

                                        {/* Single link */}
                                        {card.links.length === 1 && !card.paragraphs.some(p => p.includes('<a ')) && (
                                            <p className={styles.enhancedParagraph}>
                                                <a
                                                    href={card.links[0].url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.resourceLink}
                                                >
                                                    {card.links[0].text}
                                                </a>
                                            </p>
                                        )}

                                        {/* Multiple links (e.g., Obstipasjon) */}
                                        {card.links.length > 1 && !card.paragraphs.some(p => p.includes('<a ')) && (
                                            <p className={styles.enhancedParagraph}>
                                                {card.links.map((link, j) => (
                                                    <span key={j}>
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={styles.resourceLink}
                                                        >
                                                            {link.text}
                                                        </a>
                                                        {j < card.links.length - 1 && ' og '}
                                                    </span>
                                                ))}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </>
            );
        } catch (e) {
            console.error('renderContentWithImageCards error:', e);
            return html ? <div className={styles.enhancedParagraph} dangerouslySetInnerHTML={{ __html: html }} /> : null;
        }
    };

    // Render image based on positioning
    const renderImage = (item: TilstandAccordionItem) => {
        const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url;
        if (!imgSrc || item.bilde_posisjon === 'none') return null;

        const altText = (language === 'en' && item.bilde_alt_en) ? item.bilde_alt_en : (item.bilde_alt || item.tittel);
        const captionText = (language === 'en' && item.bilde_caption_en) ? item.bilde_caption_en : item.bilde_caption;

        return (
            <div className={`${styles.anatomyItem} ${styles.anatomyItemStandalone}`}>
                <img
                    src={imgSrc}
                    alt={altText}
                    className={styles.anatomyImage}
                    onClick={() => setSelectedImage({ src: imgSrc, alt: altText })}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage({ src: imgSrc, alt: altText }); } }}
                    role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                />
                {captionText && (
                    <p className={styles.anatomyCaption}>{captionText}</p>
                )}
            </div>
        );
    };

    // Render structured links
    const renderLinks = (item: TilstandAccordionItem) => {
        if (!item.lenker || item.lenker.length === 0) return null;

        return (
            <div style={{ marginTop: '1rem' }}>
                {item.lenker.map((link, i) => (
                    <p key={i} className={styles.enhancedParagraph}>
                        <a
                            href={link.url}
                            target={link.url.startsWith('http') ? '_blank' : undefined}
                            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={styles.resourceLink}
                        >
                            {(language === 'en' && link.tekst_en) ? link.tekst_en : link.tekst}
                        </a>
                    </p>
                ))}
            </div>
        );
    };

    return (
        <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                    <img
                        src={sectionIcon}
                        alt={title}
                        width="24"
                        height="24"
                    />
                </div>
                <h2 className={styles.sectionTitle}>{title || (activeSection === "normal-functions" ? (language === 'no' ? 'Funksjon' : 'Normal Functions') : activeSection)}</h2>
            </div>

            {sitat && activeSection !== "causes" && activeSection !== "diagnosis" && (
                <div className={styles.quoteContainer}>
                    <blockquote className={styles.patientQuote}>
                        <p className={styles.quoteText}>"{sitat}"</p>
                        {sitatKilde && (
                            <cite className={styles.quoteAuthor}>— {sitatKilde}</cite>
                        )}
                    </blockquote>
                </div>
            )}

            <div className={styles.sectionContent}>
                {diagnosisParsed && (
                    <div className={styles.diagnosisContentCard}>
                        {diagnosisParsed.testimonial && (
                            <div className={styles.diagnosisTestimonialBox}>
                                <blockquote className={styles.patientQuote}>
                                    <p className={styles.quoteText}>{diagnosisParsed.testimonial}</p>
                                    {diagnosisParsed.attribution && (
                                        <cite className={styles.quoteAuthor}>{diagnosisParsed.attribution}</cite>
                                    )}
                                </blockquote>
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
                                    <img
                                        src={diagnosisParsed.imageSrc}
                                        alt={diagnosisParsed.imageAlt || ''}
                                        className={styles.diagnosisImage}
                                        onClick={() => setSelectedImage({ src: diagnosisParsed.imageSrc, alt: diagnosisParsed.imageAlt })}
                                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedImage({ src: diagnosisParsed.imageSrc, alt: diagnosisParsed.imageAlt }); } }}
                                        role="button"
                                        tabIndex={0}
                                    />
                                </div>
                            </div>
                        ) : (
                            diagnosisParsed.paragraphs.map((p, i) => (
                                <div key={i} className={styles.enhancedParagraph} dangerouslySetInnerHTML={{ __html: p }} />
                            ))
                        )}
                    </div>
                )}
                {activeSection === "causes" && (sitat || intro) && (() => {
                    let causesTextHtml = intro || '';
                    let causesImgSrc = '';
                    let causesImgAlt = '';
                    if (intro) {
                        try {
                            const doc = new DOMParser().parseFromString(`<div>${intro}</div>`, 'text/html');
                            const root = doc.body.firstChild as HTMLElement;
                            if (root) {
                                const img = root.querySelector('img');
                                if (img) {
                                    causesImgSrc = img.getAttribute('src') || '';
                                    causesImgAlt = img.getAttribute('alt') || '';
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
                                    {sitatKilde && (
                                        <cite className={styles.causesQuoteAuthor}>— {sitatKilde}</cite>
                                    )}
                                </div>
                            )}
                            {causesTextHtml && (
                                <div className={causesImgSrc ? styles.sideBySideContainer : styles.causesIntro}>
                                    <div className={causesImgSrc ? styles.sideBySideText : undefined}>
                                        {renderRichText(causesTextHtml)}
                                    </div>
                                    {causesImgSrc && (
                                        <div className={styles.sideBySideImage}>
                                            <img
                                                src={causesImgSrc}
                                                alt={causesImgAlt}
                                                className={styles.introImage}
                                                style={{ borderRadius: '0.75rem' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })()}
                {intro && activeSection === "diagnosis" && !diagnosisParsed && (() => {
                    let diagTextHtml = intro;
                    let diagImgSrc = '';
                    let diagImgAlt = '';
                    let diagImgCaption = '';
                    try {
                        const doc = new DOMParser().parseFromString(`<div>${intro}</div>`, 'text/html');
                        const root = doc.body.firstChild as HTMLElement;
                        if (root) {
                            const img = root.querySelector('img');
                            if (img) {
                                diagImgSrc = img.getAttribute('src') || '';
                                diagImgAlt = img.getAttribute('alt') || '';
                                const figure = img.closest('figure');
                                if (figure) {
                                    const fc = figure.querySelector('figcaption');
                                    diagImgCaption = fc?.textContent?.trim() || '';
                                    figure.remove();
                                } else {
                                    const parent = img.parentElement;
                                    img.remove();
                                    if (parent && parent !== root && !parent.textContent?.trim()) parent.remove();
                                }
                                diagTextHtml = root.innerHTML;
                            }
                        }
                    } catch { /* use raw intro */ }

                    if (diagImgSrc) {
                        return (
                            <div className={styles.sideBySideContainer}>
                                <div className={styles.sideBySideText}>
                                    {renderRichText(diagTextHtml)}
                                </div>
                                <div className={styles.sideBySideImage}>
                                    <img
                                        src={diagImgSrc}
                                        alt={diagImgAlt}
                                        className={styles.introImage}
                                        style={{ borderRadius: '0.75rem' }}
                                    />
                                    {diagImgCaption && (
                                        <p className={styles.sideBySideImageCaption}>{diagImgCaption}</p>
                                    )}
                                </div>
                            </div>
                        );
                    }
                    return renderContentWithImageCards(intro);
                })()}
                {intro && activeSection !== "causes" && activeSection !== "symptoms" && activeSection !== "diagnosis" && (() => {
                    // For exercises section intro: apply the same Prøv selv parser (gender cards + step numbers)
                    if (activeSection === "exercises" && intro) {
                        try {
                            const eDoc = new DOMParser().parseFromString(`<div>${intro}</div>`, 'text/html');
                            const eRoot = eDoc.body.firstChild as HTMLElement;
                            const genderWrapper = Array.from(eRoot.children).find(el => {
                                if (el.tagName !== 'DIV') return false;
                                const attrStyle = (el as HTMLElement).getAttribute('style') || '';
                                const hasFlexStyle = attrStyle.includes('flex');
                                const h4Text = Array.from(el.querySelectorAll('h4, h5')).map(h => h.textContent?.trim().toLowerCase() || '');
                                const hasGenderWord = h4Text.some(t => t.includes('kvinner') || t.includes('menn') || t.includes('women') || t.includes('men'));
                                return hasFlexStyle && hasGenderWord;
                            }) as HTMLElement | undefined;

                            if (genderWrapper) {
                                const GENDER_ICONS: Record<string, { icon: string; color: string }> = {
                                    kvinner: { icon: '♀', color: '#08488a' }, women: { icon: '♀', color: '#08488a' },
                                    menn: { icon: '♂', color: '#053870' }, men: { icon: '♂', color: '#053870' },
                                };
                                const step1Paragraphs: { num: string; text: string }[] = [];
                                let prevEl: Element | null = genderWrapper.previousElementSibling;
                                while (prevEl) {
                                    if (prevEl.tagName === 'P') {
                                        const raw = prevEl.textContent?.trim() || '';
                                        const m = raw.match(/^(\d+)\.\s+(.+)$/s);
                                        if (m) step1Paragraphs.unshift({ num: m[1], text: m[2] });
                                    }
                                    prevEl = prevEl.previousElementSibling;
                                }
                                const columnDivs = Array.from(genderWrapper.children).filter(c => c.tagName === 'DIV' && c.querySelector('h4, h5')) as HTMLElement[];
                                const genderCards = columnDivs.map(col => {
                                    const heading = col.querySelector('h4, h5');
                                    const title = heading?.textContent?.trim() || '';
                                    const key = title.toLowerCase();
                                    const iconInfo = Object.entries(GENDER_ICONS).find(([k]) => key.includes(k));
                                    const { icon = '♀', color = '#08488a' } = iconInfo?.[1] ?? {};
                                    const iconChar = col.querySelector('span')?.textContent?.trim() || icon;
                                    const bodyHtml = Array.from(col.querySelectorAll('p')).map(p => p.outerHTML).join('');
                                    return { title, icon: iconChar, color, bodyHtml };
                                });
                                let tipsTitle = '', tipsText = '';
                                const tipsDiv = genderWrapper.nextElementSibling as HTMLElement | null;
                                if (tipsDiv?.tagName === 'DIV') {
                                    const tipsStyle = tipsDiv.getAttribute('style') || '';
                                    if (tipsStyle.includes('#fff8e1') || tipsStyle.includes('#fef3c7') || tipsStyle.includes('#ffc107') || tipsStyle.includes('#f59e0b')) {
                                        const textEls = tipsDiv.querySelectorAll('p');
                                        tipsText = Array.from(textEls).slice(1).map(p => p.textContent?.trim() || '').join(' ') || Array.from(textEls).map(p => p.textContent?.trim() || '').join(' ');
                                        tipsTitle = tipsDiv.querySelector('p:first-child, strong')?.textContent?.trim() || 'Tips:';
                                        if (!Array.from(textEls).slice(1).length) tipsTitle = 'Tips:';
                                    }
                                }
                                const afterEl = (tipsTitle && tipsDiv) ? tipsDiv.nextElementSibling : genderWrapper.nextElementSibling;
                                const remainingSteps: { num: number; text: string }[] = [];
                                let curEl: Element | null = afterEl;
                                while (curEl) {
                                    if (curEl.tagName === 'OL') {
                                        const start = parseInt(curEl.getAttribute('start') || '1', 10);
                                        Array.from(curEl.querySelectorAll('li')).forEach((li, idx) => remainingSteps.push({ num: start + idx, text: li.textContent?.trim() || '' }));
                                    } else if (curEl.tagName === 'P') {
                                        const raw = curEl.textContent?.trim() || '';
                                        const m = raw.match(/^(\d+)\.\s+(.+)$/s);
                                        if (m) remainingSteps.push({ num: parseInt(m[1], 10), text: m[2] });
                                    }
                                    curEl = curEl.nextElementSibling;
                                }
                                if (genderCards.length >= 1) {
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
                                                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: card.color }}>{card.icon}</span>
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
                                                        {remainingSteps.map(s => (
                                                            <div key={s.num} className={styles.exerciseStep}>
                                                                <div className={styles.stepNumber}>{s.num}</div>
                                                                <p className={styles.enhancedParagraph}>{s.text}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                            }
                        } catch { /* fall through to default */ }
                    }
                    return renderContentWithImageCards(intro);
                })()}


                {Array.isArray(trekkspill) && trekkspill.map((item: TilstandAccordionItem, index: number) => {
                    const itemTitle = getField(item, 'tittel');
                    const itemTitleNo = item.tittel;
                    const itemContent = getField(item, 'innhold');
                    const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url;
                    const isSideBySide = item.bilde_posisjon === 'side' && imgSrc;
                    const itemId = slugify(itemTitleNo);
                    const hasUnderseksjoner = item.underseksjoner && item.underseksjoner.length > 0;

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

                    return (
                        <SectionAccordion
                            key={index}
                            title={itemTitle}
                            id={itemId}
                            isDarkMode={resolvedTheme === 'dark'}
                            defaultOpen={false}
                        >
                            {hasUnderseksjoner ? (
                                <>
                                    {itemContent && (
                                        <>
                                            {renderContentWithImageCards(itemContent)}
                                            {renderImage(item)}
                                            {renderLinks(item)}
                                        </>
                                    )}
                                    {item.underseksjoner!.map((sub, subIndex) => {
                                        const subTitle = (language === 'en' && sub.tittel_en) ? sub.tittel_en : sub.tittel;
                                        const subId = slugify(sub.tittel);
                                        return (
                                            <SectionAccordion
                                                key={subIndex}
                                                title={subTitle}
                                                id={`${itemId}-${subId}`}
                                                isDarkMode={resolvedTheme === 'dark'}
                                                defaultOpen={false}
                                            >
                                                {renderSubContent(sub)}
                                            </SectionAccordion>
                                        );
                                    })}
                                </>
                            ) : isSideBySide ? (
                                <div className={styles.sideBySideContainer}>
                                    <div className={styles.sideBySideText}>
                                        {renderContentWithImageCards(itemContent)}
                                        {renderLinks(item)}
                                    </div>
                                    <div className={`${styles.sideBySideImage} ${styles.anatomyItem}`}>
                                        <img
                                            src={imgSrc}
                                            alt={(language === 'en' && item.bilde_alt_en) ? item.bilde_alt_en : (item.bilde_alt || itemTitle)}
                                            className={styles.anatomyImage}
                                            onClick={() => setSelectedImage({ src: imgSrc!, alt: (language === 'en' && item.bilde_alt_en) ? item.bilde_alt_en! : (item.bilde_alt || itemTitle) })}
                                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage({ src: imgSrc!, alt: (language === 'en' && item.bilde_alt_en) ? item.bilde_alt_en! : (item.bilde_alt || itemTitle) }); } }}
                                            role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                                            tabIndex={0}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        {((language === 'en' && item.bilde_caption_en) || item.bilde_caption) && (
                                            <p className={styles.anatomyCaption}>{(language === 'en' && item.bilde_caption_en) ? item.bilde_caption_en : item.bilde_caption}</p>
                                        )}
                                    </div>
                                </div>
                            ) : (() => {
                                const isPatientStories = /pasienthistori/i.test(itemTitleNo) || /patient\s*stor/i.test(itemTitle);
                                if (isPatientStories && itemContent) {
                                    return (
                                        <>
                                            {renderPatientStoryCards(itemContent)}
                                            {renderImage(item)}
                                            {renderLinks(item)}
                                        </>
                                    );
                                }
                                const isFirstTreatmentAccordion = activeSection === "treatment" && index === 0 && conditionSlug === "urinary-incontinence";
                                const tryTitle = ((language === "en" && t.ovelse_try_yourself_title_en) || t.ovelse_try_yourself_title || "") as string;
                                const hasExerciseData = !!(tryTitle || (t.ovelse_steps as unknown[] | null)?.length || (t.ovelse_videos as unknown[] | null)?.length);
                                const injectExerciseSection = isFirstTreatmentAccordion && hasExerciseData;
                                const exerciseMarker = "<!-- INJECT_EXERCISE_SECTION -->";
                                const parts = injectExerciseSection && typeof itemContent === "string" && itemContent.includes(exerciseMarker)
                                    ? itemContent.split(exerciseMarker)
                                    : null;
                                if (parts && parts.length >= 2) {
                                    const videosRaw = (t.ovelse_videos as { src: string; title?: string; title_en?: string }[] | null) || [];
                                    const stepsRaw = (t.ovelse_steps as { number: number; text?: string; text_en?: string }[] | null) || [];
                                    const genderRaw = (t.ovelse_gender_instructions as { title?: string; title_en?: string; text?: string; text_en?: string; icon?: string; iconColor?: string }[] | null) || [];
                                    const app = t.ovelse_smartphone_apps as Record<string, string | undefined> | null | undefined;
                                    return (
                                        <>
                                            {renderContentWithImageCards(parts[0].trim())}
                                            <CommonExerciseSection
                                                pageTitle={language === "no" ? "Bekkenbunnstrening" : "Pelvic floor training"}
                                                tryYourselfTitle={tryTitle || (language === "no" ? "Prøv selv" : "Try it yourself")}
                                                step1Text={((language === "en" && t.ovelse_step1_text_en) || t.ovelse_step1_text || "") as string}
                                                genderInstructions={(genderRaw || []).map((g) => ({
                                                    title: (language === "en" && g.title_en) ? g.title_en : (g.title || ""),
                                                    text: (language === "en" && g.text_en) ? g.text_en : (g.text || ""),
                                                    icon: g.icon || "",
                                                    iconColor: g.iconColor || "#053870"
                                                }))}
                                                tipsTitle={((language === "en" && t.ovelse_tips_title_en) || t.ovelse_tips_title || "") as string}
                                                tipsText={((language === "en" && t.ovelse_tips_text_en) || t.ovelse_tips_text || "") as string}
                                                exerciseSteps={(stepsRaw || []).sort((a, b) => a.number - b.number).map((s) => ({
                                                    number: s.number,
                                                    text: (language === "en" && s.text_en) ? s.text_en : (s.text || "")
                                                }))}
                                                videoSectionTitle={((language === "en" && t.ovelse_video_section_title_en) || t.ovelse_video_section_title || "") as string}
                                                videoSectionDescription={((language === "en" && t.ovelse_video_section_description_en) || t.ovelse_video_section_description || "") as string}
                                                videos={(videosRaw || []).map((v) => ({ src: v.src, title: (language === "en" && v.title_en) ? v.title_en : (v.title || "") }))}
                                                smartphoneApps={app ? { title: (language === "en" && app.title_en) ? app.title_en : (app.title || ""), description: (language === "en" && app.description_en) ? app.description_en : (app.description || ""), linkText: (language === "en" && app.linkText_en) ? app.linkText_en : (app.linkText || ""), linkUrl: app.linkUrl || "" } : undefined}
                                            />
                                            {renderContentWithImageCards(parts[1].trim())}
                                            {renderImage(item)}
                                            {renderLinks(item)}
                                        </>
                                    );
                                }
                                if (injectExerciseSection && hasExerciseData) {
                                    const videosRaw = (t.ovelse_videos as { src: string; title?: string; title_en?: string }[] | null) || [];
                                    const stepsRaw = (t.ovelse_steps as { number: number; text?: string; text_en?: string }[] | null) || [];
                                    const genderRaw = (t.ovelse_gender_instructions as { title?: string; title_en?: string; text?: string; text_en?: string; icon?: string; iconColor?: string }[] | null) || [];
                                    const app = t.ovelse_smartphone_apps as Record<string, string | undefined> | null | undefined;
                                    return (
                                        <>
                                            {renderContentWithImageCards(itemContent)}
                                            <CommonExerciseSection
                                                pageTitle={language === "no" ? "Bekkenbunnstrening" : "Pelvic floor training"}
                                                tryYourselfTitle={tryTitle || (language === "no" ? "Prøv selv" : "Try it yourself")}
                                                step1Text={((language === "en" && t.ovelse_step1_text_en) || t.ovelse_step1_text || "") as string}
                                                genderInstructions={(genderRaw || []).map((g) => ({
                                                    title: (language === "en" && g.title_en) ? g.title_en : (g.title || ""),
                                                    text: (language === "en" && g.text_en) ? g.text_en : (g.text || ""),
                                                    icon: g.icon || "",
                                                    iconColor: g.iconColor || "#053870"
                                                }))}
                                                tipsTitle={((language === "en" && t.ovelse_tips_title_en) || t.ovelse_tips_title || "") as string}
                                                tipsText={((language === "en" && t.ovelse_tips_text_en) || t.ovelse_tips_text || "") as string}
                                                exerciseSteps={(stepsRaw || []).sort((a, b) => a.number - b.number).map((s) => ({
                                                    number: s.number,
                                                    text: (language === "en" && s.text_en) ? s.text_en : (s.text || "")
                                                }))}
                                                videoSectionTitle={((language === "en" && t.ovelse_video_section_title_en) || t.ovelse_video_section_title || "") as string}
                                                videoSectionDescription={((language === "en" && t.ovelse_video_section_description_en) || t.ovelse_video_section_description || "") as string}
                                                videos={(videosRaw || []).map((v) => ({ src: v.src, title: (language === "en" && v.title_en) ? v.title_en : (v.title || "") }))}
                                                smartphoneApps={app ? { title: (language === "en" && app.title_en) ? app.title_en : (app.title || ""), description: (language === "en" && app.description_en) ? app.description_en : (app.description || ""), linkText: (language === "en" && app.linkText_en) ? app.linkText_en : (app.linkText || ""), linkUrl: app.linkUrl || "" } : undefined}
                                            />
                                            {renderImage(item)}
                                            {renderLinks(item)}
                                        </>
                                    );
                                }
                                const isUrinveienes = activeSection === "normal-functions" && slugify(itemTitleNo) === "urinveienes-oppbygging";

                                // For Prøv selv accordion items: parse the HTML structure that Directus creates
                                // and re-render using the same CSS classes as CommonExerciseSection.
                                // Structure: <p>1. Step text</p> → <div flex/> (gender cards) → <div tipsbox/> → <ol> steps 2-N
                                if (itemContent) {
                                    try {
                                        const gDoc = new DOMParser().parseFromString(`<div>${itemContent}</div>`, 'text/html');
                                        const gRoot = gDoc.body.firstChild as HTMLElement;

                                        // Find a direct child div that uses flex layout and contains gender h4/h5 headings (the gender wrapper)
                                        const genderWrapper = Array.from(gRoot.children).find(el => {
                                            if (el.tagName !== 'DIV') return false;
                                            const attrStyle = (el as HTMLElement).getAttribute('style') || '';
                                            const hasFlexStyle = attrStyle.includes('flex');
                                            const h4Text = Array.from(el.querySelectorAll('h4, h5')).map(h => h.textContent?.trim().toLowerCase() || '');
                                            const hasGenderWord = h4Text.some(t => t.includes('kvinner') || t.includes('menn') || t.includes('women') || t.includes('men'));
                                            return hasFlexStyle && hasGenderWord;
                                        }) as HTMLElement | undefined;

                                        if (genderWrapper) {
                                            const GENDER_ICONS: Record<string, { icon: string; color: string }> = {
                                                kvinner: { icon: '♀', color: '#08488a' },
                                                women: { icon: '♀', color: '#08488a' },
                                                menn: { icon: '♂', color: '#053870' },
                                                men: { icon: '♂', color: '#053870' },
                                            };

                                            // --- Step 1: Find p elements before the gender wrapper ---
                                            const step1Paragraphs: { num: string; text: string }[] = [];
                                            let el: Element | null = genderWrapper.previousElementSibling;
                                            while (el) {
                                                if (el.tagName === 'P') {
                                                    const raw = el.textContent?.trim() || '';
                                                    const m = raw.match(/^(\d+)\.\s+(.+)$/s);
                                                    if (m) step1Paragraphs.unshift({ num: m[1], text: m[2] });
                                                }
                                                el = el.previousElementSibling;
                                            }

                                            // --- Gender cards: extract column divs ---
                                            const columnDivs = Array.from(genderWrapper.children).filter(
                                                c => c.tagName === 'DIV' && c.querySelector('h4, h5')
                                            ) as HTMLElement[];

                                            const genderCards = columnDivs.map(col => {
                                                const heading = col.querySelector('h4, h5');
                                                const title = heading?.textContent?.trim() || '';
                                                const key = title.toLowerCase();
                                                const iconInfo = Object.entries(GENDER_ICONS).find(([k]) => key.includes(k));
                                                const { icon = '♀', color = '#08488a' } = iconInfo?.[1] ?? {};
                                                const iconSpan = col.querySelector('span');
                                                const iconChar = iconSpan?.textContent?.trim() || icon;
                                                const bodyParagraphs = Array.from(col.querySelectorAll('p'));
                                                const bodyHtml = bodyParagraphs.map(p => p.outerHTML).join('');
                                                return { title, icon: iconChar, color, bodyHtml };
                                            });

                                            // --- Tips box: first div after genderWrapper with yellow/amber background ---
                                            let tipsTitle = '';
                                            let tipsText = '';
                                            const tipsDiv = genderWrapper.nextElementSibling as HTMLElement | null;
                                            if (tipsDiv && tipsDiv.tagName === 'DIV') {
                                                const tipsStyle = tipsDiv.getAttribute('style') || '';
                                                // detect yellow/amber background #fff8e1 or similar
                                                if (tipsStyle.includes('#fff8e1') || tipsStyle.includes('#fef3c7') || tipsStyle.includes('#ffc107') || tipsStyle.includes('#f59e0b')) {
                                                    const titleEl = tipsDiv.querySelector('p:first-child, strong');
                                                    tipsTitle = titleEl?.textContent?.trim() || '';
                                                    const textEl = tipsDiv.querySelectorAll('p');
                                                    // take all paragraphs except first (which is the title)
                                                    tipsText = Array.from(textEl).slice(1).map(p => p.textContent?.trim() || '').join(' ');
                                                    if (!tipsText) {
                                                        // If only one paragraph, use it (title + text may be same p)
                                                        tipsText = Array.from(textEl).map(p => p.textContent?.trim() || '').join(' ');
                                                        tipsTitle = 'Tips:';
                                                    }
                                                }
                                            }

                                            // --- Remaining steps: ol items after the tipsDiv (or genderWrapper if no tips) ---
                                            const afterEl = (tipsTitle && tipsDiv) ? tipsDiv.nextElementSibling : genderWrapper.nextElementSibling;
                                            const remainingSteps: { num: number; text: string }[] = [];
                                            let cur: Element | null = afterEl;
                                            while (cur) {
                                                if (cur.tagName === 'OL') {
                                                    const startAttr = parseInt(cur.getAttribute('start') || '1', 10);
                                                    Array.from(cur.querySelectorAll('li')).forEach((li, idx) => {
                                                        remainingSteps.push({ num: startAttr + idx, text: li.textContent?.trim() || '' });
                                                    });
                                                } else if (cur.tagName === 'P') {
                                                    const raw = cur.textContent?.trim() || '';
                                                    const m = raw.match(/^(\d+)\.\s+(.+)$/s);
                                                    if (m) remainingSteps.push({ num: parseInt(m[1], 10), text: m[2] });
                                                }
                                                cur = cur.nextElementSibling;
                                            }

                                            if (genderCards.length >= 1) {
                                                return (
                                                    <div className={styles.normalFunctionContent}>
                                                        <div className={styles.pelvicFloorExerciseSection}>
                                                            {/* Step 1 */}
                                                            {step1Paragraphs.map((s, si) => (
                                                                <div key={si} className={styles.exerciseStep}>
                                                                    <div className={styles.stepNumber}>{s.num}</div>
                                                                    <p className={styles.enhancedParagraph}>{s.text}</p>
                                                                </div>
                                                            ))}

                                                            {/* Gender cards */}
                                                            <div className={styles.genderInstructions}>
                                                                {genderCards.map((card, ci) => (
                                                                    <div key={ci} className={styles.genderCard}>
                                                                        <div className={styles.genderIcon}>
                                                                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: card.color }}>
                                                                                {card.icon}
                                                                            </span>
                                                                        </div>
                                                                        <h6 className={styles.genderTitle}>{card.title}</h6>
                                                                        <div
                                                                            className={styles.genderText}
                                                                            dangerouslySetInnerHTML={{ __html: card.bodyHtml }}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Tips box */}
                                                            {tipsTitle && (
                                                                <div className={styles.tipsBox}>
                                                                    <h6 className={styles.tipsTitle}>{tipsTitle}</h6>
                                                                    <p className={styles.enhancedParagraph}>{tipsText}</p>
                                                                </div>
                                                            )}

                                                            {/* Steps 2-N */}
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
                                                        {renderLinks(item)}
                                                    </div>
                                                );
                                            }
                                        }
                                    } catch { /* fall through */ }
                                }

                                // For accordion items with embedded iframes, extract them as a video grid
                                // with h4/h5 headings as per-video titles (avoids rendering empty h4 cards below)
                                if (itemContent) {
                                    try {
                                        const vDoc = new DOMParser().parseFromString(`<div>${itemContent}</div>`, 'text/html');
                                        const vRoot = vDoc.body.firstChild as HTMLElement;
                                        const vIframes = Array.from(vRoot.querySelectorAll('iframe, [data-oembed-url]'));
                                        const vHeadings = Array.from(vRoot.querySelectorAll('h4, h5')).map(h => h.textContent?.trim() || '');
                                        if (vIframes.length > 0) {
                                            return (
                                                <>
                                                    <div className={styles.videoGrid}>
                                                        {vIframes.map((iframe, vi) => {
                                                            const src = iframe.getAttribute('src') || iframe.getAttribute('data-oembed-url') || '';
                                                            const vTitle = vHeadings[vi] || '';
                                                            return (
                                                                <div key={vi} className={styles.videoItem}>
                                                                    <div className={styles.videoContainer}>
                                                                        <iframe
                                                                            src={src}
                                                                            title={vTitle || `Video ${vi + 1}`}
                                                                            allowFullScreen
                                                                            className={styles.videoIframe}
                                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                            loading="lazy"
                                                                        />
                                                                    </div>
                                                                    {vTitle && <p className={styles.videoTitle}>{vTitle}</p>}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    {renderLinks(item)}
                                                </>
                                            );
                                        }
                                    } catch { /* fall through to default rendering */ }
                                }


                                return (
                                    <>
                                        {renderContentWithImageCards(itemContent, isUrinveienes, false)}
                                        {renderImage(item)}
                                        {renderLinks(item)}
                                    </>
                                );
                            })()}
                        </SectionAccordion>
                    );
                })}
            </div>

            {/* Smartphone apps card — shown below the video section on exercises pages (not pelvic-pain) */}
            {activeSection === "exercises" && conditionSlug !== "pelvic-pain" && (() => {
                const appsData = t.ovelse_smartphone_apps as Record<string, string | undefined> | null | undefined;
                if (!appsData) return null;
                const appTitle = (language === 'en' && appsData.title_en) ? appsData.title_en : (appsData.title || '');
                const appDesc = (language === 'en' && appsData.description_en) ? appsData.description_en : (appsData.description || '');
                const appLinkText = (language === 'en' && appsData.linkText_en) ? appsData.linkText_en : (appsData.linkText || '');
                const appLinkUrl = appsData.linkUrl || '';
                if (!appTitle && !appDesc) return null;
                return (
                    <div className={styles.highlightBox} style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1.25rem' }}>💡</span>
                        <div>
                            {appTitle && <p><strong>{appTitle}</strong></p>}
                            {appDesc && <p>{appDesc}</p>}
                            {appLinkText && appLinkUrl && (
                                <p><a href={appLinkUrl} target="_blank" rel="noopener noreferrer">{appLinkText}</a></p>
                            )}
                        </div>
                    </div>
                );
            })()}

            {selectedImage && (
                <ImageModal
                    isOpen={!!selectedImage}
                    imageSrc={selectedImage.src}
                    imageAlt={selectedImage.alt}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
};
