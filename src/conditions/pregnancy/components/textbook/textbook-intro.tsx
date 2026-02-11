"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import styles from "../section-content.module.css"

const introData = {
  no: {
    pageTitle: "Lærebok",
    intro: [
      "Læreboken inneholder informasjon om normalfunksjoner, symptomer på problemer, utredning og behandling av ulike underlivsplager og funksjonsforstyrrelser. Med denne informasjonen ønsker vi å formidle kunnskap og åpenhet rundt ulike underlivsplager under graviditet og etter fødsel, slik at flere kan søke hjelp om det oppstår utfordringer. Enda finnes det tabuer rundt dette som for noen medfører lengre tid med plager og utsatt behandling på noe som faktisk kan rettes på.",
      "De fleste endringer man opplever i underlivet er både normale og forventet. Noen av plagene og problemene vet vi det knytter seg noen spørsmål til, spesielt omkring vannlatning og avføring. Det er fint å ta dette opp med din jordmor og/eller fastlege både i svangerskapet og etter fødselen, og også ved barselavdelingen/sykehuset ved utreise.",
      "Her omtales ikke bekkenleddsmerter (bekkenløsning)."
    ],
  },
  en: {
    pageTitle: "Textbook",
    intro: [
      "The textbook contains information about normal functions, symptoms of problems, investigation and treatment of various pelvic complaints and functional disorders. With this information, we wish to convey knowledge and openness about various pelvic complaints during pregnancy and after childbirth, so that more people can seek help if challenges arise. There are still taboos around this which for some leads to longer periods with complaints and delayed treatment for something that can actually be corrected.",
      "Most changes one experiences in the pelvic area are both normal and expected. Some of the complaints and problems we know are associated with questions, especially regarding urination and bowel movements. It is good to discuss this with your midwife and/or GP both during pregnancy and after birth, and also at the maternity ward/hospital upon discharge.",
      "Pelvic joint pain (pelvic girdle pain) is not covered here."
    ],
  }
} as const

export const TextbookIntro = () => {
  const { language } = useLanguage()
  const data = introData[language]

  return (
    <>
      {data.intro.map((paragraph, index) => (
        <p key={index} className={styles.enhancedParagraph}>
          {paragraph}
        </p>
      ))}
    </>
  )
}

