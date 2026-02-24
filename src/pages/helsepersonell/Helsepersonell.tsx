"use client"
import React, { useState, useMemo } from "react"
import { useLanguage } from "../../context/LanguageContext"
import { Header } from "../../components/Header"
import Footer from "../../components/Footer"
import { usePageData } from "../../hooks/usePageData"
import { HeroSection } from "../../components/hero-section"
import styles from "./Helsepersonell.module.css"

export const Helsepersonell = () => {
    const { language } = useLanguage()
    const { data: pageData, loading, error } = usePageData("helsepersonell")
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("Alle")

    // Helper for bilingual content from the singleton fields
    const getTranslation = (key: string) => {
        const field_nb = `${key}_no` as keyof typeof pageData;
        const field_en = `${key}_en` as keyof typeof pageData;

        if (language === 'en') {
            return (pageData[field_en] || pageData[field_nb]) as string;
        }
        return (pageData[field_nb] || pageData[field_en]) as string;
    };

    // Move these into useMemo or after loading/error guards
    const heroTitle = !pageData ? (language === 'en' ? 'For healthcare professionals' : 'For helsepersonell') : (getTranslation('hero_tittel') || (language === 'en' ? 'For healthcare professionals' : 'For helsepersonell'));
    const heroDescription = pageData ? (getTranslation('hero_beskrivelse') || '') : '';
    const heroStatus = pageData ? (getTranslation('hero_status_melding') || '') : '';

    // Extract all items from block_card_grid sections
    const allItems = useMemo(() => {
        if (!pageData?.seksjoner) return [];

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

    // Categories for tabs
    const categories = useMemo(() => {
        const cats = [language === 'en' ? 'All' : 'Alle'];
        const uniqueCats = Array.from(new Set(allItems.map(i => i.category).filter(Boolean)));
        return [...cats, ...uniqueCats];
    }, [allItems, language]);

    // Filtered items
    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const matchesSearch =
                (item.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
                (item.content?.toLowerCase() || "").includes(searchTerm.toLowerCase());

            const matchesTab = activeTab === (language === 'en' ? 'All' : 'Alle') || item.category === activeTab;

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
                        placeholder={language === 'en' ? "Search for tools, courses..." : "Søk etter verktøy, kurs..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className={styles.searchIcon}>
                        <img src="/search.svg" alt="Search" className={styles.searchIconImage} />
                    </div>
                </div>

                <div className={styles.tabsContainer}>
                    <div className={styles.tabsList}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.tabButton} ${activeTab === cat ? styles.tabButtonActive : ''}`}
                                onClick={() => setActiveTab(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.contentCardsGrid}>
                    {filteredItems.map((item, idx) => (
                        <div key={idx} className={styles.contentCard}>
                            <div className={styles.contentCardContent}>
                                <div className={styles.contentCardHeader}>
                                    {item.category && <span className={styles.contentCardBadge}>{item.category}</span>}
                                </div>
                                <h3 className={styles.contentCardTitle}>{item.title}</h3>
                                <p className={styles.contentSectionDescription}>{item.content}</p>
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
                    {filteredItems.length === 0 && (
                        <div className={styles.noResults}>
                            <p className={styles.noResultsText}>Ingen treff på "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
