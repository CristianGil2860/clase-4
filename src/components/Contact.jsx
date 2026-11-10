import { useState } from 'react'
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react'
import SectionHeader from './SectionHeader'

const CONTACTS = [
  { icon:<Mail size={18}/>,     label:'Email',    value:'cristian@ejemplo.com', href:'mailto:cristian@ejemplo.com' },
  { icon:<Phone size={18}/>,    label:'Teléfono', value:'+54 9 11 0000-0000',   href:'tel:+5491100000000' },
  { icon:<Linkedin size={18}/>, label:'LinkedIn', value:'/in/cristian-gil',      href:'#' },
  { icon:<Github size={18}/>,   label:'GitHub',   value:'/cristian-gil',         href:'#' },
]

const EMPTY = { nombre:'', email:'', asunto:'', mensaje:'' }

export default function Contact() {
  const [form,   setForm]   = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | loading | done

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => {
      setStatus('done')
      setForm(EMPTY)
      setTimeout(() => setStatus('idle'), 4000)
    }, 1200)
  }

  return (
    <section id="contacto" style={{ background:'#161628' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'5rem 2.5rem' }}>
        <SectionHeader tag="Contacto" title="Hablemos 🚀" desc="¿Tenés un proyecto en mente? Me encantaría escucharte." />

        <div className="cg-contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'3rem', alignItems:'start' }}>
          {/* Info cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {CONTACTS.map(c => <ContactCard key={c.label} {...c} />)}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.1rem', background:'#1e1e35', border:'1px solid rgba(108,99,255,0.2)', borderRadius:16, padding:'2rem' }}>
            {['nombre','email','asunto'].map(name => (
              <Field key={name} name={name} value={form[name]} onChange={handleChange} />
            ))}
            <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
              <label style={labelSt}>Mensaje</label>
              <textarea name="mensaje" rows={5} placeholder="Contame tu idea..." value={form.mensaje} onChange={handleChange} required
                style={inputSt}
                onFocus={e => { e.target.style.borderColor='#6c63ff'; e.target.style.boxShadow='0 0 0 3px rgba(108,99,255,0.15)' }}
                onBlur={e =>  { e.target.style.borderColor='rgba(108,99,255,0.2)'; e.target.style.boxShadow='none' }}
              />
            </div>

            <button type="submit" disabled={status!=='idle'} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem', padding:'.85rem', borderRadius:99, border:'none', background:'linear-gradient(135deg,#6c63ff,#574fd6)', color:'#fff', fontWeight:600, fontSize:'.95rem', cursor: status!=='idle' ? 'not-allowed' : 'pointer', opacity: status!=='idle' ? .7 : 1, transition:'all .3s', fontFamily:'inherit' }}>
              <Send size={16}/>
              {status==='loading' ? 'Enviando...' : status==='done' ? '✅ Enviado' : 'Enviar mensaje'}
            </button>

            {status==='done' && (
              <div style={{ textAlign:'center', color:'#4ade80', fontSize:'.9rem', fontWeight:600, padding:'.5rem', background:'rgba(74,222,128,0.1)', borderRadius:8 }}>
                ✅ ¡Mensaje enviado! Te responderé pronto.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function ContactCard({ icon, label, value, href }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'1rem', background:'#1e1e35', border:'1px solid rgba(108,99,255,0.2)', borderRadius:16, padding:'1rem 1.25rem', transition:'all .3s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor='#6c63ff'; e.currentTarget.style.transform='translateX(4px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(108,99,255,0.2)'; e.currentTarget.style.transform='translateX(0)' }}>
      <div style={{ width:44, height:44, borderRadius:'50%', background:'rgba(108,99,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'#6c63ff', flexShrink:0 }}>
        {icon}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:'.15rem' }}>
        <strong style={{ fontSize:'.85rem', color:'#e2e2f0' }}>{label}</strong>
        <a href={href} style={{ fontSize:'.88rem', color:'#8888aa', textDecoration:'none', transition:'color .3s' }}
          onMouseEnter={e => (e.target.style.color='#6c63ff')}
          onMouseLeave={e => (e.target.style.color='#8888aa')}>
          {value}
        </a>
      </div>
    </div>
  )
}

const META = {
  nombre:  { label:'Nombre',  type:'text',  placeholder:'Tu nombre',       required:true  },
  email:   { label:'Email',   type:'email', placeholder:'tu@email.com',    required:true  },
  asunto:  { label:'Asunto',  type:'text',  placeholder:'¿De qué se trata?', required:false },
}

function Field({ name, value, onChange }) {
  const m = META[name]
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'.4rem' }}>
      <label style={labelSt}>{m.label}</label>
      <input type={m.type} name={name} placeholder={m.placeholder} value={value} onChange={onChange} required={m.required}
        style={inputSt}
        onFocus={e => { e.target.style.borderColor='#6c63ff'; e.target.style.boxShadow='0 0 0 3px rgba(108,99,255,0.15)' }}
        onBlur={e =>  { e.target.style.borderColor='rgba(108,99,255,0.2)'; e.target.style.boxShadow='none' }}
      />
    </div>
  )
}

const labelSt = { fontSize:'.85rem', fontWeight:600, color:'#e2e2f0' }
const inputSt  = { background:'#161628', border:'1px solid rgba(108,99,255,0.2)', borderRadius:10, color:'#e2e2f0', fontFamily:'inherit', fontSize:'.95rem', padding:'.75rem 1rem', outline:'none', resize:'vertical', transition:'border-color .3s, box-shadow .3s', width:'100%' }

