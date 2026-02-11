"use client"

import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from "../../../components/SectionAccordion"



// Content data structure
type DiagnosisData = {
  pageTitle: string;
  intro: {
    lead: string;
    questions: string;
    questionList: string[];
    process: string;
  };
  sections: Array<{
    id: string;
    title: string;
    content: Array<{
      type: "paragraph" | "list" | "link";
      text?: string;
      items?: string[];
      linkText?: string;
      linkUrl?: string;
      linkContext?: string;
    }>;
  }>;
};

const DIAGNOSIS_DATA: Record<'no' | 'en', DiagnosisData> = {
  no: {
    pageTitle: "Utredning",
    intro: {
      lead: "For å få best mulig hjelp for urininkontinens, må det gjennomføres en grundig utredning av vannlatingsproblemene dine. Utredningen tar sikte på å avdekke årsaken til lekkasjeplagene, og en grundig gjennomgang av sykehistorien din er essensiell.",
      questions: "Sentrale spørsmål i denne kartleggingen vil være:",
      questionList: [
        "Når og i hvilken sammenheng startet lekkasjene?",
        "Hvor ofte og hvor mye lekker du?"
      ],
      process: "Utredningen starter med at du kartlegger dine egne plager, før du bestiller time hos fastlegen. Om nødvendig sender fastlegen deg videre til en spesialist."
    },
    sections: [
      {
        id: "what-should-i-do",
        title: "Hva skal JEG gjøre?",
        content: [
          {
            type: "paragraph",
            text: "Informer fastlegen om symptomer og plager du har. Fastlegen har ansvaret for deg som pasient og kan henvise videre til andre ved behov."
          },
          {
            type: "paragraph",
            text: "Før du går til fastlegen kan du prøve å kartlegge vannlatingsplagene dine. Du bør føre en vannlatingsdagbok før du går til fastlegen. På den måten vil du kunne kartlegge blærefunksjonen din, hvilke plager du har og hvordan du har det med dem i hverdagen."
          },
          {
            type: "link",
            linkContext: "Her er et eksempel på hvordan du kan føre en slik dagbok:",
            linkText: "vannlatingsbok",
            linkUrl: "https://nekib.helsekompetanse.no/wp-content/uploads/2022/01/vanlatingsbok.pdf",
            text: "Dette er den samme type dagbok som du kan bli bedt om å fylle ut dersom du henvises videre til en spesialist. Føring av vannlatingsdagbok egner seg også som en selvtest og en får blant annet svar på hvor ofte en later vannet, hvor store mengder urin som kommer og hvor mye en lekker. En vannlatingsdagbok brukes også til å evaluere effekt av behandling."
          },
          {
            type: "paragraph",
            text: "Dersom du har avføringsproblemer som diaré, forstoppelse eller andre tømmingsvansker, bør du informere fastlegen om dette."
          }
        ]
      },
      {
        id: "gp-section",
        title: "Hva gjør FASTLEGEN?",
        content: [
          {
            type: "paragraph",
            text: "Når du kommer til fastlegen er det viktig at du forteller om dine vannlatingsplager og hva som er hovedutfordringen med plagene. Ut fra din historie kan fastlegen danne seg et bilde av en tenkt diagnose. Fastlegen sjekker kanskje for urinveisinfeksjon for å kunne utelukke det. Det er vanlig at fastlegen undersøker prostata på menn og tar en gynekologisk undersøkelse på kvinner."
          },
          {
            type: "paragraph",
            text: "Hvis fastlegen vurderer at du trenger videre utredning for ditt problem, henvises du til spesialist (urolog/gynekolog/uroterapeut)."
          },
          {
            type: "paragraph",
            text: "Hvis fastlegen vurderer det slik at det er behov får du resept på antibiotika eller blæredempende medisiner. Du kan også henvises til fysioterapeut med spesialisering på bekkenbunnen eller uroterapeut."
          },
          {
            type: "paragraph",
            text: "Før fastlegen eventuelt henviser til spesialist, er det noen ting som skal være kartlagt og være en del av henvisningen. Under er det listet opp kartleggingsspørsmål og svarene på disse er viktig informasjon å ha med."
          },
          {
            type: "list",
            items: [
              "Født barn? Hvor mange og evt. problemer i forbindelse med fødsel?",
              "Når og i hvilken forbindelse startet problemene?",
              "Resultatene for nøyaktig ført vannlatingsdagbok (drikke- og miksjonsliste) for tre døgn.",
              "Hvilken type inkontinens? Anstrengelses-, hastverks-, dryppelekkasje?",
              "Følelse av ufullstendig tømming?",
              "Urinveisinfeksjoner, eventuelt hvor ofte?",
              "Smerter i forbindelse med blærefylling eller -tømming?",
              "Problemer i forbindelse med samleie?",
              "Tidligere behandling for urinlekkasjen: Konservativ eller kirurgisk?",
              "Problemer med avføringslekkasje eller forstoppelse?",
              "Hormoner eller medikamenter?"
            ]
          },
          {
            type: "link",
            linkContext: "Ved utredning av urinlekkasje hos pasienter med multippel sklerose (MS) kan denne",
            linkText: "veilederen",
            linkUrl: "https://msveileder.no/artikkel/88/vannlatingsforstyrrelser",
            text: ", utarbeidet av Nasjonal kompetansetjeneste for multippel sklerose, være nyttig både for pasient og helsepersonell."
          }
        ]
      },
      {
        id: "specialist-section",
        title: "Hva gjør SPESIALISTEN?",
        content: [
          {
            type: "paragraph",
            text: "Henvisingen blir vurdert av en spesialist. Spesialisten vurderer hvilke ytterligere undersøkelser som er nødvendige slik at de blir gjort når du kommer til konsultasjon. Etter konsultasjon vil du oftest tilbys såkalt konservativ behandling. Noen ganger er det behov for mer utredning som kan vise at det er behov for kirurgiske inngrep."
          },
          {
            type: "link",
            linkContext: "Alle pasienter må fylle ut en dagbok",
            linkText: "eksempel",
            linkUrl: "https://nekib.helsekompetanse.no/wp-content/uploads/2022/01/vanlatingsbok.pdf",
            text: "som skal tas med til konsultasjonen. I tillegg benyttes ulike scoringsskjema som det er viktig å fylle ut. Disse skjemaene blir sendt til deg i forkant av timen."
          },
          {
            type: "paragraph",
            text: "Ved videre utredning er det ulike undersøkelser som kan være aktuelle:"
          },
          {
            type: "list",
            items: [
              "Flowmetri: Man tømmer blæra på et flowmeter (spesiallaget toalett) som registrerer trykket på strålen og hvor lang tid som brukes på å tømme blæra.",
              "Måling av resturin: Resturin i blæra måles gjennom å scanne på utsiden av magen med et ultralydapparat, eller sette inn et urinkateter og se hvor mye som er igjen i blæra etter vannlating.",
              "Urinprøve: Urinprøve tas i hovedsak for å utelukke urinveisinfeksjon.",
              "Gjennomgang av vannlatinsdagbok (drikke- og miksjonsliste): Behandler går gjennom dagboken sammen med pasienten for å vurdere omfanget av lekkasjeproblemene.",
              "Stresstest: Man får på seg en bleie, og blæra fylles med 300 ml vann. Deretter skal man hoste og hoppe for å se hvor stor lekkasjen fra blæra er under trykk fra buken.",
              "Urodynamisk utredning: Ved urodynamisk undersøkelse måler man urinblæras innhold og trykk, samt følelse av fylning. Ett tynt kateter (plastrør) føres inn i urinblæra. I tillegg settes et kateter inn i endetarmen. Deretter fylles det sakte saltvann inn i blæra. De forskjellige målingene blir tatt gjennom disse katetrene med et spesialapparat."
            ]
          },
          {
            type: "paragraph",
            text: "Etter denne utredningen vurderer spesialisten på nytt om det er behov for ytterligere konservativ behandling eller om neste skritt i behandling er et inngrep."
          }
        ]
      }
    ]
  },
  en: {
    pageTitle: "Diagnosis",
    intro: {
      lead: "To get the best possible help for urinary incontinence, a thorough investigation of your urinary problems must be carried out. The investigation aims to uncover the cause of the leakage problems, and a thorough review of your medical history is essential.",
      questions: "Central questions in this assessment will be:",
      questionList: [
        "When and in what context did the leakages start?",
        "How often and how much do you leak?"
      ],
      process: "The investigation starts with you mapping your own problems, before you book an appointment with your GP. If necessary, the GP will send you on to a specialist."
    },
    sections: [
      {
        id: "what-should-i-do",
        title: "What should I do?",
        content: [
          {
            type: "paragraph",
            text: "Inform your GP about symptoms and problems you have. The GP has responsibility for you as a patient and can refer you further to others if needed."
          },
          {
            type: "paragraph",
            text: "Before you go to your GP, you can try to map your urinary problems. You should keep a voiding diary before you go to your GP. That way you will be able to map your bladder function, what problems you have and how you are doing with them in everyday life."
          },
          {
            type: "link",
            linkContext: "Here is an example of how you can keep such a diary:",
            linkText: "voiding diary",
            linkUrl: "https://nekib.helsekompetanse.no/wp-content/uploads/2022/01/vanlatingsbok.pdf",
            text: "This is the same type of diary that you may be asked to fill out if you are referred to a specialist. Keeping a voiding diary is also suitable as a self-test and you get answers, among other things, about how often you urinate, how much urine comes out and how much you leak. A voiding diary is also used to evaluate the effect of treatment."
          },
          {
            type: "paragraph",
            text: "If you have bowel problems such as diarrhea, constipation or other emptying difficulties, you should inform your GP about this."
          }
        ]
      },
      {
        id: "gp-section",
        title: "What does the GP do?",
        content: [
          {
            type: "paragraph",
            text: "When you come to your GP, it is important that you tell them about your urinary problems and what the main challenge is with the problems. Based on your history, the GP can form a picture of a tentative diagnosis. The GP may check for urinary tract infection to be able to rule it out. It is common for the GP to examine the prostate in men and take a gynecological examination in women."
          },
          {
            type: "paragraph",
            text: "If the GP assesses that you need further investigation for your problem, you will be referred to a specialist (urologist/gynecologist/urotherapist)."
          },
          {
            type: "paragraph",
            text: "If the GP assesses that there is a need, you will get a prescription for antibiotics or bladder-calming medicines. You can also be referred to a physiotherapist specializing in the pelvic floor or urotherapist."
          },
          {
            type: "paragraph",
            text: "Before the GP possibly refers to a specialist, there are some things that should be mapped and be part of the referral. Below is a list of mapping questions and the answers to these are important information to have."
          },
          {
            type: "list",
            items: [
              "Given birth? How many and any problems related to childbirth?",
              "When and in what connection did the problems start?",
              "Results for accurately kept voiding diary (drinking and urination list) for three days.",
              "What type of incontinence? Stress, urgency, dribble leakage?",
              "Feeling of incomplete emptying?",
              "Urinary tract infections, if any, how often?",
              "Pain associated with bladder filling or emptying?",
              "Problems related to intercourse?",
              "Previous treatment for urinary leakage: Conservative or surgical?",
              "Problems with fecal incontinence or constipation?",
              "Hormones or medications?"
            ]
          },
          {
            type: "link",
            linkContext: "When investigating urinary leakage in patients with multiple sclerosis (MS), this",
            linkText: "guide",
            linkUrl: "https://msveileder.no/artikkel/88/vannlatingsforstyrrelser",
            text: ", prepared by the National Competence Service for Multiple Sclerosis, can be useful for both patients and healthcare personnel."
          }
        ]
      },
      {
        id: "specialist-section",
        title: "What does the SPECIALIST do?",
        content: [
          {
            type: "paragraph",
            text: "The referral is assessed by a specialist. The specialist assesses which further examinations are necessary so that they are done when you come for consultation. After consultation, you will most often be offered so-called conservative treatment. Sometimes there is a need for more investigation which can show that there is a need for surgical procedures."
          },
          {
            type: "link",
            linkContext: "All patients must fill out a diary",
            linkText: "example",
            linkUrl: "https://nekib.helsekompetanse.no/wp-content/uploads/2022/01/vanlatingsbok.pdf",
            text: "to bring to the consultation. In addition, various scoring forms are used which are important to fill out. These forms are sent to you in advance of the appointment."
          },
          {
            type: "paragraph",
            text: "For further investigation, there are various examinations that may be relevant:"
          },
          {
            type: "list",
            items: [
              "Flowmetry: You empty the bladder on a flowmeter (specially designed toilet) which registers the pressure on the stream and how long it takes to empty the bladder.",
              "Measurement of residual urine: Residual urine in the bladder is measured by scanning the outside of the abdomen with an ultrasound device, or inserting a urinary catheter and seeing how much is left in the bladder after urination.",
              "Urine sample: Urine sample is taken mainly to rule out urinary tract infection.",
              "Review of voiding diary (drinking and urination list): The healthcare provider reviews the diary together with the patient to assess the extent of the leakage problems.",
              "Stress test: You put on a diaper, and the bladder is filled with 300 ml of water. Then you should cough and jump to see how large the leakage from the bladder is under pressure from the abdomen.",
              "Urodynamic investigation: During urodynamic examination, the bladder's contents and pressure are measured, as well as the feeling of filling. A thin catheter (plastic tube) is inserted into the bladder. In addition, a catheter is inserted into the rectum. Then saline is slowly filled into the bladder. The various measurements are taken through these catheters with a special device."
            ]
          },
          {
            type: "paragraph",
            text: "After this investigation, the specialist reassesses whether there is a need for further conservative treatment or whether the next step in treatment is a procedure."
          }
        ]
      }
    ]
  }
};

export const Diagnosis = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const { pageTitle, intro, sections } = DIAGNOSIS_DATA[language]

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <img
              src="/solae.png"
              alt="Diagnosis"
              width="24"
              height="24"
            />
          </div>
          <h2 className={styles.sectionTitle}>{pageTitle}</h2>
        </div>

        <div className={styles.sectionContent}>
          {/* Intro Section with Image */}
          <div className={styles.normalFunctionSection}>
            <div className={styles.diagnosisIntroLayout}>
              <div className={styles.diagnosisIntroText}>
                <p className={styles.enhancedParagraph}>{intro.lead}</p>
                
                <h4 className={styles.normalFunctionTitle}>{intro.questions}</h4>
                <ul className={styles.bulletList}>
                  {intro.questionList.map((question) => (
                    <li key={question.substring(0, 30)} className={styles.enhancedParagraph}>
                      {question}
                    </li>
                  ))}
                </ul>
                
                <p className={styles.enhancedParagraph}>{intro.process}</p>
              </div>
              
              <div className={styles.diagnosisIntroImage}>
                <div className={styles.diagnosisImageContainer}>
                  <img 
                    src="https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/shutterstock_mann159831206.jpg" 
                    alt="Utredning illustrasjon" 
                    className={styles.diagnosisImage}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sections as Accordions */}
          {sections.map((section) => (
            <SectionAccordion 
              key={section.id}
              title={section.title} 
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              {section.content.map((item) => {
                if (item.type === "paragraph") {
                  return (
                    <p key={item.text?.substring(0, 50)} className={styles.enhancedParagraph}>
                      {item.text}
                    </p>
                  );
                }
                
                if (item.type === "list") {
                  return (
                    <ul key={item.items?.[0]?.substring(0, 40)} className={styles.bulletList}>
                      {item.items?.map((listItem) => (
                        <li key={listItem.substring(0, 40)} className={styles.enhancedParagraph}>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                }
                
                if (item.type === "link") {
                  return (
                    <p key={item.linkText} className={styles.enhancedParagraph}>
                      {item.linkContext} (<a 
                        href={item.linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.resourceLink}
                      >
                        {item.linkText}
                      </a>){item.text}
                    </p>
                  );
                }
                
                return null;
              })}
            </SectionAccordion>
          ))}
        </div>
      </div>
    </>
  )
}