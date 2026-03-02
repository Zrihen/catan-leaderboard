"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ChartPoint = { date: string; games: number; total: number };

function formatDate(s: string) {
  const d = new Date(s + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" });
}

export function GamesOverTimeChart() {
  const [points, setPoints] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/chart")
      .then((res) => res.json())
      .then((data: { points?: ChartPoint[] }) => setPoints(data.points ?? []))
      .catch(() => setPoints([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <h3 className="text-sm font-medium uppercase tracking-wider text-[#6B7280]">
          Games over time
        </h3>
        <div className="h-[220px] items-center justify-center text-[#6B7280] flex">Loading…</div>
      </div>
    );
  }

  if (points.length === 0) {
    return (
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <h3 className="text-sm font-medium uppercase tracking-wider text-[#6B7280]">
          Games over time
        </h3>
        <div className="flex h-[220px] items-center justify-center text-[#6B7280] text-sm">
          Log games to see the chart.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#6B7280]">
        Games over time
      </h3>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gamesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C8A24D" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#C8A24D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#9CA3AF"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              dataKey="games"
              stroke="#9CA3AF"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              width={24}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "13px",
              }}
              labelFormatter={(label) => (typeof label === "string" ? formatDate(label) : String(label))}
              formatter={(value: number | undefined) => [`${value ?? 0} game${(value ?? 0) !== 1 ? "s" : ""}`, "Played"]}
              cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="games"
              stroke="#C8A24D"
              strokeWidth={2}
              fill="url(#gamesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
