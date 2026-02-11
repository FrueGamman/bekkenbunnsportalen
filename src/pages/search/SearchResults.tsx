import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Header } from "../../components/Header"
import Footer from "../../components/Footer"
import { useLanguage } from "../../context/LanguageContext"
import styles from "./SearchResults.module.css"

const SEARCH_DATA = {
  no: {
    title: "Søkeresultater",
    searchingFor: "Søker etter:",
    noResults: "Ingen resultater funnet",
    noResultsDescription: "Prøv å søke med andre søkeord eller naviger til en av våre hovedsider:",
    resultsFound: "resultater funnet",
    links: {
      home: "Hjem",
      conditions: "Tilstander",
      useful: "Nyttig informasjon",
      about: "Om oss"
    },
    loading: "Søker..."
  },
  en: {
    title: "Search Results",
    searchingFor: "Searching for:",
    noResults: "No results found",
    noResultsDescription: "Try searching with different keywords or navigate to one of our main pages:",
    resultsFound: "results found",
    links: {
      home: "Home",
      conditions: "Conditions",
      useful: "Useful information",
      about: "About"
    },
    loading: "Searching..."
  }
} as const

interface SearchResult {
  title: string
  url: string
  description: string
  type: 'page' | 'condition' | 'resource'
}

export const SearchResults = () => {
  const { language } = useLanguage()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(true)
  
  const data = SEARCH_DATA[language]

  useEffect(() => {
    // Simulate search - in a real app, this would query a search API
    const performSearch = async () => {
      setIsSearching(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock search results based on query
      const mockResults: SearchResult[] = []
      
      const searchLower = query.toLowerCase()
      
      // Search in conditions
      if (searchLower.includes('urin')) {
        mockResults.push({
          title: language === 'no' ? 'Urinlekkasje' : 'Urinary Incontinence',
          url: '/conditions/urinary-incontinence',
          description: language === 'no' 
            ? 'Informasjon om urinlekkasje, årsaker, symptomer og behandling.'
            : 'Information about urinary incontinence, causes, symptoms and treatment.',
          type: 'condition'
        })
      }
      
      if (searchLower.includes('smerter') || searchLower.includes('pain')) {
        mockResults.push({
          title: language === 'no' ? 'Langvarige underlivssmerter' : 'Chronic Pelvic Pain',
          url: '/conditions/pelvic-pain',
          description: language === 'no'
            ? 'Informasjon om langvarige underlivssmerter og behandlingsalternativer.'
            : 'Information about chronic pelvic pain and treatment options.',
          type: 'condition'
        })
      }
      
      if (searchLower.includes('graviditet') || searchLower.includes('pregnancy') || searchLower.includes('fødsel') || searchLower.includes('birth')) {
        mockResults.push({
          title: language === 'no' ? 'Plager under graviditet og etter fødsel' : 'Pregnancy and Postpartum Problems',
          url: '/conditions/pregnancy',
          description: language === 'no'
            ? 'Vanlige plager under graviditet og etter fødsel.'
            : 'Common problems during pregnancy and after childbirth.',
          type: 'condition'
        })
      }
      
      if (searchLower.includes('anatomi') || searchLower.includes('anatomy')) {
        mockResults.push({
          title: language === 'no' ? 'Anatomi og normal funksjon' : 'Anatomy and Normal Function',
          url: '/useful?tab=anatomi',
          description: language === 'no'
            ? 'Lær om bekkenbunnens anatomi og normale funksjon.'
            : 'Learn about pelvic floor anatomy and normal function.',
          type: 'page'
        })
      }
      
      if (searchLower.includes('øvelse') || searchLower.includes('exercise') || searchLower.includes('trening') || searchLower.includes('training')) {
        mockResults.push({
          title: language === 'no' ? 'Øvelser og trening' : 'Exercises and Training',
          url: '/useful?tab=anatomi',
          description: language === 'no'
            ? 'Øvelser for å styrke bekkenbunnen.'
            : 'Exercises to strengthen the pelvic floor.',
          type: 'resource'
        })
      }
      
      setResults(mockResults)
      setIsSearching(false)
    }
    
    if (query) {
      performSearch()
    } else {
      setIsSearching(false)
    }
  }, [query, language])

  return (
    <div className={styles.container}>
      <Header />
      
      <main id="main-content" role="main" className={styles.mainContent}>
        <div className={styles.searchResultsContainer}>
          <h1 className={styles.title}>{data.title}</h1>
          
          {query && (
            <p className={styles.searchQuery}>
              <strong>{data.searchingFor}</strong> "{query}"
            </p>
          )}
          
          {isSearching ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>{data.loading}</p>
            </div>
          ) : null}
          
          {!isSearching && results.length > 0 ? (
            <>
              <p className={styles.resultsCount}>
                {results.length} {data.resultsFound}
              </p>
              
              <div className={styles.results}>
                {results.map((result) => (
                  <a 
                    key={result.url} 
                    href={result.url} 
                    className={styles.resultCard}
                  >
                    <div className={styles.resultType}>
                      {result.type === 'condition' && '🏥'}
                      {result.type === 'page' && '📄'}
                      {result.type === 'resource' && '📚'}
                    </div>
                    <div className={styles.resultContent}>
                      <h2 className={styles.resultTitle}>{result.title}</h2>
                      <p className={styles.resultDescription}>{result.description}</p>
                      <span className={styles.resultUrl}>{result.url}</span>
                    </div>
                  </a>
                ))}
              </div>
            </>
          ) : null}
          
          {!isSearching && results.length === 0 ? (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h2 className={styles.noResultsTitle}>{data.noResults}</h2>
              <p className={styles.noResultsDescription}>{data.noResultsDescription}</p>
              
              <div className={styles.quickLinks}>
                <a href="/" className={styles.quickLink}>{data.links.home}</a>
                <a href="/conditions" className={styles.quickLink}>{data.links.conditions}</a>
                <a href="/useful" className={styles.quickLink}>{data.links.useful}</a>
                <a href="/about" className={styles.quickLink}>{data.links.about}</a>
              </div>
            </div>
          ) : null}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
