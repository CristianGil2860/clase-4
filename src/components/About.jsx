import { MapPin, GraduationCap, Briefcase, Languages, Download } from 'lucide-react'
import SectionHeader from './SectionHeader'

const INFO = [
  { icon: <MapPin size={20}/>,         label:'Ubicación',      value:'Buenos Aires, Argentina' },
  { icon: <GraduationCap size={20}/>,  label:'Educación',      value:'Ingeniería en Sistemas' },
  { icon: <Briefcase size={20}/>,      label:'Disponibilidad', value:'Proyectos freelance' },
  { icon: <Languages size={20}/>,      label:'Idiomas',        value:'Español · Inglés' },
]

export default function About() {
  return (
    <section id="sobre-mi" style={{ background:'#0f0f1a' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'5rem 2.5rem' }}>
        <SectionHeader tag="Sobre mí" title="¿Quién soy?" />

        <div className="cg-about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'start' }}>
          {/* Text */}
          <div>
            {[
              <>Soy <b style={{color:'#e2e2f0'}}>Cristian Gil</b>, un desarrollador web apasionado con experiencia en la creación de aplicaciones modernas. Me especializo en tecnologías como <b style={{color:'#e2e2f0'}}>React, Node.js, TypeScript</b> y diseño de interfaces con <b style={{color:'#e2e2f0'}}>Figma</b>.</>,
              <>Creo firmemente que el buen código y el buen diseño van de la mano. Mi objetivo es siempre ofrecer soluciones que sean tanto funcionales como visualmente atractivas.</>,
              <>Cuando no estoy codificando, me encontrarás explorando nuevas tecnologías, tomando cursos o compartiendo conocimiento con la comunidad de desarrollo.</>,
            ].map((text, i) => (
              <p key={i} style={{ color:'#8888aa', marginBottom:'1rem', lineHeight:1.7 }}>{text}</p>
            ))}
            <a href="#" download style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.75rem 1.75rem', borderRadius:99, background:'linear-gradient(135deg,#6c63ff,#574fd6)', color:'#fff', fontWeight:600, textDecoration:'none', boxShadow:'0 4px 20px rgba(108,99,255,0.4)', marginTop:'.5rem' }}>
              <Download size={16}/> Descargar CV
            </a>
          </div>

          {/* Cards */}
          <div className="cg-about-cards" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            {INFO.map(c => <InfoCard key={c.label} {...c} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoCard({ icon, label, value }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'.9rem', background:'#1e1e35', border:'1px solid rgba(108,99,255,0.2)', borderRadius:16, padding:'1rem 1.25rem', transition:'all .3s', cursor:'default' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor='#6c63ff'; e.currentTarget.style.transform='translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(108,99,255,0.2)'; e.currentTarget.style.transform='translateY(0)' }}>
      <span style={{ color:'#6c63ff', flexShrink:0 }}>{icon}</span>
      <div style={{ display:'flex', flexDirection:'column', gap:'.15rem' }}>
        <strong style={{ fontSize:'.85rem', color:'#e2e2f0' }}>{label}</strong>
        <span style={{ fontSize:'.8rem', color:'#8888aa' }}>{value}</span>
      </div>
    </div>
  )
}

