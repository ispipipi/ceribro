/* Módulo Calidad: dashboard + 9 formularios tipo wizard con guardado parcial */

// ─── SheetJS para descarga Excel ───
// Se carga desde CDN en index.html si no está disponible
const getXLSX = () => window.XLSX;

// ─── Helper: exportar tabla a Excel ───
function exportToExcel(data, filename, sheetName) {
  const XLSX = getXLSX();
  if (!XLSX) { alert('Error: librería de exportación no disponible'); return; }
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Datos');
  XLSX.writeFile(wb, filename + '.xlsx');
}

// ─── Datos demo para dashboard ───
const SIEMBRA_DATA = [
  { lote:'L-2025-001', variedad:'Timpson',           formato:'Bolsa',   dds:42, cant_injertacion:62832, cant_siembra:60100, pct_siembra:95.7, fecha_envio:'2026-06-18', cliente:'Agrolatina',    cant_pedido:58000 },
  { lote:'L-2025-002', variedad:'Autumn Crisp',      formato:'Bolsa',   dds:28, cant_injertacion:64240, cant_siembra:61800, pct_siembra:96.2, fecha_envio:'2026-06-14', cliente:'Don Guillermo', cant_pedido:65000 },
  { lote:'L-2025-003', variedad:'Sweet Celebration', formato:'Bolsa',   dds:65, cant_injertacion:62070, cant_siembra:54900, pct_siembra:88.4, fecha_envio:'2026-06-20', cliente:'Danper',        cant_pedido:60000 },
  { lote:'L-2025-004', variedad:'Sweet Globe',       formato:'Bolsa',   dds:78, cant_injertacion:20000, cant_siembra:19400, pct_siembra:97.0, fecha_envio:'2026-07-02', cliente:'AIB',           cant_pedido:20000 },
  { lote:'L-2025-005', variedad:'Sweet Globe',       formato:'Barbada', dds:14, cant_injertacion:30000, cant_siembra:27200, pct_siembra:90.7, fecha_envio:'2026-07-15', cliente:'SAMNSA',        cant_pedido:30000 },
  { lote:'L-2025-006', variedad:'Autumn Crisp',      formato:'Barbada', dds:92, cant_injertacion:34000, cant_siembra:31800, pct_siembra:93.5, fecha_envio:'2026-06-03', cliente:'Don Luis',      cant_pedido:34000 },
  { lote:'L-2025-007', variedad:'Ruby Rush',         formato:'Bolsa',   dds:56, cant_injertacion:38080, cant_siembra:35600, pct_siembra:93.5, fecha_envio:'2026-06-28', cliente:'Agrolatina',    cant_pedido:38000 },
  { lote:'L-2025-008', variedad:'Itum 16',           formato:'Bolsa',   dds:22, cant_injertacion:12000, cant_siembra:11100, pct_siembra:92.5, fecha_envio:'2026-07-10', cliente:'Parvina',       cant_pedido:12000 },
];

// % envío = cuánto del pedido comprometido se pudo cumplir (cant_siembra * 0.82 / cant_pedido)
SIEMBRA_DATA.forEach(d => {
  d.cant_envio_proyectado = Math.round(d.cant_siembra * 0.82);
  d.pct_envio = Math.round((d.cant_envio_proyectado / d.cant_pedido) * 1000) / 10;
});

// Form schemas — campos por formulario, agrupados por paso
const FORM_SCHEMAS = {
  'q-injertacion': {
    title: 'Injertación',
    icon: 'sprout',
    desc: 'Registro diario de actividad de injertación por equipo.',
    steps: [
      { name: 'Identificación', fields: [
        { id:'fecha', label:'Fecha', type:'date', required:true, default: '2026-05-04' },
        { id:'cultivo', label:'Cultivo', type:'select', options:['Vid','Arándano','Cereza','Palto'], required:true },
        { id:'cliente', label:'Cliente', type:'select', options: CLIENTES_LIST.map(c=>c.nombre) },
      ]},
      { name: 'Detalle de injerto', fields: [
        { id:'variedad', label:'Variedad', type:'text', placeholder:'Ej. Sweet Globe', required:true },
        { id:'tipo', label:'Tipo de injerto', type:'select', options:['Yema','Púa','Omega','Hendido'], required:true },
        { id:'n_injertos', label:'N° injertos', type:'number', placeholder:'Ej. 12000' },
        { id:'n_muestras', label:'N° muestras', type:'number', placeholder:'Ej. 240' },
        { id:'total', label:'Total', type:'number', placeholder:'Ej. 12240' },
      ]},
      { name: 'Observaciones', fields: [
        { id:'observaciones', label:'Observaciones del proceso', type:'textarea', placeholder:'Comentarios, incidencias, condiciones del día...' },
      ]},
    ],
  },
  'q-siembra': {
    title: 'Siembra',
    icon: 'leaf',
    desc: 'Registro de siembra por bin con calibre y trazabilidad.',
    steps: [
      { name: 'Ubicación', fields: [
        { id:'zona', label:'Zona', type:'select', options:['Sector A','Sector B','Sector C','Sector D','Sector E'], required:true },
        { id:'lote', label:'Lote', type:'text', required:true, placeholder:'Ej. L-2025-001' },
        { id:'cultivo', label:'Cultivo', type:'select', options:['Vid','Arándano','Cereza','Palto'], required:true },
      ]},
      { name: 'Siembra', fields: [
        { id:'fecha', label:'F. Siembra', type:'date', required:true },
        { id:'n_bins', label:'N° bins', type:'number' },
        { id:'variedad', label:'Variedad', type:'text', required:true },
        { id:'tipo', label:'Tipo de injerto', type:'select', options:['Yema','Púa','Omega','Hendido'] },
        { id:'injertos_rotulo', label:'Injertos en rótulo', type:'number', placeholder:'Cantidad en rótulo' },
        { id:'trazabilidad', label:'Trazabilidad', type:'text', placeholder:'Código trazabilidad' },
        { id:'injertos_siembra', label:'Injertos siembra', type:'number' },
      ]},
      { name: 'Calidad', fields: [
        { id:'calibre', label:'Calibre', type:'select', options:['<5mm','5-7mm','7-9mm','>9mm'] },
        { id:'dentro_pauta', label:'Dentro de pauta (%)', type:'number' },
        { id:'sin_callo_basal', label:'Sin callo basal (%)', type:'number' },
        { id:'pct_sin_callo_union', label:'% sin callo en unión', type:'number' },
        { id:'descarte1', label:'Descarte 1', type:'number' },
        { id:'cantidad_proceso', label:'Cantidad en proceso', type:'number' },
        { id:'obs_injertos', label:'Obs. en injertos', type:'textarea' },
        { id:'obs_generales', label:'Obs. generales', type:'textarea' },
      ]},
    ],
  },
  'q-brotamiento': {
    title: 'Brotamiento',
    icon: 'sun',
    desc: 'Evaluación periódica de brotamiento sobre muestra.',
    steps: [
      { name: 'Lote', fields: [
        { id:'cultivo', label:'Cultivo', type:'select', options:['Vid','Arándano','Cereza','Palto'], required:true },
        { id:'variedad', label:'Variedad', type:'text', required:true },
        { id:'lote', label:'Lote', type:'text', required:true },
        { id:'trazabilidad', label:'Trazabilidad', type:'text' },
      ]},
      { name: 'Fechas y muestreo', fields: [
        { id:'f_evaluacion', label:'F. Evaluación', type:'date', required:true },
        { id:'f_siembra', label:'F. Siembra', type:'date' },
        { id:'dds', label:'DDS', type:'number', placeholder:'Días desde siembra' },
        { id:'n_muestra', label:'N° muestra', type:'number' },
        { id:'n_bins', label:'N° bins', type:'number' },
      ]},
      { name: 'Resultados', fields: [
        { id:'p_brotadas', label:'Plantas brotadas', type:'number' },
        { id:'pct_brotamiento', label:'% Brotamiento', type:'number' },
        { id:'p_sin_brote', label:'Plantas sin brote', type:'number' },
        { id:'pct_sin_brotamiento', label:'% Sin brotamiento', type:'number' },
        { id:'observacion', label:'Observación', type:'textarea' },
      ]},
    ],
  },
  'q-clasificacion': {
    title: 'Clasificación bolsa',
    icon: 'package',
    desc: 'Clasificación final de plantas en bolsa por categoría.',
    steps: [
      { name: 'Identificación', fields: [
        { id:'fecha', label:'Fecha', type:'date', required:true },
        { id:'lote', label:'Lote', type:'text', required:true },
        { id:'variedad', label:'Variedad', type:'text', required:true },
      ]},
      { name: 'Clasificación', fields: [
        { id:'cat_1_2', label:'1era y 2da', type:'number', placeholder:'Cantidad de plantas' },
        { id:'cat_4', label:'4ta', type:'number' },
        { id:'total', label:'Total', type:'number' },
        { id:'observaciones', label:'Observaciones', type:'textarea' },
      ]},
    ],
  },
  'q-seleccion': {
    title: 'Selección y reselección',
    icon: 'check',
    desc: 'Trabajo diario de selección con conteo de envío y descarte.',
    steps: [
      { name: 'Lote y labor', fields: [
        { id:'fecha', label:'Fecha', type:'date', required:true },
        { id:'labor', label:'Labor', type:'select', options:['Selección','Reselección','Selección final'] },
        { id:'lote', label:'Lote', type:'text', required:true },
        { id:'variedad', label:'Variedad', type:'text', required:true },
        { id:'tipo', label:'Tipo de injerto', type:'select', options:['Yema','Púa','Omega','Hendido'] },
        { id:'campana', label:'Campaña', type:'text', placeholder:'2025-2026' },
      ]},
      { name: 'Resultados envío', fields: [
        { id:'plantas_envio', label:'Plantas envío', type:'number' },
        { id:'pct_envio', label:'% Envío', type:'number' },
        { id:'descarte', label:'Descarte', type:'number' },
        { id:'total_trabajadas', label:'Total trabajadas', type:'number' },
      ]},
      { name: 'Defectos', fields: [
        { id:'pequenas_brote', label:'Pequeñas y brote pequeño', type:'number' },
        { id:'chanchito_blanco', label:'Chanchito blanco', type:'number' },
        { id:'poca_raiz', label:'Poca raíz', type:'number' },
        { id:'mala_soldadura', label:'Mala soldadura', type:'number' },
        { id:'callo_grande', label:'Callo grande', type:'number' },
        { id:'secuela_mildiu', label:'Secuela de mildiu', type:'number' },
        { id:'observaciones', label:'Observaciones', type:'textarea' },
      ]},
    ],
  },
  'q-cosecha': {
    title: 'Cosecha barbadas',
    icon: 'sprout',
    desc: 'Registro de cosecha de barbadas con detalle por defecto.',
    steps: [
      { name: 'Identificación', fields: [
        { id:'fecha_cosecha', label:'Fecha cosecha', type:'date', required:true },
        { id:'lote', label:'Lote', type:'text', required:true },
        { id:'variedad', label:'Variedad', type:'text', required:true },
        { id:'portainjerto', label:'Portainjerto', type:'text' },
        { id:'tipo', label:'Tipo de injerto', type:'select', options:['Yema','Púa','Omega','Hendido'] },
      ]},
      { name: 'Resultados principales', fields: [
        { id:'cat_a', label:'Total Cat. A', type:'number' },
        { id:'pct_cat_a', label:'% Cat. A', type:'number' },
        { id:'raiz_corta', label:'Raíz corta', type:'number' },
        { id:'pct_raiz_corta', label:'% Raíz corta', type:'number' },
        { id:'dano_mecanico', label:'Daño mecánico', type:'number' },
        { id:'pct_dano_mecanico', label:'% Daño mecánico', type:'number' },
        { id:'nematodos', label:'Nematodos', type:'number' },
        { id:'pct_nematodos', label:'% Nematodos', type:'number' },
        { id:'total', label:'Total cosecha', type:'number' },
      ]},
      { name: 'Defectos detallados', fields: [
        { id:'yema_delgada', label:'Yema delgada', type:'number' },
        { id:'pct_yema_delgada', label:'% Yema delgada', type:'number' },
        { id:'mala_soldadura', label:'Mala soldadura', type:'number' },
        { id:'pct_mala_soldadura', label:'% Mala soldadura', type:'number' },
        { id:'raiz_c', label:'Raíz "C"', type:'number' },
        { id:'callo_grande', label:'Callo grande', type:'number' },
        { id:'pct_callo_grande', label:'% Callo grande', type:'number' },
        { id:'obs_yema', label:'Obs. yema', type:'textarea' },
        { id:'pct_obs_yema', label:'% Obs. yema', type:'number' },
        { id:'agalla', label:'Agalla', type:'number' },
        { id:'pct_agalla', label:'% Agalla', type:'number' },
        { id:'pct_dano_patron', label:'% Daño en patrón', type:'number' },
        { id:'pct_descarte', label:'% Descarte', type:'number' },
        { id:'observaciones', label:'Observaciones generales', type:'textarea' },
      ]},
    ],
  },
  'q-proceso': {
    title: 'Proceso de barbadas',
    icon: 'package',
    desc: 'Procesamiento post-cosecha con clasificación final.',
    steps: [
      { name: 'Identificación', fields: [
        { id:'labor', label:'Labor', type:'select', options:['Limpieza','Clasificación','Empaque','Despacho'] },
        { id:'fecha_proceso', label:'Fecha proceso', type:'date', required:true },
        { id:'fecha_cosecha', label:'Fecha cosecha', type:'date' },
        { id:'lote', label:'Lote', type:'text', required:true },
        { id:'variedad', label:'Variedad', type:'text' },
        { id:'portainjerto', label:'Portainjerto', type:'text' },
        { id:'tipo', label:'Tipo de injerto', type:'select', options:['Yema','Púa','Omega','Hendido'] },
      ]},
      { name: 'Categoría A', fields: [
        { id:'cat_a', label:'Categoría A', type:'number' },
        { id:'yema_verde', label:'Yema verde', type:'number' },
        { id:'obs_yema', label:'Obs. yema', type:'textarea' },
      ]},
      { name: 'Defectos', fields: [
        { id:'yema_delgada', label:'Yema delgada', type:'number' },
        { id:'mala_soldadura', label:'Mala soldadura', type:'number' },
        { id:'raiz_c', label:'Raíz C', type:'number' },
        { id:'dano_mecanico', label:'Daño mecánico', type:'number' },
        { id:'raiz_corta', label:'Raíz corta', type:'number' },
        { id:'nematodos', label:'Nematodos', type:'number' },
        { id:'engrosamiento', label:'Engrosamiento de raíces', type:'number' },
        { id:'agallas', label:'Agallas', type:'number' },
        { id:'dano_tallo', label:'Daño en tallo', type:'number' },
        { id:'callo_grande', label:'Callo grande', type:'number' },
        { id:'descarte', label:'Descarte', type:'number' },
        { id:'total', label:'Total proceso', type:'number' },
        { id:'observaciones', label:'Observaciones', type:'textarea' },
      ]},
    ],
  },
  'q-envios': {
    title: 'Envíos',
    icon: 'truck',
    desc: 'Despacho a cliente final con razón social y formato.',
    steps: [
      { name: 'Cliente', fields: [
        { id:'fecha', label:'Fecha', type:'date', required:true },
        { id:'cliente', label:'Cliente', type:'select', options: CLIENTES_LIST.map(c=>c.nombre), required:true },
        { id:'razon_social', label:'Razón social', type:'text' },
      ]},
      { name: 'Producto', fields: [
        { id:'formato', label:'Formato', type:'select', options:['Bolsa','Barbada'], required:true },
        { id:'variedad', label:'Variedad', type:'text', required:true },
        { id:'tipo', label:'Tipo de injerto', type:'select', options:['Yema','Púa','Omega','Hendido'] },
        { id:'cantidad', label:'Cantidad', type:'number', required:true },
        { id:'observaciones', label:'Observaciones', type:'textarea' },
      ]},
    ],
  },
  'q-plantacion': {
    title: 'Plantación',
    icon: 'map-pin',
    desc: 'Registro de plantación en campo por línea de riego.',
    steps: [
      { name: 'Plantación', fields: [
        { id:'fecha', label:'Fecha', type:'date', required:true },
        { id:'n_valvula', label:'N° válvula', type:'text' },
        { id:'patron', label:'Patrón', type:'text' },
        { id:'n_linea', label:'N° línea', type:'text' },
        { id:'total', label:'Total', type:'number' },
        { id:'observaciones', label:'Observaciones', type:'textarea' },
      ]},
    ],
  },
};

// Storage helper
const draftKey = (formId) => `ceribro_draft_${formId}`;
function loadDraft(formId){
  try { return JSON.parse(localStorage.getItem(draftKey(formId)) || '{}'); } catch { return {}; }
}
function saveDraft(formId, data){
  localStorage.setItem(draftKey(formId), JSON.stringify(data));
}
function clearDraft(formId){ localStorage.removeItem(draftKey(formId)); }

// ─── Reporte histórico demo (localStorage) ───
const REPORT_KEY = 'ceribro_calidad_records';
function loadRecords() {
  try { return JSON.parse(localStorage.getItem(REPORT_KEY) || '[]'); } catch { return []; }
}
function saveRecord(formId, data) {
  const records = loadRecords();
  records.unshift({ id: Date.now(), formId, formTitle: FORM_SCHEMAS[formId].title, ts: new Date().toISOString(), ...data });
  localStorage.setItem(REPORT_KEY, JSON.stringify(records.slice(0, 200)));
}

function FormField({ field, value, onChange, error }) {
  const common = {
    value: value ?? '',
    onChange: (e) => onChange(e.target.value),
    placeholder: field.placeholder,
  };
  return (
    <div className="field">
      <label className="label">{field.label}{field.required && <span style={{color:'var(--danger)', marginLeft:4}}>*</span>}</label>
      {field.type === 'textarea'
        ? <textarea className="textarea" {...common} />
        : field.type === 'select'
          ? (
            <select className="select" {...common}>
              <option value="">Seleccionar...</option>
              {field.options.map(o => <option key={o}>{o}</option>)}
            </select>
          )
          : <input className="input" type={field.type} {...common} />}
      {error && <span style={{color:'var(--danger)', fontSize:11.5, marginTop:4}}>{error}</span>}
    </div>
  );
}

function QualityForm({ formId, onBack }) {
  const schema = FORM_SCHEMAS[formId];
  const toast = useToast();
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState(() => loadDraft(formId));
  const [errors, setErrors] = React.useState({});
  const [savedAt, setSavedAt] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (Object.keys(data).length > 0) {
      saveDraft(formId, data);
      setSavedAt(new Date());
    }
  }, [data, formId]);

  const setField = (id, v) => setData(d => ({ ...d, [id]: v }));

  const validateStep = () => {
    const errs = {};
    schema.steps[step].fields.forEach(f => {
      if (f.required && !data[f.id]) errs[f.id] = 'Campo requerido';
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validateStep()) {
      toast.warn('Faltan datos', 'Completa los campos requeridos antes de continuar');
      return;
    }
    setStep(s => Math.min(s + 1, schema.steps.length - 1));
  };
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const submit = () => {
    let allErrs = {};
    schema.steps.forEach(s => s.fields.forEach(f => {
      if (f.required && !data[f.id]) allErrs[f.id] = 'Campo requerido';
    }));
    if (Object.keys(allErrs).length > 0) {
      setErrors(allErrs);
      toast.error('Faltan datos requeridos', 'Revisa todos los pasos antes de enviar');
      for (let i=0; i<schema.steps.length; i++){
        if (schema.steps[i].fields.some(f => allErrs[f.id])) { setStep(i); break; }
      }
      return;
    }
    saveRecord(formId, data);
    clearDraft(formId);
    setSubmitted(true);
    toast.success('Formulario guardado', `${schema.title} registrado correctamente`);
  };

  const discard = () => {
    if (confirm('¿Descartar borrador? Esta acción no se puede deshacer.')) {
      clearDraft(formId);
      setData({});
      setStep(0);
      toast.info('Borrador descartado', 'Se eliminó el progreso guardado');
    }
  };

  if (submitted) {
    return (
      <div>
        <div className="page-head">
          <div>
            <button className="btn btn-ghost btn-sm" onClick={onBack}><Icon name="chevron-left" size={14}/> Volver a formularios</button>
            <h1 className="page-title mt-8">{schema.title}</h1>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{textAlign:'center', padding:'60px 24px'}}>
            <div style={{
              width:72, height:72, borderRadius:'50%',
              background:'var(--success-bg)', color:'var(--success)',
              display:'grid', placeItems:'center', margin:'0 auto 20px'
            }}>
              <Icon name="check" size={36}/>
            </div>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:24, fontWeight:500, margin:'0 0 8px'}}>Formulario registrado</h2>
            <p className="text-muted" style={{maxWidth:420, margin:'0 auto 24px'}}>El registro de <strong>{schema.title}</strong> se guardó correctamente. Puedes ingresar uno nuevo o volver al listado.</p>
            <div className="row gap-8" style={{justifyContent:'center'}}>
              <button className="btn btn-secondary" onClick={onBack}>Volver al listado</button>
              <button className="btn btn-primary" onClick={() => { setSubmitted(false); setData({}); setStep(0); }}>
                <Icon name="plus" size={14}/> Nuevo registro
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStep = schema.steps[step];
  const filledCount = Object.values(data).filter(v => v !== '' && v !== undefined && v !== null).length;
  const totalFields = schema.steps.reduce((a, s) => a + s.fields.length, 0);

  return (
    <div>
      <div className="page-head">
        <div>
          <button className="btn btn-ghost btn-sm" onClick={onBack}><Icon name="chevron-left" size={14}/> Volver</button>
          <h1 className="page-title mt-8">{schema.title}</h1>
          <p className="page-sub">{schema.desc}</p>
        </div>
        <div className="actions">
          {savedAt && (
            <span className="chip chip-info"><Icon name="save" size={12}/> Borrador guardado · {savedAt.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'})}</span>
          )}
          {Object.keys(data).length > 0 && <button className="btn btn-danger btn-sm" onClick={discard}><Icon name="trash" size={13}/> Descartar borrador</button>}
        </div>
      </div>

      <div className="stepper">
        {schema.steps.map((s, i) => (
          <button key={i} className={"step " + (i===step?'active':i<step?'done':'')} onClick={() => setStep(i)}>
            <span className="num">{i<step ? <Icon name="check" size={11}/> : i+1}</span>
            <span>{s.name}</span>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Paso {step+1} de {schema.steps.length} · {currentStep.name}</h3>
            <p className="card-sub">{filledCount} de {totalFields} campos completados</p>
          </div>
          <div style={{width:120}}>
            <div className="bar-track" style={{height:6}}>
              <div className="bar-fill" style={{width: ((step+1)/schema.steps.length*100)+'%'}}></div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-2">
            {currentStep.fields.map(f => (
              <div key={f.id} style={f.type==='textarea' ? {gridColumn:'1 / -1'} : {}}>
                <FormField field={f} value={data[f.id]} onChange={(v) => setField(f.id, v)} error={errors[f.id]} />
              </div>
            ))}
          </div>
        </div>
        <div style={{padding:'16px 20px', borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-between', gap:8, background:'var(--surface-2)'}}>
          <button className="btn btn-ghost" onClick={prev} disabled={step===0}><Icon name="chevron-left" size={14}/> Anterior</button>
          <div className="row gap-8">
            <button className="btn btn-secondary" onClick={() => { saveDraft(formId, data); toast.info('Borrador guardado', 'Puedes continuar más tarde'); }}>
              <Icon name="save" size={14}/> Guardar borrador
            </button>
            {step < schema.steps.length-1
              ? <button className="btn btn-primary" onClick={next}>Siguiente <Icon name="chevron-right" size={14}/></button>
              : <button className="btn btn-primary" onClick={submit}><Icon name="check" size={14}/> Registrar formulario</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Reporte por formulario con descarga Excel ───
function ReporteFormulario({ formId, onBack }) {
  const schema = FORM_SCHEMAS[formId];
  const allRecords = loadRecords().filter(r => r.formId === formId);
  const [records, setRecords] = React.useState(allRecords);

  const handleExport = () => {
    if (records.length === 0) { alert('No hay registros para exportar.'); return; }
    const data = records.map(r => {
      const row = { Fecha_registro: new Date(r.ts).toLocaleString('es-CL') };
      schema.steps.forEach(s => s.fields.forEach(f => { row[f.label] = r[f.id] ?? ''; }));
      return row;
    });
    exportToExcel(data, `Reporte_${schema.title.replace(/ /g,'_')}`, schema.title);
  };

  // Demo: si no hay registros reales, mostrar algunos ficticios
  const displayRecords = records.length > 0 ? records : [
    { id:1, formId, formTitle:schema.title, ts: new Date(Date.now()-3600000).toISOString(), lote:'L-2025-001', variedad:'Timpson', fecha:'2026-06-15' },
    { id:2, formId, formTitle:schema.title, ts: new Date(Date.now()-86400000).toISOString(), lote:'L-2025-003', variedad:'Sweet Globe', fecha:'2026-06-14' },
  ];

  const allFields = schema.steps.flatMap(s => s.fields).filter(f => f.type !== 'textarea').slice(0, 6);

  return (
    <div>
      <div className="page-head">
        <div>
          <button className="btn btn-ghost btn-sm" onClick={onBack}><Icon name="chevron-left" size={14}/> Volver</button>
          <h1 className="page-title mt-8">Reporte · {schema.title}</h1>
          <p className="page-sub">{displayRecords.length} registros encontrados</p>
        </div>
        <button className="btn btn-primary" onClick={handleExport}>
          <Icon name="download" size={14}/> Descargar Excel
        </button>
      </div>
      <div className="card">
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
            <thead>
              <tr style={{background:'var(--surface-2)', borderBottom:'1px solid var(--line)'}}>
                <th style={{padding:'10px 16px', textAlign:'left', fontWeight:600, color:'var(--muted)', fontSize:11.5, textTransform:'uppercase', letterSpacing:'.05em'}}>Fecha registro</th>
                {allFields.map(f => (
                  <th key={f.id} style={{padding:'10px 16px', textAlign:'left', fontWeight:600, color:'var(--muted)', fontSize:11.5, textTransform:'uppercase', letterSpacing:'.05em'}}>{f.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayRecords.map((r, i) => (
                <tr key={r.id} style={{borderBottom:'1px solid var(--line)', background: i%2===0 ? '#fff' : 'var(--surface-2)'}}>
                  <td style={{padding:'10px 16px'}}>{new Date(r.ts).toLocaleString('es-CL')}</td>
                  {allFields.map(f => (
                    <td key={f.id} style={{padding:'10px 16px'}}>{r[f.id] ?? <span style={{color:'var(--muted)'}}>—</span>}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard principal de Calidad ───
function ModuleCalidadDashboard({ goTo }) {
  const today = new Date();

  // KPIs de siembra y envío
  const avgSiembra = Math.round(SIEMBRA_DATA.reduce((a, d) => a + d.pct_siembra, 0) / SIEMBRA_DATA.length * 10) / 10;
  const avgEnvio   = Math.round(SIEMBRA_DATA.reduce((a, d) => a + d.pct_envio, 0) / SIEMBRA_DATA.length * 10) / 10;
  const incumplimiento = SIEMBRA_DATA.filter(d => d.pct_envio < 90);

  // Alertas: envíos en los próximos 3 días
  const alertasEnvio = SIEMBRA_DATA.filter(d => {
    const envioDate = new Date(d.fecha_envio);
    const diffDays = Math.ceil((envioDate - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  });

  const stats = [
    { label:'Formularios hoy', value: 24, sub: 'esta semana: 142', icon:'clipboard', accent:'' },
    { label:'Pendientes liberación', value: 8, sub: '3 con alerta', icon:'alert', accent:'sun' },
    { label:'% Siembra promedio', value: avgSiembra + '%', sub: `meta: 95% · ${SIEMBRA_DATA.length} lotes`, icon:'leaf', accent:'olive' },
    { label:'% Envío promedio', value: avgEnvio + '%', sub: incumplimiento.length > 0 ? `${incumplimiento.length} lote(s) bajo 90%` : 'todos sobre meta', icon:'truck', accent: avgEnvio < 90 ? 'sun' : 'earth' },
  ];

  const recientes = [
    { tipo:'Brotamiento', lote:'L-2025-001', fecha:'Hoy 10:42', estado:'OK', autor:'C. Ruiz' },
    { tipo:'Siembra', lote:'L-2025-007', fecha:'Hoy 09:15', estado:'OK', autor:'M. Soto' },
    { tipo:'Cosecha barbadas', lote:'L-2025-006', fecha:'Ayer 17:20', estado:'Alerta', autor:'P. Vera' },
    { tipo:'Clasificación', lote:'L-2025-004', fecha:'Ayer 14:08', estado:'OK', autor:'C. Ruiz' },
    { tipo:'Envíos', lote:'L-2025-003', fecha:'Ayer 11:30', estado:'OK', autor:'L. Pino' },
  ];
  const formIds = ['q-injertacion','q-siembra','q-brotamiento','q-clasificacion','q-seleccion','q-cosecha','q-proceso','q-envios','q-plantacion'];

  const handleExportSiembra = () => {
    const data = SIEMBRA_DATA.map(d => ({
      Lote: d.lote,
      Variedad: d.variedad,
      'Cant. Injertación': d.cant_injertacion,
      'Cant. Siembra': d.cant_siembra,
      '% Siembra': d.pct_siembra,
      'Cant. Envío Proyectado': d.cant_envio_proyectado,
      'Cant. Pedido': d.cant_pedido,
      '% Envío': d.pct_envio,
      'Fecha Envío': d.fecha_envio,
      Cliente: d.cliente,
    }));
    exportToExcel(data, 'Reporte_Siembra_Envio', 'Siembra y Envío');
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Dashboard Calidad</h1>
          <p className="page-sub">Resumen de actividad de calidad y acceso rápido a formularios</p>
        </div>
        <div className="row gap-8">
          <button className="btn btn-secondary" onClick={handleExportSiembra}><Icon name="download" size={14}/> Exportar siembra/envío</button>
          <button className="btn btn-primary" onClick={() => goTo('q-injertacion')}><Icon name="plus" size={14}/> Nuevo registro</button>
        </div>
      </div>

      {/* Alertas de envío próximos 3 días */}
      {alertasEnvio.length > 0 && (
        <div style={{
          background:'#fffbeb', border:'1.5px solid #f59e0b', borderRadius:'var(--r-md)',
          padding:'14px 18px', marginBottom:20, display:'flex', gap:12, alignItems:'flex-start'
        }}>
          <div style={{color:'#d97706', marginTop:2, flexShrink:0}}><Icon name="alert" size={18}/></div>
          <div>
            <div style={{fontWeight:600, fontSize:13.5, color:'#92400e', marginBottom:6}}>
              {alertasEnvio.length} envío{alertasEnvio.length > 1 ? 's' : ''} en los próximos 3 días
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
              {alertasEnvio.map(d => {
                const envioDate = new Date(d.fecha_envio);
                const diffDays = Math.ceil((envioDate - today) / (1000 * 60 * 60 * 24));
                return (
                  <span key={d.lote} style={{
                    background:'#fef3c7', border:'1px solid #fbbf24', borderRadius:6,
                    padding:'4px 10px', fontSize:12.5, color:'#92400e', fontWeight:500
                  }}>
                    <strong>{d.lote}</strong> · {d.cliente} · {d.variedad} ·{' '}
                    {diffDays === 0 ? '⚠️ HOY' : `en ${diffDays} día${diffDays > 1 ? 's' : ''}`}
                    {' '}({d.cant_envio_proyectado.toLocaleString('es-CL')} plantas)
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-4 mb-20">
        {stats.map((s,i) => (
          <div key={i} className="kpi"><div className={"kpi-accent " + s.accent}></div>
            <div className="kpi-label">{s.label}</div>
            <div className="kpi-value">{s.value}</div>
            <div className="kpi-foot">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabla % Siembra / % Envío */}
      <div className="card mb-20">
        <div className="card-header">
          <div>
            <h3 className="card-title">% Siembra y % Envío por lote</h3>
            <p className="card-sub">Relación entre lo injertado, sembrado y comprometido con el cliente</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={handleExportSiembra}><Icon name="download" size={13}/> Excel</button>
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
            <thead>
              <tr style={{background:'var(--surface-2)', borderBottom:'1px solid var(--line)'}}>
                {['Lote','Cliente','Variedad','Inj.','Siembra','% Siembra','Pedido','Proy. Envío','% Envío','F. Envío'].map(h => (
                  <th key={h} style={{padding:'9px 14px', textAlign:'left', fontWeight:600, color:'var(--muted)', fontSize:11, textTransform:'uppercase', letterSpacing:'.05em', whiteSpace:'nowrap'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIEMBRA_DATA.map((d, i) => {
                const envioDate = new Date(d.fecha_envio);
                const diffDays = Math.ceil((envioDate - today) / (1000 * 60 * 60 * 24));
                const alertaEnvio = diffDays >= 0 && diffDays <= 3;
                const bajo90 = d.pct_envio < 90;
                return (
                  <tr key={d.lote} style={{borderBottom:'1px solid var(--line)', background: alertaEnvio ? '#fffbeb' : i%2===0?'#fff':'var(--surface-2)'}}>
                    <td style={{padding:'9px 14px', fontWeight:500}}>{d.lote}</td>
                    <td style={{padding:'9px 14px'}}>{d.cliente}</td>
                    <td style={{padding:'9px 14px'}}>{d.variedad}</td>
                    <td style={{padding:'9px 14px'}}>{d.cant_injertacion.toLocaleString('es-CL')}</td>
                    <td style={{padding:'9px 14px'}}>{d.cant_siembra.toLocaleString('es-CL')}</td>
                    <td style={{padding:'9px 14px'}}>
                      <span style={{
                        fontWeight:600,
                        color: d.pct_siembra >= 95 ? 'var(--success)' : d.pct_siembra >= 90 ? '#d97706' : 'var(--danger)'
                      }}>{d.pct_siembra}%</span>
                    </td>
                    <td style={{padding:'9px 14px'}}>{d.cant_pedido.toLocaleString('es-CL')}</td>
                    <td style={{padding:'9px 14px'}}>{d.cant_envio_proyectado.toLocaleString('es-CL')}</td>
                    <td style={{padding:'9px 14px'}}>
                      <span style={{
                        fontWeight:600,
                        color: bajo90 ? 'var(--danger)' : d.pct_envio >= 95 ? 'var(--success)' : '#d97706'
                      }}>{d.pct_envio}%</span>
                      {bajo90 && <span style={{marginLeft:6, fontSize:11, color:'var(--danger)'}}>↓ incumplimiento</span>}
                    </td>
                    <td style={{padding:'9px 14px', whiteSpace:'nowrap'}}>
                      {alertaEnvio
                        ? <span style={{fontWeight:600, color:'#d97706'}}>⚠️ {d.fecha_envio}</span>
                        : d.fecha_envio}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid mb-20" style={{gridTemplateColumns:'2fr 1fr'}}>
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Formularios disponibles</h3>
              <p className="card-sub">Selecciona el tipo para iniciar un registro o ver reporte</p>
            </div>
          </div>
          <div className="card-body">
            <div className="grid grid-3">
              {formIds.map(id => {
                const s = FORM_SCHEMAS[id];
                const draft = loadDraft(id);
                const hasDraft = Object.keys(draft).length > 0;
                return (
                  <div key={id} style={{
                    background:'#fff', border:'1px solid var(--line)', borderRadius:'var(--r-md)',
                    padding:'14px 16px', display:'flex', flexDirection:'column', gap:8, position:'relative',
                  }}>
                    <div style={{width:36, height:36, borderRadius:8, background:'#eef5e8', color:'var(--vet-leaf-dark)', display:'grid', placeItems:'center'}}>
                      <Icon name={s.icon} size={18}/>
                    </div>
                    <div style={{fontWeight:600, fontSize:13.5}}>{s.title}</div>
                    <div className="text-muted" style={{fontSize:12, lineHeight:1.4}}>{s.desc}</div>
                    {hasDraft && <span className="chip chip-warn" style={{alignSelf:'flex-start'}}><span className="chip-dot"></span>Borrador en curso</span>}
                    <div className="row gap-6" style={{marginTop:'auto', paddingTop:4}}>
                      <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={() => goTo(id)}>
                        <Icon name="plus" size={12}/> Registrar
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => goTo('reporte-' + id)} title="Ver reporte">
                        <Icon name="bar-chart" size={13}/>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Registros recientes</h3>
              <p className="card-sub">Últimos formularios cargados</p>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
            {recientes.map((r,i) => (
              <div key={i} style={{display:'flex', gap:10, padding:'12px 20px', borderBottom: i<recientes.length-1?'1px solid var(--line)':'none'}}>
                <div style={{width:32, height:32, borderRadius:8, background:'var(--surface-3)', color:'var(--vet-text)', display:'grid', placeItems:'center', flexShrink:0}}>
                  <Icon name="clipboard" size={14}/>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:500}}>{r.tipo} · {r.lote}</div>
                  <div className="text-muted" style={{fontSize:11.5, marginTop:2}}>{r.fecha} · {r.autor}</div>
                </div>
                <span className={"chip " + (r.estado==='OK'?'chip-success':'chip-warn')} style={{alignSelf:'center'}}>{r.estado}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleCalidad({ moduleId, goTo }) {
  if (moduleId === 'quality-dash') return <ModuleCalidadDashboard goTo={goTo} />;
  if (moduleId && moduleId.startsWith('reporte-')) {
    const formId = moduleId.replace('reporte-', '');
    if (FORM_SCHEMAS[formId]) return <ReporteFormulario formId={formId} onBack={() => goTo('quality-dash')} />;
  }
  if (FORM_SCHEMAS[moduleId]) return <QualityForm formId={moduleId} onBack={() => goTo('quality-dash')} />;
  return null;
}

window.ModuleCalidad = ModuleCalidad;
window.ModuleCalidadDashboard = ModuleCalidadDashboard;
window.QualityForm = QualityForm;
window.FORM_SCHEMAS = FORM_SCHEMAS;
window.SIEMBRA_DATA = SIEMBRA_DATA;
