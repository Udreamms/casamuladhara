// Agrega dominios autorizados para el login (Google exige que el dominio esté en esta lista).
// Uso: node scripts/auth-domains.mjs casamuladhara.com www.casamuladhara.com mi-proyecto.vercel.app
import { client, PROJECT } from './_auth.mjs';
const c = await client();
const url = `https://identitytoolkit.googleapis.com/admin/v2/projects/${PROJECT}/config`;
const { data } = await c.request({ url });
const set = new Set(data.authorizedDomains || []);
process.argv.slice(2).forEach((d) => set.add(d));
const res = await c.request({ method: 'PATCH', url: `${url}?updateMask=authorizedDomains`, data: { authorizedDomains: [...set] } });
console.log('Dominios autorizados:', res.data.authorizedDomains.join(', '));
