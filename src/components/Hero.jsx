import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'

const SOCIALS = [
  { icon: <Github size={18}/>,    href:'#', label:'GitHub' },
  { icon: <Linkedin size={18}/>,  href:'#', label:'LinkedIn' },
  { icon: <Twitter size={18}/>,   href:'#', label:'Twitter' },
  { icon: <Instagram size={18}/>, href:'#', label:'Instagram' },
]

export default function Hero() {
  return (
    <section id="inicio" className="cg-hero" style={{
      minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'space-between', padding:'7rem 2.5rem 4rem',
      position:'relative', overflow:'hidden', gap:'2rem', flexWrap:'wrap',
    }}>
      {/* Blobs */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0 }}>
        <Blob color="#6c63ff" size={500} top="-100px" left="-100px" anim="float1 8s ease-in-out infinite" />
        <Blob color="#ff6584" size={400} top="50%"   right="-50px" anim="float2 10s ease-in-out infinite" />
        <Blob color="#f7971e" size={300} bottom="-50px" left="40%" anim="float3 7s ease-in-out infinite" />
      </div>

      {/* Content */}
      <div style={{ position:'relative', zIndex:1, maxWidth:600 }}>
        <span style={{ display:'inline-block', background:'rgba(108,99,255,0.15)', border:'1px solid rgba(108,99,255,0.3)', color:'#6c63ff', padding:'.4rem 1rem', borderRadius:99, fontSize:'.85rem', fontWeight:500, marginBottom:'1.5rem' }}>
          👋 Hola, bienvenido a mi sitio
        </span>

        <h1 style={{ fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:800, lineHeight:1.1, color:'#fff', marginBottom:'1rem' }}>
          Soy{' '}
          <span style={{ background:'linear-gradient(135deg,#6c63ff 0%,#ff6584 50%,#f7971e 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Cristian Gil
          </span>
        </h1>

        <p style={{ fontSize:'1.2rem', fontWeight:600, color:'#8888aa', marginBottom:'.75rem' }}>
          Desarrollador Web Full Stack &amp; Diseñador UI/UX
        </p>
        <p style={{ color:'#8888aa', fontSize:'1rem', marginBottom:'2rem', maxWidth:480 }}>
          Creo experiencias digitales modernas, funcionales y con impacto.
          Me apasiona convertir ideas en productos reales.
        </p>

        <div className="cg-hero-actions" style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
          <a href="#proyectos" style={btnPrimary}>Ver proyectos</a>
          <a href="#contacto"  style={btnOutline}
            onMouseEnter={e => { e.currentTarget.style.background='#6c63ff'; e.currentTarget.style.color='#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#6c63ff' }}>
            Contactarme
          </a>
        </div>

        <div className="cg-hero-socials" style={{ display:'flex', gap:'.75rem' }}>
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} aria-label={s.label} style={socialIcon}
              onMouseEnter={e => { Object.assign(e.currentTarget.style, { background:'#6c63ff', color:'#fff', borderColor:'#6c63ff', transform:'translateY(-3px)' }) }}
              onMouseLeave={e => { Object.assign(e.currentTarget.style, { background:'#1e1e35', color:'#8888aa', borderColor:'rgba(108,99,255,0.2)', transform:'translateY(0)' }) }}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Avatar */}
      <div style={{ position:'relative', zIndex:1, flexShrink:0 }}>
        <div style={{ width:280, height:280, borderRadius:'50%', background:'linear-gradient(135deg,#6c63ff,#ff6584)', padding:4, boxShadow:'0 0 60px rgba(108,99,255,0.4)', animation:'cgRotate 20s linear infinite' }}>
          <div style={{ width:'100%', height:'100%', borderRadius:'50%', background:'#161628', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'5rem', fontWeight:800, color:'#fff', letterSpacing:-4 }}>
            CG
          </div>
        </div>
        <Badge text="💻 Full Stack" color="#6c63ff" pos={{ bottom:20, left:-40 }} />
        <Badge text="🎨 UI/UX"     color="#f7971e" pos={{ top:20,  right:-30 }} />
      </div>
    </section>
  )
}

function Blob({ color, size, anim, ...pos }) {
  return <div style={{ position:'absolute', width:size, height:size, borderRadius:'50%', background:color, filter:'blur(80px)', opacity:.15, animation:anim, ...pos }} />
}

function Badge({ text, color, pos }) {
  return (
    <div style={{ position:'absolute', display:'flex', alignItems:'center', gap:'.4rem', background:'#1e1e35', border:'1px solid rgba(108,99,255,0.2)', fontSize:'.8rem', fontWeight:600, padding:'.4rem .9rem', borderRadius:99, boxShadow:'0 8px 32px rgba(0,0,0,0.3)', whiteSpace:'nowrap', color, ...pos }}>
      {text}
    </div>
  )
}

const btnPrimary = {
  display:'inline-flex', alignItems:'center', gap:'.5rem',
  padding:'.75rem 1.75rem', borderRadius:99,
  background:'linear-gradient(135deg,#6c63ff,#574fd6)',
  color:'#fff', fontWeight:600, fontSize:'.95rem',
  boxShadow:'0 4px 20px rgba(108,99,255,0.4)', textDecoration:'none',
}

const btnOutline = {
  display:'inline-flex', alignItems:'center', gap:'.5rem',
  padding:'.75rem 1.75rem', borderRadius:99,
  background:'transparent', color:'#6c63ff',
  border:'2px solid #6c63ff',
  fontWeight:600, fontSize:'.95rem', textDecoration:'none', transition:'all .3s',
}

const socialIcon = {
  width:42, height:42, borderRadius:'50%',
  background:'#1e1e35', border:'1px solid rgba(108,99,255,0.2)',
  color:'#8888aa', display:'flex', alignItems:'center', justifyContent:'center',
  transition:'all .3s',
}

