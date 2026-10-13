// Credenciales de servicio: se leen de GOOGLE_APPLICATION_CREDENTIALS o de
// ~/.config/casamuladhara/service-account.json. Nunca viven dentro del repo.
import { GoogleAuth } from 'google-auth-library';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';

export const PROJECT = 'casamuladhara';
export const DATABASE = 'casamuladhara';
export const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS || `${homedir()}/.config/casamuladhara/service-account.json`;

export async function client() {
  const auth = new GoogleAuth({ keyFile, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
  return auth.getClient();
}
export const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
