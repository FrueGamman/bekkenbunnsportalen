import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { SectionAccordion } from "./SectionAccordion";
import { CommonExerciseSection } from "./CommonExerciseSection";
import type { ExerciseStep, GenderInstruction, Video, SmartphoneApps } from "./CommonExerciseSection";
import { ImageModal } from "./ui/ImageModal";
import type { Tilstand, TilstandAccordionItem } from "../types/cms";
import { getImageUrl } from "../lib/directus";
import styles from "../conditions/urinary-incontinence/components/section-content.module.css";

interface TilstandDynamicSectionProps {
    tilstand: Tilstand;
    activeSection: string;
}

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

    // Use type assertion to access fields dynamically
    const t = tilstand as any;
    const title = (language === 'en' && t[`${prefix}_tittel_en`]) || t[`${prefix}_tittel`];
    const intro = (language === 'en' && t[`${prefix}_intro_en`]) || t[`${prefix}_intro`];
    const trekkspill = t[`${prefix}_trekkspill`];

    // Specific fields for symptoms/causes
    const sitat = (language === 'en' && t[`${prefix}_sitat_en`]) || t[`${prefix}_sitat`];
    const sitatKilde = (language === 'en' && t[`${prefix}_sitat_kilde_en`]) || t[`${prefix}_sitat_kilde`];

    // Exercises: render original design (CommonExerciseSection) when structured data from Directus exists
    if (activeSection === "exercises") {
        const tryTitle = (language === "en" && t.ovelse_try_yourself_title_en) || t.ovelse_try_yourself_title || "";
        const step1 = (language === "en" && t.ovelse_step1_text_en) || t.ovelse_step1_text || "";
        const tipsTitle = (language === "en" && t.ovelse_tips_title_en) || t.ovelse_tips_title || "";
        const tipsText = (language === "en" && t.ovelse_tips_text_en) || t.ovelse_tips_text || "";
        const videoSectionTitle = (language === "en" && t.ovelse_video_section_title_en) || t.ovelse_video_section_title || "";
        const videoSectionDesc = (language === "en" && t.ovelse_video_section_description_en) || t.ovelse_video_section_description || "";
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

    if (!title && !intro && !trekkspill) return null;

    // Helper: get language-aware field from accordion item
    const getField = (item: TilstandAccordionItem, field: 'tittel' | 'innhold') => {
        const enField = `${field}_en` as keyof TilstandAccordionItem;
        return (language === 'en' && item[enField]) ? String(item[enField]) : String(item[field]);
    };

    // Helper to slugify title for deep linking
    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[ææ]/g, 'ae')
            .replace(/[øø]/g, 'o')
            .replace(/[åå]/g, 'a')
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    // Extract iframes from HTML content, returning iframeHtml and cleaned textHtml
    const parseContentAndIframes = (html: string): { textHtml: string; iframeHtml: string } => {
        if (!html) return { textHtml: '', iframeHtml: '' };
        const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
        const root = doc.body.firstChild as HTMLElement;
        if (!root) return { textHtml: '', iframeHtml: '' };

        // Collect all iframes
        const iframes: string[] = [];
        root.querySelectorAll('iframe').forEach((iframe) => {
            // Ensure the iframe fills its container
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframes.push(iframe.outerHTML);
        });

        // Remove iframes and their wrapper containers from clone
        const clone = root.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('iframe').forEach((iframe) => {
            const parent = iframe.parentElement;
            if (parent && parent !== clone && !parent.textContent?.trim()) {
                parent.remove();
            } else {
                iframe.remove();
            }
        });
        // Remove empty divs/p
        clone.querySelectorAll('p, div').forEach((el) => {
            if (!el.textContent?.trim() && !el.querySelector('img, iframe')) el.remove();
        });

        return {
            textHtml: clone.innerHTML.trim(),
            iframeHtml: iframes.join('')
        };
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

    const renderContentWithImageCards = (html: string) => {
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

            // If there are no h4 cards, render as a simple block
            if (cards.length === 0) {
                const { textHtml, images } = parseContentAndImages(html);
                return (
                    <>
                        {textHtml && renderRichText(textHtml, { width: '100%' })}
                        {images && images.length > 0 && (
                            <div className={styles.anatomySection} style={{ width: '100%' }}>
                                <div className={styles.anatomyGrid}>
                                    {images.map((img, i) => (
                                        <div key={i} className={styles.anatomyItem}>
                                            <img
                                                src={img.src}
                                                alt={img.alt}
                                                className={styles.anatomyImage}
                                                onClick={() => setSelectedImage({ src: img.src, alt: img.alt })}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            {img.caption && (
                                                <p className={styles.anatomyCaption}>{img.caption}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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

                    {/* Each sub-cause in its own card */}
                    {cards.map((card, i) => (
                        <div key={i} className={styles.normalFunctionSection}>
                            <h4 className={styles.normalFunctionTitle}>{card.headingText}</h4>

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
                                            <div key={j}>
                                                <img src={img.src} alt={img.alt} />
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
            <div className={styles.anatomySection}>
                <div className={styles.anatomyGrid}>
                    <div className={styles.anatomyItem}>
                        <img
                            src={imgSrc}
                            alt={altText}
                            className={styles.anatomyImage}
                            onClick={() => setSelectedImage({ src: imgSrc, alt: altText })}
                            style={{ cursor: 'pointer' }}
                        />
                        {captionText && (
                            <p className={styles.anatomyCaption}>{captionText}</p>
                        )}
                    </div>
                </div>
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

    const sectionIcons: Record<string, string> = {
        "normal-functions": "/normal.png",
        "symptoms": "/symptoms.png",
        "causes": "/couse.png",
        "diagnosis": "/solae.png", // This is the "pregnancy detection" icon
        "treatment": "/treat.png",
        "exercises": "/exercises.png",
        "resources": "/resource.png",
        "references": "/resource.png",
        "textbook": "/normal.png"
    };

    const sectionIcon = sectionIcons[activeSection] || (activeSection === "resources" || activeSection === "references" ? "/resource.png" : "/inNormal.svg");

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
                {intro && (() => {
                    // Symptoms section gets the original layout:
                    // LEFT col: image on top + video below  |  RIGHT col: intro text
                    if (activeSection !== 'symptoms') return renderContentWithImageCards(intro);

                    // Dedicated Directus fields
                    const introBildeId: string | null = t.symptomer_bilde_id ?? null;
                    const introVideoUrlRaw: string | null = t.symptomer_video_url ?? null;
                    const heroImgSrc = introBildeId ? getImageUrl(introBildeId) : null;

                    // Fall back: extract image from HTML if no dedicated image field
                    const { textHtml: introTextClean, images: introImages } = heroImgSrc
                        ? { textHtml: intro, images: [] }
                        : parseContentAndImages(intro);
                    // Fall back: extract iframe from HTML if no dedicated video field
                    const { textHtml: introTextFinal, iframeHtml: iframeFromHtml } = introVideoUrlRaw
                        ? { textHtml: introTextClean || intro, iframeHtml: '' }
                        : parseContentAndIframes(introTextClean || intro);

                    const finalImgSrc = heroImgSrc || (introImages[0]?.src ?? null);

                    // Normalize any YouTube watch/short URL → embed URL
                    const toEmbedUrl = (url: string | null): string | null => {
                        if (!url) return null;
                        if (url.includes('/embed/') || url.includes('player.vimeo.com')) return url;
                        const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
                        if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
                        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
                        if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
                        return url;
                    };

                    const embedVideoUrl = toEmbedUrl(introVideoUrlRaw);
                    const hasMedia = finalImgSrc || embedVideoUrl || iframeFromHtml;
                    const videoTitle = language === 'no' ? 'Video om symptomer' : 'Symptoms video';

                    // If no media at all — just render text normally
                    if (!hasMedia) return renderContentWithImageCards(intro);

                    return (
                        // Two-column layout: LEFT = image + video stacked | RIGHT = text
                        <div className={styles.sideBySideContainer} style={{ alignItems: 'flex-start' }}>
                            {/* LEFT: image centered, video below */}
                            <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
                                {finalImgSrc && (
                                    <img
                                        src={finalImgSrc}
                                        alt={title || (language === 'no' ? 'Symptombilde' : 'Symptom image')}
                                        onClick={() => setSelectedImage({ src: finalImgSrc, alt: title || '' })}
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                                            cursor: 'pointer',
                                            display: 'block',
                                        }}
                                    />
                                )}
                                {(embedVideoUrl || iframeFromHtml) && (
                                    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '8px', overflow: 'hidden' }}>
                                        {embedVideoUrl ? (
                                            <iframe
                                                src={embedVideoUrl}
                                                title={videoTitle}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                            />
                                        ) : (
                                            <div
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                dangerouslySetInnerHTML={{ __html: iframeFromHtml }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* RIGHT: intro text */}
                            <div style={{ flex: 1 }}>
                                {renderContentWithImageCards(introTextFinal || intro)}
                            </div>
                        </div>
                    );
                })()}

                {trekkspill?.map((item: TilstandAccordionItem, index: number) => {
                    const itemTitle = getField(item, 'tittel');
                    const itemTitleNo = item.tittel;
                    const itemContent = getField(item, 'innhold');
                    const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url;
                    const isSideBySide = item.bilde_posisjon === 'side' && imgSrc;
                    const itemId = slugify(itemTitleNo);
                    const imgAlt = (language === 'en' && item.bilde_alt_en) ? item.bilde_alt_en : (item.bilde_alt || itemTitle);
                    const imgCaption = (language === 'en' && item.bilde_caption_en) ? item.bilde_caption_en : item.bilde_caption;

                    return (
                        <SectionAccordion
                            key={index}
                            title={itemTitle}
                            id={itemId}
                            isDarkMode={resolvedTheme === 'dark'}
                            defaultOpen={false}
                        >
                            {isSideBySide && activeSection === 'symptoms' ? (
                                // Symptoms layout: image on top, then video + text side-by-side below
                                (() => {
                                    const { textHtml, iframeHtml } = parseContentAndIframes(itemContent);
                                    return (
                                        <>
                                            {/* Image on top */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <img
                                                    src={imgSrc!}
                                                    alt={imgAlt}
                                                    className={styles.anatomyImage}
                                                    onClick={() => setSelectedImage({ src: imgSrc!, alt: imgAlt })}
                                                    style={{ cursor: 'pointer', width: '100%', height: 'auto', borderRadius: '8px' }}
                                                />
                                                {imgCaption && (
                                                    <p className={styles.sideBySideImageCaption}>{imgCaption}</p>
                                                )}
                                            </div>
                                            {/* Video + text side by side */}
                                            <div className={styles.sideBySideContainer}>
                                                {iframeHtml && (
                                                    <div className={styles.sideBySideImage} style={{ flex: '0 0 45%' }}>
                                                        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                                                            <div
                                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                                                dangerouslySetInnerHTML={{ __html: iframeHtml }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className={styles.sideBySideText}>
                                                    {textHtml && renderContentWithImageCards(textHtml)}
                                                    {renderLinks(item)}
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()
                            ) : isSideBySide ? (
                                <div className={styles.sideBySideContainer}>
                                    <div className={styles.sideBySideText}>
                                        {renderContentWithImageCards(itemContent)}
                                        {renderLinks(item)}
                                    </div>
                                    <div className={`${styles.sideBySideImage} ${styles.anatomyItem}`}>
                                        <img
                                            src={imgSrc!}
                                            alt={imgAlt}
                                            className={styles.anatomyImage}
                                            onClick={() => setSelectedImage({ src: imgSrc!, alt: imgAlt })}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        {imgCaption && (
                                            <p className={styles.anatomyCaption}>{imgCaption}</p>
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
