import { useState } from "react";
import {
  DownloadButton,
  DownloadSection,
  Icon,
  SwoLogo,
  PLAY_URL,
} from "../components/Layout";
import ProgressDemo from "../components/ProgressDemo";
import ScreenshotViewer from "../components/ScreenshotViewer";

const screens = [
  {
    label: "Log your workout",
    title: "Stay in your session.",
    text: "Log weight, reps, duration, or distance. Add a note for your next session and let automatic saving take care of the rest.",
    image: "swolifts-rest-timer.png",
    alt: "SwoLifts workout with completed sets and an active rest timer",
  },
  {
    label: "Follow your progress",
    title: "Find your next milestone.",
    text: "Review exercise trends, personal records, volume, and estimated strength. See how consistent work adds up over time.",
    image: "swolifts-progress-chart.png",
    alt: "SwoLifts exercise progress chart and metric controls",
  },
  {
    label: "Load the bar",
    title: "Leave the plate math to us.",
    text: "Choose your target weight, bar, and available plates. The plate calculator shows what to load on each side.",
    image: "swolifts-plate-calculator.png",
    alt: "SwoLifts plate calculator with per-side plate breakdown",
  },
  {
    label: "Review your history",
    title: "Every session tells a story.",
    text: "Browse your workouts in a list or calendar. Open a past session to review your sets, see your stats, or make a correction.",
    image: "swolifts-history-calendar.png",
    alt: "SwoLifts calendar showing workout history",
  },
];

export default function SwoLifts() {
  const [screen, setScreen] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const current = screens[screen];
  return (
    <>
      <section className="swo-hero">
        <div className="container swo-hero-grid">
          <div className="swo-hero-copy">
            <SwoLogo />
            <span className="product-byline">
              Your offline workout tracker for Android
            </span>
            <h1>
              More lifting.
              <br />
              <span>Less friction.</span>
            </h1>
            <p>
              Your offline workout tracker. Log the work, see your progress, and
              keep your training data yours.
            </p>
            <div className="button-row">
              <div className="hero-download">
                <DownloadButton />
                <span className="download-note">Free core features</span>
              </div>
              <a className="text-link" href="#product">
                Take a look <span aria-hidden="true">↓</span>
              </a>
            </div>
            <ul className="check-list">
              <li>
                <Icon name="check" />
                No account required
              </li>
              <li>
                <Icon name="check" />
                Works offline
              </li>
              <li>
                <Icon name="lock" />
                <a href="/privacy-policy.html">Workout data stays on your device</a>
              </li>
            </ul>
            <a className="desktop-download-qr" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
              <img src="/assets/swolifts-google-play-qr.svg" alt="QR code for SwoLifts on Google Play" width="132" height="132" />
              <span><strong>Take SwoLifts to the gym.</strong>
                <span>Scan to download on your Android.</span>
              </span>
            </a>
          </div>
          <div className="hero-device">
            <div className="device-orbit" />
            <span className="device-label label-top">
              <Icon name="log" /> Focus on your next set.
            </span>
            <img
              className="hero-screenshot"
              src="/assets/swolifts-workout-screen.png"
              alt="SwoLifts Android app showing an active workout and logged sets"
              width="412"
              height="917"
              fetchPriority="high"
            />
            <span className="device-label label-bottom">
              <span className="status-dot" /> Saved. Right on your device.
            </span>
          </div>
        </div>
      </section>
      <div className="product-strip">
        <div className="container">
          <span>
            <Icon name="log" /> Log with ease
          </span>
          <span>
            <Icon name="chart" /> See your progress
          </span>
          <span>
            <Icon name="lock" /> Own your data
          </span>
          <a href="/swolifts-release-history.html">
            What’s new in the app <Icon />
          </a>
        </div>
      </div>
      <section className="product-tour" id="product">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Built for your training</span>
              <h2>
                From your first set
                <br />
                to your next personal best.
              </h2>
            </div>
            <p>
              The details you need, right where you need them. Explore the
              actual SwoLifts app below.
            </p>
          </div>
          <div className="tour-layout">
            <div className="tour-copy">
              <div
                className="tour-selectors"
                role="group"
                aria-label="Explore app features"
              >
                {screens.map((item, i) => (
                  <button
                    key={item.label}
                    aria-pressed={i === screen}
                    aria-controls="tour-panel"
                    onClick={() => setScreen(i)}
                  >
                    <span className="tour-number">0{i + 1}</span>
                    {item.label}
                    <Icon />
                  </button>
                ))}
              </div>
              <div id="tour-panel" aria-live="polite">
                <h3>{current.title}</h3>
                <p>{current.text}</p>
                <a className="text-link" href="/logging-guide.html">
                  Explore the full guide <Icon />
                </a>
              </div>
            </div>
            <figure className="tour-visual">
              <a className="screenshot-trigger" href={`/assets/${current.image}`}
                aria-label={`Enlarge screenshot: ${current.label}`}
                aria-haspopup="dialog"
                onClick={(event) => {
                  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  setViewerOpen(true);
                }}>
                <img
                src={`/assets/${current.image}`}
                alt={current.alt}
                width="412"
                height="917"
                loading="lazy"
                />
                <span className="screenshot-hint">View larger <Icon /></span>
              </a>
              <figcaption>Inside SwoLifts for Android</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="progress-section">
        <div className="container progress-layout">
          <div>
            <span className="eyebrow">
              A little perspective goes a long way
            </span>
            <h2>
              Turn your training
              <br />
              into understanding.
            </h2>
            <p>
              Look beyond a single workout. Follow the weights you lift and the
              volume you build, session by session.
            </p>
            <p>
              Try this example: switch the metric and explore each session to
              see a different side of the same training.
            </p>
            <a className="text-link" href="/logging-guide.html#progress-tab">
              How progress tracking works <Icon />
            </a>
          </div>
          <ProgressDemo />
        </div>
      </section>
      <section className="toolkit-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">The everyday essentials</span>
              <h2>A place for every detail.</h2>
            </div>
          </div>
          <div className="toolkit-grid">
            {[
              [
                "log",
                "Routines, ready to go.",
                "Save workout templates with exercises and target sets. Start your next session with a single tap.",
              ],
              [
                "lift",
                "Train your way.",
                "Use the built-in exercise library or add your own. Track external weight, bodyweight, weighted, and assisted movements.",
              ],
              [
                "chart",
                "Give effort context.",
                "Record reps in reserve and optional notes to help make sense of hard sets and estimated strength trends.",
              ],
            ].map(([icon, title, text]) => (
              <article key={title}>
                <Icon name={icon} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="ownership-section" id="about">
        <div className="container ownership-layout">
          <div className="ownership-art" aria-hidden="true">
            <Icon name="lock" />
            <span>
              YOUR DATA
              <br />
              STAYS YOURS.
            </span>
            <div>WORKOUTS / EXERCISES / TEMPLATES</div>
          </div>
          <div>
            <span className="eyebrow">Independent by design</span>
            <h2>
              Your progress.
              <br />
              Your data. Always.
            </h2>
            <p>
              Your training belongs to you. SwoLifts stores your data locally on
              your device, with no account or cloud connection required.
            </p>
            <p>
              Export a portable ZIP to back it up, move devices, or work with
              your CSV files on a computer.
            </p>
            <a className="text-link" href="/swolifts-import-export.html">
              Meet your data tools <Icon />
            </a>
          </div>
        </div>
      </section>
      <DownloadSection />
      {viewerOpen && <ScreenshotViewer screens={screens} initialIndex={screen}
        onClose={() => setViewerOpen(false)} />}
    </>
  );
}
