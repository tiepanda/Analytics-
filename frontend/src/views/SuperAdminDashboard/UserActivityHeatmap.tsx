'use client'

import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import useChartColors from '@src/hooks/useChartColors'
import { ApexOptions } from 'apexcharts'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const UserActivityHeatmap: React.FC = () => {
    const chartId = useRef(null)
    const chartColors = '[bg-primary-500]'
    const chartsColor = useChartColors({ chartColors, chartDarkColors: '' })

    // Generate mock data for last 7 days, 24 hours each
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const hours = Array.from({ length: 24 }, (_, i) => i.toString())

    // Create series for each day (rows)
    const series = days.map((day, dayIndex) => {
        const dayData = hours.map((hour) => {
            // Simulate peak hours (9 AM - 5 PM) with higher activity
            const hourNum = parseInt(hour)
            const isPeakHour = hourNum >= 9 && hourNum <= 17
            const isWeekend = dayIndex >= 5
            const baseValue = isPeakHour ? 50 : 20
            const weekendMultiplier = isWeekend ? 0.5 : 1
            const value = Math.floor(Math.random() * baseValue * weekendMultiplier) + 10

            return {
                x: hour,
                y: value,
            }
        })
        return {
            name: day,
            data: dayData,
        }
    })

    // Calculate insights from the series data
    const allValues = series.flatMap((s) => s.data.map((d) => d.y))
    const maxValue = Math.max(...allValues)
    const maxSeries = series.find((s) => s.data.some((d) => d.y === maxValue))
    const maxDataPoint = maxSeries?.data.find((d) => d.y === maxValue)
    const avgValue = Math.round(allValues.reduce((a, b) => a + b, 0) / allValues.length)

    const options: ApexOptions = {
        chart: {
            height: 300,
            type: 'heatmap',
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '10px',
            },
        },
        colors: chartsColor,
        xaxis: {
            type: 'category',
            categories: hours,
            title: {
                text: 'Hour of Day',
            },
        },
        yaxis: {
            categories: days,
            title: {
                text: 'Day of Week',
            },
        } as any, // Type assertion needed for heatmap yaxis categories
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 0,
                useFillColorAsStroke: false,
                colorScale: {
                    ranges: [
                        {
                            from: 0,
                            to: 20,
                            name: 'Low',
                            color: '#e3f2fd',
                        },
                        {
                            from: 21,
                            to: 40,
                            name: 'Medium',
                            color: '#90caf9',
                        },
                        {
                            from: 41,
                            to: 60,
                            name: 'High',
                            color: '#42a5f5',
                        },
                        {
                            from: 61,
                            to: 100,
                            name: 'Very High',
                            color: '#1565c0',
                        },
                    ],
                },
            },
        },
        tooltip: {
            y: {
                formatter: (val: number) => {
                    return `${val} active users`
                },
            },
        },
    }

    return (
        <div className="col-span-12 lg:col-span-4 card">
            <div className="card-header">
                <h6 className="card-title">User Activity by Hour (Last 7 Days)</h6>
            </div>
            <div className="card-body">
                <ReactApexChart
                    className="!min-h-full"
                    options={options}
                    series={series}
                    type="heatmap"
                    data-chart-colors={chartColors}
                    chartId={chartId}
                    height={300}
                    width="100%"
                />
                <div className="mt-4 space-y-2 pt-4 border-t border-gray-200 dark:border-dark-700">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-dark-500">Peak Usage Time</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {maxDataPoint?.x}:00 on {maxSeries?.name}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-dark-500">Average Concurrent Users</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{avgValue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-dark-500">Peak Activity</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {maxValue} users
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserActivityHeatmap

