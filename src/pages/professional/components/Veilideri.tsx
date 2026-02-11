"use client"

import type React from "react"
import { useLanguage } from "../../../context/LanguageContext"
import styles from "./Veilideri.module.css"

// Structured bilingual data for Veilideri component
const VEILIDERI_DATA = {
  no: {
    title: "Kliniske veiledere",
    subtitle: "Oppdaterte retningslinjer for best practice",
    goToGuide: "Åpne veileder",
    guidelines: [
      {
        id: "anorectal-guidelines",
        title: "Faglige retningslinjer for utredning og konservativ behandling av anorektale funksjonsforstyrrelser",
        source: "NBH/Helsebiblioteket",
        link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf",
      },
      {
        id: "bladder-bowel-training",
        title: "Consensus statement on bladder training and bowel training",
        source: "ICS.org",
        link: "https://www.ics.org/Documents/DocumentsDownload.aspx?DocumentID=5916",
      },
      {
        id: "unn-referral",
        title: "Henvisningsveiledning UNN",
        source: "UNN",
        link: "https://www.unn.no/henvisninger-til-unn",
      },
      {
        id: "fecal-incontinence-guide",
        title: "Guideline for the diagnosis and treatment of Faecal Incontinence – A UEG/ESCP/ESNM/ESPCG",
        source: "Pubmed",
        link: "https://pubmed.ncbi.nlm.nih.gov/35303758/",
      },
      {
        id: "pelvic-pain-guide",
        title: "Langvarige bekkensmerter (2024)",
        source: "Metodebok Gynekologi og obstetrikk",
        link: "https://metodebok.no/index.php?action=topic&item=jzbn27V4",
      },
      {
        id: "perineal-injury-guide",
        title: "Veileder i gynekologi – Perinealskade og anal sfinkterskade ved fødsel",
        source: "Metodebok Norsk gynekologisk forening",
        link: "https://metodebok.no/index.php?action=topic&item=qqnzK4BK",
      },
      {
        id: "urinary-incontinence-guide",
        title: "Urininkontinens. Norsk gynekologisk forening.",
        source: "Metodebok Norsk gynekologisk forening",
        link: "https://metodebok.no/index.php?action=topic&item=MGUaPMYb",
      },
      {
        id: "vulva-pain-guide",
        title: "Kroniske smertetilstander i vulva",
        source: "Metodebok Norsk gynekologisk forening",
        link: "https://metodebok.no/index.php?action=topic&item=JxBt8Wny",
      },
      {
        id: "catheter-infection-guide",
        title: "Veileder for forebygging av kateterassosierte urinveisinfeksjoner",
        source: "Folkehelseinstituttet",
        link: "https://www.fhi.no/nettpub/urinveisinfeksjoner/",
      },
      {
        id: "sexual-health-strategy",
        title: "Snakk om det! Strategi for seksuell helse (2017-2022)",
        source: "Helse-og omsorgsdepartementet",
        link: "http://www.regjeringen.no/contentassets/284e09615fd04338a817e1160f4b10a7/strategi%5Fseksuell%5Fhelse.pdf",
      },
      {
        id: "sexual-health-handbook",
        title: "Oppslagsverk for helsepersonell som jobber med prevensjon, seksuelt overførbare infeksjoner og annen tematikk innenfor seksuell og reproduktiv helse",
        source: "Sexogsamfunn.no",
        link: "https://emetodebok.no/",
      },
    ]
  },
  en: {
    title: "Clinical guidelines",
    subtitle: "Updated guidelines for best practice",
    goToGuide: "Open guide",
    guidelines: [
      {
        id: "anorectal-guidelines",
        title: "Professional guidelines for assessment and conservative treatment of anorectal functional disorders",
        source: "NBH/Helsebiblioteket",
        link: "https://nekib.helsekompetanse.no/wp-content/uploads/2023/02/AI-retningslinjer-2019-pdf.pdf",
      },
      {
        id: "bladder-bowel-training",
        title: "Consensus statement on bladder training and bowel training",
        source: "ICS.org",
        link: "https://www.ics.org/Documents/DocumentsDownload.aspx?DocumentID=5916",
      },
      {
        id: "unn-referral",
        title: "UNN referral guide",
        source: "UNN",
        link: "https://www.unn.no/henvisninger-til-unn",
      },
      {
        id: "fecal-incontinence-guide",
        title: "Guideline for the diagnosis and treatment of Faecal Incontinence – A UEG/ESCP/ESNM/ESPCG",
        source: "Pubmed",
        link: "https://pubmed.ncbi.nlm.nih.gov/35303758/",
      },
      {
        id: "pelvic-pain-guide",
        title: "Chronic pelvic pain (2024)",
        source: "Metodebok Gynekologi og obstetrikk",
        link: "https://metodebok.no/index.php?action=topic&item=jzbn27V4",
      },
      {
        id: "perineal-injury-guide",
        title: "Guidelines in gynecology – Perineal injury and anal sphincter injury during childbirth",
        source: "Metodebok Norsk gynekologisk forening",
        link: "https://metodebok.no/index.php?action=topic&item=qqnzK4BK",
      },
      {
        id: "urinary-incontinence-guide",
        title: "Urinary incontinence. Norwegian Gynecological Association.",
        source: "Metodebok Norsk gynekologisk forening",
        link: "https://metodebok.no/index.php?action=topic&item=MGUaPMYb",
      },
      {
        id: "vulva-pain-guide",
        title: "Chronic vulvar pain conditions",
        source: "Metodebok Norsk gynekologisk forening",
        link: "https://metodebok.no/index.php?action=topic&item=JxBt8Wny",
      },
      {
        id: "catheter-infection-guide",
        title: "Guidelines for prevention of catheter-associated urinary tract infections",
        source: "Folkehelseinstituttet",
        link: "https://www.fhi.no/nettpub/urinveisinfeksjoner/",
      },
      {
        id: "sexual-health-strategy",
        title: "Talk about it! Strategy for sexual health (2017-2022)",
        source: "Helse-og omsorgsdepartementet",
        link: "http://www.regjeringen.no/contentassets/284e09615fd04338a817e1160f4b10a7/strategi%5Fseksuell%5Fhelse.pdf",
      },
      {
        id: "sexual-health-handbook",
        title: "Reference handbook for health personnel working with contraception, sexually transmitted infections and other topics within sexual and reproductive health",
        source: "Sexogsamfunn.no",
        link: "https://emetodebok.no/",
      },
    ]
  }
} as const

const Veilideri: React.FC = () => {
  const { language } = useLanguage()
  const data = VEILIDERI_DATA[language]


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>
            <img src="/majesticons_note-text-line.png" alt="" />
          </span>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </div>
      </div>

      <div className={styles.guidelinesList}>
        {data.guidelines.map((guideline) => (
          <div key={guideline.id} className={styles.guidelineItem}>
            <div className={styles.guidelineIcon}>
              <img src="/document-icon.png" alt="" />
            </div>
            <div className={styles.guidelineInfo}>
              <h3 className={styles.guidelineTitle}>{guideline.title}</h3>
              <p className={styles.guidelineSource}>{guideline.source}</p>
            </div>
            <a 
              href={guideline.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.guidelineBtn} 
              title={data.goToGuide}
            >
              <span className={styles.guideBtnIcon}>
                <img src="/streamline-color_expand-window-2.png" alt="" />
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Veilideri
