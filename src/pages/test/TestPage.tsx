import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';

export const TestPage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flex: 1, padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Test Side - Oversettelser og Design</h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <h2>Språktest</h2>
          <p>Nåværende språk: <strong>{language}</strong></p>
          <button onClick={() => setLanguage(language === 'no' ? 'en' : 'no')}>
            Bytt til {language === 'no' ? 'English' : 'Norsk'}
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2>Oversettelsestest</h2>
          <ul>
            <li>skip.to.content: "{t('skip.to.content')}"</li>
            <li>navigation.home: "{t('navigation.home')}"</li>
            <li>navigation.conditions: "{t('navigation.conditions')}"</li>
            <li>loading: "{t('loading')}"</li>
            <li>error.general: "{t('error.general')}"</li>
            <li>conditions.urinary_incontinence: "{t('conditions.urinary_incontinence')}"</li>
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2>CSS-variabel test</h2>
          <div className="text-primary" style={{ marginBottom: '1rem' }}>
            Tekst med --color-text-primary
          </div>
          <div className="text-secondary" style={{ marginBottom: '1rem' }}>
            Tekst med --color-text-secondary
          </div>
          <div className="bg-secondary" style={{ padding: '1rem', marginBottom: '1rem' }}>
            Bakgrunn med --color-bg-secondary
          </div>
          <div className="border-primary" style={{ border: '2px solid', padding: '1rem', marginBottom: '1rem' }}>
            Kant med --color-border-primary
          </div>
          <div className="shadow-md rounded-md" style={{ padding: '1rem', marginBottom: '1rem' }}>
            Skygge og avrundede hjørner
          </div>
        </div>

        <div>
          <h2>Tilstandslenker</h2>
          <ul>
            <li><a href="/conditions/urinary-incontinence">{t('conditions.urinary_incontinence')}</a></li>
            <li><a href="/conditions/pelvic-pain">{t('conditions.pelvic_pain')}</a></li>
            <li><a href="/conditions/constipation">{t('conditions.constipation')}</a></li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};
