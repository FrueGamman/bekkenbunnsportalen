"use client"

import type React from "react"
import styles from "./Organisasjoner.module.css"

const Organisasjoner: React.FC = () => {
  const organizationCategories = [
    {
      category: "National organizations",
      organizations: [
        {
          id: "nsfs-faggruppe-av-sykepleiere-i-urologi",
          name: "NSFs Faggruppe av Sykepleiere i Urologi",
          link: "https://www.nsf.no/faggrupper/urologi",
          logo: "/logos/nsfs-faggruppe-av-sykepleiere-i-urologi.png",
        },
        {
          id: "uroterapeutisk-forening",
          name: "Uroterapeutisk Forening",
          link: "https://www.utfnordic.org/",
          logo: "/logos/uroterapeutisk-forening.png",
        },
        {
          id: "sykepleiere-i-stomiomsorg",
          name: "Sykepleiere i Stomiomsorg",
          link: "https://www.nsf.no/faggrupper/stomiomsorg",
          logo: "/logos/sykepleiere-i-stomiomsorg.jpg",
        },
        {
          id: "norsk-fysioterapiforbund-faggruppe-for-kvinnehelse",
          name: "Norsk Fysioterapiforbund Faggruppe for Kvinnehelse",
          link: "https://fysio.no/kvinnehelse",
          logo: "/logos/norsk-fysioterapiforbund-faggruppe-for-kvinnehelse.png",
        },
        {
          id: "vulvaforum",
          name: "Vulvaforum",
          link: "https://vulva.no/om-oss/om-vulvaforum/",
          logo: "/logos/vulvaforum.svg",
        },
        {
          id: "smertenettverk",
          name: "Smertenettverk",
          link: "https://www.smertenettverk.no/",
          logo: "/logos/smertenettverk.png",
        },
      ],
    },
    {
      category: "International organizations",
      organizations: [
        {
          id: "european-association-of-urology",
          name: "European Association of Urology",
          link: "https://uroweb.org/",
          logo: "/logos/european-association-of-urology.svg",
        },
        {
          id: "international-continence-society",
          name: "International Continence Society",
          link: "https://www.ics.org/",
          logo: "/logos/international-continence-society.svg",
        },
        {
          id: "international-urogynecological-association",
          name: "International Urogynecological Association",
          link: "https://www.iuga.org/",
          logo: "/logos/international-urogynecological-association.svg",
        },
        {
          id: "european-society-of-coloproctology",
          name: "European Society of Coloproctology",
          link: "https://www.escp.eu.com/",
          logo: "/logos/european-society-of-coloproctology.png",
        },
        {
          id: "american-urological-association",
          name: "American Urological Association",
          link: "https://www.auanet.org/",
          logo: "/logos/american-urological-association.png",
        },
        {
          id: "international-pelvic-pain-society",
          name: "International Pelvic Pain Society",
          link: "https://pelvicpain.org/",
          logo: "/logos/international-pelvic-pain-society.svg",
        },
        {
          id: "international-painful-bladder-foundation",
          name: "International Painful Bladder Foundation (painful-bladder.org)",
          link: "http://www.painful-bladder.org/",
          logo: "/logos/international-painful-bladder-foundation.png",
        },
        {
          id: "pelvic-obstetric-and-gynaecological-physiotherapy",
          name: "Pelvic, Obstetric and Gynaecological Physiotherapy (POGP)",
          link: "https://thepogp.co.uk/default.aspx",
          logo: "/logos/pelvic-obstetric-and-gynaecological-physiotherapy.png",
        },
        {
          id: "the-international-society-for-the-study-of-vulvovaginal-disease",
          name: "The International Society for the Study of Vulvovaginal Disease (ISSVD)",
          link: "https://www.issvd.org/",
          logo: "/logos/the-international-society-for-the-study-of-vulvovaginal-disease.webp",
        },
      ],
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>
            <img src="/cil_badge.png" alt="" />
          </span>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Organizations and professional networks</h2>
          <p className={styles.subtitle}>Selected professional associations and networks in the field.</p>
        </div>
      </div>

      <div className={styles.categoriesList}>
        {organizationCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>{category.category}</h3>
            <div className={styles.organizationsList}>
              {category.organizations.map((org) => (
                <div key={org.id} className={styles.organizationItem}>
                  <div className={styles.orgIcon}>
                    {org.logo ? (
                      <img 
                        src={org.logo} 
                        alt={`${org.name} logo`}
                        className={styles.orgLogo}
                      />
                    ) : (
                      <img src="/cil_badge.png" alt="" />
                    )}
                  </div>
                  <div className={styles.orgInfo}>
                    <h4 className={styles.orgName}>{org.name}</h4>
                  </div>
                  <a 
                    href={org.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.orgBtn} 
                  title="Visit website"
                  >
                    <span className={styles.orgBtnIcon}>
                      <img src="/streamline-color_expand-window-2.png" alt="" />
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.userOrganizationsSection}>
        <h3 className={styles.userOrgTitle}>Add your organization</h3>
        <p className={styles.userOrgDescription}>Do you represent a relevant organization or network? Contact us to be included.</p>
        <button className={styles.userOrgLink}>
          Submit organization
        </button>
      </div>
    </div>
  )
}

export default Organisasjoner
