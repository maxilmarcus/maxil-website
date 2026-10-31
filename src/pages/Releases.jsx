import { updates, updateDate } from "../updates";
import { Icon } from "../components/Layout";

export default function Releases() {
  return <>
    <section className="page-header">
      <div className="container">
        <span className="eyebrow">What’s new</span>
        <h1>SwoLifts updates</h1>
        <p>Follow Android app releases and changes to this website.</p>
        <nav className="updates-nav" aria-label="Update categories">
          <a href="#app-updates">App updates</a>
          <a href="#website-updates">Website updates</a>
        </nav>
      </div>
    </section>
    <div className="container updates-index">
      {[{ kind: "app", title: "App updates", description: "Versioned releases of the SwoLifts Android app." },
        { kind: "website", title: "Website updates", description: "Website improvements, dated when they are published." }].map(({ kind, title, description }) =>
        <section className="updates-group" id={`${kind}-updates`} key={kind} aria-labelledby={`${kind}-title`}>
          <div className="updates-heading"><h2 id={`${kind}-title`}>{title}</h2><p>{description}</p></div>
          <div className="updates-cards">{updates.filter(update => update.kind === kind).map(update =>
            <article className="update-card" key={update.slug}
              id={kind === "app" ? `release-${update.name.replaceAll(".", "-")}` : undefined}>
              <div className="update-meta"><span className="update-badge">{update.status === "unreleased" ? "Unreleased" : kind === "app" ? `Android ${update.name}` : "Website"}</span>
                {update.date ? <time dateTime={update.date}>{updateDate(update)}</time> : <span>{updateDate(update)}</span>}</div>
              <h3><a href={update.href}>{update.title}</a></h3>
              <p>{update.summary}</p>
              <a className="text-link" href={update.href} aria-label={`Read ${update.title}`}>Read update <Icon /></a>
            </article>)}</div>
        </section>)}
    </div>
  </>;
}
