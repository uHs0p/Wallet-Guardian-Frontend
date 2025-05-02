"use client"

import type * as React from "react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip as RechartsTooltip,
} from "recharts"

interface ChartTooltipContentProps {
  label?: string | number
  payload?: any[]
  labelClassName?: string
  valueClassName?: string
  labelFormatter?: (label: string | number) => string
  formatter?: (value: any) => string
  className?: string
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  label,
  payload,
  labelClassName,
  valueClassName,
  labelFormatter,
  formatter,
  className,
}) => {
  if (!payload || !payload.length) {
    return null
  }

  const data = payload[0]?.payload || {}

  return (
    <div className={className || "bg-gray-900 p-2 rounded border border-gray-800"}>
      <p className={labelClassName || "text-gray-400"}>{label && labelFormatter ? labelFormatter(label) : label}</p>
      {Object.keys(data).map((key) => {
        if (key === "timestamp") return null
        return (
          <p key={key} className={valueClassName || "text-white"}>
            {key}: {formatter ? formatter(data[key]) : data[key]}
          </p>
        )
      })}
    </div>
  )
}

export const ChartContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

export const Chart: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export const Line: React.FC<React.ComponentProps<typeof RechartsLine>> = (props) => {
  return <RechartsLine {...props} />
}

export const LineChart: React.FC<React.ComponentProps<typeof RechartsLineChart>> = (props) => {
  return <RechartsLineChart {...props} />
}

export const XAxis: React.FC<React.ComponentProps<typeof RechartsXAxis>> = (props) => {
  return <RechartsXAxis {...props} />
}

export const YAxis: React.FC<React.ComponentProps<typeof RechartsYAxis>> = (props) => {
  return <RechartsYAxis {...props} />
}

export const ChartTooltip: React.FC<React.ComponentProps<typeof RechartsTooltip>> = (props) => {
  return <RechartsTooltip {...props} />
}
