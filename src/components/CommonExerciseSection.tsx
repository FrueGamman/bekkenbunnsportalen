"use client";

import { useTheme } from "../context/ThemeContext";
import styles from "../conditions/constipation/components/section-content.module.css";
import { SectionAccordion } from './SectionAccordion';

export interface ExerciseStep {
  number: number;
  text: string;
}

export interface GenderInstruction {
  title: string;
  text: string;
  icon: string;
  iconColor: string;
}

export interface Video {
  src: string;
  title: string;
}

export interface SmartphoneApps {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

export interface ExerciseSectionProps {
  pageTitle: string;
  tryYourselfTitle: string;
  step1Text: string;
  genderInstructions: GenderInstruction[];
  tipsTitle: string;
  tipsText: string;
  exerciseSteps: ExerciseStep[]; // Steps 2-5
  videoSectionTitle: string;
  videoSectionDescription?: string;
  videos: Video[];
  smartphoneApps?: SmartphoneApps;
}

export const CommonExerciseSection = ({
  pageTitle,
  tryYourselfTitle,
  step1Text,
  genderInstructions,
  tipsTitle,
  tipsText,
  exerciseSteps,
  videoSectionTitle,
  videoSectionDescription,
  videos,
  smartphoneApps
}: ExerciseSectionProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className={`${styles.sectionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon}>
          <img src="/exercises.png" alt="Exercises" width="24" height="24" />
        </div>
        <h2 className={styles.sectionTitle}>{pageTitle}</h2>
      </div>

      <div className={styles.sectionContent}>
        {/* Try Yourself Section */}
        <SectionAccordion 
          title={tryYourselfTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={false}
        >
          <div className={styles.normalFunctionContent}>
            <div className={styles.pelvicFloorExerciseSection}>              
              {/* Step 1 - Common instruction */}
              <div className={styles.exerciseStep}>
                <div className={styles.stepNumber}>1</div>
                <p className={styles.enhancedParagraph}>{step1Text}</p>
              </div>
              
              {/* Gender-specific instructions */}
              <div className={styles.genderInstructions}>
                {genderInstructions.map((gender, index) => (
                  <div key={index} className={styles.genderCard}>
                    <div className={styles.genderIcon}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: gender.iconColor }}>
                        {gender.icon}
                      </span>
                    </div>
                    <h6 className={styles.genderTitle}>{gender.title}</h6>
                    <p className={styles.genderText}>{gender.text}</p>
                  </div>
                ))}
              </div>
              
              {/* Tips section */}
              <div className={styles.tipsBox}>
                <h6 className={styles.tipsTitle}>{tipsTitle}</h6>
                <p className={styles.enhancedParagraph}>{tipsText}</p>
              </div>
              
              {/* Exercise steps 2-5 */}
              <div className={styles.exerciseSteps}>
                {exerciseSteps.map((step) => (
                  <div key={step.number} className={styles.exerciseStep}>
                    <div className={styles.stepNumber}>{step.number}</div>
                    <p className={styles.enhancedParagraph}>{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionAccordion>

        {/* Video Section */}
        <SectionAccordion 
          title={videoSectionTitle}
          isDarkMode={resolvedTheme === 'dark'}
          defaultOpen={true}
        >
          <div className={styles.normalFunctionContent}>
            {videoSectionDescription && (
              <p className={styles.enhancedParagraph} style={{ marginBottom: '1.5rem' }}>
                {videoSectionDescription}
              </p>
            )}
            
            {videos.map((video, index) => (
              <div 
                key={index} 
                className={styles.videoContainer}
              >
                <iframe
                  src={video.src}
                  title={video.title}
                  allowFullScreen
                  className={styles.videoIframe}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            ))}

            {smartphoneApps && (
              <div className={styles.highlightBox} style={{ marginTop: '1.5rem' }}>
                <p><strong>{smartphoneApps.title}</strong></p>
                <p>{smartphoneApps.description}</p>
                <p>
                  <a href={smartphoneApps.linkUrl} target="_blank" rel="noopener noreferrer">
                    {smartphoneApps.linkText}
                  </a>
                </p>
              </div>
            )}
          </div>
        </SectionAccordion>
      </div>
    </div>
  );
};



