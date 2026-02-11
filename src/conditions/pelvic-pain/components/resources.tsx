"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"

// Language-specific data arrays
const resourcesData = {
  no: {
    pageTitle: "Ressurser",
    intro: "Her finner du lenker til relevante nettsider som kan gi deg mer informasjon om kroniske bekkenbunnsmerter og hjelpe deg å komme i kontakt med andre som har de samme problemene.",
    mobileNote: "Snu mobilen på siden for å se hele tabellen.",
    resources: [
      {
        name: "Nasjonalt senter for Bekkenbunnshelse (NBH)",
        description: "",
        links: [
          { text: "Hjemmeside", url: "https://www.unn.no/nbh" },
          { text: "Facebook", url: "https://www.facebook.com/nbh.unn/" }
        ]
      },
      {
        name: "Norsk Fysioterapeutforbund",
        description: "Oversikt over fysioterapeuter med spesialkompetanse innen vulvalidelser, kroniske underlivs- og bekkensmerte.",
        links: [
          { text: "Oversikt behandlere", url: "https://fysio.no/Forbundsforsiden/Organisasjon/Faggrupper/Kvinnehelse/Spesialister-og-behandlere-i-kvinnehelse/Vulvalidelser-Kronisk-underlivs-og-bekkensmerte" }
        ]
      },
      {
        name: "Vulva.no",
        description: "Nyttig informasjon om sykdommer og plager i vulva. Siden er laget av autorisert helsepersonell.",
        links: [
          { text: "Vulva.no", url: "https://vulva.no/" }
        ]
      },
      {
        name: "Smertenettverk.no",
        description: "Et samarbeidsprosjekt mellom de fire universitetssykehusene på oppdrag fra Helse- og omsorgsdepartementet.",
        links: [
          { text: "Hjemmeside", url: "https://www.smertenettverk.no/" }
        ]
      },
      {
        name: "Pudendal Neuropathy",
        description: "",
        links: [
          { text: "International Pelvic Pain Society", url: "https://www.pelvicpain.org/" },
          { text: "Health Organization for Pudendal Education", url: "http://www.pudendalhope.info/" }
        ]
      },
      {
        name: "Quintet",
        description: "Quintet tilbyr ulike produkter innen behandlingshjelpemidler for inkontinens, bekkenbunnstrening, generell smertelindring, muskelrehabilitering og seksuell helse. De har også en oversikt over fysioterapeuter i landet med kompetanse på kvinnehelse og elektrostimulering/biofeedback.",
        links: [
          { text: "Hjemmeside", url: "https://quintet.no/" },
          { text: "Oversikt over fysioterapeuter", url: "https://quintet.no/media/fm/60fb8bf3e8.pdf" }
        ]
      },
      {
        name: "Helsenorge.no",
        description: "Informasjon om ulike sykdomstilstander.",
        links: [
          { text: "Om analfissur (sprekk i endetarmsåpningen)", url: "https://helsenorge.no/sykdom/mage-og-tarm/analfissur" },
          { text: "Om prostatitt", url: "https://helsenorge.no/sykdom/underliv/prostatitt-akutt" }
        ]
      }
    ]
  },
  en: {
    pageTitle: "Resources",
    intro: "Here you will find links to relevant websites that can give you more information about chronic pelvic pain and help you connect with others who have the same problems.",
    mobileNote: "Turn your phone sideways to see the full table.",
    resources: [
      {
        name: "National Center for Pelvic Floor Health (NBH)",
        description: "",
        links: [
          { text: "Website", url: "https://www.unn.no/nbh" },
          { text: "Facebook", url: "https://www.facebook.com/nbh.unn/" }
        ]
      },
      {
        name: "Norwegian Physiotherapy Association",
        description: "Overview of physiotherapists with special expertise in vulvar disorders, chronic pelvic and pelvic pain.",
        links: [
          { text: "Overview of practitioners", url: "https://fysio.no/Forbundsforsiden/Organisasjon/Faggrupper/Kvinnehelse/Spesialister-og-behandlere-i-kvinnehelse/Vulvalidelser-Kronisk-underlivs-og-bekkensmerte" }
        ]
      },
      {
        name: "Vulva.no",
        description: "Useful information about diseases and ailments in the vulva. The site is made by authorized healthcare professionals.",
        links: [
          { text: "Vulva.no", url: "https://vulva.no/" }
        ]
      },
      {
        name: "Smertenettverk.no",
        description: "A collaboration project between the four university hospitals commissioned by the Ministry of Health and Care Services.",
        links: [
          { text: "Website", url: "https://www.smertenettverk.no/" }
        ]
      },
      {
        name: "Pudendal Neuropathy",
        description: "",
        links: [
          { text: "International Pelvic Pain Society", url: "https://www.pelvicpain.org/" },
          { text: "Health Organization for Pudendal Education", url: "http://www.pudendalhope.info/" }
        ]
      },
      {
        name: "Quintet",
        description: "Quintet offers various products in treatment aids for incontinence, pelvic floor training, general pain relief, muscle rehabilitation and sexual health. They also have an overview of physiotherapists in the country with expertise in women's health and electrical stimulation/biofeedback.",
        links: [
          { text: "Website", url: "https://quintet.no/" },
          { text: "Overview of physiotherapists", url: "https://quintet.no/media/fm/60fb8bf3e8.pdf" }
        ]
      },
      {
        name: "Helsenorge.no",
        description: "Information about various disease conditions.",
        links: [
          { text: "About anal fissure (crack in the anal opening)", url: "https://helsenorge.no/sykdom/mage-og-tarm/analfissur" },
          { text: "About prostatitis", url: "https://helsenorge.no/sykdom/underliv/prostatitt-akutt" }
        ]
      }
    ]
  }
} as const

export const Resources = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  return (
    <>
      <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img
            src="/resource.png"
            alt="Resources"
            width="24"
            height="24"
          />
        </div>
        <h2 className={styles.sectionTitle}>{resourcesData[language].pageTitle}</h2>
      </div>
      
      <div className={styles.sectionContent}>
        <div className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>
              {resourcesData[language].intro}
            </p>
            <p className={styles.enhancedParagraph} style={{ fontStyle: 'italic', marginTop: '10px' }}>
              {resourcesData[language].mobileNote}
            </p>
          </div>
        </div>

        {/* Resources Table */}
        <div style={{ 
          overflowX: 'auto',
          margin: '20px 0',
          borderRadius: '8px',
          border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}>
          <table style={{ 
            width: '100%',
            borderCollapse: 'collapse',
            background: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : '#fff',
          }}>
            <thead>
              <tr style={{
                background: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                borderBottom: `2px solid ${resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              }}>
                <th className={styles.tableHeader} style={{ 
                  padding: '15px',
                  textAlign: 'left',
                  color: resolvedTheme === 'dark' ? '#fff' : '#333',
                }}>
                  {language === 'no' ? 'RESSURS' : 'RESOURCE'}
                </th>
                <th className={styles.tableHeader} style={{ 
                  padding: '15px',
                  textAlign: 'left',
                  color: resolvedTheme === 'dark' ? '#fff' : '#333',
                }}>
                  {language === 'no' ? 'LENKE' : 'LINK'}
                </th>
              </tr>
            </thead>
            <tbody>
              {resourcesData[language].resources.map((resource, index) => (
                <tr key={index} style={{
                  borderBottom: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                }}>
                  <td className={styles.tableCell} style={{ 
                    padding: '15px',
                    verticalAlign: 'top',
                    color: resolvedTheme === 'dark' ? '#fff' : '#333',
                  }}>
                    <strong style={{ display: 'block', marginBottom: '5px' }}>{resource.name}</strong>
                    {resource.description && (
                      <span className={styles.tableDescription} style={{ 
                        color: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                        display: 'block',
                        marginTop: '5px'
                      }}>
                        {resource.description}
                      </span>
                    )}
                  </td>
                  <td style={{ 
                    padding: '15px',
                    verticalAlign: 'top',
                  }}>
                    {resource.links.map((link, linkIndex) => (
                      <div key={linkIndex} style={{ marginBottom: linkIndex < resource.links.length - 1 ? '8px' : '0' }}>
                        <a 
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                            textDecoration: 'none',
                            fontWeight: '500',
                            display: 'inline-block',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        >
                          {link.text}
                        </a>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}