"use client"

import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from "../../../components/SectionAccordion"

// Content data structure
type ContentItem =
  | {
    id: string
    type: "intro"
    description: string
  }
  | {
    id: string
    type: "resources-table"
    title: string
    tableNote: string
    categories: ReadonlyArray<{
      title: string
      resources: ReadonlyArray<{
        name: string
        desc: string
        links: ReadonlyArray<{
          text: string
          url: string
        }>
        type: string
      }>
    }>
  }

/*
const RESOURCES_DATA = {
  ...
}
*/
const RESOURCES_DATA = {
  no: [] as ContentItem[],
  en: [] as ContentItem[]
} as const

export const Resources = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();

  const data = RESOURCES_DATA[language];

  const renderContent = (item: ContentItem) => {
    if (item.type === "intro") {
      return (
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>
              {item.description}
            </p>
          </div>
        </div>
      )
    }

    if (item.type === "resources-table") {
      return (
        <SectionAccordion
          title={item.title}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <p className={styles.enhancedParagraph} style={{ marginBottom: '1.5rem', fontStyle: 'italic' }}>
            {item.tableNote}
          </p>

          <div className={styles.resourceTable}>
            <div className={styles.resourceHeader}>
              <div className={styles.resourceColumn}>{language === 'no' ? 'RESSURS' : 'RESOURCE'}</div>
              <div className={styles.resourceColumn}>{language === 'no' ? 'LENKE' : 'LINK'}</div>
            </div>

            {item.categories.map((category, categoryIndex) =>
              category.resources.map((resource, resourceIndex) => (
                <div key={`${categoryIndex}-${resourceIndex}`} className={styles.resourceRow}>
                  <div className={styles.resourceDescription}>
                    <h4 className={styles.resourceName}>
                      {resource.name}
                    </h4>
                    <p className={styles.resourceDesc}>
                      {resource.desc}
                    </p>
                    <span className={styles.resourceType}>
                      {resource.type}
                    </span>
                  </div>
                  <div className={styles.resourceLinks}>
                    {resource.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
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
              ))
            )}
          </div>
        </SectionAccordion>
      )
    }

    return null
  }

  return (
    <>
      {/* Introduction Section */}

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img src="/resource.png" alt="Resources" width="24" height="24" />
          </div>
          <h2 className={styles.sectionTitle}>{language === 'no' ? 'Ressurser' : 'Resources'}</h2>
        </div>

        <div className={styles.sectionContent}>
          {data.map((item) => (
            <div key={item.id}>
              {renderContent(item)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};