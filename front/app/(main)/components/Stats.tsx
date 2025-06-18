"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "Happy People", value: 50000, suffix: "+" },
  { label: "Countries", value: 120, suffix: "+" },
  { label: "Enjoy", value: 99.9, suffix: "%" },
  { label: "Support Rating", value: 4.9, suffix: "/5" },
];

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-bold text-sky-400">
              {inView ? (
                <CountUp end={s.value} duration={2} suffix={s.suffix} />
              ) : (
                `0${s.suffix}`
              )}
            </div>
            <div className="text-slate-300 text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
