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

  const data = dataNo != null && dataEn != null
    ? (language === "no" ? (dataNo as typeof deliveryMethodData.no) : (dataEn as typeof deliveryMethodData.en))
    : (language === "no" ? deliveryMethodData.no : deliveryMethodData.en)

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

