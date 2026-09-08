// platform/shared/database/db.ts
// Unified database client entry point routing dynamically

import { DBClient } from './types';
import { localDBClient } from './db-client-local';

// Set active database driver to localDBClient (Forms dispatch directly via Google Sheets / CRM Webhook)
export const db: DBClient = localDBClient;

console.log('[Qeltrava OS DB] Active database driver: Local DB (Form responses dispatch to Google Sheets webhook)');

export * from './types';
export { localDBClient } from './db-client-local';
