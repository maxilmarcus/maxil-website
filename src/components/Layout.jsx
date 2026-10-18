import { useEffect, useRef, useState } from "react";
import lightFavicon from "../../assets/swolifts-face.svg";
import darkFavicon from "../../assets/swolifts-face-dark.svg";
import { PLAY_URL } from "../constants";
export { PLAY_URL } from "../constants";

function updateFavicon(theme) {
  const icon = document.querySelector('link[rel="icon"]');
  if (icon) icon.href = theme === "dark" ? darkFavicon : lightFavicon;
}

export function Icon({ name = "arrow", ...props }) {
  const paths = {
    arrow: "M4 12h16m-6-6 6 6-6 6",
    chart: "M4 4v16h16M7 14l4-4 4 2 5-7",
    lock: "M7 11V7a5 5 0 0 1 10 0v4M6 11h12v10H6zM12 15v2",
    log: "M8 4h8v4H8zM8 6H5v15h14V6h-3M8 12h8M8 16h5",
    export: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "m6 6 12 12M6 18 18 6",
    sun: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    moon: "M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10",
    check: "m5 12 4 4L19 6",
    lift: "M3 9v6m3-9v12m12-12v12m3-9v6M6 12h12",
    mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}

export function SwoLogo({ stacked = false }) {
  return stacked ? (
    <img
      className="swo-stacked"
      src="/assets/swolifts-brand.svg"
      alt="SwoLifts"
      width="1180"
      height="1020"
    />
  ) : (
    <span className="swo-lockup">
      <img
        className="swo-face"
        src="/assets/swolifts-face.svg"
        alt=""
        width="800"
        height="792"
      />
      <img
        className="swo-wordmark"
        src="/assets/swolifts-wordmark.svg"
        alt="SwoLifts"
        width="1180"
        height="220"
      />
    </span>
  );
}

export function DownloadButton({
  children = "Get it on Google Play",
  className = "",
}) {
  return (
    <a
      className={`button button-primary ${className}`}
      href={PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Icon />
    </a>
  );
}

export function Header({ page }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const menuButton = useRef(null);
  const navigation = useRef(null);
  useEffect(() => {
    const initialTheme = document.documentElement.dataset.theme || "light";
    setTheme(initialTheme);
    updateFavicon(initialTheme);
    function onKey(event) {
      if (event.key === "Escape") {
        setOpen(false);
        navigation.current?.querySelectorAll("details[open]").forEach((el) => {
          el.open = false;
        });
        if (open) menuButton.current?.focus();
      }
    }
    function outside(event) {
      if (
        navigation.current &&
        !navigation.current.contains(event.target) &&
        !menuButton.current?.contains(event.target)
      )
        setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    updateFavicon(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* Theme still works without storage. */
    }
  }
  const link = (slug, title) => (
    <a href={`/${slug}.html`} aria-current={page === slug ? "page" : undefined}>
      {title}
    </a>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav-inner">
          <a className="home-link" href="/" aria-label="SwoLifts home">
            <SwoLogo />
          </a>
          <nav
            ref={navigation}
            className={`site-nav ${open ? "is-open" : ""}`}
            id="site-navigation"
            aria-label="Main navigation"
            onClick={(e) => {
              if (e.target.closest("a")) setOpen(false);
            }}
          >
            <a href="/#product">Features</a>
            {link("swolifts-import-export", "Workbench")}
            <details className="nav-guides">
              <summary
                className={
                  page.includes("guide")
                    ? "is-current"
                    : ""
                }
              >
                Guides <span aria-hidden="true">⌄</span>
              </summary>
              <div className="nav-dropdown">
                {link("logging-guide", "Using SwoLifts")}
                {link("swolifts-import-export", "Import & export")}
              </div>
            </details>
            {link("swolifts-release-history", "App updates")}
            {link("support", "Support")}
          </nav>
          <div className="nav-actions">
            <button
              type="button"
              className="icon-button theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>
            <DownloadButton className="nav-download">
              Get SwoLifts
            </DownloadButton>
            <button
              ref={menuButton}
              className="icon-button menu-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-navigation"
              onClick={() => setOpen(!open)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-about">
            <a href="/" aria-label="SwoLifts home">
              <SwoLogo />
            </a>
            <p>
              More lifting. Less friction.
              <br />
              Your training, in your hands.
            </p>
          </div>
          <div>
            <h2>SwoLifts</h2>
            <a href="/#product">Explore the app</a>
            <a href="/logging-guide.html">Getting started</a>
            <a href="/swolifts-import-export.html">Backup workbench</a>
            <a href="/swolifts-release-history.html">Android release history</a>
          </div>
          <div>
            <h2>Help & information</h2>
            <a href="/support.html">Support & feedback</a>
            <a href="/privacy-policy.html">Privacy policy</a>
            <a href="mailto:support@maxil.app">
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Maxil LLC. All rights reserved.</p>
          <a href="/privacy-policy.html">Privacy policy</a>
        </div>
      </div>
    </footer>
  );
}

export function DownloadSection() {
  return (
    <section className="download-section" id="download">
      <div className="container download-inner">
        <div>
          <span className="eyebrow">Your next session starts here</span>
          <h2>Show up. Lift. See progress.</h2>
          <p>
            Get SwoLifts for Android. Free to start, with your training data on
            your device.
          </p>
          <DownloadButton />
        </div>
        <img
          className="swo-face"
          src="/assets/swolifts-face.svg"
          alt=""
          width="800"
          height="792"
          loading="lazy"
        />
      </div>
    </section>
  );
}
