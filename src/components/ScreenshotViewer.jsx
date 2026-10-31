import { useEffect, useRef, useState } from "react";
import { Icon } from "./Layout";

export default function ScreenshotViewer({ screens, initialIndex, onClose }) {
  const dialog = useRef(null);
  const [index, setIndex] = useState(initialIndex);
  const current = screens[index];
  const move = (direction) =>
    setIndex((value) => (value + direction + screens.length) % screens.length);

  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement;
    const previousOverflow = document.documentElement.style.overflow;
    element.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      element.close();
      document.documentElement.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="screenshot-viewer"
      aria-labelledby="screenshot-title"
      onClose={(event) => {
        // StrictMode cleanup queues a close event before the effect reopens
        // this dialog. Only dismiss a viewer that is still actually closed.
        if (!event.currentTarget.open) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom)
            event.currentTarget.close();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const controls = event.currentTarget.querySelectorAll("button, a[href]");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className="viewer-heading">
        <h2 id="screenshot-title">Inside SwoLifts</h2>
        <button className="icon-button" aria-label="Close screenshot viewer"
          autoFocus onClick={() => dialog.current.close()}>
          <Icon name="close" />
        </button>
      </div>
      <figure>
        <img src={`/assets/${current.image}`} alt={current.alt} width="412" height="917" />
        <figcaption aria-live="polite" aria-atomic="true">
          {screens.length > 1 ? `${index + 1} / ${screens.length} — ` : ""}{current.label}
        </figcaption>
      </figure>
      <div className="viewer-controls">
        {screens.length > 1 && <button className="icon-button viewer-previous" aria-label="Previous screenshot"
          onClick={() => move(-1)}><Icon /></button>}
        <a href={`/assets/${current.image}`} target="_blank" rel="noopener noreferrer">
          Open full-size image <span className="sr-only">(opens in a new tab)</span>
        </a>
        {screens.length > 1 && <button className="icon-button" aria-label="Next screenshot"
          onClick={() => move(1)}><Icon /></button>}
      </div>
    </dialog>
  );
}
