#!/usr/bin/env node
/**
 * Hide øvelse/ressurser/referanser fields from Pregnancy_Problems and Pregnancy_Chapters
 * in Directus. These fields only belong on Condition_Pregnancy.
 *
 * Usage: node scripts/directus-cleanup-pregnancy.js
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

const COLLECTIONS_TO_CLEAN = ["Pregnancy_Problems", "Pregnancy_Chapters"];

function shouldHide(fieldName) {
  return (
    fieldName.startsWith("ovelse_") ||
    fieldName.startsWith("ressurser_") ||
    fieldName.startsWith("referanser_") ||
    fieldName.startsWith("div_")
  );
}

async function getFields(collection) {
  const res = await fetch(`${DIRECTUS_URL}/fields/${collection}`, { headers });
  if (!res.ok) throw new Error(`GET /fields/${collection} failed: ${res.status}`);
  const json = await res.json();
  return json.data || [];
}

async function hideField(collection, field) {
  const res = await fetch(`${DIRECTUS_URL}/fields/${collection}/${encodeURIComponent(field)}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ meta: { hidden: true } }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`  Feil: ${field} → ${res.status} ${text}`);
    return false;
  }
  return true;
}

async function main() {
  for (const collection of COLLECTIONS_TO_CLEAN) {
    console.log(`\nRydder opp i ${collection}...`);
    const fields = await getFields(collection);
    const toHide = fields.filter((f) => shouldHide(f.field) && !f.meta?.hidden);

    if (toHide.length === 0) {
      console.log("  Allerede ryddig – ingen felt å skjule.");
      continue;
    }

    console.log(`  Skjuler ${toHide.length} felt...`);
    for (const f of toHide) {
      const ok = await hideField(collection, f.field);
      if (ok) console.log(`  ✓ ${f.field} skjult`);
    }
  }

  console.log("\nFerdig. Pregnancy_Problems og Pregnancy_Chapters er nå enklere i Directus.");
  console.log("Kun kjernefelt vises (navn, om, symptomer, selvhjelp, søk hjelp, bilde, lenker).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
