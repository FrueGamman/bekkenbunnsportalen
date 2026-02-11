// src/conditions/constipation/components/resources.tsx
"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { SectionAccordion } from '../../../components/SectionAccordion'

// Language-specific resources data arrays
const resourcesData = {
  no: [
    {
      id: "intro",
      isDirectText: true,
      directText: "Her finner du lenker til relevante nettsider som kan gi deg mer informasjon om forstoppelse og tømmingsproblemer for avføring, og hjelpe deg å komme i kontakt med andre som har de samme problemene."
    },
    {
      id: "competence_services",
      title: "Kompetansetjenester",
      hasResources: true,
      resources: [
        {
          name: "Nasjonalt senter for Bekkenbunnshelse (NBH)",
          url: "https://www.unn.no/nbh",
          type: "Hjemmeside"
        },
        {
          name: "NBH Facebook",
          url: "https://www.facebook.com/nbh.unn/",
          type: "Facebook"
        }
      ]
    },
    {
      id: "organizations",
      title: "Organisasjoner",
      hasResources: true,
      resources: [
        {
          name: "Norilco. Norsk forening for stomi, reservoar og mage-tarmkreft.",
          url: "https://www.norilco.no/",
          type: "Hjemmeside"
        },
      ]
    },
    {
      id: "guidelines",
      title: "Faglige retningslinjer",
      hasResources: true,
      resources: [
        {
          name: "Faglige retningslinjer for utredning og konservativ behandling av anorektale funksjonsforstyrrelser (NBH).",
          url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/AI%20retningslinjer%202019%20pdf.pdf",
          type: "Gå til veileder"
        }
      ]
    },
    {
      id: "patient_information",
      title: "Pasientinformasjon",
      hasResources: true,
      resources: [
        {
          name: "Pasientinformasjon fra UNN. Tiltak som kan hjelpe ved lekkasje, forstoppelse og tømmingsproblemer for avføring.",
          url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/Pasientinformasjon%20Tiltak%20som%20kan%20hjelpe%20ved%20lekkasje%2C%20forstoppelse%20og%20t%C3%B8mmingsproblemer%20for%20avf%C3%B8ring.pdf",
          type: "Pasientinformasjon"
        }
      ]
    },
    {
      id: "specialized_info",
      title: "Spesialisert informasjon",
      hasResources: true,
      resources: [
        {
          name: "Norsk MS-veileder. Nasjonal kompetansetjeneste for multippel sklerose (MS) har utarbeidet en norsk veileder om MS. Denne veilederen har en egen del som omhandler blære- og tarmforstyrrelser.",
          url: "https://helse-bergen.no/norsk-ms-veileder",
          type: "Hjemmeside"
        },
        {
          name: "Tarmforstyrrelser",
          url: "https://www.msveileder.no/artikkel/76/tarmforstyrrelser",
          type: "Tarmforstyrrelser"
        }
      ]
    },
    {
      id: "health_info",
      title: "Helseinformasjon",
      hasResources: true,
      resources: [
        {
          name: "Helsenorge.no. Informasjon om ulike sykdomstilstander.",
          url: "https://helsenorge.no/sykdom/mage-og-tarm/forstoppelse",
          type: "Om forstoppelse"
        },
      ]
    },
    {
      id: "international_resources",
      title: "Internasjonale ressurser",
      hasResources: true,
      resources: [
        {
          name: "Nikola.no. En svensk nettside utviklet av et faglig nettverk. Siden er laget for pasienter og helsepersonell som møter pasienter med blære-og tarmdysfunksjoner.",
          url: "https://nikola.nu/",
          type: "Hjemmeside"
        }
      ]
    },
    {
      id: "educational_videos",
      title: "Instruksjonsvideoer",
      hasResources: true,
      resources: [
        {
          name: "Hvordan tarmen fungerer. Instruksjonsfilm om tarmens funksjon, utarbeidet av Coloplast",
          url: "https://www.coloplast.no/blare-og-tarm-/forbruker/a-leve-med-tarmproblemer/#section=Hvordan-tarmen-fungerer_296028",
          type: "Informasjonsfilm"
        },
        {
          name: "Transanal irrigasjon. Instruksjonsfilmer om analirrigasjon utviklet av ulike firma.",
          url: "https://www.coloplast.no/blare-og-tarm-/bruksanvisninger/veiledninger-for-tarmirrigasjon/#section=Introduksjon-til-analirrigasjon_275301",
          type: "Persteen – Coloplast"
        },
        {
          name: "Navina Classic – Wellspect",
          url: "https://www.wellspect.no/produkter/tarmprodukter/navina-classic/instruksjoner-og-filmer",
          type: "Navina Classic – Wellspect"
        }
      ]
    },
    {
      id: "additional_resources",
      title: "Tilleggsressurser",
      hasResources: true,
      resources: [
        {
          name: "Informasjonsbrosjyre om sakral nervemodulering. Interstim-behandling for problemer med tarmkontroll, en pasientveiledning. Medtronic.",
          url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/UC201808131NO_Interstim_Patient_Brochure_Bowel_Rebrand_A5_Pres.pdf",
          type: "Brosjyre"
        }
      ]
    }
  ],
  en: [
    {
      id: "intro",
      isDirectText: true,
      directText: "Here you will find links to relevant websites that can give you more information about constipation and bowel evacuation problems, and help you get in touch with others who have the same problems."
    },
    {
      id: "competence_services",
      title: "Competence Services",
      hasResources: true,
      resources: [
        {
          name: "National Center for Pelvic Floor Health (NBH)",
          url: "https://www.unn.no/nbh",
          type: "Website"
        },
        {
          name: "NBH Facebook",
          url: "https://www.facebook.com/nbh.unn/",
          type: "Facebook"
        }
      ]
    },
    {
      id: "organizations",
      title: "Organizations",
      hasResources: true,
      resources: [
        {
          name: "Norilco. Norwegian Association for Stoma, Reservoir and Gastrointestinal Cancer.",
          url: "https://www.norilco.no/",
          type: "Website"
        },
      ]
    },
    {
      id: "guidelines",
      title: "Clinical Guidelines",
      hasResources: true,
      resources: [
        {
          name: "Clinical Guidelines for Assessment and Conservative Treatment of Anorectal Functional Disorders (NBH).",
          url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/AI%20retningslinjer%202019%20pdf.pdf",
          type: "Go to Guide"
        }
      ]
    },
    {
      id: "patient_information",
      title: "Patient Information",
      hasResources: true,
      resources: [
        {
          name: "Patient Information from UNN. Measures that can help with leakage, constipation and bowel evacuation problems.",
          url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/Pasientinformasjon%20Tiltak%20som%20kan%20hjelpe%20ved%20lekkasje%2C%20forstoppelse%20og%20t%C3%B8mmingsproblemer%20for%20avf%C3%B8ring.pdf",
          type: "Patient Information"
        }
      ]
    },
    {
      id: "specialized_info",
      title: "Specialized Information",
      hasResources: true,
      resources: [
        {
          name: "Norwegian MS Guide. The National Competence Service for Multiple Sclerosis (MS) has developed a Norwegian guide on MS. This guide has a separate section that deals with bladder and bowel disorders.",
          url: "https://helse-bergen.no/norsk-ms-veileder",
          type: "Website"
        },
        {
          name: "Bowel Disorders",
          url: "https://www.msveileder.no/artikkel/76/tarmforstyrrelser",
          type: "Bowel Disorders"
        }
      ]
    },
    {
      id: "health_info",
      title: "Health Information",
      hasResources: true,
      resources: [
        {
          name: "Helsenorge.no. Information about various disease conditions.",
          url: "https://helsenorge.no/sykdom/mage-og-tarm/forstoppelse",
          type: "About Constipation"
        },
      ]
    },
    {
      id: "international_resources",
      title: "International Resources",
      hasResources: true,
      resources: [
        {
          name: "Nikola.no. A Swedish website developed by a professional network. The site is made for patients and healthcare professionals who meet patients with bladder and bowel dysfunctions.",
          url: "https://nikola.nu/",
          type: "Website"
        }
      ]
    },
    {
      id: "educational_videos",
      title: "Educational Videos",
      hasResources: true,
      resources: [
        {
          name: "How the Bowel Works. Instructional film about bowel function, developed by Coloplast",
          url: "https://www.coloplast.no/blare-og-tarm-/forbruker/a-leve-med-tarmproblemer/#section=Hvordan-tarmen-fungerer_296028",
          type: "Information Film"
        },
        {
          name: "Transanal Irrigation. Instructional films about anal irrigation developed by various companies.",
          url: "https://www.coloplast.no/blare-og-tarm-/bruksanvisninger/veiledninger-for-tarmirrigasjon/#section=Introduksjon-til-analirrigasjon_275301",
          type: "Peristeen – Coloplast"
        },
        {
          name: "Navina Classic – Wellspect",
          url: "https://www.wellspect.no/produkter/tarmprodukter/navina-classic/instruksjoner-og-filmer",
          type: "Navina Classic – Wellspect"
        }
      ]
    },
    {
      id: "additional_resources",
      title: "Additional Resources",
      hasResources: true,
      resources: [
        {
          name: "Information Brochure on Sacral Nerve Modulation. Interstim Treatment for Bowel Control Problems, a Patient Guide. Medtronic.",
          url: "http://nkib.helsekompetanse.no/sites/nkib.helsekompetanse.no/files/UC201808131NO_Interstim_Patient_Brochure_Bowel_Rebrand_A5_Pres.pdf",
          type: "Brochure"
        }
      ]
    }
  ]
} as const

export const Resources = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  // Helper function to render resource items based on type
  const renderResourceItem = (item: {
    id: string;
    title?: string;
    content?: string | readonly string[];
    isDirectText?: boolean;
    directText?: string;
    hasSubsections?: boolean;
    subsections?: ReadonlyArray<{
      id: string;
      title: string;
      content?: string | readonly string[];
      hasArticles?: boolean;
      articles?: ReadonlyArray<{ title: string; authors: string }>;
      hasBooks?: boolean;
      books?: ReadonlyArray<{ title: string; authors: string }>;
    }>;
    hasResources?: boolean;
    resources?: ReadonlyArray<{ name: string; url: string; type: string }>;
  }) => {
    // Render intro text directly without accordion
    if (item.isDirectText && item.id === 'intro') {
      return (
        <div key={item.id} className={styles.normalFunctionSection}>
          <div className={styles.normalFunctionContent}>
            <p className={styles.enhancedParagraph}>{item.directText}</p>
          </div>
        </div>
      );
    }

    return (
      <SectionAccordion 
        key={item.id}
        title={item.title || ''}
        isDarkMode={resolvedTheme === 'dark'}
        defaultOpen={false}
      >
        <div className={styles.normalFunctionContent}>
          {item.isDirectText ? (
            <p className={styles.enhancedParagraph}>{item.directText}</p>
          ) : item.content && Array.isArray(item.content) ? (
            item.content.map((contentText: string, contentIndex: number) => (
              <p key={contentIndex} className={styles.enhancedParagraph}>
                {contentText}
              </p>
            ))
          ) : item.content && (
            <p className={styles.enhancedParagraph}>{item.content}</p>
          )}

          {/* Render resources list */}
          {item.hasResources && item.resources && (
            <div className={styles.resourcesList}>
              {item.resources.map((resource: {
                name: string;
                url: string;
                type: string;
              }) => (
                <div key={resource.url} className={styles.resourceItem}>
                  <div className={styles.resourceInfo}>
                    <h4 className={styles.resourceName}>{resource.name}</h4>
                    <span className={styles.resourceType}>{resource.type}</span>
                  </div>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.resourceLink}
                  >
                    {language === "no" ? "Besøk" : "Visit"}
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Render subsections */}
          {item.hasSubsections && item.subsections && item.subsections.map((subsection: {
            id: string;
            title: string;
            content?: string | readonly string[];
            hasArticles?: boolean;
            articles?: ReadonlyArray<{ title: string; authors: string }>;
            hasBooks?: boolean;
            books?: ReadonlyArray<{ title: string; authors: string }>;
          }) => (
            <div key={subsection.id} className={styles.resourceSection}>
              <h4 className={`${styles.enhancedSubheading} ${styles.resourceSubtitle}`}>
                {subsection.title}
              </h4>
              
              {subsection.content && (
                <p className={styles.enhancedParagraph}>{subsection.content}</p>
              )}

              {/* Render articles */}
              {subsection.hasArticles && subsection.articles && (
                <ul className={styles.resourceList}>
                  {subsection.articles.map((article: {
                    title: string;
                    authors: string;
                  }) => (
                    <li key={article.title} className={styles.resourceListItem}>
                      <strong>{article.title}</strong> - {article.authors}
                    </li>
                  ))}
                </ul>
              )}

              {/* Render books */}
              {subsection.hasBooks && subsection.books && (
                <ul className={styles.resourceList}>
                  {subsection.books.map((book: {
                    title: string;
                    authors: string;
                  }) => (
                    <li key={book.title} className={styles.resourceListItem}>
                      <strong>{book.title}</strong> - {book.authors}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </SectionAccordion>
    )
  }

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
          <h2 className={styles.sectionTitle}>{language === "no" ? "Ressurser" : "Resources"}</h2>
        </div>
        
        <div className={styles.sectionContent}>
          {resourcesData[language].map((item) => renderResourceItem(item))}
        </div>
      </div>
    </>
  )
}