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
  Area,
  ComposedChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import {
  TrendingUp,
  Calendar,
  Target,
  Activity,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  AlertCircle,
} from 'lucide-react'

// Mock trend data
const mockTrendData = {
  weeklyTrends: [
    { week: 'W1', oee: 75.2, availability: 82.1, performance: 89.5, quality: 83.2, target: 90 },
    { week: 'W2', oee: 76.8, availability: 84.3, performance: 91.2, quality: 84.7, target: 90 },
    { week: 'W3', oee: 77.4, availability: 85.1, performance: 90.8, quality: 85.2, target: 90 },
    { week: 'W4', oee: 78.2, availability: 86.0, performance: 91.5, quality: 85.8, target: 90 },
    { week: 'W5', oee: 78.5, availability: 85.2, performance: 92.1, quality: 85.7, target: 90 },
    { week: 'W6', oee: 79.1, availability: 86.8, performance: 92.4, quality: 86.3, target: 90 },
    { week: 'W7', oee: 78.9, availability: 85.9, performance: 92.0, quality: 86.1, target: 90 },
    { week: 'W8', oee: 79.8, availability: 87.2, performance: 93.1, quality: 86.8, target: 90 },
  ],
  monthlyTrends: [
    { month: 'Jan', oee: 76.8, availability: 84.5, performance: 90.2, quality: 84.9, target: 90 },
    { month: 'Feb', oee: 77.9, availability: 85.8, performance: 91.4, quality: 85.6, target: 90 },
    { month: 'Mar', oee: 78.5, availability: 86.2, performance: 92.0, quality: 86.1, target: 90 },
    { month: 'Apr', oee: 79.2, availability: 87.1, performance: 92.8, quality: 86.7, target: 90 },
    { month: 'May', oee: 80.1, availability: 88.0, performance: 93.2, quality: 87.3, target: 90 },
    { month: 'Jun', oee: 79.8, availability: 87.5, performance: 93.0, quality: 87.1, target: 90 },
  ],
  predictions: [
    { week: 'W9', predicted: 80.2, confidence: 85 },
    { week: 'W10', predicted: 80.8, confidence: 82 },
    { week: 'W11', predicted: 81.1, confidence: 78 },
    { week: 'W12', predicted: 81.5, confidence: 75 },
  ],
  anomalies: [
    { date: '2024-01-15', metric: 'Availability', value: 65.2, expected: 85.0, severity: 'high' },
    { date: '2024-01-22', metric: 'Performance', value: 78.1, expected: 92.0, severity: 'medium' },
    { date: '2024-01-28', metric: 'Quality', value: 79.3, expected: 86.0, severity: 'medium' },
  ],
  seasonalPatterns: [
    { period: 'Morning', efficiency: 88.2 },
    { period: 'Afternoon', efficiency: 85.7 },
    { period: 'Evening', efficiency: 82.4 },
    { period: 'Night', efficiency: 79.8 },
  ],
}

const TrendIndicator = ({ value, previous }: { value: number; previous: number }) => {
  const change = value - previous
  const isPositive = change > 0
  const isNeutral = change === 0

  return (
    <div className={`flex items-center space-x-1 text-sm ${
      isPositive ? 'text-green-600' :
      isNeutral ? 'text-gray-600' :
      'text-red-600'
    }`}>
      {isPositive ? <ArrowUpRight className="h-3 w-3" /> :
       isNeutral ? <Minus className="h-3 w-3" /> :
       <ArrowDownRight className="h-3 w-3" />}
      <span>{Math.abs(change).toFixed(1)}%</span>
    </div>
  )
}

const OEETrendPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly')
  // const [selectedView, setSelectedView] = useState('overview')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trend Analysis</h1>
          <p className="text-muted-foreground">
            Historical trends, patterns, and predictive insights for OEE performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Trend Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+4.6%</div>
            <p className="text-xs text-muted-foreground">
              OEE improvement this week
            </p>
            <TrendIndicator value={79.8} previous={75.2} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+3.0%</div>
            <p className="text-xs text-muted-foreground">
              OEE improvement this month
            </p>
            <TrendIndicator value={79.8} previous={76.8} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Achievement</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">88.7%</div>
            <p className="text-xs text-muted-foreground">
              Of 90% target achieved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consistency Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">7.2</div>
            <p className="text-xs text-muted-foreground">
              Performance consistency (1-10 scale)
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Trend Charts</TabsTrigger>
          <TabsTrigger value="patterns">Seasonal Patterns</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>OEE Trend Analysis</CardTitle>
              <CardDescription>
                {selectedPeriod === 'weekly' ? 'Weekly' : 'Monthly'} OEE trends with target comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={selectedPeriod === 'weekly' ? mockTrendData.weeklyTrends : mockTrendData.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={selectedPeriod === 'weekly' ? 'week' : 'month'} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={90} stroke="#ff0000" strokeDasharray="5 5" label="Target" />
                  <Area type="monotone" dataKey="oee" fill="#8884d8" stroke="#8884d8" name="OEE %" />
                  <Line type="monotone" dataKey="target" stroke="#ff0000" strokeWidth={2} name="Target %" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Availability Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedPeriod === 'weekly' ? mockTrendData.weeklyTrends : mockTrendData.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={selectedPeriod === 'weekly' ? 'week' : 'month'} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="availability" stroke="#82ca9d" strokeWidth={2} name="Availability %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedPeriod === 'weekly' ? mockTrendData.weeklyTrends : mockTrendData.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={selectedPeriod === 'weekly' ? 'week' : 'month'} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="performance" stroke="#ffc658" strokeWidth={2} name="Performance %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Patterns</CardTitle>
              <CardDescription>
                Performance patterns across different time periods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockTrendData.seasonalPatterns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="efficiency" fill="#8884d8" name="Efficiency %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>OEE Predictions</CardTitle>
              <CardDescription>
                Predictive analysis for future OEE performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={mockTrendData.predictions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="predicted" fill="#8884d8" stroke="#8884d8" name="Predicted OEE %" />
                  <Line type="monotone" dataKey="confidence" stroke="#82ca9d" strokeWidth={2} name="Confidence %" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>
                Identified anomalies and deviations from expected performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrendData.anomalies.map((anomaly, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className={`h-5 w-5 ${
                        anomaly.severity === 'high' ? 'text-red-500' :
                        anomaly.severity === 'medium' ? 'text-orange-500' :
                        'text-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium">{anomaly.metric} Anomaly</p>
                        <p className="text-sm text-muted-foreground">
                          {anomaly.date} | Expected: {anomaly.expected}% | Actual: {anomaly.value}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        anomaly.severity === 'high' ? 'destructive' :
                        anomaly.severity === 'medium' ? 'default' :
                        'secondary'
                      }>
                        {anomaly.severity} severity
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        Deviation: {(anomaly.expected - anomaly.value).toFixed(1)}%
                      </p>
                    </div>
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

export default OEETrendPage
