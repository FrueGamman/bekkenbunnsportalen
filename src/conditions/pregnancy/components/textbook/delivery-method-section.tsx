"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import { Baby } from 'lucide-react'
import styles from "../section-content.module.css"

const deliveryMethodData = {
  no: {
    title: "Forløsningsmetode",
    intro: [
      "Norge er et av verdens tryggeste land å føde barn i. Vi er blant landene med lavest tall når det gjelder alvorlig skade eller dødsfall hos mor og barn i forbindelse med fødsel.",
      "Det overordnede målet i fødselsomsorgen er å unngå unødvendige inngrep i det normale fødselsforløpet, samtidig som barnet skal fødes uten sykdom og skade. I tillegg er det fokus på at mor skal ha en god fødselsopplevelse. De fleste fødsler i Norge er vaginale da denne forløsningsmetoden er forbundet med minst risiko for komplikasjoner hos både mor og barn."
    ],
    
    sections: [
      {
        title: "Instrumentell forløsning",
        content: [
          "Instrumentell vaginal fødsel er forløsning med tang eller sugekopp og utføres av en fødselslege. Slik forløsning brukes når det av ulike grunner er behov for å få barnet raskt ut, hvis fødselen tar lang tid, den fødende er utslitt eller riene svekkes. Sugekopp er hyppigst brukt og forutsetter rie-aktivitet og at den fødende er i stand til å presse, mens forløsning med tang er uavhengig av dette. Bruker man tang eller sugekopp er det ofte nødvendig å lage et lite klipp, også kalt episiotomi, i morens mellomkjøtt.",
          "Instrumentell vaginal fødsel er forbundet med økt risiko for vaginale rifter og rifter som involverer lukkemuskelen. Fødsel med tang eller sugekopp kan ende med keisersnitt."
        ]
      },
      {
        title: "Keisersnitt",
        content: [
          "Keisersnitt som forløsningsmetode gjøres på bakgrunn av medisinske eller helsemessige årsaker og er et viktig inngrep for å minske eventuell risiko. Keisersnitt kan forekomme både akutt og planlagt. Det er ulike årsaker til at det gjennomføres planlagte keisersnitt. Dette kan være forhold som tidligere operasjoner, tidligere større fødselsrifter, seteleie eller andre tilstander hos både mor og barn."
        ]
      },
      {
        title: "Plager etter fødsel",
        content: [
          "Til tross for fokus på forebygging av fødselsskader, vil noen kvinner få plager etter fødsel. Det er viktig å huske på at svangerskap også har innvirkning på bekken og bekkenbunnen, uavhengig av forløsningsmetode."
        ]
      },
      {
        title: "Frykt for å føde",
        content: [
          "Noen kvinner har av ulike årsaker frykt for å føde. Eksempler på dette kan være tidligere fødselsskader, plager eller traumer. Dersom kvinnen har ønske om keisersnitt får hun tilbud om oppfølging av lege eller jordmor. Ved utrygghet rundt forløsningsmetode er det viktig med god dialog for å få innsikt i konsekvenser både ved vaginal fødsel og keisersnitt, samt at best mulig vurdering blir gjort for kvinnen og barnet."
        ]
      }
    ]
  },
  en: {
    title: "Delivery Method",
    intro: [
      "Norway is one of the world's safest countries to give birth in. We are among the countries with the lowest figures when it comes to serious injury or death in mother and child in connection with childbirth.",
      "The overarching goal in maternity care is to avoid unnecessary interventions in the normal birth process, while the baby should be born without illness and injury. In addition, there is focus on the mother having a good birth experience. Most births in Norway are vaginal as this delivery method is associated with the least risk of complications in both mother and child."
    ],
    
    sections: [
      {
        title: "Instrumental Delivery",
        content: [
          "Instrumental vaginal delivery is delivery with forceps or vacuum cup and is performed by an obstetrician. Such delivery is used when there is a need to get the baby out quickly for various reasons, if the birth takes a long time, the woman giving birth is exhausted or the contractions weaken. Vacuum cup is most commonly used and requires contraction activity and that the woman giving birth is able to push, while delivery with forceps is independent of this. If forceps or vacuum cup are used, it is often necessary to make a small cut, also called episiotomy, in the mother's perineum.",
          "Instrumental vaginal delivery is associated with increased risk of vaginal tears and tears involving the sphincter. Delivery with forceps or vacuum cup can end with cesarean section."
        ]
      },
      {
        title: "Cesarean Section",
        content: [
          "Cesarean section as a delivery method is done on the basis of medical or health reasons and is an important intervention to reduce any risk. Cesarean section can occur both acutely and planned. There are various reasons why planned cesarean sections are performed. This can be conditions such as previous operations, previous larger birth tears, breech position or other conditions in both mother and child."
        ]
      },
      {
        title: "Problems After Birth",
        content: [
          "Despite the focus on preventing birth injuries, some women will have problems after childbirth. It is important to remember that pregnancy also has an impact on the pelvis and pelvic floor, regardless of delivery method."
        ]
      },
      {
        title: "Fear of Giving Birth",
        content: [
          "Some women have fear of giving birth for various reasons. Examples of this can be previous birth injuries, problems or trauma. If the woman wishes for a cesarean section, she is offered follow-up by a doctor or midwife. In case of insecurity about the delivery method, it is important to have a good dialogue to gain insight into the consequences of both vaginal delivery and cesarean section, and that the best possible assessment is made for the woman and the baby."
        ]
      }
    ]
  }
} as const

export const DeliveryMethodSection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = deliveryMethodData[language]

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

