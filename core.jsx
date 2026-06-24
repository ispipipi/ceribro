/* Ceribro · shared utilities, icons, demo data
   Exposed on window so all babel scripts can use them. */

// ───────── Money / number formatters ─────────
const fmtCLP = (n) => {
  if (n === null || n === undefined || isNaN(n)) return "—";
  const v = Math.round(n);
  return "$" + v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const fmtNum = (n, decimals = 0) => {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return Number(n).toLocaleString("es-CL", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};
const fmtPct = (n, decimals = 1) => {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return Number(n).toLocaleString("es-CL", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + "%";
};

// ───────── VET Logo (SVG inline) ─────────
function VetLogo({ size = 28, mono = false, light = false }) {
  // Stylized recreation: orange sun behind two green leaves
  const sun = mono ? "currentColor" : "#d99441";
  const leafL = mono ? "currentColor" : "#6b7d3c";
  const leafR = mono ? "currentColor" : "#4a8b3a";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* sun arc */}
      <path d="M10 38 Q 32 0 54 38" stroke={sun} strokeWidth="5" strokeLinecap="round" fill="none" opacity={mono?0.7:1}/>
      {/* left leaf (olive) */}
      <path d="M14 50 C 14 30, 28 22, 36 36 C 32 50, 18 54, 14 50 Z" fill={leafL} />
      {/* right leaf (vivid green), slightly overlapping */}
      <path d="M50 50 C 50 28, 36 22, 28 36 C 32 52, 46 54, 50 50 Z" fill={leafR} />
    </svg>
  );
}

function VetLogoFull({ height = 32, light = false }) {
  const txt = light ? "#ffffff" : "#2a2e26";
  return (
    <div style={{display:"inline-flex", alignItems:"center", gap:10}}>
      <VetLogo size={height} />
      <div style={{display:"flex", flexDirection:"column", lineHeight:1}}>
        <div style={{fontFamily:"var(--font-display)", fontWeight:500, fontSize: height*0.55, color: txt, letterSpacing:".01em"}}>Ceribro</div>
        <div style={{fontSize: height*0.26, color: light?"rgba(255,255,255,.72)":"var(--muted)", letterSpacing:".1em", textTransform:"uppercase", marginTop:2, fontWeight:700}}>Powered by NPR</div>
        <div style={{fontSize: height*0.22, color: light?"rgba(255,255,255,.55)":"var(--muted)", letterSpacing:".12em", textTransform:"uppercase", marginTop:3, fontWeight:600}}>Viveros El Tambo</div>
      </div>
    </div>
  );
}

// ───────── Icons (lucide-style stroke icons) ─────────
const Icon = ({ name, size = 18, stroke = 1.8, className }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
    className,
  };
  switch (name) {
    case "dashboard": return (<svg {...props}><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>);
    case "contracts": return (<svg {...props}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M9 13h6M9 17h4"/></svg>);
    case "materials": return (<svg {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.27 6.96 8.73 5.05 8.73-5.05M12 22V12"/></svg>);
    case "calendar": return (<svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>);
    case "lots": return (<svg {...props}><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>);
    case "dds": return (<svg {...props}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>);
    case "quality": return (<svg {...props}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>);
    case "money": return (<svg {...props}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>);
    case "client": return (<svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>);
    case "postsale": return (<svg {...props}><path d="M3 3h18v6H3zM3 9v12h18V9"/><path d="M10 13h4"/></svg>);
    case "masters": return (<svg {...props}><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>);
    case "directory": return (<svg {...props}><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>);
    case "search": return (<svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>);
    case "bell": return (<svg {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>);
    case "logout": return (<svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></svg>);
    case "menu": return (<svg {...props}><path d="M3 6h18M3 12h18M3 18h18"/></svg>);
    case "x": return (<svg {...props}><path d="M18 6 6 18M6 6l12 12"/></svg>);
    case "plus": return (<svg {...props}><path d="M12 5v14M5 12h14"/></svg>);
    case "filter": return (<svg {...props}><path d="M3 4h18l-7 9v7l-4-2v-5z"/></svg>);
    case "download": return (<svg {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>);
    case "check": return (<svg {...props}><path d="M20 6 9 17l-5-5"/></svg>);
    case "check-circle": return (<svg {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>);
    case "alert": return (<svg {...props}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>);
    case "info": return (<svg {...props}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>);
    case "chevron-right": return (<svg {...props}><path d="m9 6 6 6-6 6"/></svg>);
    case "chevron-left": return (<svg {...props}><path d="m15 6-6 6 6 6"/></svg>);
    case "chevron-down": return (<svg {...props}><path d="m6 9 6 6 6-6"/></svg>);
    case "arrow-right": return (<svg {...props}><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
    case "arrow-up-right": return (<svg {...props}><path d="M7 17 17 7M7 7h10v10"/></svg>);
    case "trending-up": return (<svg {...props}><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>);
    case "trending-down": return (<svg {...props}><path d="M23 18l-9.5-9.5-5 5L1 6"/><path d="M17 18h6v-6"/></svg>);
    case "user": return (<svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a7 7 0 0 1 16 0v1"/></svg>);
    case "users": return (<svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
    case "settings": return (<svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>);
    case "leaf": return (<svg {...props}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.43 1.43 2.27 3.7 1.94 6.04C20.93 11.94 18 17 11 20z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>);
    case "sun": return (<svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>);
    case "sprout": return (<svg {...props}><path d="M7 20h10M10 20c5.5-2.5.42-6-1-9 2-2 4-1 5 0 1.5 1.5 1.5 4 0 5"/><path d="M9 11c-3-3-2-5-2-8 5 0 6 3 6 7"/></svg>);
    case "package": return (<svg {...props}><path d="m12 22 9-5V7l-9-5-9 5v10z"/><path d="m3.27 6.96 8.73 5.05 8.73-5.05M12 22V12"/></svg>);
    case "truck": return (<svg {...props}><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>);
    case "clipboard": return (<svg {...props}><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>);
    case "phone": return (<svg {...props}><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 18h2"/></svg>);
    case "mic": return (<svg {...props}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3M8 22h8"/></svg>);
    case "save": return (<svg {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>);
    case "edit": return (<svg {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
    case "trash": return (<svg {...props}><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
    case "eye": return (<svg {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>);
    case "clock": return (<svg {...props}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>);
    case "mail": return (<svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>);
    case "calendar-check": return (<svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4"/></svg>);
    case "map-pin": return (<svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
    case "camera": return (<svg {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>);
    case "wifi-off": return (<svg {...props}><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.58 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>);
    case "refresh": return (<svg {...props}><path d="M21 12a9 9 0 0 1-9 9c-2.39 0-4.68-.94-6.36-2.64L3 16M3 12a9 9 0 0 1 9-9c2.39 0 4.68.94 6.36 2.64L21 8M21 3v5h-5M3 21v-5h5"/></svg>);
    case "bar-chart": return (<svg {...props}><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></svg>);
    default: return (<svg {...props}><circle cx="12" cy="12" r="9"/></svg>);
  }
};

// ───────── Toast system ─────────
const ToastCtx = React.createContext(null);
function ToastProvider({ children }) {
  const [items, setItems] = React.useState([]);
  const push = React.useCallback((toast) => {
    const id = Math.random().toString(36).slice(2);
    setItems((s) => [...s, { id, ...toast }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), toast.duration || 3500);
  }, []);
  const api = React.useMemo(() => ({
    success: (title, msg) => push({ type: "success", title, msg }),
    error:   (title, msg) => push({ type: "error", title, msg }),
    info:    (title, msg) => push({ type: "info", title, msg }),
    warn:    (title, msg) => push({ type: "warn", title, msg }),
  }), [push]);
  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="toast-stack">
        {items.map((t) => (
          <div key={t.id} className={"toast " + (t.type || "")}>
            <Icon name={t.type==="error"?"alert":t.type==="warn"?"alert":t.type==="info"?"info":"check-circle"} size={18} />
            <div>
              <div className="ttitle">{t.title}</div>
              {t.msg && <div className="tmsg">{t.msg}</div>}
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
const useToast = () => React.useContext(ToastCtx);

// ───────── Demo data: Estado de Resultados ─────────
const CONTRATOS_ER = [
  {id:'C-001', cliente:'AIB',           productor:'IFG',       variedad:'Sweet Globe',        formato:'Bolsa',   plantas:20000, precio:4.20, insumos:0.54, mano:0.39, indirectos:0.48, fecha:'2025-08-12'},
  {id:'C-002', cliente:'SAMNSA',        productor:'IFG',       variedad:'Sweet Globe',        formato:'Bolsa',   plantas:30000, precio:4.20, insumos:0.54, mano:0.39, indirectos:0.48, fecha:'2025-08-22'},
  {id:'C-003', cliente:'Danper',        productor:'IFG',       variedad:'Sweet Celebration',  formato:'Bolsa',   plantas:62070, precio:4.10, insumos:0.56, mano:0.41, indirectos:0.49, fecha:'2025-09-01'},
  {id:'C-004', cliente:'Don Guillermo', productor:'Sun World', variedad:'Autumn Crisp',       formato:'Bolsa',   plantas:64240, precio:4.00, insumos:0.57, mano:0.40, indirectos:0.49, fecha:'2025-09-05'},
  {id:'C-005', cliente:'Don Guillermo', productor:'Sun World', variedad:'Autumn Crisp',       formato:'Barbada', plantas:50000, precio:2.10, insumos:0.31, mano:0.46, indirectos:0.23, fecha:'2025-09-18'},
  {id:'C-006', cliente:'Don Luis',      productor:'Sun World', variedad:'Autumn Crisp',       formato:'Bolsa',   plantas:34000, precio:4.00, insumos:0.57, mano:0.40, indirectos:0.49, fecha:'2025-10-02'},
  {id:'C-007', cliente:'Agrolatina',    productor:'SNFL',      variedad:'Timpson',            formato:'Bolsa',   plantas:62832, precio:4.30, insumos:0.55, mano:0.38, indirectos:0.48, fecha:'2025-10-12'},
  {id:'C-008', cliente:'Agrolatina',    productor:'SNFL',      variedad:'Ruby Rush',          formato:'Bolsa',   plantas:38080, precio:4.20, insumos:0.55, mano:0.38, indirectos:0.48, fecha:'2025-10-22'},
  {id:'C-009', cliente:'Parvina',       productor:'Itum',      variedad:'Itum 16',            formato:'Bolsa',   plantas:12000, precio:4.10, insumos:0.56, mano:0.39, indirectos:0.48, fecha:'2025-11-03'},
  {id:'C-010', cliente:'Agrolatina',    productor:'Sun World', variedad:'Sugra 54',           formato:'Barbada', plantas:57120, precio:2.20, insumos:0.30, mano:0.45, indirectos:0.22, fecha:'2025-11-18'},
  {id:'C-011', cliente:'Florida Blanca',productor:'Sun World', variedad:'Autumn Crisp',       formato:'Barbada', plantas:12958, precio:2.10, insumos:0.31, mano:0.46, indirectos:0.23, fecha:'2025-12-02'},
  {id:'C-012', cliente:'Florida Blanca',productor:'SNFL',      variedad:'Ruby Rush',          formato:'Barbada', plantas:12848, precio:2.10, insumos:0.30, mano:0.45, indirectos:0.22, fecha:'2025-12-15'},
];

function calcContrato(c){
  const ingresos = c.plantas * c.precio;
  const insumos = c.plantas * c.insumos;
  const mano = c.plantas * c.mano;
  const indirectos = c.plantas * c.indirectos;
  const directos = insumos + mano;
  const margen = ingresos - directos - indirectos;
  return { ingresos, insumos, mano, indirectos, directos, margen };
}

function aggregateER(rows){
  const a = { ingresos:0, insumos:0, mano:0, indirectos:0, plantas:0, contratos: rows.length };
  rows.forEach(r => {
    const k = calcContrato(r);
    a.ingresos += k.ingresos;
    a.insumos += k.insumos;
    a.mano += k.mano;
    a.indirectos += k.indirectos;
    a.plantas += r.plantas;
  });
  a.directos = a.insumos + a.mano;
  a.resultado = a.ingresos - a.directos - a.indirectos;
  a.margenPct = a.ingresos ? (a.resultado / a.ingresos) * 100 : 0;
  return a;
}

// ───────── Lots / DDS demo ─────────
const LOTES = [
  { id:'L-2025-001', cliente:'Agrolatina',    variedad:'Timpson',          plantas:62832, dds: 42, estado:'Brotamiento',     calidad:'OK',   ubicacion:'Sector A-3' },
  { id:'L-2025-002', cliente:'Don Guillermo', variedad:'Autumn Crisp',     plantas:64240, dds: 28, estado:'Siembra',         calidad:'OK',   ubicacion:'Sector B-1' },
  { id:'L-2025-003', cliente:'Danper',        variedad:'Sweet Celebration',plantas:62070, dds: 65, estado:'Clasificación',   calidad:'Alerta', ubicacion:'Sector A-1' },
  { id:'L-2025-004', cliente:'AIB',           variedad:'Sweet Globe',      plantas:20000, dds: 78, estado:'Clasificación',   calidad:'OK',   ubicacion:'Sector C-2' },
  { id:'L-2025-005', cliente:'SAMNSA',        variedad:'Sweet Globe',      plantas:30000, dds: 14, estado:'Injertación',     calidad:'OK',   ubicacion:'Sector D-1' },
  { id:'L-2025-006', cliente:'Don Luis',      variedad:'Autumn Crisp',     plantas:34000, dds: 95, estado:'Despacho',        calidad:'OK',   ubicacion:'Sector B-2' },
  { id:'L-2025-007', cliente:'Agrolatina',    variedad:'Ruby Rush',        plantas:38080, dds: 56, estado:'Brotamiento',     calidad:'OK',   ubicacion:'Sector E-1' },
  { id:'L-2025-008', cliente:'Parvina',       variedad:'Itum 16',          plantas:12000, dds: 22, estado:'Siembra',         calidad:'Crítico', ubicacion:'Sector A-2' },
  { id:'L-2025-009', cliente:'Don Guillermo', variedad:'Autumn Crisp',     plantas:50000, dds: 35, estado:'Brotamiento',     calidad:'OK',      ubicacion:'Sector B-3' },
  { id:'L-2025-011', cliente:'Agrolatina',    variedad:'Timpson',          plantas:28500, dds: 88, estado:'Cosecha',         calidad:'OK',      ubicacion:'Sector E-2' },
];

const MATERIALES = [
  { sku:'M-001', nombre:'Bolsa polietileno 4L',   stock: 482000, minimo: 100000, unidad:'un', categoria:'Envases' },
  { sku:'M-002', nombre:'Sustrato turba premium', stock: 18400, minimo: 5000, unidad:'kg', categoria:'Sustrato' },
  { sku:'M-003', nombre:'Fertilizante NPK 15-15-15', stock: 2400, minimo: 800, unidad:'kg', categoria:'Fertilizantes' },
  { sku:'M-004', nombre:'Cinta de injerto biodegradable', stock: 12300, minimo: 5000, unidad:'m', categoria:'Insumos' },
  { sku:'M-005', nombre:'Patrón Salt Creek',      stock: 56000, minimo: 30000, unidad:'un', categoria:'Patrones' },
  { sku:'M-006', nombre:'Patrón Freedom',         stock: 8200,  minimo: 20000, unidad:'un', categoria:'Patrones' },
  { sku:'M-007', nombre:'Pack injertación (set)', stock: 142, minimo: 100, unidad:'set', categoria:'Herramientas' },
  { sku:'M-008', nombre:'Bandejas siembra 50c',   stock: 6840, minimo: 2000, unidad:'un', categoria:'Envases' },
  { sku:'M-009', nombre:'Jabas plásticas',        stock: 820, minimo: 300, unidad:'un', categoria:'Envases' },
];

const CLIENTES_LIST = [
  { nombre:'Agrolatina',     contacto:'María Rivas',      email:'mrivas@agrolatina.cl',     tel:'+56 9 7654 1023', region:'Atacama',     contratos: 3 },
  { nombre:'AIB',            contacto:'Pedro Soto',       email:'psoto@aib.com',            tel:'+56 9 8821 0451', region:'Coquimbo',    contratos: 1 },
  { nombre:'Danper',         contacto:'Lucía Tapia',      email:'ltapia@danper.com',        tel:'+51 9 4421 0021', region:'Trujillo, PE',contratos: 1 },
  { nombre:'Don Guillermo',  contacto:'Guillermo Ortiz',  email:'gortiz@dongmo.cl',         tel:'+56 9 7401 2233', region:'O\'Higgins',  contratos: 2 },
  { nombre:'Don Luis',       contacto:'Luis Pacheco',     email:'lpacheco@donluis.cl',      tel:'+56 9 6610 4421', region:'Maule',       contratos: 1 },
  { nombre:'Florida Blanca', contacto:'Romina Vega',      email:'rvega@floridablanca.cl',   tel:'+56 9 7720 8830', region:'Atacama',     contratos: 2 },
  { nombre:'Parvina',        contacto:'Andrés Gallardo',  email:'agallardo@parvina.cl',     tel:'+56 9 4452 0011', region:'Coquimbo',    contratos: 1 },
  { nombre:'SAMNSA',         contacto:'Julieta Rey',      email:'jrey@samnsa.com.mx',       tel:'+52 1 5544 7811', region:'Sonora, MX',  contratos: 1 },
];

const POSTVENTA = [
  { id:'PV-024', cliente:'Don Guillermo', lote:'L-2025-002', motivo:'Recalce - mortandad post-plantación', plantas: 1280, estado:'Aprobado',      fecha:'2026-01-12', despacho:'2026-01-26' },
  { id:'PV-025', cliente:'Agrolatina',    lote:'L-2025-001', motivo:'Cambio de variedad por solicitud',     plantas: 320,  estado:'En revisión',   fecha:'2026-02-03' },
  { id:'PV-026', cliente:'Florida Blanca',lote:'L-2025-011', motivo:'Recalce barbadas',                     plantas: 940,  estado:'Aprobado',      fecha:'2026-02-20', despacho:'2026-03-04' },
  { id:'PV-027', cliente:'AIB',           lote:'L-2025-004', motivo:'Reclamo calidad - daño nematodos',     plantas: 220,  estado:'Pendiente',     fecha:'2026-03-04' },
];

const ACTIVITY_TASKS = [
  { id:'ACT-001', fecha:'2026-05-03', tipo:'Uso material', actividad:'Injertación AIB', responsable:'Sala injertación', lote:'L-2025-004', material:'Cinta de injerto biodegradable', cantidad:1800, unidad:'m', estado:'Planificada', impacto:'descuento_bodega', alarma:'Descontar bodega al ejecutar' },
  { id:'ACT-002', fecha:'2026-05-05', tipo:'Recepción', actividad:'Ingreso patrones Salt Creek', responsable:'Bodega', lote:'PAT-SC-07', material:'Patrón Salt Creek', cantidad:24000, unidad:'un', estado:'Confirmada', impacto:'utilizacion_anunciada', alarma:'Actualiza disponibilidad de patrones' },
  { id:'ACT-003', fecha:'2026-05-12', tipo:'Uso material', actividad:'Siembra Agrolatina', responsable:'Producción', lote:'L-2025-001', material:'Bolsa polietileno 4L', cantidad:62832, unidad:'un', estado:'Planificada', impacto:'stock_out', alarma:'Riesgo de quiebre si no llega reposición' },
  { id:'ACT-004', fecha:'2026-05-15', tipo:'Control', actividad:'Auditoría de sustrato', responsable:'Calidad', lote:'BOD-01', material:'Sustrato turba premium', cantidad:1200, unidad:'kg', estado:'Pendiente', impacto:'alarma_general', alarma:'Validar humedad antes de uso' },
];

// Notifications demo
const NOTIFS = [
  { titulo:'Stock bajo: Patrón Freedom', tiempo:'hace 12 min', tipo:'warn', icon:'package' },
  { titulo:'Liberación calidad lote L-2025-003 requiere visado', tiempo:'hace 1 h', tipo:'info', icon:'quality' },
  { titulo:'Contrato C-009 firmado por Parvina', tiempo:'hace 2 h', tipo:'success', icon:'contracts' },
  { titulo:'Postventa PV-027 ingresada', tiempo:'hace 4 h', tipo:'info', icon:'postsale' },
];

// ───────── Profiles ─────────
const PROFILES = {
  admin: {
    id:'admin',
    nombre:'Gerencia',
    desc:'Acceso completo a los cuadros ejecutivos y módulos operacionales del sistema.',
    icon:'settings',
    iconClass:'',
    badges:['Todo el sistema','Gerencia 2026'],
    avatar:'GE', email:'gerencia@viveroseltambo.cl',
    modules:['dashboard','contracts','process-room','vid','sombreadero','parrones','riego','materials','logistics','activities','calendar','lots','quality','money','client','postsale','hr','masters','directory'],
  },
  directorio: {
    id:'directorio',
    nombre:'Directorio',
    desc:'Vista gerencial. Estado de Resultados, márgenes y desempeño por contrato.',
    icon:'directory',
    iconClass:'sun',
    badges:['Estado de Resultados','Filtros gerenciales'],
    avatar:'DR', email:'directorio@viveroseltambo.cl',
    modules:['directory','money','client','alerts','postsale'],
  },
  calidad: {
    id:'calidad',
    nombre:'Calidad',
    desc:'Llenado de formularios, liberaciones, dashboards de calidad por etapa.',
    icon:'quality',
    iconClass:'olive',
    badges:['9 formularios','Dashboard'],
    avatar:'CA', email:'calidad@viveroseltambo.cl',
    modules:['quality-dash','q-injertacion','q-siembra','q-brotamiento','q-clasificacion','q-seleccion','q-cosecha','q-proceso','q-envios','q-plantacion'],
  },
  comercial: {
    id:'comercial',
    nombre:'Comercial',
    desc:'Contratos, cotizaciones, vista por cliente y postventa.',
    icon:'contracts',
    iconClass:'',
    badges:['Contratos','Postventa'],
    avatar:'CO', email:'comercial@viveroseltambo.cl',
    modules:['dashboard','contracts','client','postsale'],
  },
  produccion: {
    id:'produccion',
    nombre:'Producción',
    desc:'Sala de proceso, vid, sombreadero, parrones, riego, materiales, calendario, actividades, lotes y calidad.',
    icon:'sprout',
    iconClass:'',
    badges:['Sala proceso','Parrones','Vid'],
    avatar:'PR', email:'produccion@viveroseltambo.cl',
    modules:['dashboard','process-room','vid','sombreadero','parrones','riego','materials','activities','calendar','lots','quality'],
  },
  rrhh: {
    id:'rrhh',
    nombre:'RRHH',
    desc:'Asistencia en terreno, vacaciones, descansos médicos, permisos, costos laborales y reportería.',
    icon:'users',
    iconClass:'olive',
    badges:['Asistencia','Vacaciones','Reportes'],
    avatar:'RH', email:'rrhh@viveroseltambo.cl',
    modules:['hr'],
  },
  campo: {
    id:'campo',
    nombre:'Campo móvil',
    desc:'Vista simple para operarios en terreno. Registro DDS, checklist e incidencias.',
    icon:'phone',
    iconClass:'earth',
    badges:['Móvil','Operarios'],
    avatar:'CM', email:'campo@viveroseltambo.cl',
    modules:['campo'],
  },
};

// Module catalog (sidebar config)
const MODULES = {
  dashboard:    { label:'Dashboard',           icon:'dashboard',  group:'General' },
  contracts:    { label:'Contratos y cotizaciones', icon:'contracts', group:'Comercial' },
  client:       { label:'Vista por cliente',   icon:'client',     group:'Comercial' },
  postsale:     { label:'Postventa / recalce', icon:'postsale',   group:'Comercial' },
  'process-room': { label:'Sala de Proceso',    icon:'package',    group:'Producción' },
  vid:          { label:'Vid',                  icon:'leaf',       group:'Producción' },
  sombreadero:  { label:'Sombreadero',          icon:'sun',        group:'Producción' },
  parrones:     { label:'Parrones',             icon:'sprout',     group:'Producción' },
  riego:        { label:'Riego',                icon:'refresh',    group:'Producción' },
  materials:    { label:'Análisis de materiales', icon:'materials', group:'Producción' },
  logistics:    { label:'Logística',            icon:'truck',      group:'Operación' },
  activities:   { label:'Actividades',         icon:'clipboard',   group:'Producción' },
  calendar:     { label:'Calendario',          icon:'calendar',    group:'Producción' },
  lots:         { label:'Lotes',               icon:'lots',        group:'Producción' },
  quality:      { label:'Liberación de calidad', icon:'quality',  group:'Producción' },
  money:        { label:'Costos y presupuesto', icon:'money',     group:'Comercial' },
  hr:           { label:'Recursos Humanos',     icon:'users',     group:'Sistema' },
  masters:      { label:'Maestros',            icon:'masters',    group:'Sistema' },
  directory:    { label:'Estado de Resultados',icon:'directory',  group:'Directorio' },
  alerts:       { label:'Alertas',             icon:'bell',       group:'Directorio' },
  // Calidad sub-modules
  'quality-dash':   { label:'Dashboard calidad', icon:'bar-chart', group:'Calidad' },
  'q-injertacion':  { label:'Injertación',       icon:'sprout',    group:'Calidad · Formularios' },
  'q-siembra':      { label:'Siembra',           icon:'leaf',      group:'Calidad · Formularios' },
  'q-brotamiento':  { label:'Brotamiento',       icon:'sun',       group:'Calidad · Formularios' },
  'q-clasificacion':{ label:'Clasificación bolsa',icon:'package',  group:'Calidad · Formularios' },
  'q-seleccion':    { label:'Selección y reselección', icon:'check', group:'Calidad · Formularios' },
  'q-cosecha':      { label:'Cosecha barbadas',  icon:'sprout',    group:'Calidad · Formularios' },
  'q-proceso':      { label:'Proceso de barbadas', icon:'package', group:'Calidad · Formularios' },
  'q-envios':       { label:'Envíos',            icon:'truck',     group:'Calidad · Formularios' },
  'q-plantacion':   { label:'Plantación',        icon:'map-pin',   group:'Calidad · Formularios' },
  campo:        { label:'Campo móvil',         icon:'phone',      group:'Operación' },
};

// ───────── Export to window ─────────
Object.assign(window, {
  fmtCLP, fmtNum, fmtPct,
  VetLogo, VetLogoFull, Icon,
  ToastProvider, useToast,
  CONTRATOS_ER, calcContrato, aggregateER,
  LOTES, MATERIALES, CLIENTES_LIST, POSTVENTA, NOTIFS, ACTIVITY_TASKS,
  PROFILES, MODULES,
});
