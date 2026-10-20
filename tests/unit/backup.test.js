import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { BlobReader, BlobWriter, ZipWriter } from "@zip.js/zip.js/index-native.js";
import { LIMITS, openBackup, parseCsv, writeCsv, inspectBackup, editCell, bulkFix, downloadZip, aiExport, addCsv, validDate, roundedPounds } from "../../src/workbench/backup.js";

const root = new URL("../fixtures/transfer-v1/", import.meta.url);
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const manifestBytes = await readFile(new URL("manifest.json", root));
const manifest = JSON.parse(manifestBytes);
const source = JSON.parse(await readFile(new URL("source.json", root)));
const fixture = async name => new File([await readFile(new URL(name, root))], name);
async function zip(entries, options = {}) {
  const writer = new ZipWriter(new BlobWriter(), { useWebWorkers: false });
  for (const [name, text] of entries) await writer.add(name, new BlobReader(new Blob([text])), options);
  return new File([await writer.close()], "synthetic.zip");
}
const csv = (name, text) => openBackup(new File([text], name));
const errors = backup => inspectBackup(backup).issues.filter(issue => issue.severity === "error");

test("shared Android manifest and limits stay pinned", () => {
  assert.equal(sha(manifestBytes), source.manifestSha256);
  assert.deepEqual(LIMITS, manifest.limits);
});
test("reference catalog source matches its canonical LF pin", async () => {
  assert.equal(sha(await readFile(new URL(source.catalog.localFile, root))), source.catalog.sha256);
  assert.equal(sha(await readFile(new URL("../../assets/swolifts-import-export/catalog/exercises.csv", import.meta.url))), source.catalog.sha256);
  assert.equal(sha(await readFile(new URL("../../assets/swolifts-import-export/catalog/NOTICE.txt", import.meta.url))), source.catalog.noticeSha256);
});
for (const item of manifest.fixtures) test(`Android acceptance: ${item.file}`, async () => {
  const file = await fixture(item.file);
  assert.equal(sha(new Uint8Array(await file.arrayBuffer())), item.sha256);
  if (item.previewAccepted) await openBackup(file);
  else await assert.rejects(openBackup(file));
});

test("BOM, wrapper folders, ignored examples, multiline notes and exact kilograms round trip", async () => {
  const backup = await openBackup(await fixture("valid-wrapped-bom-exact-kg.zip"));
  assert.deepEqual(inspectBackup(backup).rowCounts, { "custom_exercises.csv": 1, "workout_sessions.csv": 1, "exercise_sets.csv": 1 });
  assert.deepEqual(errors(backup), []);
  const result = await openBackup(new File([await downloadZip(backup)], "corrected.zip"));
  assert.equal(result.files["exercise_sets.csv"].rows[1][5], "61.25");
  assert.equal(result.files["exercise_sets.csv"].rows[1][6], "First line\nSecond line");
  assert.deepEqual(result.files, backup.files);
  assert.equal(result.entries.some(entry => entry.name.includes("examples/")), true);
});

test("first duplicate wins and corrected archive contains only that data file", async () => {
  const backup = await openBackup(await fixture("valid-first-duplicate.zip"));
  assert.equal(backup.warnings.length, 1);
  const result = await openBackup(new File([await downloadZip(backup)], "out.zip"));
  assert.equal(result.entries.length, 1);
  assert.equal(result.files["custom_exercises.csv"].rows[1][0], "First Lift");
});

test("CSV quoting, whitespace, and unknown columns survive safe bulk edits", async () => {
  const rows = [["name", "notes", "futureField"], ["  My lift  ", '  first\n"quoted",last  ', "  untouched  "]];
  assert.deepEqual(parseCsv(writeCsv(rows)), rows);
  const backup = await csv("custom_exercises.csv", writeCsv(rows));
  const trimmed = bulkFix(backup, "trim");
  assert.deepEqual(trimmed.files["custom_exercises.csv"].rows[1], rows[1]);
  const output = await openBackup(new File([await downloadZip(trimmed)], "out.zip"));
  assert.deepEqual(output.files, trimmed.files);
});

test("non-UTF-8 text has a practical Excel correction message", async () => {
  await assert.rejects(openBackup(new File([new Uint8Array([110,97,109,101,10,233,10])], "custom_exercises.csv")), /save it as CSV UTF-8/);
});

test("rounding matches the shared Java Formatter cases including decimal ties", async () => {
  const bytes = await readFile(new URL(manifest.rounding.file, root));
  assert.equal(sha(bytes), manifest.rounding.sha256);
  const cases = JSON.parse(bytes);
  for (const item of cases) {
    assert.equal(roundedPounds(item.value), item.rounded);
    assert.equal(roundedPounds(item.kg * 2.20462), item.roundedLbs);
  }
});

test("weight edits keep exact-kg/pounds precedence coherent without changing other cells", async () => {
  const backup = await openBackup(await fixture("valid-wrapped-bom-exact-kg.zip"));
  const kg = editCell(backup, "exercise_sets.csv", 1, 5, "100");
  assert.deepEqual(kg.files["exercise_sets.csv"].rows[1].slice(4, 6), ["220.5", "100"]);
  const lbs = editCell(kg, "exercise_sets.csv", 1, 4, "200");
  assert.deepEqual(lbs.files["exercise_sets.csv"].rows[1].slice(4, 6), ["200", ""]);
  assert.deepEqual(editCell(kg, "exercise_sets.csv", 1, 5, "").files["exercise_sets.csv"].rows[1].slice(4, 6), ["", ""]);
  assert.equal(backup.files["exercise_sets.csv"].rows[1][5], "61.25");
});

test("invalid values get row-level findings and block corrected download", async () => {
  const backup = await csv("exercise_sets.csv", "sessionId,exerciseName,setNumber,reps,weightLbs,completedAt\nmissing,Unknown,0,10000,NaN,2026-02-30T10:00:00Z\n");
  const fields = errors(backup).map(issue => issue.field);
  for (const field of ["sessionId", "setNumber", "reps", "weightLbs", "completedAt"]) assert.ok(fields.includes(field), field);
  assert.ok(inspectBackup(backup).issues.some(issue => issue.severity === "warning" && issue.field === "exerciseName"));
  await assert.rejects(downloadZip(backup), /Fix the problems/);
  const badHeader = await csv("custom_exercises.csv", "wrong\nLift\n");
  assert.ok(errors(badHeader).some(issue => issue.row === 1 && issue.field === "name"));
});

test("date fix only normalizes real unambiguous ISO dates", async () => {
  const backup = await csv("workout_sessions.csv", "id,name,startTime\n1,Day,2026-01-02\n2,Offset,2026-01-02T10:00:00-05:00\n3,Invalid,2026-02-30T10:00:00Z\n4,Ambiguous,01/02/2026\n");
  assert.deepEqual(bulkFix(backup, "dates").files["workout_sessions.csv"].rows.slice(1).map(row => row[2]),
    ["2026-01-02T00:00:00Z", "2026-01-02T15:00:00Z", "2026-02-30T10:00:00Z", "01/02/2026"]);
  assert.equal(validDate("2026-02-30T10:00:00Z"), false);
  assert.equal(validDate("2024-02-29T10:00:00Z"), true);
});

test("name mapping writes matching UUID; reference CSV can be added without duplicating a file", async () => {
  const backup = await openBackup(await fixture("valid-wrapped-bom-exact-kg.zip"));
  const reference = await openBackup(new File(["name,exerciseUuid\nNew lift,00000000-0000-0000-0000-000000000001\n"], "built_in_exercises.csv"), true);
  const combined = addCsv(backup, reference);
  assert.throws(() => addCsv(combined, reference), /already open/);
  const mapped = bulkFix(combined, "map", "Contract Lift", { name: "New lift" });
  assert.equal(mapped.files["exercise_sets.csv"].rows[1][1], "New lift");
  assert.deepEqual(errors(mapped), []);
  const withUuid = await csv("exercise_sets.csv", "sessionId,exerciseName,setNumber,exerciseUuid\ns,Old lift,1,00000000-0000-0000-0000-000000000001\n");
  assert.equal(bulkFix(withUuid, "map", "Old lift", { name: "New", exerciseUuid: "00000000-0000-0000-0000-000000000002" }).files["exercise_sets.csv"].rows[1][3], "00000000-0000-0000-0000-000000000002");
});

test("deleted identities are retained, duplicate templates and active merge cycles are flagged", async () => {
  const backup = await csv("custom_exercises.csv", "name,isDeleted\nOld lift,true\n");
  assert.equal(inspectBackup(backup).issues[0].severity, "warning");
  assert.equal((await openBackup(new File([await downloadZip(backup)], "out.zip"))).files["custom_exercises.csv"].rows[1][1], "true");
  const templates = await csv("workout_templates.csv", "id,name\n1,Same\n2,Same\n");
  assert.ok(errors(templates).some(issue => issue.message.includes("memberships")));
  const a = "00000000-0000-0000-0000-000000000001", b = "00000000-0000-0000-0000-000000000002";
  const merges = await csv("exercise_merge_mappings.csv", `id,fromExerciseUuid,toExerciseUuid,reason\n${a},${a},${b},duplicate_cleanup\n${b},${b},${a},duplicate_cleanup\n`);
  assert.ok(errors(merges).some(issue => issue.message.includes("chain")));
});

test("AI export includes units and all data, not executable markup", async () => {
  const backup = await openBackup(await fixture("valid-wrapped-bom-exact-kg.zip"));
  const ai = JSON.parse(aiExport(backup));
  assert.equal(ai.tables["exercise_sets.csv"][0].weightKg, "61.25");
  assert.equal(ai.units.durationSeconds, "seconds");
  assert.equal(ai.tables["exercise_sets.csv"][0].notes, "First line\nSecond line");
});

test("weight precedence and duplicate parent IDs are visible before import", async () => {
  const backup = await csv("workout_sessions.csv", "id,name,startTime,bodyweightLbs,bodyweightKg\ns,One,2026-01-01T00:00:00Z,,80\ns,Two,2026-01-02T00:00:00Z,150,80\n");
  const report = inspectBackup(backup);
  assert.equal(report.issues.filter(issue => issue.field === "bodyweightKg").length, 2);
  assert.ok(errors(backup).some(issue => issue.field === "id"));
});

test("a custom exercise cannot reuse an included built-in UUID", async () => {
  const id = "00000000-0000-0000-0000-000000000001";
  const backup = await csv("custom_exercises.csv", `name,exerciseUuid\nCustom,${id}\n`);
  const reference = await openBackup(new File([`name,exerciseUuid\nBuilt-in,${id}\n`], "built_in_exercises.csv"), true);
  assert.ok(errors(addCsv(backup, reference)).some(issue => issue.message.includes("built-in UUID")));
});

test("ZIP protection rejects unsafe paths, encryption, too many entries, and corrupted CRC", async () => {
  await assert.rejects(openBackup(await zip([["../custom_exercises.csv", "name\nX\n"]])), /unsafe/i);
  await assert.rejects(openBackup(await zip([["custom_exercises.csv", "name\nX\n"]], { password: "test-only" })), /Password/);
  await assert.rejects(openBackup(await zip(Array.from({ length: 129 }, (_, i) => [`${i}.txt`, ""]))), /too many/);
  const stored = await zip([["custom_exercises.csv", "name\nUNIQUE_MARKER\n"]], { level: 0 });
  const bytes = Buffer.from(await stored.arrayBuffer());
  bytes[bytes.indexOf("UNIQUE_MARKER")] ^= 1;
  await assert.rejects(openBackup(new File([bytes], "corrupt.zip")), /CRC32/i);
});

test("actual expanded-byte cap includes ignored files", async () => {
  const file = await zip([["ignored.txt", new Uint8Array(LIMITS.expandedBytes + 1)], ["custom_exercises.csv", "name\nX\n"]]);
  assert.ok(file.size < LIMITS.compressedBytes);
  await assert.rejects(openBackup(file), /64 MiB/);
});

test("CSV dimensions and compressed-size caps fail before editing", async () => {
  assert.throws(() => parseCsv(Array(65).fill("x").join(",")), /column/);
  assert.throws(() => parseCsv("x".repeat(65537)), /too large/);
  assert.throws(() => parseCsv("x\n", { rows: 100000, cells: 0 }), /100,000/);
  assert.throws(() => parseCsv("x", { rows: 0, cells: 1000000 }), /total-cell/);
  await assert.rejects(openBackup(new File([new Uint8Array(LIMITS.compressedBytes + 1)], "large.zip")), /32 MiB/);
});

for (const type of ["blank", "example"]) test(`published ${type} template opens and passes file checks`, async () => {
  const bytes = await readFile(new URL(`../../assets/swolifts-import-export/swolifts-${type}-import-template.zip`, import.meta.url));
  const backup = await openBackup(new File([bytes], `${type}.zip`));
  assert.deepEqual(errors(backup), []);
  assert.equal(backup.files["built_in_exercises.csv"].rows.length - 1, source.catalog.count);
  const canonical = parseCsv((await readFile(new URL(source.catalog.localFile, root))).toString());
  const fields = ["name", "primary_muscle_group", "category", "equipment", "logging_type", "load_type", "exercise_uuid", "canonical_key"];
  assert.deepEqual(backup.files["built_in_exercises.csv"].rows.slice(1),
    canonical.slice(1).map(row => fields.map(field => row[canonical[0].indexOf(field)])));
  // A corrected download must preserve attribution and the complete catalog,
  // including source metadata omitted from the import reference columns.
  const corrected = await openBackup(new File([await downloadZip(backup)], "corrected.zip"));
  for (const archive of [backup, corrected]) {
    assert.equal(sha(archive.entries.find(entry => entry.name === "NOTICE.txt").bytes), source.catalog.noticeSha256);
    assert.equal(sha(archive.entries.find(entry => entry.name === "catalog/exercises.csv").bytes), source.catalog.sha256);
  }
});
