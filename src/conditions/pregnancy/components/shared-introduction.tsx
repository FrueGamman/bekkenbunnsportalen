"use client"

import { useLanguage } from '../../../context/LanguageContext'
import { useTheme } from '../../../context/ThemeContext'
import styles from './section-content.module.css'

const INTRODUCTION_DATA = {
  no: {
    title: 'Plager under graviditet og etter fødsel',
    subtitle: 'Endringer i bekkenbunnen under graviditet og fødsel',
    description: 'Under graviditet og fødsel skjer det endringer i bekkenbunnen som kan påvirke naturlige funksjoner som vannlatning, avføring og seksualfunksjon. De fleste endringene er vanlige og vil normalisere seg selv. Noen endringer kan oppleves plagsomme og trenger en mer aktiv tilnærming, enten igjennom tiltak du kan gjøre selv eller gjennom oppfølging av helsevesenet. Dersom plagene går ut over daglige gjøremål og livskvalitet bør du søke hjelp. På disse sidene finnes oversikt over vanlige plager, råd og behandling.',
    image: {
        src: 'https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/topp2-1024x514.jpg',
      alt: 'Gravid kvinne med hånden på magen',
      caption: 'Endringer i bekkenbunnen under graviditet er vanlige'
    }
  },
  en: {
    title: 'Problems During Pregnancy and After Childbirth',
    subtitle: 'Changes in the Pelvic Floor During Pregnancy and Childbirth',
    description: 'During pregnancy and childbirth, changes occur in the pelvic floor that can affect natural functions such as urination, bowel movements, and sexual function. Most changes are normal and will normalize themselves. Some changes can be bothersome and require a more active approach, either through measures you can take yourself or through follow-up from the healthcare system. If the problems affect daily activities and quality of life, you should seek help. On these pages you will find an overview of common problems, advice and treatment.',
    image: {
        src: 'https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/topp2-1024x514.jpg',
      alt: 'Pregnant woman with hand on belly',
      caption: 'Changes in the pelvic floor during pregnancy are common'
    }
  }
} as const

export const PregnancyIntroduction = () => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const introduction = INTRODUCTION_DATA[language]

  return (
    <div className={`${styles.introductionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.introductionContent}>
        <div className={styles.introductionText}>
          <p className={styles.introductionDescription}>{introduction.description}</p>
        </div>
        
        <div className={styles.introductionImage}>
          <div className={styles.introductionImageContainer}>
            <img
              src={introduction.image.src}
              alt={introduction.image.alt}
              className={styles.thumbnailImage}
            />
            <p className={styles.introductionImageCaption}>
              {introduction.image.caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
