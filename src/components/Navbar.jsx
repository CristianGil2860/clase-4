import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#inicio',      label: 'Inicio' },
  { href: '#sobre-mi',    label: 'Sobre mí' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#proyectos',   label: 'Proyectos' },
  { href: '#contacto',    label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '1rem 2.5rem',
    background: scrolled ? 'rgba(15,15,26,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(108,99,255,0.2)' : 'none',
    transition: 'all .3s ease',
  }

  return (
    <nav style={navStyle}>
      {/* Brand */}
      <div style={{ display:'flex', alignItems:'center', gap:'.5rem', fontWeight:700, fontSize:'1.25rem', color:'#fff' }}>
        <span style={{ width:10, height:10, borderRadius:'50%', background:'#6c63ff', display:'inline-block', animation:'pulse 2s infinite' }} />
        Cristian Gil
      </div>

      {/* Desktop */}
      <ul className="cg-nav-desktop" style={{ listStyle:'none', display:'flex', gap:'2rem', margin:0, padding:0 }}>
        {NAV_LINKS.map(l => (
          <li key={l.href}>
            <a href={l.href} style={{ color:'#8888aa', fontWeight:500, fontSize:'.95rem', transition:'color .3s' }}
              onMouseEnter={e => (e.target.style.color = '#fff')}
              onMouseLeave={e => (e.target.style.color = '#8888aa')}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button className="cg-hamburger" onClick={() => setOpen(!open)}
        style={{ background:'none', border:'none', color:'#e2e2f0', cursor:'pointer', display:'none', alignItems:'center' }}>
        {open ? <X size={24}/> : <Menu size={24}/>}
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{ position:'absolute', top:'100%', left:0, right:0, background:'rgba(15,15,26,0.98)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(108,99,255,0.2)', padding:'1.5rem 2rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ color:'#e2e2f0', fontWeight:500, fontSize:'1rem' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

