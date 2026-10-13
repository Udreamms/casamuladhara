// Publica reglas de Firestore, reglas de Storage e índices usando las APIs REST de Google.
// Uso: node scripts/deploy-backend.mjs [rules|storage|indexes]   (sin argumento: todo)
import { client, read, PROJECT, DATABASE } from './_auth.mjs';

const c = await client();
const what = process.argv[2];
const want = (k) => !what || what === k;

async function publishRules(source, releaseName, label) {
  const rs = await c.request({
    method: 'POST',
    url: `https://firebaserules.googleapis.com/v1/projects/${PROJECT}/rulesets`,
    data: { source: { files: [{ name: label, content: source }] } },
  });
  const rulesetName = rs.data.name;
  const body = { release: { name: `projects/${PROJECT}/releases/${releaseName}`, rulesetName } };
  try {
    await c.request({ method: 'PATCH', url: `https://firebaserules.googleapis.com/v1/projects/${PROJECT}/releases/${releaseName}`, data: body });
  } catch (e) {
    if (e.response?.status !== 404) throw e;
    await c.request({ method: 'POST', url: `https://firebaserules.googleapis.com/v1/projects/${PROJECT}/releases`, data: body.release });
  }
  console.log(`✔ ${label} publicadas (${rulesetName.split('/').pop()})`);
}

if (want('rules')) await publishRules(read('firestore.rules'), `cloud.firestore/${DATABASE}`, 'firestore.rules');

if (want('storage')) {
  // El bucket por defecto de Firebase Storage
  const bucket = 'casamuladhara.firebasestorage.app';
  await publishRules(read('storage.rules'), `firebase.storage/${bucket}`, 'storage.rules');
}

if (want('indexes')) {
  const { indexes } = JSON.parse(read('firestore.indexes.json'));
  const base = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/${DATABASE}/collectionGroups`;
  for (const ix of indexes) {
    try {
      await c.request({
        method: 'POST',
        url: `${base}/${ix.collectionGroup}/indexes`,
        data: { queryScope: ix.queryScope, fields: ix.fields },
      });
      console.log(`✔ índice creado: ${ix.collectionGroup} (${ix.fields.map((f) => f.fieldPath).join(', ')})`);
    } catch (e) {
      if (e.response?.status === 409) console.log(`• ya existía: ${ix.collectionGroup} (${ix.fields.map((f) => f.fieldPath).join(', ')})`);
      else throw e;
    }
  }
}
