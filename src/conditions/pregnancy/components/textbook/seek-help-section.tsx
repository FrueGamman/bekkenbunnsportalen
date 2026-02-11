"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"

const seekHelpData = {
  no: {
    title: "Søk hjelp",
    sections: [
      {
        title: "I graviditeten",
        content: "Alle gravide har rett til svangerskapskontroll. Dette er et gratis tilbud som skal gi råd og veiledning slik at den gravide og barnet har det best mulig i svangerskapet. Denne oppfølgingen skjer hos jordmor og/eller fastlege. Svangerskapsrelaterte forandringer som oppleves som en plage kan man i mange tilfeller avhjelpe med konservative tiltak. Er plagene omfattende må jordmor/fastlege vurdere videre henvisning til annen spesialitet. "
      },
      {
        title: "Seks ukers kontroll hos fastlege",
        content: "Kvinnen anbefales å bestille seg time hos sin fastlege for kontroll seks uker etter fødsel. På denne kontrollen gjøres blant annet gynekologisk undersøkelse. Har man problemer i form av lekkasje, forstoppelse, smerter eller andre plager er det fint å ta dette opp med legen allerede da."
      },
      {
        title: "Ved plager",
        content:[
          "Ulike plager kan forekomme etter fødsel og er nærmere beskrevet i kapitlene i læreboken. Det finnes flere ulike råd til selvhjelp som kan føre til bedring. Slik konservativ behandling kan startes og utføres på egen hånd.",
          "Dersom man ikke opplever ønsket effekt, bør man oppsøke hjelp. I noen tilfeller vil det være behov for veiledning og optimalisering av konservative tiltak. Andre ganger er det nødvendig med videre henvisning til spesialist for systematisk utredning og annen behandling.",
          "Det er individuelle forskjeller på opplevelse av plager. Dersom plagene går ut over daglige gjøremål eller livskvalitet, bør man oppsøke hjelp. Ulike instanser kan være fastlege, helsesykepleier og fysioterapeut. Noen opplever dessverre avvisning og får ikke den hjelpen de har behov for. Det kan da være annet helsepersonell med spesialisering på fagområdet, som kan hjelpe. Henvisning til spesialist i sykehus som for eksempel gynekolog, gastrokirurg og urolog, må skje via fastlege."
        ],
        link: {
          text: "Finn fysioterapeut i ditt område",
          url: "https://fysio.no/kvinnehelse"
        }
      }
    ]
  },
  en: {
    title: "Seek Help",
    sections: [
      {
        title: "During Pregnancy",
        content: "All pregnant women have the right to antenatal care. This is a free service that should provide advice and guidance so that the pregnant woman and the baby are as well as possible during pregnancy. This follow-up takes place with a midwife and/or GP."
      },
      {
        title: "Six Week Check-up with GP",
        content: "Women are recommended to book an appointment with their GP for a check-up six weeks after birth. At this check-up, among other things, a gynecological examination is performed. If you have problems in the form of leakage, constipation, pain or other complaints, it is good to bring this up with the doctor already then."
      },
      {
        title: "For Complaints",
        content: "Various complaints can occur after childbirth and are described in more detail in the chapters in the textbook. There are several different self-help tips that can lead to improvement. If you do not experience the desired effect, you should seek help. You can find a physiotherapist in your area through the physiotherapist directory.",
        link: {
          text: "Find physiotherapist in your area",
          url: "https://fysio.no/kvinnehelse"
        }
      }
    ]
  }
} as const

export const SeekHelpSection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = seekHelpData[language]

  return (
    <div id="seek-help">
        {data.sections.map((section, index) => (
          <SectionAccordion
            key={index}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            <div className={styles.normalFunctionContent}>
              {Array.isArray(section.content) ? (
                <>
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className={styles.enhancedParagraph}>{paragraph}</p>
                  ))}
                  {'link' in section && section.link && (
                    <p className={styles.enhancedParagraph}>
                      <a 
                        href={section.link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.resourceLink}
                      >
                        {section.link.text}
                      </a>
                    </p>
                  )}
                </>
              ) : (
                <p className={styles.enhancedParagraph}>{section.content}</p>
              )}
            </div>
          </SectionAccordion>
        ))}
    </div>
  )
}

