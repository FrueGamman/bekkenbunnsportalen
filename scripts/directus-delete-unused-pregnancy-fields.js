#!/usr/bin/env node
/**
 * Delete unused hidden ovelse/ressurser/referanser fields from
 * Pregnancy_Problems and Pregnancy_Chapters in Directus.
 * These fields only belong on Condition_Pregnancy.
 *
 * Keeps: image, link_url, link_text, pdf_file etc. (needed later)
 *
 * Usage: node scripts/directus-delete-unused-pregnancy-fields.js
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

const COLLECTIONS = ["Pregnancy_Problems", "Pregnancy_Chapters"];

function shouldDelete(fieldName) {
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

async function deleteField(collection, field) {
  const res = await fetch(`${DIRECTUS_URL}/fields/${collection}/${encodeURIComponent(field)}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    console.error(`  ✗ ${field}: ${res.status} ${text}`);
    return false;
  }
  return true;
}

async function main() {
  for (const collection of COLLECTIONS) {
    console.log(`\n${collection}:`);
    const fields = await getFields(collection);
    const toDelete = fields.filter((f) => shouldDelete(f.field));

    if (toDelete.length === 0) {
      console.log("  Ingen felt å slette.");
      continue;
    }

    console.log(`  Sletter ${toDelete.length} ubrukte felt...`);

    // Delete dividers (alias) first, then real fields
    const dividers = toDelete.filter((f) => f.field.startsWith("div_"));
    const others = toDelete.filter((f) => !f.field.startsWith("div_"));

    for (const f of [...dividers, ...others]) {
      const ok = await deleteField(collection, f.field);
      if (ok) console.log(`  ✓ ${f.field} slettet`);
    }

    const remaining = await getFields(collection);
    console.log(`  Gjenstående felt: ${remaining.length}`);
    remaining.forEach((f) => console.log(`    ${f.field}`));
  }

  console.log("\nFerdig. Kun kjernefelt gjenstår.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
