"use client"

import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

const TEXTBOOK_SECTIONS = {
  no: [
    {
      id: "bekkenbunnen",
      title: "Bekkenbunnen",
      content: [
        "Bekkenbunnen er en muskelplate i bunnen av bekkenet som har mange viktige funksjoner. Den består av flere lag med muskler og bindevev som strekker seg fra skambenet foran til halebeinet bak, og mellom sitteknoklene på sidene.",
        "Musklene har både frivillig og ufrivillig kontroll. Den frivillige delen kan du styre selv, mens den ufrivillige delen arbeider automatisk.",
        "Bekkenbunnen støtter opp underlivsorganene (blære, livmor og endetarm) og bidrar til lukking av urinrør og endetarmsåpning.",
        "Under graviditet og fødsel utsettes bekkenbunnen for stor belastning på grunn av vekten fra barnet og livmoren."
      ]
    },
    {
      id: "underlivet-graviditet",
      title: "Underlivet i graviditeten", 
      content: [
        "Under graviditeten skjer det mange endringer i underlivet som kan påvirke normale funksjoner.",
        "Hormonelle endringer gjør vevet mer elastisk for å forberede seg til fødsel.",
        "Vekten fra det voksende barnet og livmoren legger press på bekkenbunnen og andre strukturer.",
        "Disse endringene kan føre til ulike plager som urinlekkasje, forstoppelse og ubehag."
      ]
    },
    {
      id: "forlosningsmetode",
      title: "Forløsningsmetode",
      content: [
        "Måten barnet fødes på kan påvirke bekkenbunnen og risikoen for senere plager.",
        "Vaginal fødsel innebærer at bekkenbunnen må strekke seg betydelig.",
        "Keisersnitt unngår belastning på bekkenbunnen under fødsel, men graviditeten i seg selv påvirker musklene.",
        "Lang utdrivningstid, store barn og bruk av tang/sugekopp kan øke risikoen for skader."
      ]
    },
    {
      id: "fodselsrifter",
      title: "Fødselsrifter",
      content: [
        "Fødselsrifter er vanlige og kan påvirke bekkenbunnens funksjon.",
        "Rifter klassifiseres i ulike grader avhengig av hvor dype de er.",
        "Mindre rifter heler vanligvis godt av seg selv.",
        "Større rifter som involverer lukkemusklene krever spesiell oppfølging og behandling."
      ]
    },
    {
      id: "underlivsframfall",
      title: "Underlivsframfall / prolaps",
      content: [
        "Prolaps oppstår når bekkenbunnen ikke lenger gir tilstrekkelig støtte til underlivsorganene.",
        "Dette kan føre til at blære, livmor eller endetarm synker ned i skjeden.",
        "Symptomer kan være tyngdefølelse, problemer med å tømme blære eller tarm, og synlige utbulinger.",
        "Behandling kan være bekkenbunnstrening, pessarbruk eller kirurgi avhengig av alvorlighetsgrad."
      ]
    },
    {
      id: "blasefunksjon",
      title: "Blærefunksjon",
      content: [
        "Blæren lagrer urin og tømmes når vi bestemmer det.",
        "Under graviditet kan blærefunksjonen påvirkes av hormonelle endringer og press fra livmoren.",
        "Vanlige problemer er hyppig vannlating, urinlekkasje og følelse av ufullstendig tømming.",
        "Bekkenbunnstrening og riktige toalettvaner kan hjelpe med mange blæreproblemer."
      ]
    },
    {
      id: "tarmfunksjon",
      title: "Tarmfunksjon",
      content: [
        "Normal tarmfunksjon innebærer regelmessig og kontrollert avføring.",
        "Graviditet kan påvirke tarmfunksjonen gjennom hormonelle endringer og fysisk press.",
        "Vanlige problemer er forstoppelse, hemoroider og problemer med å kontrollere luft eller avføring.",
        "Riktig kosthold, væskeinntak og bekkenbunnstrening kan bedre tarmfunksjonen."
      ]
    },
    {
      id: "samleie",
      title: "Samleie",
      content: [
        "Endringer i underlivet kan påvirke seksualfunksjonen under graviditet og etter fødsel.",
        "Vanlige problemer er smerter ved inntrengning, tørre slimhinner og redusert følelse.",
        "Mange problemer er midlertidige og bedrer seg med tid.",
        "Det er viktig å kommunisere med partner og søke hjelp hvis problemene vedvarer."
      ]
    },
    {
      id: "kvinnelig-omskjering",
      title: "Kvinnelig omskjæring",
      content: [
        "Kvinnelig omskjæring kan påvirke graviditet, fødsel og etterfølgende plager.",
        "Det kan være nødvendig med spesiell oppfølging under graviditet og fødsel.",
        "Komplikasjoner kan inkludere problemer med vannlating, menstruasjon og samleie.",
        "Spesialisert helsehjelp er tilgjengelig for kvinner som har vært utsatt for omskjæring."
      ]
    },
    {
      id: "sok-hjelp",
      title: "Søk hjelp",
      content: [
        "Det er viktig å søke hjelp hvis plager påvirker dagliglivet eller livskvaliteten.",
        "Start med å kontakte fastlege eller jordmor for veiledning.",
        "Finn en spesialisert bekkenbunnsfysioterapeut på: https://fysio.no/kvinnehelse",
        "Mange problemer kan behandles effektivt hvis de oppdages tidlig.",
        "Ikke vær redd for å snakke om underlivsplager - det er vanlige problemer som helsepersonell er vant til å håndtere."
      ]
    }
  ],
  en: [
    {
      id: "bekkenbunnen",
      title: "Pelvic Floor",
      content: [
        "The pelvic floor is a muscle plate at the bottom of the pelvis that has many important functions. It consists of several layers of muscles and connective tissue that stretch from the pubic bone in front to the tailbone behind, and between the sitting bones on the sides.",
        "The muscles have both voluntary and involuntary control. The voluntary part you can control yourself, while the involuntary part works automatically.",
        "The pelvic floor supports the pelvic organs (bladder, uterus and rectum) and contributes to closing the urethra and anal opening.",
        "During pregnancy and childbirth, the pelvic floor is subjected to great stress due to the weight of the baby and uterus."
      ]
    },
    {
      id: "underlivet-graviditet",
      title: "Pelvic Area During Pregnancy",
      content: [
        "During pregnancy, many changes occur in the pelvic area that can affect normal functions.",
        "Hormonal changes make the tissue more elastic to prepare for childbirth.",
        "The weight from the growing baby and uterus puts pressure on the pelvic floor and other structures.",
        "These changes can lead to various problems such as urinary incontinence, constipation and discomfort."
      ]
    },
    {
      id: "forlosningsmetode",
      title: "Delivery Method",
      content: [
        "The way the baby is born can affect the pelvic floor and the risk of later problems.",
        "Vaginal delivery involves the pelvic floor having to stretch considerably.",
        "Cesarean section avoids stress on the pelvic floor during delivery, but pregnancy itself affects the muscles.",
        "Long delivery time, large babies and use of forceps/vacuum can increase the risk of injury."
      ]
    },
    {
      id: "fodselsrifter",
      title: "Perineal Tears",
      content: [
        "Perineal tears are common and can affect pelvic floor function.",
        "Tears are classified into different degrees depending on how deep they are.",
        "Minor tears usually heal well on their own.",
        "Larger tears involving the sphincter muscles require special follow-up and treatment."
      ]
    },
    {
      id: "underlivsframfall",
      title: "Pelvic Organ Prolapse",
      content: [
        "Prolapse occurs when the pelvic floor no longer provides adequate support for the pelvic organs.",
        "This can cause the bladder, uterus or rectum to descend into the vagina.",
        "Symptoms can be heaviness, problems emptying bladder or bowel, and visible bulges.",
        "Treatment can be pelvic floor training, pessary use or surgery depending on severity."
      ]
    },
    {
      id: "blasefunksjon",
      title: "Bladder Function",
      content: [
        "The bladder stores urine and is emptied when we decide.",
        "During pregnancy, bladder function can be affected by hormonal changes and pressure from the uterus.",
        "Common problems are frequent urination, urinary incontinence and feeling of incomplete emptying.",
        "Pelvic floor training and proper toilet habits can help with many bladder problems."
      ]
    },
    {
      id: "tarmfunksjon",
      title: "Bowel Function",
      content: [
        "Normal bowel function involves regular and controlled bowel movements.",
        "Pregnancy can affect bowel function through hormonal changes and physical pressure.",
        "Common problems are constipation, hemorrhoids and problems controlling gas or stool.",
        "Proper diet, fluid intake and pelvic floor training can improve bowel function."
      ]
    },
    {
      id: "samleie",
      title: "Sexual Intercourse",
      content: [
        "Changes in the pelvic area can affect sexual function during pregnancy and after childbirth.",
        "Common problems are pain during penetration, dry mucous membranes and reduced sensation.",
        "Many problems are temporary and improve with time.",
        "It is important to communicate with your partner and seek help if problems persist."
      ]
    },
    {
      id: "kvinnelig-omskjering",
      title: "Female Circumcision",
      content: [
        "Female circumcision can affect pregnancy, childbirth and subsequent problems.",
        "Special follow-up during pregnancy and childbirth may be necessary.",
        "Complications can include problems with urination, menstruation and intercourse.",
        "Specialized healthcare is available for women who have been subjected to circumcision."
      ]
    },
    {
      id: "sok-hjelp",
      title: "Seek Help",
      content: [
        "It is important to seek help if problems affect daily life or quality of life.",
        "Start by contacting your GP or midwife for guidance.",
        "Find a specialized pelvic health physiotherapist at: https://fysio.no/kvinnehelse",
        "Many problems can be treated effectively if detected early.",
        "Don't be afraid to talk about pelvic floor problems - they are common problems that healthcare professionals are used to handling."
      ]
    }
  ]
} as const

interface TextbookAccordionProps {
  language: "no" | "en"
}

export const TextbookAccordion = ({ language }: TextbookAccordionProps) => {
  const { resolvedTheme } = useTheme()
  const sections = TEXTBOOK_SECTIONS[language]

  const INTRO_TEXT = {
    no: "Læreboken inneholder informasjon om normalfunksjoner, symptomer på problemer, utredning og behandling av ulike underlivsplager og funksjonsforstyrrelser. Med denne informasjonen ønsker vi å formidle kunnskap og åpenhet rundt ulike underlivsplager under graviditet og etter fødsel, slik at flere kan søke hjelp om det oppstår utfordringer. Enda finnes det tabuer rundt dette som for noen medfører lengre tid med plager og utsatt behandling på noe som faktisk kan rettes på.\n\nDe fleste endringer man opplever i underlivet er både normale og forventet. Noen av plagene og problemene vet vi det knytter seg noen spørsmål til, spesielt omkring vannlatning og avføring. Det er fint å ta dette opp med din jordmor og/eller fastlege både i svangerskapet og etter fødselen, og også ved barselavdelingen/sykehuset ved utreise.\n\nHer omtales ikke bekkenleddsmerter (bekkenløsning).",
    en: "The textbook contains information about normal functions, symptoms of problems, investigation and treatment of various pelvic floor problems and functional disorders. With this information, we want to convey knowledge and openness about various pelvic floor problems during pregnancy and after childbirth, so that more people can seek help if challenges arise."
  }

  return (
    <section 
      id="laerebok"
      className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}
    >
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/resource.png" alt="Textbook" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>
          {language === "no" ? "Lærebok" : "Textbook"}
        </h2>
      </div>

      <div className={styles.sectionContent}>
        <p className={styles.enhancedParagraph}>
          {INTRO_TEXT[language]}
        </p>

        {sections.map((section, index) => (
          <SectionAccordion
            key={section.id}
            title={section.title}
            isDarkMode={resolvedTheme === 'dark'}
            defaultOpen={index === 0} // First section open by default
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
      </div>
    </section>
  )
}
