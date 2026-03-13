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

    // On treatment (urinary-incontinence), compute exercise section items to show after treatment accordions (same as exercises page)
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
            const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const tryTitle = ((language === "en" && t.ovelse_try_yourself_title_en) || t.ovelse_try_yourself_title || "") as string;
            const step1 = ((language === "en" && t.ovelse_step1_text_en) || t.ovelse_step1_text || "") as string;
            const tipsTitle = ((language === "en" && t.ovelse_tips_title_en) || t.ovelse_tips_title || "") as string;
            const tipsText = ((language === "en" && t.ovelse_tips_text_en) || t.ovelse_tips_text || "") as string;
            const videoSectionTitle = ((language === "en" && t.ovelse_video_section_title_en) || t.ovelse_video_section_title || "") as string;
            const videoSectionDesc = ((language === "en" && t.ovelse_video_section_description_en) || t.ovelse_video_section_description || "") as string;
            const videosRaw = (t.ovelse_videos as { src: string; title?: string; title_en?: string }[] | null) || [];
            const stepsRaw = (t.ovelse_steps as { number: number; text?: string; text_en?: string }[] | null) || [];
            const genderRaw = (t.ovelse_gender_instructions as { title?: string; title_en?: string; text?: string; text_en?: string; icon?: string; iconColor?: string }[] | null) || [];
            const app = t.ovelse_smartphone_apps as Record<string, string | undefined> | null | undefined;
            const hasStructured = tryTitle || step1 || videoSectionTitle || videosRaw.length > 0;
            if (hasStructured) {
                const syntheticItems: TilstandAccordionItem[] = [];
                let tryHtml = '';
                if (step1) tryHtml += `<p><strong>1.</strong> ${esc(step1)}</p>`;
                genderRaw.forEach((g) => {
                    const gTitle = (language === 'en' && g.title_en) ? g.title_en : (g.title || '');
                    const gText = (language === 'en' && g.text_en) ? g.text_en : (g.text || '');
                    const gIcon = g.icon || '';
                    tryHtml += `<p><strong>${esc(gIcon)} ${esc(gTitle)}</strong></p><p>${esc(gText)}</p>`;
                });
                if (tipsTitle || tipsText) {
                    tryHtml += `<blockquote><p><strong>${esc(tipsTitle)}</strong></p><p>${esc(tipsText)}</p></blockquote>`;
                }
                stepsRaw.sort((a, b) => a.number - b.number).forEach((s) => {
                    const sText = (language === 'en' && s.text_en) ? s.text_en : (s.text || '');
                    tryHtml += `<p><strong>${s.number}.</strong> ${esc(sText)}</p>`;
                });
                if (tryTitle && tryHtml) {
                    syntheticItems.push({ tittel: tryTitle, innhold: tryHtml });
                }
                let videoHtml = '';
                if (videoSectionDesc) videoHtml += `<p>${esc(videoSectionDesc)}</p>`;
                videosRaw.forEach((v) => {
                    const vTitle = (language === 'en' && v.title_en) ? v.title_en : (v.title || '');
                    if (vTitle) videoHtml += `<p><strong>${esc(vTitle)}</strong></p>`;
                    videoHtml += `<div style="position:relative;padding-bottom:56.25%;height:0;margin:1rem 0"><iframe src="${v.src}" title="${esc(vTitle)}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;border-radius:8px" allowfullscreen loading="lazy"></iframe></div>`;
                });
                if (app) {
                    const appTitle = (language === 'en' && app.title_en) ? app.title_en : (app.title || '');
                    const appDesc = (language === 'en' && app.description_en) ? app.description_en : (app.description || '');
                    const appLinkText = (language === 'en' && app.linkText_en) ? app.linkText_en : (app.linkText || '');
                    const appLinkUrl = app.linkUrl || '';
                    videoHtml += `<blockquote><p><strong>${esc(appTitle)}</strong></p><p>${esc(appDesc)}</p><p><a href="${appLinkUrl}" target="_blank" rel="noopener noreferrer">${esc(appLinkText)}</a></p></blockquote>`;
                }
                if (videoSectionTitle && videoHtml) {
                    syntheticItems.push({ tittel: videoSectionTitle, innhold: videoHtml });
                }
                if (syntheticItems.length > 0) {
                    exerciseSectionItems = syntheticItems;
                }
            }
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

        const captionTexts = new Set<string>();

        root.querySelectorAll('img').forEach((img) => {
            const src = img.getAttribute('src') || '';
            const alt = img.getAttribute('alt') || '';
            let caption = '';

            const figure = img.closest('figure');
            if (figure) {
                const fc = figure.querySelector('figcaption');
                caption = fc?.textContent?.trim() || '';
            } else {
                let nextEl: Element | null = img.nextElementSibling;
                const imgParent = img.parentElement;
                if (!nextEl && imgParent && imgParent !== root) {
                    nextEl = imgParent.nextElementSibling;
                }
                if (nextEl && nextEl.tagName === 'P') {
                    const capText = nextEl.textContent?.replace(/\u00a0/g, ' ').trim() || '';
                    if (capText) {
                        caption = capText;
                        captionTexts.add(capText);
                    }
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
            const nextSib = (parent && parent !== clone && parent.children.length <= 2)
                ? parent.nextElementSibling
                : img.nextElementSibling;

            if (parent && parent !== clone && parent.children.length <= 2) {
                parent.remove();
            } else {
                img.remove();
            }

            if (nextSib && nextSib.tagName === 'P') {
                const t = nextSib.textContent?.replace(/\u00a0/g, ' ').trim() || '';
                if (!t || captionTexts.has(t)) nextSib.remove();
            }
        });
        clone.querySelectorAll('p, div').forEach((el) => {
            const t = el.textContent?.replace(/\u00a0/g, ' ').trim() || '';
            if (!t && !el.querySelector('img, iframe')) el.remove();
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
                    if (el.nodeType === 1 && (el.textContent?.trim() || el.querySelector?.('iframe, video'))) {
                        return <div key={i} className={styles.enhancedParagraph} style={style} dangerouslySetInnerHTML={{ __html: el.outerHTML }} />;
                    }
                    return null;
                })}
            </>
        );
    };

    const isBlankHtml = (html: string): boolean => {
        const text = html.replace(/&nbsp;/gi, ' ').replace(/<[^>]*>/g, '').trim();
        return text.length === 0;
    };

    type ResourceTableItem = { title: string; description: string; type: string; links: { text: string; url: string }[] };

    const parseResourceItems = (html: string): ResourceTableItem[] | null => {
        if (!html?.trim()) return null;
        try {
            const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
            const root = doc.body.firstChild as HTMLElement;
            if (!root) return null;

            const items: ResourceTableItem[] = [];

            // Format A: div.resource-item with h4, p, em, a
            const resourceItemDivs = root.querySelectorAll('.resource-item, div.resource-item');
            if (resourceItemDivs.length > 0) {
                resourceItemDivs.forEach((div) => {
                    const h4 = div.querySelector('h4');
                    const title = h4?.textContent?.trim() || '';
                    const paragraphs = div.querySelectorAll('p');
                    let description = '';
                    let type = '';
                    const links: { text: string; url: string }[] = [];
                    paragraphs.forEach((p) => {
                        const hasEm = p.querySelector('em');
                        const anchors = p.querySelectorAll('a');
                        if (anchors.length > 0) {
                            anchors.forEach((a) => {
                                links.push({
                                    text: a.textContent?.trim() || '',
                                    url: a.getAttribute('href') || '#'
                                });
                            });
                        } else if (hasEm) {
                            type = hasEm.textContent?.trim() || '';
                        } else if (!description && p.textContent?.trim()) {
                            description = p.textContent?.trim() || '';
                        }
                    });
                    if (title || description || links.length > 0) {
                        items.push({ title, description, type, links });
                    }
                });
                return items.length > 0 ? items : null;
            }

            // Format B: h4 + ul > li with strong, – description, a
            const h4s = root.querySelectorAll('h4');
            if (h4s.length > 0) {
                h4s.forEach((h4) => {
                    const sectionType = h4.textContent?.trim() || '';
                    let next: Element | null = h4.nextElementSibling;
                    while (next && next.tagName !== 'UL') next = next.nextElementSibling;
                    const ul = next;
                    if (!ul) return;
                    ul.querySelectorAll('li').forEach((li) => {
                        const strong = li.querySelector('strong');
                        const title = strong?.textContent?.trim() || '';
                        let description = '';
                        const text = li.innerHTML || '';
                        const dashMatch = text.match(/[–\-]\s*([^<]*?)(?:<br\s*\/?>|<a)/i);
                        if (dashMatch) description = dashMatch[1].replace(/<[^>]*>/g, '').trim();
                        const links: { text: string; url: string }[] = [];
                        li.querySelectorAll('a').forEach((a) => {
                            links.push({
                                text: a.textContent?.trim() || '',
                                url: a.getAttribute('href') || '#'
                            });
                        });
                        if (title || description || links.length > 0) {
                            items.push({ title, description, type: sectionType, links });
                        }
                    });
                });
                return items.length > 0 ? items : null;
            }

            return null;
        } catch {
            return null;
        }
    };

    const renderResourceTable = (items: ResourceTableItem[]) => {
        const headerRessurs = language === 'en' ? 'RESOURCE' : 'RESSURS';
        const headerLenke = language === 'en' ? 'LINK' : 'LENKE';
        return (
            <div className={styles.resourceTable}>
                <div className={styles.resourceHeader}>
                    <div className={styles.resourceColumn}>{headerRessurs}</div>
                    <div className={styles.resourceColumn}>{headerLenke}</div>
                </div>
                {items.map((item, i) => (
                    <div key={i} className={styles.resourceRow}>
                        <div className={styles.resourceDescription}>
                            <h4 className={styles.resourceName}>{item.title}</h4>
                            {item.description ? <p className={styles.resourceDesc}>{item.description}</p> : null}
                            {item.type ? <span className={styles.resourceType}>{item.type}</span> : null}
                        </div>
                        <div className={styles.resourceLinks}>
                            {item.links.map((link, j) => (
                                <a
                                    key={j}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.resourceLink}
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderPatientStoryCards = (html: string) => {
        if (!html) return null;
        try {
            const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
            const root = doc.body.firstChild as HTMLElement;
            if (!root) return null;

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

            const walk = (el: Element): void => {
                const tag = el.tagName;
                if (tag === 'H4' || tag === 'H3') {
                    if (current) stories.push(current);
                    current = { name: el.textContent?.trim() || '', imageSrc: '', imageAlt: '', description: '', linkUrl: '', linkText: '' };
                    return;
                }
                if (!current) { Array.from(el.children).forEach(walk); return; }
                if (tag === 'IMG') {
                    if (!current.imageSrc) {
                        current.imageSrc = (el as HTMLImageElement).getAttribute('src') || '';
                        current.imageAlt = (el as HTMLImageElement).getAttribute('alt') || current.name;
                    }
                    return;
                }
                if (tag === 'FIGURE') {
                    const img = el.querySelector('img');
                    if (img && !current.imageSrc) {
                        current.imageSrc = img.getAttribute('src') || '';
                        current.imageAlt = img.getAttribute('alt') || current.name;
                    }
                    return;
                }
                if (tag === 'A') {
                    if (!current.linkUrl) {
                        current.linkUrl = (el as HTMLAnchorElement).getAttribute('href') || '#';
                        current.linkText = el.textContent?.trim() || (language === 'en' ? 'Read the story' : 'Les historien');
                    }
                    return;
                }
                if (tag === 'P') {
                    const img = el.querySelector('img');
                    const anchor = el.querySelector('a');
                    if (img && !current.imageSrc) {
                        current.imageSrc = img.getAttribute('src') || '';
                        current.imageAlt = img.getAttribute('alt') || current.name;
                        const textWithoutImg = el.textContent?.replace(img.alt || '', '').trim() || '';
                        if (textWithoutImg && !current.description) current.description = textWithoutImg;
                    } else if (anchor && !current.linkUrl) {
                        current.linkUrl = anchor.getAttribute('href') || '#';
                        current.linkText = anchor.textContent?.trim() || (language === 'en' ? 'Read the story' : 'Les historien');
                    } else {
                        const text = el.textContent?.trim();
                        if (text && !current.description) current.description = text;
                    }
                    return;
                }
                if (tag === 'DIV') { Array.from(el.children).forEach(walk); }
            };

            Array.from(root.children).forEach(walk);
            if (current) stories.push(current);
            if (stories.length === 0) return null;

            return (
                <div className={styles.patientStoryGrid}>
                    {stories.map((story, i) => (
                        <div key={i} className={styles.patientStoryCard}>
                            <h4 className={styles.patientStoryName}>{story.name}</h4>
                            {story.imageSrc && (
                                <div className={styles.patientStoryImageWrapper}>
                                    <img src={story.imageSrc} alt={story.imageAlt} className={styles.patientStoryImage} />
                                </div>
                            )}
                            {story.description && (
                                <p className={styles.patientStoryDescription}>{story.description}</p>
                            )}
                            {(story.linkUrl && story.linkUrl !== '#') && (
                                <a href={story.linkUrl} target="_blank" rel="noopener noreferrer" className={styles.patientStoryLink}>
                                    {story.linkText || (language === 'en' ? 'Read the story' : 'Les historien')}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            );
        } catch {
            return null;
        }
    };

    const renderContentWithImageCards = (html: string, options?: {
        isIntro?: boolean;
        /** Inject this node after the block whose heading matches (e.g. "Bekkenbunnstrening"), so it appears above the next block (e.g. Biofeedback). */
        injectExerciseAfterHeading?: RegExp | string;
        exerciseSectionNode?: React.ReactNode;
    }) => {
        if (!html) return null;
        const isIntro = options?.isIntro === true;
        const injectExerciseAfterHeading = options?.injectExerciseAfterHeading;
        const exerciseSectionNode = options?.exerciseSectionNode;
        const matchBekkenbunnstrening = (heading: string) => {
            if (!injectExerciseAfterHeading || !exerciseSectionNode) return false;
            const text = (heading || '').trim();
            if (!text) return false;
            if (typeof injectExerciseAfterHeading === 'string') return text.toLowerCase() === injectExerciseAfterHeading.toLowerCase();
            return injectExerciseAfterHeading.test(text);
        };
        try {
            const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
            const root = doc.body.firstChild as HTMLElement;
            if (!root) return null;

            type ContentItem =
                | { type: 'paragraph'; html: string }
                | { type: 'image'; src: string; alt: string; caption: string };
            type ContentBlock = {
                headingTag?: 'h3' | 'h4' | 'h5' | 'h6';
                headingText?: string;
                items: ContentItem[];
                links: { text: string; url: string }[];
            };
            type Section = {
                mainHeadingTag: 'h1' | 'h2';
                mainHeadingText: string;
                blocks: ContentBlock[];
            };

            const introElements: string[] = [];
            const sections: Section[] = [];
            let currentSection: Section | null = null;
            let currentBlock: ContentBlock | null = null;

            const isHeadingTag = (tag: string) => /^H[1-6]$/.test(tag);
            const isSectionStarter = (tag: string) => tag === 'H1' || tag === 'H2';

            const pushContentToBlock = (block: ContentBlock, el: HTMLElement) => {
                const isPureImg = el.nodeType === 1 && (
                    el.tagName === 'IMG' ||
                    (el.tagName === 'FIGURE' && !el.querySelector('p'))
                );
                const isMixedContainer = el.nodeType === 1 && !isPureImg && el.querySelector?.('img');

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
                        block.items.push({ type: 'image', src, alt: alt || caption, caption: caption || alt });
                    }
                } else if (isMixedContainer) {
                    const clone = el.cloneNode(true) as HTMLElement;
                    Array.from(clone.querySelectorAll('figure, img')).forEach(imgEl => {
                        const parent = imgEl.parentElement;
                        imgEl.remove();
                        if (parent && parent !== clone && !parent.textContent?.trim()) parent.remove();
                    });
                    const remainingText = clone.textContent?.trim();
                    if (remainingText) {
                        clone.querySelectorAll('a').forEach((a) => {
                            block.links.push({
                                text: a.textContent?.trim() || '',
                                url: a.getAttribute('href') || '#'
                            });
                        });
                        block.items.push({ type: 'paragraph', html: clone.innerHTML.trim() });
                    }
                    el.querySelectorAll('img').forEach((img: HTMLImageElement) => {
                        const src = img.getAttribute('src') || '';
                        const alt = img.getAttribute('alt') || '';
                        let caption = '';
                        const figure = img.closest('figure');
                        if (figure) {
                            const fc = figure.querySelector('figcaption');
                            caption = fc?.textContent?.trim() || '';
                        }
                        block.items.push({ type: 'image', src, alt, caption: caption || alt });
                    });
                } else if (el.nodeType === 1 && el.tagName === 'BLOCKQUOTE') {
                    block.items.push({ type: 'paragraph', html: el.outerHTML });
                } else if (el.nodeType === 1 && (el.tagName === 'IFRAME' || el.tagName === 'VIDEO' || el.querySelector?.('iframe, video'))) {
                    block.items.push({ type: 'paragraph', html: el.outerHTML });
                } else if (el.nodeType === 1) {
                    const preserveWrapper = el.tagName !== 'P' || el.hasAttribute('style');
                    const anchors = el.querySelectorAll('a');
                    if (anchors.length > 0) {
                        const textWithoutLinks = el.textContent?.trim() || '';
                        anchors.forEach((a) => {
                            block.links.push({
                                text: a.textContent?.trim() || '',
                                url: a.getAttribute('href') || '#'
                            });
                        });
                        if (textWithoutLinks !== anchors[0].textContent?.trim()) {
                            block.items.push({ type: 'paragraph', html: preserveWrapper ? el.outerHTML : el.innerHTML });
                        }
                    } else {
                        const text = el.textContent?.trim();
                        if (text) block.items.push({ type: 'paragraph', html: preserveWrapper ? el.outerHTML : (el.innerHTML || text) });
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

            const flatNodes: HTMLElement[] = [];
            const collectRelevant = (node: ChildNode) => {
                if (node.nodeType === 3) {
                    const text = node.textContent?.trim();
                    if (text) {
                        const docForNode = node.ownerDocument || doc;
                        const p = docForNode.createElement('p');
                        p.textContent = text;
                        flatNodes.push(p);
                    }
                    return;
                }
                if (node.nodeType !== 1) return;
                const el = node as HTMLElement;
                const tag = el.tagName.toUpperCase();
                if (isHeadingTag(tag) || tag === 'UL' || tag === 'OL' || tag === 'BLOCKQUOTE') {
                    flatNodes.push(el);
                    return;
                }
                if (tag === 'IMG') {
                    flatNodes.push(el);
                    return;
                }
                if (tag === 'P') {
                    const imgs = el.querySelectorAll('img');
                    const textOnly = el.textContent?.replace(/\s+/g, '').replace(/\u00a0/g, '').trim() || '';
                    if (imgs.length > 0 && textOnly === '') {
                        imgs.forEach(img => flatNodes.push(img as HTMLElement));
                        return;
                    }
                    if (isBlankHtml(el.innerHTML)) return;
                    flatNodes.push(el);
                    return;
                }
                if (tag === 'FIGURE') {
                    if (!el.querySelector('img')) return;
                    flatNodes.push(el);
                    return;
                }
                if (tag === 'IFRAME' || tag === 'VIDEO') {
                    flatNodes.push(el);
                    return;
                }
                if (el.querySelector?.('iframe, video') && !el.querySelector?.('p, h1, h2, h3, h4, h5, h6')) {
                    flatNodes.push(el);
                    return;
                }
                if (el.hasAttribute('style')) {
                    flatNodes.push(el);
                    return;
                }
                Array.from(el.childNodes).forEach(collectRelevant);
            };
            collectRelevant(root);

            flatNodes.forEach((el) => {
                const isHeading = isHeadingTag(el.tagName);

                if (isHeading) {
                    const tag = el.tagName.toUpperCase();
                    const text = el.textContent?.trim() || '';

                    if (isSectionStarter(tag)) {
                        if (currentBlock) currentBlock = null;
                        if (currentSection) sections.push(currentSection);
                        currentSection = { mainHeadingTag: tag === 'H1' ? 'h1' : 'h2', mainHeadingText: text, blocks: [] };
                    } else {
                        // h3–h6: new block under current section, or use as section title if no h1/h2 yet (don't duplicate)
                        if (!currentSection) {
                            currentSection = { mainHeadingTag: 'h2', mainHeadingText: text, blocks: [] };
                            currentBlock = null;
                        } else {
                            currentBlock = {
                                headingTag: tag.toLowerCase() as ContentBlock['headingTag'],
                                headingText: text,
                                items: [],
                                links: []
                            };
                            currentSection.blocks.push(currentBlock);
                        }
                    }
                } else if (currentSection) {
                    pushContentToBlock(ensureBlock(), el);
                } else {
                    // Before first h1/h2 — intro
                    introElements.push(el.outerHTML);
                }
            });

            if (currentSection) sections.push(currentSection);

            // No headings at all — render as simple block; 1 paragraph + 1 image = side-by-side on larger screens
            if (sections.length === 0) {
                const { textHtml, images } = parseContentAndImages(html);
                const hasText = !!textHtml?.trim();
                const singleImage = images && images.length === 1 ? images[0] : null;

                if (hasText && singleImage) {
                    return (
                        <ParagraphWithImageContainer
                            content={renderRichText(textHtml, { width: '100%' })}
                            image={singleImage}
                            isIntro={isIntro}
                            setSelectedImage={setSelectedImage}
                        />
                    );
                }

                return (
                    <div className={styles.introContentBlock}>
                        {textHtml && renderRichText(textHtml, { width: '100%' })}
                        {images && images.length > 0 && (
                            <div
                                className={images.length > 1 ? `${styles.anatomyGrid} ${styles.anatomyGridTwoCol}` : styles.anatomyGrid}
                                style={{ width: '100%' }}
                            >
                                {images.map((img, i) => (
                                    <div key={i} className={styles.anatomyItem}>
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className={styles.anatomyImage}
                                            onClick={() => setSelectedImage({ src: img.src, alt: img.alt })}
                                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage({ src: img.src, alt: img.alt }); } }}
                                            role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                                            tabIndex={0}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        {img.caption && (
                                            <p className={styles.anatomyCaption}>{img.caption}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }

            const renderBlock = (block: ContentBlock, blockIdx: number) => {
                type Segment = {
                    paragraphs: string[];
                    images: { src: string; alt: string; caption: string }[];
                };
                const segments: Segment[] = [];
                let segParas: string[] = [];
                let segImgs: { src: string; alt: string; caption: string }[] = [];

                for (const item of block.items) {
                    if (item.type === 'paragraph') {
                        if (segImgs.length > 0) {
                            segments.push({ paragraphs: segParas, images: segImgs });
                            segParas = [];
                            segImgs = [];
                        }
                        segParas.push(item.html);
                    } else {
                        segImgs.push({ src: item.src, alt: item.alt, caption: item.caption });
                    }
                }
                if (segParas.length > 0 || segImgs.length > 0) {
                    segments.push({ paragraphs: segParas, images: segImgs });
                }

                const hasContent = block.items.length > 0 || block.links.length > 0;
                const headingOnly = !hasContent && block.headingTag != null && !!block.headingText;

                const headingEl = block.headingTag && block.headingText
                    ? React.createElement(block.headingTag, {
                        className: headingOnly
                            ? `${styles.enhancedSubheading} ${styles.enhancedSubheadingStandalone}`
                            : styles.enhancedSubheading,
                        style: {
                            ...(blockIdx > 0 ? { marginTop: '1.5rem' } : {}),
                            ...(headingOnly ? { textAlign: 'center' as const } : {})
                        }
                    }, block.headingText)
                    : null;

                const wrapStandaloneHeading = headingOnly && headingEl ? (
                    <div style={{ textAlign: 'center' }}>{headingEl}</div>
                ) : headingEl;

                const renderParas = (paras: string[]) =>
                    paras.map((p, j) => <React.Fragment key={j}>{renderRichText(p)}</React.Fragment>);

                const renderImgEl = (img: { src: string; alt: string; caption: string }, j: number, captionClass: string) => (
                    <div key={j}>
                        <img
                            src={img.src}
                            alt={img.alt}
                            className={styles.anatomyImage}
                            onClick={() => setSelectedImage({ src: img.src, alt: img.alt })}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage({ src: img.src, alt: img.alt }); } }}
                            role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
                            tabIndex={0}
                            style={{ cursor: 'pointer' }}
                        />
                        {img.caption && <p className={captionClass}>{img.caption}</p>}
                    </div>
                );

                const hasLinksInParagraphs = block.items.some(
                    (it) => it.type === 'paragraph' && it.html.includes('<a ')
                );
                const renderBlockLinks = () => {
                    if (block.links.length === 0 || hasLinksInParagraphs) return null;
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
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                                        {link.text}
                                    </a>
                                    {j < block.links.length - 1 && ' og '}
                                </span>
                            ))}
                        </p>
                    );
                };

                return (
                    <React.Fragment key={blockIdx}>
                        {wrapStandaloneHeading}
                        {segments.map((seg, si) => {
                            if (seg.images.length === 0) {
                                return <React.Fragment key={si}>{renderParas(seg.paragraphs)}</React.Fragment>;
                            }
                            if (seg.images.length === 1) {
                                return (
                                    <div key={si} className={styles.sideBySideContainer}>
                                        <div className={styles.sideBySideText}>
                                            {renderParas(seg.paragraphs)}
                                        </div>
                                        <div className={styles.sideBySideImage}>
                                            {renderImgEl(seg.images[0], 0, styles.sideBySideImageCaption)}
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <React.Fragment key={si}>
                                    {renderParas(seg.paragraphs)}
                                    <div className={`${styles.anatomyGrid} ${styles.anatomyGridTwoCol}`}>
                                        {seg.images.map((img, j) => (
                                            <div key={j} className={styles.anatomyItem}>
                                                {renderImgEl(img, j, styles.anatomyCaption)}
                                            </div>
                                        ))}
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
                        <div key={i} className={section.blocks.length === 0 ? `${styles.normalFunctionSection} ${styles.sectionTitleOnly}` : styles.normalFunctionSection}>
                            {section.mainHeadingText ? React.createElement(section.mainHeadingTag, { className: styles.normalFunctionTitle }, section.mainHeadingText) : null}
                            {section.blocks.map((block, j) => (
                                <React.Fragment key={j}>
                                    {renderBlock(block, j)}
                                    {/* Inject after block whose heading is Bekkenbunnstrening, or after first block when section title is Bekkenbunnstrening (CMS uses H3 as section title, so paragraph is in a block with no headingText) */}
                                    {(matchBekkenbunnstrening(block.headingText || '') || (j === 0 && matchBekkenbunnstrening(section.mainHeadingText || ''))) ? exerciseSectionNode : null}
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
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

            <div className={styles.sectionContent}>
                {(intro || sitat) && (
                    <div className={styles.introAndQuoteCard}>
                        {sitat && (
                            <div className={styles.quoteContainer}>
                                <blockquote className={styles.patientQuote}>
                                    <p className={styles.quoteText}>"{sitat}"</p>
                                    {sitatKilde && (
                                        <cite className={styles.quoteAuthor}>— {sitatKilde}</cite>
                                    )}
                                </blockquote>
                            </div>
                        )}
                        {intro && renderContentWithImageCards(intro, { isIntro: true })}
                    </div>
                )}

                {Array.isArray(trekkspill) && trekkspill.map((item: TilstandAccordionItem, index: number) => {
                    const itemTitle = getField(item, 'tittel');
                    const itemTitleNo = item.tittel;
                    const itemContent = getField(item, 'innhold');
                    const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url;
                    const bildePosisjon = item.bilde_posisjon ?? (imgSrc ? 'side' : 'none');
                    const isSideBySide = bildePosisjon === 'side' && imgSrc;
                    const itemId = slugify(itemTitleNo);
                    const hasUnderseksjoner = item.underseksjoner && item.underseksjoner.length > 0;

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
                        itemId === 'konservativ-behandling' || itemId === 'conservative-treatment' ||
                        /konservativ|conservative/i.test(String(itemTitleNo ?? itemTitle));
                    const showExerciseSectionHere = isKonservativBehandling && exerciseSectionItems && exerciseSectionItems.length > 0;
                    const exerciseSectionNodeForInject = showExerciseSectionHere ? (
                        <>
                            <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
                                <div className={styles.sectionIcon}>
                                    <img src="/exercises.png" alt={language === 'no' ? 'Øvelser' : 'Exercises'} width="24" height="24" />
                                </div>
                                <h2 className={styles.sectionTitle}>{language === 'no' ? 'Øvelser' : 'Exercises'}</h2>
                            </div>
                            <div className={styles.sectionContent}>
                                {exerciseSectionItems!.map((exItem: TilstandAccordionItem, exIndex: number) => {
                                    const exTitle = getField(exItem, 'tittel');
                                    const exTitleNo = exItem.tittel;
                                    const exContent = getField(exItem, 'innhold');
                                    const exId = slugify(exTitleNo);
                                    return (
                                        <SectionAccordion
                                            key={exIndex}
                                            title={exTitle}
                                            id={exId}
                                            isDarkMode={resolvedTheme === 'dark'}
                                            defaultOpen={false}
                                        >
                                            {renderContentWithImageCards(exContent)}
                                        </SectionAccordion>
                                    );
                                })}
                            </div>
                        </>
                    ) : null;
                    const injectOptions = showExerciseSectionHere ? {
                        injectExerciseAfterHeading: /bekkenbunnstrening|pelvic floor training/i,
                        exerciseSectionNode: exerciseSectionNodeForInject
                    } : undefined;

                    // Support for centered group headers in accordions
                    if (itemTitleNo.startsWith("GROUP_HEADER:")) {
                        const headerText = language === 'en' ? (item.tittel_en || itemTitleNo).replace("GROUP_HEADER:", "") : itemTitleNo.replace("GROUP_HEADER:", "");
                        return (
                            <div key={index} className={styles.groupHeader}>
                                {headerText}
                            </div>
                        );
                    }

                    return (
                        <SectionAccordion
                            key={index}
                            title={itemTitle}
                            id={itemId}
                            isDarkMode={resolvedTheme === 'dark'}
                            defaultOpen={false}
                        >
                            <>
                                {isPatientStoryAccordion && typeof itemContent === 'string' ? renderPatientStoryCards(itemContent) : isResourceAccordion ? renderResourceTable(resourceItems!) : hasUnderseksjoner ? (
                                    <>
                                        {itemContent && (
                                            <>
                                                {isSideBySide ? (
                                                    <div className={styles.sideBySideContainer}>
                                                        <div className={styles.sideBySideText}>
                                                            {renderContentWithImageCards(itemContent, injectOptions)}
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
                                                ) : (
                                                    <>
                                                        {renderContentWithImageCards(itemContent, injectOptions)}
                                                        {renderImage(item)}
                                                        {renderLinks(item)}
                                                    </>
                                                )}
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
                                            {renderContentWithImageCards(itemContent, injectOptions)}
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
                                    const isFirstTreatmentAccordion = activeSection === "treatment" && index === 0 && conditionSlug === "urinary-incontinence";
                                    const tryTitle = ((language === "en" && t.ovelse_try_yourself_title_en) || t.ovelse_try_yourself_title || "") as string;
                                    const hasExerciseData = !!(tryTitle || (t.ovelse_steps as unknown[] | null)?.length || (t.ovelse_videos as unknown[] | null)?.length);
                                    // Don't inject inside accordion when we show the full exercise section after treatment accordions
                                    const injectExerciseSection = isFirstTreatmentAccordion && hasExerciseData && !(exerciseSectionItems && exerciseSectionItems.length > 0);
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
                                    return (
                                        <>
                                            {renderContentWithImageCards(itemContent, injectOptions)}
                                            {renderImage(item)}
                                            {renderLinks(item)}
                                        </>
                                    );
                                })()}
                            </>
                        </SectionAccordion>
                    );
                })}
            </div>

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
