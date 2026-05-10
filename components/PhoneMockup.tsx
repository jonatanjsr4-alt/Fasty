export default function PhoneMockup() {
  return (
    <div style={{ width:280,background:'var(--dark2)',borderRadius:44,border:'1px solid rgba(255,255,255,0.1)',overflow:'hidden',boxShadow:'0 40px 80px rgba(0,0,0,0.6)',animation:'floatPhone 4s ease-in-out infinite',position:'relative',zIndex:2 }}>
      <div style={{ width:80,height:22,background:'var(--dark)',borderRadius:'0 0 16px 16px',position:'absolute',top:0,left:'50%',transform:'translateX(-50%)' }} />
      <div style={{ height:22 }} />
      <div style={{ padding:'10px 16px 0',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
        <div>
          <div style={{ color:'var(--muted)',fontSize:'0.7rem' }}>Buenos días 👋</div>
          <div style={{ fontFamily:'var(--font-display)',fontWeight:700,fontSize:'0.95rem' }}>Kevin C.</div>
        </div>
        <div style={{ width:32,height:32,borderRadius:'50%',background:'var(--orange)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.7rem',fontWeight:700 }}>KC</div>
      </div>
      <div style={{ margin:'12px 16px',background:'rgba(255,255,255,0.06)',borderRadius:12,padding:'10px 14px',fontSize:'0.75rem',color:'var(--muted)' }}>🔍 &nbsp;¿Qué se te antoja hoy?</div>
      <div style={{ display:'flex',gap:8,padding:'0 16px',overflow:'hidden' }}>
        {[{l:'🍕 Comida',a:true},{l:'🛒 Super',a:false},{l:'💊 Farma',a:false}].map(c=>(
          <div key={c.l} style={{ padding:'6px 12px',borderRadius:20,fontSize:'0.65rem',whiteSpace:'nowrap',background:c.a?'var(--orange)':'transparent',border:`1px solid ${c.a?'var(--orange)':'rgba(255,255,255,0.1)'}`,color:c.a?'var(--white)':'var(--muted)' }}>{c.l}</div>
        ))}
      </div>
      <div style={{ padding:'14px 16px 0',fontFamily:'var(--font-display)',fontWeight:700,fontSize:'0.8rem' }}>Destacados 🔥</div>
      <div style={{ display:'flex',gap:10,padding:'10px 16px',overflow:'hidden' }}>
        {[{e:'🍕',n:'Pizza Gold',t:'25 min'},{e:'🍔',n:'Burger House',t:'20 min'}].map(c=>(
          <div key={c.n} style={{ minWidth:120,background:'var(--dark3)',borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ width:'100%',height:70,background:'linear-gradient(135deg,#2a2a2a,#1a1a1a)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem' }}>{c.e}</div>
            <div style={{ padding:8 }}>
              <div style={{ fontSize:'0.65rem',fontWeight:600,marginBottom:2 }}>{c.n}</div>
              <div style={{ fontSize:'0.55rem',color:'var(--muted)',display:'flex',gap:6,alignItems:'center' }}>
                <span style={{ display:'inline-block',width:3,height:3,background:'var(--lime)',borderRadius:'50%',animation:'pulse 1.5s infinite' }} />
                {c.t} · ⭐4.9
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ margin:'14px 16px',background:'rgba(200,241,53,0.08)',border:'1px solid rgba(200,241,53,0.2)',borderRadius:14,padding:'10px 12px' }}>
        <div style={{ fontSize:'0.6rem',color:'var(--lime)',marginBottom:6,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em' }}>📦 Tu pedido en camino</div>
        <div style={{ background:'rgba(255,255,255,0.06)',borderRadius:4,height:4,marginBottom:6,overflow:'hidden' }}>
          <div style={{ height:'100%',background:'var(--lime)',borderRadius:4,animation:'trackFill 3s ease-in-out infinite alternate',width:'65%' }} />
        </div>
        <div style={{ fontSize:'0.6rem',color:'var(--muted)' }}>Llega en ~8 minutos</div>
      </div>
      <div style={{ height:40,display:'flex',alignItems:'center',justifyContent:'center',gap:28,borderTop:'1px solid rgba(255,255,255,0.05)',marginTop:8,paddingBottom:8 }}>
        {['🏠','🔍','🛒','👤'].map((ic,i)=>(
          <div key={ic} style={{ fontSize:'1rem',opacity:i===0?1:0.4,filter:i===0?'drop-shadow(0 0 8px var(--orange))':'none' }}>{ic}</div>
        ))}
      </div>
    </div>
  )
}