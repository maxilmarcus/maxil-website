export default function Releases() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="badge">{"SwoLifts"}</div>
          <h1>{"Release History"}</h1>
          <p>
            {
              "Release notes for the SwoLifts Android app. Website updates are maintained separately."
            }
          </p>
        </div>
      </section>
      <section className="release-section">
        <div className="container">
          <div className="release-grid">
            <article className="release-card release-card-primary release-selector-card">
              <div>
                <div className="release-version">{"Version 1.1.1"}</div>
                <h2>{"SwoLifts 1.1.1"}</h2>
                <p>
                  {
                    "Add notes to individual sets, enjoy a refreshed SwoLifts interface, and get more resilient active-workout timers and notifications."
                  }
                </p>
              </div>
              <div className="release-panel is-active" id="release-1-1-1">
                <div className="release-panel-meta">
                  <time dateTime="2026-08-04">{"Released August 4, 2026"}</time>
                  {" · Set notes and interface refresh"}
                </div>
                <div className="release-columns">
                  <div>
                    <h3>{"Set Notes"}</h3>
                    <ul>
                      <li>{"Add an optional note to any workout set."}</li>
                      <li>
                        {
                          "Edit or clear notes during a workout or later from history."
                        }
                      </li>
                      <li>
                        {
                          "Keep notes through app restarts and SwoLifts ZIP export and import."
                        }
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3>{"Refreshed Experience"}</h3>
                    <ul>
                      <li>
                        {
                          "Updated workout, history, template, progress, and settings screens."
                        }
                      </li>
                      <li>
                        {
                          "Improved navigation, typography, theming, and empty states."
                        }
                      </li>
                      <li>
                        {"Refined workout summaries and completion feedback."}
                      </li>
                      <li>
                        {
                          "Improved active-workout notification and rest-timer recovery after Android reclaims the app process."
                        }
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3>{"Compatibility"}</h3>
                    <ul>
                      <li>
                        {
                          "Existing workouts, settings, and local data remain in place after updating."
                        }
                      </li>
                      <li>{"No account or cloud connection is required."}</li>
                      <li>{"Existing SwoLifts exports remain supported."}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
            <article className="release-card release-card-primary release-selector-card">
              <div>
                <div className="release-version">{"Initial Release"}</div>
                <h2>{"SwoLifts 1.0"}</h2>
                <p>
                  {
                    "The first Android release of SwoLifts focuses on fast workout logging, progress tracking, and local data ownership."
                  }
                </p>
              </div>
              <div className="release-panel is-active" id="release-1-0">
                <div className="release-panel-meta">
                  {"Initial Android release"}
                </div>
                <div className="release-columns">
                  <div>
                    <h3>{"Workout Tracking"}</h3>
                    <ul>
                      <li>{"Log active workouts with autosave."}</li>
                      <li>{"Create reusable workout templates."}</li>
                      <li>
                        {
                          "Use rest timers and a live workout timer notification."
                        }
                      </li>
                      <li>
                        {
                          "Mark completed sets and keep accurate workout history."
                        }
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3>{"Exercise Data"}</h3>
                    <ul>
                      <li>
                        {"Choose from a large built-in exercise library."}
                      </li>
                      <li>{"Add custom exercises for your own routines."}</li>
                      <li>
                        {
                          "Track external weight, bodyweight, weighted bodyweight, and assisted bodyweight work."
                        }
                      </li>
                      <li>
                        {
                          "Optionally record reps in reserve for effort tracking."
                        }
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3>{"Progress and Data"}</h3>
                    <ul>
                      <li>
                        {
                          "Review personal records, exercise trends, volume, and bodyweight charts."
                        }
                      </li>
                      <li>{"Use the plate calculator for bar loading."}</li>
                      <li>{"Edit completed sessions from workout history."}</li>
                      <li>
                        {"Keep data local with ZIP export and import support."}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
