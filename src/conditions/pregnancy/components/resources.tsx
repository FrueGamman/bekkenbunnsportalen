"use client"
import { useLanguage } from "../../../context/LanguageContext"
import { useTheme } from "../../../context/ThemeContext"
import { SectionAccordion } from "../../../components/SectionAccordion"
import styles from "./section-content.module.css"

// Language-specific resources data arrays
const resourcesData = {
  no: [
    {
      id: "intro",
      isDirectText: true,
      directText: "Her finner du nyttige ressurser og lenker til informasjon om underlivsplager under graviditet og etter fødsel."
    },
    {
      id: "competence_services",
      title: "Kompetansetjenester",
      hasSubsections: true,
      subsections: [
        {
          id: "bekkensenteret",
          title: "Bekkensenteret ved Akershus universitetssykehus",
          content: [
            "Spesialisttjeneste for bekkenbunnsproblemer og underlivsplager."
          ],
          hasLink: true,
          link: {
            url: "https://www.ahus.no/bekkensenteret",
            text: "Besøk Bekkensenteret"
          }
        },
        {
          id: "ous_endometriose",
          title: "Nasjonal kompetansetjeneste for endometriose og adenomyose",
          content: [
            "Nasjonal kompetansetjeneste for endometriose og adenomyose ved Oslo universitetssykehus."
          ],
          hasLink: true,
          link: {
            url: "https://www.oslo-universitetssykehus.no/avdelinger/kvinneklinikken/gynekologisk-avdeling/nasjonal-kompetansetjeneste-endometriose-og-adenomyose/",
            text: "Besøk kompetansetjenesten"
          }
        }
      ]
    },
    {
      id: "organizations",
      title: "Organisasjoner",
      hasSubsections: true,
      subsections: [
        {
          id: "barselambassadorene",
          title: "Barselambassadørene",
          content: [
            "Ressurser og støtte for gravide og nybakte mødre."
          ],
          hasLink: true,
          link: {
            url: "https://barselambassadorene.no/",
            text: "Besøk Barselambassadørene"
          }
        }
      ]
    },
    {
      id: "treatment_providers",
      title: "Behandlere",
      hasSubsections: true,
      subsections: [
        {
          id: "fysioterapeuter",
          title: "Fysioterapeuter",
          content: [
            "Spesialiserte fysioterapeuter som jobber med bekkenbunnsproblemer."
          ],
          hasLink: true,
          link: {
            url: "https://fysio.no/kvinnehelse",
            text: "Finn fysioterapeut"
          }
        }
      ]
    },
    {
      id: "female_circumcision",
      title: "Kvinnelig omskjæring - Ressurser",
      intro: "Her er samlet noen nyttige lenker som gir informasjon om ulike aspekter ved kvinnelig omskjæring og hvilken betydning det har for svangerskap og fødsel. Du finner også informasjon om hvilke tilbud som finnes og andre hjelperessurser",
      hasTable: true,
      tableData: [
        {
          resource: "Nasjonalt kunnskapssenter om vold og traumatisk stress (NKVTS)",
          topic: "Samleside med brosjyrer om kjønnslemlestelse\n\nBrosjyrer finnes på flere språk",
          link: {
            text: "NKVTS samleside (eksternt nettsted)",
            url: "https://kjonnslemlestelse.nkvts.no/innhold/ressurser-og-infomateriell/brosjyrer-om-kjonnslemlestelse/"
          }
        },
        {
          resource: "Brosjyre av NKVTS",
          topic: "Informasjon om omskjæring, åpnende operasjoner og tilbud i alle landets helseregioner",
          link: {
            text: "Brosjyre: Omskåret? (eksternt nettsted)",
            url: "https://kjonnslemlestelse.nkvts.no/wp-content/uploads/sites/3/2019/06/KLL_BrosjyreOmskaaret_norsk.pdf"
          }
        },
        {
          resource: "Brosjyre av NKVTS",
          topic: "Informasjonsbrosjyre om kjønnslemlestelse",
          link: {
            text: "Kroppen din er perfekt fra naturens side (eksternt nettsted)",
            url: "https://kjonnslemlestelse.nkvts.no/wp-content/uploads/sites/3/2019/08/Kroppen_din_norsk_9korr.pdf"
          }
        },
        {
          resource: "Ung.no er det offentliges informasjonskanal for ungdom",
          topic: "Er du jente og er omskåret? Du kan du søke hjelp",
          link: {
            text: "Ung.no Er du jente og omskåret? (eksternt nettsted)",
            url: "https://www.ung.no/kll/3025_Er_du_jente_og_omskåret_Du_kan_søke_hjelp.html"
          }
        },
        {
          resource: "Dagbladet.no",
          topic: "Safia Abdi Haase forteller sin historie",
          link: {
            text: "Safias historie (eksternt nettsted)",
            url: "https://www.dagbladet.no/nyheter/her-er-safias-historie--nbspda-jeg-var-9-ar-ble-jeg-omskaret-i-to-timer-uten-bedovelse/67010502"
          }
        },
        {
          resource: "Utlendingsdirektoratet, ord og begreper",
          topic: "Regelverk og oversikt over helsehjelp ved kjønnslemlestelse av kvinner og jenter",
          link: {
            text: "UDI.no ord og begreper (eksternt nettsted)",
            url: "https://www.udi.no/ord-og-begreper/kjonnslemlestelse-av-kvinner-og-jenter-/"
          }
        }
      ],
      healthcareSection: {
        title: "Lenker for helsepersonell",
        tableData: [
          {
            resource: "Norsk veileder i fødselshjelp, Legeforeningen",
            topic: "Veileder til helsepersonell",
            link: {
              text: "Norsk gynekologisk forening – veileder kvinnelig omskjæring",
              url: "https://www.legeforeningen.no/foreningsledd/fagmed/norsk-gynekologisk-forening/veiledere/veileder-i-fodselshjelp/kvinnelig-omskjaring-kjonnslemlestelse-deinfibulering/"
            }
          },
          {
            resource: "NKVTS Veiviser til helsepersonell",
            topic: "Veiviser om kjønnslemlestelse, for helsepersonell som jobber med jenter i risikosonen",
            link: {
              text: "NKVTS veiviser (eksternt nettsted)",
              url: "https://kjonnslemlestelse.nkvts.no/"
            }
          },
          {
            resource: "Helsedirektoratet, informasjon om helsetjenestens ansvar",
            topic: "Nasjonale anbefalinger og regelverk ved kjønnslemlestelse",
            link: {
              text: "HDIR tema kjønnslemlestelse (eksternt nettsted)",
              url: "https://www.helsedirektoratet.no/tema/kjonnslemlestelse"
            }
          },
          {
            resource: "Utlendingsdirektoratets regelverk",
            topic: "Rettspraksis og retningslinjer",
            link: {
              text: "UDIR regelverk (eksternt nettsted)",
              url: "https://www.udiregelverk.no/rettskilder/udi-retningslinjer/udi-2014-041/"
            }
          }
        ]
      }
    }
  ],
  en: [
    {
      id: "intro",
      isDirectText: true,
      directText: "Here you will find useful resources and links to information about pelvic floor problems during pregnancy and after childbirth."
    },
    {
      id: "competence_services",
      title: "Competence services",
      hasSubsections: true,
      subsections: [
        {
          id: "bekkensenteret",
          title: "Pelvic Center at Akershus University Hospital",
          content: [
            "Specialist service for pelvic floor problems and pelvic floor complaints."
          ],
          hasLink: true,
          link: {
            url: "https://www.ahus.no/bekkensenteret",
            text: "Visit Pelvic Center"
          }
        },
        {
          id: "ous_endometriose",
          title: "National Competence Service for Endometriosis and Adenomyosis",
          content: [
            "National competence service for endometriosis and adenomyosis at Oslo University Hospital."
          ],
          hasLink: true,
          link: {
            url: "https://www.oslo-universitetssykehus.no/avdelinger/kvinneklinikken/gynekologisk-avdeling/nasjonal-kompetansetjeneste-endometriose-og-adenomyose/",
            text: "Visit competence service"
          }
        }
      ]
    },
    {
      id: "organizations",
      title: "Organizations",
      hasSubsections: true,
      subsections: [
        {
          id: "barselambassadorene",
          title: "Barselambassadørene",
          content: [
            "Resources and support for pregnant women and new mothers."
          ],
          hasLink: true,
          link: {
            url: "https://barselambassadorene.no/",
            text: "Visit Barselambassadørene"
          }
        }
      ]
    },
    {
      id: "treatment_providers",
      title: "Treatment providers",
      hasSubsections: true,
      subsections: [
        {
          id: "fysioterapeuter",
          title: "Physiotherapists",
          content: [
            "Specialized physiotherapists who work with pelvic floor problems."
          ],
          hasLink: true,
          link: {
            url: "https://fysio.no/kvinnehelse",
            text: "Find physiotherapist"
          }
        }
      ]
    },
    {
      id: "female_circumcision",
      title: "Female Circumcision - Resources",
      intro: "Here are some useful links that provide information about various aspects of female circumcision and its significance for pregnancy and childbirth. You will also find information about available services and other help resources",
      hasTable: true,
      tableData: [
        {
          resource: "National Knowledge Center on Violence and Traumatic Stress (NKVTS)",
          topic: "Collection page with brochures on genital mutilation\n\nBrochures available in multiple languages",
          link: {
            text: "NKVTS collection page (external website)",
            url: "https://kjonnslemlestelse.nkvts.no/innhold/ressurser-og-infomateriell/brosjyrer-om-kjonnslemlestelse/"
          }
        },
        {
          resource: "Brochure by NKVTS",
          topic: "Information about circumcision, opening operations and services in all health regions",
          link: {
            text: "Brochure: Circumcised? (external website)",
            url: "https://kjonnslemlestelse.nkvts.no/wp-content/uploads/sites/3/2019/06/KLL_BrosjyreOmskaaret_norsk.pdf"
          }
        },
        {
          resource: "Brochure by NKVTS",
          topic: "Information brochure about genital mutilation",
          link: {
            text: "Your body is perfect by nature (external website)",
            url: "https://kjonnslemlestelse.nkvts.no/wp-content/uploads/sites/3/2019/08/Kroppen_din_norsk_9korr.pdf"
          }
        },
        {
          resource: "Ung.no is the government's information channel for youth",
          topic: "Are you a girl and circumcised? You can seek help",
          link: {
            text: "Ung.no Are you a girl and circumcised? (external website)",
            url: "https://www.ung.no/kll/3025_Er_du_jente_og_omskåret_Du_kan_søke_hjelp.html"
          }
        },
        {
          resource: "Dagbladet.no",
          topic: "Safia Abdi Haase tells her story",
          link: {
            text: "Safia's story (external website)",
            url: "https://www.dagbladet.no/nyheter/her-er-safias-historie--nbspda-jeg-var-9-ar-ble-jeg-omskaret-i-to-timer-uten-bedovelse/67010502"
          }
        },
        {
          resource: "Immigration Directorate, words and concepts",
          topic: "Regulations and overview of health care for genital mutilation of women and girls",
          link: {
            text: "UDI.no words and concepts (external website)",
            url: "https://www.udi.no/ord-og-begreper/kjonnslemlestelse-av-kvinner-og-jenter-/"
          }
        }
      ],
      healthcareSection: {
        title: "Links for healthcare professionals",
        tableData: [
          {
            resource: "Norwegian guidelines in obstetrics, Medical Association",
            topic: "Guidelines for healthcare professionals",
            link: {
              text: "Norwegian Gynecological Association – female circumcision guidelines",
              url: "https://www.legeforeningen.no/foreningsledd/fagmed/norsk-gynekologisk-forening/veiledere/veileder-i-fodselshjelp/kvinnelig-omskjaring-kjonnslemlestelse-deinfibulering/"
            }
          },
          {
            resource: "NKVTS Guide for healthcare professionals",
            topic: "Guide on genital mutilation, for healthcare professionals working with girls at risk",
            link: {
              text: "NKVTS guide (external website)",
              url: "https://kjonnslemlestelse.nkvts.no/"
            }
          },
          {
            resource: "Directorate of Health, information about health services' responsibility",
            topic: "National recommendations and regulations for genital mutilation",
            link: {
              text: "HDIR topic genital mutilation (external website)",
              url: "https://www.helsedirektoratet.no/tema/kjonnslemlestelse"
            }
          },
          {
            resource: "Immigration Directorate regulations",
            topic: "Case law and guidelines",
            link: {
              text: "UDIR regulations (external website)",
              url: "https://www.udiregelverk.no/rettskilder/udi-retningslinjer/udi-2014-041/"
            }
          }
        ]
      }
    }
  ]
} as const

export const Resources = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  // Helper function to render content based on item type
  const renderResourceItem = (item: {
    id: string;
    title?: string;
    content?: string | readonly string[];
    isDirectText?: boolean;
    directText?: string;
    intro?: string;
    hasSubsections?: boolean;
    subsections?: ReadonlyArray<{
      id: string;
      title: string;
      content?: string | readonly string[];
      hasLink?: boolean;
      link?: { url: string; text: string };
    }>;
    hasTable?: boolean;
    tableData?: ReadonlyArray<{
      resource: string;
      topic: string;
      link: { text: string; url: string };
    }>;
    healthcareSection?: {
      title: string;
      tableData: ReadonlyArray<{
        resource: string;
        topic: string;
        link: { text: string; url: string };
      }>;
    };
  }) => {
    const hasTitle = item.title;
    
    const content = (
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

        {/* Intro paragraph */}
        {item.intro && (
          <p className={styles.enhancedParagraph} style={{ marginBottom: '20px' }}>
            {item.intro}
          </p>
        )}

        {/* Render table data */}
        {item.hasTable && item.tableData && (
          <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '16px'
            }}>
              <thead>
                <tr style={{
                  background: resolvedTheme === 'dark' ? 'rgba(106, 170, 214, 0.15)' : 'rgba(5, 56, 112, 0.1)',
                  borderBottom: `2px solid ${resolvedTheme === 'dark' ? '#6aaad6' : '#053870'}`
                }}>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                  }}>
                    {language === 'no' ? 'RESSURS' : 'RESOURCE'}
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                  }}>
                    {language === 'no' ? 'TEMA' : 'TOPIC'}
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                  }}>
                    {language === 'no' ? 'LENKE' : 'LINK'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {item.tableData.map((row: any, index: number) => (
                  <tr key={index} style={{
                    borderBottom: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                  }}>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>
                      {row.resource}
                    </td>
                    <td style={{ padding: '12px', verticalAlign: 'top', whiteSpace: 'pre-line' }}>
                      {row.topic}
                    </td>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>
                      <a
                        href={row.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      >
                        {row.link.text}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Healthcare section table */}
        {item.healthcareSection && (
          <>
            <h5 className={styles.subsectionHeading} style={{
              margin: '24px 0 16px',
              color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
            }}>
              {item.healthcareSection.title}
            </h5>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '16px'
              }}>
                <thead>
                  <tr style={{
                    background: resolvedTheme === 'dark' ? 'rgba(106, 170, 214, 0.15)' : 'rgba(5, 56, 112, 0.1)',
                    borderBottom: `2px solid ${resolvedTheme === 'dark' ? '#6aaad6' : '#053870'}`
                  }}>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                    }}>
                      {language === 'no' ? 'RESSURS' : 'RESOURCE'}
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                    }}>
                      {language === 'no' ? 'TEMA' : 'TOPIC'}
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870'
                    }}>
                      {language === 'no' ? 'LENKE' : 'LINK'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item.healthcareSection.tableData.map((row: any, index: number) => (
                    <tr key={index} style={{
                      borderBottom: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                    }}>
                      <td style={{ padding: '12px', verticalAlign: 'top' }}>
                        {row.resource}
                      </td>
                      <td style={{ padding: '12px', verticalAlign: 'top' }}>
                        {row.topic}
                      </td>
                      <td style={{ padding: '12px', verticalAlign: 'top' }}>
                        <a
                          href={row.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: resolvedTheme === 'dark' ? '#6aaad6' : '#0066cc',
                            textDecoration: 'none',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        >
                          {row.link.text}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Render subsections */}
        {item.hasSubsections && item.subsections && item.subsections.map((subsection: {
          id: string;
          title: string;
          content?: string | readonly string[];
          hasLink?: boolean;
          link?: { url: string; text: string };
        }) => (
          <div key={subsection.id}>
            <h4 className={styles.enhancedSubheading}>{subsection.title}</h4>
            
            {subsection.content && Array.isArray(subsection.content) ? (
              subsection.content.map((text: string, textIndex: number) => (
                <p key={textIndex} className={styles.enhancedParagraph}>{text}</p>
              ))
            ) : subsection.content && (
              <p className={styles.enhancedParagraph}>{subsection.content}</p>
            )}

            {subsection.hasLink && subsection.link && (
              <p>
                <a href={subsection.link.url} target="_blank" rel="noopener" className={styles.resourceLink}>
                  {subsection.link.text}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    );

    // Only wrap if section has title
    if (hasTitle) {
      return (
        <SectionAccordion
          key={item.id}
          title={item.title!}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          {content}
        </SectionAccordion>
      );
    } else {
      return <div key={item.id}>{content}</div>;
    }
  }

  return (
    <>
      <div id="resources" className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
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