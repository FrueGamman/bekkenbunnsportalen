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

    // Render content (text + embedded images) with anatomy card design for images
    const renderContentWithImageCards = (html: string) => {
        const { textHtml, images } = parseContentAndImages(html);
        return (
            <>
                {textHtml && (
                    <div
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
