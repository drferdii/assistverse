#!/usr/bin/env node
/**
 * Deploy dry-run capsule-local, tanpa efek samping: tidak menyentuh jaringan dan
 * tidak membaca kredensial. Memastikan artefak build Next.js produksi ada, lalu
 * memastikan nama variabel server tidak bocor ke bundel klien.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const BUILD = join(ROOT, ".next");
// BETTER_AUTH_SECRET tidak diperiksa: helper env better-auth di bundel klien memuat
// NAMA itu sebagai getter (nilainya undefined di browser), bukan nilainya.
const SERVER_ONLY = ["DATABASE_AUTH_TOKEN", "RESEND_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"];

if (!existsSync(join(BUILD, "BUILD_ID"))) {
  console.error("FAIL .next/BUILD_ID tidak ada; jalankan build dulu.");
  process.exit(1);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (full.endsWith(".js")) out.push(full);
  }
  return out;
}

const leaks = walk(join(BUILD, "static")).flatMap((file) => {
  const text = readFileSync(file, "utf8");
  return SERVER_ONLY.filter((name) => text.includes(name)).map((name) => `${name} in ${file}`);
});
if (leaks.length > 0) {
  for (const leak of leaks) console.error(`FAIL ${leak}`);
  process.exit(1);
}
console.log("Deploy dry-run passed: production artifact present, no server-only names in client bundle.");
