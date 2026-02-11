"use client"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { LanguageSelector } from "./LanguageSelector"
import { useLanguage } from "../context/LanguageContext"

// Structured bilingual data for Header
const HEADER_DATA = {
  no: {
    skipToContent: "Hopp til hovedinnhold",
    nav: {
      home: "Hjem",
      anatomy: "Anatomi",
      conditions: "Tilstander",
      information: "Nyttig informasjon",
      about: "Om oss",
      help: "Hjelp",
      healthcare: "For helsepersonell"
    },
    search: {
      placeholder: "Søk på siden"
    }
  },
  en: {
    skipToContent: "Skip to main content",
    nav: {
      home: "Home",
      anatomy: "Anatomy",
      conditions: "Conditions",
      information: "Resources",
      about: "About",
      help: "Help",
      healthcare: "For Professionals"
    },
    search: {
      placeholder: "Search"
    }
  }
} as const
import { AccessibilityButton } from "./AccessibilityButton"
import { ThemeToggle } from "./ThemeToggle"
import styles from "./Header.module.css"
import Logo from "/logopelvic.png"

export const Header = () => {
  const { language } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()

  const data = HEADER_DATA[language]
  const brandName = language === 'no' ? 'Bekkenbunnsportalen' : 'Pelvic Floor Portal'
  const isHomePage = location.pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollThreshold = window.innerHeight * 0.2
      
      // Update scrolled state
      setIsScrolled(currentScrollY > scrollThreshold)
      
      // Show/hide header based on scroll direction
      if (currentScrollY < 100) {
        // Always show when near top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsVisible(false)
      } else {
        // Scrolling up - show header
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname.startsWith(path)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // For now, we'll use browser's native search (Ctrl+F equivalent)
      // Or redirect to a search results page if you have one
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`
      window.location.href = searchUrl
    }

  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as any)
    }
  }

  return (
    <header className={`${styles.header} ${styles.bgHeaderGradient} ${isScrolled ? styles.headerGlass : styles.headerTransparent} ${isVisible ? styles.headerVisible : styles.headerHidden}`}>
      {/* <a href="#main-content" className={styles.skipLink}>
        {data.skipToContent}
      </a> */}
      {/* Mobile Layout */}
      <div className={styles.mobileHeader}>
        <div className={styles.mobileLogoContainer}>
          <a href="/" onClick={closeMobileMenu}>
            <img src={Logo || "/placeholder.svg"} alt="Logo" className={styles.logo} />
          </a>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label={language === 'no' ? 'Åpne/lukk mobilmeny' : 'Toggle mobile menu'}
        >
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive : ""}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive : ""}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive : ""}`}></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`${styles.mobileDropdown} ${isMobileMenuOpen ? styles.mobileDropdownOpen : ""}`} aria-hidden={!isMobileMenuOpen} hidden={!isMobileMenuOpen}>
        <nav className={styles.mobileNav} aria-label={language === 'no' ? 'Mobil navigasjon' : 'Mobile navigation'} role="navigation">
          <a href="/" className={`${styles.mobileNavLink} ${isActive("/") ? styles.activeLink : ""}`} onClick={closeMobileMenu} aria-current={isActive("/") ? "page" : undefined} aria-label={language === 'no' ? 'Hjem - Gå til forsiden' : 'Home - Go to homepage'}>
            {data.nav.home}
          </a>
          {/* <a href="/anatomy" className={`${styles.mobileNavLink} ${isActive("/anatomy") ? styles.activeLink : ""}`} onClick={closeMobileMenu} aria-current={isActive("/anatomy") ? "page" : undefined} aria-label="Anatomi - Lær om bekkenbunnens anatomi">
            {data.nav.anatomy}
          </a> */}
          <a href="/conditions" className={`${styles.mobileNavLink} ${isActive("/conditions") ? styles.activeLink : ""}`} onClick={closeMobileMenu} aria-current={isActive("/conditions") ? "page" : undefined} aria-label={language === 'no' ? 'Helsetilstander - Se alle tilgjengelige helsetilstander' : 'Conditions - View all available conditions'}>
            {data.nav.conditions}
          </a>
          <a href="/useful" className={`${styles.mobileNavLink} ${isActive("/useful") ? styles.activeLink : ""}`} onClick={closeMobileMenu} aria-current={isActive("/useful") ? "page" : undefined} aria-label={language === 'no' ? 'Nyttig informasjon - Se nyttige ressurser og lenker' : 'Resources - View useful resources and links'}>
            {data.nav.information}
          </a>
          <a href="/about" className={`${styles.mobileNavLink} ${isActive("/about") ? styles.activeLink : ""}`} onClick={closeMobileMenu} aria-current={isActive("/about") ? "page" : undefined} aria-label={language === 'no' ? 'Om oss - Les mer om Bekkenbunnsportalen' : 'About - Learn more about the Pelvic Floor Portal'}>
            {data.nav.about}
          </a>
        </nav>

        <div className={styles.mobileActions}>
          <div className={styles.mobileThemeToggle} aria-hidden="true">
            <ThemeToggle />
          </div>
          <div className={styles.mobileLanguageSelector}>
            <LanguageSelector />
          </div>
          <div className={styles.mobileAccessibility}>
            <AccessibilityButton />
          </div>

          <div className={styles.mobileSearchContainer}>
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
              <Input
                className={styles.searchInput}
                placeholder={data.search.placeholder}
                aria-label={language === 'no' ? 'Søk på siden' : 'Search the site'}
                type="search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchKeyDown}
              />
              <button
                type="submit"
                className={styles.searchIcon}
                aria-label={language === 'no' ? 'Søk' : 'Search'}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <img className={styles.searchIconImage} alt={language === 'no' ? 'Søk' : 'Search'} src="/group.png" />
              </button>
            </form>
          </div>

          <Button className={styles.mobileHealthcareButton} onClick={closeMobileMenu}>
            <a href="/professional" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
              {data.nav.healthcare}
            </a>
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className={styles.desktopHeader}>
        <div className={styles.leftSection}>
          <div>
            <a href="/" className={styles.logoLink} aria-label={`${brandName} ${language === 'no' ? 'hjem' : 'home'}`}>
              <img src={Logo || "/placeholder.svg"} alt={brandName} className={styles.logo} />
            </a>
          </div>
          <nav className={styles.nav} aria-label={language === 'no' ? 'Hovednavigasjon' : 'Primary navigation'} role="navigation">
            <a href="/" className={`${styles.navLink} ${isActive("/") ? styles.activeLink : ""}`} aria-current={isActive("/") ? "page" : undefined} aria-label={language === 'no' ? 'Hjem - Gå til forsiden' : 'Home - Go to homepage'}>
              {data.nav.home}
            </a>
            {/* <a href="/anatomy" className={`${styles.navLink} ${isActive("/anatomy") ? styles.activeLink : ""}`} aria-current={isActive("/anatomy") ? "page" : undefined} aria-label="Anatomi - Lær om bekkenbunnens anatomi">
              {data.nav.anatomy}
            </a> */}
            <a href="/conditions" className={`${styles.navLink} ${isActive("/conditions") ? styles.activeLink : ""}`} aria-current={isActive("/conditions") ? "page" : undefined} aria-label={language === 'no' ? 'Helsetilstander - Se alle tilgjengelige helsetilstander' : 'Conditions - View all available conditions'}>
              {data.nav.conditions}
            </a>
            <a href="/useful" className={`${styles.navLink} ${isActive("/useful") ? styles.activeLink : ""}`} aria-current={isActive("/useful") ? "page" : undefined} aria-label={language === 'no' ? 'Nyttig informasjon - Se nyttige ressurser og lenker' : 'Resources - View useful resources and links'}>
              {data.nav.information}
            </a>
            <a href="/about" className={`${styles.navLink} ${isActive("/about") ? styles.activeLink : ""}`} aria-current={isActive("/about") ? "page" : undefined} aria-label={language === 'no' ? 'Om oss - Les mer om Bekkenbunnsportalen' : 'About - Learn more about the Pelvic Floor Portal'}>
              {data.nav.about}
            </a>
            {/* <a href="/professional" className={`${styles.navLink} ${styles.navPill} ${isActive("/professional") ? styles.activeLink : ""}`} aria-current={isActive("/professional") ? "page" : undefined} aria-label="For helsepersonell - Ressurser for helsepersonell">
              {data.nav.healthcare}
            </a> */}
            <a href="/personvern" className={`${styles.navLink} ${isActive("/personvern") ? styles.activeLink : ""}`} aria-label={language === 'no' ? 'Kontakt og hjelp' : 'Contact and help'}>
              {data.nav.help}
            </a>
          </nav>
        </div>
        <Button className={styles.healthcareButton}>
          <a href="/professional" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            {data.nav.healthcare}
          </a>
        </Button>
        <div className={styles.rightSection}>
          <div className={styles.desktopAccessibility}>
            <AccessibilityButton />
          </div>
          <ThemeToggle />
          <LanguageSelector />
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
              <Input
                className={styles.searchInput}
                placeholder={data.search.placeholder}
                aria-label={language === 'no' ? 'Søk på siden' : 'Search the site'}
                type="search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchKeyDown}
              />
              <button
                type="submit"
                className={styles.searchIcon}
                aria-label={language === 'no' ? 'Søk' : 'Search'}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <img className={styles.searchIconImage} alt={language === 'no' ? 'Søk' : 'Search'} src="/group.png" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}

