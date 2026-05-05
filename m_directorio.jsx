/* Estado de Resultados (Directorio) — KPIs + Waterfall + tabla filtrable */

function ERWaterfall({ ag }) {
  // Bars relative to ingresos
  const max = ag.ingresos || 1;
  const bars = [
    { label: 'Ingresos por venta',   value: ag.ingresos,   color: 'var(--vet-leaf)',  type:'pos' },
    { label: 'Costos directos · Insumos', value: -ag.insumos, color: 'var(--vet-sun)', type:'neg', sub:true },
    { label: 'Costos directos · Mano de obra', value: -ag.mano, color: 'var(--vet-sun-deep)', type:'neg', sub:true },
    { label: 'Costos indirectos',    value: -ag.indirectos, color: 'var(--vet-earth)', type:'neg' },
    { label: 'Resultado operacional',value: ag.resultado,   color: 'var(--vet-leaf-dark)', type:'total' },
  ];
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Composición del resultado</h3>
          <p className="card-sub">De ingresos a resultado operacional · totales del período filtrado</p>
        </div>
        <span className="chip chip-leaf"><span className="chip-dot"></span>Margen {fmtPct(ag.margenPct)}</span>
      </div>
      <div className="card-body">
        <div style={{display:'flex', flexDirection:'column', gap:14}}>
          {bars.map((b,i) => {
            const pct = (Math.abs(b.value) / max) * 100;
            return (
              <div key={i}>
                <div className="row between" style={{marginBottom:6}}>
                  <span style={{fontSize: b.sub ? 12.5 : 13.5, color: b.sub ? 'var(--muted)' : 'var(--vet-text)', paddingLeft: b.sub?16:0, fontWeight: b.type==='total'?600:500}}>
                    {b.label}
                  </span>
                  <span style={{fontVariantNumeric:'tabular-nums', fontWeight: b.type==='total'?700:600, color: b.type==='total'?'var(--vet-leaf-dark)':'var(--vet-text)', fontSize: b.type==='total'?15:13.5}}>
                    {b.value < 0 ? '−' : ''}{fmtCLP(Math.abs(b.value))}
                  </span>
                </div>
                <div className="bar-track" style={{height: b.type==='total'?12:10, background: b.type==='total'?'#eef5e8':'var(--surface-3)'}}>
                  <div className="bar-fill" style={{width: pct+'%', background: b.color}}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick, onRemove }){
  return (
    <button className="chip" onClick={onClick} style={{
      cursor:'pointer',
      background: active ? 'var(--vet-leaf-dark)' : '#fff',
      color: active ? '#fff' : 'var(--vet-text)',
      borderColor: active ? 'var(--vet-leaf-dark)' : 'var(--line-2)',
      paddingRight: onRemove ? 4 : 10,
    }}>
      {label}
      {onRemove && (
        <span onClick={(e)=>{e.stopPropagation(); onRemove();}} style={{
          width:16, height:16, borderRadius:'50%',
          background:'rgba(255,255,255,.2)', display:'inline-grid', placeItems:'center', marginLeft:2
        }}>
          <Icon name="x" size={10}/>
        </span>
      )}
    </button>
  );
}

function ModuleDirectorio() {
  const [fCliente, setFCliente] = React.useState('');
  const [fProductor, setFProductor] = React.useState('');
  const [fVariedad, setFVariedad] = React.useState('');
  const [fFormato, setFFormato] = React.useState('');
  const toast = useToast();

  const clientes = [...new Set(CONTRATOS_ER.map(c => c.cliente))].sort();
  const productores = [...new Set(CONTRATOS_ER.map(c => c.productor))].sort();
  const variedades = [...new Set(CONTRATOS_ER.map(c => c.variedad))].sort();
  const formatos = [...new Set(CONTRATOS_ER.map(c => c.formato))].sort();

  const filtered = CONTRATOS_ER.filter(c =>
    (!fCliente || c.cliente === fCliente) &&
    (!fProductor || c.productor === fProductor) &&
    (!fVariedad || c.variedad === fVariedad) &&
    (!fFormato || c.formato === fFormato)
  );
  const ag = aggregateER(filtered);
  const agAll = aggregateER(CONTRATOS_ER);

  const hasFilter = fCliente || fProductor || fVariedad || fFormato;

  const clear = () => { setFCliente(''); setFProductor(''); setFVariedad(''); setFFormato(''); };

  const exportData = () => {
    toast.success('Exportación lista', 'Estado de Resultados descargado en formato Excel');
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="page-title">Estado de Resultados</h1>
          <p className="page-sub">Vista gerencial · período Agosto 2025 — Diciembre 2025</p>
        </div>
        <div className="actions">
          <button className="btn btn-secondary" onClick={() => toast.info('Comparativo', 'Vista comparativa con período anterior — próximamente')}>
            <Icon name="trending-up" size={15}/> Comparar período
          </button>
          <button className="btn btn-primary" onClick={exportData}>
            <Icon name="download" size={15}/> Exportar
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="filterbar mb-20">
        <div className="field">
          <label className="label">Cliente</label>
          <select className="select" value={fCliente} onChange={e=>setFCliente(e.target.value)}>
            <option value="">Todos los clientes</option>
            {clientes.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label className="label">Productor / Breeder</label>
          <select className="select" value={fProductor} onChange={e=>setFProductor(e.target.value)}>
            <option value="">Todos</option>
            {productores.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label className="label">Variedad</label>
          <select className="select" value={fVariedad} onChange={e=>setFVariedad(e.target.value)}>
            <option value="">Todas</option>
            {variedades.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label className="label">Formato</label>
          <select className="select" value={fFormato} onChange={e=>setFFormato(e.target.value)}>
            <option value="">Todos</option>
            {formatos.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {hasFilter && (
        <div className="row wrap gap-8 mb-16">
          <span className="text-muted" style={{fontSize:12.5, fontWeight:500}}>Filtros activos:</span>
          {fCliente && <FilterChip label={`Cliente: ${fCliente}`} active onRemove={()=>setFCliente('')} />}
          {fProductor && <FilterChip label={`Productor: ${fProductor}`} active onRemove={()=>setFProductor('')} />}
          {fVariedad && <FilterChip label={`Variedad: ${fVariedad}`} active onRemove={()=>setFVariedad('')} />}
          {fFormato && <FilterChip label={`Formato: ${fFormato}`} active onRemove={()=>setFFormato('')} />}
          <button className="btn btn-ghost btn-sm" onClick={clear}><Icon name="x" size={13}/> Limpiar todo</button>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-4 mb-20">
        <div className="kpi"><div className="kpi-accent"></div>
          <div className="kpi-label">Ingresos por venta</div>
          <div className="kpi-value">{fmtCLP(ag.ingresos)}</div>
          <div className="kpi-foot">
            {hasFilter ? <span>{fmtPct((ag.ingresos/agAll.ingresos)*100, 0)} del total</span> : <span><Icon name="trending-up" size={13}/> Total período</span>}
          </div>
        </div>
        <div className="kpi"><div className="kpi-accent sun"></div>
          <div className="kpi-label">Costos directos</div>
          <div className="kpi-value">{fmtCLP(ag.directos)}</div>
          <div className="kpi-foot">
            <span>Insumos {fmtCLP(ag.insumos)}</span>
            <span>·</span>
            <span>MO {fmtCLP(ag.mano)}</span>
          </div>
        </div>
        <div className="kpi"><div className="kpi-accent earth"></div>
          <div className="kpi-label">Costos indirectos</div>
          <div className="kpi-value">{fmtCLP(ag.indirectos)}</div>
          <div className="kpi-foot"><span>{fmtPct((ag.indirectos/ag.ingresos)*100, 1)} de ingresos</span></div>
        </div>
        <div className="kpi" style={{background:'linear-gradient(135deg, #eef5e8, #fff)'}}>
          <div className="kpi-accent"></div>
          <div className="kpi-label">Resultado operacional</div>
          <div className="kpi-value" style={{color:'var(--vet-leaf-dark)'}}>{fmtCLP(ag.resultado)}</div>
          <div className="kpi-foot"><Icon name="trending-up" size={13} className="text-success"/> <span className="text-success">Margen {fmtPct(ag.margenPct)}</span></div>
        </div>
      </div>

      <div className="grid mb-20" style={{gridTemplateColumns:'1fr 1fr'}}>
        <ERWaterfall ag={ag} />

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Resumen operativo</h3>
              <p className="card-sub">Volumen y mix bajo el filtro actual</p>
            </div>
          </div>
          <div className="card-body">
            <div className="grid grid-2 gap-16">
              <div className="kpi" style={{padding:'14px 16px'}}>
                <div className="kpi-label">Plantas filtradas</div>
                <div className="kpi-value" style={{fontSize:24}}>{fmtNum(ag.plantas)}</div>
                <div className="kpi-foot"><span>de {fmtNum(agAll.plantas)} totales</span></div>
              </div>
              <div className="kpi" style={{padding:'14px 16px'}}>
                <div className="kpi-label">Contratos</div>
                <div className="kpi-value" style={{fontSize:24}}>{ag.contratos}</div>
                <div className="kpi-foot"><span>de {agAll.contratos} totales</span></div>
              </div>
            </div>
            <div className="divider"></div>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {[
                ['Precio promedio venta', ag.ingresos / ag.plantas, '/planta'],
                ['Costo directo por planta', ag.directos / ag.plantas, '/planta'],
                ['Costo total por planta', (ag.directos + ag.indirectos) / ag.plantas, '/planta'],
                ['Margen por planta', ag.resultado / ag.plantas, '/planta'],
              ].map(([k, v, sufijo], i) => (
                <div key={i} className="row between" style={{padding:'8px 0', borderBottom:'1px solid var(--line)'}}>
                  <span className="text-muted" style={{fontSize:13}}>{k}</span>
                  <span style={{fontVariantNumeric:'tabular-nums', fontWeight:600}}>${(v||0).toFixed(2)} <span className="text-muted" style={{fontWeight:400, fontSize:12}}>{sufijo}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabla detalle */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Detalle de contratos incluidos</h3>
            <p className="card-sub">{ag.contratos} contrato{ag.contratos!==1?'s':''} · {fmtNum(ag.plantas)} plantas</p>
          </div>
          <div className="row gap-8">
            <button className="btn btn-secondary btn-sm" onClick={()=>toast.info('Imprimir', 'Vista de impresión preparada')}><Icon name="download" size={13}/> Imprimir</button>
          </div>
        </div>
        <div className="table-wrap">
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-icon"><Icon name="filter" size={22}/></div>
              <div className="empty-title">Sin resultados para los filtros aplicados</div>
              <div className="empty-msg">Ningún contrato coincide con la combinación de filtros seleccionada. Ajusta o limpia los filtros para ver datos.</div>
              <button className="btn btn-secondary btn-sm" onClick={clear}><Icon name="refresh" size={13}/> Limpiar filtros</button>
            </div>
          ) : (
            <table className="tbl">
              <thead>
                <tr>
                  <th>Contrato</th>
                  <th>Cliente</th>
                  <th>Productor</th>
                  <th>Variedad</th>
                  <th>Formato</th>
                  <th className="num">Plantas</th>
                  <th className="num">Precio</th>
                  <th className="num">Ingresos</th>
                  <th className="num">C. directos</th>
                  <th className="num">C. indirectos</th>
                  <th className="num">Margen</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => {
                  const k = calcContrato(c);
                  return (
                    <tr key={c.id}>
                      <td className="strong">{c.id}</td>
                      <td>{c.cliente}</td>
                      <td>{c.productor}</td>
                      <td>{c.variedad}</td>
                      <td><span className={"chip " + (c.formato==='Bolsa'?'chip-leaf':'chip-sun')}>{c.formato}</span></td>
                      <td className="num">{fmtNum(c.plantas)}</td>
                      <td className="num">${c.precio.toFixed(2)}</td>
                      <td className="num strong">{fmtCLP(k.ingresos)}</td>
                      <td className="num">{fmtCLP(k.directos)}</td>
                      <td className="num">{fmtCLP(k.indirectos)}</td>
                      <td className="num strong" style={{color:'var(--vet-leaf-dark)'}}>{fmtCLP(k.margen)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5">Total · {ag.contratos} contratos</td>
                  <td className="num">{fmtNum(ag.plantas)}</td>
                  <td></td>
                  <td className="num">{fmtCLP(ag.ingresos)}</td>
                  <td className="num">{fmtCLP(ag.directos)}</td>
                  <td className="num">{fmtCLP(ag.indirectos)}</td>
                  <td className="num" style={{color:'var(--vet-leaf-dark)'}}>{fmtCLP(ag.resultado)}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

window.ModuleDirectorio = ModuleDirectorio;
