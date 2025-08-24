"use client";

import React from "react";

type ResultGaugeProps = {
  score: number; // 0 - 100
  size?: number; // overall width in px
  thickness?: number; // stroke width of the arc
  label?: string; // optional label under the score
  className?: string; // optional tailwind classes on wrapper
};

const clamp = (n: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, n));

export default function ResultGauge({
  score,
  size = 240,
  thickness = 14,
  label = "Score",
  className = "",
}: ResultGaugeProps) {
  const pct = clamp(score);

  // SVG viewBox constants
  const w = 100; // width units in viewBox
  const h = 60; // height units for a semicircle

  // Semicircle arc path (left to right)
  // Center at (50,55), radius 45, so arc goes from (5,55) to (95,55)
  const d = "M 5 55 A 45 45 0 0 1 95 55";

  return (
    <div
      className={`flex flex-col items-center ${className}`}
      role="img"
      aria-label={`Gauge showing ${pct} out of 100`}
    >
      <svg
        width={size}
        height={(size * h) / w}
        viewBox={`0 0 ${w} ${h}`}
        className="overflow-visible"
      >
        {/* Background arc */}
        <path
          d={d}
          pathLength={100}
          fill="none"
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-700"
          strokeWidth={thickness}
          strokeLinecap="round"
        />

        {/* Gradient for the foreground arc */}
        <defs>
          <linearGradient
            id="resultGaugeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Foreground arc filled by percentage */}
        <path
          d={d}
          pathLength={100}
          fill="none"
          stroke="url(#resultGaugeGradient)"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${pct} ${100 - pct}`}
          style={{ transition: "stroke-dasharray 500ms ease" }}
        />

        {/* Tick marks at 0, 25, 50, 75, 100 */}
        {[0, 25, 50, 75, 100].map((t) => {
          const angle = Math.PI * (1 - t / 100); // 180deg -> 0deg
          const rOuter = 45;
          const rInner = 45 - thickness * 0.6;
          const cx = 50;
          const cy = 55;
          const x1 = cx + rInner * Math.cos(angle);
          const y1 = cy - rInner * Math.sin(angle);
          const x2 = cx + rOuter * Math.cos(angle);
          const y2 = cy - rOuter * Math.sin(angle);
          return (
            <line
              key={t}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              className="text-gray-300 dark:text-gray-600"
              strokeWidth={1.5}
            />
          );
        })}
      </svg>

      {/* Centered readout */}
      <div className="-mt-6 flex flex-col items-center">
        <div className="text-3xl font-semibold leading-none tabular-nums">
          {pct}
          <span className="text-gray-400 text-xl align-top">/100</span>
        </div>
        {label ? (
          <div className="text-lg font-semibold text-mg-navy-600 ">{label}</div>
        ) : null}
      </div>
    </div>
  );
}
