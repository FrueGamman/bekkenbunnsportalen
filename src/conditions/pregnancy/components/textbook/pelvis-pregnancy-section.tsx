"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"

const pelvisPregnancyData = {
  no: {
    title: "Underlivet i graviditeten",
    intro: "Under graviditeten går kroppen igjennom en rekke endringer. Hormoner påvirker både ledd, sener, muskulatur, blodårer og slimhinner. Hormoner samt økt vekt/trykk fra det voksende barnet kan også påvirke bekkenbunnsfunksjonene og føre til symptomer fra skjede, blære og tarm. De fleste opplever ikke store plager fra disse endringene, mens noen opplever større plager. Det finnes en del tiltak man kan igangsette selv avhengig av symptom. Dersom disse ikke fører frem kan det være nyttig og snakke med jordmor/egen lege.",
    
    sections: [
      {
        title: "Slimhinnene i graviditeten",
        content: [
          "I graviditeten øker blodmengden i kroppen med 40-50 prosent. Dette gjør blant annet at slimhinnene blir mere hovne og væskefylte. Noen opplever å bli tett i nesen og at tannkjøttet blør lettere. Det er hevelsen som skaper disse plagene. Også slimhinnene i underlivet blir mere blodfylte og hovne.",
          "Normalt sett skal det ikke forekomme blødning fra underlivet under graviditeten. Dersom blødning, er hovedregelen å kontakte jordmor eller lege. Ved samleie kan derimot små blødninger forekomme som følge av hevelsen i slimhinnene. Det kan da avventes noe med å oppsøke helsehjelp dersom man kjenner godt med bevegelse fra barnet. Ved mindre bevegelse, vedvarende blødning eller smerter i magen må det tas kontakt med jordmor eller lege for råd."
        ]
      },
      {
        title: "Utflod",
        content: [
          "På grunn av hormonelle forandringer under graviditeten blir veggene i vagina tykkere, mer blodrike og det er vanlig med utflod. Den normale utfloden er gjerne tykk, blank, hvitaktig og lett gul. Den lukter ikke noe spesielt og medfører hverken kløe eller svie. Utfloden fra skjeden er mindre sur under graviditet noe som disponerer for sopp, men som beskytter mot andre infeksjoner. Opplever man kløe, svie eller klumpete utflod som lukter vondt kan dette være sopp. Dette kan behandles med en kortvarig soppkur. Kuren kjøpes reseptfritt på apotek. Hvis plagene vedvarer, bør lege kontaktes"
        ]
      },
      {
        title: "Nedpress",
        content: [
          "Bekkenbunnen støtter organer i underlivet. Etter hvert som barnet vokser og livmoren utvider seg kan man kjenne på en tyngdefornemmelse ned mot bekkenbunnen. Noen, spesielt flergangsfødende, kan oppleve at noe buler ut nedentil. Det kan være blæren, endetarmen eller livmoren som presses ned. Ledsagende symptomer kan være manglende kontroll for urin, avføring og luft. Dette er ikke farlig, men kan oppleves ubehagelig. Tilstanden normaliserer seg som regel etter fødsel. Tiltak som bekkenbunnstrening kan hjelpe. God styrke i bekkenbunnsmuskulaturen kan for noen gi mindre nedtrykks- og tyngdefølelse i underlivet."
        ],
        link: {
          text: "bekkenbunnstrening",
          url: "/conditions/pregnancy?section=textbook#pelvic-floor"
        }
      }
    ]
  },
  en: {
    title: "The Pelvis During Pregnancy",
    intro: "During pregnancy, the body goes through a number of changes. Hormones affect joints, tendons, muscles, blood vessels and mucous membranes. Hormones as well as increased weight/pressure from the growing baby can also affect pelvic floor functions and lead to symptoms from the vagina, bladder and bowel. Most people do not experience major problems from these changes, while some experience greater problems. There are a number of measures you can initiate yourself depending on symptoms. If these do not work, it may be useful to talk to a midwife/your doctor.",
    
    sections: [
      {
        title: "Mucous Membranes During Pregnancy",
        content: [
          "During pregnancy, the blood volume in the body increases by 40-50 percent. This causes, among other things, the mucous membranes to become more swollen and fluid-filled. Some experience becoming congested in the nose and that the gums bleed more easily. It is the swelling that creates these problems. The mucous membranes in the pelvic area also become more blood-filled and swollen.",
          "Normally, there should be no bleeding from the pelvic area during pregnancy. If bleeding occurs, the main rule is to contact a midwife or doctor. During intercourse, however, minor bleeding may occur as a result of the swelling in the mucous membranes. It can then be waited with seeking medical help if you feel good movement from the baby. With less movement, persistent bleeding or pain in the abdomen, a midwife or doctor must be contacted for advice."
        ]
      },
      {
        title: "Vaginal Discharge",
        content: [
          "Due to hormonal changes during pregnancy, the walls of the vagina become thicker, more blood-rich and discharge is common. Normal discharge is usually thick, glossy, whitish and slightly yellow. It does not smell particularly and does not cause itching or burning. Discharge from the vagina is less acidic during pregnancy, which predisposes to yeast infections, but protects against other infections. If you experience itching, burning or lumpy discharge that smells bad, this may be a yeast infection. This can be treated with a short-term yeast infection treatment. The treatment is purchased over-the-counter at a pharmacy. If problems persist, a doctor should be contacted."
        ]
      },
      {
        title: "Pelvic Pressure",
        content: [
          "The pelvic floor supports organs in the pelvic area. As the baby grows and the uterus expands, you may feel a sensation of heaviness towards the pelvic floor. Some, especially multiparous women, may experience something bulging out below. It may be the bladder, rectum or uterus that is pressed down. Associated symptoms can be lack of control over urine, stool and gas. This is not dangerous, but can be experienced as uncomfortable. The condition usually normalizes after birth. Measures such as pelvic floor training can help. Good strength in the pelvic floor muscles can for some provide less pressure and feeling of heaviness in the pelvic area."
        ],
        link: {
          text: "pelvic floor training",
          url: "/conditions/pregnancy?section=textbook#pelvic-floor"
        }
      }
    ]
  }
} as const

export const PelvisPregnancySection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = pelvisPregnancyData[language]

  return (
    <>
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>{data.intro}</p>
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
              {section.content.map((paragraph, pIndex) => {
                // Check if this paragraph should have a link
                const sectionAny = section as any;
                const hasLink = sectionAny.link && pIndex === section.content.length - 1 && paragraph.includes(sectionAny.link.text)
                
                if (hasLink && sectionAny.link) {
                  const parts = paragraph.split(sectionAny.link.text)
                  return (
                    <p key={pIndex} className={styles.enhancedParagraph}>
                      {parts[0]}
                      <a 
                        href={sectionAny.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.inlineLink}
                      >
                        {sectionAny.link.text}
                      </a>
                      {parts[1]}
                    </p>
                  )
                }
                
                return (
                  <p key={pIndex} className={styles.enhancedParagraph}>
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </SectionAccordion>
        ))}
    </>
  )
}

