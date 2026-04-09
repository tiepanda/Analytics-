'use client'

import React from 'react'
import { ShoppingCart, MapPin, FileText } from 'lucide-react'
import AnimatedCounter from '@src/views/Dashboards/AnalyticsDashboards/Counter'
import { MOCK_DASHBOARD_SUMMARY } from '@src/data/companyDashboard'

const CompanyDashboardSummaryCards: React.FC = () => {
  const { planVsInvoice, nonConformance, troubleOrder } = MOCK_DASHBOARD_SUMMARY

  return (
    <>
      {/* Plan Vs Invoice Quantity */}
      <div className="col-span-12 md:col-span-6 xl:col-span-4 relative">
        {/* Colored background layer with rounded corners */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-cyan-500 dark:from-blue-500 dark:to-cyan-600 rounded-3xl"></div>
        {/* White content layer with offset to show colored edge */}
        <div className="relative ml-1.5 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-50 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-full p-2.5 shadow-md flex-shrink-0">
              <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">
                Plan Vs Invoice Quantity
              </h2>
              <div className="flex justify-between items-center gap-3">
                <div>
                  <p className="text-cyan-600 dark:text-cyan-400 font-semibold text-xs">
                    Invoice:{' '}
                    <span className="text-lg font-bold">
                      <AnimatedCounter start={0} end={planVsInvoice.invoice} duration={2000} />
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 dark:text-blue-400 font-semibold text-xs">
                    Plan:{' '}
                    <span className="text-lg font-bold">
                      <AnimatedCounter start={0} end={planVsInvoice.plan} duration={2000} />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Non Conformance */}
      <div className="col-span-12 md:col-span-6 xl:col-span-4 relative">
        {/* Colored background layer with rounded corners */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-400 to-amber-500 dark:from-orange-500 dark:to-amber-600 rounded-3xl"></div>
        {/* White content layer with offset to show colored edge */}
        <div className="relative ml-1.5 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-100 to-amber-50 dark:from-orange-500/20 dark:to-amber-500/20 rounded-full p-2.5 shadow-md flex-shrink-0">
              <MapPin className="w-5 h-5 text-amber-700 dark:text-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold text-lime-600 dark:text-lime-400 mb-2">
                Non Conformance
              </h2>
              <p className="text-orange-600 dark:text-orange-400 font-semibold text-xs">
                Counts:{' '}
                <span className="text-xl font-bold">
                  <AnimatedCounter start={0} end={nonConformance.counts} duration={2000} />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trouble Order */}
      <div className="col-span-12 md:col-span-6 xl:col-span-4 relative">
        {/* Colored background layer with rounded corners */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-400 to-rose-500 dark:from-pink-500 dark:to-rose-600 rounded-3xl"></div>
        {/* White content layer with offset to show colored edge */}
        <div className="relative ml-1.5 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-pink-100 to-rose-50 dark:from-pink-500/20 dark:to-rose-500/20 rounded-full p-2.5 shadow-md flex-shrink-0">
              <FileText className="w-5 h-5 text-pink-700 dark:text-pink-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold text-purple-700 dark:text-purple-400 mb-2">
                Trouble Order
              </h2>
              <p className="text-rose-700 dark:text-rose-500 font-semibold text-xs">
                Count:{' '}
                <span className="text-xl font-bold">
                  <AnimatedCounter start={0} end={troubleOrder.count} duration={2000} />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompanyDashboardSummaryCards

