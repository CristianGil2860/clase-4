const STATS = [
  { number: '3+',  label: 'Años de experiencia' },
  { number: '25+', label: 'Proyectos completados' },
  { number: '15+', label: 'Clientes satisfechos' },
  { number: '∞',   label: 'Ganas de aprender' },
]

export default function Stats() {
  return (
    <section style={{ background:'#161628', padding:'3rem 2.5rem', borderTop:'1px solid rgba(108,99,255,0.2)', borderBottom:'1px solid rgba(108,99,255,0.2)' }}>
      <div className="cg-stats-grid" style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', textAlign:'center' }}>
        {STATS.map(s => (
          <div key={s.label} style={{ display:'flex', flexDirection:'column', gap:'.25rem' }}>
            <span style={{ fontSize:'2.5rem', fontWeight:800, background:'linear-gradient(135deg,#6c63ff,#ff6584)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              {s.number}
            </span>
            <span style={{ fontSize:'.9rem', color:'#8888aa' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

