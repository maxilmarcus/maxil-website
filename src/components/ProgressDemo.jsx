import { useId, useState } from "react";

const samples = {
  "Max weight": {
    values: [135, 135, 140, 145, 145, 150, 155, 160],
    unit: "lb",
    description: "The heaviest completed set in each session.",
  },
  Volume: {
    values: [3240, 3375, 3500, 3480, 3625, 3750, 3875, 4000],
    unit: "lb",
    description: "Total weight × reps across the session’s sets.",
  },
};

export default function ProgressDemo() {
  const [metric, setMetric] = useState("Max weight");
  const [selected, setSelected] = useState(7);
  const fillId = useId();
  const { values, unit, description } = samples[metric];
  const min = Math.min(...values) * 0.9;
  const max = Math.max(...values) * 1.05;
  const points = values.map((value, i) => [
    45 + i * 61,
    174 - ((value - min) / (max - min)) * 140,
  ]);
  const line = points.map((p) => p.join(",")).join(" ");
  return (
    <div className="progress-demo">
      <div className="demo-top">
        <div>
          <span className="eyebrow">Bench press</span>
          <h3>See the work add up.</h3>
        </div>
        <span className="demo-label">Interactive example</span>
      </div>
      <div className="segmented" role="group" aria-label="Chart metric">
        {Object.keys(samples).map((name) => (
          <button
            key={name}
            onClick={() => setMetric(name)}
            aria-pressed={metric === name}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="demo-value" aria-live="polite">
        <strong>
          {values[selected].toLocaleString("en-US")} <small>{unit}</small>
        </strong>
        <span>
          Session {selected + 1} · {metric.toLowerCase()}
        </span>
      </div>
      <svg
        className="progress-chart"
        viewBox="0 0 520 210"
        role="img"
        aria-label={`${metric} over eight example sessions: ${values.join(", ")} pounds.`}
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="currentColor" stopOpacity=".22" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 85, 130, 175].map((y) => (
          <line key={y} className="chart-grid" x1="28" y1={y} x2="500" y2={y} />
        ))}
        <polygon points={`45,180 ${line} 472,180`} fill={`url(#${fillId})`} />
        <polyline
          points={line}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {points.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={selected === i ? 6 : 3}
              fill="currentColor"
            />
            <text x={x} y="205" textAnchor="middle">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
      <label className="chart-slider">
        Explore a session
        <input
          type="range"
          min="0"
          max="7"
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
          aria-label="Example workout session"
          aria-valuetext={`Session ${selected + 1}: ${values[selected]} ${unit}`}
        />
      </label>
      <p className="demo-note">
        {description} Illustrative data, not actual user results or a live app
        screen.
      </p>
    </div>
  );
}
