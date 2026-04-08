'use client'

import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import useChartColors from '@src/hooks/useChartColors'
import { ApexOptions } from 'apexcharts'
import { MOCK_LICENSES } from '@src/data/licenses'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const LicenseDistributionChart: React.FC = () => {
    const chartId = useRef(null)
    const chartColors = '[bg-blue-500, bg-green-500, bg-orange-500, bg-purple-500]'
    const chartsColor = useChartColors({ chartColors, chartDarkColors: '' })

    // Calculate license distribution
    const licenseCounts = {
        Basic: MOCK_LICENSES.filter((l) => l.licenseType === 'Basic').length,
        Standard: MOCK_LICENSES.filter((l) => l.licenseType === 'Standard').length,
        Premium: MOCK_LICENSES.filter((l) => l.licenseType === 'Premium').length,
        Enterprise: MOCK_LICENSES.filter((l) => l.licenseType === 'Enterprise').length,
    }

    const series = [licenseCounts.Basic, licenseCounts.Standard, licenseCounts.Premium, licenseCounts.Enterprise]
    const labels = ['Basic', 'Standard', 'Premium', 'Enterprise']

    const totalRevenue = MOCK_LICENSES.reduce((sum, license) => {
        return sum + (license.priceOverride || license.price)
    }, 0)

    const mostPopular = Object.entries(licenseCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0]

    const options: ApexOptions = {
        chart: {
            height: 300,
            type: 'donut',
        },
        colors: chartsColor,
        labels: labels,
        legend: {
            position: 'bottom',
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${Math.round(val)}%`,
        },
        tooltip: {
            y: {
                formatter: (val: number, opts: any) => {
                    return `${opts.w.globals.labels[opts.seriesIndex]}: ${opts.w.globals.series[opts.seriesIndex]} licenses`
                },
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '14px',
                            fontWeight: 600,
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontWeight: 700,
                        },
                        total: {
                            show: true,
                            label: 'Total Licenses',
                            formatter: () => MOCK_LICENSES.length.toString(),
                        },
                    },
                },
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    }

    return (
        <div className="col-span-12 lg:col-span-4 card">
            <div className="card-header">
                <h6 className="card-title">License Distribution by Type</h6>
            </div>
            <div className="card-body">
                <ReactApexChart
                    className="!min-h-full"
                    options={options}
                    series={series}
                    type="donut"
                    data-chart-colors={chartColors}
                    chartId={chartId}
                    height={300}
                    width="100%"
                />
                <div className="mt-4 space-y-2 pt-4 border-t border-gray-200 dark:border-dark-700">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-dark-500">Total Revenue</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            ${totalRevenue.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-dark-500">Most Popular Plan</span>
                        <span className="badge badge-purple">{mostPopular}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-dark-500">Total Licenses</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {MOCK_LICENSES.length}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LicenseDistributionChart

