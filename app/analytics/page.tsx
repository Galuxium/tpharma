// app/analytics/page.tsx
import React from 'react'
import { LineChart, BarChart, PieChart, XAxis, YAxis, Tooltip, Chart } from 'recharts'
import { Line } from 'react-ethylviz'
import { cardsGrid, grayDark, white, blue } from '@/theme'

interface MetricData {
  date: string
  value: number
}

interface LineChartProps {
  title: string
  data: MetricData[]
  onHover?: (value: number) => void
}

interface BarChartProps {
  title: string
  categories: string[]
  series: number[]
}

interface PieChartProps {
  title: string
  data: { label: string; value: number }[]
}

export default function AnalyticsPage() {
  // Example dataset (mocked)
  const dailySales: MetricData[] = [
    { date: '2023-11-01', value: 12000 },
    { date: '2023-11-02', value: 15000 },
    { date: '2023-11-03', value: 18000 },
    { date: '2023-11-04', value: 13000 },
  ]

  const medicationUsage: { category: string; value: number }[] = [
    { category: 'Antibiotics', value: 4500 },
    { category: 'Painkillers', value: 3200 },
    { category: 'Vitamins', value: 2800 },
    { category: 'Chronic Meds', value: 4800 },
  ]

  const weeklyVisits: MetricData[] = [
    { date: '2023-10-30', value: 230 },
    { date: '2023-10-31', value: 275 },
    { date: '2023-11-01', value: 340 },
    { date: '2023-11-02', value: 400 },
  ]

  // Line chart for sales trend
  const SalesLine = () => {
    return (
      <Card component="div" style={{ ...grayDark, p: '4px' }}>
        <h3>Daily Sales Trend</h3>
        <LineChart width={800} height={350} data={dailySales}>
          <XAxis
            type="category"
            dataKey="date"
            tickCount={4}
            tickLine={null}
            axisLine={null}
          />
          <YAxis type="number" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4A90E2" />
        </LineChart>
      </Card>
    )
  }

  // Bar chart for medication categories
  const MedicationUsage = () => {
    return (
      <Card component="div" style={{ ...grayDark, p: '4px' }}>
        <h3>Top Medication Categories</h3>
        <BarChart width={800} height={350} data={medicationUsage.map((d) => ({ x: d.category, y: d.value }))}>
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="y" fill="#6EBDFA" />
        </BarChart>
      </Card>
    )
  }

  // Pie chart for weekly visits
  const VisitPie = () => {
    return (
      <Card component="div" style={{ ...grayDark, p: '4px' }}>
        <h3>Weekly Patient Visits</h3>
        <PieChart
          width={350}
          height={350}
          data={weeklyVisits}
          radius={100}
        >
          <Arc />
          <Label />
          <Tooltip />
          <PieLabel as={Text} fill="#333" margin={5} />
        </PieChart>
      </Card>
    )
  }

  return (
    <div className="p-8 bg-white text-gray-900 dark:bg-gray-800">
      <header className="text-2xl font-bold mb-8">
        TPharma Analytics Dashboard
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SalesLine />
        <MedicationUsage />
        <VisitPie />
      </div>

      {/* Metric Areas */}
      <div className="mt-16">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-semibold">User Engagement</h4>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Daily Active Users</p>
            <p className="text-gray-600">New Prescriptions</p>
          </div>
          <!-- Replace with live metrics -->
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-semibold">Inventory Metrics</h4>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Low Stock Alerts</p>
            <p className="text-gray-600">Top 5 Selling Products</p>
          </div>
          <!-- Replace with inventory visualizations -->
        </div>
      </div>
    </div>
  )
}