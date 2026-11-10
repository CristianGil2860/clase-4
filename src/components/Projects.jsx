import { useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import SectionHeader from './SectionHeader'

const PROJECTS = [
  { title:'E-Commerce App',      desc:'Plataforma de comercio electrónico con carrito, pagos y panel de administración.', tags:['React','Node.js','MongoDB'],      emoji:'🛒', gradient:'linear-gradient(135deg,#667eea,#764ba2)' },
  { title:'Task Manager Pro',    desc:'Gestión de tareas con drag-and-drop, etiquetas y estadísticas.',                   tags:['Next.js','TypeScript','Tailwind'], emoji:'✅', gradient:'linear-gradient(135deg,#f093fb,#f5576c)' },
  { title:'Weather Dashboard',   desc:'Dashboard del clima en tiempo real con gráficos y múltiples ciudades.',            tags:['React','API REST','CSS3'],          emoji:'🌤️', gradient:'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { title:'Finance Tracker',     desc:'Rastreador de finanzas con gráficos, categorías y exportación a PDF.',             tags:['Vue.js','Firebase','Charts'],      emoji:'📈', gradient:'linear-gradient(135deg,#43e97b,#38f9d7)' },
  { title:'Chat en Tiempo Real', desc:'Mensajería con salas, notificaciones push y emojis.',                              tags:['Socket.io','Node.js','React'],     emoji:'💬', gradient:'linear-gradient(135deg,#fa709a,#fee140)' },
  { title:'Blog Personal',       desc:'Blog con soporte MDX, modo oscuro, SEO optimizado y comentarios.',                tags:['Next.js','MDX','Vercel'],          emoji:'✍️', gradient:'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
]

export default function Projects() {
  return (
    <section id="proyectos" style={{ background:'#0f0f1a' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'5rem 2.5rem' }}>
        <SectionHeader tag="Proyectos" title="Mi trabajo" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'1.5rem' }}>
          {PROJECTS.map(p => <ProjectCard key={p.title} {...p} />)}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ title, desc, tags, emoji, gradient }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:'#1e1e35',
        border:`1px solid ${hovered ? '#6c63ff' : 'rgba(108,99,255,0.2)'}`,
        borderRadius:16, overflow:'hidden',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(108,99,255,0.2)' : 'none',
        transition:'all .3s',
      }}>
      {/* Thumbnail */}
      <div style={{ height:160, background:gradient, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'3rem' }}>
        {emoji}
      </div>
      {/* Info */}
      <div style={{ padding:'1.25rem' }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem', marginBottom:'.75rem' }}>
          {tags.map(t => (
            <span key={t} style={{ background:'rgba(108,99,255,0.15)', color:'#6c63ff', fontSize:'.75rem', fontWeight:600, padding:'.2rem .6rem', borderRadius:99 }}>
              {t}
            </span>
          ))}
        </div>
        <h3 style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff', marginBottom:'.4rem' }}>{title}</h3>
        <p style={{ fontSize:'.88rem', color:'#8888aa', marginBottom:'1rem', lineHeight:1.6 }}>{desc}</p>
        <div style={{ display:'flex', gap:'1rem' }}>
          {[{ icon:<ExternalLink size={14}/>, text:'Demo' }, { icon:<Github size={14}/>, text:'Código' }].map(l => (
            <a key={l.text} href="#" style={{ display:'flex', alignItems:'center', gap:'.35rem', fontSize:'.85rem', fontWeight:600, color:'#6c63ff', textDecoration:'none' }}
              onMouseEnter={e => (e.currentTarget.style.color='#ff6584')}
              onMouseLeave={e => (e.currentTarget.style.color='#6c63ff')}>
              {l.icon} {l.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

