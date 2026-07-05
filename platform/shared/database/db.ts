// platform/shared/database/db.ts
// Unified database client entry point routing dynamically

import { DBClient } from './types';
import { localDBClient } from './db-client-local';
import { supabaseDBClient } from './db-client-supabase';

const hasSupabaseKeys = 
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

// Export the active database client
export const db: DBClient = hasSupabaseKeys ? supabaseDBClient : localDBClient;

console.log(
  `[Qeltrava OS DB] Active database driver: ${
    hasSupabaseKeys ? 'Supabase (PostgreSQL)' : 'Local Fallback (db-local.json)'
  }`
);

export * from './types';
export { localDBClient } from './db-client-local';
export { supabaseDBClient } from './db-client-supabase';
export { supabase } from './db-client-supabase';
