"use client"

import * as React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { MotionFade } from "./motion"

interface EnhancedTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  title?: string
  icon?: React.ReactNode
  metric?: string | number
  change?: string | number
  trend?: "up" | "down" | "neutral"
  className?: string
  contentClassName?: string
}

export function EnhancedTooltip({
  children,
  content,
  title,
  icon,
  metric,
  change,
  trend,
  className,
  contentClassName,
}: EnhancedTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          className={cn("p-0 overflow-hidden max-w-[350px]", contentClassName)}
          sideOffset={5}
        >
          <MotionFade>
            <div className="flex flex-col">
              {(title || icon) && (
                <div className="flex items-center gap-2 bg-muted p-3 border-b">
                  {icon && <span>{icon}</span>}
                  {title && <p className="font-medium">{title}</p>}
                </div>
              )}
              
              {(metric || change) && (
                <div className="flex items-center justify-between px-3 py-2 border-b">
                  {metric && <span className="text-xl font-bold">{metric}</span>}
                  {change && (
                    <span 
                      className={cn(
                        "text-sm font-medium",
                        trend === "up" && "text-green-600 dark:text-green-500",
                        trend === "down" && "text-red-600 dark:text-red-500",
                        trend === "neutral" && "text-muted-foreground"
                      )}
                    >
                      {change}
                    </span>
                  )}
                </div>
              )}
              
              <div className="p-3">
                {content}
              </div>
            </div>
          </MotionFade>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function BarValueTooltip({ 
  children, 
  value, 
  label, 
  prefix = "",
  suffix = "",
  className 
}: { 
  children: React.ReactNode 
  value: string | number
  label: string
  prefix?: string
  suffix?: string
  className?: string
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{label}</p>
          <p className="text-lg">
            {prefix}{value}{suffix}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function ChartTooltip({ 
  children, 
  title,
  series,
  className 
}: { 
  children: React.ReactNode 
  title: string
  series: { label: string; value: string | number; color?: string }[]
  className?: string
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>
        <TooltipContent className="p-0 overflow-hidden max-w-[250px]">
          <div className="bg-muted p-2 border-b">
            <p className="font-medium">{title}</p>
          </div>
          <div className="p-2">
            {series.map((item, index) => (
              <div key={index} className="flex items-center justify-between gap-4 py-1">
                <div className="flex items-center gap-2">
                  {item.color && (
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: item.color }} 
                    />
                  )}
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 