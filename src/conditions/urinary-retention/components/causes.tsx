"use client";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./section-content.module.css";
import { SectionAccordion } from "../../../components/SectionAccordion";

const CAUSES_DATA = {
  no: {
    pageTitle: "Årsaker",
    patientQuote: "Når jeg tisser er strålen veldig svak og det stopper ofte opp underveis. Jeg unngår offentlige toalett hvor andre kan høre at jeg tisser.",
    patientAge: "Mann, 29 år",
    causes: [
      {
        id: "various",
        title: "Ulike årsaker",
        content: "Problemer med å tømme blæren kan skyldes ulike tilstander. For eksempel kan ulike sykdommer forstyrre nervesignalene mellom vannlatingssentrene i hjernen og blæren. Eksempler på dette kan være Multippel sklerose (MS), Parkinson, hjerneslag, skiveprolaps eller operasjoner i bekkenet. Disse tilstandene kan føre til nevrogen påvirkning slik at blæren ikke trekker seg så godt sammen ved tømming eller at lukkemuskelen i urinrøret ikke åpner seg slik den skal. Tømmingsproblemer kan også være av psykologisk art, men det er viktig å utelukke andre årsaker."
      },
      {
        id: "obstruction",
        title: "Hindret urinstrøm",
        content: "Tilstander som medfører tranghet i urinrøret som ved forstørret prostata hos menn, eller striktur (forsnevring i urinrøret etter for eksempel permanent kateter, strålebehandling, kirurgi eller fallskade) kan også føre til at urinstrømmen hindres.\n\nEnkelte medikamenter kan hos noen føre til urinretensjon. Forstoppelse i tarmen, kirurgiske inngrep eller andre endringer som for eksempel fremfall av livmor eller skjede kan også føre til avklemminger mot urinrøret og hindre tømmefunksjonen."
      },
      {
        id: "pain",
        title: "Smerter",
        content: "For noen kan ulike smertetilstander i bekkenbunnen gi vanskeligheter med å tømme blæren ved at bekkenbunnsmuskulaturen forblir anspent og ikke slapper tilstrekkelig av. Det blir dermed ikke helt 'åpnet opp' og urinpassasjen reduseres.\n\nDette kan påvirke hverdagen betydelig og krever ofte en helhetlig tilnærming til behandling.",
        hasSideBySide: true,
        sideBySideImage: {
          src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX2584429.png",
          alt: "Pain/Urine"
        }
      },
      {
        id: "weak_muscle",
        title: "Svekket blæremuskulatur",
        content: "Andre ganger er det selve muskulaturen i blæren som rett og slett ikke arbeider godt nok med å trekke seg sammen under tømmingen. Slik svekkelse av blæremuskulaturen kan ha kjent årsak, mens andre ganger er det ikke kjent hvorfor det er slik."
      },
      {
        id: "toilet_habits",
        title: "Toalettvaner",
        content: "Toalettvaner spiller også en rolle hos noen. Der hvor en over tid ikke har hatt etablert gode vaner for å tømme blæren kan det etter hvert føre til at en ikke kjenner følelsen av fylning like godt som tidligere. Blærekapasiteten blir dermed gradvis utvidet inntil den blir for stor og urinblæren evner ikke å jobbe like godt som tidligere. På samme måte er vi avhengig av å gi blæren mulighet for å tømme seg så normalt som mulig, altså at den får tid og ro til å trekke seg godt sammen når en sitter på toalettet. Dersom en ikke legger til rette for dette kan det på sikt føre til redusert tømmeevne og noe urin kan bli igjen i blæren etter tømming, såkalt resturin."
      },
      {
        id: "shy_bladder",
        title: "\"Sjenert blære\"",
        content: "Hos noen oppleves det å late vannet på offentlige toalett, som et problem. Frykt for å urinere i nærheten av andre, eller frykt for at andre skal høre noe eller komme inn på toalettet, gjør at det bare 'stopper opp'. Dette er også beskrevet som 'paruresis' eller 'sjenert blære' og kan for noen påvirke hverdagen og livskvaliteten i stor grad. Tiltanden beskrives som en fobi, hvor frykten for å late vannet fører til problemer med å urinere. Før en kan beskrive en slik tilstand må det utredes og utelukkes at det er noe fysisk galt med urinveiene. Paruresis er dermed i utgangspunktet et psykologisk problem som krever annen tilnærming i forhold til behandling, enn tilstander av fysisk årsak."
      }
    ]
  },
  en: {
    pageTitle: "Various Causes",
    patientQuote: "When I urinate, the stream is very weak and often stops along the way. I avoid public toilets where others might hear me urinating.",
    patientAge: "Man, 29 years",
    causes: [
      {
        id: "various",
        title: "Various causes",
        content: "Problems with emptying the bladder can be due to various conditions. For example, various diseases can disrupt the nerve signals between the urination centers in the brain and the bladder. Examples of this can be Multiple sclerosis (MS), Parkinson's disease, stroke, herniated disc, or pelvic surgery. These conditions can lead to neurogenic impact so that the bladder doesn't contract as well during emptying or the sphincter in the urethra doesn't open as it should. Emptying problems can also be of psychological nature, but it is important to rule out other causes."
      },
      {
        id: "obstruction",
        title: "Obstructed urine flow",
        content: "Conditions that cause narrowing in the urethra such as enlarged prostate in men, or stricture (narrowing in the urethra after for example permanent catheter, radiation therapy, surgery or fall injury) can also lead to obstructed urine flow.\n\nCertain medications can in some cases lead to urinary retention. Constipation in the intestine, surgical procedures, or other changes such as prolapse of the uterus or vagina can also lead to compression against the urethra and hinder emptying function."
      },
      {
        id: "pain",
        title: "Pain",
        content: "For some, various pain conditions in the pelvic floor can cause difficulties with emptying the bladder as the pelvic floor musculature remains tense and doesn't relax sufficiently. This means it doesn't fully 'open up' and urine passage is reduced.\n\nThis can significantly affect daily life and often requires a holistic approach to treatment.",
        hasSideBySide: true,
        sideBySideImage: {
          src: "https://nekib.helsekompetanse.no/wp-content/uploads/2021/11/COLOURBOX2584429.png",
          alt: "Pain/Urine"
        }
      },
      {
        id: "weak_muscle",
        title: "Weakened bladder musculature",
        content: "Other times it's the musculature of the bladder itself that simply doesn't work well enough to contract during emptying. Such weakening of the bladder musculature can have a known cause, while other times it's not known why it's like this."
      },
      {
        id: "toilet_habits",
        title: "Toilet habits",
        content: "Toilet habits also play a role for some. Where one over time hasn't established good habits for emptying the bladder, it can eventually lead to not feeling the sensation of fullness as well as before. The bladder capacity thus gradually expands until it becomes too large and the bladder can't work as well as before. Similarly, we depend on giving the bladder the opportunity to empty as normally as possible, meaning it gets time and peace to contract well when sitting on the toilet. If one doesn't facilitate this, it can in the long run lead to reduced emptying ability and some urine may remain in the bladder after emptying, so-called residual urine."
      },
      {
        id: "shy_bladder",
        title: "\"Shy bladder\"",
        content: "For some, urinating in public toilets is experienced as a problem. Fear of urinating near others, or fear that others will hear something or come into the toilet, makes it just 'stop'. This is also described as 'paruresis' or 'shy bladder' and can for some affect daily life and quality of life significantly. The condition is described as a phobia, where the fear of urinating leads to problems with urination. Before such a condition can be diagnosed, it must be investigated and ruled out that there is something physically wrong with the urinary tract. Paruresis is thus essentially a psychological problem that requires a different approach to treatment than conditions of physical cause."
      }
    ]
  }
} as const

export const Causes = () => {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();

  const { pageTitle, patientQuote, patientAge, causes } = CAUSES_DATA[language];
  // const introduction = INTRODUCTION_DATA[language];

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/couse.png" alt="Causes" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>
          {pageTitle}
        </h2>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.highlightBox}>
          <p>
            {patientQuote}
          </p>
          <p className={styles.quoteAuthor}>
            {patientAge}
          </p>
        </div>

        {causes.map((cause, index) => (
          <SectionAccordion 
            key={index}
            title={cause.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={false}
          >
            {('hasSideBySide' in cause) && (cause as any).hasSideBySide ? (
              <div className={styles.sideBySideContainer}>
                <div className={styles.sideBySideText}>
                  <div className={styles.enhancedParagraph}>
                    {cause.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} style={{ marginBottom: index < cause.content.split('\n\n').length - 1 ? '1rem' : '0' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                <div className={styles.sideBySideImage}>
                  <img 
                    src={(cause as any).sideBySideImage.src} 
                    alt={(cause as any).sideBySideImage.alt} 
                    className={styles.sideBySideImageElement}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.enhancedParagraph}>
                {cause.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: index < cause.content.split('\n\n').length - 1 ? '1rem' : '0' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </SectionAccordion>
        ))}
      </div>
    </div>
    </>
  );
};