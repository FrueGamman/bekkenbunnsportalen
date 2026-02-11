"use client";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./section-content.module.css";
import { SectionAccordion } from "../../../components/SectionAccordion";

/*
const INTRODUCTION_DATA = {
  // ... commented out for now
}
*/

const SYMPTOMS_DATA = {
  no: {
    pageTitle: "Symptomene ",
    overviewTitle: "Symptomene varierer",
    symptoms: [
      {
        id: "incomplete_emptying",
        text: "Følelse av ufullstendig tømming"
      },
      {
        id: "frequent_urination",
        text: "Hyppig vannlating på dagtid og om natten."
      },
      {
        id: "weak_stream",
        text: "Nedsatt trykk på urinstrålen, nødvendig å bruke bukpress eller presse med hånden."
      },
      {
        id: "hesitation",
        text: "Bruker lang tid for å starte vannlatingen (hesitasjon)."
      },
      {
        id: "intermittent_flow",
        text: "Vannlatingen kan være oppstykket og det kan ta lang tid å tømme blæren."
      },
      {
        id: "no_urination",
        text: "Får ikke latt noe urin i det hele tatt."
      },
      {
        id: "infections",
        text: "Urinveisinfeksjoner er for mange eneste symptom og kan skyldes resturin."
      },
      {
        id: "overflow_incontinence",
        text: "Urinlekkasje kan også være eneste tegn på at blæren ikke blir tømt. Dersom man går med store mengder urin i blæren kan man ha smålekkasjer av urin ved at det \"renner over\"."
      },
      {
        id: "pelvic_pressure",
        text: "Tyngde- eller oppfylt følelse i magen/bekkenet."
      }
    ]
  },
  en: {
    pageTitle: "Symptoms ",
    overviewTitle: "What is it?",
    symptoms: [
      {
        id: "incomplete_emptying",
        text: "Feeling of incomplete emptying"
      },
      {
        id: "frequent_urination",
        text: "Frequent urination during the day and at night"
      },
      {
        id: "weak_stream",
        text: "Reduced pressure on the urine stream, necessary to use abdominal pressure or press with the hand"
      },
      {
        id: "hesitation",
        text: "Takes a long time to start urination (hesitation)"
      },
      {
        id: "intermittent_flow",
        text: "Urination can be intermittent and it can take a long time to empty the bladder"
      },
      {
        id: "no_urination",
        text: "Unable to urinate at all"
      },
      {
        id: "infections",
        text: "Urinary tract infections are for many the only symptom and may be due to residual urine"
      },
      {
        id: "overflow_incontinence",
        text: "Urinary incontinence can also be the only sign that the bladder is not being emptied. If you have large amounts of urine in the bladder, you may have small urine leaks when it 'overflows'"
      },
      {
        id: "pelvic_pressure",
        text: "Heavy or full feeling in the stomach/pelvis"
      }
    ]
  }
} as const

export const Symptoms = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();

  const { pageTitle, overviewTitle, symptoms } = SYMPTOMS_DATA[language];

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/inSymptoms.png" alt="Symptome" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>
          {pageTitle}
        </h2>
      </div>
      
      <div className={styles.sectionContent}>
        {/* Male anatomy image outside the accordion */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column',
          marginBottom: '2rem',
          padding: '1rem'
        }}>
          <img 
            src="/montasje1.jpg" 
            alt="Male anatomy" 
            style={{ 
              maxWidth: '600px', 
              width: '100%', 
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              display: 'block',
              margin: '0 auto'
            }} 
          />
          <p className={styles.contentSubtitle} style={{ 
            marginTop: '1rem', 
            fontWeight: '500',
            textAlign: 'center'
          }}>
            Symptomene Varierer
          </p>
        </div>

        <SectionAccordion 
          title={overviewTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.enhancedContentSection}>
            <ul className={styles.symptomsList}>
              {symptoms.map((symptom, index) => (
                <li key={index} className={styles.symptomItem}>
                  <div className={styles.symptomBullet}>•</div>
                  <span className={styles.symptomText}>{symptom.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionAccordion>
      </div>
    </div>
    </>
  );
};
