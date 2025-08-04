'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  Clock, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Users,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import { mockProcesses, mockDepartments } from '@/lib/mock-data'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')
  
  const totalProcesses = mockProcesses.length
  const automatedProcesses = mockProcesses.filter(p => p.status === 'automated').length
  const optimizedProcesses = mockProcesses.filter(p => p.status === 'optimized').length
  const discoveredProcesses = mockProcesses.filter(p => p.status === 'discovered').length
  
  const averageEfficiency = Math.round(
    mockProcesses.reduce((sum, p) => sum + p.efficiency, 0) / mockProcesses.length
  )
  
  const totalPotentialSavings = mockProcesses.reduce((sum, p) => sum + p.potentialSavings, 0)
  
  const bottleneckProcesses = mockProcesses.filter(p => 
    p.steps.some(step => step.isBottleneck)
  ).length

  const complianceData = [
    { status: 'Compliant', count: mockProcesses.filter(p => p.compliance === 'compliant').length },
    { status: 'Review Needed', count: mockProcesses.filter(p => p.compliance === 'review_needed').length },
    { status: 'Non-Compliant', count: mockProcesses.filter(p => p.compliance === 'non_compliant').length },
  ]

  const statusData = [
    { status: 'Automated', count: automatedProcesses, color: 'bg-purple-500' },
    { status: 'Optimized', count: optimizedProcesses, color: 'bg-green-500' },
    { status: 'Documented', count: mockProcesses.filter(p => p.status === 'documented').length, color: 'bg-blue-500' },
    { status: 'Discovered', count: discoveredProcesses, color: 'bg-yellow-500' },
  ]

  const topBottlenecks = mockProcesses
    .filter(p => p.steps.some(s => s.isBottleneck))
    .sort((a, b) => b.potentialSavings - a.potentialSavings)
    .slice(0, 5)

  const efficiencyTrends = [
    { month: 'Jan', efficiency: 72 },
    { month: 'Feb', efficiency: 75 },
    { month: 'Mar', efficiency: 78 },
    { month: 'Apr', efficiency: 82 },
    { month: 'May', efficiency: 85 },
    { month: 'Jun', efficiency: 87 },
    { month: 'Jul', efficiency: averageEfficiency },
  ]

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics & Insights</h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your business process performance and optimization opportunities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="/dashboard/metrics"
              className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              <Target size={16} />
              Custom Metrics
            </a>
            <a 
              href="/dashboard/reports"
              className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              <BarChart3 size={16} />
              Reports
            </a>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <Activity className="text-primary" size={24} />
            <TrendingUp className="text-green-600" size={16} />
          </div>
          <p className="text-2xl font-bold mb-1">{averageEfficiency}%</p>
          <p className="text-sm text-muted-foreground">Average Efficiency</p>
          <p className="text-xs text-green-600 mt-1">+3.2% from last month</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-primary" size={24} />
            <Target className="text-blue-600" size={16} />
          </div>
          <p className="text-2xl font-bold mb-1">{totalPotentialSavings}h</p>
          <p className="text-sm text-muted-foreground">Monthly Savings Potential</p>
          <p className="text-xs text-blue-600 mt-1">Across {totalProcesses} processes</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <Zap className="text-primary" size={24} />
            <span className="text-sm text-purple-600 font-medium">{Math.round((automatedProcesses / totalProcesses) * 100)}%</span>
          </div>
          <p className="text-2xl font-bold mb-1">{automatedProcesses}</p>
          <p className="text-sm text-muted-foreground">Automated Processes</p>
          <p className="text-xs text-purple-600 mt-1">+2 this month</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="text-primary" size={24} />
            <span className="text-sm text-red-600 font-medium">High</span>
          </div>
          <p className="text-2xl font-bold mb-1">{bottleneckProcesses}</p>
          <p className="text-sm text-muted-foreground">Processes with Bottlenecks</p>
          <p className="text-xs text-red-600 mt-1">Needs attention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Efficiency Trends</h2>
          <div className="h-64">
            <div className="flex items-end justify-between h-48 px-4">
              {efficiencyTrends.map((data) => (
                <div key={data.month} className="flex flex-col items-center">
                  <div 
                    className="bg-primary rounded-t-md w-8 mb-2"
                    style={{ height: `${(data.efficiency / 100) * 160}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Process Status Distribution</h2>
          <div className="space-y-3">
            {statusData.map((item) => (
              <div key={item.status}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{item.status}</span>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${(item.count / totalProcesses) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Department Performance</h2>
          <div className="space-y-4">
            {mockDepartments.map((dept) => (
              <div key={dept.id}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-sm text-muted-foreground">{dept.processCount} processes</p>
                  </div>
                  <span className="text-lg font-bold">{dept.efficiency}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      dept.efficiency >= 90 ? 'bg-green-600' :
                      dept.efficiency >= 80 ? 'bg-blue-600' :
                      dept.efficiency >= 70 ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${dept.efficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Compliance Overview</h2>
          <div className="space-y-4">
            {complianceData.map((item) => (
              <div key={item.status} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  {item.status === 'Compliant' && <CheckCircle className="text-green-600" size={20} />}
                  {item.status === 'Review Needed' && <AlertTriangle className="text-yellow-600" size={20} />}
                  {item.status === 'Non-Compliant' && <AlertTriangle className="text-red-600" size={20} />}
                  <span className="font-medium">{item.status}</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{item.count}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((item.count / totalProcesses) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold mb-4">Top Process Bottlenecks</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium">Process Name</th>
                <th className="text-left p-3 font-medium">Department</th>
                <th className="text-left p-3 font-medium">Current Efficiency</th>
                <th className="text-left p-3 font-medium">Potential Savings</th>
                <th className="text-left p-3 font-medium">Automation Potential</th>
                <th className="text-left p-3 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody>
              {topBottlenecks.map((process) => (
                <tr key={process.id} className="border-b border-border hover:bg-accent/50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{process.name}</p>
                      <p className="text-sm text-muted-foreground">{process.frequency}</p>
                    </div>
                  </td>
                  <td className="p-3">{process.department}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-secondary rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            process.efficiency >= 80 ? 'bg-green-600' :
                            process.efficiency >= 60 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${process.efficiency}%` }}
                        />
                      </div>
                      <span className="text-sm">{process.efficiency}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-medium">{process.potentialSavings}h</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </td>
                  <td className="p-3">{process.automationPotential}%</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      process.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      process.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {process.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}