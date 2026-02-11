// src/components/Footer.tsx
"use client"
import { useLanguage } from "../context/LanguageContext"
import { useNavigate } from "react-router-dom"
import styles from "./Footer.module.css"

// Structured bilingual data for Footer
const FOOTER_DATA = {
  no: {
    title: "Bekkenbunnsportalen ",
    copyright: "© 2025 Bekkenbunnsportalen. Alle rettigheter forbeholdt.",
    quickLinks: "Hurtiglenker",
    contact: "Kontakt",
    legal: "Juridisk",
    contactDisclaimer: "Send aldri personopplysninger. Personlige spørsmål av medisinsk art kan dessverre ikke besvares per e-post.",
    nav: {
      conditions: "Helsetilstander",
      useful: "Nyttig informasjon", 
      professional: "For helsepersonell",
      about: "Om oss"
    },
  },
  en: {
    title: "Pelvic Floor Portal ",
    copyright: "© 2025 Pelvic Floor Portal. All rights reserved.",
    quickLinks: "Quick links",
    contact: "Contact",
    legal: "Legal",
    contactDisclaimer: "Never send personal information. Personal medical questions cannot unfortunately be answered by email.",
    nav: {
      conditions: "Conditions",
      useful: "Useful information",
      professional: "For healthcare professionals", 
      about: "About"
    },
  }
} as const

const Footer = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  
  const data = FOOTER_DATA[language]
  
  const footerLinks = {
    quickLinks: [
      { key: "conditions", label: data.nav.conditions },
      { key: "useful", label: data.nav.useful },
      { key: "professional", label: data.nav.professional },
      { key: "about", label: data.nav.about }
    ]
  }

  // Handle link clicks
  const handleLinkClick = (linkKey: string) => {
    if (linkKey === "conditions") {
      navigate("/conditions")
    } else if (linkKey === "useful") {
      navigate("/useful")
    } else if (linkKey === "professional") {
      navigate("/professional")
    } else if (linkKey === "about") {
      navigate("/about")
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand Section - Left Side */}
        <div className={styles.brandSection}>
          {/* Logo and Title at Top */}
          <div className={styles.brandHeader}>
            <a href="/" className={styles.logoLink}>
              <img className={styles.logo} alt={language === 'no' ? 'Bekkenbunnsportalen logo' : 'Pelvic Floor Portal logo'} src="/logopelvic.png" />
            </a>
            <div className={styles.brandTitleContainer}>
              <h3 className={styles.brandTitle}>{data.title}</h3>
            </div>
          </div>
          
          {/* Subtitle */}
          <div className={styles.brandContent}>
            <p className={styles.brandSubtitle}>
              {language === 'no' 
                ? 'Bekkenbunnsportalen presenteres av\nNasjonalt senter for Bekkenbunnshelse (NBH)\nUniversitetssykehuset Nord-Norge'
                : 'The Pelvic Floor Portal is presented by\nNational Center for Pelvic Floor Health (NBH)\nUniversity Hospital of Northern Norway'}
            </p>
          </div>
          
          {/* Copyright at Bottom */}
          <div className={styles.brandFooter}>
            <p className={styles.copyright}>{data.copyright}</p>
            <p className={styles.poweredBy}>Powered by <span><a href="http://www.cgamman.no" target="_blank" rel="noopener noreferrer" className={styles.cgammanLink}>CGamman AS</a></span></p>
          </div>
        </div>

        {/* Navigation Columns - Right Side */}
        <div className={styles.navigationGrid}>
          {/* Quick Links */}
          <div className={styles.navColumn}>
            <h4 className={styles.navTitle}>{data.quickLinks}</h4>
            <nav className={styles.navList}>
              {footerLinks.quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link.key)}
                  className={styles.navLink}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className={styles.navColumnWide}>
            <h4 className={styles.navTitle}>{data.contact}</h4>
            <nav className={`${styles.navList} ${styles.emailSection}`}>
              <a href="mailto:nbh@unn.no" className={`${styles.navLink} ${styles.emailLink}`}>
                nbh@unn.no
              </a>
            </nav>
            <p className={styles.contactDisclaimer}>
              {data.contactDisclaimer}
            </p>
            <nav className={styles.navList}>
              <a 
                href="https://www.unn.no/nbh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.navLink}
              >
                {language === 'no' ? 'NBH webside' : 'NBH website'}
              </a>
              <a 
                href="https://www.facebook.com/nbh.unn/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.navLink}
              >
                Facebook
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className={styles.navColumn}>
            <h4 className={styles.navTitle}>{data.legal}</h4>
            <nav className={styles.navList}>
              <a href="/personvern" className={styles.navLink}>
                {language === 'no' ? 'Personvern' : 'Privacy'}
              </a>
              <a href="/tilgjengelighet" className={styles.navLink}>
                {language === 'no' ? 'Tilgjengelighet' : 'Accessibility'}
              </a>
              <p className={styles.navLink}>
                {language === 'no' ? 'Bruksvilkår' : 'Terms of use'}
              </p>
            </nav>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer