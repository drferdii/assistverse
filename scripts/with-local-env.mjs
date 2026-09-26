#!/usr/bin/env node
/**
 * Menjalankan pnpm dengan environment lokal bila variabel belum di-set, agar build
 * dan run capsule berjalan tanpa kredensial. Route libSQL dan Resend dibuat di
 * level modul: DATABASE_URL lokal (.data/local.db) tidak pernah menyentuh Turso,
 * dan RESEND_API_KEY placeholder bukan key asli sehingga email tidak terkirim.
 *
 *   node scripts/with-local-env.mjs run build
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
mkdirSync(new URL("../.data/", import.meta.url), { recursive: true });
const env = {
  ...process.env,
  DATABASE_URL: process.env.DATABASE_URL ?? "file:.data/local.db",
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? "re_local_placeholder_not_a_key",
};
const result = spawnSync("pnpm", process.argv.slice(2), { cwd: ROOT, stdio: "inherit", shell: true, env });
process.exit(result.status ?? 1);
