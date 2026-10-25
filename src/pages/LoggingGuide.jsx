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
              <figure className="guide-visual">
                <img
                  className="guide-screenshot"
                  src="assets/guide/workout-tab.png"
                  alt="SwoLifts Workout tab showing start workout and template options"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  {"Workout tab: start, resume, or build from templates."}
                </figcaption>
              </figure>
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
              <figure className="guide-visual">
                <img
                  className="guide-screenshot"
                  src="assets/guide/exercises-tab.png"
                  alt="SwoLifts Exercises tab showing search, filters, and exercise list"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  {
                    "Exercises tab: search, filter, and manage custom exercises."
                  }
                </figcaption>
              </figure>
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
              <figure className="guide-visual">
                <img
                  className="guide-screenshot"
                  src="assets/guide/history-tab.png"
                  alt="SwoLifts History tab showing completed workouts with stats and exercise chips"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  {"History tab: browse completed sessions and open details."}
                </figcaption>
              </figure>
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
              <figure className="guide-visual">
                <img
                  className="guide-screenshot"
                  src="assets/guide/progress-tab.png"
                  alt="SwoLifts Progress tab showing summary stats and personal records with estimated 1RM"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  {"Progress tab: charts, records, and training trends."}
                </figcaption>
              </figure>
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
              <figure className="guide-visual">
                <img
                  className="guide-screenshot"
                  src="assets/guide/settings.png"
                  alt="SwoLifts Settings screen showing bodyweight, theme, rest timer, and RIR options"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  {
                    "Settings: units, bodyweight, RIR, notifications, and data tools."
                  }
                </figcaption>
              </figure>
            </div>
            <div className="guide-callout">
              <h3>{"Import and export notes"}</h3>
              <p>
                {
                  "Exports include workout timestamps, exercise load types, assistance weight, and template assistance targets when those fields are present. Imports preserve those fields when restoring or merging a SwoLifts backup. For CSV format examples and the backup transfer guide, see the "
                }
                <a href="swolifts-import-export.html">
                  {"Import & Export Guide"}
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
