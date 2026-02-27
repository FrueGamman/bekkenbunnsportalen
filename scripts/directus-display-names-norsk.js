#!/usr/bin/env node
/**
 * Set Directus collection display names to Norsk so everything in the admin shows in Norwegian.
 * No translation system – display names are set to Norwegian only.
 *
 * Usage: node scripts/directus-display-names-norsk.js
 * Requires .env: VITE_DIRECTUS_URL, VITE_DIRECTUS_TOKEN (admin).
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

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error("Set VITE_DIRECTUS_URL and VITE_DIRECTUS_TOKEN in .env");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${DIRECTUS_TOKEN}`,
  "Content-Type": "application/json",
};

// Collection → { singular, plural } display name in Norsk
const COLLECTION_NAMES = {
  Condition_Pregnancy: { singular: "Graviditet – Hovedside", plural: "Graviditet – Hovedside" },
  Pregnancy_Problems:  { singular: "Graviditetsplage", plural: "Graviditetsplager" },
  Pregnancy_Chapters:  { singular: "Graviditetskapittel", plural: "Graviditetskapitler" },
};

async function updateCollectionMeta(collection, meta) {
  const res = await fetch(`${DIRECTUS_URL}/collections/${collection}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ meta }),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`PATCH /collections/${collection} failed: ${res.status} ${res.statusText} - ${text}`);
  }
  return text ? JSON.parse(text) : {};
}

async function main() {
  for (const [collection, names] of Object.entries(COLLECTION_NAMES)) {
    // Directus expects translations as an array of { language, translation, singular, plural }
    // We set both en-US and nb-NO to Norsk so whatever language the user is in, they see Norsk.
    const translations = [
      {
        language: "en-US",
        translation: names.plural,
        singular: names.singular,
        plural: names.plural,
      },
      {
        language: "nb-NO",
        translation: names.plural,
        singular: names.singular,
        plural: names.plural,
      },
    ];

    await updateCollectionMeta(collection, { translations });
    console.log(`✓ ${collection} → "${names.plural}"`);
  }

  console.log("\nFerdig. Visningsnavn i Directus er nå på norsk.");
  console.log("Last inn Directus på nytt (Ctrl+Shift+R) for å se endringene.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
