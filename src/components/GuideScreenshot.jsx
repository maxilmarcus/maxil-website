import { useState } from "react";
import ScreenshotViewer from "./ScreenshotViewer";

export default function GuideScreenshot({ image, label, alt, caption, width = 1080, height = 1920 }) {
  const [open, setOpen] = useState(false);
  return <figure className="guide-visual">
    <a className="guide-image-link" href={`/assets/${image}`} target="_blank" rel="noopener noreferrer"
      aria-label={`Enlarge screenshot: ${label}`} onClick={event => { event.preventDefault(); setOpen(true); }}>
      <img className="guide-screenshot" src={`/assets/${image}`} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      <span className="guide-enlarge">View larger ↗</span>
    </a>
    <figcaption>{caption}</figcaption>
    {open && <ScreenshotViewer screens={[{ image, label, alt }]} initialIndex={0} onClose={() => setOpen(false)} />}
  </figure>;
}
