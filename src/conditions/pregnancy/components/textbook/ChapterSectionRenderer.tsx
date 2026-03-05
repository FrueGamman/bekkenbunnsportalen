"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { getImageUrl } from "../../../../lib/directus"
import type { PregnancySection } from "../../../../types/cms"

interface ChapterSectionRendererProps {
    chapter?: {
        title_no: string
        title_en?: string
        sections?: number[] | PregnancySection[]
    }
}

/**
 * Generic renderer for a PregnancyChapter from Directus.
 * Uses content_no/en, trekkspill, and media_file from PregnancySection —
 * fully editable in Directus without touching code.
 */
export const ChapterSectionRenderer = ({ chapter }: ChapterSectionRendererProps) => {
    const { language } = useLanguage()
    const { resolvedTheme } = useTheme()

    if (!chapter) {
        return null
    }

    const sections = Array.isArray(chapter.sections)
        ? chapter.sections.filter((s): s is PregnancySection => typeof s === "object" && s !== null)
        : []

    if (sections.length === 0) {
        return (
            <div className={styles.normalFunctionContent} style={{ padding: "1rem" }}>
                <p className={styles.enhancedParagraph}>
                    {language === "no"
                        ? "Ingen innhold er lagt til ennå for dette kapittelet i Directus."
                        : "No content has been added yet for this chapter in Directus."}
                </p>
            </div>
        )
    }

    const renderContent = (section: PregnancySection) => {
        const content = (language === "en" && section.content_en) ? section.content_en : section.content_no
        const hasTrekkspill = Array.isArray(section.trekkspill) && section.trekkspill.length > 0
        const imageUrl = section.media_file ? getImageUrl(section.media_file) : null

        return (
            <div className={styles.normalFunctionContent}>
                {/* Text content */}
                {content && (
                    <div
                        className={styles.enhancedParagraph}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                )}

                {/* Image from Directus media_file */}
                {imageUrl && (
                    <figure style={{ margin: "20px auto", maxWidth: "600px", textAlign: "center" }}>
                        <img
                            src={imageUrl}
                            alt={(language === "en" && section.title_en) ? section.title_en : section.title_no}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            }}
                        />
                    </figure>
                )}

                {/* Accordion sub-items (trekkspill) */}
                {hasTrekkspill && section.trekkspill!.map((item, idx) => {
                    const itemTitle = (language === "en" && item.tittel_en) ? item.tittel_en : item.tittel
                    const itemContent = (language === "en" && item.innhold_en) ? item.innhold_en : item.innhold
                    const imgSrc = item.bilde_id ? getImageUrl(item.bilde_id) : item.bilde_url
                    return (
                        <SectionAccordion
                            key={idx}
                            title={itemTitle}
                            isDarkMode={resolvedTheme === "dark"}
                            defaultOpen={false}
                        >
                            <div className={styles.normalFunctionContent}>
                                {itemContent && (
                                    <div
                                        className={styles.enhancedParagraph}
                                        dangerouslySetInnerHTML={{ __html: itemContent }}
                                    />
                                )}
                                {imgSrc && (
                                    <figure style={{ margin: "16px auto", maxWidth: "500px", textAlign: "center" }}>
                                        <img
                                            src={imgSrc}
                                            alt={item.bilde_alt || itemTitle}
                                            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                                        />
                                        {item.bilde_caption && (
                                            <figcaption className={styles.responsiveFigcaption} style={{ fontStyle: "italic", color: resolvedTheme === "dark" ? "#a0a0a0" : "#666" }}>
                                                {(language === "en" && item.bilde_caption_en) ? item.bilde_caption_en : item.bilde_caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                )}
                                {/* Links */}
                                {item.lenker && item.lenker.length > 0 && (
                                    <div style={{ marginTop: "1rem" }}>
                                        {item.lenker.map((link, li) => (
                                            <p key={li} className={styles.enhancedParagraph}>
                                                <a
                                                    href={link.url}
                                                    target={link.url.startsWith("http") ? "_blank" : undefined}
                                                    rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                                                    className={styles.resourceLink}
                                                >
                                                    {(language === "en" && link.tekst_en) ? link.tekst_en : link.tekst}
                                                </a>
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </SectionAccordion>
                    )
                })}

                {/* Section-level links */}
                {section.links && section.links.length > 0 && (
                    <div style={{ marginTop: "1rem" }}>
                        {section.links.map((link, li) => (
                            <p key={li} className={styles.enhancedParagraph}>
                                <a
                                    href={link.link_url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.resourceLink}
                                >
                                    {(language === "en" && link.link_text_en) ? link.link_text_en : link.link_text_no}
                                </a>
                            </p>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    if (sections.length === 1) {
        // Single section: render inline without accordion wrapper
        return renderContent(sections[0])
    }

    return (
        <>
            {sections.map((section, index) => {
                const title = (language === "en" && section.title_en) ? section.title_en : section.title_no
                return (
                    <SectionAccordion
                        key={index}
                        title={title}
                        isDarkMode={resolvedTheme === "dark"}
                        defaultOpen={false}
                    >
                        {renderContent(section)}
                    </SectionAccordion>
                )
            })}
        </>
    )
}
