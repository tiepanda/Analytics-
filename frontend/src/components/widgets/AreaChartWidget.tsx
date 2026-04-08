"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { BaseWidget } from "./BaseWidget"

const sampleData = [
  { name: "Page A", pv: 2400, uv: 1400, amt: 2400 },
  { name: "Page B", pv: 1398, uv: 2210, amt: 2210 },
  { name: "Page C", pv: 9800, uv: 2290, amt: 2290 },
  { name: "Page D", pv: 3908, uv: 2000, amt: 2000 },
  { name: "Page E", pv: 4800, uv: 1890, amt: 1890 },
  { name: "Page F", pv: 3800, uv: 2390, amt: 2390 },
]

interface ChartDataItem {
  [key: string]: string | number
}

interface AreaChartWidgetProps {
  id: string
  title?: string
  data?: ChartDataItem[]
  config?: {
    dataKey1?: string
    dataKey2?: string
    color1?: string
    color2?: string
  }
}

export function AreaChartWidget({
  id,
  title = "Area Chart",
  data = sampleData,
  config = {
    dataKey1: "pv",
    dataKey2: "uv",
    color1: "#3b82f6",
    color2: "#10b981",
  },
}: AreaChartWidgetProps) {
  return (
    <BaseWidget id={id} title={title}>
      <ResponsiveContainer width="100%" height="100%" className="flex-1">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} className="text-slate-600 dark:text-slate-400" />
          <YAxis tick={{ fontSize: 12 }} className="text-slate-600 dark:text-slate-400" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Area
            type="monotone"
            dataKey={config.dataKey1 || 'pv'}
            stackId="1"
            stroke={config.color1 || "#3b82f6"}
            fill={config.color1 || "#3b82f6"}
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey={config.dataKey2 || 'uv'}
            stackId="1"
            stroke={config.color2 || "#10b981"}
            fill={config.color2 || "#10b981"}
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </BaseWidget>
  )
}
