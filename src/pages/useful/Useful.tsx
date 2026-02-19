"use client"
import React, { useState, useMemo } from "react"
import { useLanguage } from "../../context/LanguageContext"
import { Header } from "../../components/Header"
import Footer from "../../components/Footer"
import { usePageData } from "../../hooks/usePageData"
import { HeroSection } from "../../components/hero-section"
import styles from "./Useful.module.css"

export const Useful = () => {
  const { language } = useLanguage()
  const { data: pageData, loading, error } = usePageData("nyttig")
  const [searchTerm, setSearchTerm] = useState("")

  // Tab definitions
  const tabData = useMemo(() => ({
    no: ['Pasienthistorier', 'Pasientundervisning', 'Øvelse'],
    en: ['Patient Stories', 'Patient Education', 'Exercise']
  }), []);

  const [activeTab, setActiveTab] = useState(tabData[language][0])

  // Update active tab if language changes
  React.useEffect(() => {
    const index = tabData[language === 'no' ? 'en' : 'no'].indexOf(activeTab);
    if (index !== -1) {
      setActiveTab(tabData[language][index]);
    }
  }, [language]);

  // Helper for bilingual content from the singleton fields
  const getTranslation = (key: string) => {
    const field_nb = `${key}_no` as keyof typeof pageData;
    const field_en = `${key}_en` as keyof typeof pageData;

    if (language === 'en') {
      return (pageData[field_en] || pageData[field_nb]) as string;
    }
    return (pageData[field_nb] || pageData[field_en]) as string;
  };

  const heroTitle = !pageData ? (language === 'en' ? 'Useful information' : 'Nyttig informasjon') : (getTranslation('hero_tittel') || (language === 'en' ? 'Useful information' : 'Nyttig informasjon'));
  const heroDescription = pageData ? (getTranslation('hero_beskrivelse') || '') : '';
  const heroStatus = pageData ? (getTranslation('hero_status_melding') || '') : '';

  // Extract all items from block_card_grid sections
  const allItems = useMemo(() => {
    if (!pageData?.seksjoner || !Array.isArray(pageData.seksjoner)) return [];

    const items: any[] = [];
    pageData.seksjoner.forEach((section: any) => {
      if (section.collection === 'block_card_grid' && section.item?.items) {
        section.item.items.forEach((card: any) => {
          items.push({
            ...card,
            title: language === 'en' ? card.tittel_en || card.tittel_no : card.tittel_no,
            content: language === 'en' ? card.beskrivelse_en || card.beskrivelse_no : card.beskrivelse_no,
            category: language === 'en' ? card.overtittel_en || card.overtittel_no : card.overtittel_no,
            link: card.lenke_url,
            linkText: language === 'en' ? card.lenke_tekst_en || card.lenke_tekst_no : card.lenke_tekst_no
          });
        });
      }
    });
    return items;
  }, [pageData, language]);

  // Filtered items based on search and tab
  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesSearch =
        (item.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.content?.toLowerCase() || "").includes(searchTerm.toLowerCase());

      // Map tab to category or just show if it matches
      const matchesTab = item.category === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [allItems, searchTerm, activeTab, language]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <p>Laster innhold...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !pageData) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <p>Kunne ikke laste innhold for denne siden.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <HeroSection
          cmsData={{
            title: heroTitle,
            subtitle: heroStatus,
            description: heroDescription
          }}
        />

        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={language === 'en' ? "Search..." : "Søk..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.searchIcon}>
            <img src="/search.svg" alt="Search" className={styles.searchIconImage} />
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabsList}>
            {tabData[language].map(tab => (
              <button
                key={tab}
                className={`${styles.tabButton} ${activeTab === tab ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.contentSections}>
          <div className={styles.latestNewsGrid}>
            {filteredItems.map((item, idx) => (
              <div key={idx} className={styles.articleCard}>
                <div className={styles.articleContent}>
                  <h3 className={styles.articleTitle}>{item.title}</h3>
                  <p className={styles.featuredDescription}>{item.content}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      className={styles.contentLink}
                      target={item.link.startsWith('http') ? "_blank" : "_self"}
                    >
                      {item.linkText || (language === 'en' ? 'Read more' : 'Les mer')}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px' }}>
              <p>Ingen innhold funnet for "{activeTab}" {searchTerm ? `som matcher "${searchTerm}"` : ''}.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
