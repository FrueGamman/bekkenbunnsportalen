import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import type { Tilstand } from "../types/cms";
import { getImageUrl } from "../lib/directus";
import styles from "../conditions/urinary-incontinence/components/section-content.module.css";

interface TilstandIntroductionProps {
    tilstand: Tilstand;
}

/** Build embed URL for Vimeo or YouTube (full URL or video ID). */
function getVideoEmbedUrl(videoId: string): string {
    if (!videoId) return "";
    const id = videoId.trim();
    if (id.startsWith("http")) {
        if (id.includes("youtube.com/embed/")) return id;
        if (id.includes("youtube.com/watch?v=")) {
            const match = id.match(/[?&]v=([^&]+)/);
            return match ? `https://www.youtube.com/embed/${match[1]}` : id;
        }
        if (id.includes("youtu.be/")) {
            const match = id.match(/youtu\.be\/([^?]+)/);
            return match ? `https://www.youtube.com/embed/${match[1]}` : id;
        }
        return id;
    }
    if (id.length === 11 && /^[a-zA-Z0-9_-]+$/.test(id)) {
        return `https://www.youtube.com/embed/${id}`;
    }
    return `https://player.vimeo.com/video/${id}?autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0`;
}

/**
 * Renders the introduction box ABOVE the section container.
 * Contains: side_intro description, Forekomst box, and video OR image (side-by-side with text).
 */
export const TilstandIntroduction = ({ tilstand }: TilstandIntroductionProps) => {
    const { language } = useLanguage();
    const { resolvedTheme } = useTheme();

    const sideIntro = (language === 'en' && tilstand.side_intro_en) || tilstand.side_intro;
    const hasSideIntro = !!sideIntro;
    const forekomstInnhold = (language === 'en' && tilstand.funksjon_forekomst_innhold_en) || tilstand.funksjon_forekomst_innhold;
    const hasForekomst = !!forekomstInnhold;
    const hasVideo = !!tilstand.funksjon_video_id;
    const hasImage = !!tilstand.side_intro_Image;

    if (!hasSideIntro && !hasForekomst && !hasVideo && !hasImage) return null;

    const videoEmbedUrl = hasVideo ? getVideoEmbedUrl(tilstand.funksjon_video_id!) : "";

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
                    {hasVideo && videoEmbedUrl ? (
                        <div className={styles.introVideoWrapper}>
                            <div className={styles.introVideoContainer}>
                                <iframe
                                    className={styles.introVideoIframe}
                                    src={videoEmbedUrl}
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
                    ) : hasImage ? (
                        <div className={styles.introImageWrapper}>
                            <img
                                src={getImageUrl(tilstand.side_intro_Image!)}
                                alt={tilstand.side_tittel || ""}
                                className={styles.introImage}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
