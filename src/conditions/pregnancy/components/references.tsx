"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Language-specific references data arrays
const referencesData = {
  no: [
    {
      id: "intro",
      content: [
        "Emnet \"Plager under graviditet og etter fødsel\" er utviklet av en gruppe spesialister med kunnskap på fagområdet. Sidene er utarbeidet på bakgrunn av evidensbasert kunnskap og i tillegg gir erfaringsbasert kunnskap en viktig tilleggsinformasjon i formidlingen.",
        "Sist endret 01.07.2020."
      ]
    },
    {
      id: "references_list",
      title: "Referanser",
      hasReferences: true,
      references: [
        {
          text: "Boyle R, Hay-Smith EJ, Cody JD, et al. Pelvic floor muscle training for prevention and treatment of urinary and faecal incontinence in antenatal and postnatal women. Cochrane Database Syst Rev 2012; 10: CD007471."
        },
        {
          text: "Chaliha C, Kalia V, Stanton SL, et al. Antenatal prediction of postpartum urinary and fecal incontinence. Obstet Gynecol 1999; 94: 689-694."
        },
        {
          text: "Dietz HP, Lanzarone V. Measuring pelvic floor muscle strength. Aust N Z J Obstet Gynaecol 2005; 45: 576-580."
        },
        {
          text: "Hay-Smith J, Mørkved S, Fairbrother KA, et al. Pelvic floor muscle training for prevention and treatment of urinary and faecal incontinence in antenatal and postnatal women. Cochrane Database Syst Rev 2008; 4: CD007471."
        },
        {
          text: "MacArthur C, Glazener CM, Wilson PD, et al. Persistent urinary incontinence and delivery mode history: a six-year longitudinal study. BJOG 2006; 113: 218-224."
        },
        {
          text: "Mørkved S, Bø K. Effect of pelvic floor muscle training during pregnancy and after childbirth on prevention and treatment of urinary incontinence: a systematic review. Br J Sports Med 2014; 48: 299-310."
        },
        {
          text: "Sangsawang B, Sangsawang N. Stress urinary incontinence in pregnant women: a review of prevalence, pathophysiology, and treatment. Int Urogynecol J 2013; 24: 901-912."
        },
        {
          text: "Wilson PD, Herbison RM, Herbison GP. Obstetric practice and the prevalence of urinary incontinence three months after delivery. Br J Obstet Gynaecol 1996; 103: 154-161."
        }
      ]
    }
  ],
  en: [
    {
      id: "intro",
      content: [
        "The topic \"Problems during pregnancy and after childbirth\" is developed by a group of specialists with knowledge in the field. The pages are based on evidence-based knowledge and in addition, experience-based knowledge provides important additional information in the communication.",
        "Last updated 01.07.2020."
      ]
    },
    {
      id: "references_list",
      title: "References",
      hasReferences: true,
      references: [
        {
          text: "Boyle R, Hay-Smith EJ, Cody JD, et al. Pelvic floor muscle training for prevention and treatment of urinary and faecal incontinence in antenatal and postnatal women. Cochrane Database Syst Rev 2012; 10: CD007471."
        },
        {
          text: "Chaliha C, Kalia V, Stanton SL, et al. Antenatal prediction of postpartum urinary and fecal incontinence. Obstet Gynecol 1999; 94: 689-694."
        },
        {
          text: "Dietz HP, Lanzarone V. Measuring pelvic floor muscle strength. Aust N Z J Obstet Gynaecol 2005; 45: 576-580."
        },
        {
          text: "Hay-Smith J, Mørkved S, Fairbrother KA, et al. Pelvic floor muscle training for prevention and treatment of urinary and faecal incontinence in antenatal and postnatal women. Cochrane Database Syst Rev 2008; 4: CD007471."
        },
        {
          text: "MacArthur C, Glazener CM, Wilson PD, et al. Persistent urinary incontinence and delivery mode history: a six-year longitudinal study. BJOG 2006; 113: 218-224."
        },
        {
          text: "Mørkved S, Bø K. Effect of pelvic floor muscle training during pregnancy and after childbirth on prevention and treatment of urinary incontinence: a systematic review. Br J Sports Med 2014; 48: 299-310."
        },
        {
          text: "Sangsawang B, Sangsawang N. Stress urinary incontinence in pregnant women: a review of prevalence, pathophysiology, and treatment. Int Urogynecol J 2013; 24: 901-912."
        },
        {
          text: "Wilson PD, Herbison RM, Herbison GP. Obstetric practice and the prevalence of urinary incontinence three months after delivery. Br J Obstet Gynaecol 1996; 103: 154-161."
        }
      ]
    }
  ]
} as const

export const References = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  // Helper function to render content based on item type
  const renderReferenceItem = (item: {
    id: string;
    title?: string;
    content?: string | readonly string[];
    isDirectText?: boolean;
    directText?: string;
    hasReferences?: boolean;
    references?: ReadonlyArray<{ text: string }>;
  }) => {
    const hasTitle = item.title;
    
    const content = (
      <div className={styles.normalFunctionContent}>
        {item.content && Array.isArray(item.content) ? (
          item.content.map((contentText: string, contentIndex: number) => (
            <p key={contentIndex} className={styles.enhancedParagraph}>
              {contentIndex === 1 ? <strong>{contentText}</strong> : contentText}
            </p>
          ))
        ) : item.content && (
          <p className={styles.enhancedParagraph}>{item.content}</p>
        )}

        {/* Render references list */}
        {item.hasReferences && item.references && (
          <ul className={styles.resourceList}>
            {item.references.map((reference: {
              text: string;
            }, refIndex: number) => (
              <li key={refIndex} className={styles.resourceListItem}>
                {reference.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );

    // Only wrap if section has title
    if (hasTitle) {
      return (
        <SectionAccordion
          key={item.id}
          title={item.title!}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          {content}
        </SectionAccordion>
      );
    } else {
      return <div key={item.id}>{content}</div>;
    }
  }

  return (
    <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/resource.png" alt="References" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>{language === "no" ? "Referanser" : "References"}</h2>
      </div>
      <div className={styles.sectionContent}>
        {referencesData[language].map((item) => renderReferenceItem(item))}
      </div>
    </div>
  )
}
