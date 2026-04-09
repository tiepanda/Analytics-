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

// mockMoment was unused; removed to satisfy linter

interface TimelineWidgetProps {
  id: string
  title?: string
  config?: {
    data?: { x: string; y: number[] }[]
    colors?: string[]
  }
}

export function TimelineWidget({ id, title, config }: TimelineWidgetProps) {
  const chartsColor = useChartColors({
    chartColors: config?.colors?.join(',') || 'bg-primary-500,bg-green-500',
    chartDarkColors: config?.colors?.join(',') || 'bg-primary-500,bg-green-500'
  })

  const defaultData = [
    {
      x: 'Analysis',
      y: [
        new Date('2019-02-27').getTime(),
        new Date('2019-03-04').getTime()
      ]
    },
    {
      x: 'Design',
      y: [
        new Date('2019-03-04').getTime(),
        new Date('2019-03-08').getTime()
      ]
    },
    {
      x: 'Coding',
      y: [
        new Date('2019-03-07').getTime(),
        new Date('2019-03-10').getTime()
      ]
    },
    {
      x: 'Testing',
      y: [
        new Date('2019-03-08').getTime(),
        new Date('2019-03-12').getTime()
      ]
    },
    {
      x: 'Deployment',
      y: [
        new Date('2019-03-12').getTime(),
        new Date('2019-03-17').getTime()
      ]
    }
  ]

  const data = config?.data || defaultData

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'rangeBar'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        dataLabels: {
          hideOverflowingLabels: false
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val, opts) {
        const label = opts.w.globals.labels[opts.dataPointIndex]
        if (Array.isArray(val) && val.length >= 2) {
          const dateA = new Date(val[0] as number)
          const dateB = new Date(val[1] as number)
          const diffTime = Math.abs(dateA.getTime() - dateB.getTime())
          const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          return label + ': ' + diff + (diff > 1 ? ' days' : ' day')
        }
        return label
      },
      style: {
        colors: ['#f3f4f5', '#fff']
      }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      show: false
    },
    grid: {
      row: {
        colors: ['#f3f4f5', '#fff'],
        opacity: 1
      }
    },
    colors: chartsColor,
  }

  const series = [{
    data: data
  }]

  return (
    <BaseWidget id={id} title={title || 'Timeline Chart'}>
      <div className="h-full flex items-center justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="rangeBar"
          height={350}
          width="100%"
        />
      </div>
    </BaseWidget>
  )
}
