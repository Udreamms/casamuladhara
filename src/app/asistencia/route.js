// /asistencia?l=<codigo>  -> la persona escribe la palabra de la clase. Vale solo entre 10 minutos antes y 30 después del inicio.
// Si coincide queda "Asistió confirmado". Se limitan los intentos para que nadie adivine la palabra.
import { FieldValue } from 'firebase-admin/firestore';
import { contactoPorCodigo, normaliza, primerNombre, registrarEvento, sesionEn } from '@/lib/server/embudo.js';
import { enlaceInvalido, esc, pagina } from '@/lib/server/paginas.js';

const formulario = (codigo, mensaje = '') => pagina('Código de asistencia', `<h1>Confirma tu asistencia</h1><p class="muted">Escribe la palabra que se dijo durante la clase.</p>${mensaje ? `<p class="err">${mensaje}</p>` : ''}
  <form method="post" action="/asistencia?l=${esc(codigo)}" style="display:grid;gap:12px"><input name="palabra" autocomplete="off" required maxlength="60" placeholder="La palabra de la clase" aria-label="Palabra de la clase"><button>Confirmar</button></form>`);

export async function GET(request) {
  const codigo = new URL(request.url).searchParams.get('l') || '';
  return (await contactoPorCodigo(codigo)) ? formulario(codigo) : enlaceInvalido();
}

export async function POST(request) {
  const codigo = new URL(request.url).searchParams.get('l') || '';
  try {
    const c = await contactoPorCodigo(codigo);
    if (!c) return enlaceInvalido();
    const palabra = normaliza((await request.formData().catch(() => null))?.get('palabra') || '');
    const ses = await sesionEn(c.clase, Date.now());
    if (!ses) return formulario(codigo, 'Este código solo se puede usar durante la clase, hasta 30 minutos después de que termine.');
    if (!ses.palabra) return formulario(codigo, 'Todavía no hay una palabra definida para esta clase. Escríbenos por WhatsApp.');
    if ((c.asistIntentos?.[ses.id] || 0) >= 8) return formulario(codigo, 'Demasiados intentos. Escríbenos por WhatsApp y lo revisamos.');
    if (!palabra || palabra !== normaliza(ses.palabra)) {
      await c.ref.update({ [`asistIntentos.${ses.id}`]: FieldValue.increment(1) });
      return formulario(codigo, 'Esa no es la palabra. Revisa e inténtalo de nuevo.');
    }
    await registrarEvento({ codigo, evento: 'codigo_asistencia_ok', fechaIso: new Date().toISOString(), origen: 'asistencia' });
    return pagina('Asistencia confirmada', `<h1>¡Asistencia confirmada, ${esc(primerNombre(c.name))}!</h1><p>Gracias por estar en la clase.</p>`);
  } catch (e) {
    console.error('asistencia', e);
    return pagina('Error', '<h1>No pudimos confirmar tu asistencia</h1><p>Inténtalo de nuevo en un momento.</p>', 500);
  }
}
