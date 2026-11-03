import { updateDate } from "../updates";

export default function UpdateDetail({ update }) {
  const category = update.kind === "app" ? "App updates" : "Website updates";
  return <>
    <section className="page-header update-hero">
      <div className="container">
        <a className="text-link" href={`/swolifts-release-history.html#${update.kind}-updates`}>← {category}</a>
        <div className="update-meta"><span className="update-badge">{update.status === "unreleased" ? "Unreleased" : category}</span>
          {update.date ? <time dateTime={update.date}>{updateDate(update)}</time> : <span>{updateDate(update)}</span>}</div>
        <h1>{update.title}</h1>
        <p>{update.summary}</p>
      </div>
    </section>
    <article className="container update-article" aria-label={`${update.title} release notes`}>
      {update.status === "unreleased" && <p className="update-preview">Preview of an upcoming website update. A publication date will be added when it goes live.</p>}
      <div className="update-content" dangerouslySetInnerHTML={{ __html: update.html }} />
      <a className="text-link" href="/swolifts-release-history.html">← All updates</a>
    </article>
  </>;
}
