"use client"

import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from "../../../components/SectionAccordion"
import { CommonExerciseSection } from "../../../components/CommonExerciseSection"



/*
const TREATMENT_DATA = {
  ...
}
*/
const TREATMENT_DATA = {
  no: {
    pageTitle: "Behandling",
    intro: { para1: "", para2: "" },
    conservativeTreatment: {
      title: "Konservativ behandling",
      intro: "",
      pelvicFloorTraining: { title: "Bekkenbunnstrening", intro: "", videoNote: "", video: { src: "", title: "" }, moreVideosNote: "", moreVideosLink: "", moreVideosLinkText: "", moreVideosNote2: "" },
      exerciseData: { pageTitle: "", tryYourselfTitle: "", step1Text: "", genderInstructions: [], tipsTitle: "", tipsText: "", exerciseSteps: [], videoSectionTitle: "", videoSectionDescription: "", videos: [], smartphoneApps: { title: "", description: "", linkText: "", linkUrl: "" } },
      biofeedback: { title: "Biofeedback/Elektrostimulering", intro: "", electrostimulation: "", guidance: "" },
      lifestyle: { title: "Livsstilsendring", intro: "", weightLoss: "" },
      bladderTraining: { title: "Blæretrening", intro: "", tipsTitle: "", tips: [] as string[], conclusion: "" },
      medications: { title: "Medikamenter", intro: "", nighttime: "", sideEffects: "" },
      aids: { title: "Hjelpemidler", intro: "", devices: "", pads: "" },
      catheterization: { title: "Kateterisering", intro: "", permanent: "", considerations: "" },
      permanentCatheter: { title: "Kateter", intro: "", considerations: "" }
    },
    surgicalProcedures: {
      title: "Inngrep",
      intro: "",
      incontinenceSling: { title: "Inkontinensslynge", intro: "", women: "", men: "" },
      injection: { title: "Injeksjon", content: "" },
      botox: { title: "Botox injeksjonsbehandling", content: "" },
      sacralNerve: { title: "Sakralnervemodulering", content: "" },
      artificialSphincter: { title: "Kunstig lukkemuskel", content: "" },
      bladderEnlargement: { title: "Blæreforstørrelse", content: "" },
      urinaryDiversion: { title: "Urinavledning", content: "" }
    },
    coping: {
      title: "Mestring",
      livingWithLeakage: { title: "Å leve med lekkasje", intro: "", para2: "" },
      whatCanHelp: { title: "Hva kan gjøre situasjonen bedre?", intro: "", list: [] as string[], conclusion: "" },
      sexuality: { title: "Urinlekkasje og seksualitet", content: "" }
    }
  },
  en: {
    pageTitle: "Treatment",
    intro: { para1: "", para2: "" },
    conservativeTreatment: {
      title: "Conservative Treatment",
      intro: "",
      pelvicFloorTraining: { title: "Pelvic Floor Training", intro: "", videoNote: "", video: { src: "", title: "" }, moreVideosNote: "", moreVideosLink: "", moreVideosLinkText: "", moreVideosNote2: "" },
      exerciseData: { pageTitle: "", tryYourselfTitle: "", step1Text: "", genderInstructions: [], tipsTitle: "", tipsText: "", exerciseSteps: [], videoSectionTitle: "", videoSectionDescription: "", videos: [], smartphoneApps: { title: "", description: "", linkText: "", linkUrl: "" } },
      biofeedback: { title: "Biofeedback/Electrostimulation", intro: "", electrostimulation: "", guidance: "" },
      lifestyle: { title: "Lifestyle Changes", intro: "", weightLoss: "" },
      bladderTraining: { title: "Bladder Training", intro: "", tipsTitle: "", tips: [] as string[], conclusion: "" },
      medications: { title: "Medications", intro: "", nighttime: "", sideEffects: "" },
      aids: { title: "Aids", intro: "", devices: "", pads: "" },
      catheterization: { title: "Catheterization", intro: "", permanent: "", considerations: "" },
      permanentCatheter: { title: "Catheter", intro: "", considerations: "" }
    },
    surgicalProcedures: {
      title: "Surgical Procedures",
      intro: "",
      incontinenceSling: { title: "Incontinence Sling", intro: "", women: "", men: "" },
      injection: { title: "Injection", content: "" },
      botox: { title: "Botox Injection Treatment", content: "" },
      sacralNerve: { title: "Sacral Nerve Modulation", content: "" },
      artificialSphincter: { title: "Artificial Sphincter", content: "" },
      bladderEnlargement: { title: "Bladder Enlargement", content: "" },
      urinaryDiversion: { title: "Urinary Diversion", content: "" }
    },
    coping: {
      title: "Coping",
      livingWithLeakage: { title: "Living with Leakage", intro: "", para2: "" },
      whatCanHelp: { title: "What can improve the situation?", intro: "", list: [] as string[], conclusion: "" },
      sexuality: { title: "Urinary Incontinence and Sexuality", content: "" }
    }
  }
};

export const Treatment = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const data = TREATMENT_DATA[language]

  return (
    <>
      {/* Introduction Section */}

      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/solae.png"
              alt="Treatment"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>{data.pageTitle}</h2>
        </div>

        <div className={styles.sectionContent}>
          {/* Intro paragraphs */}
          <div className={styles.normalFunctionSection}>
            <p className={styles.enhancedParagraph}>
              {data.intro.para1}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.intro.para2}
            </p>
          </div>

          {/* ACCORDION 1: Conservative Treatment */}
          <SectionAccordion
            title={data.conservativeTreatment.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.intro}
            </p>

            {/* Pelvic Floor Training */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.pelvicFloorTraining.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.pelvicFloorTraining.intro}
            </p>

            {/* Common Exercise Section */}
            <CommonExerciseSection {...data.conservativeTreatment.exerciseData} />

            {/* Biofeedback */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.biofeedback.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.biofeedback.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.biofeedback.electrostimulation}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.biofeedback.guidance}
            </p>

            {/* Lifestyle Changes */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.lifestyle.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.lifestyle.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.lifestyle.weightLoss}
            </p>

            {/* Bladder Training */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.bladderTraining.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.bladderTraining.intro}
            </p>

            <h4 className={styles.normalFunctionTitle}>{data.conservativeTreatment.bladderTraining.tipsTitle}</h4>
            <ul className={styles.bulletList}>
              {data.conservativeTreatment.bladderTraining.tips.map((tip) => (
                <li key={tip.substring(0, 50)}>{tip}</li>
              ))}
            </ul>

            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.bladderTraining.conclusion}
            </p>

            {/* Medications */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.medications.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.medications.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.medications.nighttime}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.medications.sideEffects}
            </p>

            {/* Aids */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.aids.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.aids.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.aids.devices}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.aids.pads}
            </p>

            {/* Catheterization */}
            <h3 className={styles.subsectionTitle}>{data.conservativeTreatment.catheterization.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.catheterization.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.catheterization.permanent}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.conservativeTreatment.catheterization.considerations}
            </p>
          </SectionAccordion>

          {/* ACCORDION 2: Surgical Procedures */}
          <SectionAccordion
            title={data.surgicalProcedures.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.intro}
            </p>

            {/* Incontinence Sling */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.incontinenceSling.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.incontinenceSling.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.incontinenceSling.women}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.incontinenceSling.men}
            </p>

            {/* Injection */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.injection.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.injection.content}
            </p>

            {/* Botox */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.botox.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.botox.content}
            </p>

            {/* Sacral Nerve */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.sacralNerve.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.sacralNerve.content}
            </p>

            {/* Artificial Sphincter */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.artificialSphincter.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.artificialSphincter.content}
            </p>

            {/* Bladder Enlargement */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.bladderEnlargement.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.bladderEnlargement.content}
            </p>

            {/* Urinary Diversion */}
            <h3 className={styles.subsectionTitle}>{data.surgicalProcedures.urinaryDiversion.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.surgicalProcedures.urinaryDiversion.content}
            </p>
          </SectionAccordion>

          {/* ACCORDION 3: Coping */}
          <SectionAccordion
            title={data.coping.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            {/* Living with Leakage */}
            <h3 className={styles.subsectionTitle}>{data.coping.livingWithLeakage.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.coping.livingWithLeakage.intro}
            </p>
            <p className={styles.enhancedParagraph}>
              {data.coping.livingWithLeakage.para2}
            </p>

            {/* What Can Help */}
            <h3 className={styles.subsectionTitle}>{data.coping.whatCanHelp.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.coping.whatCanHelp.intro}
            </p>
            <ul className={styles.bulletList}>
              {data.coping.whatCanHelp.list.map((item) => (
                <li key={item.substring(0, 50)}>{item}</li>
              ))}
            </ul>
            <p className={styles.enhancedParagraph}>
              {data.coping.whatCanHelp.conclusion}
            </p>

            {/* Sexuality */}
            <h3 className={styles.subsectionTitle}>{data.coping.sexuality.title}</h3>
            <p className={styles.enhancedParagraph}>
              {data.coping.sexuality.content}
            </p>
          </SectionAccordion>
        </div>
      </div>
    </>
  )
}
