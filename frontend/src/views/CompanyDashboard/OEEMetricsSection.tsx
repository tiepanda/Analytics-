'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import useChartColors from '@src/hooks/useChartColors'
import { ApexOptions } from 'apexcharts'
import { MOCK_OEE_DATA, MOCK_DOWN_TIME_LOSS } from '@src/data/companyDashboard'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const OEEMetricsSection: React.FC = () => {
  // OEE Bar Chart Colors
  const oeeBarColors = useChartColors({
    chartColors: 'bg-primary-500',
    chartDarkColors: 'bg-primary-500',
  })

  const oeeBarOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: MOCK_OEE_DATA.monthlyData.map((d) => d.month),
    },
    yaxis: {
      title: {
        text: 'OEE %',
      },
    },
    fill: {
      opacity: 1,
    },
    colors: oeeBarColors,
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '%'
        },
      },
    },
  }

  const oeeBarSeries = [
    {
      name: 'OEE',
      data: MOCK_OEE_DATA.monthlyData.map((d) => d.value),
    },
  ]

  // DownTime Loss Line Chart Colors
  const downTimeLineColors = useChartColors({
    chartColors: 'bg-red-500',
    chartDarkColors: 'bg-red-500',
  })

  const downTimeLineOptions: ApexOptions = {
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
      categories: MOCK_DOWN_TIME_LOSS.monthlyData.map((d) => d.month),
    },
    yaxis: {
      title: {
        text: 'Hours',
      },
    },
    colors: downTimeLineColors,
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' hours'
        },
      },
    },
  }

  const downTimeLineSeries = [
    {
      name: 'DownTime Loss',
      data: MOCK_DOWN_TIME_LOSS.monthlyData.map((d) => d.hours),
    },
  ]

  // Machines Percentage Gauge
  const machinesGaugeColors = useChartColors({
    chartColors: 'bg-green-500,bg-yellow-500,bg-red-500',
    chartDarkColors: 'bg-green-500,bg-yellow-500,bg-red-500',
  })

  const machinesGaugeOptions: ApexOptions = {
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
        gradientToColors: machinesGaugeColors,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: machinesGaugeColors,
    labels: ['Machines %'],
  }

  const machinesGaugeSeries = [24]

  // Down Time Percentage Gauge
  const downTimeGaugeColors = useChartColors({
    chartColors: 'bg-purple-500,bg-purple-300',
    chartDarkColors: 'bg-purple-500,bg-purple-300',
  })

  const downTimeGaugeOptions: ApexOptions = {
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
        gradientToColors: downTimeGaugeColors,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: downTimeGaugeColors,
    labels: ['Down Time %'],
  }

  const downTimeGaugeSeries = [24]

  return (
    <div className="col-span-12">
      <div className="mb-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 px-4 py-2 rounded-lg">
        <h6 className="text-xl font-semibold text-gray-900 dark:text-white">
          Overall Equipment Effectiveness Metrics
        </h6>
      </div>
      <div className="grid grid-cols-12 gap-x-space">
        {/* Overall Equipment Effectiveness */}
        <div className="col-span-12 lg:col-span-6 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Overall Equipment Effectiveness
            </h6>
            <div className="mb-2 flex items-center justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Month: {MOCK_OEE_DATA.month}</span>
              <span>YTD: {MOCK_OEE_DATA.ytd}%</span>
            </div>
            <ReactApexChart
              options={oeeBarOptions}
              series={oeeBarSeries}
              type="bar"
              height={300}
              width="100%"
            />
          </div>
        </div>

        {/* DownTime Loss - Hours */}
        <div className="col-span-12 lg:col-span-6 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              DownTime Loss - Hours
            </h6>
            <div className="mb-2 flex items-center justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Month: {MOCK_DOWN_TIME_LOSS.month}</span>
              <span>YTD: {MOCK_DOWN_TIME_LOSS.ytd}</span>
            </div>
            <ReactApexChart
              options={downTimeLineOptions}
              series={downTimeLineSeries}
              type="line"
              height={300}
              width="100%"
            />
          </div>
        </div>

        {/* Machines in Percentage / This Month */}
        <div className="col-span-12 md:col-span-6 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Machines in Percentage / This Month
            </h6>
            <ReactApexChart
              options={machinesGaugeOptions}
              series={machinesGaugeSeries}
              type="radialBar"
              height={300}
              width="100%"
            />
          </div>
        </div>

        {/* Down Time Percentage / YTD */}
        <div className="col-span-12 md:col-span-6 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Down Time Percentage / YTD
            </h6>
            <ReactApexChart
              options={downTimeGaugeOptions}
              series={downTimeGaugeSeries}
              type="radialBar"
              height={300}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OEEMetricsSection

