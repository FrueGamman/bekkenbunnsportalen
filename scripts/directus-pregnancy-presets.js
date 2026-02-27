#!/usr/bin/env node
/**
 * Create Directus bookmarks and list layouts for pregnancy content so the admin
 * layout matches https://www.bekkenbunnsportalen.no/conditions/pregnancy.
 *
 * Usage: node scripts/directus-pregnancy-presets.js
 * Requires .env: VITE_DIRECTUS_URL, VITE_DIRECTUS_TOKEN (admin or preset create).
 * Optional: DIRECTUS_PRESET_ROLE_ID — apply bookmarks to this role (all users in role).
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  try {
    const envPath = join(root, ".env");
    const content = readFileSync(envPath, "utf8");
    const env = {};
    for (const line of content.split("\n")) {
      const m = line.match(/^\s*([^#=]+)=(.*)$/);
      if (m) env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    }
    return env;
  } catch {
    return {};
  }
}

const env = loadEnv();
const DIRECTUS_URL = (process.env.VITE_DIRECTUS_URL || env.VITE_DIRECTUS_URL || "").replace(/\/$/, "");
const DIRECTUS_TOKEN = process.env.VITE_DIRECTUS_TOKEN || env.VITE_DIRECTUS_TOKEN || "";
const PRESET_ROLE_ID = process.env.DIRECTUS_PRESET_ROLE_ID || env.DIRECTUS_PRESET_ROLE_ID || null;

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error("Set VITE_DIRECTUS_URL and VITE_DIRECTUS_TOKEN in .env or environment.");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${DIRECTUS_TOKEN}`,
  "Content-Type": "application/json",
};

// Norsk: all bookmarks in Norwegian to match Directus display language
const BOOKMARKS = [
  {
    title: "Graviditet – Hovedside",
    collection: "Condition_Pregnancy",
    layout: "tabular",
    layout_query: {},
    layout_options: {},
  },
  {
    title: "Graviditet – Plager",
    collection: "Pregnancy_Problems",
    layout: "cards",
    layout_query: { cards: { sort: "sort" } },
    layout_options: {
      cards: {
        title: "{{ name_no }}",
        subtitle: "{{ name_en }}",
        size: 3,
      },
    },
  },
  {
    title: "Graviditet – Kapitler",
    collection: "Pregnancy_Chapters",
    layout: "cards",
    layout_query: { cards: { sort: "sort" } },
    layout_options: {
      cards: {
        title: "{{ title_no }}",
        subtitle: "{{ title_en }}",
        size: 3,
      },
    },
  },
];


async function getPresets() {
  const res = await fetch(`${DIRECTUS_URL}/presets?limit=-1`, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET /presets failed: ${res.status} ${res.statusText} - ${text}`);
  }
  const json = await res.json();
  return json.data || [];
}

async function updatePreset(id, payload) {
  const body = {
    title: payload.title,
    layout: payload.layout,
    layout_query: payload.layout_query || {},
    layout_options: payload.layout_options || {},
  };
  const res = await fetch(`${DIRECTUS_URL}/presets/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`PATCH /presets/${id} failed: ${res.status} ${res.statusText} - ${text}`);
  }
  return text ? JSON.parse(text) : {};
}

async function createPreset(payload) {
  const body = {
    collection: payload.collection,
    title: payload.title,
    layout: payload.layout,
    layout_query: payload.layout_query || {},
    layout_options: payload.layout_options || {},
    filters: [],
  };
  if (PRESET_ROLE_ID) {
    body.role = PRESET_ROLE_ID;
  }

  const res = await fetch(`${DIRECTUS_URL}/presets`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`POST /presets failed: ${res.status} ${res.statusText} - ${text}`);
  }
  return text ? JSON.parse(text) : {};
}

async function deletePreset(id) {
  const res = await fetch(`${DIRECTUS_URL}/presets/${id}`, { method: "DELETE", headers });
  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    throw new Error(`DELETE /presets/${id} failed: ${res.status} ${res.statusText} - ${text}`);
  }
}

async function main() {
  console.log("Fetching existing presets...");
  let existing = await getPresets();

  const collectionsSet = new Set(BOOKMARKS.map((b) => b.collection));
  const byCollection = new Map(BOOKMARKS.map((b) => [b.collection, b]));

  for (const preset of existing) {
    const title = (preset.title || "").trim();
    if (!collectionsSet.has(preset.collection)) continue;
    const bookmark = byCollection.get(preset.collection);
    if (!bookmark) continue;
    if (title !== bookmark.title) {
      console.log(`Oppdaterer preset id ${preset.id} til norsk: "${bookmark.title}"`);
      await updatePreset(preset.id, bookmark);
      preset.title = bookmark.title;
    }
  }

  for (const bookmark of BOOKMARKS) {
    const forCollection = existing.filter(
      (p) => p.collection === bookmark.collection && (p.title || "").trim() === bookmark.title
    );
    if (forCollection.length > 1) {
      forCollection.sort((a, b) => a.id - b.id);
      for (let i = 1; i < forCollection.length; i++) {
        console.log(`Sletter duplikat preset id ${forCollection[i].id} (${bookmark.collection}).`);
        await deletePreset(forCollection[i].id);
        existing = existing.filter((p) => p.id !== forCollection[i].id);
      }
    }
  }

  for (const bookmark of BOOKMARKS) {
    const found = existing.find(
      (p) => p.collection === bookmark.collection && (p.title || "").trim() === bookmark.title
    );
    if (found) {
      console.log(`Bokmerke "${bookmark.title}" finnes allerede (id: ${found.id}), hopper over.`);
      continue;
    }
    const anyForCollection = existing.find((p) => p.collection === bookmark.collection);
    if (anyForCollection) {
      console.log(`Samlingen ${bookmark.collection} har allerede et bokmerke, hopper over opprettelse.`);
      continue;
    }
    console.log(`Oppretter bokmerke: ${bookmark.title} (${bookmark.collection})`);
    const result = await createPreset(bookmark);
    const id = result.data?.id ?? result.id;
    console.log(`  Opprettet preset id: ${id}`);
    existing.push({ id, collection: bookmark.collection, title: bookmark.title });
  }

  console.log("Ferdig. Graviditetsbokmerker vises i Directus-sidebaren (på norsk).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
