// Públicos para Meta desde el CRM (lógica pura, se prueba en Node: scripts/pruebas_crm_publicos_meta.mjs). No escribe nada: solo arma filas y texto CSV.
// Columnas como las pide Meta: email, phone (+56…), fn, country. Una persona = un grupo de fichas con el mismo correo o WhatsApp (lo agrupa el CRM).
import { esExalumna } from './black-friday.js';

const COLS = ['email', 'phone', 'fn', 'country'];

// Teléfono a formato internacional. Devuelve { tel, problema }. Con + o 00 se respeta el código de país; sin él, 9 dígitos = Chile (+56).
export const normalizaTel = (raw) => {
  const t = String(raw ?? '').trim();
  if (!t) return { tel: '', problema: '' };
  const conCodigo = /^\s*(\+|00)/.test(t);
  const d = t.replace(/\D/g, '').replace(/^00/, '');
  const malo = { tel: '', problema: t };
  if (conCodigo) return d.length >= 8 && d.length <= 15 && !(d.startsWith('56') && d.length !== 11) ? { tel: `+${d}`, problema: '' } : malo;
  if (d.length === 9 && /^[2-9]/.test(d)) return { tel: `+56${d}`, problema: '' };
  if (d.length === 11 && d.startsWith('56')) return { tel: `+${d}`, problema: '' };
  if (d.length >= 10 && d.length <= 15 && !d.startsWith('0') && !d.startsWith('56')) return { tel: `+${d}`, problema: '' }; // ya trae otro código de país, sin el +
  return malo;
};

export const normalizaEmail = (e) => {
  const v = String(e ?? '').trim().toLowerCase();
  return /^[a-z0-9][^\s@,;"']*@[^\s@,;"']+\.[^\s@,;"']+$/.test(v) ? v : '';
};

// Primer nombre sin caracteres que Excel tomaría como fórmula (=, +, -, @) ni espacios raros al inicio
export const primerNombre = (n) => String(n ?? '').replace(/^[\s=+\-@\t\r]+/, '').trim().split(/\s+/)[0] || '';

// ctx: { pagoHecho(lead), etapaDe(lead), niveles(persona) -> [1,5..], pagaAula(persona) -> bool, formacionPagada(persona) -> bool }
export const construirPublicos = (personas = [], ctx) => {
  const { pagoHecho = () => false, etapaDe = (l) => l.status, niveles = () => [], pagaAula = () => false } = ctx || {};
  const salida = { alumnas: [], manoLevantada: [], registradas: [], compradorasBF: [], avisos: { telefonosMalos: [], sinContacto: 0, correosMalos: [] } };
  const vistos = { alumnas: { e: new Set(), t: new Set() }, manoLevantada: { e: new Set(), t: new Set() }, registradas: { e: new Set(), t: new Set() }, compradorasBF: { e: new Set(), t: new Set() } };
  const avisados = new Set();
  const agrega = (aud, p) => {
    const em = normalizaEmail(p.email), tel = normalizaTel(p.whatsapp);
    const clave = p.id || `${em}|${tel.tel}`;
    if (!avisados.has(clave)) {
      avisados.add(clave);
      if (tel.problema) salida.avisos.telefonosMalos.push({ nombre: p.nombre || '', telefono: tel.problema });
      if (p.email && !em) salida.avisos.correosMalos.push({ nombre: p.nombre || '', correo: p.email });
    }
    if (!em && !tel.tel) { if (!salida.avisos._sc) salida.avisos._sc = new Set(); salida.avisos._sc.add(`${aud}|${clave}`); return; }
    const v = vistos[aud];
    if ((em && v.e.has(em)) || (tel.tel && v.t.has(tel.tel))) return;
    if (em) v.e.add(em);
    if (tel.tel) v.t.add(tel.tel);
    salida[aud].push({ email: em, phone: tel.tel, fn: primerNombre(p.nombre), country: 'cl' });
  };
  personas.forEach((p) => {
    const activos = (p.leads || []).filter((l) => etapaDe(l) !== 'descartado'); // las fichas Descartadas no cuentan
    const lv = niveles(p);
    if (!activos.length && !lv.length && !pagaAula(p)) return;
    const pagoFormacion = activos.some((l) => l.form === 'formacion' && pagoHecho(l));
    const alumna = esExalumna(activos, pagoHecho, lv) || pagoFormacion || pagaAula(p) || lv.length > 0;
    if (alumna) agrega('alumnas', p);
    else if (activos.some((l) => l.postulacion || l.blackFriday && typeof l.blackFriday === 'object')) agrega('manoLevantada', p);
    else if (activos.length) agrega('registradas', p); // dejaron sus datos (p. ej. clase gratis) y no pagaron ni postularon
    // Compradora de Black Friday: ficha con blackFriday y pago registrado (en la ficha o en su cuenta del aula)
    if (activos.some((l) => l.blackFriday && typeof l.blackFriday === 'object') && (pagoFormacion || pagaAula(p))) agrega('compradorasBF', p);
  });
  salida.avisos.sinContacto = salida.avisos._sc ? salida.avisos._sc.size : 0;
  delete salida.avisos._sc;
  return salida;
};

// Celda CSV entre comillas. El teléfono empieza con + a propósito (no es fórmula); lo demás que empiece como fórmula se neutraliza.
const celda = (v, esTel = false) => { let t = String(v ?? ''); if (!esTel && /^[=+\-@\t\r]/.test(t)) t = `'${t}`; return `"${t.replace(/"/g, '""')}"`; };
export const csvPublico = (filas = []) => {
  const lineas = [COLS.map((c) => celda(c)).join(','), ...filas.map((f) => COLS.map((c) => celda(f[c], c === 'phone')).join(','))];
  return `﻿${lineas.join('\r\n')}`;
};
export const COLUMNAS_META = COLS;
