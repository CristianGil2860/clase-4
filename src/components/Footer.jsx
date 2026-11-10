import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'

const SOCIALS = [
  { icon:<Github size={18}/>,    href:'#', label:'GitHub' },
  { icon:<Linkedin size={18}/>,  href:'#', label:'LinkedIn' },
  { icon:<Twitter size={18}/>,   href:'#', label:'Twitter' },
  { icon:<Instagram size={18}/>, href:'#', label:'Instagram' },
]

export default function Footer() {
  return (
    <footer style={{ background:'#0f0f1a', borderTop:'1px solid rgba(108,99,255,0.2)', padding:'1.75rem 2.5rem' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap' }}>
        <span style={{ fontSize:'.9rem', color:'#8888aa' }}>
          © 2024 <strong style={{ color:'#e2e2f0' }}>Cristian Gil</strong>. Hecho con ❤️ y mucho ☕
        </span>
        <div style={{ display:'flex', gap:'.75rem' }}>
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} aria-label={s.label} style={{ color:'#8888aa', fontSize:'1rem', transition:'color .3s' }}
              onMouseEnter={e => (e.currentTarget.style.color='#6c63ff')}
              onMouseLeave={e => (e.currentTarget.style.color='#8888aa')}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

