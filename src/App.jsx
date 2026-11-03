import SwoLifts from "./pages/SwoLifts";
import LoggingGuide from "./pages/LoggingGuide";
import ImportExport from "./pages/ImportExport";
import Releases from "./pages/Releases";
import UpdateDetail from "./pages/UpdateDetail";
import { updates } from "./updates";
export { updates } from "./updates";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";
import { Header, Footer } from "./components/Layout";

export const pages = {
  index: SwoLifts,
  swolifts: SwoLifts,
  "logging-guide": LoggingGuide,
  "swolifts-import-export": ImportExport,
  "swolifts-release-history": Releases,
  support: Support,
  "privacy-policy": Privacy,
  404: NotFound,
  ...Object.fromEntries(updates.map(update => [update.path, () => <UpdateDetail update={update} />])),
};

function NotFound() {
  return (
    <section className="page-header not-found">
      <div className="container">
        <span className="eyebrow">404 / A wrong turn</span>
        <h1>Let’s get you back on track.</h1>
        <p>
          This page isn’t here. Head home or find your way with the SwoLifts
          guide.
        </p>
        <div className="button-row">
          <a className="button button-primary" href="/">
            Back to SwoLifts
          </a>
          <a className="button button-secondary" href="/logging-guide.html">
            Read the guide
          </a>
        </div>
      </div>
    </section>
  );
}

export function pageFromPath(path) {
  if (path === "/" || path === "/index.html") return "index";
  const key = path.replace(/^\//, "").replace(/\.html$/, "");
  return Object.hasOwn(pages, key) ? key : "404";
}

export default function App({ page = "index" }) {
  const Page = pages[page] || NotFound;
  return (
    <>
      <Header page={page.startsWith("updates/") ? "swolifts-release-history" : page} />
      <main id="main" tabIndex={-1} className={`page-${page}`}>
        <Page />
      </main>
      <Footer />
    </>
  );
}
