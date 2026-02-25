#!/usr/bin/env node
/**
 * Add exercise (øvelse) fields to Directus collection "tilstander".
 * Usage: node scripts/add-directus-ovelse-fields.js
 * Requires .env with VITE_DIRECTUS_URL and VITE_DIRECTUS_TOKEN.
 * Token must have permission to create fields (admin).
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
  console.error("Set VITE_DIRECTUS_URL and VITE_DIRECTUS_TOKEN in .env or environment.");
  process.exit(1);
}

const COLLECTION = "tilstander";

const FIELDS = [
  { field: "ovelse_try_yourself_title", type: "string", meta: { interface: "input" } },
  { field: "ovelse_try_yourself_title_en", type: "string", meta: { interface: "input" } },
  { field: "ovelse_step1_text", type: "text", meta: { interface: "input-multiline" } },
  { field: "ovelse_step1_text_en", type: "text", meta: { interface: "input-multiline" } },
  { field: "ovelse_tips_title", type: "string", meta: { interface: "input" } },
  { field: "ovelse_tips_title_en", type: "string", meta: { interface: "input" } },
  { field: "ovelse_tips_text", type: "text", meta: { interface: "input-multiline" } },
  { field: "ovelse_tips_text_en", type: "text", meta: { interface: "input-multiline" } },
  { field: "ovelse_video_section_title", type: "string", meta: { interface: "input" } },
  { field: "ovelse_video_section_title_en", type: "string", meta: { interface: "input" } },
  { field: "ovelse_video_section_description", type: "text", meta: { interface: "input-multiline" } },
  { field: "ovelse_video_section_description_en", type: "text", meta: { interface: "input-multiline" } },
  { field: "ovelse_videos", type: "json", meta: { interface: "input-code", options: { language: "json" } } },
  { field: "ovelse_steps", type: "json", meta: { interface: "input-code", options: { language: "json" } } },
  { field: "ovelse_gender_instructions", type: "json", meta: { interface: "input-code", options: { language: "json" } } },
  { field: "ovelse_smartphone_apps", type: "json", meta: { interface: "input-code", options: { language: "json" } } },
];

async function createField(def) {
  const res = await fetch(`${DIRECTUS_URL}/fields/${COLLECTION}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      field: def.field,
      type: def.type,
      schema: def.schema || {},
      meta: def.meta || {},
    }),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return text ? JSON.parse(text) : {};
}

async function main() {
  const existingRes = await fetch(`${DIRECTUS_URL}/fields/${COLLECTION}`, {
    headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
  });
  if (!existingRes.ok) {
    console.error("Cannot list fields. Token may need admin permission.", await existingRes.text());
    process.exit(1);
  }
  const existingData = await existingRes.json();
  const existing = new Set((existingData.data || []).map((f) => f.field));

  for (const def of FIELDS) {
    if (existing.has(def.field)) {
      console.log(`Skip (exists): ${def.field}`);
      continue;
    }
    try {
      await createField(def);
      console.log(`Created: ${def.field}`);
    } catch (e) {
      console.error(`Failed ${def.field}:`, e.message);
    }
  }
  console.log("Done.");
}

main();
