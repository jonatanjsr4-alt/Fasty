'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contacto" style={{ borderTop:'1px solid rgba(255,255,255,0.06)',padding:'3rem 2rem 2rem',maxWidth:1300,margin:'0 auto' }}>
      <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'3rem',marginBottom:'3rem' }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)',fontWeight:800,fontSize:'1.5rem',marginBottom:'1rem' }}>FASTY</div>
          <p style={{ color:'var(--muted)',fontSize:'0.85rem',lineHeight:1.7,maxWidth:280 }}>Plataforma moderna de delivery y domicilios para restaurantes, supermercados y negocios locales en Quibdó.</p>
        </div>
        <FooterCol title="Navegación" links={[{l:'Inicio',h:'/'},{l:'Negocios',h:'/business'},{l:'Dashboard',h:'/dashboard'},{l:'Ingresar',h:'/auth'}]}/>
        <FooterCol title="Categorías" links={['Restaurantes','Supermercados','Farmacias','Licores','Moda'].map(l=>({l,h:'#'}))}/>
        <FooterCol title="Contacto" links={[{l:'Quibdó, Chocó',h:'#'},{l:'contacto@fasty.com',h:'mailto:contacto@fasty.com'},{l:'+57 300 000 0000',h:'tel:+573000000000'}]}/>
      </div>
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'1.5rem',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
        <div style={{ color:'var(--muted)',fontSize:'0.8rem' }}>© 2026 FASTY. Todos los derechos reservados.</div>
        <div style={{ color:'var(--muted)',fontSize:'0.8rem',display:'flex',alignItems:'center',gap:6 }}>
          Hecho con <span style={{ color:'var(--orange)' }}>❤️</span> en Quibdó, Colombia 🇨🇴
        </div>
      </div>
    </footer>
  )
}

function FooterCol({title,links}:{title:string,links:{l:string,h:string}[]}){
  return (
    <div>
      <div style={{ fontWeight:600,fontSize:'0.7rem',marginBottom:'1.2rem',color:'rgba(255,255,255,0.5)',textTransform:'uppercase',letterSpacing:'0.08em' }}>{title}</div>
      <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:'0.6rem' }}>
        {links.map(({l,h})=>(
          <li key={l}>
            <Link href={h} style={{ color:'var(--muted)',fontSize:'0.85rem',transition:'color 0.2s' }}
              onMouseEnter={e=>(e.currentTarget.style.color='var(--white)')}
              onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>{l}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}