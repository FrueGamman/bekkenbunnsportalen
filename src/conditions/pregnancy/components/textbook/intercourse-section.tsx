"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import { Heart } from 'lucide-react'
import styles from "../section-content.module.css"

const intercourseData = {
  no: {
    title: "Samleie",
    sections: [
      {
        title: "Samleie i svangerskapet",
        content: [
          "Under graviditeten kan man ha samleie så ofte man vil om svangerskapet forløper normalt. Dersom tidligere gjennomgått for tidlig fødsel eller ved vaginale blødninger i graviditeten, bør lege konfereres.",
          "De første tre månedene av graviditeten skjer det store hormonforandringer og mange føler seg trett, kvalm og uopplagt. Dette kan føre til mindre lyst og behov for sex. I andre trimester øker blodvolumet i kroppen. Slimhinnene hovner opp, brystene øker på størrelse, den verste kvalmen kan ha gitt seg og lysten på sex kan øke hos noen. ",
          "De opphovnede slimhinnene blør lettere enn normalt og kan gi småblødninger under samleie. Spor av blod er ikke farlig og det skal ikke være smerter forbundet med blødningen. Om du har sex og får orgasme trekker livmoren seg sammen og kan bli veldig hard. Denne sammentrekningen er den samme som skjer om du har kynnere. Sammentrekningen påvirker normalt ikke livmortappen og det er derfor ikke farlig. Skulle blødning eller sammentrekning derimot ikke gå over, men vedvare og øke på, må lege eller jordmor kontaktes for vurdering.",
          "Mot slutten av svangerskapet kan mange føle seg tung i kroppen. Magen tar mye plass og fokuset kan være mot den forestående fødselen og forberedelsen av denne og det kommende barnet. Hos mange kan dermed den seksuelle lysten og interessen avta i denne fasen. Andre kan oppleve det motsatte, nemlig at lysten på sex øker. Dette er veldig individuelt og det er viktig å huske på at man har ulike ønsker og behov. Det kan være fint og nyttig å prate med partneren sin om dette. Husk at sex er mye mer enn samleie. Nærhet, kos og intimitet kan være nyttige stikkord. "
        ]
      },
      {
        title: "Samleie etter fødsel",
        content: [
          "Det finnes ikke noe eksakt svar på når man kan gjenoppta samleie etter fødsel. En generell anbefaling er å vente med samleie til det er gått seks uker. I løpet av disse seks ukene er såret etter morkaken grodd og renselsen har stoppet. Renselsen er blødning fra sårflaten hvor morkaken var festet inne i livmoren. Etter disse ukene er livmoren sammentrukket og tilnærmet som før. Muskelvev, nerver i bekkenet og eventuelle sydde rifter trenger også tid til å hele. Dersom en føler seg klar for, og ønsker å ha samleie før disse ukene er gått, er det også greit. Det er da viktig å vite at det er infeksjonsfare før renselsen er over. Infeksjonsfaren kan forebygges ved bruk av kondom.",
          "Mange har behov for å avvente med samleie den første tiden. En del opplever ubehag og endret sensibilitet fra underlivet en tid etter fødselen. I perioden når barnet er nyfødt er fokuset naturlig nok mye på barnet. Nattesøvnen er ofte oppstykket og det kan være mindre overskudd til seksuell aktivitet. For en del kvinner oppleves kontakten og nærheten til barnet “tilstrekkelig” og hun kan dermed ha mindre behov for nærhet med sin partner i denne fasen. Samtidig er det også vanlig å kjenne på økt samhold til partner hvor sex kan gi økt overskudd. Igjen er det gunstig å ha åpen dialog med partner om dette.",
          "Underlivet kan oppleves annerledes etter graviditet og fødsel. Dette er normale endringer. Det er ikke uvanlig å føle seg mer romslig nedentil. Under amming blir østrogenproduksjonen lav noe som påvirker slimhinnene. Skjeden kan dermed oppfattes som tørr og det kan gi smerter ved samleie. Det kan være en god ide å bruke glidemiddel. Stabilisering av hormonene etter endt amming og aktiv bekkenbunnstrening vil etter hvert gjøre at underlivet kjennes mer normalt. ",
          "Langvarige, vedvarende eller tilbakevendende smerter ved samleie er ikke normalt. Det kan være ulike tilstander som forårsaker slike smerter. Fastlege bør oppsøkes for vurdering og videre henvisning da dette ofte krever individuell utredning og behandling."
        ]
      },
      {
        title: "Vaginal vind",
        content: [
          "Vaginal vind kalt garrulitas er ufrivillig passasje av luft gjennom skjedeåpningen. Dette oppstår ved for eksempel samleie og seksuell aktivitet eller stillingsendringer. Undersøkelser tyder på at det er en relativ vanlig plage hos kvinner. Vaginale fødsler og urininkontinens kan disponere for tilstanden, men mekanismen er ikke sikkert fastslått. Aktuelle behandlingsmetoder er bekkenbunnstrening, silikonpessar og bruk av tampong. I spesielle tilfeller kan kirurgisk behandling være et alternativ."
        ]
      }
    ]
  },
  en: {
    title: "Intercourse",
    sections: [
      {
        title: "Intercourse During Pregnancy",
        content: [
          "During pregnancy, you can have intercourse as often as you want if the pregnancy is progressing normally. If you have previously had premature birth or vaginal bleeding during pregnancy, a doctor should be consulted.",
          "During the first three months of pregnancy, there are major hormonal changes and many feel tired, nauseous and unwell. This can lead to less desire and need for sex."
        ]
      },
      {
        title: "Intercourse After Birth",
        content: [
          "There is no exact answer as to when you can resume intercourse after childbirth. A general recommendation is to wait with intercourse until six weeks have passed.",
          "Many need to wait with intercourse for the first period. Some experience discomfort and altered sensitivity from the pelvic area for a time after birth."
        ]
      },
      {
        title: "Vaginal Wind",
        content: [
          "Vaginal wind called garrulitas is involuntary passage of air through the vaginal opening. This occurs during for example intercourse and sexual activity or position changes."
        ]
      }
    ]
  }
} as const

export const IntercourseSection = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = intercourseData[language]

  return (
    <>
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

