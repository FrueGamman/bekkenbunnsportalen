import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { SectionAccordion } from "./SectionAccordion";
import { CommonExerciseSection } from "./CommonExerciseSection";
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

    // Extract images+captions from Directus HTML; handles grid containers, <figure>, and standalone <img>
    const parseContentAndImages = (html: string): { textHtml: string; images: { src: string; alt: string; caption: string }[] } => {
        const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
        const root = doc.body.firstChild as HTMLElement;
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

    // Render content using the original CSS module classes
    // Splits HTML at h4 boundaries and renders each sub-cause using the
    // same component structure as the original causes.tsx:
    //   normalFunctionSection → card wrapper
    //   normalFunctionTitle  → h4 heading with blue left bar
    //   sideBySideContainer  → image+text side-by-side for certain causes
    //   resourceLink         → pill-style link buttons
    //   enhancedParagraph    → text paragraphs
    const renderContentWithImageCards = (html: string) => {
        const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
        const root = doc.body.firstChild as HTMLElement;

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
                    clone.querySelectorAll('figure, img').forEach(el => {
                        const parent = el.parentElement;
                        el.remove();
                        // Clean up empty parent divs
                        if (parent && !parent.textContent?.trim() && parent !== clone) {
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
                } else if (el.nodeType === 1) {
                    // Extract links from paragraphs
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
                    {textHtml && (
                        <p
                            className={styles.enhancedParagraph}
                            dangerouslySetInnerHTML={{ __html: textHtml }}
                        />
                    )}
                    {images.length > 0 && (
                        <div className={styles.anatomySection}>
                            <div className={styles.anatomyGrid}>
                                {images.map((img, i) => (
                                    <div key={i} className={styles.anatomyItem2}>
                                        <img src={img.src} alt={img.alt} className={styles.anatomyImage} />
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
                {/* Intro text before first h4 */}
                {introElements.map((html, i) => (
                    <p key={`intro-${i}`} className={styles.enhancedParagraph}
                        dangerouslySetInnerHTML={{ __html: html }} />
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
                                        <p key={j} className={styles.enhancedParagraph}
                                            dangerouslySetInnerHTML={{ __html: p }} />
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
                            /* Default layout (no images) */
                            <>
                                {card.paragraphs.map((p, j) => (
                                    <p key={j} className={styles.enhancedParagraph}
                                        dangerouslySetInnerHTML={{ __html: p }} />
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
    };

    // Render image based on positioning
    const renderImage = (item: TilstandAccordionItem) => {
        const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url;
        if (!imgSrc || item.bilde_posisjon === 'none') return null;

        return (
            <div className={styles.anatomySection}>
                <div className={styles.anatomyGrid}>
                    <div className={styles.anatomyItem2}>
                        <img
                            src={imgSrc}
                            alt={(language === 'en' && item.bilde_alt_en) ? item.bilde_alt_en : (item.bilde_alt || item.tittel)}
                            className={styles.anatomyImage}
                        />
                        {((language === 'en' && item.bilde_caption_en) || item.bilde_caption) && (
                            <p className={styles.anatomyCaption}>{(language === 'en' && item.bilde_caption_en) ? item.bilde_caption_en : item.bilde_caption}</p>
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

    return (
        <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                    <img
                        src={activeSection === "resources" || activeSection === "references" ? "/resource.png" : "/inNormal.svg"}
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

                {trekkspill?.map((item: TilstandAccordionItem, index: number) => {
                    const itemTitle = getField(item, 'tittel');
                    const itemTitleNo = item.tittel; // Use Norwegian title for persistent IDs
                    const itemContent = getField(item, 'innhold');
                    const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url;
                    const isSideBySide = item.bilde_posisjon === 'side' && imgSrc;
                    const itemId = slugify(itemTitleNo);

                    return (
                        <SectionAccordion
                            key={index}
                            title={itemTitle}
                            id={itemId}
                            isDarkMode={resolvedTheme === 'dark'}
                            defaultOpen={false}
                        >
                            {isSideBySide ? (
                                /* Side-by-side layout: text left, image right (with card design) */
                                <div className={styles.sideBySideContainer}>
                                    <div className={styles.sideBySideText}>
                                        {renderContentWithImageCards(itemContent)}
                                        {renderLinks(item)}
                                    </div>
                                    <div className={`${styles.sideBySideImage} ${styles.anatomyItem2}`}>
                                        <img
                                            src={imgSrc}
                                            alt={(language === 'en' && item.bilde_alt_en) ? item.bilde_alt_en : (item.bilde_alt || itemTitle)}
                                            className={styles.anatomyImage}
                                        />
                                        {((language === 'en' && item.bilde_caption_en) || item.bilde_caption) && (
                                            <p className={styles.anatomyCaption}>{(language === 'en' && item.bilde_caption_en) ? item.bilde_caption_en : item.bilde_caption}</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* Standard layout: content (with image cards), then bilde_id if present, then links */
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
        </div>
    );
};
