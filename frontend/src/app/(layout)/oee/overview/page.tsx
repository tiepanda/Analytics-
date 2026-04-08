'use client'

import React from 'react'

import { NextPageWithLayout } from '@src/dtos'
import { Target, Clock, TrendingUp, Gauge, BarChart3, Calendar, Download, RefreshCw } from 'lucide-react'

import AnimatedCounter from '@src/views/Dashboards/AnalyticsDashboards/Counter'
import { SalesRevenuechart } from '@src/views/Dashboards/AnalyticsDashboards/Chart'

// OEE Overview Widget
const OEEOverviewWidget = () => (
  <div className="col-span-12 xl:col-span-6 2xl:col-span-4 card">
    <div className="card-body">
      <div className="flex gap-3 mb-3">
        <div className="flex items-center justify-center border-2 rounded-full text-green-500 ring-1 ring-offset-2 dark:ring-offset-dark-900 ring-green-500/20 size-12 border-green-500">
          <Target className="fill-green-500/10" />
        </div>
        <div>
          <p className="mb-1 text-gray-500 dark:text-dark-500">
            Overall OEE
          </p>
          <h5>
            <AnimatedCounter start={0} end={78} duration={3000} />%
          </h5>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Availability</span>
          </div>
          <span className="text-sm font-medium">85.2%</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <span className="text-sm">Performance</span>
          </div>
          <span className="text-sm font-medium">92.1%</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-green-500" />
            <span className="text-sm">Quality</span>
          </div>
          <span className="text-sm font-medium">85.7%</span>
        </div>
      </div>
    </div>
  </div>
)

// OEE Trend Chart Widget
const OEETrenChartWidget = () => (
  <div className="col-span-12 xl:col-span-6 2xl:col-span-8 card">
    <div className="flex flex-col gap-3 md:flex-row md:items-center card-header">
      <h6 className="card-title grow">OEE Trend Analysis</h6>
      <div className="flex items-center gap-2">
        <button className="btn btn-sm btn-outline">
          <Calendar className="inline-block size-4" />
          <span className="leading-none align-middle ml-1">Last 30 Days</span>
        </button>
      </div>
    </div>
    <div className="card-body">
      <SalesRevenuechart
        chartColors="[bg-green-500, bg-blue-500, bg-orange-500, bg-red-500]"
        chartDarkColors=""
        chartId="oeeTrendChart"
      />
    </div>
  </div>
)

// Machine Performance Widget
const MachinePerformanceWidget = () => (
  <div className="col-span-12 xl:col-span-6 2xl:col-span-4 card">
    <div className="card-body">
      <div className="flex gap-3 mb-3">
        <div className="flex items-center justify-center text-blue-500 border-2 border-blue-400 rounded-full ring-1 ring-offset-2 dark:ring-offset-dark-900 ring-blue-500/20 size-12">
          <BarChart3 className="fill-blue-500/10" />
        </div>
        <div>
          <p className="mb-1 text-gray-500 dark:text-dark-500">
            Machine Performance
          </p>
          <h5>
            <AnimatedCounter start={0} end={5} duration={3000} /> machines monitored
          </h5>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
          <span className="text-sm">M001 - CNC Machine</span>
          <span className="text-sm font-medium text-green-500">82.1%</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
          <span className="text-sm">M002 - Assembly Line</span>
          <span className="text-sm font-medium text-yellow-500">75.3%</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
          <span className="text-sm">M003 - Packaging</span>
          <span className="text-sm font-medium text-green-500">79.8%</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
          <span className="text-sm">M004 - Quality Check</span>
          <span className="text-sm font-medium text-red-500">71.2%</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
          <span className="text-sm">M005 - Final Assembly</span>
          <span className="text-sm font-medium text-green-500">84.5%</span>
        </div>
      </div>
    </div>
  </div>
)

const OEEOverviewPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-xl font-medium text-gray-800 dark:text-white mb-1">
            OEE Overview
          </h4>
          <p className="text-gray-500 dark:text-dark-500">
            Comprehensive view of Overall Equipment Effectiveness across all production lines
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
        {/* OEE Overview */}
        <OEEOverviewWidget />

        {/* OEE Trend Chart */}
        <OEETrenChartWidget />

        {/* Machine Performance */}
        <MachinePerformanceWidget />
      </div>
    </React.Fragment>
  )
}

export default OEEOverviewPage
