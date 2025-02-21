import { ReactNode } from "react"
import { Legend, Tooltip, ResponsiveContainer } from "recharts"

export type ChartConfig = Record<string, { label: string; color: string }>

interface ChartProps {
  config: ChartConfig
  children: ReactNode
  className?: string
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
  config: ChartConfig
}

interface ChartLegendContentProps {
  payload?: Array<{ value: string; color: string }>
  config: ChartConfig
}

export function ChartContainer({ config, children, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      {children}
    </ResponsiveContainer>
  )
}

export function ChartTooltip({ content }: { content: ReactNode }) {
  return (
    <Tooltip
      content={content}
      wrapperStyle={{ outline: "none" }}
      cursor={{ strokeDasharray: 4, strokeWidth: 1 }}
    />
  )
}

export function ChartLegend({ content }: { content: ReactNode }) {
  return <Legend content={content} verticalAlign="top" height={60} />
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  config,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {label}
        </div>
        <div className="grid gap-1">
          {payload.map(({ name, value, color }) => (
            <div key={name} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <div className="flex gap-1 text-sm">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {config[name]?.label}:
                </div>
                <div className="text-gray-500 dark:text-gray-400">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ChartLegendContent({
  payload,
  config,
}: ChartLegendContentProps) {
  if (!payload?.length) return null

  return (
    <div className="flex flex-wrap items-center gap-4">
      {payload.map(({ value, color }) => (
        <div key={value} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {config[value]?.label}
          </div>
        </div>
      ))}
    </div>
  )
}