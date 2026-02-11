import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { SectionAccordion } from "./SectionAccordion";
import type { ConditionSection } from "../types/cms";
import { getImageUrl } from "../lib/directus";
import styles from "../conditions/urinary-incontinence/components/section-content.module.css";

interface DynamicConditionSectionProps {
    section: ConditionSection;
}

export const DynamicConditionSection = ({ section }: DynamicConditionSectionProps) => {
    const { language } = useLanguage();
    const { resolvedTheme } = useTheme();

    const translation = section.translations.find(t => t.languages_code === language) || section.translations[0];

    if (!translation) return null;

    return (
        <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                    {/* Use provided icon string as URL or fallback to a default if it looks like a path */}
                    <img
                        src={section.icon && section.icon.startsWith('/') ? section.icon : "/inSymptoms.png"}
                        alt={translation.title}
                        width="24"
                        height="24"
                    />
                </div>
                <h2 className={styles.sectionTitle}>{translation.title}</h2>
            </div>

            {translation.quote_text && (
                <div className={styles.quoteContainer}>
                    <blockquote className={styles.patientQuote}>
                        <p className={styles.quoteText}>"{translation.quote_text}"</p>
                        {translation.quote_attribution && (
                            <cite className={styles.quoteAuthor}>— {translation.quote_attribution}</cite>
                        )}
                    </blockquote>
                </div>
            )}

            <div className={styles.sectionContent}>
                {translation.intro_text && (
                    <div
                        className={styles.enhancedParagraph}
                        dangerouslySetInnerHTML={{ __html: translation.intro_text }}
                    />
                )}

                {section.accordion_items?.map((item) => {
                    const itemTranslation = item.translations.find(t => t.languages_code === language) || item.translations[0];
                    if (!itemTranslation) return null;

                    return (
                        <SectionAccordion
                            key={item.id}
                            title={itemTranslation.title}
                            isDarkMode={resolvedTheme === 'dark'}
                            defaultOpen={false}
                        >
                            <div
                                className={styles.enhancedParagraph}
                                dangerouslySetInnerHTML={{ __html: itemTranslation.content }}
                            />
                            {item.images && item.images.length > 0 && (
                                <div className={styles.anatomySection}>
                                    <div className={styles.anatomyGrid}>
                                        {item.images.map((img) => (
                                            <div key={img.directus_files_id} className={styles.anatomyItem2}>
                                                <img
                                                    src={getImageUrl(img.directus_files_id)}
                                                    alt=""
                                                    className={styles.anatomyImage}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </SectionAccordion>
                    );
                })}
            </div>
        </div>
    );
};
