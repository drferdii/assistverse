#!/usr/bin/env node
/**
 * Wrapper pnpm capsule-local: kontrak lifecycle memakai argv `node` murni agar
 * portabel lintas platform — spawn langsung "pnpm" gagal di Windows (ENOENT,
 * karena pnpm adalah .cmd). Shell resolve melakukannya dengan benar.
 *
 *   node scripts/pnpm.mjs install
 *   node scripts/pnpm.mjs run build
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const result = spawnSync("pnpm", process.argv.slice(2), {
  cwd: ROOT,
  stdio: "inherit",
  shell: true,
});
process.exit(result.status ?? 1);
