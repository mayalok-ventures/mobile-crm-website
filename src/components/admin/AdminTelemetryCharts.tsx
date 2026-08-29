"use client";

import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrafficPoint {
  date: string;
  visitors: number;
  pageviews: number;
  leads: number;
}

interface SectionPoint {
  section: string;
  avgTimeSec: number;
}

export function TrafficAreaChart({ data }: { data: TrafficPoint[] }) {
  return (
    <div className="h-72 w-full pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f172a" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#e2e8f0",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
          <Area
            type="monotone"
            dataKey="visitors"
            name="Unique Visitors"
            stroke="#0f172a"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#visitorGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SectionEngagementBarChart({ data }: { data: SectionPoint[] }) {
  return (
    <div className="h-60 w-full pt-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" horizontal={false} />
          <XAxis type="number" stroke="#94a3b8" fontSize={10} />
          <YAxis type="category" dataKey="section" stroke="#64748b" fontSize={10} width={90} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#e2e8f0",
              borderRadius: "10px",
              fontSize: "11px",
            }}
          />
          <Bar dataKey="avgTimeSec" name="Avg Secs" fill="#0f172a" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
