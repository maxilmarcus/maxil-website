import { useEffect, useMemo, useRef, useState } from "react";
import { addCsv, aiExport, bulkFix, downloadZip, editCell, inspectBackup, normalizeName, openBackup, REQUIRED } from "../workbench/backup";
import "../workbench/workbench.css";

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob), link = document.createElement("a");
  link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
const today = () => new Date().toISOString().slice(0, 10);

export default function BackupWorkbench() {
  const [backup, setBackup] = useState(null), [busy, setBusy] = useState(false), [error, setError] = useState("");
  const [selected, setSelected] = useState(""), [page, setPage] = useState(0), [dirty, setDirty] = useState(false);
  const [mapFrom, setMapFrom] = useState(""), [mapTo, setMapTo] = useState("");
  const [focusRequest, setFocusRequest] = useState(null);
  const input = useRef(null), addInput = useRef(null), summary = useRef(null);
  const report = useMemo(() => backup ? inspectBackup(backup) : null, [backup]);
  const problems = report?.issues.filter(issue => issue.severity === "error") || [];
  const warnings = report?.issues.filter(issue => issue.severity === "warning") || [];
  const file = backup?.files[selected];
  const pageRows = file?.rows.slice(1 + page * 20, 1 + (page + 1) * 20) || [];
  const pageCount = Math.max(1, Math.ceil(((file?.rows.length || 1) - 1) / 20));
  useEffect(() => {
    if (!focusRequest) return;
    if (focusRequest.summary) summary.current?.focus();
    else (document.getElementById(`wb-${focusRequest.row}-${focusRequest.field}`)
      || document.getElementById("wb-table"))?.focus();
  }, [focusRequest]);

  async function load(file, append = false) {
    if (!file || busy) return;
    if (!append && dirty && !window.confirm("Replace the current edits? Download them first if you want to keep them.")) return;
    setBusy(true); setError("");
    try {
      if (append && !file.name.toLowerCase().endsWith(".csv")) throw new Error("Add one CSV file, or clear the workbench to open another ZIP.");
      const opened = await openBackup(file, append);
      const next = append ? addCsv(backup, opened) : opened;
      setBackup(next); setSelected(Object.keys(next.files).find(name => name in REQUIRED)); setPage(0); setDirty(append);
      setFocusRequest({ summary: true });
    } catch (failure) { setError(failure.message || "Could not open this backup. Try exporting a fresh ZIP from SwoLifts."); }
    finally { setBusy(false); if (input.current) input.current.value = ""; if (addInput.current) addInput.current.value = ""; }
  }

  async function choose() {
    if (typeof window.showOpenFilePicker === "function") {
      try {
        const [handle] = await window.showOpenFilePicker({ startIn: "downloads", multiple: false,
          types: [{ description: "SwoLifts backup", accept: { "application/zip": [".zip"], "text/csv": [".csv"] } }] });
        await load(await handle.getFile()); return;
      } catch (failure) { if (failure.name === "AbortError") return; }
    }
    input.current?.click();
  }

  async function example() {
    setBusy(true); setError("");
    try {
      if (dirty && !window.confirm("Replace your current edits with the example?")) return;
      // This fetch reads a public bundled example. User-provided file contents are never sent.
      const response = await fetch("/assets/swolifts-import-export/swolifts-example-import-template.zip");
      if (!response.ok) throw new Error("Could not load the example. Open your own file instead.");
      const opened = await openBackup(new File([await response.blob()], "example.zip"));
      setBackup(opened); setSelected(Object.keys(opened.files).find(name => name in REQUIRED)); setPage(0); setDirty(false);
      setFocusRequest({ summary: true });
    } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }

  function change(next) { setBackup(next); setDirty(true); setError(""); }
  async function download() {
    setBusy(true); setError("");
    try { saveBlob(await downloadZip(backup), `SwoLifts-corrected-${today()}.zip`); setDirty(false); }
    catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }
  function jump(issue) {
    setSelected(issue.file); setPage(Math.max(0, Math.floor((issue.row - 2) / 20)));
    setFocusRequest({ ...issue });
  }

  return <section className="workbench" id="workbench" aria-labelledby="workbench-title" aria-busy={busy}
    onDragOver={event => event.preventDefault()}
    onDrop={event => { event.preventDefault(); if (event.dataTransfer.files.length !== 1) setError("Open one ZIP or CSV at a time. Use Add CSV to combine files."); else load(event.dataTransfer.files[0]); }}>
    <div className="wb-intro">
      <span className="guide-kicker">Your files, on your computer</span>
      <h2 id="workbench-title">Check. Fix. Take it back to the gym.</h2>
      <p>Open a SwoLifts ZIP or CSV, check its contents and download your changes. Your file stays in this browser. There is no upload or account.</p>
      <div className="wb-actions">
        <button className="wb-primary" onClick={choose} disabled={busy}>Open my SwoLifts file</button>
        <button onClick={example} disabled={busy}>Try an example</button>
        <span>or drop a ZIP or CSV here</span>
      </div>
      <input ref={input} disabled={busy} type="file" accept=".zip,.csv,application/zip,text/csv" aria-label="Open a SwoLifts ZIP or CSV" className="wb-file-input" onChange={event => load(event.target.files?.[0])} />
      <p className="wb-small">ZIP limit: 32 MiB, expanding to at most 64 MiB. Edits stay in memory and disappear when you close or reload this page. Keep your original backup.</p>
      <noscript><p>The workbench needs JavaScript. The ZIP templates and manual instructions below work without it.</p></noscript>
    </div>
    {error && <p role="alert" className="wb-error">{error}</p>}
    {busy && <p role="status">Working on your file…</p>}
    {backup && <>
      <div ref={summary} tabIndex={-1} className="wb-summary" aria-live="polite">
        <h3>{backup.filename}</h3>
        <p>{report.rowCounts["exercise_sets.csv"] || 0} sets · {report.rowCounts["workout_sessions.csv"] || 0} workouts · {problems.length} problems · {warnings.length + backup.warnings.length} warnings</p>
        <p className="wb-small">These are file checks. The app still checks its existing data, duplicate identities and merge history before importing.</p>
      </div>
      {(report.issues.length > 0 || backup.warnings.length > 0) && <details className="wb-issues" open>
        <summary>Review problems and warnings</summary>
        <ul>{backup.warnings.map((warning, index) => <li key={`zip-${index}`}>{warning}</li>)}
          {report.issues.slice(0, 50).map((issue, index) => <li key={index}>
            <button className="wb-issue-link" onClick={() => jump(issue)}>{issue.file} row {issue.row}</button>: {issue.message}
            {issue.severity === "warning" && <span> (warning)</span>}
          </li>)}
        </ul>
        {report.issues.length > 50 && <p>{report.issues.length - 50} more findings. Bulk fixes can resolve repeated issues.</p>}
      </details>}
      <div className="wb-actions">
        <label>CSV file <select aria-label="CSV file" value={selected} onChange={event => { setSelected(event.target.value); setPage(0); }}>
          {Object.keys(backup.files).filter(name => name in REQUIRED).map(name => <option key={name}>{name}</option>)}
        </select></label>
        <button onClick={() => addInput.current?.click()} disabled={busy}>Add CSV</button>
        <input ref={addInput} disabled={busy} className="wb-file-input" type="file" accept=".csv,text/csv" aria-label="Add a CSV file" onChange={event => load(event.target.files?.[0], true)} />
        <button onClick={() => { if (!dirty || window.confirm("Clear these edits? Your original file is unchanged.")) { setBackup(null); setDirty(false); setError(""); } }} disabled={busy}>Clear workbench</button>
      </div>
      {file?.rows.length > 0 && <div id="wb-table" className="wb-table-wrap" role="region" aria-label="Editable CSV table" tabIndex={0}>
        <table className="wb-table">
          <caption>{selected}: showing {pageRows.length} rows. Scroll sideways for all columns. Kilogram edits update their pounds pair; pounds edits clear stale exact kilograms.</caption>
          <thead><tr><th scope="col">Row</th>{file.rows[0].map((header, index) => <th scope="col" key={index}>
            <input aria-label={`Column ${index + 1} name`} value={header} maxLength={128} disabled={busy}
              onChange={event => change(editCell(backup, selected, 0, index, event.target.value))} />
          </th>)}</tr></thead>
          <tbody>{pageRows.map((row, rowIndex) => {
            const sourceRow = page * 20 + rowIndex + 1;
            return <tr key={sourceRow}><th scope="row">{sourceRow + 1}</th>{file.rows[0].map((header, column) => <td key={column}>
              <textarea rows={1} id={`wb-${sourceRow + 1}-${header.replace(/^\uFEFF/, "").trim()}`} aria-label={`${header.replace(/^\uFEFF/, "").trim()}, row ${sourceRow + 1}`}
                value={row[column] || ""} maxLength={65536} disabled={busy}
                onChange={event => change(editCell(backup, selected, sourceRow, column, event.target.value))} />
            </td>)}</tr>;
          })}</tbody>
        </table>
      </div>}
      <div className="wb-actions"><button disabled={page === 0 || busy} onClick={() => setPage(page - 1)}>Previous rows</button>
        <span>Page {page + 1} of {pageCount}</span><button disabled={page + 1 >= pageCount || busy} onClick={() => setPage(page + 1)}>Next rows</button></div>
      <details className="wb-fixes"><summary>Fix several rows at once</summary>
        <p>Review changes before downloading. Notes and descriptions keep their whitespace. Dates without a time become midnight UTC; ambiguous dates stay unchanged.</p>
        <div className="wb-actions">
          <button onClick={() => change(bulkFix(backup, "trim"))} disabled={busy}>Trim fields</button>
          <button onClick={() => change(bulkFix(backup, "dates"))} disabled={busy}>Normalize ISO dates to UTC</button>
        </div>
        <div className="wb-map">
          <label>Exercise name to replace<input value={mapFrom} maxLength={256} onChange={event => setMapFrom(event.target.value)} /></label>
          <label>Use this known exercise<input value={mapTo} maxLength={256} list="wb-exercises" onChange={event => setMapTo(event.target.value)} /></label>
          <datalist id="wb-exercises">{report.exercises.slice(0, 1000).map((exercise, index) => <option key={index} value={exercise.name} />)}</datalist>
          <button disabled={busy || !mapFrom || !mapTo} onClick={() => {
            const choices = report.exercises.filter(exercise => normalizeName(exercise.name || "") === normalizeName(mapTo));
            if (choices.length !== 1) setError("Choose a unique exercise from the included custom/reference CSV. Add its CSV if it is missing.");
            else change(bulkFix(backup, "map", mapFrom, choices[0]));
          }}>Map matching rows</button>
        </div>
      </details>
      <div className="wb-actions wb-downloads">
        <button className="wb-primary" disabled={busy || problems.length > 0} onClick={download}>Download corrected ZIP</button>
        <button disabled={busy} onClick={() => saveBlob(new Blob([aiExport(backup)], { type: "application/json" }), `SwoLifts-for-AI-${today()}.json`)}>Download for AI</button>
      </div>
      <p className="wb-small">The AI download contains your workout dates, weights and notes, with units and file-check results. Nothing is sent to an AI automatically. Share it only with a service whose privacy settings you accept.</p>
    </>}
  </section>;
}
