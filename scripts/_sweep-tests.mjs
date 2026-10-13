// Borra cuentas y datos de prueba (@test.casamuladhara.invalid) que hayan quedado de una corrida interrumpida.
import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';
import { keyFile, DATABASE } from './_auth.mjs';
import { getFirestore } from 'firebase-admin/firestore';
admin.initializeApp({ credential: admin.credential.cert(JSON.parse(readFileSync(keyFile, 'utf8'))) });
const db = getFirestore(admin.app(), DATABASE);
const { users } = await admin.auth().listUsers(1000);
const t = users.filter((u) => u.email?.endsWith('@test.casamuladhara.invalid'));
const uids = t.map((u) => u.uid);
for (let i = 0; i < uids.length; i += 10) {
  const chunk = uids.slice(i, i + 10);
  for (const col of ['posts', 'replies']) (await db.collection(col).where('authorUid', 'in', chunk).get()).forEach((d) => d.ref.delete());
}
for (const u of t) { await db.recursiveDelete(db.doc(`users/${u.uid}`)); await admin.auth().deleteUser(u.uid); }
console.log(`limpiado: ${t.length} cuenta(s) de prueba`);
process.exit(0);
