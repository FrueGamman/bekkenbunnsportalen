"use client"

import type React from "react"
import styles from "../pages/App.module.css"
import { useHomepageData } from "../hooks/useHomepageData"
import { useLanguage } from "../context/LanguageContext"
import { getImageUrl } from "../lib/directus"
import { Card, CardContent } from "./ui/Card"
import { Separator } from "./ui/Separator"

interface Organization {
    name: string
    url: string
    logo?: string | null
}

interface HomepageOrganizationsProps {
    organizations?: {
        title: string
        description: string
        items: Organization[]
    }
}

const HomepageOrganizations: React.FC<HomepageOrganizationsProps> = ({ organizations: propOrgs }) => {
    const { language } = useLanguage()
    const { data, loading } = useHomepageData(language)

    // Use props if provided, otherwise fetch
    const orgData = propOrgs || data?.organizations

    if (!orgData && loading) return null

    const items = orgData?.items || []
    const title = orgData?.title || (language === 'no' ? "Pasient- og brukerorganisasjoner" : "Patient and User Organizations")
    const description = orgData?.description || (language === 'no'
        ? "Pasient- og brukerorganisasjonene er interesseorganisasjoner som arbeider for personer med sykdom og nedsatt funksjonsevne. Under finner du en oversikt over aktuelle organisasjoner innenfor inkontinens og bekkenbunnsykdom."
        : "Patient and user organizations are advocacy groups that work for people with illness and reduced functional ability.")

    return (
        <section className={styles.resourcesSection} aria-labelledby="organizations-heading">
            <div className={styles.sectionHeader}>
                <h2 id="organizations-heading" className={styles.sectionTitle}>{title}</h2>
                <p className={styles.sectionDescription}>
                    {description}
                </p>
            </div>
            <div className={styles.resourcesContainer}>
                {items.map((org, index) => (
                    <Card key={index} className={styles.resourceCard}>
                        <CardContent className={styles.resourceCardContent}>
                            <div className={styles.resourceImageContainer}>
                                <a
                                    href={org.url}
                                    className={styles.resourceLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={language === 'no' ? `Gå til ${org.name} nettside` : `Go to ${org.name} website`}
                                >
                                    {org.logo ? (
                                        <img
                                            className={styles.resourceImage}
                                            alt={org.name}
                                            src={getImageUrl(org.logo)}
                                            style={{ width: "140px", objectFit: "contain" }}
                                        />
                                    ) : (
                                        <div className={styles.resourceLogoPlaceholder}>
                                            {org.name}
                                        </div>
                                    )}
                                </a>
                            </div>
                            <Separator className={styles.resourceSeparator} />
                            <p className={styles.resourceInfoText}>{org.name}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default HomepageOrganizations
