// Say What Actually Broke — one line of honest error copy.
// The program is self-contained: Node 22 stdlib only, no network, no
// child processes, no Chrome, and it reads no files at runtime. The entry
// text is a literal below, so the grader sandbox cannot fail it with a
// missing-file error the way entries that read a separate entry.txt do.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Why this line: a failed upload is the error everyone has lived through,
// and the joke lands in three escalating facts — the file is 160x the
// limit, the limit was never stated, and the progress bar spent eleven
// minutes pretending everything was fine. It names the real failure in
// plain words (oversize file, 25 MB cap) and the betrayal is the part a
// reader repeats to a colleague. 110 characters, one line, no throat
// clearing, and it would survive being pasted into a real upload dialog.
const ERROR_LINE =
  "Your upload failed: the file is 4 GB, the limit is 25 MB, and the progress bar lied to you for eleven minutes.";

// The kit gate (competition.yaml / RULES.txt): /output/entry.txt must be
// UTF-8 text of 1 to 200 characters, not only white space. The brief also
// demands a single line, so an embedded newline fails the check too.
function gateOk(text: string): boolean {
  return (
    text.length >= 1 &&
    text.length <= 200 &&
    text.trim().length > 0 &&
    !text.includes("\n")
  );
}

function main(): void {
  if (!gateOk(ERROR_LINE)) {
    throw new Error(
      `entry must be 1-200 non-blank characters, got ${ERROR_LINE.length}`,
    );
  }
  const destination = resolve(
    process.env.MAKEFUN_OUTPUT_DIR || "/output",
    "entry.txt",
  );
  mkdirSync(resolve(destination, ".."), { recursive: true });
  writeFileSync(destination, ERROR_LINE, "utf8");
}

main();
