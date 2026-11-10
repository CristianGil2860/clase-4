import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import Stats    from './components/Stats'
import About    from './components/About'
import Skills   from './components/Skills'
import Projects from './components/Projects'
import Contact  from './components/Contact'
import Footer   from './components/Footer'
import './index.css'

export default function App() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
        style={{
          position:'fixed', bottom:'2rem', right:'2rem',
          width:46, height:46, borderRadius:'50%',
          background:'#6c63ff', color:'#fff', border:'none',
          cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 4px 20px rgba(108,99,255,0.4)',
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? 'auto' : 'none',
          transform: showTop ? 'translateY(0)' : 'translateY(10px)',
          transition:'all .3s', zIndex:999,
        }}>
        <ChevronUp size={20}/>
      </button>
    </>
  )
}
