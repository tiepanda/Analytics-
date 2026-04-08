"use client"

import React, { useCallback, useMemo, useState, useRef, useEffect } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { useDashboardStore, Widget, WidgetLayout } from "../../store/dashboardStore"
import { getWidgetComponent, getWidgetType } from "../widgets/WidgetRegistry"
import { Button } from "../ui/button"
import { Plus, Sparkles, ChevronDown } from "lucide-react"
import type { DashboardConfig } from "./DashboardBuilder"

// Grid configuration type
interface GridConfigType {
  [key: string]: number
  lg: number
  md: number
  sm: number
  xs: number
  xxs: number
}

const ResponsiveGridLayout = WidthProvider(Responsive)

interface DashboardCanvasProps {
  config?: DashboardConfig
  onWidgetAdd?: (widget: Widget) => void
  onWidgetRemove?: (widgetId: string) => void
  onWidgetUpdate?: (widgetId: string, updates: Partial<Widget>) => void
  onLayoutChange?: (layout: WidgetLayout[]) => void
}

export function DashboardCanvas({ 
  config = {},
  onWidgetAdd,
  onLayoutChange
}: DashboardCanvasProps) {
  const { widgets, layout, updateLayout, addWidget } = useDashboardStore()
  const [isDragging, setIsDragging] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [canvasHeight, setCanvasHeight] = useState(400)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Grid configuration
  const gridConfig = {
    rowHeight: config.rowHeight || 60,
    margin: config.margin || [12, 12],
    containerPadding: config.containerPadding || [0, 0],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: config.gridCols || 12, md: 10, sm: 6, xs: 4, xxs: 2 } as GridConfigType
  }

  // Calculate canvas height based on widget positions
  useEffect(() => {
    if (layout.length > 0) {
      const maxY = Math.max(...layout.map((l: WidgetLayout) => l.y + l.h))
      const calculatedHeight = Math.max(600, maxY * gridConfig.rowHeight + 500)
      setCanvasHeight(calculatedHeight)
      
      // Show scroll hint if content is taller than viewport
      if (calculatedHeight > window.innerHeight) {
        setShowScrollHint(true)
        setTimeout(() => setShowScrollHint(false), 3000)
      }
    } else {
      setCanvasHeight(400)
      setShowScrollHint(false)
    }
  }, [layout, gridConfig.rowHeight])

  const handleLayoutChange = useCallback(
    (newLayout: WidgetLayout[]) => {
      const updatedLayout = newLayout.map((item: WidgetLayout) => ({
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        minW: item.minW,
        minH: item.minH,
        maxW: item.maxW,
        maxH: item.maxH,
      }))
      updateLayout(updatedLayout)
      onLayoutChange?.(updatedLayout)
    },
    [updateLayout, onLayoutChange],
  )

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleDragStop = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    try {
      const widgetData: { id: string; [key: string]: unknown } = JSON.parse(e.dataTransfer.getData('application/json'))
      if (widgetData && widgetData.id) {
        const widgetType = getWidgetType(widgetData.id)
        if (widgetType) {
          const canvasRect = canvasRef.current?.getBoundingClientRect()
          if (canvasRect) {
            const dropX = e.clientX - canvasRect.left
            const dropY = e.clientY - canvasRect.top
            const gridX = Math.floor(dropX / (canvasRect.width / gridConfig.cols.lg))
            const gridY = Math.floor(dropY / gridConfig.rowHeight)
            
            const widgetId = `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            const newWidget = {
              id: widgetId,
              type: widgetType.id,
              title: widgetType.name,
              config: {},
              layout: {
                i: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                x: Math.max(0, Math.min(gridX, gridConfig.cols.lg - widgetType.defaultSize.w)),
                y: Math.max(0, gridY),
                w: widgetType.defaultSize.w,
                h: widgetType.defaultSize.h,
                minW: widgetType.minSize.w,
                minH: widgetType.minSize.h,
              },
            }
            
            addWidget(newWidget)
            onWidgetAdd?.(newWidget)
          }
        }
      }
    } catch (error) {
      console.error('Failed to parse dropped widget data:', error)
    }
  }, [addWidget, onWidgetAdd, gridConfig.cols, gridConfig.rowHeight])

  const handleAddFirstWidget = () => {
    const widgetId = `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const firstWidget = {
      id: widgetId,
      type: 'bar-chart',
      title: 'Sample Chart',
      config: {
        data: [
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 500 },
        ]
      },
      layout: {
        i: widgetId,
        x: 0,
        y: 0,
        w: 6,
        h: 4,
        minW: 4,
        minH: 3,
      },
    }
    addWidget(firstWidget)
    onWidgetAdd?.(firstWidget)
  }

  const handleLoadSampleTemplate = () => {
    const timestamp = Date.now()
    const sampleWidgets = [
      {
        id: `widget-${timestamp}-1`,
        type: 'bar-chart',
        title: 'Sales Overview',
        config: { data: [] },
        layout: { i: `widget-${timestamp}-1`, x: 0, y: 0, w: 6, h: 4, minW: 4, minH: 3 },
      },
      {
        id: `widget-${timestamp}-2`,
        type: 'metrics',
        title: 'Key Metrics',
        config: { metrics: [] },
        layout: { i: `widget-${timestamp}-2`, x: 6, y: 0, w: 6, h: 4, minW: 4, minH: 3 },
      },
      {
        id: `widget-${timestamp}-3`,
        type: 'line-chart',
        title: 'Trends',
        config: { data: [] },
        layout: { i: `widget-${timestamp}-3`, x: 0, y: 4, w: 12, h: 4, minW: 6, minH: 3 },
      }
    ]
    
    sampleWidgets.forEach(widget => {
      addWidget(widget)
      onWidgetAdd?.(widget)
    })
  }

  // Render widgets
  const renderedWidgets = useMemo(() => {
    return widgets.map((widget: Widget) => {
      const WidgetComponent = getWidgetComponent(widget.type)
      return (
        <div key={widget.id} className="widget-container">
          <WidgetComponent
            id={widget.id || ''}
            title={widget.title}
            config={widget.config}
          />
        </div>
      )
    })
  }, [widgets])

  return (
    <div
      ref={canvasRef}
      className={`w-full h-full dashboard-grid transition-all duration-300 ${
        isDragging ? "cursor-grabbing" : ""
      } ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Scroll Hint */}
      {showScrollHint && (
        <div className="fixed bottom-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center gap-2">
            <ChevronDown className="h-4 w-4" />
            <span className="text-sm">Scroll down to add more widgets</span>
          </div>
        </div>
      )}

      <div className="p-4 h-full" style={{ minHeight: `${canvasHeight}px` }}>
        {widgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <Sparkles className="h-12 w-12 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Welcome to Your Dashboard
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-md">
                Start building your dashboard by adding widgets from the sidebar. 
                Drag and drop them to create your perfect layout.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleAddFirstWidget} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Widget
              </Button>
              <Button variant="outline" onClick={handleLoadSampleTemplate} className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Load Sample Template
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <ResponsiveGridLayout
              className="layout"
              layouts={{ lg: layout }}
              breakpoints={gridConfig.breakpoints}
              cols={gridConfig.cols}
              rowHeight={gridConfig.rowHeight}
              margin={gridConfig.margin}
              containerPadding={gridConfig.containerPadding}
              onLayoutChange={handleLayoutChange}
              onDragStart={handleDragStart}
              onDragStop={handleDragStop}
              isDraggable={config.enableDragAndDrop !== false}
              isResizable={config.enableResize !== false}
              compactType={config.compactType || "vertical"}
              preventCollision={config.preventCollision || false}
              useCSSTransforms={config.useCSSTransforms !== false}
            >
              {renderedWidgets}
            </ResponsiveGridLayout>
          </div>
        )}
      </div>
    </div>
  )
}
