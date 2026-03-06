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
            const videos: Video[] = videosRaw.map((v) => ({
                src: v.src,
                title: (language === "en" && v.title_en) ? v.title_en : (v.title || "")
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
                    videoSectionDescription={videoSectionDesc || undefined}
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
                        const hasHeadingInside = !!el.querySelector?.('h1,h2,h3,h4,h5,h6');
                        // In Directus content, blockquote is sometimes used for indentation/layout (not quotes).
                        // If it contains headings, unwrap it to avoid nested "highlight boxes".
                        if (hasHeadingInside) {
                            return (
                                <div
                                    key={i}
                                    className={styles.enhancedParagraph}
                                    style={style}
                                    dangerouslySetInnerHTML={{ __html: el.innerHTML }}
                                />
                            );
                        }
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

    const renderContentWithImageCards = (html: string) => {
        if (!html) return null;
        try {
            const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
            const root = doc.body.firstChild as HTMLElement;
            if (!root) return null;

        // Top-level headings (h1, h2) start a new container; h3–h6 and their content stay inside it
        type ContentBlock = {
            headingTag?: 'h3' | 'h4' | 'h5' | 'h6';
            headingText?: string;
            paragraphs: string[];
            links: { text: string; url: string }[];
            images: { src: string; alt: string; caption: string }[];
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
                    block.images.push({ src, alt: alt || caption, caption: caption || alt });
                }
            } else if (isMixedContainer) {
                el.querySelectorAll('img').forEach((img: HTMLImageElement) => {
                    const src = img.getAttribute('src') || '';
                    const alt = img.getAttribute('alt') || '';
                    let caption = '';
                    const figure = img.closest('figure');
                    if (figure) {
                        const fc = figure.querySelector('figcaption');
                        caption = fc?.textContent?.trim() || '';
                    }
                    block.images.push({ src, alt, caption: caption || alt });
                });
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
                    block.paragraphs.push(clone.innerHTML.trim());
                }
            } else if (el.nodeType === 1 && el.tagName === 'BLOCKQUOTE') {
                block.paragraphs.push(el.outerHTML);
            } else if (el.nodeType === 1) {
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
                        block.paragraphs.push(el.innerHTML);
                    }
                } else {
                    const text = el.textContent?.trim();
                    if (text) block.paragraphs.push(el.innerHTML || text);
                }
            }
        };

        const ensureBlock = () => {
            if (!currentBlock) {
                currentBlock = { paragraphs: [], links: [], images: [] };
                if (currentSection) currentSection.blocks.push(currentBlock);
            }
            return currentBlock;
        };

        // Flatten relevant elements (headings, paragraphs/text, lists, figures, blockquotes) in document order,
        // regardless of how deeply they are nested, while skipping purely structural wrappers.
        const flatNodes: HTMLElement[] = [];
        const collectRelevant = (node: ChildNode) => {
            if (node.nodeType === 3) {
                // Text node — wrap into a synthetic paragraph so we don't lose standalone text like
                // "I noen tilfeller er det nødvendig ..." that isn't inside <p>.
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
            if (isHeadingTag(tag) || tag === 'P' || tag === 'UL' || tag === 'OL' || tag === 'FIGURE' || tag === 'BLOCKQUOTE') {
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
                            paragraphs: [],
                            links: [],
                            images: []
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

        // No headings at all — render as simple block
        if (sections.length === 0) {
            const { textHtml, images } = parseContentAndImages(html);
            return (
                <>
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
                    </>
                );
            }

        // One container per section (h1/h2); all sub-headings (h3–h6) and content inside it
        const renderBlock = (block: ContentBlock, blockIdx: number) => {
            const imageCount = block.images.length;
            const hasImages = imageCount > 0;
            const hasContent = block.paragraphs.length > 0 || block.images.length > 0 || block.links.length > 0;
            const headingOnly = !hasContent && block.headingTag != null && !!block.headingText;
            const content = (
                <>
                    {block.paragraphs.map((p, j) => (
                        <React.Fragment key={j}>{renderRichText(p)}</React.Fragment>
                    ))}
                    {block.links.length === 1 && !block.paragraphs.some((p) => p.includes('<a ')) && (
                        <p className={styles.enhancedParagraph}>
                            <a href={block.links[0].url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                                {block.links[0].text}
                            </a>
                        </p>
                    )}
                    {block.links.length > 1 && !block.paragraphs.some((p) => p.includes('<a ')) && (
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
                    )}
                </>
            );
            // Same-level headings as direct siblings of the section (no wrapper div per block)
            const headingEl = block.headingTag && block.headingText
                ? React.createElement(block.headingTag, {
                    className: styles.enhancedSubheading,
                    style: {
                        ...(blockIdx > 0 ? { marginTop: '1.5rem' } : {}),
                        ...(headingOnly ? { textAlign: 'center' as const } : {})
                    }
                  }, block.headingText)
                : null;
            return (
                <React.Fragment key={blockIdx}>
                    {headingEl}
                    {imageCount === 1 ? (
                        <div className={styles.sideBySideContainer}>
                            <div className={styles.sideBySideText}>{content}</div>
                            <div className={styles.sideBySideImage}>
                                {block.images.map((img, j) => (
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
                                        {img.caption && <p className={styles.sideBySideImageCaption}>{img.caption}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : imageCount > 1 ? (
                        <>
                            {content}
                            <div className={`${styles.anatomyGrid} ${styles.anatomyGridTwoCol}`}>
                                {block.images.map((img, j) => (
                                    <div key={j} className={styles.anatomyItem}>
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
                                        {img.caption && <p className={styles.anatomyCaption}>{img.caption}</p>}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        content
                    )}
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
                        {section.mainHeadingText ? <h1 className={styles.normalFunctionTitle}>{section.mainHeadingText}</h1> : null}
                        {section.blocks.map((block, j) => renderBlock(block, j))}
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

            <div className={styles.sectionContent}>
                {intro && renderContentWithImageCards(intro)}

                {Array.isArray(trekkspill) && trekkspill.map((item: TilstandAccordionItem, index: number) => {
                    const itemTitle = getField(item, 'tittel');
                    const itemTitleNo = item.tittel;
                    const itemContent = getField(item, 'innhold');
                    const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url;
                    const bildePosisjon = item.bilde_posisjon ?? (imgSrc ? 'side' : 'none');
                    const isSideBySide = bildePosisjon === 'side' && imgSrc;
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
                                            {isSideBySide ? (
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
                                            ) : (
                                                <>
                                                    {renderContentWithImageCards(itemContent)}
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
                                return (
                                    <>
                                        {renderContentWithImageCards(itemContent)}
                                        {renderImage(item)}
                                        {renderLinks(item)}
                                    </>
                                );
                            })()}
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
