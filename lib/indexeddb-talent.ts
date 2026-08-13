// lib/indexeddb-talent.ts
// IndexedDB client storage engine for Qeltrava AI Talent Community

export const DB_NAME = 'QeltravaTalentDB';
export const DB_VERSION = 1;

export interface TalentDraft {
  id: string;
  step: number;
  data: Record<string, any>;
  updatedAt: string;
}

export function openTalentDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // 1. Candidates Object Store
      if (!db.objectStoreNames.contains('candidates')) {
        const candidateStore = db.createObjectStore('candidates', { keyPath: 'id' });
        candidateStore.createIndex('candidate_code', 'candidate_code', { unique: true });
        candidateStore.createIndex('email', 'email', { unique: false });
        candidateStore.createIndex('current_status', 'current_status', { unique: false });
        candidateStore.createIndex('created_at', 'created_at', { unique: false });
      }

      // 2. Candidate Status History Object Store
      if (!db.objectStoreNames.contains('candidate_status_history')) {
        const historyStore = db.createObjectStore('candidate_status_history', { keyPath: 'id' });
        historyStore.createIndex('candidate_id', 'candidate_id', { unique: false });
        historyStore.createIndex('created_at', 'created_at', { unique: false });
      }

      // 3. Application Form Drafts Object Store
      if (!db.objectStoreNames.contains('drafts')) {
        db.createObjectStore('drafts', { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

// ─── Candidates Store Operations ──────────────────────────────────────────

export async function saveCandidateLocal(candidate: any): Promise<void> {
  const db = await openTalentDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('candidates', 'readwrite');
    const store = tx.objectStore('candidates');
    const req = store.put({
      ...candidate,
      id: candidate.id || candidate.candidate_code || `local-${Date.now()}`,
      updated_at: new Date().toISOString()
    });
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function bulkSaveCandidatesLocal(candidates: any[]): Promise<void> {
  const db = await openTalentDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('candidates', 'readwrite');
    const store = tx.objectStore('candidates');
    for (const c of candidates) {
      store.put({
        ...c,
        id: c.id || c.candidate_code,
        updated_at: c.updated_at || new Date().toISOString()
      });
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getCandidatesLocal(): Promise<any[]> {
  const db = await openTalentDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('candidates', 'readonly');
    const store = tx.objectStore('candidates');
    const req = store.getAll();
    req.onsuccess = () => {
      const results = req.result || [];
      // Sort newest first
      results.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
      resolve(results);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function getCandidateLocal(idOrCode: string): Promise<any | null> {
  const db = await openTalentDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('candidates', 'readonly');
    const store = tx.objectStore('candidates');
    const req = store.get(idOrCode);
    req.onsuccess = () => {
      if (req.result) {
        resolve(req.result);
        return;
      }
      // Try by candidate_code index
      const index = store.index('candidate_code');
      const codeReq = index.get(idOrCode);
      codeReq.onsuccess = () => resolve(codeReq.result || null);
      codeReq.onerror = () => reject(codeReq.error);
    };
    req.onerror = () => reject(req.error);
  });
}

// ─── Form Draft Operations ──────────────────────────────────────────────

export async function saveFormDraft(step: number, data: Record<string, any>): Promise<void> {
  try {
    const db = await openTalentDB();
    const tx = db.transaction('drafts', 'readwrite');
    const store = tx.objectStore('drafts');
    store.put({
      id: 'current_application_draft',
      step,
      data,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('IndexedDB saveFormDraft warning:', err);
  }
}

export async function getFormDraft(): Promise<TalentDraft | null> {
  try {
    const db = await openTalentDB();
    return new Promise((resolve) => {
      const tx = db.transaction('drafts', 'readonly');
      const store = tx.objectStore('drafts');
      const req = store.get('current_application_draft');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    return null;
  }
}

export async function clearFormDraft(): Promise<void> {
  try {
    const db = await openTalentDB();
    const tx = db.transaction('drafts', 'readwrite');
    const store = tx.objectStore('drafts');
    store.delete('current_application_draft');
  } catch (err) {
    console.warn('IndexedDB clearFormDraft warning:', err);
  }
}
