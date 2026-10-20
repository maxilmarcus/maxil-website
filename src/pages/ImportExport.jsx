import { useEffect, useState } from "react";

// Keep ZIP parsing and editor code out of the other seven pages. The initial
// markup is identical for prerender and hydration; load only on this route.
function WorkbenchLoader() {
  const [Workbench, setWorkbench] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    import("../components/BackupWorkbench").then(module => {
      if (active) setWorkbench(() => module.default);
    }).catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, []);
  return Workbench ? <Workbench /> : <section id="workbench" className="guide-section">
    <h2>Backup workbench</h2>
    <p role="status">{failed ? "The workbench could not load. Reload this page to retry, or use the templates below." : "The workbench uses JavaScript to check and edit your file locally. The templates and manual guide below also work without JavaScript."}</p>
  </section>;
}

export default function ImportExport() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>{"SwoLifts Backup Workbench"}</h1>
          <p>
            {
              "Open a backup, check and edit it privately in your browser, then bring it back to SwoLifts."
            }
          </p>
        </div>
      </section>
      <section className="content-page">
        <div className="container guide-content">
          <WorkbenchLoader />
          <div className="guide-intro">
            <p>
              {
                "SwoLifts exports your data as a ZIP of CSV files. You can import the same format back into the app, or use the templates below to bulk migrate workouts, custom exercises, and workout templates from another tool."
              }
            </p>
          </div>
          <section className="guide-section" id="quick-share">
            <h2>Phone to computer, and back</h2>
            <p>These phone actions use SwoLifts 1.2.0. Quick Share is provided by Android and Windows; SwoLifts itself does not connect to your computer.</p>
            <ol>
              <li><strong>Set up your PC.</strong> <a href="https://www.android.com/quick-share/with-windows-pc/" target="_blank" rel="noopener noreferrer">Get Quick Share for Windows from Google</a>. Follow its setup and visibility instructions, and keep the phone and PC nearby with Bluetooth and Wi-Fi enabled. <a href="https://support.google.com/android/answer/13801258?hl=en" target="_blank" rel="noopener noreferrer">Google's setup and troubleshooting guide</a> covers device compatibility.</li>
              <li><strong>Send your backup.</strong> In SwoLifts, open Settings, then Send to computer, choose Quick Share, then choose your PC. Open the received ZIP in the workbench above.</li>
              <li><strong>Bring your changes back.</strong> Download the corrected ZIP. In Windows, right-click it and choose Send with Quick Share (or drag it into Quick Share), then choose your phone. Open the received ZIP with SwoLifts, review the preview and confirm Import backup.</li>
            </ol>
            <div className="template-download-grid">
              <figure><img src="/assets/transfer/send-to-computer.png" alt="SwoLifts Settings with Send to computer and Export to file" loading="lazy" style={{maxWidth: "240px", width: "100%"}} /><figcaption>Choose Send to computer in Settings.</figcaption></figure>
              <figure><img src="/assets/transfer/import-preview.png" alt="SwoLifts previews workouts and sets before the Import backup confirmation" loading="lazy" style={{maxWidth: "240px", width: "100%"}} /><figcaption>Review the file before importing it.</figcaption></figure>
            </div>
            <p><strong>USB fallback:</strong> use Export to file, connect the phone with a USB cable and select File transfer on the phone. Copy the ZIP between Downloads folders using Windows File Explorer. Open the returned ZIP with SwoLifts, or select it through Settings, then Import Workout Data.</p>
          </section>
          <div className="template-download-grid">
            <article className="template-download-card">
              <span className="guide-kicker">{"Empty starter"}</span>
              <h2>{"Blank CSV Template"}</h2>
              <p>
                {
                  "Header-only CSV files at the ZIP root. Use this when you want to start clean and fill in your own data."
                }
              </p>
              <a
                className="btn btn-primary"
                href="assets/swolifts-import-export/swolifts-blank-import-template.zip"
                download
              >
                {"Download Blank ZIP"}
              </a>
            </article>
            <article className="template-download-card">
              <span className="guide-kicker">{"Worked example"}</span>
              <h2>{"Example CSV Template"}</h2>
              <p>
                {
                  "Sample workouts, templates, and sets that match built-in SwoLifts exercises. Use it as a reference while editing."
                }
              </p>
              <a
                className="btn btn-outline"
                href="assets/swolifts-import-export/swolifts-example-import-template.zip"
                download
              >
                {"Download Example ZIP"}
              </a>
            </article>
          </div>
          <p>
            The templates include the 453-exercise built-in catalog under{" "}
            <a href="https://opendatacommons.org/licenses/odbl/1-0/">ODbL-1.0</a>.
            {" "}<a href="/assets/swolifts-import-export/catalog/NOTICE.txt">Attribution and license notice</a>
            {" · "}<a href="/assets/swolifts-import-export/catalog/exercises.csv" download>Download the full exercise catalog</a>.
            {" "}This license applies to the catalog, not your personal workout data.
            {" "}Use SwoLifts 1.2.0 or newer for the newly added exercises; older versions may skip their sets when importing.
          </p>
          <nav className="guide-tab-links" aria-label="Import guide sections">
            <a href="#workflow">{"Workflow"}</a>
            <a href="#rules">{"Rules"}</a>
            <a href="#files">{"Files"}</a>
            <a href="#dedupe">{"Dedupe"}</a>
          </nav>
          <section className="guide-section" id="workflow">
            <div className="guide-section-header">
              <div>
                <span className="guide-kicker">{"Migration workflow"}</span>
                <h2>{"Edit on Desktop, Import on Android"}</h2>
              </div>
              <p>
                {
                  "The CSV files may be at the ZIP root or inside a wrapping folder. Files in examples/ are reference examples and are not imported."
                }
              </p>
            </div>
            <ol>
              <li>{"Download the blank or example ZIP above."}</li>
              <li>
                {
                  "Extract it on your computer and edit the CSV files in Excel, Google Sheets, Numbers, or a text editor."
                }
              </li>
              <li>
                {
                  "Keep the header row exactly as provided. Remove CSV files you do not need to import."
                }
              </li>
              <li>
                {"Zip the edited CSV files again so files such as "}
                <strong>{"workout_sessions.csv"}</strong>
                {" and "}
                <strong>{"exercise_sets.csv"}</strong>
                {" are at the ZIP root."}
              </li>
              <li>{"Move the ZIP to your Android device."}</li>
              <li>
                {"Open SwoLifts and go to "}
                <strong>{"Settings"}</strong>
                {", then choose "}
                <strong>{"Import Workout Data"}</strong>
                {"."}
              </li>
            </ol>
            <div className="guide-callout">
              <h3>{"Exporting existing data"}</h3>
              <p>
                {
                  "Every export contains valid CSV files with headers, plus sample files under an "
                }
                <strong>{"examples/"}</strong>
                {" folder. SwoLifts ignores files under "}
                <strong>{"examples/"}</strong>
                {" during import, so they are safe to keep, edit, or delete."}
              </p>
            </div>
          </section>
          <section className="guide-section" id="exact-values">
            <h2>Keep exact values and identities</h2>
            <p>Set files can include weightKg and assistanceWeightKg; template exercises use targetWeightKg and targetAssistanceWeightKg; workouts use bodyweightKg. The workbench keeps these columns and updates the paired value when you edit a weight. Older files without kilogram columns still work.</p>
            <p>Keep exerciseUuid, merge/deletion records and other unedited columns from your export. UUID matching takes priority over exercise names. Deleted exercise rows can still be needed by historical workouts. Duplicate data filenames use the first copy; duplicate existing workouts/templates may be skipped by the app. The browser cannot inspect what is already on your phone.</p>
          </section>
          <section className="guide-section" id="rules">
            <div className="guide-section-header">
              <div>
                <span className="guide-kicker">{"CSV rules"}</span>
                <h2>{"Format Requirements"}</h2>
              </div>
              <p>{"These rules match the SwoLifts importer."}</p>
            </div>
            <ul>
              <li>
                {
                  "Files are UTF-8 CSV, with or without an Excel byte-order mark (BOM). Values containing commas, quotes, or line breaks must be quoted, and quotes inside values must be doubled."
                }
              </li>
              <li>
                {
                  "The first row is the header. Do not remove or rename columns."
                }
              </li>
              <li>
                {
                  "Blank cells mean no value. Leave optional fields blank when unused."
                }
              </li>
              <li>
                {
                  "Exports include pounds and exact kilogram columns. Unchanged rounded pounds preserve exact kilograms; edited pounds take precedence. Clearing pounds clears the value. For kg-only imports, omit the paired pounds column."
                }
              </li>
              <li>
                {"Dates and times use ISO 8601 UTC, for example "}
                <strong>{"2026-04-17T14:30:00Z"}</strong>
                {"."}
              </li>
              <li>
                {"Exercise names must match a built-in exercise or a row in "}
                <strong>{"custom_exercises.csv"}</strong>
                {
                  ". Import matching tolerates common casing, punctuation, and spacing variants; abbreviations do not prove identity."
                }
              </li>
              <li>
                <strong>{"bodyweight.csv"}</strong>
                {
                  " is exported for external tools only. To import bodyweight, use "
                }
                <strong>{"bodyweightLbs"}</strong>
                {" in "}
                <strong>{"workout_sessions.csv"}</strong>
                {"."}
              </li>
            </ul>
          </section>
          <section className="guide-section" id="files">
            <div className="guide-section-header">
              <div>
                <span className="guide-kicker">{"Supported files"}</span>
                <h2>{"CSV Reference"}</h2>
              </div>
              <p>
                {
                  "Only include the CSVs you need. Required fields are required only when that file is present."
                }
              </p>
            </div>
            <div className="schema-block">
              <h3>{"custom_exercises.csv"}</h3>
              <p>
                {
                  "Add user-created exercises. Built-in exercises should not be listed here."
                }
              </p>
              <div
                className="schema-table-wrap"
                tabIndex={0}
                role="region"
                aria-label="Scrollable CSV column reference"
              >
                <table className="schema-table">
                  <thead>
                    <tr>
                      <th scope="col">{"Column"}</th>
                      <th scope="col">{"Required"}</th>
                      <th scope="col">{"Notes"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"name"}</td>
                      <td>{"Yes"}</td>
                      <td>{"Unique exercise name."}</td>
                    </tr>
                    <tr>
                      <td>{"primaryMuscleGroup"}</td>
                      <td>{"No"}</td>
                      <td>{"Defaults to Other if blank."}</td>
                    </tr>
                    <tr>
                      <td>{"category"}</td>
                      <td>{"No"}</td>
                      <td>
                        {"Strength, Cardio, Bodyweight, Stretching, or Other."}
                      </td>
                    </tr>
                    <tr>
                      <td>{"equipment"}</td>
                      <td>{"No"}</td>
                      <td>{"Any descriptive equipment value."}</td>
                    </tr>
                    <tr>
                      <td>{"loggingType"}</td>
                      <td>{"No"}</td>
                      <td>
                        {
                          "reps_weight, duration_only, duration_distance, or sets_duration. Defaults to reps_weight."
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>{"loadType"}</td>
                      <td>{"No"}</td>
                      <td>
                        {
                          "external_weight, bodyweight, weighted_bodyweight, or assisted_bodyweight. Used for reps_weight exercises."
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>{"source, sourceId, sourceLicense, sourceUrl"}</td>
                      <td>{"No"}</td>
                      <td>{"Optional source metadata."}</td>
                    </tr>
                    <tr>
                      <td>{"isDeleted"}</td>
                      <td>{"No"}</td>
                      <td>{"true or false. Defaults to false."}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="schema-block">
              <h3>{"workout_templates.csv"}</h3>
              <div
                className="schema-table-wrap"
                tabIndex={0}
                role="region"
                aria-label="Scrollable CSV column reference"
              >
                <table className="schema-table">
                  <thead>
                    <tr>
                      <th scope="col">{"Column"}</th>
                      <th scope="col">{"Required"}</th>
                      <th scope="col">{"Notes"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"id"}</td>
                      <td>{"Yes"}</td>
                      <td>
                        {
                          "Any unique string referenced by template_exercises.csv."
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>{"name"}</td>
                      <td>{"Yes"}</td>
                      <td>
                        {"Template name. Existing names are skipped on import."}
                      </td>
                    </tr>
                    <tr>
                      <td>{"description"}</td>
                      <td>{"No"}</td>
                      <td>{"Optional template description."}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="schema-block">
              <h3>{"template_exercises.csv"}</h3>
              <div
                className="schema-table-wrap"
                tabIndex={0}
                role="region"
                aria-label="Scrollable CSV column reference"
              >
                <table className="schema-table">
                  <thead>
                    <tr>
                      <th scope="col">{"Column"}</th>
                      <th scope="col">{"Required"}</th>
                      <th scope="col">{"Notes"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"templateId"}</td>
                      <td>{"Yes"}</td>
                      <td>{"Must match an id in workout_templates.csv."}</td>
                    </tr>
                    <tr>
                      <td>{"templateName"}</td>
                      <td>{"No"}</td>
                      <td>{"Informational only. Ignored by import."}</td>
                    </tr>
                    <tr>
                      <td>{"exerciseName"}</td>
                      <td>{"Yes"}</td>
                      <td>
                        {"Built-in exercise name or custom exercise name."}
                      </td>
                    </tr>
                    <tr>
                      <td>{"orderIndex"}</td>
                      <td>{"Yes"}</td>
                      <td>{"Zero-based exercise position in the template."}</td>
                    </tr>
                    <tr>
                      <td>{"targetSets, targetReps"}</td>
                      <td>{"No"}</td>
                      <td>{"Whole numbers."}</td>
                    </tr>
                    <tr>
                      <td>{"targetWeightLbs"}</td>
                      <td>{"No"}</td>
                      <td>
                        {
                          "Decimal pounds for external or weighted bodyweight targets."
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>{"targetAssistanceWeightLbs"}</td>
                      <td>{"No"}</td>
                      <td>
                        {"Decimal pounds for assisted bodyweight targets."}
                      </td>
                    </tr>
                    <tr>
                      <td>{"targetDurationSeconds"}</td>
                      <td>{"No"}</td>
                      <td>{"Whole seconds for duration targets."}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="schema-block">
              <h3>{"workout_sessions.csv"}</h3>
              <div
                className="schema-table-wrap"
                tabIndex={0}
                role="region"
                aria-label="Scrollable CSV column reference"
              >
                <table className="schema-table">
                  <thead>
                    <tr>
                      <th scope="col">{"Column"}</th>
                      <th scope="col">{"Required"}</th>
                      <th scope="col">{"Notes"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"id"}</td>
                      <td>{"Yes"}</td>
                      <td>
                        {"Any unique string referenced by exercise_sets.csv."}
                      </td>
                    </tr>
                    <tr>
                      <td>{"templateName"}</td>
                      <td>{"No"}</td>
                      <td>
                        {
                          "Informational only. Imported sessions are not linked back to templates."
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>{"name"}</td>
                      <td>{"Yes"}</td>
                      <td>{"Workout name."}</td>
                    </tr>
                    <tr>
                      <td>{"startTime"}</td>
                      <td>{"Yes"}</td>
                      <td>{"ISO 8601 UTC timestamp."}</td>
                    </tr>
                    <tr>
                      <td>{"endTime"}</td>
                      <td>{"No"}</td>
                      <td>
                        {
                          "ISO 8601 UTC timestamp. If blank, the start time is used — imported sessions are always treated as completed."
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>{"notes"}</td>
                      <td>{"No"}</td>
                      <td>{"Optional workout notes."}</td>
                    </tr>
                    <tr>
                      <td>{"bodyweightLbs"}</td>
                      <td>{"No"}</td>
                      <td>{"Bodyweight snapshot for that workout."}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="schema-block">
              <h3>{"exercise_sets.csv"}</h3>
              <div
                className="schema-table-wrap"
                tabIndex={0}
                role="region"
                aria-label="Scrollable CSV column reference"
              >
                <table className="schema-table">
                  <thead>
                    <tr>
                      <th scope="col">{"Column"}</th>
                      <th scope="col">{"Required"}</th>
                      <th scope="col">{"Notes"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"sessionId"}</td>
                      <td>{"Yes"}</td>
                      <td>{"Must match an id in workout_sessions.csv."}</td>
                    </tr>
                    <tr>
                      <td>{"exerciseName"}</td>
                      <td>{"Yes"}</td>
                      <td>
                        {"Built-in exercise name or custom exercise name."}
                      </td>
                    </tr>
                    <tr>
                      <td>{"setNumber"}</td>
                      <td>{"Yes"}</td>
                      <td>{"One-based set number."}</td>
                    </tr>
                    <tr>
                      <td>{"reps"}</td>
                      <td>{"No"}</td>
                      <td>{"Whole number of reps."}</td>
                    </tr>
                    <tr>
                      <td>{"weightLbs"}</td>
                      <td>{"No"}</td>
                      <td>
                        {
                          "Decimal pounds for external or weighted bodyweight work."
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>{"assistanceWeightLbs"}</td>
                      <td>{"No"}</td>
                      <td>{"Decimal pounds for assisted bodyweight work."}</td>
                    </tr>
                    <tr>
                      <td>{"durationSeconds"}</td>
                      <td>{"No"}</td>
                      <td>{"Whole seconds."}</td>
                    </tr>
                    <tr>
                      <td>{"distanceMeters"}</td>
                      <td>{"No"}</td>
                      <td>{"Decimal meters for cardio distance."}</td>
                    </tr>
                    <tr>
                      <td>{"rir"}</td>
                      <td>{"No"}</td>
                      <td>{"Reps in reserve, as a whole number."}</td>
                    </tr>
                    <tr>
                      <td>{"completedAt"}</td>
                      <td>{"No"}</td>
                      <td>
                        {
                          "ISO 8601 UTC timestamp for when the set was completed. If blank, the session's end time is used so imported sets still count toward Progress charts and PRs."
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>{"notes"}</td>
                      <td>{"No"}</td>
                      <td>{"Optional set notes."}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <section className="guide-section" id="dedupe">
            <div className="guide-section-header">
              <div>
                <span className="guide-kicker">{"Merge behavior"}</span>
                <h2>{"Duplicate Imports Are Skipped"}</h2>
              </div>
              <p>{"Import is designed as a merge, not a blind append."}</p>
            </div>
            <ul>
              <li>
                {
                  "Custom exercises are skipped when the normalized exercise name already exists."
                }
              </li>
              <li>
                {
                  "Workout templates are skipped when a template with the same name already exists."
                }
              </li>
              <li>
                {
                  "Workout sessions are skipped when the same workout name and start time already exist."
                }
              </li>
              <li>
                {
                  "Sets and template exercises attached to skipped parent rows are skipped with the parent, so importing the same export again should not duplicate the data."
                }
              </li>
            </ul>
            <div className="guide-callout">
              <h3>{"Validation warnings"}</h3>
              <p>
                {
                  "SwoLifts reports warnings for missing required columns, invalid numbers, invalid dates, unknown exercises, or child rows that do not match a parent row. Valid rows can still import even when other rows have warnings."
                }
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
