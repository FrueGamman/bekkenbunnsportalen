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
    const sitatKilde = t[`${prefix}_sitat_kilde`];

    if (!title && !intro && !trekkspill) return null;

    // Helper: get language-aware field from accordion item
    const getField = (item: TilstandAccordionItem, field: 'tittel' | 'innhold') => {
        const enField = `${field}_en` as keyof TilstandAccordionItem;
        return (language === 'en' && item[enField]) ? String(item[enField]) : String(item[field]);
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
                            alt={item.bilde_alt || item.tittel}
                            className={styles.anatomyImage}
                        />
                        {item.bilde_caption && (
                            <p className={styles.anatomyCaption}>{item.bilde_caption}</p>
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
                            {link.tekst}
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
                {intro && (
                    <div
                        className={styles.enhancedParagraph}
                        dangerouslySetInnerHTML={{ __html: intro }}
                    />
                )}

                {trekkspill?.map((item: TilstandAccordionItem, index: number) => {
                    const itemTitle = getField(item, 'tittel');
                    const itemContent = getField(item, 'innhold');
                    const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url;
                    const isSideBySide = item.bilde_posisjon === 'side' && imgSrc;

                    return (
                        <SectionAccordion
                            key={index}
                            title={itemTitle}
                            isDarkMode={resolvedTheme === 'dark'}
                            defaultOpen={false}
                        >
                            {isSideBySide ? (
                                /* Side-by-side layout: text left, image right */
                                <div className={styles.sideBySideContainer}>
                                    <div className={styles.sideBySideText}>
                                        <div
                                            className={styles.enhancedParagraph}
                                            dangerouslySetInnerHTML={{ __html: itemContent }}
                                        />
                                        {renderLinks(item)}
                                    </div>
                                    <div className={styles.sideBySideImage}>
                                        <img
                                            src={imgSrc}
                                            alt={item.bilde_alt || itemTitle}
                                            style={{ maxWidth: '100%', borderRadius: '12px' }}
                                        />
                                        {item.bilde_caption && (
                                            <p className={styles.sideBySideImageCaption}>{item.bilde_caption}</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* Standard layout: content, then image below, then links */
                                <>
                                    <div
                                        className={styles.enhancedParagraph}
                                        dangerouslySetInnerHTML={{ __html: itemContent }}
                                    />
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
