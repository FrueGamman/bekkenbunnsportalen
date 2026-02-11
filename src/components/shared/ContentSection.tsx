import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './content-section.module.css';

interface ContentSectionProps {
  contentFile: string;
  sectionType: 'intro' | 'symptoms' | 'treatment' | 'diagnosis' | 'exercises' | 'resources';
}

export const ContentSection: React.FC<ContentSectionProps> = ({ contentFile, sectionType }) => {
  const { t } = useLanguage();
  const [content, setContent] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadContent = async () => {
      try {
        // Dynamically import the content file
        const contentData = await import(`../content/${contentFile}`);
        setContent(contentData.default || contentData);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to load content from ${contentFile}:`, error);
        setLoading(false);
      }
    };

    loadContent();
  }, [contentFile]);

  if (loading) {
    return <div className={styles.loading}>{t('loading')}</div>;
  }

  if (!content) {
    return <div className={styles.error}>{t('error.general')}</div>;
  }

  const renderContent = () => {
    switch (sectionType) {
      case 'intro':
        return (
          <div className={styles.introSection}>
            <h2>{content.title}</h2>
            <div className={styles.textContent}>
              {content.paragraphs?.map((paragraph: any, index: number) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.text || paragraph }} />
              ))}
            </div>
            {content.images && (
              <div className={styles.images}>
                {content.images.map((image: any, index: number) => (
                  <img 
                    key={index}
                    src={image.local_path || image.src}
                    alt={image.alt}
                    className={styles.contentImage}
                  />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'symptoms':
        return (
          <div className={styles.symptomsSection}>
            <h2>{t('sections.symptoms')}</h2>
            <div className={styles.textContent}>
              {content.headings?.map((heading: any, index: number) => (
                <div key={index} className={styles.symptomGroup}>
                  <h3>{heading.text}</h3>
                </div>
              ))}
              <div dangerouslySetInnerHTML={{ __html: content.text_content }} />
            </div>
          </div>
        );
      
      case 'treatment':
        return (
          <div className={styles.treatmentSection}>
            <h2>{t('sections.treatment')}</h2>
            <div className={styles.textContent}>
              {content.headings?.map((heading: any, index: number) => (
                <div key={index} className={styles.treatmentOption}>
                  <h3>{heading.text}</h3>
                </div>
              ))}
              <div dangerouslySetInnerHTML={{ __html: content.text_content }} />
            </div>
            {content.images && (
              <div className={styles.treatmentImages}>
                {content.images.map((image: any, index: number) => (
                  <img 
                    key={index}
                    src={image.local_path || image.src}
                    alt={image.alt}
                    className={styles.treatmentImage}
                  />
                ))}
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <div className={styles.genericSection}>
            <h2>{content.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: content.text_content }} />
            {content.images && (
              <div className={styles.images}>
                {content.images.map((image: any, index: number) => (
                  <img 
                    key={index}
                    src={image.local_path || image.src}
                    alt={image.alt}
                    className={styles.contentImage}
                  />
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <section className={styles.contentSection}>
      {renderContent()}
      
      {content.links && content.links.length > 0 && (
        <div className={styles.relatedLinks}>
          <h3>{t('sections.related_links')}</h3>
          <ul>
            {content.links.slice(0, 5).map((link: any, index: number) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {content.pdf_files && content.pdf_files.length > 0 && (
        <div className={styles.resources}>
          <h3>{t('sections.resources')}</h3>
          <ul>
            {content.pdf_files.map((pdf: any, index: number) => (
              <li key={index}>
                <a href={pdf.local_path || pdf.original_url} target="_blank" rel="noopener noreferrer">
                  📄 {pdf.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
