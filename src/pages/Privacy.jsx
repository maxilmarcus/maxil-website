export default function Privacy() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>{"Privacy Policy"}</h1>
          <p>{"Last updated: October 17, 2026"}</p>
        </div>
      </section>
      <section className="content-page">
        <div className="container">
          <h2>{"Introduction"}</h2>
          <p>
            {
              "Maxil operates the SwoLifts mobile application. This Privacy Policy explains how your information is handled when you use SwoLifts."
            }
          </p>
          <p>
            {
              "We are committed to protecting your privacy. SwoLifts is designed with a privacy first approach, and your data stays on your device."
            }
          </p>
          <h2>{"Information We Collect"}</h2>
          <p>
            <strong>
              {
                "SwoLifts does not collect, transmit, or store any personal data on external servers."
              }
            </strong>
            {
              " All data you enter into the App is stored locally on your device."
            }
          </p>
          <p>{"The types of data stored locally on your device include:"}</p>
          <ul>
            <li>
              {
                "Workout session data (exercises, sets, reps, weights, duration, distance)"
              }
            </li>
            <li>{"Custom exercises you create"}</li>
            <li>{"Workout templates"}</li>
            <li>{"Bodyweight entries captured during workouts"}</li>
            <li>{"App preferences (units, theme settings)"}</li>
          </ul>
          <h2>{"How We Use Your Information"}</h2>
          <p>
            {
              "Since all data is stored locally on your device, we do not use your information for any purpose. The data you enter is used solely by the App on your device to provide workout tracking, progress charts, and related features."
            }
          </p>
          <h2>{"Data Storage and Security"}</h2>
          <p>
            {
              "All your data is stored in a local SQLite database on your Android device. We do not have access to this data. Your data is protected by your device's built in security features, such as screen lock and encryption."
            }
          </p>
          <h2>{"Data Export and Import"}</h2>
          <p>
            {
              "SwoLifts includes a data export feature that allows you to save your data as a ZIP file containing CSV files. This file is saved to your device's storage. You are responsible for the security of any exported data files. The import feature allows you to restore data from previously exported files."
            }
          </p>
          <h2>{"Browser Workbench"}</h2>
          <p>The import/export workbench reads files you select or drop directly in your browser. File contents are not uploaded to Maxil or sent in analytics, requests or beacons. The page uses locally hosted code and fonts, with no third-party scripts. The website host still receives normal requests to load the website and public example files.</p>
          <p>Your opened files and edits remain in browser memory until you clear, reload or close the page. They are not saved in local storage. Downloaded ZIP and AI-readable files are saved by your browser to the destination you choose. Theme preferences may be saved separately; they contain no workout data.</p>
          <p>Sending a backup through the Android share sheet gives the selected receiving app access to that file. Temporary app-owned sharing copies expire after 24 hours and are removed on the next app process launch. Received import copies are removed after completion or cancellation; crash leftovers follow the same expiry. Copies you save or deliver elsewhere remain under your control.</p>
          <p>The AI download includes workout information such as dates, weights and notes. SwoLifts does not contact an AI provider. If you choose to upload that file to another service, that service handles it under its own privacy policy and settings.</p>
          <h2>{"Third Party Services"}</h2>
          <p>
            {
              "SwoLifts does not currently integrate with any third party analytics, advertising, or tracking services. We do not share your data with any third parties."
            }
          </p>
          <p>
            {
              "The App is distributed through the Google Play Store, which may collect certain information as described in "
            }
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener"
            >
              {"Google's Privacy Policy"}
            </a>
            {"."}
          </p>
          <h2>{"Children's Privacy"}</h2>
          <p>
            {
              "SwoLifts is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. Since the App does not collect any personal data, no special provisions are needed."
            }
          </p>
          <h2>{"Changes to This Privacy Policy"}</h2>
          <p>
            {
              'We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.'
            }
          </p>
          <h2>{"Future Features"}</h2>
          <p>
            {
              "We may introduce optional cloud sync and AI powered features in the future. If and when we do, this Privacy Policy will be updated before those features launch, and any data sharing will require your explicit consent."
            }
          </p>
          <h2>{"Contact Us"}</h2>
          <p>
            {
              "If you have any questions about this Privacy Policy, please contact us:"
            }
          </p>
          <ul>
            <li>
              {"Email: "}
              <a href="mailto:support@maxil.app">{"support@maxil.app"}</a>
            </li>
            <li>
              {"Support page: "}
              <a href="support.html">{"maxil.app/support.html"}</a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
