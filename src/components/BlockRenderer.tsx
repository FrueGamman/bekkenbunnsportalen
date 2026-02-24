import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getImageUrl } from '../lib/directus';
import { HeroSection } from './hero-section';
import { SectionAccordion } from './SectionAccordion';
import { VideoPlayer } from './ui/VideoPlayer';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/Card';
import type { PageSection, BlockHero, BlockRichText, BlockAccordion, BlockImage, BlockLink, BlockVideo, BlockCardGrid } from '../types/cms';
import styles from './BlockRenderer.module.css';

interface BlockRendererProps {
    seksjoner: PageSection[];
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ seksjoner }) => {
    const { language } = useLanguage();

    if (!seksjoner || seksjoner.length === 0) return null;

    return (
        <div className={styles.blocksContainer}>
            {seksjoner.map((section, index) => {
                const { collection, item } = section;
                if (!item) return null;

                switch (collection) {
                    case 'block_hero':
                        return <RenderHero key={index} data={item as BlockHero} language={language} />;
                    case 'block_rich_text':
                        return <RenderRichText key={index} data={item as BlockRichText} language={language} />;
                    case 'block_accordion':
                        return <RenderAccordion key={index} data={item as BlockAccordion} language={language} />;
                    case 'block_image':
                        return <RenderImage key={index} data={item as BlockImage} language={language} />;
                    case 'block_link':
                        return <RenderLink key={index} data={item as BlockLink} language={language} />;
                    case 'block_video':
                        return <RenderVideo key={index} data={item as BlockVideo} language={language} />;
                    case 'block_card_grid':
                        return <RenderCardGrid key={index} data={item as BlockCardGrid} language={language} />;
                    default:
                        console.warn(`Unknown block collection: ${collection}`);
                        return null;
                }
            })}
        </div>
    );
};

const RenderHero: React.FC<{ data: BlockHero; language: string }> = ({ data, language }) => {
    const title = language === 'en' ? data.tittel_en || data.tittel_no : data.tittel_no;
    const subtitle = language === 'en' ? data.undertittel_en || data.undertittel_no : data.undertittel_no;
    const description = language === 'en' ? data.beskrivelse_en || data.beskrivelse_no : data.beskrivelse_no;

    return (
        <HeroSection
            cmsData={{
                title: title,
                subtitle: subtitle || '',
                description: description || ''
            }}
        />
    );
};

const RenderRichText: React.FC<{ data: BlockRichText; language: string }> = ({ data, language }) => {
    const title = language === 'en' ? data.tittel_en || data.tittel_no : data.tittel_no;
    const content = language === 'en' ? data.innhold_en || data.innhold_no : data.innhold_no;

    return (
        <section className={styles.richTextBlock}>
            {title && <h2 className={styles.blockTitle}>{title}</h2>}
            <div
                className={styles.richTextContent}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </section>
    );
};

const RenderAccordion: React.FC<{ data: BlockAccordion; language: string }> = ({ data, language }) => {
    const title = language === 'en' ? data.tittel_en || data.tittel_no : data.tittel_no;
    const intro = language === 'en' ? data.innhold_en || data.innhold_no : data.innhold_no;

    return (
        <section className={styles.accordionBlock}>
            {title && <h2 className={styles.blockTitle}>{title}</h2>}
            {intro && <div className={styles.blockIntro} dangerouslySetInnerHTML={{ __html: intro }} />}
            <div className={styles.accordionList}>
                {data.items?.map((item, idx) => {
                    const itemTitle = language === 'en' ? item.tittel_en || item.tittel_no : item.tittel_no;
                    const itemContent = language === 'en' ? item.innhold_en || item.innhold_no : item.innhold_no;
                    return (
                        <SectionAccordion key={idx} title={itemTitle} id={`acc-${idx}`}>
                            <div dangerouslySetInnerHTML={{ __html: itemContent }} />
                        </SectionAccordion>
                    );
                })}
            </div>
        </section>
    );
};

const RenderImage: React.FC<{ data: BlockImage; language: string }> = ({ data, language }) => {
    const caption = language === 'en' ? data.bildetekst_en || data.bildetekst_no : data.bildetekst_no;

    return (
        <div className={styles.imageBlock}>
            <img
                src={getImageUrl(data.bilde)}
                alt={caption || ''}
                className={styles.blockImage}
            />
            {caption && <p className={styles.imageCaption}>{caption}</p>}
        </div>
    );
};

const RenderLink: React.FC<{ data: BlockLink; language: string }> = ({ data, language }) => {
    const text = language === 'en' ? data.tekst_en || data.tekst_no : data.tekst_no;
    let url = data.url;

    if (data.type === 'internal_tilstand' && typeof data.lenke_tilstand === 'object' && data.lenke_tilstand !== null) {
        url = `/conditions/${(data.lenke_tilstand as any).slug}`;
    } else if (data.type === 'internal_side' && typeof data.lenke_side === 'object' && data.lenke_side !== null) {
        url = `/${(data.lenke_side as any).slug}`;
    }

    return (
        <div className={styles.linkBlock}>
            <a
                href={url}
                className={styles.linkButton}
                target={data.type === 'external' ? '_blank' : undefined}
                rel={data.type === 'external' ? 'noopener noreferrer' : undefined}
            >
                {text}
            </a>
        </div>
    );
};

const RenderVideo: React.FC<{ data: BlockVideo; language: string }> = ({ data, language }) => {
    const title = language === 'en' ? data.tittel_en || data.tittel_no : data.tittel_no;
    const videoUrl = data.video_type === 'vimeo' ? `https://vimeo.com/video/${data.video_id}` : undefined;
    const videoId = data.video_type === 'youtube' ? data.video_id : undefined;

    return (
        <section className={styles.videoBlock}>
            {title && <h2 className={styles.blockTitle}>{title}</h2>}
            <VideoPlayer
                videoId={videoId}
                videoUrl={videoUrl}
                title={title || ''}
            />
        </section>
    );
};

const RenderCardGrid: React.FC<{ data: BlockCardGrid; language: string }> = ({ data, language }) => {
    const title = language === 'en' ? data.tittel_en || data.tittel_no : data.tittel_no;

    return (
        <section className={styles.cardGridBlock}>
            {title && <h2 className={styles.blockTitle}>{title}</h2>}
            <div className={styles.cardGrid}>
                {data.items?.map((card, idx) => {
                    const category = language === 'en' ? card.overtittel_en || card.overtittel_no : card.overtittel_no;
                    const cardTitle = language === 'en' ? card.tittel_en || card.tittel_no : card.tittel_no;
                    const description = language === 'en' ? card.beskrivelse_en || card.beskrivelse_no : card.beskrivelse_no;
                    const linkText = language === 'en' ? card.lenke_tekst_en || card.lenke_tekst_no : card.lenke_tekst_no;

                    return (
                        <div key={idx} className={styles.card}>
                            <div className={styles.cardContent}>
                                {category && <div className={styles.cardBadge}>{category}</div>}
                                <h3 className={styles.cardTitle}>{cardTitle}</h3>
                                {description && (
                                    <p className={styles.cardDescription}>
                                        {description}
                                    </p>
                                )}
                                {card.lenke_url && (
                                    <a
                                        href={card.lenke_url}
                                        className={styles.cardLink}
                                        target={card.lenke_url.startsWith('http') ? "_blank" : "_self"}
                                        rel={card.lenke_url.startsWith('http') ? "noopener noreferrer" : ""}
                                    >
                                        {linkText || (language === 'en' ? 'Read more' : 'Les mer')}
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
