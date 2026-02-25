#!/usr/bin/env node
/**
 * Make øvelse_* fields appear under "Øvelser" in Directus UI by updating sort order.
 * Run after add-directus-ovelse-fields.js.
 * Usage: node scripts/directus-ovelse-fields-show-in-ui.js
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

const COLLECTION = "tilstander";

// New øvelse fields: show right after ovelse_trekkspill (sort 69) so they appear in Øvelser section
const OVELSE_FIELDS_SORT = [
  "ovelse_try_yourself_title",
  "ovelse_try_yourself_title_en",
  "ovelse_step1_text",
  "ovelse_step1_text_en",
  "ovelse_tips_title",
  "ovelse_tips_title_en",
  "ovelse_tips_text",
  "ovelse_tips_text_en",
  "ovelse_video_section_title",
  "ovelse_video_section_title_en",
  "ovelse_video_section_description",
  "ovelse_video_section_description_en",
  "ovelse_videos",
  "ovelse_steps",
  "ovelse_gender_instructions",
  "ovelse_smartphone_apps",
];

async function patchFieldSort(fieldName, sort) {
  const res = await fetch(`${DIRECTUS_URL}/fields/${COLLECTION}/${encodeURIComponent(fieldName)}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ meta: { sort } }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
}

async function main() {
  let sort = 70;
  for (const field of OVELSE_FIELDS_SORT) {
    await patchFieldSort(field, sort++);
    console.log(`Sort ${sort - 1}: ${field}`);
  }
  console.log("Done. Open a tilstand item in Directus and scroll to the Øvelser section to see the new fields.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
