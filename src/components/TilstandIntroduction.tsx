import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import type { Tilstand } from "../types/cms";
import { getImageUrl } from "../lib/directus";
import styles from "../conditions/urinary-incontinence/components/section-content.module.css";

interface TilstandIntroductionProps {
    tilstand: Tilstand;
    activeSection?: string;
    stacked?: boolean;
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
export const TilstandIntroduction = ({ tilstand, activeSection = "normal-functions", stacked = false }: TilstandIntroductionProps) => {
    const { language } = useLanguage();
    const { resolvedTheme } = useTheme();

    const isSymptoms = activeSection === "symptoms";
    const isDiagnosis = activeSection === "diagnosis";
    const t = tilstand as Record<string, any>;

    let introKeyNo = "side_intro";
    let introKeyEn = "side_intro_en";

    if (isSymptoms) {
        introKeyNo = "symptomer_intro";
        introKeyEn = "symptomer_intro_en";
    } else if (isDiagnosis) {
        introKeyNo = "utredning_intro";
        introKeyEn = "utredning_intro_en";
    }

    const sideIntro = (language === 'en' && t[introKeyEn]) || t[introKeyNo];
    const hasSideIntro = !!sideIntro;

    const forekomstInnhold = (!isSymptoms && !isDiagnosis) ? ((language === 'en' && tilstand.funksjon_forekomst_innhold_en) || tilstand.funksjon_forekomst_innhold) : null;
    const hasForekomst = !!forekomstInnhold;

    let videoVal = tilstand.funksjon_video_id;
    if (isSymptoms) videoVal = tilstand.symptomer_video_url ?? null;
    else if (isDiagnosis) videoVal = null;
    const hasVideo = !!videoVal;

    let imageVal = tilstand.side_intro_Image;
    if (isSymptoms) imageVal = tilstand.symptomer_bilde_id;
    else if (isDiagnosis) imageVal = null;
    const hasImage = !!imageVal;

    let finalSideIntro = sideIntro;
    let extractedMedia: { type: 'img' | 'media'; src: string; alt: string; caption: string; html?: string } | null = null;

    if (sideIntro && !hasVideo && !hasImage) {
        try {
            const doc = new DOMParser().parseFromString(`<div>${sideIntro}</div>`, 'text/html');
            const root = doc.body.firstChild as HTMLElement;
            if (root) {
                const mediaEl = root.querySelector('img, iframe, video');
                if (mediaEl) {
                    const isImg = mediaEl.tagName === 'IMG';
                    let caption = '';
                    const figure = mediaEl.closest('figure');
                    if (figure) {
                        const fc = figure.querySelector('figcaption');
                        caption = fc?.textContent?.trim() || '';
                    }

                    if (isImg) {
                        const img = mediaEl as HTMLImageElement;
                        extractedMedia = {
                            type: 'img',
                            src: img.getAttribute('src') || '',
                            alt: img.getAttribute('alt') || caption,
                            caption
                        };
                    } else {
                        extractedMedia = {
                            type: 'media',
                            src: '',
                            alt: caption,
                            caption,
                            html: mediaEl.outerHTML
                        };
                    }

                    // Remove the media from HTML
                    mediaEl.remove();
                    // Clean up empty containers
                    root.querySelectorAll('figure, div, p').forEach(el => {
                        if (!el.textContent?.trim() && el.children.length === 0) el.remove();
                    });

                    finalSideIntro = root.innerHTML;
                }
            }
        } catch (e) {
            console.error('Error parsing side intro for images:', e);
        }
    }

    if (!finalSideIntro && !hasForekomst && !hasVideo && !hasImage && !extractedMedia) return null;

    const videoEmbedUrl = hasVideo ? getVideoEmbedUrl(videoVal!) : "";

    return (
        <div className={`${styles.introductionContainer} ${resolvedTheme === 'dark' ? styles.darkMode : ''} ${stacked ? styles.stackedLayout : ''}`}>
            <div className={styles.introductionContent}>
                <div className={styles.introductionText}>
                    {hasSideIntro && finalSideIntro && (
                        <div
                            className={styles.introductionDescription}
                            dangerouslySetInnerHTML={{ __html: finalSideIntro }}
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
                                    title={!isSymptoms && tilstand.funksjon_video_tittel ? tilstand.funksjon_video_tittel : "Video"}
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            {!isSymptoms && tilstand.funksjon_video_tittel && (
                                <p className={styles.introductionImageCaption}>
                                    {tilstand.funksjon_video_tittel}
                                </p>
                            )}
                        </div>
                    ) : hasImage ? (
                        <div className={styles.introImageWrapper}>
                            <img
                                src={getImageUrl(imageVal!)}
                                alt={tilstand.side_tittel || ""}
                                className={styles.introImage}
                            />
                        </div>
                    ) : extractedMedia ? (
                        <div className={styles.introImageWrapper}>
                            {extractedMedia.type === 'img' ? (
                                <img
                                    src={extractedMedia.src}
                                    alt={extractedMedia.alt}
                                    className={styles.introImage}
                                />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: extractedMedia.html || '' }} />
                            )}
                            {extractedMedia.caption && (
                                <p className={styles.introductionImageCaption}>{extractedMedia.caption}</p>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
