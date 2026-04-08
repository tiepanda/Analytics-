'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import useChartColors from '@src/hooks/useChartColors'
import { ApexOptions } from 'apexcharts'
import { BaseWidget } from './BaseWidget'

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

interface HeatmapWidgetProps {
  id: string
  title?: string
  config?: {
    data?: { name: string; data: { x: string; y: number }[] }[]
    colors?: string[]
  }
}

export function HeatmapWidget({ id, title, config }: HeatmapWidgetProps) {
  const chartsColor = useChartColors({
    chartColors: config?.colors?.[0] || 'bg-primary-500',
    chartDarkColors: config?.colors?.[0] || 'bg-primary-500'
  })

  const generateData = (count: number, yrange: { min: number; max: number }) => {
    const series = []
    for (let i = 0; i < count; i++) {
      const x = `Machine ${i + 1}`
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
      series.push({ x, y })
    }
    return series
  }

  const defaultData = [
    {
      name: 'Mon',
      data: generateData(12, { min: 0, max: 90 })
    },
    {
      name: 'Tue',
      data: generateData(12, { min: 0, max: 90 })
    },
    {
      name: 'Wed',
      data: generateData(12, { min: 0, max: 90 })
    },
    {
      name: 'Thu',
      data: generateData(12, { min: 0, max: 90 })
    },
    {
      name: 'Fri',
      data: generateData(12, { min: 0, max: 90 })
    },
    {
      name: 'Sat',
      data: generateData(12, { min: 0, max: 90 })
    },
    {
      name: 'Sun',
      data: generateData(12, { min: 0, max: 90 })
    }
  ]

  const data = config?.data || defaultData

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    colors: chartsColor,
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 30,
              color: chartsColor[0] || '#00A100'
            },
            {
              from: 31,
              to: 60,
              color: chartsColor[1] || '#128FD9'
            },
            {
              from: 61,
              to: 90,
              color: chartsColor[2] || '#FFB200'
            }
          ]
        }
      }
    },
    xaxis: {
      type: 'category',
    },
    title: {
      text: 'Machine Performance Heatmap'
    },
    grid: {
      padding: {
        right: 20
      }
    }
  }

  return (
    <BaseWidget id={id} title={title || 'Heatmap'}>
      <div className="h-full flex items-center justify-center">
        <ReactApexChart
          options={options}
          series={data}
          type="heatmap"
          height={350}
          width="100%"
        />
      </div>
    </BaseWidget>
  )
}
