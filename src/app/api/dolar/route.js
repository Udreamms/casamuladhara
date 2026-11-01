// GET /api/dolar -> { clp, fecha, fuente }
// Valor del dólar en pesos chilenos, para mostrar junto a los precios en USD (landings). Se consulta en el servidor y se guarda 6 horas.
// Fuente principal: dólar observado del Banco Central de Chile (mindicador.cl); respaldo: open.er-api.com.
const razonable = (n) => Number.isFinite(n) && n > 300 && n < 3000;
const cache = { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' };

async function leer(url, pick) {
  const r = await fetch(url, { signal: AbortSignal.timeout(5000), next: { revalidate: 21600 } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return pick(await r.json());
}

export async function GET() {
  try {
    const d = await leer('https://mindicador.cl/api/dolar', (j) => ({ clp: j.serie?.[0]?.valor, fecha: String(j.serie?.[0]?.fecha || '').slice(0, 10), fuente: 'dólar observado, Banco Central de Chile' }));
    if (razonable(d.clp)) return Response.json(d, { headers: cache });
  } catch (e) { console.error('dolar (mindicador)', e?.message || e); }
  try {
    const d = await leer('https://open.er-api.com/v6/latest/USD', (j) => ({ clp: j.rates?.CLP, fecha: new Date().toISOString().slice(0, 10), fuente: 'tipo de cambio de referencia' }));
    if (razonable(d.clp)) return Response.json(d, { headers: cache });
  } catch (e) { console.error('dolar (respaldo)', e?.message || e); }
  return Response.json({}, { status: 502, headers: { 'Cache-Control': 'no-store' } });
}
