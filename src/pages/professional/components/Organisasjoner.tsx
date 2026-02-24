"use client"

import type React from "react"
import { useEffect, useState } from "react"
import styles from "./Organisasjoner.module.css"
import { useLanguage } from "../../../context/useLanguage"
import { directusFetch, getImageUrl } from "../../../lib/directus"
import type { Fagorganisasjon, Pasientorganisasjon } from "../../../types/cms"

interface Organization {
  id: string | number;
  name: string;
  link: string;
  logo: string | null;
}

interface OrganizationCategory {
  category: string;
  organizations: Organization[];
}

const Organisasjoner: React.FC = () => {
  const { language } = useLanguage()
  const [categories, setCategories] = useState<OrganizationCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch both Professional and Patient organizations in parallel
        const [fagRes, pasientRes] = await Promise.allSettled([
          directusFetch<Fagorganisasjon[]>('/items/fagorganisasjoner?filter[aktiv][_eq]=true&sort=rekkefølge'),
          directusFetch<Pasientorganisasjon[]>('/items/pasientorganisasjoner?filter[aktiv][_eq]=true&sort=rekkefølge')
        ])

        const fagOrganisasjoner = fagRes.status === 'fulfilled' ? fagRes.value : []
        const pasientOrganisasjoner = pasientRes.status === 'fulfilled' ? pasientRes.value : []

        if (fagRes.status === 'rejected') console.error("Failed to fetch professional organizations", fagRes.reason)
        if (pasientRes.status === 'rejected') console.error("Failed to fetch patient organizations", pasientRes.reason)

        // Process Professional Organizations
        const nationalOrgs = fagOrganisasjoner
          .filter(org => org.kategori === 'national')
          .map(org => ({
            id: org.id,
            name: org.navn,
            link: org.lenke,
            logo: org.logo ? getImageUrl(org.logo) : null
          }))

        const internationalOrgs = fagOrganisasjoner
          .filter(org => org.kategori === 'international')
          .map(org => ({
            id: org.id,
            name: org.navn,
            link: org.lenke,
            logo: org.logo ? getImageUrl(org.logo) : null
          }))

        // Process Patient Organizations
        const patientOrgs = pasientOrganisasjoner.map(org => ({
          id: org.id,
          name: org.navn,
          link: org.lenke,
          logo: org.logo ? getImageUrl(org.logo) : null
        }))

        // Build categories array
        const newCategories: OrganizationCategory[] = []

        const categoryTitles = {
          no: {
            national: "Nasjonale organisasjoner",
            international: "Internasjonale organisasjoner",
            patient: "Pasientorganisasjoner"
          },
          en: {
            national: "National organizations",
            international: "International organizations",
            patient: "Patient organizations"
          }
        }

        if (nationalOrgs.length > 0) {
          newCategories.push({
            category: categoryTitles[language as keyof typeof categoryTitles].national,
            organizations: nationalOrgs
          })
        }

        if (internationalOrgs.length > 0) {
          newCategories.push({
            category: categoryTitles[language as keyof typeof categoryTitles].international,
            organizations: internationalOrgs
          })
        }

        if (patientOrgs.length > 0) {
          newCategories.push({
            category: categoryTitles[language as keyof typeof categoryTitles].patient,
            organizations: patientOrgs
          })
        }

        setCategories(newCategories)
      } catch (err) {
        console.error("Error fetching organizations:", err)
        setError("Failed to load organizations")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [language])

  if (loading) {
    return <div className={styles.container}><p>Loading organizations...</p></div>
  }

  const t = {
    no: {
      title: "Organisasjoner og faglige nettverk",
      subtitle: "Utvalgte faglige foreninger og nettverk innen fagfeltet.",
      addOrgTitle: "Legg til din organisasjon",
      addOrgDesc: "Representerer du en relevant organisasjon eller nettverk? Kontakt oss for å bli inkludert.",
      submit: "Send inn organisasjon"
    },
    en: {
      title: "Organizations and professional networks",
      subtitle: "Selected professional associations and networks in the field.",
      addOrgTitle: "Add your organization",
      addOrgDesc: "Do you represent a relevant organization or network? Contact us to be included.",
      submit: "Submit organization"
    }
  }

  const text = t[language as keyof typeof t]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>
            <img src="/cil_badge.png" alt="" />
          </span>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{text.title}</h2>
          <p className={styles.subtitle}>{text.subtitle}</p>
        </div>
      </div>

      <div className={styles.categoriesList}>
        {categories.map((category, categoryIndex) => (
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
                        onError={(e) => {
                          e.currentTarget.src = "/cil_badge.png"
                          e.currentTarget.onerror = null // Prevent infinite loop
                        }}
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
        <h3 className={styles.userOrgTitle}>{text.addOrgTitle}</h3>
        <p className={styles.userOrgDescription}>{text.addOrgDesc}</p>
        <button className={styles.userOrgLink}>
          {text.submit}
        </button>
      </div>
    </div>
  )
}

export default Organisasjoner
