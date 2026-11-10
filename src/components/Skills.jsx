import { useState, useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'

const TABS = {
  frontend:    ['⚛️ React', '🟨 JavaScript', '🔷 TypeScript', '🌐 HTML5', '🎨 CSS3', '⚡ Vite', '💨 Tailwind CSS', '▲ Next.js'],
  backend:     ['🟢 Node.js', '🚂 Express', '🍃 MongoDB', '🐘 PostgreSQL', '🔥 Firebase', '🔗 REST APIs', '🔒 JWT / Auth'],
  herramientas:['🐙 Git', '🐱 GitHub', '🎨 Figma', '🐳 Docker', '☁️ Vercel', '📦 npm / yarn', '🧪 Jest'],
}

const TAB_LABELS = { frontend:'Frontend', backend:'Backend', herramientas:'Herramientas' }

const BARS = [
  { label:'Frontend',      pct:90 },
  { label:'Backend',       pct:75 },
  { label:'UI/UX Design',  pct:80 },
  { label:'Base de datos', pct:70 },
]

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend')
  const [animated, setAnimated]   = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="habilidades" style={{ background:'#161628' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'5rem 2.5rem' }}>
        <SectionHeader tag="Habilidades" title="¿Qué sé hacer?" />

        {/* Tabs */}
        <div style={{ display:'flex', justifyContent:'center', gap:'.75rem', marginBottom:'2rem', flexWrap:'wrap' }}>
          {Object.keys(TABS).map(key => (
            <button key={key} onClick={() => setActiveTab(key)} style={{
              padding:'.5rem 1.5rem', borderRadius:99,
              border:`2px solid ${activeTab===key ? '#6c63ff' : 'rgba(108,99,255,0.2)'}`,
              background: activeTab===key ? '#6c63ff' : 'transparent',
              color: activeTab===key ? '#fff' : '#8888aa',
              fontWeight:600, fontSize:'.9rem', cursor:'pointer', transition:'all .3s',
            }}>
              {TAB_LABELS[key]}
            </button>
          ))}
        </div>

        {/* Pills */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'.75rem', justifyContent:'center', marginBottom:'3rem' }}>
          {TABS[activeTab].map(skill => (
            <span key={skill} style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', background:'#1e1e35', border:'1px solid rgba(108,99,255,0.2)', color:'#e2e2f0', padding:'.5rem 1.1rem', borderRadius:99, fontSize:'.9rem', fontWeight:500, transition:'all .3s', cursor:'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#6c63ff'; e.currentTarget.style.color='#6c63ff'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(108,99,255,0.2)'; e.currentTarget.style.color='#e2e2f0'; e.currentTarget.style.transform='translateY(0)' }}>
              {skill}
            </span>
          ))}
        </div>

        {/* Skill bars */}
        <div ref={ref} style={{ maxWidth:600, margin:'0 auto', display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          {BARS.map(b => (
            <div key={b.label}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.9rem', fontWeight:500, marginBottom:'.4rem', color:'#e2e2f0' }}>
                <span>{b.label}</span><span>{b.pct}%</span>
              </div>
              <div style={{ height:8, background:'rgba(108,99,255,0.15)', borderRadius:99, overflow:'hidden' }}>
                <div style={{
                  height:'100%',
                  width: animated ? `${b.pct}%` : '0%',
                  background:'linear-gradient(90deg,#6c63ff,#ff6584)',
                  borderRadius:99,
                  transition:'width 1.2s cubic-bezier(.4,0,.2,1)',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

