'use client'

import React from 'react'

import { NextPageWithLayout } from '@src/dtos'
import { Zap, DollarSign, Target, Activity, Calendar, Download, RefreshCw } from 'lucide-react'

import AnimatedCounter from '@src/views/Dashboards/AnalyticsDashboards/Counter'
import { SalesRevenuechart } from '@src/views/Dashboards/AnalyticsDashboards/Chart'

// Energy Overview Widget
const EnergyOverviewWidget = () => (
  <div className="col-span-12 xl:col-span-6 2xl:col-span-4 card">
    <div className="card-body">
      <div className="flex gap-3 mb-3">
        <div className="flex items-center justify-center border-2 rounded-full text-yellow-500 ring-1 ring-offset-2 dark:ring-offset-dark-900 ring-yellow-500/20 size-12 border-yellow-500">
          <Zap className="fill-yellow-500/10" />
        </div>
        <div>
          <p className="mb-1 text-gray-500 dark:text-dark-500">
            Energy Consumption
          </p>
          <h5>
            <AnimatedCounter start={0} end={245} duration={3000} /> kW
          </h5>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-dark-500">Today&apos;s Cost</span>
          <span className="text-sm font-medium">$29.48</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-dark-500">Peak Usage</span>
          <span className="text-sm font-medium">290 kW</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-dark-500">Efficiency</span>
          <span className="text-sm font-medium text-green-500">94.2%</span>
        </div>
      </div>
    </div>
  </div>
)

// Energy Trend Chart Widget
const EnergyTrendChartWidget = () => (
  <div className="col-span-12 xl:col-span-6 2xl:col-span-8 card">
    <div className="flex flex-col gap-3 md:flex-row md:items-center card-header">
      <h6 className="card-title grow">Energy Consumption Trend</h6>
      <div className="flex items-center gap-2">
        <button className="btn btn-sm btn-outline">
          <Calendar className="inline-block size-4" />
          <span className="leading-none align-middle ml-1">Last 24 Hours</span>
        </button>
      </div>
    </div>
    <div className="card-body">
      <SalesRevenuechart
        chartColors="[bg-yellow-500, bg-orange-500, bg-red-500]"
        chartDarkColors=""
        chartId="energyTrendChart"
      />
    </div>
  </div>
)

// Cost Analysis Widget
const CostAnalysisWidget = () => (
  <div className="col-span-12 xl:col-span-6 2xl:col-span-4 card">
    <div className="card-body">
      <div className="flex gap-3 mb-3">
        <div className="flex items-center justify-center text-green-500 border-2 border-green-400 rounded-full ring-1 ring-offset-2 dark:ring-offset-dark-900 ring-green-500/20 size-12">
          <DollarSign className="fill-green-500/10" />
        </div>
        <div>
          <p className="mb-1 text-gray-500 dark:text-dark-500">
            Energy Cost Analysis
          </p>
          <h5>
            $<AnimatedCounter start={0} end={187} duration={3000} />.13
          </h5>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-dark-500">This Month</span>
          <span className="text-sm font-medium">$1,247.89</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-dark-500">Last Month</span>
          <span className="text-sm font-medium">$1,189.76</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-dark-500">Savings</span>
          <span className="text-sm font-medium text-green-500">$58.13</span>
        </div>
      </div>
    </div>
  </div>
)

// Peak Usage Widget
const PeakUsageWidget = () => (
  <div className="col-span-12 xl:col-span-6 2xl:col-span-4 card">
    <div className="card-body">
      <div className="flex gap-3 mb-3">
        <div className="flex items-center justify-center text-purple-500 border-2 border-purple-400 rounded-full ring-1 ring-offset-2 dark:ring-offset-dark-900 ring-purple-500/20 size-12">
          <Target className="fill-purple-500/10" />
        </div>
        <div>
          <p className="mb-1 text-gray-500 dark:text-dark-500">
            Peak Usage Analysis
          </p>
          <h5>
            <AnimatedCounter start={0} end={290} duration={3000} /> kW Peak
          </h5>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-dark-500">Morning Peak</span>
          <span className="text-sm font-medium">8:00 - 10:00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-dark-500">Afternoon Peak</span>
          <span className="text-sm font-medium">14:00 - 16:00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-dark-500">Efficiency Target</span>
          <span className="text-sm font-medium text-green-500">95%</span>
        </div>
      </div>
    </div>
  </div>
)

// Energy Distribution Widget
const EnergyDistributionWidget = () => (
  <div className="col-span-12 xl:col-span-6 2xl:col-span-4 card">
    <div className="card-body">
      <div className="flex gap-3 mb-3">
        <div className="flex items-center justify-center text-blue-500 border-2 border-blue-400 rounded-full ring-1 ring-offset-2 dark:ring-offset-dark-900 ring-blue-500/20 size-12">
          <Activity className="fill-blue-500/10" />
        </div>
        <div>
          <p className="mb-1 text-gray-500 dark:text-dark-500">
            Energy Distribution
          </p>
          <h5>
            <AnimatedCounter start={0} end={85} duration={3000} />% Optimized
          </h5>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
          <span className="text-sm">Production Lines</span>
          <span className="text-sm font-medium text-green-500">45%</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
          <span className="text-sm">HVAC Systems</span>
          <span className="text-sm font-medium text-blue-500">25%</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
          <span className="text-sm">Lighting</span>
          <span className="text-sm font-medium text-yellow-500">20%</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
          <span className="text-sm">Other Equipment</span>
          <span className="text-sm font-medium text-purple-500">10%</span>
        </div>
      </div>
    </div>
  </div>
)

const EnergyOverviewPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-xl font-medium text-gray-800 dark:text-white mb-1">
            Energy Overview
          </h4>
          <p className="text-gray-500 dark:text-dark-500">
            Real-time energy consumption monitoring and cost analysis across all facilities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-sm btn-outline">
            <RefreshCw className="inline-block size-4" />
            <span className="leading-none align-middle ml-1">Refresh</span>
          </button>
          <button className="btn btn-sm btn-primary">
            <Download className="inline-block size-4" />
            <span className="leading-none align-middle ml-1">Export Report</span>
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Energy Overview */}
        <EnergyOverviewWidget />

        {/* Energy Trend Chart */}
        <EnergyTrendChartWidget />

        {/* Cost Analysis */}
        <CostAnalysisWidget />

        {/* Peak Usage Analysis */}
        <PeakUsageWidget />

        {/* Energy Distribution */}
        <EnergyDistributionWidget />
      </div>
    </React.Fragment>
  )
}

export default EnergyOverviewPage
