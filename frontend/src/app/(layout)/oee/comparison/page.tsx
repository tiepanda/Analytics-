'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@src/components/ui/card'
import { Badge } from '@src/components/ui/badge'
import { Button } from '@src/components/ui/button'
import { Progress } from '@src/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@src/components/ui/select'
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts'
import {
  Target,
  Gauge,
  Download,
  Award,
  AlertTriangle,
} from 'lucide-react'

// Mock comparison data
const mockComparisonData = {
  machines: [
    {
      id: 'M-001',
      name: 'Assembly Line 1',
      oee: 82.3,
      availability: 88.1,
      performance: 93.4,
      quality: 87.2,
      efficiency: 94.2,
      utilization: 88.3,
      costPerUnit: 2.45,
      output: 1250,
    },
    {
      id: 'M-002',
      name: 'CNC Machine A',
      oee: 79.7,
      availability: 85.6,
      performance: 91.8,
      quality: 86.4,
      efficiency: 91.8,
      utilization: 85.7,
      costPerUnit: 3.12,
      output: 890,
    },
    {
      id: 'M-003',
      name: 'Testing Station',
      oee: 76.2,
      availability: 83.4,
      performance: 89.2,
      quality: 84.8,
      efficiency: 89.5,
      utilization: 82.4,
      costPerUnit: 1.89,
      output: 1450,
    },
    {
      id: 'M-004',
      name: 'Packaging Unit',
      oee: 81.5,
      availability: 87.2,
      performance: 92.6,
      quality: 88.1,
      efficiency: 92.7,
      utilization: 87.1,
      costPerUnit: 2.78,
      output: 1100,
    },
    {
      id: 'M-005',
      name: 'Quality Control',
      oee: 83.1,
      availability: 89.0,
      performance: 93.8,
      quality: 87.9,
      efficiency: 93.4,
      utilization: 89.2,
      costPerUnit: 2.23,
      output: 1350,
    },
  ],
  benchmarks: {
    industryAverage: 78.5,
    topPerformer: 85.2,
    companyAverage: 80.6,
  },
  improvements: [
    {
      machine: 'M-003',
      potential: 8.5,
      actions: ['Reduce setup time', 'Improve maintenance scheduling', 'Optimize quality checks'],
      priority: 'high',
    },
    {
      machine: 'M-002',
      potential: 5.2,
      actions: ['Speed optimization', 'Tool life improvement', 'Training enhancement'],
      priority: 'medium',
    },
    {
      machine: 'M-004',
      potential: 3.1,
      actions: ['Process standardization', 'Material flow optimization'],
      priority: 'low',
    },
  ],
  correlations: [
    { efficiency: 85, quality: 82, oee: 78 },
    { efficiency: 88, quality: 85, oee: 80 },
    { efficiency: 91, quality: 87, oee: 82 },
    { efficiency: 94, quality: 89, oee: 85 },
    { efficiency: 89, quality: 83, oee: 79 },
    { efficiency: 92, quality: 88, oee: 83 },
    { efficiency: 87, quality: 84, oee: 81 },
    { efficiency: 95, quality: 91, oee: 86 },
  ],
}

const PerformanceBadge = ({ value, threshold }: { value: number; threshold: number }) => {
  const isGood = value >= threshold
  return (
    <Badge variant={isGood ? 'default' : 'destructive'}>
      {value}% {isGood ? '✓' : '⚠'}
    </Badge>
  )
}

const OEEComparisonPage = () => {
  const [selectedMetric, setSelectedMetric] = useState('oee')
  const [sortBy, setSortBy] = useState('oee')

  const sortedMachines = [...mockComparisonData.machines].sort((a, b) => {
    switch (sortBy) {
      case 'oee':
        return b.oee - a.oee
      case 'efficiency':
        return b.efficiency - a.efficiency
      case 'output':
        return b.output - a.output
      case 'cost':
        return a.costPerUnit - b.costPerUnit
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Machine Comparison</h1>
          <p className="text-muted-foreground">
            Comparative analysis of machine performance and efficiency metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oee">OEE</SelectItem>
              <SelectItem value="efficiency">Efficiency</SelectItem>
              <SelectItem value="quality">Quality</SelectItem>
              <SelectItem value="cost">Cost/Unit</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oee">Sort by OEE</SelectItem>
              <SelectItem value="efficiency">Sort by Efficiency</SelectItem>
              <SelectItem value="output">Sort by Output</SelectItem>
              <SelectItem value="cost">Sort by Cost</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Benchmark Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Industry Average</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mockComparisonData.benchmarks.industryAverage}%</div>
            <p className="text-xs text-muted-foreground">
              Global industry standard
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockComparisonData.benchmarks.topPerformer}%</div>
            <p className="text-xs text-muted-foreground">
              Best in class performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Company Average</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{mockComparisonData.benchmarks.companyAverage}%</div>
            <p className="text-xs text-muted-foreground">
              Current company average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Machine Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Machine Performance Comparison</CardTitle>
          <CardDescription>
            {selectedMetric.toUpperCase()} comparison across all machines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sortedMachines}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey={selectedMetric === 'oee' ? 'oee' :
                        selectedMetric === 'efficiency' ? 'efficiency' :
                        selectedMetric === 'quality' ? 'quality' :
                        'costPerUnit'}
                fill="#8884d8"
                name={selectedMetric === 'cost' ? 'Cost/Unit ($)' : `${selectedMetric.toUpperCase()} (%)`}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Radar Chart for Multi-dimensional Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Multi-Dimensional Performance</CardTitle>
            <CardDescription>
              Radar chart showing OEE components for top 3 machines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={sortedMachines.slice(0, 3)}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Availability" dataKey="availability" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Radar name="Performance" dataKey="performance" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                <Radar name="Quality" dataKey="quality" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Correlation Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Correlation</CardTitle>
            <CardDescription>
              Relationship between efficiency and quality metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={mockComparisonData.correlations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="efficiency" name="Efficiency %" />
                <YAxis dataKey="quality" name="Quality %" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Machines" dataKey="oee" fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Machine Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Machine Performance</CardTitle>
          <CardDescription>
            Comprehensive performance metrics for all machines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedMachines.map((machine) => (
              <div key={machine.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{machine.name}</h3>
                    <p className="text-sm text-muted-foreground">Machine ID: {machine.id}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PerformanceBadge value={machine.oee} threshold={80} />
                    <Badge variant="outline">
                      Rank #{sortedMachines.findIndex(m => m.id === machine.id) + 1}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{machine.oee}%</p>
                    <p className="text-sm text-muted-foreground">OEE</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{machine.efficiency}%</p>
                    <p className="text-sm text-muted-foreground">Efficiency</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">${machine.costPerUnit}</p>
                    <p className="text-sm text-muted-foreground">Cost/Unit</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{machine.output}</p>
                    <p className="text-sm text-muted-foreground">Daily Output</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Availability</span>
                    <span className="font-medium">{machine.availability}%</span>
                  </div>
                  <Progress value={machine.availability} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>Performance</span>
                    <span className="font-medium">{machine.performance}%</span>
                  </div>
                  <Progress value={machine.performance} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>Quality</span>
                    <span className="font-medium">{machine.quality}%</span>
                  </div>
                  <Progress value={machine.quality} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>Utilization</span>
                    <span className="font-medium">{machine.utilization}%</span>
                  </div>
                  <Progress value={machine.utilization} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Improvement Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Improvement Opportunities</CardTitle>
          <CardDescription>
            Machines with highest improvement potential and recommended actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockComparisonData.improvements.map((improvement, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">{improvement.machine} - Improvement Potential</p>
                    <p className="text-sm text-muted-foreground">
                      Potential gain: {improvement.potential}% OEE improvement
                    </p>
                    <div className="mt-2 space-y-1">
                      {improvement.actions.map((action, actionIndex) => (
                        <div key={actionIndex} className="text-sm text-muted-foreground">
                          • {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={
                    improvement.priority === 'high' ? 'destructive' :
                    improvement.priority === 'medium' ? 'default' :
                    'secondary'
                  }>
                    {improvement.priority} priority
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {improvement.potential}% potential
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OEEComparisonPage
