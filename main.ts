// ai-excited-01: copy the entry image to the output directory.
// The judge reads exactly the bytes of /output/entry.png, so this
// program does one thing: it copies entry.png there, byte for byte.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(join(here, "entry.png"), dest);
// Verify the copy landed: the judge reads exactly these bytes.
const size = statSync(dest).size;
if (size > 1048576) throw new Error("entry.png is over the 1 MiB cap: " + size);
console.log("wrote " + dest + " (" + size + " bytes)");
