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

interface GaugeWidgetProps {
  id: string
  title?: string
  config?: {
    value?: number
    max?: number
    label?: string
    colors?: string[]
    type?: 'radialBar' | 'semiGauge'
  }
}

export function GaugeWidget({ id, title, config }: GaugeWidgetProps) {
  const chartsColor = useChartColors({
    chartColors: config?.colors?.[0] || 'bg-primary-500',
    chartDarkColors: config?.colors?.[0] || 'bg-primary-500'
  })

  const value = config?.value || 75
  const max = config?.max || 100
  const label = config?.label || 'Performance'
  const chartType = 'radialBar' // Only radialBar is supported

  const options: ApexOptions = {
    chart: {
      type: chartType,
      height: 280,
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: '70%',
          background: 'transparent',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#f2f2f2',
          strokeWidth: '67%',
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: function(val) {
              return parseInt(val.toString()) + '%'
            },
            color: '#111',
            fontSize: '36px',
            show: true,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: chartsColor,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: [label],
    colors: chartsColor,
  }

  const series = [Math.round((value / max) * 100)]

  return (
    <BaseWidget id={id} title={title || 'Gauge Chart'}>
      <div className="h-full flex items-center justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={280}
          width="100%"
        />
      </div>
    </BaseWidget>
  )
}
