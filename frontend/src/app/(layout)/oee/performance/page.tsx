'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@src/components/ui/card'
import { Badge } from '@src/components/ui/badge'
import { Button } from '@src/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@src/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@src/components/ui/select'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Activity,
  Target,
  Clock,
  Gauge,
  AlertTriangle,
  CheckCircle,
  Download,
} from 'lucide-react'

// Mock performance data
const mockPerformanceData = {
  speedAnalysis: [
    { time: '00:00', actual: 95, target: 100, ideal: 100 },
    { time: '01:00', actual: 92, target: 100, ideal: 100 },
    { time: '02:00', actual: 88, target: 100, ideal: 100 },
    { time: '03:00', actual: 94, target: 100, ideal: 100 },
    { time: '04:00', actual: 97, target: 100, ideal: 100 },
    { time: '05:00', actual: 93, target: 100, ideal: 100 },
    { time: '06:00', actual: 89, target: 100, ideal: 100 },
    { time: '07:00', actual: 96, target: 100, ideal: 100 },
  ],
  efficiencyTrends: [
    { date: '2024-01-01', efficiency: 89.2, target: 95 },
    { date: '2024-01-02', efficiency: 90.1, target: 95 },
    { date: '2024-01-03', efficiency: 91.3, target: 95 },
    { date: '2024-01-04', efficiency: 92.0, target: 95 },
    { date: '2024-01-05', efficiency: 91.8, target: 95 },
    { date: '2024-01-06', efficiency: 93.2, target: 95 },
    { date: '2024-01-07', efficiency: 92.8, target: 95 },
  ],
  machinePerformance: [
    { machine: 'M-001', efficiency: 94.2, speed: 96.1, utilization: 88.3 },
    { machine: 'M-002', efficiency: 91.8, speed: 93.4, utilization: 85.7 },
    { machine: 'M-003', efficiency: 89.5, speed: 91.2, utilization: 82.4 },
    { machine: 'M-004', efficiency: 92.7, speed: 94.8, utilization: 87.1 },
    { machine: 'M-005', efficiency: 93.4, speed: 95.6, utilization: 89.2 },
  ],
  bottlenecks: [
    { process: 'Material Handling', impact: 12.3, frequency: 8 },
    { process: 'Quality Inspection', impact: 9.7, frequency: 12 },
    { process: 'Changeover', impact: 15.2, frequency: 6 },
    { process: 'Maintenance', impact: 8.1, frequency: 4 },
  ],
  improvements: [
    { area: 'Speed Optimization', potential: 5.2, difficulty: 'Medium', timeline: '2 weeks' },
    { area: 'Process Automation', potential: 8.7, difficulty: 'High', timeline: '1 month' },
    { area: 'Training Enhancement', potential: 3.1, difficulty: 'Low', timeline: '1 week' },
    { area: 'Equipment Upgrade', potential: 12.3, difficulty: 'High', timeline: '3 months' },
  ],
}

const OEEPerformancePage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [selectedMetric, setSelectedMetric] = useState('efficiency')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Analysis</h1>
          <p className="text-muted-foreground">
            Detailed analysis of production performance metrics and optimization opportunities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="efficiency">Efficiency</SelectItem>
              <SelectItem value="speed">Speed</SelectItem>
              <SelectItem value="utilization">Utilization</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92.1%</div>
            <p className="text-xs text-muted-foreground">
              +2.3% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Speed Index</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">94.2</div>
            <p className="text-xs text-muted-foreground">
              Target: 100 | Performance: 94.2%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">86.5%</div>
            <p className="text-xs text-muted-foreground">
              Machine utilization rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cycle Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">2.3s</div>
            <p className="text-xs text-muted-foreground">
              Average cycle time per unit
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="speed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="speed">Speed Analysis</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency Trends</TabsTrigger>
          <TabsTrigger value="comparison">Machine Comparison</TabsTrigger>
          <TabsTrigger value="bottlenecks">Bottleneck Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="speed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Speed Performance Analysis</CardTitle>
              <CardDescription>
                Real-time speed performance vs target and ideal rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockPerformanceData.speedAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#8884d8" strokeWidth={2} name="Actual Speed %" />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeWidth={2} name="Target Speed %" />
                  <Line type="monotone" dataKey="ideal" stroke="#ffc658" strokeWidth={2} name="Ideal Speed %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Trends</CardTitle>
              <CardDescription>
                Production efficiency trends over time with target comparisons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={mockPerformanceData.efficiencyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="efficiency" stackId="1" stroke="#8884d8" fill="#8884d8" name="Efficiency %" />
                  <Area type="monotone" dataKey="target" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Target %" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Machine Performance Comparison</CardTitle>
              <CardDescription>
                Performance metrics comparison across different machines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockPerformanceData.machinePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="machine" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="efficiency" fill="#8884d8" name="Efficiency %" />
                  <Bar dataKey="speed" fill="#82ca9d" name="Speed %" />
                  <Bar dataKey="utilization" fill="#ffc658" name="Utilization %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bottlenecks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Bottleneck Analysis</CardTitle>
              <CardDescription>
                Identification of key bottlenecks affecting production performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPerformanceData.bottlenecks.map((bottleneck, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">{bottleneck.process}</p>
                        <p className="text-sm text-muted-foreground">
                          Impact: {bottleneck.impact}% | Frequency: {bottleneck.frequency}x per day
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{bottleneck.impact}% Impact</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Improvement Opportunities</CardTitle>
              <CardDescription>
                Potential areas for performance improvement with impact assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPerformanceData.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">{improvement.area}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Potential: {improvement.potential}%</span>
                          <Badge variant={
                            improvement.difficulty === 'Low' ? 'default' :
                            improvement.difficulty === 'Medium' ? 'secondary' :
                            'destructive'
                          }>
                            {improvement.difficulty}
                          </Badge>
                          <span>Timeline: {improvement.timeline}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Plan Action
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OEEPerformancePage
