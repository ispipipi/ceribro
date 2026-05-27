/* Módulos: Dashboard general, Contratos, Vista por cliente, Postventa, Materiales,
   Actividades, Calendario, Lotes, Liberación de calidad, Costos, Maestros, Campo móvil */

const ACTIVITY_STORE_KEY = 'ceribro_demo_activities';

function readStoredActivities() {
  try {
    return JSON.parse(localStorage.getItem(ACTIVITY_STORE_KEY) || '[]');
  } catch (err) {
    return [];
  }
}

function allActivities() {
  return [...ACTIVITY_TASKS, ...readStoredActivities()];
}

function appendActivity(activity) {
  const stored = readStoredActivities();
  localStorage.setItem(ACTIVITY_STORE_KEY, JSON.stringify([activity, ...stored]));
}

function addDaysISO(date, days) {
  const d = new Date(date + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0,10);
}

const ENTREGA_CONTRATO = {
  'C-001':'2026-06-18',
  'C-002':'2026-06-28',
  'C-003':'2026-07-08',
  'C-004':'2026-07-19',
  'C-005':'2026-08-03',
  'C-006':'2026-08-16',
  'C-007':'2026-08-25',
  'C-008':'2026-09-06',
  'C-009':'2026-09-18',
  'C-010':'2026-10-02',
  'C-011':'2026-10-16',
  'C-012':'2026-11-03',
};

const PROCESO_PATRONES = [
  { calibre:'6-8 mm', variedad:'Freedom', procedencia:'Parrón Norte', procesado:18500, pendiente:4200 },
  { calibre:'8-10 mm', variedad:'Salt Creek', procedencia:'Sombreadero A', procesado:26400, pendiente:3100 },
  { calibre:'10-12 mm', variedad:'1103 Paulsen', procedencia:'Campo Sur', procesado:14200, pendiente:1800 },
  { calibre:'12+ mm', variedad:'Harmony', procedencia:'Proveedor externo', procesado:6200, pendiente:900 },
];

const PROCESO_YEMAS = [
  { calibre:'6-8 mm', variedad:'Sweet Globe', procesado:12800, pendiente:2300 },
  { calibre:'8-10 mm', variedad:'Autumn Crisp', procesado:21400, pendiente:3500 },
  { calibre:'10-12 mm', variedad:'Itum 16', procesado:8600, pendiente:1200 },
  { calibre:'12+ mm', variedad:'Ruby Rush', procesado:5100, pendiente:700 },
];

const VID_STOCK = [
  { campana:'2024', variedad:'Cabernet Sauvignon', estado:'Aptas para venta', plantas:9200, ubicacion:'Vid · Sector V1' },
  { campana:'2024', variedad:'Carménère', estado:'En recuperación', plantas:1450, ubicacion:'Vid · Recuperación' },
  { campana:'2025', variedad:'Sauvignon Blanc', estado:'Aptas para venta', plantas:14800, ubicacion:'Vid · Sector V2' },
  { campana:'2025', variedad:'Chardonnay', estado:'En recuperación', plantas:2100, ubicacion:'Vid · Sector V3' },
  { campana:'2026', variedad:'Pinot Noir', estado:'Aptas para venta', plantas:7600, ubicacion:'Vid · Sector V4' },
  { campana:'2026', variedad:'Merlot', estado:'En recuperación', plantas:980, ubicacion:'Vid · Recuperación' },
];

const PARRONES_ESTIMACION = [
  { patron:'Freedom', sector:'Parrón 1', estimado:28000, poda:'2026-06-03', responsable:'Equipo Parrones' },
  { patron:'Salt Creek', sector:'Parrón 2', estimado:34000, poda:'2026-06-11', responsable:'Equipo Parrones' },
  { patron:'Harmony', sector:'Parrón 4', estimado:16500, poda:'2026-06-18', responsable:'Supervisor Campo' },
];

const PARRONES_BARBADAS = [
  { variedad:'Sweet Globe', sector:'Campo B1', estimado:22000, cosechado:15400 },
  { variedad:'Autumn Crisp', sector:'Campo B2', estimado:18000, cosechado:8100 },
  { variedad:'Itum 16', sector:'Campo B3', estimado:9500, cosechado:5700 },
];

const PARRONES_INJERTOS = [
  { id:'PB-001', ubicacion:'Campo barbadas', patron:'Freedom', variedad:'Sweet Globe', injertacion:'2026-05-02' },
  { id:'PB-002', ubicacion:'Sombreadero 3', patron:'Salt Creek', variedad:'Autumn Crisp', injertacion:'2026-05-08' },
  { id:'PB-003', ubicacion:'Campo barbadas', patron:'1103 Paulsen', variedad:'Itum 16', injertacion:'2026-05-15' },
];

const MATERIAL_VENCIMIENTOS = [
  { sku:'AG-021', producto:'Fungicida preventivo A', lote:'L-88', vence:'2026-07-20', stock:42, unidad:'lt', uso:'Aplicaciones programadas' },
  { sku:'NU-014', producto:'Bioestimulante radicular', lote:'B-103', vence:'2026-09-12', stock:65, unidad:'lt', uso:'Prebrotamiento' },
  { sku:'AD-007', producto:'Adherente agrícola', lote:'AD-56', vence:'2026-11-08', stock:28, unidad:'lt', uso:'Mezclas foliares' },
];

const ENVASES_STOCK = [
  { item:'Jabas plásticas', disponible:820, retorno:145, devolver:60 },
  { item:'Bins cosecha', disponible:96, retorno:24, devolver:11 },
  { item:'Bandejas vivero', disponible:1320, retorno:210, devolver:84 },
];

const ORDENES_COMPRA = [
  { oc:'OC-2026-118', proveedor:'Agroinsumos Central', material:'Sustrato turba premium', solicitado:1200, recibido:800, pendiente:400, llegada:'2026-06-02', estado:'Parcial' },
  { oc:'OC-2026-127', proveedor:'Envases Pacífico', material:'Jabas plásticas', solicitado:500, recibido:0, pendiente:500, llegada:'2026-06-09', estado:'Pendiente' },
  { oc:'OC-2026-131', proveedor:'Fertilizantes Norte', material:'Fertilizante NPK', solicitado:320, recibido:320, pendiente:0, llegada:'2026-05-22', estado:'Recibida' },
];

const COMPRAS_ARCHIVADAS = [
  { oc:'OC-2026-096', material:'Clip injerto estándar', motivo:'Cancelada por cambio de especificación', fecha:'2026-04-18' },
  { oc:'OC-2026-101', material:'Bolsa polietileno 3L', motivo:'Archivada por stock suficiente', fecha:'2026-04-27' },
];

const PRODUCTOS_ALTERNATIVOS = [
  { producto:'Cinta injerto premium', alternativo:'Cinta biodegradable', cobertura:'Alta', stock:12400 },
  { producto:'Fungicida preventivo A', alternativo:'Fungicida preventivo B', cobertura:'Media', stock:38 },
  { producto:'Bolsa polietileno 4L', alternativo:'Contenedor rígido 4L', cobertura:'Baja', stock:2200 },
];

const LABORES_DIA = {
  sala:[
    { labor:'Poda y guarda de material', responsable:'Sala proceso', estado:'Pendiente' },
    { labor:'Injertos bolsa por cliente', responsable:'Equipo injertación', estado:'Programado' },
    { labor:'Registro de cámara de calor', responsable:'Calidad proceso', estado:'Pendiente' },
  ],
  sombreadero:[
    { labor:'Revisión de humedad de sustrato', responsable:'Sombreadero A', estado:'Programado' },
    { labor:'Aplicación preventiva foliar', responsable:'Equipo fitosanitario', estado:'Pendiente' },
    { labor:'Revisión de sombreadero 3', responsable:'Supervisor producción', estado:'Pendiente' },
  ],
  parrones:[
    { labor:'Poda sector Parrón 1', responsable:'Equipo Parrones', estado:'Programado' },
    { labor:'Siembra patrón Salt Creek', responsable:'Campo', estado:'Pendiente' },
    { labor:'Registro de plantación lote PB-002', responsable:'Supervisor Campo', estado:'Pendiente' },
  ],
};

const SALA_REGISTROS = [
  { fecha:'2026-05-26', tipo:'Poda - guarda material', cliente:'Agrolatina', variedad:'Timpson', cantidad:8400, estado:'Registrado' },
  { fecha:'2026-05-26', tipo:'Injertos bolsa', cliente:'Don Guillermo', variedad:'Autumn Crisp', cantidad:6200, estado:'En proceso' },
  { fecha:'2026-05-27', tipo:'Injertos barbada', cliente:'Florida Blanca', variedad:'Ruby Rush', cantidad:3100, estado:'Programado' },
  { fecha:'2026-05-27', tipo:'Registro proceso barbada', cliente:'Parvina', variedad:'Itum 16', cantidad:1800, estado:'Programado' },
];

const ENCALLADO_CAMARA = [
  { lote:'L-2025-004', camara:'Cámara calor 1', fecha:'2026-05-24', injertos:4200, encallado:91, resultado:'Aprobado' },
  { lote:'L-2025-008', camara:'Cámara calor 2', fecha:'2026-05-25', injertos:2600, encallado:78, resultado:'Observación' },
  { lote:'L-2025-011', camara:'Cámara calor 1', fecha:'2026-05-26', injertos:3100, encallado:86, resultado:'Aprobado' },
];

const APLICACIONES_PROGRAMA = {
  sala:[
    { fecha:'2026-05-27', area:'Sala de Proceso', producto:'Fungicida preventivo A', dosis:'120 cc/100L', estado:'Programado', cartilla:'C-APL-SALA-01' },
    { fecha:'2026-05-28', area:'Cámara calor', producto:'Desinfectante superficie', dosis:'2%', estado:'Pendiente', cartilla:'C-APL-SALA-02' },
  ],
  sombreadero:[
    { fecha:'2026-05-27', area:'Sombreadero 1', producto:'Bioestimulante radicular', dosis:'180 cc/100L', estado:'Programado', cartilla:'C-APL-SOM-01' },
    { fecha:'2026-05-29', area:'Sombreadero 3', producto:'Fungicida preventivo B', dosis:'100 cc/100L', estado:'Pendiente', cartilla:'C-APL-SOM-02' },
  ],
  parrones:[
    { fecha:'2026-05-28', area:'Parrón 1', producto:'Fungicida preventivo A', dosis:'140 cc/100L', estado:'Programado', cartilla:'C-APL-PAR-01' },
    { fecha:'2026-05-30', area:'Parrón 4', producto:'Adherente agrícola', dosis:'60 cc/100L', estado:'Pendiente', cartilla:'C-APL-PAR-02' },
  ],
};

const SOMBREADERO_PLANTONES = [
  { sector:'Sombreadero 1', variedad:'Sweet Globe', estimado:18500, disponible:12400, estado:'En desarrollo' },
  { sector:'Sombreadero 2', variedad:'Autumn Crisp', estimado:22000, disponible:16200, estado:'Apto próxima etapa' },
  { sector:'Sombreadero 3', variedad:'Ruby Rush', estimado:9600, disponible:7100, estado:'Observación' },
];

const PARRONES_SIEMBRA_PLANTACION = [
  { fecha:'2026-05-22', labor:'Siembra', sector:'Parrón 2', patron:'Salt Creek', plantas:8400, estado:'Registrado' },
  { fecha:'2026-05-25', labor:'Plantación', sector:'Parrón 1', patron:'Freedom', plantas:6200, estado:'Registrado' },
  { fecha:'2026-05-28', labor:'Siembra', sector:'Parrón 4', patron:'Harmony', plantas:4800, estado:'Programado' },
];

const RIEGO_PROGRAMA = [
  { fecha:'2026-05-26', area:'Sombreadero 1', turno:'Mañana', duracion:'45 min', estado:'Ejecutado', humedad:'28%' },
  { fecha:'2026-05-26', area:'Parrón 2', turno:'Tarde', duracion:'60 min', estado:'Programado', humedad:'24%' },
  { fecha:'2026-05-27', area:'Vid Sector V2', turno:'Mañana', duracion:'35 min', estado:'Pendiente', humedad:'22%' },
  { fecha:'2026-05-27', area:'Sala proceso', turno:'Noche', duracion:'20 min', estado:'Programado', humedad:'30%' },
];

const ENVIO_PROGRAMADO = [
  { fecha:'2026-06-03', cliente:'Don Luis', lote:'L-2025-006', plantas:34000, destino:'Maule', estado:'Programado' },
  { fecha:'2026-06-08', cliente:'SAMNSA', lote:'L-2025-005', plantas:30000, destino:'Sonora, MX', estado:'Documentación' },
  { fecha:'2026-06-12', cliente:'AIB', lote:'L-2025-004', plantas:20000, destino:'Coquimbo', estado:'Confirmado' },
];

const REGISTRO_ENVIOS = [
  { fecha:'2026-05-18', cliente:'Danper', guia:'GD-8821', transportista:'Andes Cargo', plantas:18000, estado:'Entregado' },
  { fecha:'2026-05-21', cliente:'Agrolatina', guia:'GD-8844', transportista:'Ruta Norte', plantas:24500, estado:'En tránsito' },
];

const ANALISIS_LOTE = [
  { lote:'L-2025-001', tipo:'Nematológico', fecha:'2026-05-20', resultado:'Sin detección', estado:'OK' },
  { lote:'L-2025-003', tipo:'Foliar', fecha:'2026-05-21', resultado:'N bajo, corregir fertilización', estado:'Observación' },
  { lote:'L-2025-004', tipo:'Micológico', fecha:'2026-05-22', resultado:'Sin hongos activos', estado:'OK' },
  { lote:'L-2025-008', tipo:'Virus', fecha:'2026-05-23', resultado:'Muestra en confirmación', estado:'Pendiente' },
  { lote:'L-2025-011', tipo:'Humedad / viabilidad', fecha:'2026-05-24', resultado:'Viabilidad 93%', estado:'OK' },
];

const BREEDER_INFORME = [
  { breeder:'Sun World', variedades:'Autumn Crisp, Sugra 54', injertando:48600, plantando:31200, stock:72400, patente:'Informe pendiente' },
  { breeder:'SNFL', variedades:'Timpson, Ruby Rush', injertando:35400, plantando:18800, stock:42600, patente:'En revisión' },
  { breeder:'IFG', variedades:'Sweet Globe, Sweet Celebration', injertando:29400, plantando:24100, stock:38900, patente:'Listo para enviar' },
  { breeder:'Itum', variedades:'Itum 16', injertando:8200, plantando:5200, stock:11900, patente:'Listo para enviar' },
];

const BREEDER_PLANTILLAS = [
  { nombre:'Plantilla informe mensual patentes', formato:'XLSX', contenido:'Stock por breeder, variedad y etapa productiva' },
  { nombre:'Plantilla injertación y plantación', formato:'XLSX', contenido:'Detalle de lo injertado, plantado y disponible' },
  { nombre:'Plantilla resumen ejecutivo', formato:'PDF', contenido:'Resumen para envío mensual a gerencia y patentes' },
];

function DailyLaborCard({ title, rows }) {
  const toast = useToast();
  return (
    <div className="card mb-20">
      <div className="card-header"><div><h3 className="card-title">{title}</h3><p className="card-sub">Checklist diario de labores a realizar.</p></div></div>
      <div className="table-wrap"><table className="tbl"><thead><tr><th>Labor</th><th>Responsable</th><th>Estado</th><th></th></tr></thead><tbody>{rows.map((r,i) => <tr key={r.labor}><td className="strong">{r.labor}</td><td>{r.responsable}</td><td><span className={"chip " + (r.estado==='Pendiente'?'chip-warn':'chip-info')}>{r.estado}</span></td><td><button className="btn btn-primary btn-sm" onClick={() => toast.success('Labor confirmada', r.labor)}><Icon name="check" size={13}/> Confirmar labor</button></td></tr>)}</tbody></table></div>
    </div>
  );
}

function AplicacionesCard({ title, rows }) {
  const toast = useToast();
  return (
    <div className="card mb-20">
      <div className="card-header"><div><h3 className="card-title">{title}</h3><p className="card-sub">Programa, cartilla y registro de aplicaciones.</p></div></div>
      <div className="table-wrap"><table className="tbl"><thead><tr><th>Fecha</th><th>Área</th><th>Producto</th><th>Dosis</th><th>Cartilla</th><th>Estado</th><th></th></tr></thead><tbody>{rows.map(r => <tr key={r.fecha+r.area+r.producto}><td className="text-muted">{r.fecha}</td><td>{r.area}</td><td className="strong">{r.producto}</td><td>{r.dosis}</td><td><span className="chip chip-info">{r.cartilla}</span></td><td><span className={"chip " + (r.estado==='Programado'?'chip-leaf':'chip-warn')}>{r.estado}</span></td><td><button className="btn btn-ghost btn-sm" onClick={() => toast.success('Aplicación registrada', `${r.area} · ${r.producto}`)}><Icon name="check" size={13}/> Registrar</button></td></tr>)}</tbody></table></div>
    </div>
  );
}

// ───────── Dashboard general ─────────
function ModuleDashboard({ profile }) {
  const ag = aggregateER(CONTRATOS_ER);
  const stats = [
    { label:'Plantas en proceso', value: fmtNum(ag.plantas), sub:'12 contratos', accent:'', icon:'sprout' },
    { label:'Ingresos comprometidos', value: fmtCLP(ag.ingresos), sub: 'Período Ago–Dic 2025', accent:'sun', icon:'money' },
    { label:'Lotes activos', value: LOTES.length, sub: '5 sectores · 4 estados', accent:'olive', icon:'lots' },
    { label:'Postventas abiertas', value: POSTVENTA.filter(p=>p.estado!=='Aprobado').length, sub: 'requieren atención', accent:'earth', icon:'postsale' },
  ];
  const breederData = Object.values(CONTRATOS_ER.reduce((acc, c) => {
    const key = c.productor;
    if (!acc[key]) acc[key] = { breeder:key, plantas:0, contratos:0, variedades:{} };
    acc[key].plantas += c.plantas;
    acc[key].contratos += 1;
    acc[key].variedades[c.variedad] = (acc[key].variedades[c.variedad] || 0) + c.plantas;
    return acc;
  }, {})).map(b => ({
    ...b,
    topVariedades: Object.entries(b.variedades).sort((a,b) => b[1]-a[1]).slice(0,2),
  })).sort((a,b) => b.plantas-a.plantas);
  const totalBreeder = breederData.reduce((a,b)=>a+b.plantas, 0);

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Buen día, {profile.nombre}</h1>
          <p className="page-sub">Lunes 4 de Mayo de 2026 · Resumen general de la operación</p>
        </div>
        <div className="actions">
          <button className="btn btn-secondary"><Icon name="download" size={14}/> Exportar reporte</button>
        </div>
      </div>

      <div className="grid grid-4 mb-20">
        {stats.map((s,i) => (
          <div key={i} className="kpi"><div className={"kpi-accent " + s.accent}></div>
            <div className="row between">
              <div className="kpi-label">{s.label}</div>
              <Icon name={s.icon} size={16} className="text-muted"/>
            </div>
            <div className="kpi-value">{s.value}</div>
            <div className="kpi-foot">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid dashboard-split mb-20">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Distribución de variedades por Breeder</h3>
              <p className="card-sub">Contratos cerrados · {fmtNum(totalBreeder)} plantas</p>
            </div>
          </div>
          <div className="card-body">
            <div style={{display:'flex', height:32, borderRadius:8, overflow:'hidden', marginBottom:16}}>
              {breederData.map((b,i) => (
                <div key={b.breeder} style={{flex: b.plantas, background: ['var(--vet-leaf)','var(--vet-olive)','var(--vet-sun)','var(--vet-earth)','var(--vet-sun-deep)'][i % 5]}} title={`${b.breeder}: ${fmtNum(b.plantas)}`}></div>
              ))}
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {breederData.map((b,i) => (
                <div key={b.breeder} className="row between" style={{padding:'8px 0', borderBottom:i<breederData.length-1?'1px solid var(--line)':'none'}}>
                  <div style={{minWidth:0}}>
                    <div className="row gap-8">
                      <span style={{width:10, height:10, borderRadius:2, background:['var(--vet-leaf)','var(--vet-olive)','var(--vet-sun)','var(--vet-earth)','var(--vet-sun-deep)'][i % 5]}}></span>
                      <span style={{fontSize:13.5, fontWeight:600}}>{b.breeder}</span>
                    </div>
                    <div className="text-muted" style={{fontSize:11.5, marginTop:3}}>
                      {b.topVariedades.map(([v,p]) => `${v} ${fmtPct((p/b.plantas)*100, 0)}`).join(' · ')}
                    </div>
                  </div>
                  <div className="row gap-12">
                    <span className="text-muted" style={{fontSize:12.5}}>{fmtPct((b.plantas/totalBreeder)*100, 1)}</span>
                    <span style={{fontWeight:600, fontVariantNumeric:'tabular-nums'}}>{fmtNum(b.plantas)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Alertas activas</h3>
              <p className="card-sub">Requieren tu atención</p>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
            {[
              { titulo:'Stock bajo: Patrón Freedom', sub: '8.200 / 20.000 mínimo', tipo:'warn', icon:'package' },
              { titulo:'Lote L-2025-008 calidad crítica', sub: 'Requiere visita técnica', tipo:'danger', icon:'alert' },
              { titulo:'Postventa PV-027 sin asignar', sub: 'Pendiente desde hace 3 días', tipo:'warn', icon:'postsale' },
              { titulo:'Liberación L-2025-003 pendiente', sub: 'Vence hoy', tipo:'info', icon:'quality' },
            ].map((a,i,arr) => (
              <div key={i} style={{padding:'14px 20px', borderBottom: i<arr.length-1?'1px solid var(--line)':'none', display:'flex', gap:12}}>
                <div style={{
                  width:34, height:34, borderRadius:8, flexShrink:0,
                  background: a.tipo==='warn'?'var(--warn-bg)':a.tipo==='danger'?'var(--danger-bg)':'var(--info-bg)',
                  color: a.tipo==='warn'?'var(--warn)':a.tipo==='danger'?'var(--danger)':'var(--info)',
                  display:'grid', placeItems:'center'
                }}>
                  <Icon name={a.icon} size={16}/>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:500, lineHeight:1.4}}>{a.titulo}</div>
                  <div className="text-muted" style={{fontSize:11.5, marginTop:3}}>{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Lotes destacados</h3>
            <p className="card-sub">Top de lotes por volumen y avance</p>
          </div>
        </div>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr>
              <th>Lote</th><th>Cliente</th><th>Variedad</th><th className="num">Plantas</th><th>DDS</th><th>Estado</th><th>Calidad</th><th>Ubicación</th>
            </tr></thead>
            <tbody>
              {LOTES.slice(0,6).map(l => (
                <tr key={l.id}>
                  <td className="strong">{l.id}</td>
                  <td>{l.cliente}</td>
                  <td>{l.variedad}</td>
                  <td className="num">{fmtNum(l.plantas)}</td>
                  <td>
                    <div className="row gap-8">
                      <div className="bar-track" style={{width:60, height:6}}>
                        <div className="bar-fill" style={{width: Math.min(l.dds, 100)+'%', background: l.dds<30?'var(--vet-leaf)':l.dds<70?'var(--vet-sun)':'var(--vet-earth)'}}></div>
                      </div>
                      <span style={{fontSize:12.5}}>{l.dds}d</span>
                    </div>
                  </td>
                  <td><span className="chip chip-leaf">{l.estado}</span></td>
                  <td><span className={"chip " + (l.calidad==='OK'?'chip-success':l.calidad==='Alerta'?'chip-warn':'chip-danger')}>{l.calidad}</span></td>
                  <td className="text-muted">{l.ubicacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ───────── Contratos ─────────
function ModuleContratos() {
  const toast = useToast();
  const [tab, setTab] = React.useState('activos');
  const cotizaciones = [
    { id:'COT-2026-001', cliente:'Agrolatina', breeder:'IFG', variedad:'Sweet Globe', plantas:25000, monto:105000, estado:'Enviada', fecha:'2026-04-22', entrega:'2026-06-14', archivo:'COT-2026-001.pdf', oc:'OC-AGRO-184.pdf' },
    { id:'COT-2026-002', cliente:'Don Guillermo', breeder:'Sun World', variedad:'Autumn Crisp', plantas:40000, monto:160000, estado:'En revisión', fecha:'2026-04-28', entrega:'2026-06-21', archivo:'COT-2026-002.pdf', oc:'OC-DG-219.pdf' },
    { id:'COT-2026-003', cliente:'Parvina', breeder:'Itum', variedad:'Itum 16', plantas:15000, monto:61500, estado:'Borrador', fecha:'2026-05-02', entrega:'2026-07-02', archivo:'COT-2026-003.pdf', oc:'OC-PAR-093.pdf' },
  ];
  const contratosOrdenados = [...CONTRATOS_ER]
    .map(c => ({...c, entrega: ENTREGA_CONTRATO[c.id] || c.fecha, archivo:`${c.id}-cotizacion.pdf`, oc:`OC-${c.id}.pdf`}))
    .sort((a,b) => new Date(a.entrega) - new Date(b.entrega));
  const cotizacionesOrdenadas = [...cotizaciones].sort((a,b) => new Date(a.entrega) - new Date(b.entrega));
  const contratosCerrados = contratosOrdenados.slice(0,5).map((c,i) => ({...c, cierre:'2026-05-' + String(10+i*3).padStart(2,'0'), movilidad:['Cliente','Viveros','Por definir','Cliente','Viveros'][i]}));
  const abrirAsociados = (row) => toast.info('Archivos asociados', `${row.archivo} · ${row.oc}`);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Contratos y cotizaciones</h1>
          <p className="page-sub">Gestión comercial · {CONTRATOS_ER.length} contratos activos · {cotizaciones.length} cotizaciones</p>
        </div>
        <div className="actions">
          <button className="btn btn-secondary"><Icon name="download" size={14}/> Exportar</button>
          <button className="btn btn-primary" onClick={() => toast.success('Nuevo contrato', 'Se abrió el formulario para crear contrato')}><Icon name="plus" size={14}/> Nuevo contrato</button>
        </div>
      </div>
      <div className="tabs">
        <button className={"tab " + (tab==='activos'?'active':'')} onClick={() => setTab('activos')}>Contratos activos · {CONTRATOS_ER.length}</button>
        <button className={"tab " + (tab==='cotizaciones'?'active':'')} onClick={() => setTab('cotizaciones')}>Cotizaciones · {cotizaciones.length}</button>
        <button className={"tab " + (tab==='cerrados'?'active':'')} onClick={() => setTab('cerrados')}>Cerrados</button>
        <button className={"tab " + (tab==='breeder'?'active':'')} onClick={() => setTab('breeder')}>Informe breeder</button>
      </div>
      {tab==='activos' && (
        <div className="card">
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr>
                <th>Contrato</th><th>Cliente</th><th>Breeder</th><th>Variedad</th><th>Formato</th><th className="num">Plantas</th><th className="num">Monto</th><th>Fecha entrega</th><th></th>
              </tr></thead>
              <tbody>
                {contratosOrdenados.map(c => {
                  const k = calcContrato(c);
                  return (
                    <tr key={c.id}>
                      <td className="strong">{c.id}</td>
                      <td>{c.cliente}</td>
                      <td>{c.productor}</td>
                      <td>{c.variedad}</td>
                      <td><span className={"chip " + (c.formato==='Bolsa'?'chip-leaf':'chip-sun')}>{c.formato}</span></td>
                      <td className="num">{fmtNum(c.plantas)}</td>
                      <td className="num strong">{fmtCLP(k.ingresos)}</td>
                      <td className="text-muted">{c.entrega}</td>
                      <td><button className="btn btn-ghost btn-sm" title="Abrir cotización y orden de compra" onClick={() => abrirAsociados(c)}>→</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab==='cotizaciones' && (
        <div className="card">
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Cotización</th><th>Cliente</th><th>Breeder</th><th>Variedad</th><th className="num">Plantas</th><th className="num">Monto</th><th>Estado</th><th>Fecha entrega</th><th></th></tr></thead>
              <tbody>
                {cotizacionesOrdenadas.map(c => (
                  <tr key={c.id}>
                    <td className="strong">{c.id}</td>
                    <td>{c.cliente}</td>
                    <td>{c.breeder}</td>
                    <td>{c.variedad}</td>
                    <td className="num">{fmtNum(c.plantas)}</td>
                    <td className="num">{fmtCLP(c.monto)}</td>
                    <td><span className={"chip " + (c.estado==='Enviada'?'chip-info':c.estado==='En revisión'?'chip-warn':'chip-leaf')}>{c.estado}</span></td>
                    <td className="text-muted">{c.entrega}</td>
                    <td><button className="btn btn-ghost btn-sm" title="Abrir cotización y orden de compra" onClick={() => abrirAsociados(c)}>→</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab==='cerrados' && (
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Contratos cerrados</h3><p className="card-sub">Incluye responsable de movilidad para coordinación de despacho.</p></div></div>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Contrato</th><th>Cliente</th><th>Breeder</th><th>Variedad</th><th className="num">Plantas</th><th>Fecha cierre</th><th>Movilidad</th><th></th></tr></thead>
              <tbody>
                {contratosCerrados.map(c => (
                  <tr key={c.id}>
                    <td className="strong">{c.id}</td>
                    <td>{c.cliente}</td>
                    <td>{c.productor}</td>
                    <td>{c.variedad}</td>
                    <td className="num">{fmtNum(c.plantas)}</td>
                    <td className="text-muted">{c.cierre}</td>
                    <td><span className={"chip " + (c.movilidad==='Viveros'?'chip-leaf':c.movilidad==='Cliente'?'chip-info':'chip-warn')}>{c.movilidad}</span></td>
                    <td><button className="btn btn-ghost btn-sm" title="Abrir cotización y orden de compra" onClick={() => abrirAsociados(c)}>→</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab==='breeder' && (
        <div className="grid grid-2">
          <div className="card">
            <div className="card-header"><div><h3 className="card-title">Informe mensual por breeder</h3><p className="card-sub">Injertado, plantado y stock disponible para reporte a patentes.</p></div></div>
            <div className="table-wrap">
              <table className="tbl">
                <thead><tr><th>Breeder</th><th>Variedades</th><th className="num">Injertando</th><th className="num">Plantando</th><th className="num">Stock disponible</th><th>Estado patente</th></tr></thead>
                <tbody>{BREEDER_INFORME.map(b => <tr key={b.breeder}><td className="strong">{b.breeder}</td><td>{b.variedades}</td><td className="num">{fmtNum(b.injertando)}</td><td className="num">{fmtNum(b.plantando)}</td><td className="num">{fmtNum(b.stock)}</td><td><span className={"chip " + (b.patente==='Listo para enviar'?'chip-success':b.patente==='En revisión'?'chip-info':'chip-warn')}>{b.patente}</span></td></tr>)}</tbody>
              </table>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div><h3 className="card-title">Plantillas de reporte</h3><p className="card-sub">Formatos demo para el informe mensual.</p></div></div>
            <div className="table-wrap">
              <table className="tbl">
                <thead><tr><th>Plantilla</th><th>Formato</th><th>Contenido</th><th></th></tr></thead>
                <tbody>{BREEDER_PLANTILLAS.map(p => <tr key={p.nombre}><td className="strong">{p.nombre}</td><td><span className="chip chip-info">{p.formato}</span></td><td className="text-muted">{p.contenido}</td><td><button className="btn btn-secondary btn-sm" onClick={() => toast.success('Plantilla descargada', p.nombre)}><Icon name="download" size={13}/> Descargar</button></td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ───────── Vista por cliente ─────────
function ModuleClientes() {
  const toast = useToast();
  const [sel, setSel] = React.useState(CLIENTES_LIST[0].nombre);
  const cliente = CLIENTES_LIST.find(c => c.nombre === sel);
  const contratos = CONTRATOS_ER.filter(c => c.cliente === sel);
  const ag = aggregateER(contratos);
  const deuda = Math.round(ag.ingresos * 0.32);
  const verDeuda = (e) => {
    e.preventDefault();
    toast.info('Condiciones de pago', `${cliente.nombre}: facturas pendientes y vencimientos disponibles en demo.`);
  };
  const descargarTrazabilidad = () => toast.success('Reporte generado', `Trazabilidad completa de ${cliente.nombre} lista para descarga`);
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Vista por cliente</h1>
          <p className="page-sub">Información consolidada de cada cliente · {CLIENTES_LIST.length} clientes</p>
        </div>
      </div>
      <div className="grid client-split" style={{gap:16}}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Clientes</h3>
            <span className="chip">{CLIENTES_LIST.length}</span>
          </div>
          <div style={{display:'flex', flexDirection:'column', maxHeight:560, overflow:'auto'}}>
            {CLIENTES_LIST.map(c => (
              <button key={c.nombre} onClick={() => setSel(c.nombre)} style={{
                padding:'12px 16px', borderBottom:'1px solid var(--line)', textAlign:'left',
                background: sel===c.nombre ? 'var(--surface-3)' : 'transparent',
                border:'none', borderBottom:'1px solid var(--line)', cursor:'pointer',
                borderLeft: sel===c.nombre ? '3px solid var(--vet-leaf)' : '3px solid transparent',
              }}>
                <div style={{fontWeight: sel===c.nombre?600:500, fontSize:13.5}}>{c.nombre}</div>
                <div className="text-muted" style={{fontSize:11.5, marginTop:2}}>{c.region} · {c.contratos} contratos</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          <div className="card">
            <div className="card-body">
              <div className="row between">
                <div>
                  <h2 style={{margin:0, fontFamily:'var(--font-display)', fontSize:26, fontWeight:500}}>{cliente.nombre}</h2>
                  <p className="text-muted" style={{margin:'4px 0 0', fontSize:13.5}}>{cliente.region}</p>
                </div>
                <div className="row gap-8">
                  <button className="btn btn-secondary btn-sm" onClick={descargarTrazabilidad}><Icon name="download" size={13}/> Trazabilidad</button>
                  <button className="btn btn-secondary btn-sm"><Icon name="edit" size={13}/> Editar</button>
                </div>
              </div>
              <div className="divider"></div>
              <div className="grid grid-3">
                <div><div className="label">Contacto</div><div style={{fontSize:14, fontWeight:500}}>{cliente.contacto}</div></div>
                <div><div className="label">Email</div><div style={{fontSize:14}}>{cliente.email}</div></div>
                <div><div className="label">Teléfono</div><div style={{fontSize:14}}>{cliente.tel}</div></div>
              </div>
            </div>
          </div>

          <div className="grid grid-3">
            <div className="kpi"><div className="kpi-accent"></div>
              <div className="kpi-label">Plantas comprometidas</div>
              <div className="kpi-value" style={{fontSize:24}}>{fmtNum(ag.plantas)}</div>
            </div>
            <div className="kpi"><div className="kpi-accent sun"></div>
              <div className="kpi-label">Ingresos</div>
              <div className="kpi-value" style={{fontSize:24}}>{fmtCLP(ag.ingresos)}</div>
            </div>
            <div className="kpi"><div className="kpi-accent olive"></div>
              <div className="kpi-label">Deuda</div>
              <a href={"#pagos-" + cliente.nombre.replace(/\s+/g,'-').toLowerCase()} onClick={verDeuda} className="kpi-value" style={{fontSize:24, color:'var(--vet-leaf-dark)', textDecoration:'underline', display:'inline-block'}}>{fmtCLP(deuda)}</a>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Contratos del cliente</h3>
            </div>
            <div className="table-wrap">
              {contratos.length===0 ? (
                <div className="empty"><div className="empty-icon"><Icon name="contracts" size={20}/></div><div className="empty-title">Sin contratos para este cliente</div></div>
              ) : (
                <table className="tbl">
                  <thead><tr><th>Contrato</th><th>Variedad</th><th>Formato</th><th className="num">Plantas</th><th className="num">Ingresos</th><th>Fecha contrato</th><th>Fecha de entrega</th></tr></thead>
                  <tbody>
                    {contratos.map(c => {
                      const k = calcContrato(c);
                      return (<tr key={c.id}><td className="strong">{c.id}</td><td>{c.variedad}</td><td><span className={"chip " + (c.formato==='Bolsa'?'chip-leaf':'chip-sun')}>{c.formato}</span></td><td className="num">{fmtNum(c.plantas)}</td><td className="num">{fmtCLP(k.ingresos)}</td><td className="text-muted">{c.fecha}</td><td className="text-muted">{ENTREGA_CONTRATO[c.id] || c.fecha}</td></tr>);
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────── Postventa ─────────
function ModulePostventa() {
  const toast = useToast();
  const totalRecalce = POSTVENTA.reduce((a,b)=>a+b.plantas,0);
  const aprobadoRecalce = POSTVENTA.filter(p=>p.estado==='Aprobado').reduce((a,b)=>a+b.plantas,0);
  const porcentajeRecalce = totalRecalce ? (aprobadoRecalce / totalRecalce) * 100 : 0;
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Postventa / Recalce</h1>
          <p className="page-sub">Gestión de reclamos, recalces y solicitudes post-entrega</p>
        </div>
        <button className="btn btn-primary" onClick={()=>toast.success('Nuevo caso','Postventa registrada')}><Icon name="plus" size={14}/> Nuevo caso</button>
      </div>
      <div className="grid grid-4 mb-20">
        <div className="kpi"><div className="kpi-accent"></div><div className="kpi-label">Casos abiertos</div><div className="kpi-value">{POSTVENTA.filter(p=>p.estado!=='Aprobado').length}</div></div>
        <div className="kpi"><div className="kpi-accent sun"></div><div className="kpi-label">Plantas en recalce</div><div className="kpi-value">{fmtNum(POSTVENTA.reduce((a,b)=>a+b.plantas,0))}</div></div>
        <div className="kpi"><div className="kpi-accent olive"></div><div className="kpi-label">Aprobados (Año)</div><div className="kpi-value">{POSTVENTA.filter(p=>p.estado==='Aprobado').length}</div></div>
        <div className="kpi"><div className="kpi-accent earth"></div><div className="kpi-label">Porcentaje de Recalce</div><div className="kpi-value">{fmtPct(porcentajeRecalce, 1)}</div></div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">Casos de postventa</h3></div>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>ID</th><th>Cliente</th><th>Lote</th><th>Motivo</th><th className="num">Plantas</th><th>Estado</th><th>Fecha</th><th>Fecha despacho recalce</th><th></th></tr></thead>
            <tbody>
              {POSTVENTA.map(p => (
                <tr key={p.id}>
                  <td className="strong">{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>{p.lote}</td>
                  <td>{p.motivo}</td>
                  <td className="num">{fmtNum(p.plantas)}</td>
                  <td><span className={"chip " + (p.estado==='Aprobado'?'chip-success':p.estado==='En revisión'?'chip-warn':'chip-info')}>{p.estado}</span></td>
                  <td className="text-muted">{p.fecha}</td>
                  <td className="text-muted">{p.estado==='Aprobado' ? (p.despacho || 'Por programar') : '—'}</td>
                  <td><button className="btn btn-ghost btn-sm"><Icon name="eye" size={13}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ───────── Materiales ─────────
function ModuleSalaProceso() {
  const [clienteFiltro, setClienteFiltro] = React.useState('');
  const [tipoFiltro, setTipoFiltro] = React.useState('');
  const totalPatrones = PROCESO_PATRONES.reduce((a,b)=>a+b.procesado,0);
  const pendientePatrones = PROCESO_PATRONES.reduce((a,b)=>a+b.pendiente,0);
  const totalYemas = PROCESO_YEMAS.reduce((a,b)=>a+b.procesado,0);
  const pendienteYemas = PROCESO_YEMAS.reduce((a,b)=>a+b.pendiente,0);
  const clientesSala = [...new Set(SALA_REGISTROS.map(r=>r.cliente))];
  const tiposSala = [...new Set(SALA_REGISTROS.map(r=>r.tipo))];
  const registrosFiltrados = SALA_REGISTROS.filter(r => (!clienteFiltro || r.cliente === clienteFiltro) && (!tipoFiltro || r.tipo === tipoFiltro));
  const renderRows = rows => rows.map(r => {
    const total = r.procesado + r.pendiente;
    const pct = total ? (r.procesado / total) * 100 : 0;
    return (
      <tr key={r.calibre + r.variedad}>
        <td><span className="chip">{r.calibre}</span></td>
        <td className="strong">{r.variedad}</td>
        {'procedencia' in r && <td>{r.procedencia}</td>}
        <td className="num">{fmtNum(r.procesado)}</td>
        <td className="num">{fmtNum(r.pendiente)}</td>
        <td>
          <div className="row gap-8">
            <div className="bar-track" style={{width:110, height:6}}><div className="bar-fill" style={{width:pct+'%', background:'var(--vet-leaf)'}}></div></div>
            <span className="text-muted" style={{fontSize:12}}>{fmtPct(pct,0)}</span>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Sala de Proceso</h1>
          <p className="page-sub">Stock procesado por calibre, variedad, procedencia y saldo pendiente por calibrar.</p>
        </div>
      </div>
      <div className="grid grid-4 mb-20">
        <div className="kpi"><div className="kpi-accent"></div><div className="kpi-label">Patrones procesados</div><div className="kpi-value">{fmtNum(totalPatrones)}</div></div>
        <div className="kpi"><div className="kpi-accent sun"></div><div className="kpi-label">Patrones pendientes</div><div className="kpi-value">{fmtNum(pendientePatrones)}</div></div>
        <div className="kpi"><div className="kpi-accent olive"></div><div className="kpi-label">Yemas procesadas</div><div className="kpi-value">{fmtNum(totalYemas)}</div></div>
        <div className="kpi"><div className="kpi-accent earth"></div><div className="kpi-label">Yemas pendientes</div><div className="kpi-value">{fmtNum(pendienteYemas)}</div></div>
      </div>
      <DailyLaborCard title="Labores del día · Sala de Proceso" rows={LABORES_DIA.sala} />
      <div className="grid grid-2 mb-20">
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Stock de patrones procesados</h3><p className="card-sub">Calibre, procedencia, variedad y saldo pendiente.</p></div></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Calibre</th><th>Variedad patrón</th><th>Procedencia</th><th className="num">Procesado</th><th className="num">Pendiente</th><th>Avance</th></tr></thead><tbody>{renderRows(PROCESO_PATRONES)}</tbody></table></div>
        </div>
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Stock de yemas procesadas</h3><p className="card-sub">Calibre, variedad y saldo pendiente por calibrar.</p></div></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Calibre</th><th>Variedad</th><th className="num">Procesado</th><th className="num">Pendiente</th><th>Avance</th></tr></thead><tbody>{renderRows(PROCESO_YEMAS)}</tbody></table></div>
        </div>
      </div>
      <div className="grid grid-2 mb-20">
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Registro de poda e injertos</h3><p className="card-sub">Poda, guarda material, injertos bolsa/barbada por cliente y proceso de barbada.</p></div></div>
          <div className="filterbar" style={{gridTemplateColumns:'repeat(2, minmax(0,1fr))', margin:'0 16px 16px'}}>
            <div className="field"><label className="label">Cliente</label><select className="select" value={clienteFiltro} onChange={e=>setClienteFiltro(e.target.value)}><option value="">Todos</option>{clientesSala.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div className="field"><label className="label">Tipo</label><select className="select" value={tipoFiltro} onChange={e=>setTipoFiltro(e.target.value)}><option value="">Todos</option>{tiposSala.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
          </div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Fecha</th><th>Tipo</th><th>Cliente</th><th>Variedad</th><th className="num">Cantidad</th><th>Estado</th></tr></thead><tbody>{registrosFiltrados.map(r => <tr key={r.fecha+r.tipo+r.cliente}><td className="text-muted">{r.fecha}</td><td className="strong">{r.tipo}</td><td>{r.cliente}</td><td>{r.variedad}</td><td className="num">{fmtNum(r.cantidad)}</td><td><span className={"chip " + (r.estado==='Registrado'?'chip-success':r.estado==='En proceso'?'chip-info':'chip-warn')}>{r.estado}</span></td></tr>)}</tbody></table></div>
        </div>
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Evaluación de encallado</h3><p className="card-sub">Resultado de injertos en cámara de calor.</p></div></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Lote</th><th>Cámara</th><th>Fecha</th><th className="num">Injertos</th><th className="num">% encallado</th><th>Resultado</th></tr></thead><tbody>{ENCALLADO_CAMARA.map(e => <tr key={e.lote+e.fecha}><td className="strong">{e.lote}</td><td>{e.camara}</td><td className="text-muted">{e.fecha}</td><td className="num">{fmtNum(e.injertos)}</td><td className="num">{fmtPct(e.encallado,0)}</td><td><span className={"chip " + (e.resultado==='Aprobado'?'chip-success':'chip-warn')}>{e.resultado}</span></td></tr>)}</tbody></table></div>
        </div>
      </div>
      <AplicacionesCard title="Aplicaciones · Sala de Proceso" rows={APLICACIONES_PROGRAMA.sala} />
    </div>
  );
}

function ModuleVid() {
  const total = VID_STOCK.reduce((a,b)=>a+b.plantas,0);
  const aptas = VID_STOCK.filter(v=>v.estado==='Aptas para venta').reduce((a,b)=>a+b.plantas,0);
  const recuperacion = VID_STOCK.filter(v=>v.estado==='En recuperación').reduce((a,b)=>a+b.plantas,0);
  const campanas = [...new Set(VID_STOCK.map(v=>v.campana))];
  return (
    <div>
      <div className="page-head"><div><h1 className="page-title">Vid</h1><p className="page-sub">Stock restante de plantas de vid por campaña y estado.</p></div></div>
      <div className="grid grid-3 mb-20">
        <div className="kpi"><div className="kpi-accent"></div><div className="kpi-label">Stock total vid</div><div className="kpi-value">{fmtNum(total)}</div></div>
        <div className="kpi"><div className="kpi-accent olive"></div><div className="kpi-label">Aptas para venta</div><div className="kpi-value">{fmtNum(aptas)}</div></div>
        <div className="kpi"><div className="kpi-accent sun"></div><div className="kpi-label">En recuperación</div><div className="kpi-value">{fmtNum(recuperacion)}</div></div>
      </div>
      <div className="grid grid-3 mb-20">
        {campanas.map(c => {
          const rows = VID_STOCK.filter(v=>v.campana===c);
          return (
            <div className="card" key={c}>
              <div className="card-body">
                <div className="label">Campaña</div>
                <h3 style={{margin:'2px 0 12px', fontFamily:'var(--font-display)', fontSize:24, fontWeight:500}}>{c}</h3>
                {rows.map(r => <div key={r.variedad+r.estado} className="row between" style={{padding:'8px 0', borderTop:'1px solid var(--line)'}}><span>{r.estado}</span><span className="strong">{fmtNum(r.plantas)}</span></div>)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">Detalle de plantas de vid</h3></div>
        <div className="table-wrap"><table className="tbl"><thead><tr><th>Campaña</th><th>Variedad</th><th>Estado</th><th className="num">Plantas</th><th>Ubicación</th></tr></thead><tbody>{VID_STOCK.map(v => <tr key={v.campana+v.variedad+v.estado}><td>{v.campana}</td><td className="strong">{v.variedad}</td><td><span className={"chip " + (v.estado==='Aptas para venta'?'chip-success':'chip-warn')}>{v.estado}</span></td><td className="num">{fmtNum(v.plantas)}</td><td className="text-muted">{v.ubicacion}</td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
}

function ModuleSombreadero() {
  const totalEstimado = SOMBREADERO_PLANTONES.reduce((a,b)=>a+b.estimado,0);
  const totalDisponible = SOMBREADERO_PLANTONES.reduce((a,b)=>a+b.disponible,0);
  return (
    <div>
      <div className="page-head"><div><h1 className="page-title">Sombreadero</h1><p className="page-sub">Labores diarias, estimación de plantones, aplicaciones y programa de riego.</p></div></div>
      <div className="grid grid-3 mb-20">
        <div className="kpi"><div className="kpi-accent"></div><div className="kpi-label">Plantones estimados</div><div className="kpi-value">{fmtNum(totalEstimado)}</div></div>
        <div className="kpi"><div className="kpi-accent olive"></div><div className="kpi-label">Disponibles</div><div className="kpi-value">{fmtNum(totalDisponible)}</div></div>
        <div className="kpi"><div className="kpi-accent sun"></div><div className="kpi-label">Avance productivo</div><div className="kpi-value">{fmtPct((totalDisponible/totalEstimado)*100,1)}</div></div>
      </div>
      <DailyLaborCard title="Labores del día · Sombreadero" rows={LABORES_DIA.sombreadero} />
      <div className="card mb-20">
        <div className="card-header"><div><h3 className="card-title">Estimación de plantones</h3><p className="card-sub">Resumen según producción por sector.</p></div></div>
        <div className="table-wrap"><table className="tbl"><thead><tr><th>Sector</th><th>Variedad</th><th className="num">Estimado</th><th className="num">Disponible</th><th>Estado</th></tr></thead><tbody>{SOMBREADERO_PLANTONES.map(s => <tr key={s.sector+s.variedad}><td className="strong">{s.sector}</td><td>{s.variedad}</td><td className="num">{fmtNum(s.estimado)}</td><td className="num">{fmtNum(s.disponible)}</td><td><span className={"chip " + (s.estado==='Observación'?'chip-warn':'chip-success')}>{s.estado}</span></td></tr>)}</tbody></table></div>
      </div>
      <AplicacionesCard title="Aplicaciones · Sombreadero" rows={APLICACIONES_PROGRAMA.sombreadero} />
      <div className="card">
        <div className="card-header"><div><h3 className="card-title">Programa y registro de riego</h3><p className="card-sub">Riego específico de áreas de sombreadero.</p></div></div>
        <div className="table-wrap"><table className="tbl"><thead><tr><th>Fecha</th><th>Área</th><th>Turno</th><th>Duración</th><th>Humedad</th><th>Estado</th></tr></thead><tbody>{RIEGO_PROGRAMA.filter(r=>r.area.includes('Sombreadero')).map(r => <tr key={r.fecha+r.area+r.turno}><td className="text-muted">{r.fecha}</td><td className="strong">{r.area}</td><td>{r.turno}</td><td>{r.duracion}</td><td>{r.humedad}</td><td><span className={"chip " + (r.estado==='Ejecutado'?'chip-success':r.estado==='Programado'?'chip-info':'chip-warn')}>{r.estado}</span></td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
}

function ModuleParrones() {
  const totalEstimado = PARRONES_ESTIMACION.reduce((a,b)=>a+b.estimado,0);
  const totalBarbadas = PARRONES_BARBADAS.reduce((a,b)=>a+b.estimado,0);
  const totalCosechado = PARRONES_BARBADAS.reduce((a,b)=>a+b.cosechado,0);
  return (
    <div>
      <div className="page-head"><div><h1 className="page-title">Parrones</h1><p className="page-sub">Estimación de patrones, fechas de poda, barbadas y evaluaciones de brotamiento.</p></div></div>
      <div className="grid grid-3 mb-20">
        <div className="kpi"><div className="kpi-accent"></div><div className="kpi-label">Patrones estimados</div><div className="kpi-value">{fmtNum(totalEstimado)}</div></div>
        <div className="kpi"><div className="kpi-accent sun"></div><div className="kpi-label">Barbadas estimadas</div><div className="kpi-value">{fmtNum(totalBarbadas)}</div></div>
        <div className="kpi"><div className="kpi-accent olive"></div><div className="kpi-label">Avance cosecha</div><div className="kpi-value">{fmtPct((totalCosechado/totalBarbadas)*100,1)}</div></div>
      </div>
      <DailyLaborCard title="Labores del día · Parrones" rows={LABORES_DIA.parrones} />
      <div className="grid grid-2 mb-20">
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Estimación de patrones y poda</h3><p className="card-sub">Fechas próximas de poda por sector.</p></div></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Patrón</th><th>Sector</th><th className="num">Estimado</th><th>Próxima poda</th><th>Responsable</th></tr></thead><tbody>{PARRONES_ESTIMACION.map(p => <tr key={p.patron+p.sector}><td className="strong">{p.patron}</td><td>{p.sector}</td><td className="num">{fmtNum(p.estimado)}</td><td><span className="chip chip-info">{p.poda}</span></td><td className="text-muted">{p.responsable}</td></tr>)}</tbody></table></div>
        </div>
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Plantas comerciales barbadas</h3><p className="card-sub">Avance de cosecha y saldo pendiente en campo.</p></div></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Variedad</th><th>Sector</th><th className="num">Estimado</th><th className="num">Cosechado</th><th className="num">Pendiente</th><th>Avance</th></tr></thead><tbody>{PARRONES_BARBADAS.map(b => { const pct=(b.cosechado/b.estimado)*100; return <tr key={b.variedad}><td className="strong">{b.variedad}</td><td>{b.sector}</td><td className="num">{fmtNum(b.estimado)}</td><td className="num">{fmtNum(b.cosechado)}</td><td className="num">{fmtNum(b.estimado-b.cosechado)}</td><td><div className="bar-track" style={{width:100,height:6}}><div className="bar-fill" style={{width:pct+'%', background:'var(--vet-leaf)'}}></div></div></td></tr>; })}</tbody></table></div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div><h3 className="card-title">Cronograma de brotamiento</h3><p className="card-sub">Evaluaciones calculadas automáticamente a 30, 60 y 90 días después del injerto.</p></div></div>
        <div className="table-wrap"><table className="tbl"><thead><tr><th>ID</th><th>Ubicación</th><th>Patrón</th><th>Variedad</th><th>Fecha injertación</th><th>Eval. 30 días</th><th>Eval. 60 días</th><th>Eval. 90 días</th></tr></thead><tbody>{PARRONES_INJERTOS.map(i => <tr key={i.id}><td className="strong">{i.id}</td><td>{i.ubicacion}</td><td>{i.patron}</td><td>{i.variedad}</td><td className="text-muted">{i.injertacion}</td><td>{addDaysISO(i.injertacion,30)}</td><td>{addDaysISO(i.injertacion,60)}</td><td>{addDaysISO(i.injertacion,90)}</td></tr>)}</tbody></table></div>
      </div>
      <AplicacionesCard title="Aplicaciones · Parrones" rows={APLICACIONES_PROGRAMA.parrones} />
      <div className="card" style={{marginTop:20}}>
        <div className="card-header"><div><h3 className="card-title">Registros de siembra y plantación</h3><p className="card-sub">Control diario por sector, patrón y estado.</p></div></div>
        <div className="table-wrap"><table className="tbl"><thead><tr><th>Fecha</th><th>Labor</th><th>Sector</th><th>Patrón</th><th className="num">Plantas</th><th>Estado</th></tr></thead><tbody>{PARRONES_SIEMBRA_PLANTACION.map(r => <tr key={r.fecha+r.labor+r.sector}><td className="text-muted">{r.fecha}</td><td className="strong">{r.labor}</td><td>{r.sector}</td><td>{r.patron}</td><td className="num">{fmtNum(r.plantas)}</td><td><span className={"chip " + (r.estado==='Registrado'?'chip-success':'chip-warn')}>{r.estado}</span></td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
}

function ModuleLogistica() {
  const pendientes = ORDENES_COMPRA.reduce((a,b)=>a+b.pendiente,0);
  const recibidas = ORDENES_COMPRA.filter(o=>o.estado==='Recibida').length;
  const stockCritico = MATERIALES.filter(m => m.stock < m.minimo);
  const toast = useToast();
  return (
    <div>
      <div className="page-head">
        <div><h1 className="page-title">Logística</h1><p className="page-sub">Órdenes de compra, stock disponible, alertas de bajo stock y productos alternativos.</p></div>
        <button className="btn btn-secondary" onClick={() => toast.success('Vista exportada', 'Resumen de logística generado')}><Icon name="download" size={14}/> Exportar</button>
      </div>
      <div className="grid grid-4 mb-20">
        <div className="kpi"><div className="kpi-accent"></div><div className="kpi-label">Órdenes activas</div><div className="kpi-value">{ORDENES_COMPRA.length}</div></div>
        <div className="kpi"><div className="kpi-accent sun"></div><div className="kpi-label">Unidades pendientes</div><div className="kpi-value">{fmtNum(pendientes)}</div></div>
        <div className="kpi"><div className="kpi-accent olive"></div><div className="kpi-label">OC recibidas</div><div className="kpi-value">{recibidas}</div></div>
        <div className="kpi"><div className="kpi-accent earth"></div><div className="kpi-label">Alertas bajo stock</div><div className="kpi-value" style={{color:stockCritico.length?'var(--danger)':'inherit'}}>{stockCritico.length}</div></div>
      </div>
      <div className="card mb-20">
        <div className="card-header"><div><h3 className="card-title">Órdenes de compra</h3><p className="card-sub">Recibido versus pendiente de llegada.</p></div></div>
        <div className="table-wrap"><table className="tbl"><thead><tr><th>OC</th><th>Proveedor</th><th>Material</th><th className="num">Solicitado</th><th className="num">Recibido</th><th className="num">Pendiente</th><th>Llegada</th><th>Estado</th></tr></thead><tbody>{ORDENES_COMPRA.map(o => <tr key={o.oc}><td className="strong">{o.oc}</td><td>{o.proveedor}</td><td>{o.material}</td><td className="num">{fmtNum(o.solicitado)}</td><td className="num">{fmtNum(o.recibido)}</td><td className="num">{fmtNum(o.pendiente)}</td><td className="text-muted">{o.llegada}</td><td><span className={"chip " + (o.estado==='Recibida'?'chip-success':o.estado==='Parcial'?'chip-warn':'chip-info')}>{o.estado}</span></td></tr>)}</tbody></table></div>
      </div>
      <div className="grid grid-2 mb-20">
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Stock disponible para logística</h3><p className="card-sub">Materiales visibles para facilitar compras y reposición.</p></div></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>SKU</th><th>Material</th><th className="num">Stock</th><th className="num">Mínimo</th><th>Estado compra</th></tr></thead><tbody>{MATERIALES.slice(0,6).map(m => { const bajo = m.stock < m.minimo; return <tr key={m.sku}><td className="strong">{m.sku}</td><td>{m.nombre}</td><td className="num">{fmtNum(m.stock)} {m.unidad}</td><td className="num text-muted">{fmtNum(m.minimo)} {m.unidad}</td><td><span className={"chip " + (bajo?'chip-danger':'chip-success')}>{bajo?'Reponer':'Disponible'}</span></td></tr>; })}</tbody></table></div>
        </div>
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Alertas de bajo stock</h3><p className="card-sub">Insumos que requieren gestión de compra.</p></div></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Material</th><th>Categoría</th><th className="num">Déficit</th><th>Acción</th></tr></thead><tbody>{stockCritico.map(m => <tr key={m.sku}><td className="strong">{m.nombre}</td><td>{m.categoria}</td><td className="num">{fmtNum(m.minimo-m.stock)} {m.unidad}</td><td><button className="btn btn-sun btn-sm" onClick={() => toast.warn('Compra sugerida', `${m.nombre} bajo mínimo`)}><Icon name="alert" size={13}/> Generar alerta</button></td></tr>)}</tbody></table></div>
        </div>
      </div>
      <div className="grid grid-2 mb-20">
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Fechas programadas de envío</h3><p className="card-sub">Programación logística por cliente, lote y destino.</p></div></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Fecha</th><th>Cliente</th><th>Lote</th><th className="num">Plantas</th><th>Destino</th><th>Estado</th></tr></thead><tbody>{ENVIO_PROGRAMADO.map(e => <tr key={e.fecha+e.lote}><td className="text-muted">{e.fecha}</td><td className="strong">{e.cliente}</td><td>{e.lote}</td><td className="num">{fmtNum(e.plantas)}</td><td>{e.destino}</td><td><span className={"chip " + (e.estado==='Confirmado'?'chip-success':'chip-info')}>{e.estado}</span></td></tr>)}</tbody></table></div>
        </div>
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Registro de envíos</h3><p className="card-sub">Guías, transportista y estado de despacho.</p></div></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Fecha</th><th>Cliente</th><th>Guía</th><th>Transportista</th><th className="num">Plantas</th><th>Estado</th></tr></thead><tbody>{REGISTRO_ENVIOS.map(e => <tr key={e.guia}><td className="text-muted">{e.fecha}</td><td className="strong">{e.cliente}</td><td>{e.guia}</td><td>{e.transportista}</td><td className="num">{fmtNum(e.plantas)}</td><td><span className={"chip " + (e.estado==='Entregado'?'chip-success':'chip-warn')}>{e.estado}</span></td></tr>)}</tbody></table></div>
        </div>
      </div>
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header"><h3 className="card-title">Compras archivadas o canceladas</h3></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>OC</th><th>Material</th><th>Motivo</th><th>Fecha</th></tr></thead><tbody>{COMPRAS_ARCHIVADAS.map(c => <tr key={c.oc}><td className="strong">{c.oc}</td><td>{c.material}</td><td className="text-muted">{c.motivo}</td><td>{c.fecha}</td></tr>)}</tbody></table></div>
        </div>
        <div className="card">
          <div className="card-header"><h3 className="card-title">Productos alternativos disponibles</h3></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Producto</th><th>Alternativo</th><th>Cobertura</th><th className="num">Stock</th></tr></thead><tbody>{PRODUCTOS_ALTERNATIVOS.map(p => <tr key={p.producto}><td className="strong">{p.producto}</td><td>{p.alternativo}</td><td><span className={"chip " + (p.cobertura==='Alta'?'chip-success':p.cobertura==='Media'?'chip-warn':'chip-info')}>{p.cobertura}</span></td><td className="num">{fmtNum(p.stock)}</td></tr>)}</tbody></table></div>
        </div>
      </div>
    </div>
  );
}

function ModuleRiego() {
  const ejecutados = RIEGO_PROGRAMA.filter(r=>r.estado==='Ejecutado').length;
  const pendientes = RIEGO_PROGRAMA.filter(r=>r.estado==='Pendiente').length;
  const programados = RIEGO_PROGRAMA.filter(r=>r.estado==='Programado').length;
  return (
    <div>
      <div className="page-head"><div><h1 className="page-title">Riego</h1><p className="page-sub">Programa y registro de riego por área, turno y estado.</p></div></div>
      <div className="grid grid-3 mb-20">
        <div className="kpi"><div className="kpi-accent olive"></div><div className="kpi-label">Ejecutados</div><div className="kpi-value">{ejecutados}</div></div>
        <div className="kpi"><div className="kpi-accent sun"></div><div className="kpi-label">Programados</div><div className="kpi-value">{programados}</div></div>
        <div className="kpi"><div className="kpi-accent earth"></div><div className="kpi-label">Pendientes</div><div className="kpi-value">{pendientes}</div></div>
      </div>
      <div className="card">
        <div className="card-header"><div><h3 className="card-title">Programa y registro de riego en áreas</h3><p className="card-sub">Control operativo por área y humedad registrada.</p></div></div>
        <div className="table-wrap"><table className="tbl"><thead><tr><th>Fecha</th><th>Área</th><th>Turno</th><th>Duración</th><th>Humedad</th><th>Estado</th></tr></thead><tbody>{RIEGO_PROGRAMA.map(r => <tr key={r.fecha+r.area+r.turno}><td className="text-muted">{r.fecha}</td><td className="strong">{r.area}</td><td>{r.turno}</td><td>{r.duracion}</td><td>{r.humedad}</td><td><span className={"chip " + (r.estado==='Ejecutado'?'chip-success':r.estado==='Programado'?'chip-info':'chip-warn')}>{r.estado}</span></td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
}

function ModuleMateriales() {
  const toast = useToast();
  const activityRows = allActivities().filter(a => a.material);
  const usoAnunciado = activityRows.reduce((a,b)=>a + (Number(b.cantidad) || 0), 0);
  const descuentos = activityRows.filter(a => a.impacto === 'descuento_bodega').length;
  const stockOuts = activityRows.filter(a => a.impacto === 'stock_out').length;
  const alarmas = activityRows.filter(a => a.alarma).length;
  const vencen6Meses = MATERIAL_VENCIMIENTOS.length;
  const fichas = MATERIALES.slice(0,4).map((m,i) => ({...m, ficha:i%2===0?'Actualizada':'Pendiente', version:i%2===0?'v2026.05':'Sin versión', fecha:i%2===0?'2026-05-20':'—'}));
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Análisis de materiales</h1>
          <p className="page-sub">Stock, consumo y alertas de reposición</p>
        </div>
        <div className="actions">
          <button className="btn btn-secondary"><Icon name="download" size={14}/> Exportar</button>
          <button className="btn btn-primary"><Icon name="plus" size={14}/> Nueva entrada</button>
        </div>
      </div>
      <div className="grid grid-4 mb-20">
        <div className="kpi"><div className="kpi-accent"></div><div className="kpi-label">Utilización anunciada</div><div className="kpi-value">{fmtNum(usoAnunciado)}</div><div className="kpi-foot">Desde actividades</div></div>
        <div className="kpi"><div className="kpi-accent sun"></div><div className="kpi-label">Descuentos bodega</div><div className="kpi-value">{descuentos}</div><div className="kpi-foot">Programados</div></div>
        <div className="kpi"><div className="kpi-accent olive"></div><div className="kpi-label">Alertas stock-out</div><div className="kpi-value" style={{color:stockOuts?'var(--danger)':'inherit'}}>{stockOuts}</div><div className="kpi-foot">Por actividad</div></div>
        <div className="kpi"><div className="kpi-accent earth"></div><div className="kpi-label">Vencen en 6 meses</div><div className="kpi-value">{vencen6Meses}</div><div className="kpi-foot">Almacén</div></div>
      </div>
      <div className="card mb-20">
        <div className="card-header"><div><h3 className="card-title">Actividades vinculadas a materiales</h3><p className="card-sub">Alimentan utilización anunciada, descuentos de bodega y alertas.</p></div></div>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Fecha</th><th>Actividad</th><th>Material</th><th className="num">Cantidad</th><th>Impacto</th><th>Alarma</th></tr></thead>
            <tbody>
              {activityRows.map(a => (
                <tr key={a.id}>
                  <td className="text-muted">{a.fecha}</td>
                  <td className="strong">{a.actividad}</td>
                  <td>{a.material}</td>
                  <td className="num">{fmtNum(Number(a.cantidad) || 0)} <span className="text-muted">{a.unidad}</span></td>
                  <td><span className={"chip " + (a.impacto==='stock_out'?'chip-danger':a.impacto==='descuento_bodega'?'chip-warn':'chip-info')}>{a.impacto.replace(/_/g,' ')}</span></td>
                  <td className="text-muted">{a.alarma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-2 mb-20">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Productos próximos a vencer</h3>
              <p className="card-sub">Informe demo para utilización en aplicaciones programadas dentro de 6 meses.</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => toast.success('Informe descargado', 'Productos a vencer en 6 meses exportados')}><Icon name="download" size={13}/> Informe</button>
          </div>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>SKU</th><th>Producto</th><th>Lote</th><th>Vence</th><th className="num">Stock</th><th>Uso sugerido</th></tr></thead>
              <tbody>
                {MATERIAL_VENCIMIENTOS.map(v => (
                  <tr key={v.sku}>
                    <td className="strong">{v.sku}</td><td>{v.producto}</td><td>{v.lote}</td><td><span className="chip chip-warn">{v.vence}</span></td><td className="num">{fmtNum(v.stock)} {v.unidad}</td><td className="text-muted">{v.uso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Jabas y bins</h3><p className="card-sub">Control de stock disponible, retornos pendientes y saldos por devolver.</p></div></div>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Item</th><th className="num">Stock disponible</th><th className="num">Retorno pendiente</th><th className="num">Saldo por devolver</th></tr></thead>
              <tbody>{ENVASES_STOCK.map(e => <tr key={e.item}><td className="strong">{e.item}</td><td className="num">{fmtNum(e.disponible)}</td><td className="num">{fmtNum(e.retorno)}</td><td className="num">{fmtNum(e.devolver)}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card mb-20">
        <div className="card-header"><div><h3 className="card-title">Fichas técnicas actualizadas</h3><p className="card-sub">Control de versión y adjuntos para productos de almacén.</p></div></div>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>SKU</th><th>Producto</th><th>Categoría</th><th>Ficha técnica</th><th>Versión</th><th>Actualización</th><th></th></tr></thead>
            <tbody>
              {fichas.map(f => (
                <tr key={f.sku}>
                  <td className="strong">{f.sku}</td><td>{f.nombre}</td><td><span className="chip">{f.categoria}</span></td><td><span className={"chip " + (f.ficha==='Actualizada'?'chip-success':'chip-warn')}>{f.ficha}</span></td><td>{f.version}</td><td className="text-muted">{f.fecha}</td>
                  <td className="row gap-8"><button className="btn btn-secondary btn-sm" onClick={() => toast.success('Ficha adjuntada', `${f.nombre} actualizada`)}><Icon name="plus" size={13}/> Adjuntar ficha técnica</button><button className="btn btn-ghost btn-sm" onClick={() => toast.info('Vista de ficha', `Ficha técnica de ${f.nombre}`)}><Icon name="eye" size={13}/> Ver ficha</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">Inventario</h3></div>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>SKU</th><th>Material</th><th>Categoría</th><th className="num">Stock</th><th className="num">Mínimo</th><th>Cobertura</th><th>Estado</th></tr></thead>
            <tbody>
              {MATERIALES.map(m => {
                const ratio = m.stock / m.minimo;
                const pct = Math.min(ratio*50, 100);
                const bajo = m.stock < m.minimo;
                return (
                  <tr key={m.sku}>
                    <td className="strong">{m.sku}</td>
                    <td>{m.nombre}</td>
                    <td><span className="chip">{m.categoria}</span></td>
                    <td className="num">{fmtNum(m.stock)} <span className="text-muted">{m.unidad}</span></td>
                    <td className="num text-muted">{fmtNum(m.minimo)} {m.unidad}</td>
                    <td>
                      <div className="bar-track" style={{width:120, height:6}}>
                        <div className="bar-fill" style={{width: pct+'%', background: bajo?'var(--danger)':ratio<2?'var(--vet-sun)':'var(--vet-leaf)'}}></div>
                      </div>
                    </td>
                    <td>{bajo
                      ? <span className="chip chip-danger"><span className="chip-dot"></span>Crítico</span>
                      : ratio<2 ? <span className="chip chip-warn"><span className="chip-dot"></span>Atención</span>
                      : <span className="chip chip-success"><span className="chip-dot"></span>OK</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ───────── Actividades ─────────
function ModuleActividades() {
  const toast = useToast();
  const [items, setItems] = React.useState(allActivities());
  const [form, setForm] = React.useState({
    fecha:'2026-05-18',
    tipo:'Uso material',
    actividad:'',
    responsable:'',
    lote:'L-2025-001',
    material:'Cinta de injerto biodegradable',
    cantidad:0,
    unidad:'un',
    impacto:'utilizacion_anunciada',
    alarma:'',
  });
  const registrar = () => {
    const nuevo = {
      ...form,
      id:'ACT-' + String(Date.now()).slice(-5),
      cantidad:Number(form.cantidad) || 0,
      estado:'Planificada',
    };
    appendActivity(nuevo);
    const next = [nuevo, ...items];
    setItems(next);
    setForm({...form, actividad:'', responsable:'', cantidad:0, alarma:''});
    toast.success('Actividad registrada', 'También aparecerá en Calendario y Materiales.');
  };
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Actividades</h1>
          <p className="page-sub">Registro de tareas, calendario y consumo anunciado de materiales.</p>
        </div>
      </div>
      <div className="grid split-form mb-20">
        <div className="card">
          <div className="card-header"><h3 className="card-title">Nueva actividad</h3></div>
          <div className="card-body" style={{display:'flex', flexDirection:'column', gap:12}}>
            <div className="field"><label className="label">Fecha</label><input className="input" type="date" value={form.fecha} onChange={e=>setForm({...form, fecha:e.target.value})}/></div>
            <div className="field"><label className="label">Tipo</label><select className="select" value={form.tipo} onChange={e=>setForm({...form, tipo:e.target.value})}><option>Uso material</option><option>Recepción</option><option>Control</option><option>Tarea general</option></select></div>
            <div className="field"><label className="label">Actividad</label><input className="input" value={form.actividad} onChange={e=>setForm({...form, actividad:e.target.value})} placeholder="Ej. Injertación lote AIB"/></div>
            <div className="field"><label className="label">Responsable</label><input className="input" value={form.responsable} onChange={e=>setForm({...form, responsable:e.target.value})} placeholder="Área o persona"/></div>
            <div className="field"><label className="label">Lote / referencia</label><input className="input" value={form.lote} onChange={e=>setForm({...form, lote:e.target.value})}/></div>
            <div className="grid grid-2 gap-12">
              <div className="field"><label className="label">Material</label><input className="input" value={form.material} onChange={e=>setForm({...form, material:e.target.value})}/></div>
              <div className="field"><label className="label">Cantidad</label><input className="input" type="number" value={form.cantidad} onChange={e=>setForm({...form, cantidad:e.target.value})}/></div>
            </div>
            <div className="grid grid-2 gap-12">
              <div className="field"><label className="label">Unidad</label><input className="input" value={form.unidad} onChange={e=>setForm({...form, unidad:e.target.value})}/></div>
              <div className="field"><label className="label">Impacto</label><select className="select" value={form.impacto} onChange={e=>setForm({...form, impacto:e.target.value})}><option value="utilizacion_anunciada">utilizacion_anunciada</option><option value="descuento_bodega">descuento_bodega</option><option value="stock_out">stock_out</option><option value="alarma_general">alarma_general</option></select></div>
            </div>
            <div className="field"><label className="label">Alarma</label><textarea className="textarea" value={form.alarma} onChange={e=>setForm({...form, alarma:e.target.value})} placeholder="Riesgo, aviso o condición operacional"/></div>
            <button className="btn btn-primary btn-lg" onClick={registrar} disabled={!form.actividad.trim()}><Icon name="plus" size={16}/> Registrar actividad</button>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Tareas y actividades</h3><p className="card-sub">Se reflejan en Calendario y Análisis de materiales.</p></div></div>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Fecha</th><th>Tipo</th><th>Actividad</th><th>Responsable</th><th>Material</th><th className="num">Cantidad</th><th>Estado</th></tr></thead>
              <tbody>
                {items.map(a => (
                  <tr key={a.id}>
                    <td className="text-muted">{a.fecha}</td>
                    <td><span className="chip">{a.tipo}</span></td>
                    <td className="strong">{a.actividad}</td>
                    <td>{a.responsable}</td>
                    <td>{a.material}</td>
                    <td className="num">{fmtNum(Number(a.cantidad) || 0)} <span className="text-muted">{a.unidad}</span></td>
                    <td><span className="chip chip-info">{a.estado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────── Calendario ─────────
function ModuleCalendario() {
  const events = {
    3:[{t:'Injert. AIB', c:'leaf'}],
    5:[{t:'Injert. Danper', c:'leaf'}],
    7:[{t:'Reunión Sun World', c:'info'}],
    10:[{t:'Despacho Don Luis', c:'sun'}],
    12:[{t:'Injert. Agrolatina', c:'leaf'},{t:'Visita Parvina', c:'info'}],
    15:[{t:'Liberación L-2025-003', c:'sun'}],
    19:[{t:'Despacho SAMNSA', c:'sun'}],
    22:[{t:'Injert. Florida B.', c:'leaf'}],
    27:[{t:'Cosecha barbadas', c:'leaf'}],
  };
  const activityEvents = allActivities().reduce((acc, a) => {
    const day = Number((a.fecha || '').slice(-2));
    if (!day) return acc;
    if (!acc[day]) acc[day] = [];
    acc[day].push({t:a.actividad, c:a.impacto==='stock_out'?'danger':a.tipo==='Control'?'info':'leaf'});
    return acc;
  }, {});
  const days = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  const cells = [];
  // Mayo 2026 starts on Friday (offset 4)
  for (let i=0; i<4; i++) cells.push({d: 30-3+i, muted:true});
  for (let d=1; d<=31; d++) cells.push({d});
  while (cells.length < 35) cells.push({d: cells.length-34, muted:true});
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Calendario</h1>
          <p className="page-sub">Mayo 2026 · planificación productiva, comercial y actividades registradas</p>
        </div>
        <div className="actions">
          <button className="btn btn-secondary btn-sm"><Icon name="chevron-left" size={13}/></button>
          <span style={{fontWeight:600, padding:'0 8px'}}>Mayo 2026</span>
          <button className="btn btn-secondary btn-sm"><Icon name="chevron-right" size={13}/></button>
          <button className="btn btn-primary"><Icon name="plus" size={14}/> Actividad</button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="cal" style={{marginBottom:8}}>
            {days.map(d => <div key={d} className="head">{d}</div>)}
          </div>
          <div className="cal">
            {cells.map((c,i) => (
              <div key={i} className={"cell " + (c.muted?'muted':'')}>
                <div className="d">{c.d}</div>
                {!c.muted && [...(events[c.d] || []), ...(activityEvents[c.d] || [])].map((e,j) => (
                  <div key={j} className={"ev " + e.c}>{e.t}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card" style={{marginTop:20}}>
        <div className="card-header"><div><h3 className="card-title">Calendario de injertación</h3><p className="card-sub">Fechas de injertación y evaluaciones derivadas por lote.</p></div></div>
        <div className="table-wrap"><table className="tbl"><thead><tr><th>ID</th><th>Ubicación</th><th>Patrón</th><th>Variedad</th><th>Injertación</th><th>30 días</th><th>60 días</th><th>90 días</th></tr></thead><tbody>{PARRONES_INJERTOS.map(i => <tr key={i.id}><td className="strong">{i.id}</td><td>{i.ubicacion}</td><td>{i.patron}</td><td>{i.variedad}</td><td className="text-muted">{i.injertacion}</td><td>{addDaysISO(i.injertacion,30)}</td><td>{addDaysISO(i.injertacion,60)}</td><td>{addDaysISO(i.injertacion,90)}</td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
}

// ───────── Lotes ─────────
function ModuleLotes() {
  const [filter, setFilter] = React.useState('');
  const filtered = LOTES.filter(l => !filter || l.estado === filter);
  const estados = [...new Set(LOTES.map(l=>l.estado))];
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Lotes</h1>
          <p className="page-sub">{LOTES.length} lotes activos · {fmtNum(LOTES.reduce((a,b)=>a+b.plantas,0))} plantas</p>
        </div>
        <button className="btn btn-primary"><Icon name="plus" size={14}/> Nuevo lote</button>
      </div>
      <div className="row wrap gap-8 mb-16">
        <FilterChip label="Todos" active={!filter} onClick={() => setFilter('')} />
        {estados.map(e => <FilterChip key={e} label={e} active={filter===e} onClick={() => setFilter(e)} onRemove={filter===e ? () => setFilter('') : null} />)}
      </div>
      <div className="grid grid-3">
        {filtered.map(l => (
          <div key={l.id} className="card">
            <div className="card-body">
              <div className="row between mb-8">
                <span className="text-mono" style={{fontSize:12.5, color:'var(--muted)'}}>{l.id}</span>
                <span className={"chip " + (l.calidad==='OK'?'chip-success':l.calidad==='Alerta'?'chip-warn':'chip-danger')}><span className="chip-dot"></span>{l.calidad}</span>
              </div>
              <h3 style={{margin:'0 0 4px', fontSize:16, fontFamily:'var(--font-display)', fontWeight:500}}>{l.variedad}</h3>
              <div className="text-muted" style={{fontSize:13}}>{l.cliente}</div>
              <div className="divider" style={{margin:'14px 0'}}></div>
              <div className="grid grid-2 gap-12 mb-12">
                <div><div className="label">Plantas</div><div style={{fontWeight:600, fontSize:14}}>{fmtNum(l.plantas)}</div></div>
                <div><div className="label">Ubicación</div><div style={{fontSize:14}}>{l.ubicacion}</div></div>
              </div>
              <div className="row between mb-8" style={{fontSize:12, color:'var(--muted)'}}>
                <span>Estado: <strong style={{color:'var(--vet-text)'}}>{l.estado}</strong></span>
                <span>{l.dds} días</span>
              </div>
              <div className="bar-track" style={{height:6}}>
                <div className="bar-fill" style={{width: Math.min(l.dds, 100)+'%', background: l.dds<30?'var(--vet-leaf)':l.dds<70?'var(--vet-sun)':'var(--vet-earth)'}}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────── Liberación de calidad ─────────
function ModuleLiberacion() {
  const toast = useToast();
  const [orden, setOrden] = React.useState('LB-001');
  const [params, setParams] = React.useState([
    'Calibre y uniformidad según contrato',
    'Ausencia de plagas visibles',
    'Raíz activa y sin daño mecánico',
    'Etiquetado y trazabilidad completa',
  ]);
  const [observaciones, setObservaciones] = React.useState('');
  const [noConformidades, setNoConformidades] = React.useState('');
  const items = [
    { id:'LB-001', lote:'L-2025-003', tipo:'Liberación final', resp:'C. Ruiz', estado:'Pendiente', fecha:'2026-05-04' },
    { id:'LB-002', lote:'L-2025-004', tipo:'Inspección parcial', resp:'P. Vera', estado:'Aprobado', fecha:'2026-05-03' },
    { id:'LB-003', lote:'L-2025-001', tipo:'Liberación final', resp:'C. Ruiz', estado:'Aprobado', fecha:'2026-05-02' },
    { id:'LB-004', lote:'L-2025-008', tipo:'Inspección crítica', resp:'M. Soto', estado:'Rechazado', fecha:'2026-05-01' },
  ];
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Liberación de calidad</h1>
          <p className="page-sub">Visado y aprobación de lotes para despacho</p>
        </div>
      </div>
      <div className="card mb-20">
        <div className="card-header"><div><h3 className="card-title">Resultados de análisis por lote</h3><p className="card-sub">Nematológico, foliar, micológico, virus, humedad y viabilidad.</p></div></div>
        <div className="table-wrap"><table className="tbl"><thead><tr><th>Lote</th><th>Tipo análisis</th><th>Fecha</th><th>Resultado</th><th>Estado</th></tr></thead><tbody>{ANALISIS_LOTE.map(a => <tr key={a.lote+a.tipo}><td className="strong">{a.lote}</td><td>{a.tipo}</td><td className="text-muted">{a.fecha}</td><td>{a.resultado}</td><td><span className={"chip " + (a.estado==='OK'?'chip-success':a.estado==='Pendiente'?'chip-info':'chip-warn')}>{a.estado}</span></td></tr>)}</tbody></table></div>
      </div>
      <div className="card mb-20">
        <div className="card-header"><div><h3 className="card-title">Checklist bajo demanda</h3><p className="card-sub">Parámetros editables por solicitud u orden de cliente.</p></div></div>
        <div className="card-body" style={{display:'flex', flexDirection:'column', gap:14}}>
          <div className="grid grid-2 gap-12">
            <div className="field"><label className="label">Solicitud / orden</label><select className="select" value={orden} onChange={e=>setOrden(e.target.value)}>{items.map(i => <option key={i.id} value={i.id}>{i.id} · {i.lote}</option>)}</select></div>
            <div className="field"><label className="label">Nuevo criterio</label><div className="row gap-8"><input id="new-quality-param" className="input" placeholder="Criterio requerido por cliente"/><button className="btn btn-secondary" onClick={() => { const el = document.getElementById('new-quality-param'); if (el.value.trim()) { setParams([...params, el.value.trim()]); el.value=''; } }}><Icon name="plus" size={14}/></button></div></div>
          </div>
          <div className="grid grid-2 gap-12">
            {params.map((p,i) => (
              <label key={i} style={{display:'flex', alignItems:'center', gap:10, padding:12, border:'1px solid var(--line)', borderRadius:8, background:'#fff'}}>
                <input type="checkbox" style={{width:18, height:18, accentColor:'var(--vet-leaf)'}}/>
                <input className="input" value={p} onChange={e => setParams(params.map((x,idx)=>idx===i?e.target.value:x))}/>
              </label>
            ))}
          </div>
          <div className="grid grid-2 gap-12">
            <div className="field"><label className="label">Observaciones de auditoría</label><textarea className="textarea" value={observaciones} onChange={e=>setObservaciones(e.target.value)} placeholder="Observaciones del inspector"/></div>
            <div className="field"><label className="label">No conformances</label><textarea className="textarea" value={noConformidades} onChange={e=>setNoConformidades(e.target.value)} placeholder="No conformidades detectadas"/></div>
          </div>
          <div className="row between wrap gap-8">
            <span className="text-muted" style={{fontSize:12.5}}>Registro auditable: criterios, observaciones y no conformidades quedan asociados a {orden}.</span>
            <button className="btn btn-primary" onClick={() => toast.success('Checklist generado', `${orden} con ${params.length} criterios editables`)}><Icon name="clipboard" size={14}/> Generar checklist</button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">Solicitudes de liberación</h3></div>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>ID</th><th>Lote</th><th>Tipo</th><th>Responsable</th><th>Estado</th><th>Fecha</th><th></th></tr></thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <td className="strong">{i.id}</td>
                  <td>{i.lote}</td>
                  <td>{i.tipo}</td>
                  <td>{i.resp}</td>
                  <td><span className={"chip " + (i.estado==='Aprobado'?'chip-success':i.estado==='Pendiente'?'chip-warn':'chip-danger')}>{i.estado}</span></td>
                  <td className="text-muted">{i.fecha}</td>
                  <td>
                    {i.estado==='Pendiente' && <button className="btn btn-primary btn-sm" onClick={() => toast.success('Liberado', `${i.id} aprobado para despacho`)}><Icon name="check" size={13}/> Liberar</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ───────── Costos / Maestros ─────────
function ModuleCostos() {
  const ag = aggregateER(CONTRATOS_ER);
  const areaRows = [
    { area:'Sombreadero', presupuesto:82000000, real:76800000 },
    { area:'Parrones', presupuesto:64500000, real:67200000 },
    { area:'Riego', presupuesto:28800000, real:30400000 },
    { area:'Injertación', presupuesto:112000000, real:104600000 },
  ];
  const categoryRows = [
    { categoria:'Insumos', presupuesto:ag.insumos * 1.08, real:ag.insumos },
    { categoria:'Mano de Obra', presupuesto:ag.mano * 1.12, real:ag.mano },
    { categoria:'Costos indirectos', presupuesto:ag.indirectos * 0.98, real:ag.indirectos },
    { categoria:'Otros por definir', presupuesto:18000000, real:16400000 },
  ];
  const totalPresupuesto = categoryRows.reduce((a,b)=>a+b.presupuesto,0);
  const totalReal = categoryRows.reduce((a,b)=>a+b.real,0);
  const renderComparisonRows = rows => rows.map(r => {
    const delta = r.presupuesto - r.real;
    const pct = r.presupuesto ? (r.real / r.presupuesto) * 100 : 0;
    return (
      <tr key={r.area || r.categoria}>
        <td className="strong">{r.area || r.categoria}</td>
        <td className="num">{fmtCLP(r.presupuesto)}</td>
        <td className="num">{fmtCLP(r.real)}</td>
        <td className="num" style={{color:delta>=0?'var(--success)':'var(--danger)'}}>{fmtCLP(Math.abs(delta))} {delta>=0?'favor':'sobre'}</td>
        <td>
          <div className="bar-track" style={{width:120, height:6}}>
            <div className="bar-fill" style={{width:Math.min(pct,120)+'%', background:pct>100?'var(--danger)':pct>95?'var(--vet-sun)':'var(--vet-leaf)'}}></div>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <div className="page-head"><div><h1 className="page-title">Costos y presupuesto</h1><p className="page-sub">Ejecución vs presupuesto · período actual</p></div></div>
      <div className="grid grid-3 mb-20">
        <div className="kpi"><div className="kpi-accent sun"></div><div className="kpi-label">Insumos</div><div className="kpi-value">{fmtCLP(ag.insumos)}</div><div className="kpi-foot">93% del presupuesto</div></div>
        <div className="kpi"><div className="kpi-accent earth"></div><div className="kpi-label">Mano de obra</div><div className="kpi-value">{fmtCLP(ag.mano)}</div><div className="kpi-foot">88% del presupuesto</div></div>
        <div className="kpi"><div className="kpi-accent olive"></div><div className="kpi-label">Indirectos</div><div className="kpi-value">{fmtCLP(ag.indirectos)}</div><div className="kpi-foot">102% del presupuesto</div></div>
      </div>
      <div className="grid grid-2 mb-20">
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Budget vs Actual por área</h3><p className="card-sub">Sombreadero, Parrones, Riego e Injertación.</p></div></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Área</th><th className="num">Budget</th><th className="num">Actual</th><th className="num">Diferencia</th><th>Ejecución</th></tr></thead><tbody>{renderComparisonRows(areaRows)}</tbody></table></div>
        </div>
        <div className="card">
          <div className="card-header"><div><h3 className="card-title">Budget vs Actual por categoría</h3><p className="card-sub">Insumos, Mano de Obra y otras categorías.</p></div></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Categoría</th><th className="num">Budget</th><th className="num">Actual</th><th className="num">Diferencia</th><th>Ejecución</th></tr></thead><tbody>{renderComparisonRows(categoryRows)}<tr><td className="strong">Total</td><td className="num strong">{fmtCLP(totalPresupuesto)}</td><td className="num strong">{fmtCLP(totalReal)}</td><td className="num strong">{fmtCLP(Math.abs(totalPresupuesto-totalReal))}</td><td></td></tr></tbody></table></div>
        </div>
      </div>
    </div>
  );
}

function ModuleMaestros() {
  const tabs = ['Variedades','Patrones','Clientes','Productores','Sectores','Usuarios'];
  const [t, setT] = React.useState(tabs[0]);
  return (
    <div>
      <div className="page-head"><div><h1 className="page-title">Maestros</h1><p className="page-sub">Configuración de catálogos del sistema</p></div></div>
      <div className="tabs">{tabs.map(x => <button key={x} className={"tab " + (t===x?'active':'')} onClick={()=>setT(x)}>{x}</button>)}</div>
      <div className="card"><div className="card-body">
        <div className="empty"><div className="empty-icon"><Icon name="masters" size={22}/></div><div className="empty-title">Catálogo de {t}</div><div className="empty-msg">El módulo de maestros permitirá administrar {t.toLowerCase()} del sistema. Conexión a backend pendiente.</div><button className="btn btn-secondary btn-sm"><Icon name="plus" size={13}/> Agregar {t.slice(0,-1).toLowerCase()}</button></div>
      </div></div>
    </div>
  );
}

// ───────── Alertas ─────────
function ModuleAlertas() {
  const materialAlerts = allActivities().filter(a => a.alarma);
  const postventaAlerts = POSTVENTA.filter(p => p.estado !== 'Aprobado');
  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Alertas</h1>
          <p className="page-sub">Vista de lectura para Directorio · alertas operacionales y comerciales.</p>
        </div>
      </div>
      <div className="grid grid-3 mb-20">
        <div className="kpi"><div className="kpi-accent sun"></div><div className="kpi-label">Notificaciones activas</div><div className="kpi-value">{NOTIFS.length}</div></div>
        <div className="kpi"><div className="kpi-accent earth"></div><div className="kpi-label">Alarmas materiales</div><div className="kpi-value">{materialAlerts.length}</div></div>
        <div className="kpi"><div className="kpi-accent olive"></div><div className="kpi-label">Postventa pendiente</div><div className="kpi-value">{postventaAlerts.length}</div></div>
      </div>
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header"><h3 className="card-title">Alertas generales</h3></div>
          <div style={{display:'flex', flexDirection:'column'}}>
            {NOTIFS.map((n,i) => (
              <div key={i} style={{padding:'14px 20px', borderBottom:i<NOTIFS.length-1?'1px solid var(--line)':'none', display:'flex', gap:12}}>
                <div style={{width:34, height:34, borderRadius:8, background:n.tipo==='warn'?'var(--warn-bg)':n.tipo==='success'?'var(--success-bg)':'var(--info-bg)', display:'grid', placeItems:'center'}}><Icon name={n.icon} size={16}/></div>
                <div><div style={{fontSize:13.5, fontWeight:600}}>{n.titulo}</div><div className="text-muted" style={{fontSize:12}}>{n.tiempo}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h3 className="card-title">Alarmas de actividades</h3></div>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Fecha</th><th>Actividad</th><th>Impacto</th><th>Alarma</th></tr></thead>
              <tbody>
                {materialAlerts.map(a => (
                  <tr key={a.id}><td className="text-muted">{a.fecha}</td><td className="strong">{a.actividad}</td><td><span className={"chip " + (a.impacto==='stock_out'?'chip-danger':'chip-warn')}>{a.impacto.replace(/_/g,' ')}</span></td><td className="text-muted">{a.alarma}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────── Campo móvil ─────────
function PhoneScreen({ children }) {
  return (
    <div className="phone">
      <div className="phone-screen">
        <div style={{padding:'40px 18px 8px', display:'flex', justifyContent:'space-between', fontSize:11, color:'#fff', background:'var(--vet-leaf-dark)'}}>
          <span style={{fontWeight:600}}>9:41</span>
          <div className="row gap-4"><Icon name="wifi-off" size={11} stroke={2.4}/><span>•••</span><span>92%</span></div>
        </div>
        <div style={{flex:1, overflowY:'auto', display:'flex', flexDirection:'column'}}>{children}</div>
      </div>
    </div>
  );
}
function CampoMovil() {
  const toast = useToast();
  const [view, setView] = React.useState('home');
  const [dds, setDds] = React.useState({lote:'L-2025-001', dds:42, observacion:''});
  const [check, setCheck] = React.useState({riego:false, plagas:false, malezas:false, brotes:false});

  const Home = () => (
    <>
      <div style={{padding:'18px', background:'var(--vet-leaf-dark)', color:'#fff'}}>
        <div className="row gap-8 mb-12">
          <div style={{width:38, height:38, borderRadius:10, background:'rgba(255,255,255,.15)', display:'grid', placeItems:'center'}}>
            <VetLogo size={22} />
          </div>
          <div><div style={{fontWeight:600, fontSize:14}}>Hola, Carlos</div><div style={{fontSize:11.5, opacity:.85}}>Operario campo</div></div>
          <div style={{marginLeft:'auto'}}><span className="chip" style={{background:'rgba(255,255,255,.15)', color:'#fff', borderColor:'transparent'}}><Icon name="map-pin" size={11}/> Sector A-3</span></div>
        </div>
        <div style={{fontSize:12, opacity:.85}}>Lunes, 4 de mayo</div>
        <div style={{fontFamily:'var(--font-display)', fontSize:22, fontWeight:500, marginTop:4}}>3 tareas para hoy</div>
      </div>
      <div style={{padding:14, display:'flex', flexDirection:'column', gap:10}}>
        {[
          { t:'Registrar DDS', s:'Lote L-2025-001 · Sector A-3', i:'dds', v:'dds' },
          { t:'Checklist diario', s:'Riego, plagas, malezas, brotes', i:'clipboard', v:'check' },
          { t:'Reportar incidencia', s:'Foto + descripción', i:'alert', v:'incid' },
        ].map((t,i) => (
          <button key={i} onClick={() => setView(t.v)} style={{
            display:'flex', gap:12, alignItems:'center',
            background:'#fff', border:'1px solid var(--line)', borderRadius:12,
            padding:14, cursor:'pointer', textAlign:'left',
          }}>
            <div style={{width:42, height:42, borderRadius:10, background:'#eef5e8', color:'var(--vet-leaf-dark)', display:'grid', placeItems:'center', flexShrink:0}}>
              <Icon name={t.i} size={20}/>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontWeight:600, fontSize:14}}>{t.t}</div>
              <div className="text-muted" style={{fontSize:12, marginTop:2}}>{t.s}</div>
            </div>
            <Icon name="chevron-right" size={18} className="text-muted"/>
          </button>
        ))}
        <div style={{marginTop:8, padding:14, background:'var(--warn-bg)', borderRadius:12, display:'flex', gap:10}}>
          <Icon name="wifi-off" size={18} className="text-warn"/>
          <div style={{fontSize:12, color:'var(--warn)'}}>
            <strong>Modo offline disponible.</strong> Tus registros se sincronizarán cuando recuperes señal.
          </div>
        </div>
      </div>
    </>
  );

  const Header = ({title}) => (
    <div style={{padding:'14px 16px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', gap:10, background:'#fff'}}>
      <button onClick={() => setView('home')} style={{border:'none', background:'transparent', cursor:'pointer'}}><Icon name="chevron-left" size={20}/></button>
      <div style={{fontWeight:600, fontSize:15}}>{title}</div>
    </div>
  );

  const ViewDDS = () => (
    <>
      <Header title="Registrar DDS"/>
      <div style={{padding:16, display:'flex', flexDirection:'column', gap:14}}>
        <div className="field"><label className="label">Lote</label>
          <select className="select" value={dds.lote} onChange={e => setDds({...dds, lote:e.target.value})}>
            {LOTES.map(l => <option key={l.id} value={l.id}>{l.id} · {l.variedad}</option>)}
          </select>
        </div>
        <div className="field"><label className="label">Días desde siembra</label>
          <input className="input" type="number" value={dds.dds} onChange={e => setDds({...dds, dds:e.target.value})} />
        </div>
        <div className="field"><label className="label">Observaciones</label>
          <textarea className="textarea" value={dds.observacion} onChange={e => setDds({...dds, observacion:e.target.value})} placeholder="Estado del lote, condiciones, etc."/>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => { toast.success('DDS registrado', `${dds.lote} · ${dds.dds} días`); setView('home'); }}><Icon name="check" size={16}/> Guardar registro</button>
      </div>
    </>
  );

  const ViewCheck = () => (
    <>
      <Header title="Checklist diario"/>
      <div style={{padding:16, display:'flex', flexDirection:'column', gap:8}}>
        {[
          ['riego','Riego activo y sin fugas'],
          ['plagas','Sin presencia de plagas'],
          ['malezas','Malezas controladas'],
          ['brotes','Brotes en buen estado'],
        ].map(([k, l]) => (
          <label key={k} style={{display:'flex', alignItems:'center', gap:12, padding:14, border:'1px solid var(--line)', borderRadius:10, background:'#fff', cursor:'pointer'}}>
            <input type="checkbox" checked={check[k]} onChange={e => setCheck({...check, [k]:e.target.checked})} style={{width:20, height:20, accentColor:'var(--vet-leaf)'}}/>
            <span style={{fontSize:14, fontWeight:500}}>{l}</span>
          </label>
        ))}
        <button className="btn btn-primary btn-lg mt-12" onClick={() => { toast.success('Checklist enviado','Registro del día completado'); setView('home'); }}><Icon name="check" size={16}/> Enviar checklist</button>
      </div>
    </>
  );

  const ViewIncid = () => (
    <>
      <Header title="Reportar incidencia"/>
      <div style={{padding:16, display:'flex', flexDirection:'column', gap:14}}>
        <div className="field"><label className="label">Tipo</label>
          <select className="select"><option>Plaga / enfermedad</option><option>Daño mecánico</option><option>Falla riego</option><option>Otro</option></select>
        </div>
        <div className="field"><label className="label">Lote afectado</label>
          <select className="select">{LOTES.map(l => <option key={l.id}>{l.id} · {l.variedad}</option>)}</select>
        </div>
        <div className="field"><label className="label">Descripción</label>
          <textarea className="textarea" placeholder="¿Qué viste? ¿Cuándo?"/>
        </div>
        <button className="btn btn-secondary"><Icon name="camera" size={16}/> Adjuntar foto</button>
        <button className="btn btn-sun btn-lg" onClick={() => { toast.warn('Incidencia reportada','Equipo técnico notificado'); setView('home'); }}><Icon name="alert" size={16}/> Reportar</button>
      </div>
    </>
  );

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Campo móvil</h1>
          <p className="page-sub">Vista para operarios en terreno · responsive nativa, también funciona offline</p>
        </div>
      </div>
      <div className="phone-mock">
        <PhoneScreen>
          {view==='home' && <Home/>}
          {view==='dds' && <ViewDDS/>}
          {view==='check' && <ViewCheck/>}
          {view==='incid' && <ViewIncid/>}
        </PhoneScreen>
        <div>
          <h3 style={{fontFamily:'var(--font-display)', fontSize:22, margin:'0 0 12px', fontWeight:500}}>Diseñada para terreno</h3>
          <p className="text-muted" style={{lineHeight:1.6, marginBottom:20}}>La vista de campo prioriza acciones de un toque, formularios cortos y sincronización offline. Los operarios pueden registrar DDS, completar checklists y reportar incidencias incluso sin señal.</p>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            {[
              { i:'wifi-off', t:'Funciona offline', d:'Los registros se guardan localmente y se suben al recuperar señal.' },
              { i:'camera', t:'Fotos en incidencias', d:'Adjunta evidencia visual desde la cámara del dispositivo.' },
              { i:'map-pin', t:'Ubicación automática', d:'Cada registro queda asociado al sector donde se hizo.' },
              { i:'check-circle', t:'Botones grandes', d:'Optimizado para uso con guantes y a plena luz solar.' },
            ].map((f,i) => (
              <div key={i} className="row gap-12" style={{padding:14, background:'#fff', border:'1px solid var(--line)', borderRadius:'var(--r-md)'}}>
                <div style={{width:34, height:34, borderRadius:8, background:'#eef5e8', color:'var(--vet-leaf-dark)', display:'grid', placeItems:'center', flexShrink:0}}><Icon name={f.i} size={16}/></div>
                <div><div style={{fontWeight:600, fontSize:13.5}}>{f.t}</div><div className="text-muted" style={{fontSize:12.5, marginTop:2, lineHeight:1.5}}>{f.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ModuleDashboard, ModuleContratos, ModuleClientes, ModulePostventa,
  ModuleSalaProceso, ModuleVid, ModuleSombreadero, ModuleParrones, ModuleRiego, ModuleMateriales, ModuleLogistica,
  ModuleActividades, ModuleCalendario, ModuleLotes, ModuleLiberacion, ModuleCostos, ModuleMaestros, CampoMovil,
  ModuleAlertas,
  FilterChip,
});
