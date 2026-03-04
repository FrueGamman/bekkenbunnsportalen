"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { deliveryMethodData } from "../../../../data/textbook-section-data/delivery-method-data"

type DeliveryMethodSectionProps = { dataNo?: unknown; dataEn?: unknown }

export const DeliveryMethodSection = ({ dataNo, dataEn }: DeliveryMethodSectionProps = {}) => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  if (dataNo == null || dataEn == null) {
    return (
      <div className={styles.normalFunctionContent} style={{ padding: "1rem" }}>
        <p className={styles.enhancedParagraph}>
          {language === "no"
            ? "Innhold for denne seksjonen hentes fra Directus. Kjør sync eller fyll ut data_no/data_en i kapittelet."
            : "Content for this section is loaded from Directus. Run sync or fill data_no/data_en on the chapter."}
        </p>
      </div>
    )
  }
  const data = language === "no" ? (dataNo as typeof deliveryMethodData.no) : (dataEn as typeof deliveryMethodData.en)

  return (
    <>
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            {data.intro.map((paragraph, index) => (
              <p key={index} className={styles.enhancedParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {data.sections.map((section, index) => (
          <SectionAccordion
            key={index}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.enhancedParagraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </SectionAccordion>
        ))}
    </>
  )
}

