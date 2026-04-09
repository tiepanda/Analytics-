'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import useChartColors from '@src/hooks/useChartColors'
import { ApexOptions } from 'apexcharts'
import { MOCK_QUALITY_METRICS } from '@src/data/companyDashboard'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const QualityMetricsSection: React.FC = () => {
  // OEE Trend Line Chart
  const oeeTrendColors = useChartColors({
    chartColors: 'bg-primary-500',
    chartDarkColors: 'bg-primary-500',
  })

  const oeeTrendOptions: ApexOptions = {
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
      categories: MOCK_QUALITY_METRICS.oeeTrend.monthlyData.map((d) => d.month),
    },
    yaxis: {
      title: {
        text: 'OEE Value',
      },
    },
    colors: oeeTrendColors,
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toLocaleString()
        },
      },
    },
  }

  const oeeTrendSeries = [
    {
      name: 'OEE',
      data: MOCK_QUALITY_METRICS.oeeTrend.monthlyData.map((d) => d.value),
    },
  ]

  // Parts Quality Donut
  const partsQualityColors = useChartColors({
    chartColors: 'bg-green-500,bg-gray-200',
    chartDarkColors: 'bg-green-500,bg-gray-200',
  })

  const partsQualityOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 250,
    },
    labels: ['OK', 'Not OK'],
    colors: partsQualityColors,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  }

  const partsQualitySeries = [
    MOCK_QUALITY_METRICS.partsQuality.percentage,
    100 - MOCK_QUALITY_METRICS.partsQuality.percentage,
  ]

  // Down Time Percentage Donut
  const downTimePercentageColors = useChartColors({
    chartColors: 'bg-blue-500,bg-gray-200',
    chartDarkColors: 'bg-blue-500,bg-gray-200',
  })

  const downTimePercentageOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 250,
    },
    labels: ['OK', 'Not OK'],
    colors: downTimePercentageColors,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  }

  const downTimePercentageSeries = [
    MOCK_QUALITY_METRICS.downTimePercentage.percentage,
    100 - MOCK_QUALITY_METRICS.downTimePercentage.percentage,
  ]

  return (
    <div className="col-span-12">
      <div className="mb-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 px-4 py-2 rounded-lg">
        <h6 className="text-xl font-semibold text-gray-900 dark:text-white">Quality Matrics</h6>
      </div>
      <div className="grid grid-cols-12 gap-x-space">
        {/* Overall Equipment Effectiveness */}
        <div className="col-span-12 lg:col-span-6 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Overall Equipment Effectiveness
            </h6>
            <div className="mb-2 flex items-center justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Month: {MOCK_QUALITY_METRICS.oeeTrend.month}</span>
              <span>YTD: {MOCK_QUALITY_METRICS.oeeTrend.ytd.toLocaleString()}</span>
            </div>
            <ReactApexChart
              options={oeeTrendOptions}
              series={oeeTrendSeries}
              type="line"
              height={300}
              width="100%"
            />
          </div>
        </div>

        {/* Parts Quality / This Month */}
        <div className="col-span-12 md:col-span-6 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Parts Quality / This Month
            </h6>
            <div className="flex items-center justify-center">
              <div className="relative">
                <ReactApexChart
                  options={partsQualityOptions}
                  series={partsQualitySeries}
                  type="donut"
                  height={250}
                  width="100%"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {MOCK_QUALITY_METRICS.partsQuality.percentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="size-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">OK</span>
            </div>
          </div>
        </div>

        {/* Down Time Percentage / YTD */}
        <div className="col-span-12 md:col-span-6 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Down Time Percentage / YTD
            </h6>
            <div className="flex items-center justify-center">
              <div className="relative">
                <ReactApexChart
                  options={downTimePercentageOptions}
                  series={downTimePercentageSeries}
                  type="donut"
                  height={250}
                  width="100%"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {MOCK_QUALITY_METRICS.downTimePercentage.percentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="size-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QualityMetricsSection

