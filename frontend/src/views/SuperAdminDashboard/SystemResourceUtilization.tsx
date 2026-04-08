'use client'

import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import useChartColors from '@src/hooks/useChartColors'
import { ApexOptions } from 'apexcharts'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const SystemResourceUtilization: React.FC = () => {
    const chartId = useRef(null)
    const chartColors = '[bg-blue-500, bg-green-500, bg-orange-500, bg-purple-500]'
    const chartsColor = useChartColors({ chartColors, chartDarkColors: '' })

    // Generate mock data for last 24 hours (hourly data points)
    const generateHourlyData = () => {
        const hours = []
        const cpuData = []
        const memoryData = []
        const diskData = []
        const networkData = []

        for (let i = 23; i >= 0; i--) {
            const hour = new Date()
            hour.setHours(hour.getHours() - i)
            hours.push(hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))

            // Generate realistic data with some variation
            cpuData.push(Math.floor(Math.random() * 30) + 40) // 40-70%
            memoryData.push(Math.floor(Math.random() * 25) + 50) // 50-75%
            diskData.push(Math.floor(Math.random() * 20) + 60) // 60-80%
            networkData.push(Math.floor(Math.random() * 50) + 20) // 20-70 MB/s
        }

        return { hours, cpuData, memoryData, diskData, networkData }
    }

    const { hours, cpuData, memoryData, diskData, networkData } = generateHourlyData()

    const series = [
        {
            name: 'CPU Usage',
            data: cpuData,
        },
        {
            name: 'Memory Usage',
            data: memoryData,
        },
        {
            name: 'Disk Usage',
            data: diskData,
        },
        {
            name: 'Network I/O',
            data: networkData,
        },
    ]

    const options: ApexOptions = {
        chart: {
            height: 300,
            type: 'line',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: chartsColor,
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        grid: {
            row: {
                colors: ['transparent'],
                opacity: 0.5,
            },
            padding: {
                top: 0,
                right: 5,
                bottom: 0,
            },
        },
        xaxis: {
            categories: hours,
            labels: {
                rotate: -45,
                rotateAlways: false,
            },
        },
        yaxis: [
            {
                title: {
                    text: 'Usage (%)',
                },
                min: 0,
                max: 100,
            },
            {
                opposite: true,
                title: {
                    text: 'Network (MB/s)',
                },
                min: 0,
                max: 100,
            },
        ],
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (val: number, { seriesIndex }: any) => {
                    if (seriesIndex === 3) {
                        return `${val} MB/s`
                    }
                    return `${val}%`
                },
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
        },
        annotations: {
            yaxis: [
                {
                    y: 80,
                    borderColor: '#f59e0b',
                    label: {
                        text: 'Warning (80%)',
                        style: {
                            color: '#fff',
                            background: '#f59e0b',
                        },
                    },
                },
                {
                    y: 95,
                    borderColor: '#ef4444',
                    label: {
                        text: 'Critical (95%)',
                        style: {
                            color: '#fff',
                            background: '#ef4444',
                        },
                    },
                },
            ],
        },
    }

    return (
        <div className="col-span-12 lg:col-span-4 card">
            <div className="card-header">
                <div className="flex items-center justify-between">
                    <h6 className="card-title">System Resource Utilization</h6>
                    <span className="text-xs text-gray-500 dark:text-dark-500">Last 24 hours</span>
                </div>
            </div>
            <div className="card-body">
                <ReactApexChart
                    className="!min-h-full"
                    options={options}
                    series={series}
                    type="line"
                    data-chart-colors={chartColors}
                    chartId={chartId}
                    height={300}
                    width="100%"
                />
            </div>
        </div>
    )
}

export default SystemResourceUtilization

