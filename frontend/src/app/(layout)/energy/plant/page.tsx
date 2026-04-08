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
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts'
import {
  Building,
  TrendingUp,
  Download,
} from 'lucide-react'

// Mock plant consumption data
const mockPlantData = {
  zones: [
    { name: 'Zone A - Production', consumption: 485.2, efficiency: 94.2, cost: 72.78, target: 450.0 },
    { name: 'Zone B - Assembly', consumption: 312.8, efficiency: 91.8, cost: 46.92, target: 300.0 },
    { name: 'Zone C - Quality', consumption: 198.9, efficiency: 95.8, cost: 29.84, target: 180.0 },
    { name: 'Zone D - Warehouse', consumption: 156.4, efficiency: 90.1, cost: 23.46, target: 150.0 },
    { name: 'Zone E - Office', consumption: 94.2, efficiency: 88.7, cost: 14.13, target: 100.0 },
  ],
  hourlyData: [
    { hour: '06:00', consumption: 45.2, target: 42.0, efficiency: 93.1 },
    { hour: '07:00', consumption: 52.1, target: 48.0, efficiency: 92.3 },
    { hour: '08:00', consumption: 68.4, target: 55.0, efficiency: 89.7 },
    { hour: '09:00', consumption: 72.3, target: 60.0, efficiency: 88.2 },
    { hour: '10:00', consumption: 75.8, target: 65.0, efficiency: 87.1 },
    { hour: '11:00', consumption: 78.9, target: 68.0, efficiency: 86.4 },
    { hour: '12:00', consumption: 82.1, target: 70.0, efficiency: 85.8 },
    { hour: '13:00', consumption: 79.3, target: 68.0, efficiency: 86.7 },
    { hour: '14:00', consumption: 85.4, target: 72.0, efficiency: 85.1 },
    { hour: '15:00', consumption: 88.2, target: 75.0, efficiency: 84.3 },
    { hour: '16:00', consumption: 82.1, target: 70.0, efficiency: 85.8 },
    { hour: '17:00', consumption: 75.6, target: 65.0, efficiency: 87.2 },
    { hour: '18:00', consumption: 65.4, target: 58.0, efficiency: 90.1 },
    { hour: '19:00', consumption: 58.7, target: 52.0, efficiency: 91.8 },
    { hour: '20:00', consumption: 48.7, target: 45.0, efficiency: 92.8 },
    { hour: '21:00', consumption: 42.3, target: 40.0, efficiency: 94.2 },
    { hour: '22:00', consumption: 38.9, target: 35.0, efficiency: 95.6 },
    { hour: '23:00', consumption: 35.2, target: 32.0, efficiency: 96.3 },
    { hour: '00:00', consumption: 32.1, target: 30.0, efficiency: 97.1 },
    { hour: '01:00', consumption: 28.9, target: 28.0, efficiency: 97.8 },
    { hour: '02:00', consumption: 26.5, target: 25.0, efficiency: 98.2 },
    { hour: '03:00', consumption: 24.8, target: 23.0, efficiency: 98.6 },
    { hour: '04:00', consumption: 23.2, target: 22.0, efficiency: 98.9 },
    { hour: '05:00', consumption: 25.6, target: 24.0, efficiency: 98.4 },
  ],
  efficiencyZones: [
    { zone: 'High Efficiency', range: '95-100%', count: 8, percentage: 33.3 },
    { zone: 'Medium Efficiency', range: '85-94%', count: 12, percentage: 50.0 },
    { zone: 'Low Efficiency', range: '75-84%', count: 4, percentage: 16.7 },
  ],
  peakHours: [
    { hour: '14:00-16:00', consumption: 85.4, reason: 'Peak production shift' },
    { hour: '08:00-10:00', consumption: 72.3, reason: 'Morning startup' },
    { hour: '11:00-13:00', consumption: 78.9, reason: 'Quality testing' },
  ],
}

const PlantConsumptionPage = () => {
  const [selectedZone, setSelectedZone] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plant Consumption</h1>
          <p className="text-muted-foreground">
            Detailed energy consumption analysis across plant zones and facilities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              <SelectItem value="zone-a">Zone A</SelectItem>
              <SelectItem value="zone-b">Zone B</SelectItem>
              <SelectItem value="zone-c">Zone C</SelectItem>
              <SelectItem value="zone-d">Zone D</SelectItem>
              <SelectItem value="zone-e">Zone E</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Zone Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {mockPlantData.zones.map((zone, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{zone.name}</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{zone.consumption} kWh</div>
              <p className="text-xs text-muted-foreground">
                Target: {zone.target} kWh
              </p>
              <div className="mt-2">
                <Progress
                  value={(zone.consumption / zone.target) * 100}
                  className="h-2"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span>Efficiency: {zone.efficiency}%</span>
                <span className={`font-medium ${
                  zone.consumption <= zone.target ? 'text-green-600' : 'text-red-600'
                }`}>
                  {zone.consumption <= zone.target ? '✓' : '⚠'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hourly Consumption Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Plant Consumption</CardTitle>
          <CardDescription>
            Energy consumption patterns throughout the day with target comparisons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={mockPlantData.hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="consumption" stroke="#8884d8" fill="#8884d8" name="Consumption (kWh)" />
              <Line type="monotone" dataKey="target" stroke="#ff0000" strokeWidth={2} name="Target (kWh)" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Zone Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Zone Performance Comparison</CardTitle>
            <CardDescription>
              Energy efficiency comparison across plant zones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockPlantData.zones}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="efficiency" fill="#82ca9d" name="Efficiency %" />
                <Bar dataKey="consumption" fill="#8884d8" name="Consumption (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Efficiency Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Efficiency Distribution</CardTitle>
            <CardDescription>
              Distribution of zones across efficiency ranges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPlantData.efficiencyZones.map((zone, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      zone.zone.includes('High') ? 'bg-green-500' :
                      zone.zone.includes('Medium') ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium">{zone.zone}</p>
                      <p className="text-sm text-muted-foreground">{zone.range}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{zone.count} zones</p>
                    <p className="text-sm text-muted-foreground">{zone.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peak Hours Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Peak Consumption Hours</CardTitle>
          <CardDescription>
            Analysis of peak energy consumption periods and contributing factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPlantData.peakHours.map((peak, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <TrendingUp className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">{peak.hour}</p>
                    <p className="text-sm text-muted-foreground">{peak.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">{peak.consumption} kWh</p>
                  <p className="text-sm text-muted-foreground">Peak consumption</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Zone Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Zone Analysis</CardTitle>
          <CardDescription>
            Comprehensive energy metrics for each plant zone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockPlantData.zones.map((zone, index) => (
              <div key={index} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{zone.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Current consumption: {zone.consumption} kWh | Target: {zone.target} kWh
                    </p>
                  </div>
                  <Badge variant={zone.consumption <= zone.target ? 'default' : 'destructive'}>
                    {zone.consumption <= zone.target ? 'On Target' : 'Over Target'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{zone.consumption}</p>
                    <p className="text-sm text-muted-foreground">kWh Consumed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{zone.efficiency}%</p>
                    <p className="text-sm text-muted-foreground">Efficiency</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">${zone.cost}</p>
                    <p className="text-sm text-muted-foreground">Daily Cost</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${
                      zone.consumption <= zone.target ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {((zone.consumption - zone.target) / zone.target * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">vs Target</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Consumption vs Target</span>
                    <span className="font-medium">{((zone.consumption / zone.target) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(zone.consumption / zone.target) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PlantConsumptionPage
