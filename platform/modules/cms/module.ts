// platform/modules/cms/module.ts
// CMS Logic Wrapper: Blogs, Case Studies, Products & Revisions Engine

import { db } from '../../shared/database/db';
import { Blog, CaseStudy, Product } from '../../shared/database/types';

const defaultWsId = 'ws-qeltrava-ai';

export async function getBlogPosts(filters?: Record<string, any>) {
  return db.blogs.list(defaultWsId, filters);
}

export async function getBlogPost(idOrSlug: string) {
  return db.blogs.get(defaultWsId, idOrSlug);
}

export async function getCaseStudies(filters?: Record<string, any>) {
  return db.caseStudies.list(defaultWsId, filters);
}

export async function getCaseStudy(idOrSlug: string) {
  return db.caseStudies.get(defaultWsId, idOrSlug);
}

export async function getProducts(filters?: Record<string, any>) {
  return db.products.list(defaultWsId, filters);
}

export async function getProduct(idOrSlug: string) {
  return db.products.get(defaultWsId, idOrSlug);
}

// Autosave Draft Manager (Memory and local storage backing)
const draftCache = new Map<string, { data: any; updatedAt: number }>();

export async function saveDraftOnServer(type: string, id: string, data: any) {
  const cacheKey = `${type}:${id}`;
  draftCache.set(cacheKey, {
    data,
    updatedAt: Date.now()
  });
  return { success: true, timestamp: Date.now() };
}

export async function getDraftFromServer(type: string, id: string) {
  const cacheKey = `${type}:${id}`;
  return draftCache.get(cacheKey) || null;
}
