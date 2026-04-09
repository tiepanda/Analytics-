'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import useChartColors from '@src/hooks/useChartColors'
import { ApexOptions } from 'apexcharts'
import AnimatedCounter from '@src/views/Dashboards/AnalyticsDashboards/Counter'
import {
  MOCK_PRODUCTION_VOLUME,
  MOCK_MACHINE_STATUS,
  MOCK_MACHINES_IN_PRODUCTION,
  MOCK_DOWN_TIME,
} from '@src/data/companyDashboard'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const OperationalMetricsWidgets: React.FC = () => {
  // Production Volume Chart
  const productionVolumeColors = useChartColors({
    chartColors: 'bg-blue-500,bg-blue-700,bg-blue-300',
    chartDarkColors: 'bg-blue-500,bg-blue-700,bg-blue-300',
  })

  const productionVolumeOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 160,
    },
    labels: ['OK', 'NC', 'Scrap'],
    colors: productionVolumeColors,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' units'
        },
      },
    },
  }

  const productionVolumeSeries = [
    MOCK_PRODUCTION_VOLUME.ok,
    MOCK_PRODUCTION_VOLUME.nc,
    MOCK_PRODUCTION_VOLUME.scrap,
  ]

  // Machines Active Chart
  const machinesActiveColors = useChartColors({
    chartColors: 'bg-green-500,bg-yellow-500,bg-red-500,bg-blue-700',
    chartDarkColors: 'bg-green-500,bg-yellow-500,bg-red-500,bg-blue-700',
  })

  const machinesActiveOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 160,
    },
    labels: ['Active', 'Idle', 'Maintenance', 'Others'],
    colors: machinesActiveColors,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  }

  const machinesActiveSeries = [
    MOCK_MACHINE_STATUS.active,
    MOCK_MACHINE_STATUS.idle,
    MOCK_MACHINE_STATUS.maintenance,
    MOCK_MACHINE_STATUS.others,
  ]

  // Machines in Production Chart
  const machinesInProductionColors = useChartColors({
    chartColors: 'bg-green-500,bg-yellow-500',
    chartDarkColors: 'bg-green-500,bg-yellow-500',
  })

  const machinesInProductionOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 160,
    },
    labels: ['Cycle', 'No Active'],
    colors: machinesInProductionColors,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  }

  const machinesInProductionSeries = [
    MOCK_MACHINES_IN_PRODUCTION.cycle,
    MOCK_MACHINES_IN_PRODUCTION.noActive,
  ]

  // Down Time Chart
  const downTimeColors = useChartColors({
    chartColors: 'bg-blue-500,bg-yellow-500',
    chartDarkColors: 'bg-blue-500,bg-yellow-500',
  })

  const downTimeOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 160,
    },
    labels: ['Maintenance idle', 'No Load'],
    colors: downTimeColors,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  }

  const downTimeSeries = [MOCK_DOWN_TIME.maintenanceIdle, MOCK_DOWN_TIME.noLoad]

  return (
    <>
      {/* Production Volume */}
      <div className="col-span-12 md:col-span-6 xl:col-span-3 card rounded-xl shadow-md dark:shadow-lg">
        <div className="card-body py-4">
          <h6 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            Production Volume
          </h6>
          <div className="mb-3">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">
              <AnimatedCounter start={0} end={MOCK_PRODUCTION_VOLUME.total} duration={2000} />
            </h5>
          </div>
          <div className="relative flex items-center justify-center mb-3">
            <div className="w-full max-w-[160px]">
              <ReactApexChart
                options={productionVolumeOptions}
                series={productionVolumeSeries}
                type="donut"
                height={160}
                width="100%"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {MOCK_PRODUCTION_VOLUME.okPercentage}%
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-blue-500 shrink-0"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">OK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-blue-700 shrink-0"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">NC</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-blue-300 shrink-0"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Scrap</span>
            </div>
          </div>
        </div>
      </div>

      {/* Machines Active */}
      <div className="col-span-12 md:col-span-6 xl:col-span-3 card rounded-xl shadow-md dark:shadow-lg">
        <div className="card-body py-4">
          <h6 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            Machines Active
          </h6>
          <div className="mb-3">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">
              {MOCK_MACHINE_STATUS.active} / {MOCK_MACHINE_STATUS.total}
            </h5>
          </div>
          <div className="relative flex items-center justify-center mb-3">
            <div className="w-full max-w-[160px]">
              <ReactApexChart
                options={machinesActiveOptions}
                series={machinesActiveSeries}
                type="donut"
                height={160}
                width="100%"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {MOCK_MACHINE_STATUS.activePercentage}%
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-green-500 shrink-0"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-yellow-500 shrink-0"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Idle</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-red-500 shrink-0"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Maintenance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-blue-700 shrink-0"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Others</span>
            </div>
          </div>
        </div>
      </div>

      {/* Machines in Production */}
      <div className="col-span-12 md:col-span-6 xl:col-span-3 card rounded-xl shadow-md dark:shadow-lg">
        <div className="card-body py-4">
          <h6 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            Machines in Production
          </h6>
          <div className="mb-3">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">
              {MOCK_MACHINES_IN_PRODUCTION.cycle} / {MOCK_MACHINES_IN_PRODUCTION.total}
            </h5>
          </div>
          <div className="relative flex items-center justify-center mb-3">
            <div className="w-full max-w-[160px]">
              <ReactApexChart
                options={machinesInProductionOptions}
                series={machinesInProductionSeries}
                type="donut"
                height={160}
                width="100%"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {MOCK_MACHINES_IN_PRODUCTION.cyclePercentage}%
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-green-500 shrink-0"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Cycle</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-yellow-500 shrink-0"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">No Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Down Time */}
      <div className="col-span-12 md:col-span-6 xl:col-span-3 card rounded-xl shadow-md dark:shadow-lg">
        <div className="card-body py-4">
          <h6 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Down Time</h6>
          <div className="mb-3">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">
              <AnimatedCounter start={0} end={MOCK_DOWN_TIME.total} duration={2000} /> h
            </h5>
          </div>
          <div className="relative flex items-center justify-center mb-3">
            <div className="w-full max-w-[160px]">
              <ReactApexChart
                options={downTimeOptions}
                series={downTimeSeries}
                type="donut"
                height={160}
                width="100%"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {MOCK_DOWN_TIME.maintenanceIdleHours}h
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-blue-500 shrink-0"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Maintenance idle</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-yellow-500 shrink-0"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">No Load</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OperationalMetricsWidgets

