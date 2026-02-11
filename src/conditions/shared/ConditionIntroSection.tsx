import { useLanguage } from "../../context/LanguageContext"
import { useTheme } from "../../context/ThemeContext"
import styles from "./condition-intro-section.module.css"

interface ConditionIntroSectionProps {
  conditionId: string
}

const CONDITION_INTRO_DATA = {
  "urinary-incontinence": {
    no: {
      title: "Kort om urinlekkasje",
      description: "Urinlekkasje er en vanlig tilstand som påvirker mange mennesker. Denne siden hjelper deg å forstå årsakene, symptomene og behandlingsalternativene. Du kan lære om normalfunksjoner, symptomer, årsaker, utredning, behandling og øvelser som kan hjelpe deg."
    },
    en: {
      title: "About urinary incontinence",
      description: "Urinary incontinence is a common condition that affects many people. This page helps you understand the causes, symptoms, and treatment options. You can learn about normal functions, symptoms, causes, diagnosis, treatment, and exercises that can help you."
    }
  },
  "urinary-retention": {
    no: {
      title: "Tømmingsproblemer for urin",
      description: "På disse sidene finner du informasjon om tømmingsproblemer for urin, urinretensjon. Her er informasjon om normal funksjon av vannlatingen, symptomer på tømmingsproblemer, utredning og behandling av slike plager. Kanskje har du slike problemer selv, eller du kjenner noen som er rammet."
    },
    en: {
      title: "Urinary Emptying Problems",
      description: "On these pages you will find information about urinary emptying problems, urinary retention. Here is information about normal urination function, symptoms of emptying problems, examination and treatment of such complaints. Perhaps you have such problems yourself, or you know someone who is affected."
    }
  },
  "fecal-incontinence": {
    no: {
      title: "Avføringslekkasje",
      description: "På disse sidene finner du informasjon om avføringslekkasje, også kalt fekal eller anal inkontinens. Her er beskrivelse av normalfunksjon til tarmen, symptomer på avføringslekkasje, utredning og behandling av slike plager. Kanskje har du slike problemer selv, eller du kjenner noen som er rammet av disse symptomene."
    },
    en: {
      title: "Fecal Incontinence",
      description: "On these pages you will find information about fecal incontinence, also called fecal or anal incontinence. Here is a description of the normal function of the bowel, symptoms of fecal incontinence, examination and treatment of such complaints. Perhaps you have such problems yourself, or you know someone who is affected by these symptoms."
    }
  },
  "constipation": {
    no: {
      title: "Tømmingsproblemer og forstoppelse for avføring",
      description: "På disse sidene finner du informasjon om tømmingsproblemer for avføring og forstoppelse. Her er informasjon om symptomer på, utredning og behandling av slike plager. Kanskje har du slike problemer selv, eller du kjenner noen som er rammet."
    },
    en: {
      title: "Bowel Emptying Problems and Constipation",
      description: "On these pages you will find information about bowel emptying problems and constipation. Here is information about symptoms, examination and treatment of such complaints. Perhaps you have such problems yourself, or you know someone who is affected."
    }
  },
  "pelvic-pain": {
    no: {
      title: "Langvarige underlivssmerter",
      description: "Langvarige underlivssmerter, er en vanlig tilstand som rammer både kvinner og menn. Tilstanden gir mange ulike plager i daglige aktiviteter, som for eksempel problemer med tømning av tarm/blære, smerter ved seksuell aktivitet eller ved det å sitte. Langvarige underlivssmerter er ofte lokalisert i nedre del av mage, i underlivet og i organer knyttet til underliv/bekken."
    },
    en: {
      title: "Chronic Pelvic Pain",
      description: "Chronic pelvic pain is a common condition that affects both women and men. The condition causes many different problems in daily activities, such as problems with bowel/bladder emptying, pain during sexual activity or when sitting. Chronic pelvic pain is often located in the lower abdomen, in the pelvis and in organs related to the pelvis."
    }
  },
  "pregnancy": {
    no: {
      title: "Plager under graviditet og etter fødsel",
      description: "Under graviditet og fødsel skjer det endringer i bekkenbunnen som kan påvirke naturlige funksjoner som vannlatning, avføring og seksualfunksjon. De fleste endringene er vanlige og vil normalisere seg selv. Noen endringer kan oppleves plagsomme og trenger en mer aktiv tilnærming, enten igjennom tiltak du kan gjøre selv eller gjennom oppfølging av helsevesenet. Dersom plagene går ut over daglige gjøremål og livskvalitet bør du søke hjelp."
    },
    en: {
      title: "Pregnancy and Postpartum Problems",
      description: "During pregnancy and childbirth, changes occur in the pelvic floor that can affect natural functions such as urination, bowel movements and sexual function. Most changes are normal and will normalize themselves. Some changes can be bothersome and require a more active approach, either through measures you can do yourself or through follow-up by the health service. If the complaints affect daily activities and quality of life, you should seek help."
    }
  }
} as const

export const ConditionIntroSection = ({ conditionId }: ConditionIntroSectionProps) => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  
  const data = CONDITION_INTRO_DATA[conditionId as keyof typeof CONDITION_INTRO_DATA]?.[language as keyof typeof CONDITION_INTRO_DATA[keyof typeof CONDITION_INTRO_DATA]]
  
  if (!data) {
    return null
  }

  return (
    <div className={`${styles.conditionIntroSection} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.conditionIntroContent}>
        <h2 className={styles.conditionIntroTitle}>{data.title}</h2>
        <p className={styles.conditionIntroDescription}>{data.description}</p>
      </div>
    </div>
  )
}
