/* Login (selección de perfil) y AppShell (sidebar + topbar) */

function Login({ onPick }) {
  const order = ['admin','directorio','calidad','comercial','produccion','rrhh','campo'];
  return (
    <div className="login">
      <div className="login-top">
        <VetLogoFull height={36} />
        <div className="row gap-12 text-muted" style={{fontSize:12.5}}>
          <span>v1.0 · demo</span>
          <span>·</span>
          <span>Soporte</span>
        </div>
      </div>
      <div className="login-main">
        <div className="login-card">
          <h1>Bienvenido a Ceribro</h1>
          <p className="lead">Sistema de gestión integral para Viveros El Tambo. Selecciona el perfil con el que deseas ingresar para acceder a las herramientas correspondientes a tu rol.</p>
          <div className="profile-grid">
            {order.map(k => {
              const p = PROFILES[k];
              return (
                <button key={k} className="profile-card" onClick={() => onPick(k)}>
                  <div className={"icon-wrap " + (p.iconClass || "")}>
                    <Icon name={p.icon} size={26} stroke={1.6} />
                  </div>
                  <div className="role-name">{p.nombre}</div>
                  <div className="role-desc">{p.desc}</div>
                  <div className="role-modules">
                    {p.badges.map((b,i) => <span key={i} className="chip chip-leaf">{b}</span>)}
                  </div>
                  <div className="arrow"><Icon name="arrow-up-right" size={18} /></div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="login-foot">
        <div>© 2026 Viveros El Tambo · Powered by Ceribro</div>
        <div className="row gap-12">
          <span>Términos</span><span>Privacidad</span><span>Soporte</span>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ profile, currentModule, setModule, onClose, isOpen }) {
  const mods = profile.modules.map(id => ({ id, ...MODULES[id] })).filter(m => m.label);
  // Group
  const groups = {};
  mods.forEach(m => { (groups[m.group] = groups[m.group] || []).push(m); });

  return (
    <aside className={"sidebar " + (isOpen ? 'open' : '')}>
      <div className="sidebar-brand">
        <div style={{
          width:36, height:36, borderRadius:10,
          background:'linear-gradient(135deg, #2f6324, #1c2a1f)',
          display:'grid', placeItems:'center', flexShrink:0
        }}>
          <VetLogo size={22} />
        </div>
        <div style={{minWidth:0}}>
          <div className="name">Ceribro</div>
          <div className="sub">Viveros El Tambo</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {Object.entries(groups).map(([g, arr]) => (
          <React.Fragment key={g}>
            <div className="sidebar-section">{g}</div>
            {arr.map(m => (
              <button key={m.id}
                className={"item " + (currentModule===m.id?'active':'')}
                onClick={() => { setModule(m.id); onClose && onClose(); }}>
                <Icon name={m.icon} size={17} className="ico" />
                <span>{m.label}</span>
                {m.id==='quality' && <span className="badge">3</span>}
              </button>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div className="sidebar-foot">
        <div className="avatar">{profile.avatar}</div>
        <div style={{minWidth:0, flex:1}}>
          <div className="role">{profile.nombre}</div>
          <div className="email" style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{profile.email}</div>
        </div>
        <button className="logout" title="Cerrar sesión" onClick={() => window.__logout && window.__logout()}>
          <Icon name="logout" size={16}/>
        </button>
      </div>
    </aside>
  );
}

function Topbar({ profile, currentModule, setModule, onMenu, onLogout }) {
  const m = MODULES[currentModule];
  const [notifOpen, setNotifOpen] = React.useState(false);
  return (
    <>
    <div className="topbar">
      <div className="breadcrumb">
        <span>{m?.group || 'Sistema'}</span>
        <Icon name="chevron-right" size={14}/>
        <span className="current">{m?.label || '—'}</span>
      </div>
      <div className="actions">
        <div className="search">
          <Icon name="search" size={15} />
          <input placeholder="Buscar lotes, clientes, contratos…" />
          <span className="chip" style={{padding:'1px 6px', fontSize:10.5}}>⌘K</span>
        </div>
        <button className="icon-btn" onClick={() => setNotifOpen(o=>!o)} title="Notificaciones">
          <Icon name="bell" size={17}/>
          <span className="dot"></span>
        </button>
        <div style={{position:'relative'}}>
          {notifOpen && (
            <div style={{
              position:'absolute', top:'calc(100% + 8px)', right:0, width:340,
              background:'#fff', border:'1px solid var(--line)', borderRadius:'var(--r-lg)',
              boxShadow:'var(--shadow-3)', zIndex:50, overflow:'hidden'
            }}>
              <div style={{padding:'12px 16px', borderBottom:'1px solid var(--line)', fontWeight:600, fontSize:13.5}}>Notificaciones</div>
              {NOTIFS.map((n,i) => (
                <div key={i} style={{padding:'12px 16px', borderBottom:i<NOTIFS.length-1?'1px solid var(--line)':'none', display:'flex', gap:10}}>
                  <div style={{
                    width:32, height:32, borderRadius:8,
                    background: n.tipo==='warn'?'var(--warn-bg)':n.tipo==='success'?'var(--success-bg)':'var(--info-bg)',
                    color: n.tipo==='warn'?'var(--warn)':n.tipo==='success'?'var(--success)':'var(--info)',
                    display:'grid', placeItems:'center', flexShrink:0
                  }}>
                    <Icon name={n.icon} size={16}/>
                  </div>
                  <div>
                    <div style={{fontSize:13, lineHeight:1.4}}>{n.titulo}</div>
                    <div style={{fontSize:11.5, color:'var(--muted)', marginTop:3}}>{n.tiempo}</div>
                  </div>
                </div>
              ))}
              <div style={{padding:'10px 16px', textAlign:'center', borderTop:'1px solid var(--line)', background:'var(--surface-2)'}}>
                <a style={{color:'var(--vet-leaf-dark)', fontSize:12.5, fontWeight:500, cursor:'pointer'}}>Ver todas</a>
              </div>
            </div>
          )}
        </div>
        <div style={{display:'flex', alignItems:'center', gap:10, paddingLeft:8, borderLeft:'1px solid var(--line)', height:36, marginLeft:4}}>
          <div className="avatar" style={{width:30, height:30, fontSize:12}}>{profile.avatar}</div>
          <div style={{lineHeight:1.2, fontSize:12.5}}>
            <div style={{fontWeight:600}}>{profile.nombre}</div>
            <div className="text-muted" style={{fontSize:11}}>En sesión</div>
          </div>
        </div>
      </div>
    </div>
    <div className="mobile-topbar">
      <button className="icon-btn" onClick={onMenu}><Icon name="menu" size={18}/></button>
      <div style={{minWidth:0, flex:1}}>
        <div style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.05em'}}>{m?.group}</div>
        <div style={{fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{m?.label}</div>
      </div>
      <button className="icon-btn"><Icon name="bell" size={17}/><span className="dot"></span></button>
      <button className="mobile-profile-btn" onClick={onLogout} title="Cambiar perfil">
        <span className="avatar" style={{width:28, height:28, fontSize:11}}>{profile.avatar}</span>
        <span>Cambiar</span>
      </button>
    </div>
    </>
  );
}

function AppShell({ profile, children, currentModule, setModule, onLogout }) {
  const [navOpen, setNavOpen] = React.useState(false);
  React.useEffect(() => { window.__logout = onLogout; }, [onLogout]);
  return (
    <div className="app">
      <div className={"scrim " + (navOpen?'show':'')} onClick={() => setNavOpen(false)}></div>
      <Sidebar profile={profile} currentModule={currentModule} setModule={setModule} onClose={() => setNavOpen(false)} isOpen={navOpen} />
      <main className="main">
        <Topbar profile={profile} currentModule={currentModule} setModule={setModule} onMenu={() => setNavOpen(true)} onLogout={onLogout} />
        <div className="content">
          {children}
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { Login, Sidebar, Topbar, AppShell });
