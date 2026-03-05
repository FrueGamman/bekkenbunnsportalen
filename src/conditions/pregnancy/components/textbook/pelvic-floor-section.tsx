"use client"
import { useLanguage } from "../../../../context/LanguageContext"
import { useTheme } from "../../../../context/ThemeContext"
import { SectionAccordion } from "../../../../components/SectionAccordion"
import styles from "../section-content.module.css"
import { VideoPlayer } from "../../../../components/ui/VideoPlayer"
import { pelvicFloorData } from "../../../../data/textbook-section-data/pelvic-floor-data"


type PelvicFloorSectionProps = { dataNo?: unknown; dataEn?: unknown }

export const PelvicFloorSection = ({ dataNo, dataEn }: PelvicFloorSectionProps = {}) => {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  const data = dataNo != null && dataEn != null
    ? (language === "no" ? (dataNo as typeof pelvicFloorData.no) : (dataEn as typeof pelvicFloorData.en))
    : (language === "no" ? pelvicFloorData.no : pelvicFloorData.en)

  return (
    <div id="pelvic-floor">
      <SectionAccordion
        title={data.anatomyTitle}
        isDarkMode={resolvedTheme === 'dark'}
        defaultOpen={false}
        id="pelvic-floor-anatomy"
      >
        <div className={styles.normalFunctionContent}>
          <figure style={{
            margin: '20px auto 30px',
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <img
              src="https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/beken2.jpg"
              alt={data.anatomyImageCaption}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            />
            <figcaption className={styles.responsiveFigcaption} style={{
              fontStyle: 'italic',
              color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
            }}>
              {data.anatomyImageCaption}
            </figcaption>
          </figure>

          {data.anatomy.map((paragraph, index) => (
            <p key={index} className={styles.enhancedParagraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </SectionAccordion>

      <SectionAccordion
        title={data.trainingTitle}
        isDarkMode={resolvedTheme === 'dark'}
        defaultOpen={false}
        id="pelvic-floor-training"
      >
        <div className={styles.normalFunctionContent}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: '20px 0 30px'
          }}>
            <figure style={{
              margin: '0',
              flex: '1 1 300px',
              maxWidth: '400px',
              textAlign: 'center'
            }}>
              <img
                src="https://www.bekkenbunnsportalen.no/wp-content/uploads/2021/11/bekkenbunn.jpg"
                alt={data.imageCaption}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
              <figcaption className={styles.responsiveFigcaption} style={{
                fontStyle: 'italic',
                color: resolvedTheme === 'dark' ? '#a0a0a0' : '#666'
              }}>
                {data.imageCaption}
              </figcaption>
            </figure>

          </div>

          <p className={styles.enhancedParagraph}>{data.trainingIntro}</p>
          <p className={styles.enhancedParagraph}>{data.trainingBenefit}</p>

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.durationTitle}
          </h5>
          {data.duration.map((paragraph, index) => (
            <p key={index} className={styles.enhancedParagraph}>
              {paragraph}
            </p>
          ))}

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.exercisesTitle}
          </h5>
          <p className={styles.enhancedParagraph}>{data.exercisesIntro}</p>

          <ul className={styles.resourceList}>
            {data.exercises.map((exercise, index) => (
              <li key={index} className={styles.resourceListItem}>
                <strong>{exercise.title}</strong>
                <p className={styles.enhancedParagraph}>{exercise.content}</p>
                {exercise.tip && (
                  <p className={styles.enhancedParagraph} style={{ fontStyle: 'italic' }}>
                    {exercise.tip}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.instructionVideosTitle}
          </h5>
          <p className={styles.enhancedParagraph}>
            {data.instructionVideos}{' '}
            <a
              href={data.instructionVideosLink}
              className={styles.inlineLink}
            >
              {data.instructionVideosLinkText}
            </a>
          </p>

          <div className={styles.videoGallery}>
            <div className={styles.videoCard}>
              <VideoPlayer
                videoUrl={data.videoUnnUrl}
                title={data.videoUnnTitle}
                hideOverlay
              />
              <div className={styles.videoCardContent}>
                <h6 className={styles.videoCardTitle}>{data.videoUnnTitle}</h6>
                <p className={styles.videoCardDescription}>{data.videoUnnDescription}</p>
              </div>
            </div>
            <div className={styles.videoCard}>
              <VideoPlayer
                videoUrl={data.videoStOlavsUrl}
                title={data.videoStOlavsTitle}
                hideOverlay
              />
              <div className={styles.videoCardContent}>
                <h6 className={styles.videoCardTitle}>{data.videoStOlavsTitle}</h6>
                <p className={styles.videoCardDescription}>{data.videoStOlavsDescription}</p>
              </div>
            </div>
          </div>

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.pregnancyTitle}
          </h5>
          <p className={styles.enhancedParagraph}>{data.pregnancy}</p>

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.postpartumTitle}
          </h5>
          {data.postpartum.map((paragraph, index) => (
            <p key={index} className={styles.enhancedParagraph}>
              {paragraph}
            </p>
          ))}

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.noEffectTitle}
          </h5>
          {data.noEffect.map((paragraph, index) => (
            <p key={index} className={styles.enhancedParagraph}>
              {paragraph}
            </p>
          ))}

          <h5 className={styles.subsectionHeading} style={{ color: resolvedTheme === 'dark' ? '#6aaad6' : '#053870' }}>
            {data.tensionTitle}
          </h5>
          {data.tension.map((paragraph, index) => (
            <p key={index} className={styles.enhancedParagraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </SectionAccordion>
    </div>
  )
}

