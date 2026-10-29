import GuideScreenshot from "../components/GuideScreenshot";

export default function LoggingGuide() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>{"SwoLifts Guide"}</h1>
          <p>
            {"Follow the app by tab, with metric details where they matter."}
          </p>
        </div>
      </section>
      <section className="content-page">
        <div className="container guide-content">
          <div className="guide-intro">
            <p>
              {
                "Use the main SwoLifts tabs as your path through the app. Each section explains what to do first, then shows how SwoLifts tracks the data behind the screen."
              }
            </p>
          </div>
          <p className="guide-screenshot-note">Screens show the SwoLifts 1.2.0 preview. Select a screenshot to open a larger view; older app versions may look different.</p>
          <nav className="guide-tab-links" aria-label="Guide sections">
            <a href="#workout-tab">{"Workout"}</a>
            <a href="#exercises-tab">{"Exercises"}</a>
            <a href="#history-tab">{"History"}</a>
            <a href="#progress-tab">{"Progress"}</a>
            <a href="#settings">{"Settings"}</a>
          </nav>
          <section className="guide-section" id="workout-tab">
            <div className="guide-section-header">
              <div>
                <span className="guide-kicker">{"Workout tab"}</span>
                <h2>{"Start and Log a Workout"}</h2>
              </div>
              <p>
                {
                  "The Workout tab is where you start from scratch, continue an active workout, or build from a saved template."
                }
              </p>
            </div>
            <div className="guide-grid">
              <div>
                <h3>{"What you do"}</h3>
                <ol>
                  <li>
                    {"Open the "}
                    <strong>{"Workout"}</strong>
                    {" tab."}
                  </li>
                  <li>
                    {"Start an empty workout or choose a saved template."}
                  </li>
                  <li>
                    {
                      "Add exercises, then enter reps, weight, duration, distance, or assistance depending on the exercise."
                    }
                  </li>
                  <li>
                    {"Select "}
                    <strong>{"Add note"}</strong>
                    {
                      " on a set to record an optional cue, observation, or reminder. You can edit or clear it later, including from workout history."
                    }
                  </li>
                  <li>
                    {"Use the rest timer between sets if it helps your pacing."}
                  </li>
                  <li>
                    {"Tap "}
                    <strong>{"Finish Workout"}</strong>
                    {" when the session is complete."}
                  </li>
                </ol>
              </div>
              <GuideScreenshot image="guide/workout-tab.png" label="Start a workout"
                alt="SwoLifts Workout tab with Start Workout and Start from Template" caption="Open Workout, then choose Start Workout or Start from Template." />
            </div>
            <div className="guide-grid guide-feature-step">
              <div>
                <h3>Use a saved template</h3>
                <p>From Workout, choose <strong>Start from Template</strong>. Choose <strong>Start</strong> below a template to use it, <strong>Edit</strong> to change its exercises and targets, or <strong>+ New</strong> to create one.</p>
              </div>
              <GuideScreenshot image="guide/templates.png" label="Start from a saved template"
                alt="SwoLifts Templates screen with an Upper body example, Start and Edit buttons, and New template control"
                caption="Templates save your exercise list and targets so the next workout starts with less setup." />
            </div>
            <div className="guide-grid guide-feature-step">
              <div>
                <h3>Enter a set, then mark it done</h3>
                <ol>
                  <li>Choose <strong>Add Exercise</strong> and select a movement.</li>
                  <li>Enter the weight and reps, or the fields shown for that exercise.</li>
                  <li>Select the <strong>Done</strong> checkbox when you complete the set. Use <strong>Add Set</strong> for another set.</li>
                  <li>Select the note icon beside a set to save a cue or observation.</li>
                </ol>
              </div>
              <GuideScreenshot image="guide/log-set.png" label="Log and complete a set"
                alt="A SwoLifts workout with weight and reps fields, Done checkbox, note icon and Add Set button"
                caption="Enter the set values, then select Done. The note icon belongs to that set." />
            </div>
            <div className="guide-grid guide-feature-step">
              <div>
                <h3>Rest between sets and finish your session</h3>
                <ol>
                  <li>The rest strip appears after a completed set when the rest timer is enabled.</li>
                  <li>Use <strong>Skip</strong> to end the rest period, or the adjustment control to change it.</li>
                  <li>Select <strong>Finish Workout</strong> when you are done, then review any confirmation the app shows.</li>
                </ol>
              </div>
              <GuideScreenshot image="guide/rest-timer.png" label="Rest timer and finishing a workout"
                alt="SwoLifts completed set with the blue rest timer strip, Skip control and Finish Workout button"
                caption="The rest timer stays above your sets. Finish Workout saves the completed session to History." />
            </div>
            <div className="guide-callout">
              <h3>{"How SwoLifts tracks it"}</h3>
              <p>
                {
                  "Set data auto-saves while you type. A set timestamp is captured when the set becomes complete, which lets SwoLifts build workout duration, history, and progress metrics without a separate save step."
                }
              </p>
              <ul>
                <li>
                  {
                    "Optional set notes are saved with their set and included in SwoLifts ZIP exports."
                  }
                </li>
                <li>
                  {
                    "Weight and reps exercises need both values before the set counts as complete."
                  }
                </li>
                <li>{"Bodyweight-only exercises need reps."}</li>
                <li>
                  {
                    "Duration exercises need duration; distance-based cardio needs duration and distance."
                  }
                </li>
                <li>
                  {"Empty fields do not count as zero. Enter "}
                  <strong>{"0"}</strong>
                  {" only when you intentionally mean zero."}
                </li>
              </ul>
            </div>
          </section>
          <section className="guide-section" id="exercises-tab">
            <div className="guide-section-header">
              <div>
                <span className="guide-kicker">{"Exercises tab"}</span>
                <h2>{"Find, Filter, and Create Exercises"}</h2>
              </div>
              <p>
                {
                  "The Exercises tab is the library behind your workouts. Search by name, muscle group, equipment, category, load type, or custom exercises."
                }
              </p>
            </div>
            <div className="guide-grid">
              <div>
                <h3>{"What you do"}</h3>
                <ol>
                  <li>
                    {"Open the "}
                    <strong>{"Exercises"}</strong>
                    {" tab."}
                  </li>
                  <li>
                    {"Search or filter until you find the movement you need."}
                  </li>
                  <li>
                    {
                      "Use the add button to create a custom exercise when the library does not have the exact movement."
                    }
                  </li>
                  <li>
                    {
                      "Choose the correct load type so workout volume and progress charts are calculated correctly."
                    }
                  </li>
                </ol>
              </div>
              <GuideScreenshot image="guide/exercises-tab.png" label="Find an exercise"
                alt="SwoLifts exercise library with search, filter controls and Create exercise button" caption="Search by name or use Filters; select the add button to create a custom exercise." />
            </div>
            <div className="guide-grid guide-feature-step">
              <div>
                <h3>Create a custom exercise</h3>
                <p>From Exercises, select the add button. Give the movement a name and choose its category, muscle group, equipment and logging type before saving. Choose the load type that matches what its weight field represents.</p>
              </div>
              <GuideScreenshot image="guide/create-exercise.png" label="Create a custom exercise"
                alt="SwoLifts Create Exercise form with name, category, muscle group and equipment choices"
                caption="Use Create Exercise for a movement missing from the library. Scroll through the form to review the remaining fields." />
            </div>
            <h3>{"Exercise Load Types"}</h3>
            <p>
              {
                "SwoLifts uses load types to understand what the weight field means for each exercise."
              }
            </p>
            <div className="guide-list">
              <article>
                <h4>{"External Weight"}</h4>
                <p>
                  {
                    "The entered load is the exercise weight. Examples: bench press, squat, deadlift, dumbbell curl, machine row, and cable stack movements."
                  }
                </p>
              </article>
              <article>
                <h4>{"Bodyweight"}</h4>
                <p>
                  {
                    "The load is your bodyweight. Examples: push-ups, bodyweight squats, and unweighted pull-ups."
                  }
                </p>
              </article>
              <article>
                <h4>{"Weighted Bodyweight"}</h4>
                <p>
                  {
                    "The load is your bodyweight plus added weight. Examples: weighted dips, weighted pull-ups, and weighted chin-ups."
                  }
                </p>
              </article>
              <article>
                <h4>{"Assisted Bodyweight"}</h4>
                <p>
                  {
                    "The load is your bodyweight minus assistance. Examples: assisted pull-ups, assisted chin-ups, and assisted dips."
                  }
                </p>
              </article>
            </div>
            <div className="guide-callout">
              <h3>{"How SwoLifts calculates volume"}</h3>
              <ul>
                <li>{"External weight: entered weight multiplied by reps."}</li>
                <li>{"Bodyweight: bodyweight multiplied by reps."}</li>
                <li>
                  {
                    "Weighted bodyweight: bodyweight plus added weight, multiplied by reps."
                  }
                </li>
                <li>
                  {
                    "Assisted bodyweight: bodyweight minus assistance, multiplied by reps."
                  }
                </li>
              </ul>
            </div>
          </section>
          <section className="guide-section" id="history-tab">
            <div className="guide-section-header">
              <div>
                <span className="guide-kicker">{"History tab"}</span>
                <h2>{"Review and Edit Past Workouts"}</h2>
              </div>
              <p>
                {
                  "The History tab shows completed workouts in list and calendar views. Open any session to review or correct it."
                }
              </p>
            </div>
            <div className="guide-grid">
              <div>
                <h3>{"What you do"}</h3>
                <ol>
                  <li>
                    {"Open the "}
                    <strong>{"History"}</strong>
                    {" tab."}
                  </li>
                  <li>
                    {
                      "Switch between list and calendar views depending on how you want to browse."
                    }
                  </li>
                  <li>
                    {
                      "Tap a workout to review exercises, sets, start time, end time, and bodyweight snapshot."
                    }
                  </li>
                  <li>
                    {
                      "Edit past sessions when you need to fix a missed set, wrong weight, or incorrect time."
                    }
                  </li>
                </ol>
              </div>
              <GuideScreenshot image="guide/history-tab.png" label="Review workout history"
                alt="SwoLifts History tab with completed workouts and calendar control" caption="Open History and select a workout to see its sets, or switch to calendar view." />
            </div>
            <div className="guide-grid guide-feature-step">
              <div>
                <h3>Open a workout to review its sets</h3>
                <p>Select a completed workout in History. Its detail screen shows the session and its exercises. Correct a weight or rep value here in SwoLifts, then export a fresh backup if you need one.</p>
              </div>
              <GuideScreenshot image="guide/session-detail.png" label="Review and edit a completed workout"
                alt="SwoLifts Workout Detail screen with a completed session and editable set values"
                caption="Make corrections in the workout detail screen rather than editing a backup CSV." />
            </div>
            <div className="guide-callout">
              <h3>{"How SwoLifts uses history data"}</h3>
              <p>
                {
                  "Completed workouts power the Progress tab. Edits to past sessions update charts, PRs, bodyweight trends, and volume totals automatically."
                }
              </p>
            </div>
          </section>
          <section className="guide-section" id="progress-tab">
            <div className="guide-section-header">
              <div>
                <span className="guide-kicker">{"Progress tab"}</span>
                <h2>{"Understand Your Charts and Records"}</h2>
              </div>
              <p>
                {
                  "The Progress tab turns completed workout data into trends, personal records, and summary stats."
                }
              </p>
            </div>
            <div className="guide-grid">
              <div>
                <h3>{"What you do"}</h3>
                <ol>
                  <li>
                    {"Open the "}
                    <strong>{"Progress"}</strong>
                    {" tab."}
                  </li>
                  <li>
                    {"Review your workout totals, streak, and weekly activity."}
                  </li>
                  <li>
                    {
                      "Select an exercise to view chart modes such as max weight, volume, and estimated 1RM."
                    }
                  </li>
                  <li>
                    {
                      "Use time ranges to focus on recent training or long-term progress."
                    }
                  </li>
                </ol>
              </div>
              <GuideScreenshot image="guide/progress-tab.png" label="Explore progress"
                alt="SwoLifts Progress tab showing exercise statistics and chart controls" caption="Choose an exercise and chart metric to explore your completed workouts." />
            </div>
            <div className="guide-grid guide-feature-step">
              <div>
                <h3>Read an exercise chart</h3>
                <ol>
                  <li>Choose an exercise in <strong>Exercise Progress</strong>, then a chart metric and time range.</li>
                  <li>Touch and drag across the chart to inspect a workout's date and value.</li>
                </ol>
              </div>
              <GuideScreenshot image="guide/progress-chart.png" label="Inspect an exercise progress chart"
                alt="SwoLifts Exercise Progress chart with exercise selection, metric chips and plotted workout values"
                caption="Use the chart controls to choose what to compare, then drag across the line to inspect a point." />
            </div>
            <div className="guide-callout">
              <h3>{"Metric meanings"}</h3>
              <ul>
                <li>
                  <strong>{"Max Weight"}</strong>
                  {
                    " shows the heaviest completed set for the selected exercise over time."
                  }
                </li>
                <li>
                  <strong>{"Volume"}</strong>
                  {
                    " totals load multiplied by reps, using each exercise's load type."
                  }
                </li>
                <li>
                  <strong>{"Estimated 1RM"}</strong>
                  {
                    " estimates one-rep max from completed sets and can use RIR when effort tracking is enabled."
                  }
                </li>
                <li>
                  <strong>{"Personal Records"}</strong>
                  {
                    " come from completed workout history, not unfinished workouts."
                  }
                </li>
                <li>
                  <strong>{"Bodyweight"}</strong>
                  {" uses the bodyweight snapshot saved with each workout."}
                </li>
              </ul>
            </div>
          </section>
          <section className="guide-section" id="settings">
            <div className="guide-section-header">
              <div>
                <span className="guide-kicker">{"Settings"}</span>
                <h2>{"Set Units, Effort Tracking, and Backups"}</h2>
              </div>
              <p>
                {
                  "Settings are available from the gear icon. These choices affect how workouts are logged, displayed, and exported."
                }
              </p>
            </div>
            <div className="guide-grid">
              <div>
                <h3>{"What you do"}</h3>
                <ol>
                  <li>{"Choose your preferred weight unit."}</li>
                  <li>
                    {
                      "Save your bodyweight if you want bodyweight and assisted movements to calculate volume more accurately."
                    }
                  </li>
                  <li>
                    {
                      "Turn on RIR tracking if you want to record reps in reserve for strength estimates."
                    }
                  </li>
                  <li>
                    {
                      "Export or import your workout data when backing up or moving devices."
                    }
                  </li>
                </ol>
              </div>
              <GuideScreenshot image="guide/settings.png" label="Adjust settings"
                alt="SwoLifts Settings screen with weight units, theme, rest timer and RIR preferences" caption="Open the gear icon to choose units, rest duration and RIR tracking." />
            </div>
            <div className="guide-grid guide-feature-step">
              <div>
                <h3>Find your backup controls</h3>
                <ol>
                  <li>Open Settings and scroll to <strong>Data</strong>.</li>
                  <li>Choose <strong>Export to file</strong> to save a ZIP, or <strong>Send to computer</strong> to share it.</li>
                  <li>To restore, choose <strong>Import Workout Data</strong> and select the original SwoLifts backup.</li>
                </ol>
                <p><a href="/swolifts-import-export.html#quick-share">See the illustrated transfer and restore guide.</a></p>
              </div>
              <GuideScreenshot image="transfer/send-to-computer.png" label="Find backup and restore controls"
                alt="SwoLifts Settings Data section with Send to computer, Export to file and Import Workout Data"
                caption="Scroll down in Settings to find export, sharing and backup restore." height={2400} />
            </div>
            <div className="guide-callout">
              <h3>{"Import and export notes"}</h3>
              <p>
                {
                  "Export a ZIP to back up your SwoLifts data or inspect a copy in external tools. Import restores a backup exported by SwoLifts; it does not convert another app's history or create workouts from a spreadsheet. Keep the original ZIP unchanged. For transfer and restore instructions, see the "
                }
                <a href="swolifts-import-export.html">
                  {"Backup Workbench"}
                </a>
                {"."}
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
