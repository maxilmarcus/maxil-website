import { useState } from "react";
import { Icon } from "../components/Layout";
import faqs from "../faqs.json";

export default function Support() {
  const [query, setQuery] = useState("");
  const filtered = faqs.filter(({ question, answer }) =>
    `${question} ${answer}`.toLowerCase().includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Here to help</span>
          <h1>A little help goes a long way.</h1>
          <p>Find an answer, share an idea, or tell us what could be better.</p>
        </div>
      </section>
      <section className="support-content">
        <div className="container">
          <div className="support-grid">
            <a className="support-card" href="/logging-guide.html">
              <Icon name="log" />
              <h2>Get to know SwoLifts</h2>
              <p>
                A walkthrough of each app tab, from your first workout to your
                progress charts.
              </p>
              <span className="text-link">
                Read the guide <Icon />
              </span>
            </a>
            <a className="support-card" href="mailto:support@maxil.app">
              <Icon name="mail" />
              <h2>Talk to a real person</h2>
              <p>
                Questions, bugs, or feature ideas? We aim to respond within 48
                hours.
              </p>
              <span className="text-link">
                support@maxil.app <Icon />
              </span>
            </a>
          </div>
          <div className="faq-section">
            <span className="eyebrow">Quick answers</span>
            <h2>Frequently asked questions</h2>
            <label className="search-label" htmlFor="faq-search">
              Search questions and answers
            </label>
            <input
              id="faq-search"
              type="search"
              placeholder="Try “backup” or “offline”"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <p className="search-count" role="status">
              {query &&
                `${filtered.length} ${filtered.length === 1 ? "answer" : "answers"} found`}
            </p>
            <div className="faq-list">
              {filtered.map(({ question, answer }) => (
                <details className="faq-item" key={question}>
                  <summary>
                    {question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-answer">
                    <p>{answer}</p>
                    {question === "How do I back up my data?" && (
                      <a
                        className="text-link"
                        href="/swolifts-import-export.html"
                      >
                        Open the import & export guide <Icon />
                      </a>
                    )}
                  </div>
                </details>
              ))}
            </div>
            {!filtered.length && (
              <div className="no-results">
                <p>
                  No matching answers. Try another word or email{" "}
                  <a href="mailto:support@maxil.app">support@maxil.app</a>.
                </p>
                <button
                  className="button button-secondary"
                  onClick={() => setQuery("")}
                >
                  Show all questions
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
