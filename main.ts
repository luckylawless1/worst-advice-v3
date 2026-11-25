// Worst AI Advice v3: one line of the worst possible advice an AI could
// give — confident, tidy, concrete, and disastrous to follow.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ADVICE =
  "To remember your passwords, tattoo them on your arm \u2014 your skin is the only cloud that never gets hacked.";

// The competition gate: entry.txt must be UTF-8, one line, 1-140 chars,
// not only whitespace. Refuse to write anything that fails it.
if (ADVICE.length < 1 || ADVICE.length > 140) {
  throw new Error(`advice must be 1-140 chars, got ${ADVICE.length}`);
}
if (ADVICE.trim().length === 0 || ADVICE.includes("\n")) {
  throw new Error("advice must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ADVICE + "\n", "utf8");
// Read the file back and verify byte-for-byte what the grader will see.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== ADVICE + "\n") {
  throw new Error("entry.txt read-back mismatch");
}
console.log(`advice is ${ADVICE.length} chars, gate OK`);
console.log(`wrote ${ADVICE.length} chars to ${join(outDir, "entry.txt")}`);
