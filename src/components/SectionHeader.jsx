export default function SectionHeader({ tag, title, desc }) {
  return (
    <div style={{ textAlign:'center', marginBottom:'3rem' }}>
      <span style={{ display:'inline-block', background:'rgba(108,99,255,0.15)', border:'1px solid rgba(108,99,255,0.3)', color:'#6c63ff', padding:'.3rem .9rem', borderRadius:99, fontSize:'.8rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'.08em', marginBottom:'.75rem' }}>
        {tag}
      </span>
      <h2 style={{ fontSize:'clamp(1.8rem,3vw,2.5rem)', fontWeight:800, color:'#fff' }}>{title}</h2>
      {desc && <p style={{ color:'#8888aa', marginTop:'.75rem', fontSize:'1.05rem' }}>{desc}</p>}
    </div>
  )
}

