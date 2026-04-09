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

interface RadarChartWidgetProps {
  id: string
  title?: string
  config?: {
    categories?: string[]
    series?: { name: string; data: number[] }[]
    colors?: string[]
  }
}

export function RadarChartWidget({ id, title, config }: RadarChartWidgetProps) {
  const chartsColor = useChartColors({
    chartColors: config?.colors?.join(',') || 'bg-primary-500,bg-green-500,bg-orange-500',
    chartDarkColors: config?.colors?.join(',') || 'bg-primary-500,bg-green-500,bg-orange-500'
  })

  const defaultCategories = ['Performance', 'Quality', 'Efficiency', 'Availability', 'OEE']
  const defaultSeries = [
    {
      name: 'Machine A',
      data: [80, 75, 85, 90, 82]
    },
    {
      name: 'Machine B',
      data: [70, 85, 75, 80, 78]
    }
  ]

  const categories = config?.categories || defaultCategories
  const series = config?.series || defaultSeries

  const options: ApexOptions = {
    chart: {
      type: 'radar',
      height: 300,
    },
    colors: chartsColor,
    xaxis: {
      categories: categories,
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: function(val) {
          return val.toFixed(0) + '%'
        }
      }
    },
    markers: {
      size: 4,
      colors: chartsColor,
      strokeColors: chartsColor,
      strokeWidth: 2,
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + '%'
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: chartsColor,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.2,
        stops: [0, 100]
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: chartsColor,
      dashArray: 0
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: 'rgba(255, 255, 255, 0.1)',
          fill: {
            colors: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.01)']
          }
        }
      }
    }
  }

  return (
    <BaseWidget id={id} title={title || 'Radar Chart'}>
      <div className="h-full flex items-center justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="radar"
          height={300}
          width="100%"
        />
      </div>
    </BaseWidget>
  )
}
