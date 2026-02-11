import { Header } from '../../components/Header'
import Hero from './components/Hero'
import Footer from '../../components/Footer'

export const ProfessionalSection = () => {
  return (
    <>
    <Header/>
    <div>
        <main id="main-content" role="main">
          <Hero />
        </main>
        <Footer/>
    </div>
    
    </>
  )
}
