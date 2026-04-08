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

interface PieChartWidgetProps {
  id: string
  title?: string
  config?: {
    data?: { name: string; value: number }[]
    colors?: string[]
    type?: 'pie' | 'donut'
  }
}

export function PieChartWidget({ id, title, config }: PieChartWidgetProps) {
  const chartsColor = useChartColors({
    chartColors: config?.colors?.join(',') || 'bg-primary-500,bg-green-500,bg-orange-500,bg-red-500,bg-purple-500',
    chartDarkColors: config?.colors?.join(',') || 'bg-primary-500,bg-green-500,bg-orange-500,bg-red-500,bg-purple-500'
  })

  const defaultData = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 30 },
    { name: 'Tablet', value: 15 },
    { name: 'Other', value: 10 },
  ]

  const data = config?.data || defaultData
  const chartType = config?.type || 'donut'

  const options: ApexOptions = {
    chart: {
      type: chartType,
      height: 300,
    },
    labels: data.map(item => item.name),
    colors: chartsColor,
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    plotOptions: {
      pie: {
        donut: {
          size: chartType === 'donut' ? '65%' : '0%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + '%'
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  const series = data.map(item => item.value)

  return (
    <BaseWidget id={id} title={title || 'Pie Chart'}>
      <div className="h-full flex items-center justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type={chartType}
          height={300}
          width="100%"
        />
      </div>
    </BaseWidget>
  )
}
