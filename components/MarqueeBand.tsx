const ITEMS = ['Restaurantes','Supermercados','Farmacias','Licores','Moda','Belleza','Tecnología','Hogar','Salud','Cafeterías','Heladerías','Educación']

export default function MarqueeBand() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)',borderBottom:'1px solid rgba(255,255,255,0.05)',padding:'1.2rem 0',overflow:'hidden',background:'var(--dark2)' }}>
      <div style={{ display:'flex',gap:'3rem',animation:'marquee 18s linear infinite',whiteSpace:'nowrap' }}>
        {doubled.map((item,i)=>(
          <div key={i} style={{ fontFamily:'var(--font-display)',fontSize:'0.8rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--muted)',display:'flex',alignItems:'center',gap:'1rem' }}>
            {item}<span style={{ color:'var(--orange)',fontSize:'1.2rem' }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}