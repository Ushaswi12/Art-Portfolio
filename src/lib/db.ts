import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Artwork, Collection, Category, ArtistInfo, PageContent } from '@/types';
import { artworks as defaultArtworks, collections as defaultCollections, categories as defaultCategories } from '@/data/artworks';
import { artistInfo as defaultArtistInfo, pageContent as defaultPageContent } from '@/data/site';

const DATA_DIR = join(process.cwd(), 'data');
const ARTWORKS_FILE = join(DATA_DIR, 'artworks.json');
const COLLECTIONS_FILE = join(DATA_DIR, 'collections.json');
const CATEGORIES_FILE = join(DATA_DIR, 'categories.json');
const ARTIST_INFO_FILE = join(DATA_DIR, 'artist-info.json');
const PAGE_CONTENT_FILE = join(DATA_DIR, 'page-content.json');

async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {
  }
}

async function readJSON<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

async function writeJSON<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir();
  const content = JSON.stringify(data, null, 2);

  // Write locally (always, fallback for local dev or temporary Vercel function lifetime)
  try {
    await writeFile(filePath, content, 'utf-8');
  } catch (err) {
    console.warn('[db.ts] Local write skipped (normal for read-only Vercel serverless environment):', err);
  }

  // Push to GitHub repository if credentials are set
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
    const relativePath = filePath
      .replace(process.cwd(), '')
      .replace(/^[\\/]+/, '')
      .replace(/\\/g, '/');
    try {
      const { commitToGitHub } = await import('./github');
      await commitToGitHub(relativePath, content, `CMS Update: ${relativePath}`);
      console.log(`[db.ts] Committed ${relativePath} successfully to GitHub.`);
    } catch (err) {
      console.error(`[db.ts] Failed to commit ${relativePath} to GitHub:`, err);
      throw err;
    }
  }
}

export const data = {
  artworks: {
    getAll: () => readJSON<Artwork[]>(ARTWORKS_FILE, defaultArtworks),
    getById: async (id: string) => {
      const all = await readJSON<Artwork[]>(ARTWORKS_FILE, defaultArtworks);
      return all.find((a) => a.id === id);
    },
    create: async (artwork: Omit<Artwork, 'id' | 'order'>) => {
      const all = await readJSON<Artwork[]>(ARTWORKS_FILE, defaultArtworks);
      const newArtwork: Artwork = {
        ...artwork,
        id: slugify(artwork.title),
        order: all.length + 1,
      };
      await writeJSON(ARTWORKS_FILE, [...all, newArtwork]);
      return newArtwork;
    },
    update: async (id: string, updates: Partial<Artwork>) => {
      const all = await readJSON<Artwork[]>(ARTWORKS_FILE, defaultArtworks);
      const index = all.findIndex((a) => a.id === id);
      if (index === -1) return null;
      all[index] = { ...all[index], ...updates };
      await writeJSON(ARTWORKS_FILE, all);
      return all[index];
    },
    delete: async (id: string) => {
      const all = await readJSON<Artwork[]>(ARTWORKS_FILE, defaultArtworks);
      const filtered = all.filter((a) => a.id !== id);
      await writeJSON(ARTWORKS_FILE, filtered);
      return true;
    },
    reorder: async (ids: string[]) => {
      const all = await readJSON<Artwork[]>(ARTWORKS_FILE, defaultArtworks);
      const reordered = ids.map((id, index) => {
        const artwork = all.find((a) => a.id === id);
        return artwork ? { ...artwork, order: index + 1 } : null;
      }).filter((a): a is Artwork => a !== null);
      const remaining = all.filter((a) => !ids.includes(a.id));
      await writeJSON(ARTWORKS_FILE, [...reordered, ...remaining]);
      return [...reordered, ...remaining];
    },
  },

  collections: {
    getAll: () => readJSON<Collection[]>(COLLECTIONS_FILE, defaultCollections),
    getById: async (id: string) => {
      const all = await readJSON<Collection[]>(COLLECTIONS_FILE, defaultCollections);
      return all.find((c) => c.id === id);
    },
    create: async (collection: Omit<Collection, 'id' | 'order'>) => {
      const all = await readJSON<Collection[]>(COLLECTIONS_FILE, defaultCollections);
      const newCollection: Collection = {
        ...collection,
        id: slugify(collection.title),
        order: all.length + 1,
      };
      await writeJSON(COLLECTIONS_FILE, [...all, newCollection]);
      return newCollection;
    },
    update: async (id: string, updates: Partial<Collection>) => {
      const all = await readJSON<Collection[]>(COLLECTIONS_FILE, defaultCollections);
      const index = all.findIndex((c) => c.id === id);
      if (index === -1) return null;
      all[index] = { ...all[index], ...updates };
      await writeJSON(COLLECTIONS_FILE, all);
      return all[index];
    },
    delete: async (id: string) => {
      const all = await readJSON<Collection[]>(COLLECTIONS_FILE, defaultCollections);
      const filtered = all.filter((c) => c.id !== id);
      await writeJSON(COLLECTIONS_FILE, filtered);
      return true;
    },
  },

  categories: {
    getAll: () => readJSON<Category[]>(CATEGORIES_FILE, defaultCategories),
  },

  artistInfo: {
    get: () => readJSON<ArtistInfo>(ARTIST_INFO_FILE, defaultArtistInfo),
    update: async (updates: Partial<ArtistInfo>) => {
      const current = await readJSON<ArtistInfo>(ARTIST_INFO_FILE, defaultArtistInfo);
      const updated = { ...current, ...updates };
      await writeJSON(ARTIST_INFO_FILE, updated);
      return updated;
    },
  },

  pageContent: {
    get: () => readJSON<PageContent>(PAGE_CONTENT_FILE, defaultPageContent),
    update: async (updates: Partial<PageContent>) => {
      const current = await readJSON<PageContent>(PAGE_CONTENT_FILE, defaultPageContent);
      const updated = { ...current, ...updates };
      await writeJSON(PAGE_CONTENT_FILE, updated);
      return updated;
    },
  },
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}