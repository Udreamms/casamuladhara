// Prueba de las respuestas de la postulación en la ficha (datos inventados). Uso: node scripts/pruebas_crm_postulacion.mjs
import assert from 'node:assert/strict';
import { filasPostulacion } from '../public/assets/js/postulacion.js';

// Ficha nueva: motivo, experiencia y horas; sin objetivo, inicio ni inversión
const nueva = filasPostulacion({ motivo: 'Quiero acompañar a otras', experiencia: 'Sí, con Karen', horas: '4 o más', t: 1 });
assert.deepEqual(nueva, [['Qué la mueve', 'Quiero acompañar a otras'], ['Cursos holísticos', 'Sí, con Karen'], ['Horas por semana', '4 o más']]);
// Ficha nueva con una respuesta vacía: experiencia se muestra con «—»; motivo y horas vacíos no salen
assert.deepEqual(filasPostulacion({ motivo: 'x', horas: 'Menos de 4' }).map((r) => r[0]), ['Qué la mueve', 'Cursos holísticos', 'Horas por semana']);
// Ficha antigua: objetivo, experiencia, inicio e inversión (como antes)
const vieja = filasPostulacion({ objetivo: 'Vivir de esto', experiencia: 'Poca', inicio: 'Ya', inversion: '$300.000' });
assert.deepEqual(vieja, [['Experiencia', 'Poca'], ['Objetivo', 'Vivir de esto'], ['Cuándo quiere empezar', 'Ya'], ['Inversión', '$300.000']]);
// Sin respuestas
assert.deepEqual(filasPostulacion(undefined), [['Experiencia', '—']]);
console.log('pruebas_crm_postulacion: todo bien');
