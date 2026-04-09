'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import useChartColors from '@src/hooks/useChartColors'
import { ApexOptions } from 'apexcharts'
import { MOCK_AVAILABILITY_METRICS } from '@src/data/companyDashboard'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const AvailabilityMetricsSection: React.FC = () => {
  // Planned Production Time Line Chart
  const plannedProductionColors = useChartColors({
    chartColors: 'bg-primary-500',
    chartDarkColors: 'bg-primary-500',
  })

  const plannedProductionOptions: ApexOptions = {
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
      categories: MOCK_AVAILABILITY_METRICS.plannedProductionTime.monthlyData.map(
        (d) => d.month
      ),
    },
    yaxis: {
      title: {
        text: 'Hours',
      },
    },
    colors: plannedProductionColors,
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' hours'
        },
      },
    },
  }

  const plannedProductionSeries = [
    {
      name: 'Planned Production Time',
      data: MOCK_AVAILABILITY_METRICS.plannedProductionTime.monthlyData.map((d) => d.hours),
    },
  ]

  // Availability Donut
  const availabilityColors = useChartColors({
    chartColors: 'bg-gray-400,bg-gray-200',
    chartDarkColors: 'bg-gray-400,bg-gray-200',
  })

  const availabilityOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 250,
    },
    labels: ['Available', 'Not Available'],
    colors: availabilityColors,
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

  const availabilitySeries = [
    MOCK_AVAILABILITY_METRICS.availabilityThisMonth.percentage,
    100 - MOCK_AVAILABILITY_METRICS.availabilityThisMonth.percentage,
  ]

  // Down Time Percentage YTD Donut
  const downTimeYTDColors = useChartColors({
    chartColors: 'bg-gray-400,bg-gray-200',
    chartDarkColors: 'bg-gray-400,bg-gray-200',
  })

  const downTimeYTDOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 250,
    },
    labels: ['Down Time', 'Available'],
    colors: downTimeYTDColors,
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

  const downTimeYTDSeries = [
    MOCK_AVAILABILITY_METRICS.downTimePercentageYTD.percentage,
    100 - MOCK_AVAILABILITY_METRICS.downTimePercentageYTD.percentage,
  ]

  return (
    <div className="col-span-12">
      <div className="mb-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 px-4 py-2 rounded-lg">
        <h6 className="text-xl font-semibold text-gray-900 dark:text-white">
          Availability Matrics
        </h6>
      </div>
      <div className="grid grid-cols-12 gap-x-space">
        {/* Planned Production Time - Hours */}
        <div className="col-span-12 lg:col-span-6 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Planned Production Time - Hours
            </h6>
            <div className="mb-2 flex items-center justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Month: {MOCK_AVAILABILITY_METRICS.plannedProductionTime.month}</span>
              <span>YTD: {MOCK_AVAILABILITY_METRICS.plannedProductionTime.ytd}</span>
            </div>
            <ReactApexChart
              options={plannedProductionOptions}
              series={plannedProductionSeries}
              type="line"
              height={300}
              width="100%"
            />
          </div>
        </div>

        {/* Availability / This Month */}
        <div className="col-span-12 md:col-span-6 card rounded-xl shadow-md dark:shadow-lg">
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Availability / This Month
            </h6>
            <div className="flex items-center justify-center">
              <div className="relative">
                <ReactApexChart
                  options={availabilityOptions}
                  series={availabilitySeries}
                  type="donut"
                  height={250}
                  width="100%"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {MOCK_AVAILABILITY_METRICS.availabilityThisMonth.percentage}%
                    </div>
                  </div>
                </div>
              </div>
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
                  options={downTimeYTDOptions}
                  series={downTimeYTDSeries}
                  type="donut"
                  height={250}
                  width="100%"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {MOCK_AVAILABILITY_METRICS.downTimePercentageYTD.percentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvailabilityMetricsSection

