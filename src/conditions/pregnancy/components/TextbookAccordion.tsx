"use client"

import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"
import type { PregnancyChapter, PregnancySection } from "../../../types/cms"

/** Same order as in Directus: Bekkenbunnen, Underlivet..., Forløsningsmetode, Fødselsrifter, Prolaps, Blærefunksjon, Tarmfunksjon, Samleie, Kvinnelig omskjæring, Søk hjelp */
const CHAPTER_IDS = [
  "pelvic-floor",
  "pelvis-pregnancy",
  "delivery-method",
  "birth-tears",
  "prolapse",
  "bladder-function",
  "bowel-function",
  "intercourse",
  "female-circumcision",
  "seek-help",
]

interface TextbookAccordionProps {
  language: "no" | "en"
  chapters?: PregnancyChapter[]
}

export const TextbookAccordion = ({ language, chapters = [] }: TextbookAccordionProps) => {
  const { resolvedTheme } = useTheme()

  const INTRO_TEXT = {
    no: "Læreboken inneholder informasjon om normalfunksjoner, symptomer på problemer, utredning og behandling av ulike underlivsplager og funksjonsforstyrrelser. Med denne informasjonen ønsker vi å formidle kunnskap og åpenhet rundt ulike underlivsplager under graviditet og etter fødsel, slik at flere kan søke hjelp om det oppstår utfordringer. Enda finnes det tabuer rundt dette som for noen medfører lengre tid med plager og utsatt behandling på noe som faktisk kan rettes på.\n\nDe fleste endringer man opplever i underlivet er både normale og forventet. Noen av plagene og problemene vet vi det knytter seg noen spørsmål til, spesielt omkring vannlatning og avføring. Det er fint å ta dette opp med din jordmor og/eller fastlege både i svangerskapet og etter fødselen, og også ved barselavdelingen/sykehuset ved utreise.\n\nHer omtales ikke bekkenleddsmerter (bekkenløsning).",
    en: "The textbook contains information about normal functions, symptoms of problems, investigation and treatment of various pelvic floor problems and functional disorders. With this information, we want to convey knowledge and openness about various pelvic floor problems during pregnancy and after childbirth, so that more people can seek help if challenges arise.\n\nMost changes you experience in the pelvic area are both normal and expected. Some of the complaints and problems we know are associated with questions, especially regarding urination and bowel movements. It is good to discuss this with your midwife and/or GP both during pregnancy and after birth, and also at the maternity ward/hospital upon discharge.\n\nPelvic joint pain (pelvic girdle pain) is not covered here.",
  }

  const renderRichText = (html?: string) => {
    if (!html) return null
    return (
      <div
        className={styles.enhancedParagraph}
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <div
      id="textbook"
      className={`${styles.sectionContainer} ${resolvedTheme === "dark" ? styles.darkMode : ""}`}
    >
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/resource.png" alt="Textbook" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>
          {language === "no" ? "Lærebok" : "Textbook"}
        </h2>
      </div>

      <div className={styles.sectionContent}>
        {/* Intro – same block as original Textbook */}
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            {INTRO_TEXT[language].split("\n\n").map((paragraph, idx) => (
              <p key={`intro-${idx}`} className={styles.enhancedParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Chapters with same IDs as original for hash links (#pelvic-floor, #birth-tears, etc.) */}
        <div style={{ marginTop: "24px" }}>
          {chapters.map((chapter, index) => {
            const chapterTitle = language === "en" && chapter.title_en ? chapter.title_en : chapter.title_no
            const sections = (chapter.sections || []) as PregnancySection[]
            const chapterId = CHAPTER_IDS[index] ?? undefined

            return (
              <SectionAccordion
                key={chapter.id}
                id={chapterId}
                title={chapterTitle}
                isDarkMode={resolvedTheme === "dark"}
                defaultOpen={false}
              >
                <div className={styles.normalFunctionContent}>
                  {sections.map((section) => {
                    const secTitle = language === "en" && section.title_en ? section.title_en : section.title_no
                    const secContent = language === "en" && section.content_en ? section.content_en : section.content_no

                    return (
                      <SectionAccordion
                        key={section.id}
                        title={secTitle}
                        isDarkMode={resolvedTheme === "dark"}
                        defaultOpen={false}
                      >
                        <div className={styles.normalFunctionContent}>
                          {secContent && renderRichText(secContent)}
                        </div>
                      </SectionAccordion>
                    )
                  })}
                </div>
              </SectionAccordion>
            )
          })}
        </div>
      </div>
    </div>
  )
}
