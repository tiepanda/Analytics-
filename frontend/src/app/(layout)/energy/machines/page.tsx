'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@src/components/ui/card'
import { Badge } from '@src/components/ui/badge'
import { Progress } from '@src/components/ui/progress'
import { Button } from '@src/components/ui/button'
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
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Cog,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  Download,
  Zap,
  Gauge,
} from 'lucide-react'

// Mock machine energy data
const mockMachineEnergyData = {
  machines: [
    {
      id: 'M-001',
      name: 'Assembly Line 1',
      consumption: 185.2,
      efficiency: 94.2,
      cost: 27.78,
      output: 1250,
      uptime: 92.3,
      peakLoad: 45.2,
      avgLoad: 32.1,
      status: 'optimal',
      trend: '+2.1%',
    },
    {
      id: 'M-002',
      name: 'CNC Machine A',
      consumption: 142.8,
      efficiency: 91.8,
      cost: 21.42,
      output: 890,
      uptime: 88.7,
      peakLoad: 38.9,
      avgLoad: 28.5,
      status: 'good',
      trend: '-1.3%',
    },
    {
      id: 'M-003',
      name: 'Testing Station',
      consumption: 98.9,
      efficiency: 95.8,
      cost: 14.84,
      output: 1450,
      uptime: 96.1,
      peakLoad: 28.4,
      avgLoad: 22.3,
      status: 'excellent',
      trend: '+4.7%',
    },
    {
      id: 'M-004',
      name: 'Packaging Unit',
      consumption: 165.4,
      efficiency: 90.1,
      cost: 24.81,
      output: 1100,
      uptime: 85.4,
      peakLoad: 42.1,
      avgLoad: 31.2,
      status: 'warning',
      trend: '-3.2%',
    },
    {
      id: 'M-005',
      name: 'Quality Control',
      consumption: 112.3,
      efficiency: 92.8,
      cost: 16.85,
      output: 1350,
      uptime: 89.2,
      peakLoad: 31.8,
      avgLoad: 25.7,
      status: 'good',
      trend: '+1.8%',
    },
  ],
  hourlyTrends: [
    { machine: 'M-001', hour: '08:00', consumption: 28.5, efficiency: 94.2 },
    { machine: 'M-001', hour: '10:00', consumption: 32.1, efficiency: 93.8 },
    { machine: 'M-001', hour: '12:00', consumption: 35.2, efficiency: 92.1 },
    { machine: 'M-001', hour: '14:00', consumption: 38.9, efficiency: 91.5 },
    { machine: 'M-001', hour: '16:00', consumption: 36.7, efficiency: 92.8 },
    { machine: 'M-002', hour: '08:00', consumption: 22.1, efficiency: 91.8 },
    { machine: 'M-002', hour: '10:00', consumption: 25.8, efficiency: 90.4 },
    { machine: 'M-002', hour: '12:00', consumption: 28.9, efficiency: 89.2 },
    { machine: 'M-002', hour: '14:00', consumption: 31.2, efficiency: 88.7 },
    { machine: 'M-002', hour: '16:00', consumption: 29.4, efficiency: 89.8 },
  ],
  efficiencyDistribution: [
    { range: '90-95%', machines: 2, percentage: 40 },
    { range: '85-89%', machines: 1, percentage: 20 },
    { range: '95-100%', machines: 2, percentage: 40 },
  ],
  optimizationOpportunities: [
    {
      machine: 'M-004',
      issue: 'High idle power consumption',
      potential: '12.5 kWh/day',
      impact: 'high',
      solution: 'Install smart power management system',
    },
    {
      machine: 'M-002',
      issue: 'Inefficient operation during low load',
      potential: '8.3 kWh/day',
      impact: 'medium',
      solution: 'Optimize speed/load matching',
    },
    {
      machine: 'M-001',
      issue: 'Peak load inefficiency',
      potential: '5.7 kWh/day',
      impact: 'low',
      solution: 'Load balancing improvements',
    },
  ],
}

const MachineEnergyPage = () => {
  const [selectedMachine, setSelectedMachine] = useState('all')
  const [sortBy, setSortBy] = useState('consumption')

  const sortedMachines = [...mockMachineEnergyData.machines].sort((a, b) => {
    switch (sortBy) {
      case 'consumption':
        return b.consumption - a.consumption
      case 'efficiency':
        return b.efficiency - a.efficiency
      case 'cost':
        return b.cost - a.cost
      case 'output':
        return b.output - a.output
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'optimal': return 'text-blue-600 bg-blue-100'
      case 'good': return 'text-yellow-600 bg-yellow-100'
      case 'warning': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Machine Energy Analysis</h1>
          <p className="text-muted-foreground">
            Individual machine energy consumption, efficiency, and optimization opportunities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedMachine} onValueChange={setSelectedMachine}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Machines</SelectItem>
              {mockMachineEnergyData.machines.map(machine => (
                <SelectItem key={machine.id} value={machine.id}>{machine.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consumption">Sort by Consumption</SelectItem>
              <SelectItem value="efficiency">Sort by Efficiency</SelectItem>
              <SelectItem value="cost">Sort by Cost</SelectItem>
              <SelectItem value="output">Sort by Output</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Machine Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Machines</CardTitle>
            <Cog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mockMachineEnergyData.machines.length}</div>
            <p className="text-xs text-muted-foreground">
              Active machines monitored
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {(mockMachineEnergyData.machines.reduce((sum, m) => sum + m.efficiency, 0) / mockMachineEnergyData.machines.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average energy efficiency
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {mockMachineEnergyData.machines.reduce((sum, m) => sum + m.consumption, 0).toFixed(1)} kWh
            </div>
            <p className="text-xs text-muted-foreground">
              Daily energy consumption
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimization Potential</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">26.5 kWh</div>
            <p className="text-xs text-muted-foreground">
              Daily savings potential
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Machine Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Machine Energy Comparison</CardTitle>
          <CardDescription>
            Energy consumption and efficiency comparison across machines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sortedMachines}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="consumption" fill="#8884d8" name="Consumption (kWh)" />
              <Bar dataKey="efficiency" fill="#82ca9d" name="Efficiency %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Efficiency vs Consumption Scatter */}
        <Card>
          <CardHeader>
            <CardTitle>Efficiency vs Consumption</CardTitle>
            <CardDescription>
              Correlation between energy consumption and operational efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={mockMachineEnergyData.machines}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="consumption" name="Consumption (kWh)" />
                <YAxis dataKey="efficiency" name="Efficiency %" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Machines" dataKey="output" fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Efficiency Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Efficiency Distribution</CardTitle>
            <CardDescription>
              Distribution of machines across efficiency ranges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMachineEnergyData.efficiencyDistribution.map((range, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      range.range.includes('90-95') ? 'bg-green-500' :
                      range.range.includes('85-89') ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <div>
                      <p className="font-medium">{range.range}</p>
                      <p className="text-sm text-muted-foreground">{range.machines} machines</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{range.percentage}%</p>
                    <Progress value={range.percentage} className="w-[80px] mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Machine Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Machine Energy Analysis</CardTitle>
          <CardDescription>
            Comprehensive energy metrics for each machine
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
                    <Badge className={getStatusColor(machine.status)}>
                      {machine.status}
                    </Badge>
                    <div className={`flex items-center space-x-1 text-sm ${
                      machine.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {machine.trend.startsWith('+') ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span>{machine.trend}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{machine.consumption} kWh</p>
                    <p className="text-sm text-muted-foreground">Daily Consumption</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{machine.efficiency}%</p>
                    <p className="text-sm text-muted-foreground">Energy Efficiency</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">${machine.cost}</p>
                    <p className="text-sm text-muted-foreground">Daily Cost</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{machine.uptime}%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Load Analysis</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Peak Load</span>
                        <span className="font-medium">{machine.peakLoad} kW</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average Load</span>
                        <span className="font-medium">{machine.avgLoad} kW</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Performance Metrics</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Output</span>
                        <span className="font-medium">{machine.output} units</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Energy/Unit</span>
                        <span className="font-medium">{(machine.consumption / machine.output * 1000).toFixed(2)} Wh</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Energy Efficiency</span>
                    <span className="font-medium">{machine.efficiency}%</span>
                  </div>
                  <Progress value={machine.efficiency} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Optimization Opportunities</CardTitle>
          <CardDescription>
            Machines with highest energy optimization potential and recommended actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMachineEnergyData.optimizationOpportunities.map((opportunity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">{opportunity.machine} - {opportunity.issue}</p>
                    <p className="text-sm text-muted-foreground">
                      Potential savings: {opportunity.potential}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Solution: {opportunity.solution}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={
                    opportunity.impact === 'high' ? 'destructive' :
                    opportunity.impact === 'medium' ? 'default' :
                    'secondary'
                  }>
                    {opportunity.impact} impact
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {opportunity.potential} savings
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

export default MachineEnergyPage
