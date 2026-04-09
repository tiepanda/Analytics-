'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import useChartColors from '@src/hooks/useChartColors'
import { ApexOptions } from 'apexcharts'
import { MOCK_PERFORMANCE_METRICS } from '@src/data/companyDashboard'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const PerformanceMetricsSection: React.FC = () => {
  // Cycle Time Performance Gauge
  const cycleTimeGaugeColors = useChartColors({
    chartColors: 'bg-blue-500',
    chartDarkColors: 'bg-blue-500',
  })

  const cycleTimeGaugeOptions: ApexOptions = {
    chart: {
      type: 'radialBar',
      height: 300,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: '70%',
          background: 'transparent',
        },
        track: {
          background: '#f2f2f2',
          strokeWidth: '67%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            formatter: function (val) {
              return parseInt(val.toString()) + '%'
            },
            offsetY: 10,
            fontSize: '24px',
            fontWeight: 600,
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: cycleTimeGaugeColors,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: cycleTimeGaugeColors,
    labels: ['Cycle Time %'],
  }

  const cycleTimeGaugeSeries = [MOCK_PERFORMANCE_METRICS.cycleTimeThisMonth.percentage]

  // Cycle Time Percentage YTD Gauge
  const cycleTimeYTDGaugeColors = useChartColors({
    chartColors: 'bg-green-500',
    chartDarkColors: 'bg-green-500',
  })

  const cycleTimeYTDGaugeOptions: ApexOptions = {
    chart: {
      type: 'radialBar',
      height: 300,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: '70%',
          background: 'transparent',
        },
        track: {
          background: '#f2f2f2',
          strokeWidth: '67%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            formatter: function (val) {
              return parseInt(val.toString()) + '%'
            },
            offsetY: 10,
            fontSize: '24px',
            fontWeight: 600,
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: cycleTimeYTDGaugeColors,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: cycleTimeYTDGaugeColors,
    labels: ['Cycle Time %'],
  }

  const cycleTimeYTDGaugeSeries = [MOCK_PERFORMANCE_METRICS.cycleTimeYTD.percentage]

  // Net Operating Time Line Chart
  const netOperatingTimeColors = useChartColors({
    chartColors: 'bg-blue-700,bg-green-500',
    chartDarkColors: 'bg-blue-700,bg-green-500',
  })

  const netOperatingTimeOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 300,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: MOCK_PERFORMANCE_METRICS.netOperatingTime.monthlyData.map((d) => d.month),
    },
    yaxis: {
      title: {
        text: 'Hours',
      },
    },
    colors: netOperatingTimeColors,
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toLocaleString() + ' hours'
        },
      },
    },
  }

  const netOperatingTimeSeries = [
    {
      name: 'Operating Time',
      data: MOCK_PERFORMANCE_METRICS.netOperatingTime.monthlyData.map((d) => d.operatingTime),
    },
    {
      name: 'Available Time',
      data: MOCK_PERFORMANCE_METRICS.netOperatingTime.monthlyData.map((d) => d.availableTime),
    },
  ]

  return (
    <div className="col-span-12">
      <div className="mb-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 px-4 py-2 rounded-lg">
        <h6 className="text-xl font-semibold text-gray-900 dark:text-white">
          Performance Matrics
        </h6>
      </div>
      <div className="grid grid-cols-12 gap-x-space">
        {/* Cycle Time Performance / This Month */}
        <div className="col-span-12 md:col-span-6 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Cycle Time Performance / This Month
            </h6>
            <ReactApexChart
              options={cycleTimeGaugeOptions}
              series={cycleTimeGaugeSeries}
              type="radialBar"
              height={300}
              width="100%"
            />
          </div>
        </div>

        {/* Cycle Time Percentage / YTD */}
        <div className="col-span-12 md:col-span-6 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Cycle Time Percentage / YTD
            </h6>
            <ReactApexChart
              options={cycleTimeYTDGaugeOptions}
              series={cycleTimeYTDGaugeSeries}
              type="radialBar"
              height={300}
              width="100%"
            />
          </div>
        </div>

        {/* Net Operating Time - Hours */}
        <div className="col-span-12 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Net Operating Time - Hours
            </h6>
            <div className="mb-2 flex items-center justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Month: {MOCK_PERFORMANCE_METRICS.netOperatingTime.month}</span>
              <span>YTD: {MOCK_PERFORMANCE_METRICS.netOperatingTime.ytd.toLocaleString()}</span>
            </div>
            <ReactApexChart
              options={netOperatingTimeOptions}
              series={netOperatingTimeSeries}
              type="line"
              height={300}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceMetricsSection

