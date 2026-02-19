import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import type { Tilstand } from "../types/cms";
import styles from "../conditions/urinary-incontinence/components/section-content.module.css";

interface TilstandIntroductionProps {
    tilstand: Tilstand;
}

/**
 * Renders the introduction box ABOVE the section container,
 * matching the pattern of FecalIncontinenceIntroduction.
 * Contains: side_intro description, Forekomst box, and video.
 */
export const TilstandIntroduction = ({ tilstand }: TilstandIntroductionProps) => {
    const { language } = useLanguage();
    const { resolvedTheme } = useTheme();

    const sideIntro = (language === 'en' && tilstand.side_intro_en) || tilstand.side_intro;
    const hasSideIntro = !!sideIntro;
    const forekomstInnhold = (language === 'en' && tilstand.funksjon_forekomst_innhold_en) || tilstand.funksjon_forekomst_innhold;
    const hasForekomst = !!forekomstInnhold;
    const hasVideo = !!tilstand.funksjon_video_id;

    // Don't render anything if there's no intro content
    if (!hasSideIntro && !hasForekomst && !hasVideo) return null;

    return (
        <div className={`${styles.introductionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
            <div className={styles.introductionContent}>
                <div className={styles.introductionText}>
                    {hasSideIntro && (
                        <div
                            className={styles.introductionDescription}
                            dangerouslySetInnerHTML={{ __html: sideIntro! }}
                        />
                    )}
                    {hasForekomst && (
                        <div className={styles.prevalenceBox}>
                            <h3 className={styles.prevalenceTitle}>
                                {(language === 'en' && tilstand.funksjon_forekomst_tittel_en) || tilstand.funksjon_forekomst_tittel || (language === 'no' ? "Forekomst" : "Prevalence")}
                            </h3>
                            <div
                                className={styles.prevalenceText}
                                dangerouslySetInnerHTML={{ __html: forekomstInnhold! }}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.introductionImage}>
                    {hasVideo && (
                        <div className={styles.introVideoWrapper}>
                            <div className={styles.introVideoContainer}>
                                <iframe
                                    className={styles.introVideoIframe}
                                    src={tilstand.funksjon_video_id!.startsWith('http')
                                        ? tilstand.funksjon_video_id!
                                        : `https://player.vimeo.com/video/${tilstand.funksjon_video_id}?autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0`}
                                    title={tilstand.funksjon_video_tittel || "Video"}
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            {tilstand.funksjon_video_tittel && (
                                <p className={styles.introductionImageCaption}>
                                    {tilstand.funksjon_video_tittel}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
