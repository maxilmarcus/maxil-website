import { useEffect, useState } from "react";
import GuideScreenshot from "../components/GuideScreenshot";

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
    <p role="status">{failed ? "The workbench could not load. Reload this page to retry, or use the backup guide below." : "The workbench uses JavaScript to inspect your backup locally. The backup guide and format references below also work without JavaScript."}</p>
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
              "Inspect your SwoLifts backup privately, explore your data, and learn how to restore your original ZIP."
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
                "Import restores backups exported by SwoLifts. It is not a way to add spreadsheet workouts, create historical sessions, or transfer history from another app. Keep your original exported ZIP unchanged for restoring; use a separate copy for analysis."
              }
            </p>
          </div>
          <section className="guide-section" id="quick-share">
            <h2>Save a backup on your computer</h2>
            <p>These phone actions use SwoLifts 1.2.0. Quick Share is provided by Android and Windows; SwoLifts itself does not connect to your computer.</p>
            <ol>
              <li><strong>Set up your PC.</strong> <a href="https://www.android.com/quick-share/with-windows-pc/" target="_blank" rel="noopener noreferrer">Get Quick Share for Windows from Google</a>. Follow its setup and visibility instructions, and keep the phone and PC nearby with Bluetooth and Wi-Fi enabled. <a href="https://support.google.com/android/answer/13801258?hl=en" target="_blank" rel="noopener noreferrer">Google's setup and troubleshooting guide</a> covers device compatibility.</li>
              <li><strong>Send your backup.</strong> In SwoLifts, open Settings, then Share backup, choose Quick Share, then choose your PC. Open the received ZIP in the workbench above.</li>
              <li><strong>Restore when needed.</strong> Send the original, unchanged SwoLifts ZIP to your phone using Quick Share. Open it with SwoLifts, review the preview and confirm Import backup. You do not need to edit or rebuild the ZIP.</li>
            </ol>
            <div className="template-download-grid">
              <GuideScreenshot image="transfer/send-to-computer.png" label="Send a backup to your computer" alt="SwoLifts Settings with Share backup, Export to file and Import Workout Data" caption="Open Settings, then choose Share backup or Export to file." height={1920} />
              <GuideScreenshot image="transfer/import-preview.png" label="Review a backup before restoring" alt="SwoLifts backup restore preview with record counts and an exercise merge warning" caption="Choose your original SwoLifts ZIP, read the preview and confirm only when it is the backup you intend to restore." height={2400} />
            </div>
            <p><strong>USB fallback:</strong> use Export to file, connect the phone with a USB cable and select File transfer on the phone. Copy the ZIP between Downloads folders using Windows File Explorer. Open the returned ZIP with SwoLifts, or select it through Settings, then Import Workout Data.</p>
          </section>
          <div className="template-download-grid">
            <article className="template-download-card">
              <span className="guide-kicker">{"Format reference"}</span>
              <h2>{"Blank CSV Format"}</h2>
              <p>
                {
                  "Header-only files for understanding backup columns. These are not a template for creating workouts to import. Create and log workouts in the app."
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
              <h2>{"CSV Format Example"}</h2>
              <p>
                {
                  "Sample data for exploring the workbench and understanding backup columns. It is not your backup or a way to convert another app's history."
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
                <span className="guide-kicker">{"Backup workflow"}</span>
                <h2>{"Back Up Your Data and Restore It When Needed"}</h2>
              </div>
              <p>
                {
                  "The CSV files may be at the ZIP root or inside a wrapping folder. Files in examples/ are reference examples and are not imported."
                }
              </p>
            </div>
            <ol>
              <li>{"Export a ZIP from SwoLifts and keep the original unchanged. The blank and example ZIPs above are format references."}</li>
              <li>
                {
                  "Open the backup here to inspect its contents. For spreadsheet analysis, extract a separate copy and keep the original ZIP safe."
                }
              </li>
              <li>
                {
                  "To correct a workout, edit it in SwoLifts and export a fresh backup. Editing and re-importing a CSV is not a supported correction workflow."
                }
              </li>
              <li>
                {"When restoring or moving phones, use the original ZIP with the same or a newer SwoLifts version. Do not remove files, change IDs, or rebuild it from a spreadsheet."}
              </li>
              <li>{"Copy that original ZIP to your Android device."}</li>
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
                {" during import. Leave the original archive intact for restoring."}
              </p>
            </div>
          </section>
          <section className="guide-section" id="exact-values">
            <h2>Keep exact values and identities</h2>
            <p>A backup contains exact weights, timestamps, record IDs and links between workouts, sets and exercises. Keep these values intact by restoring the original SwoLifts ZIP. The workbench does not generate the records and relationships needed to import history from other apps.</p>
            <p>File checks cannot guarantee a restore: the browser cannot inspect data already on your phone. Review the app's import preview. If a backup reports a problem, export a fresh copy from SwoLifts or contact support.</p>
          </section>
          <section className="guide-section" id="rules">
            <div className="guide-section-header">
              <div>
                <span className="guide-kicker">{"CSV rules"}</span>
                <h2>{"Format Requirements"}</h2>
              </div>
              <p>{"This reference explains exported files for inspection and analysis. It is not a guide to constructing an import."}</p>
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
                  "Exports include pounds and exact kilogram columns. Keep both in the original backup; use the exact kilogram values when analyzing data."
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
                  " is exported for external tools only. Workout bodyweight snapshots are stored as "
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
                  "These are fields found in a SwoLifts backup. Preserve the complete original ZIP for restoring."
                }
              </p>
            </div>
            <div className="schema-block">
              <h3>{"custom_exercises.csv"}</h3>
              <p>
                {
                  "Custom exercises created in SwoLifts. Built-in exercises are not listed here."
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
                          "Template ID assigned by SwoLifts and referenced by template_exercises.csv. Preserve the exported value."
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
                        {"Workout ID assigned by SwoLifts and referenced by exercise_sets.csv. Preserve the exported value."}
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
