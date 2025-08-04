'use client'

import { useState } from 'react'
import {
  Plus,
  BarChart3,
  PieChart,
  LineChart,
  Table,
  Download,
  Settings,
  Play,
  Share,
  Copy,
  Trash2,
  Edit,
  Eye,
  Clock,
  TrendingUp,
  Target,
  X,
  GripVertical,
} from 'lucide-react'

const chartTypes = [
  {
    id: 'bar',
    name: 'Bar Chart',
    icon: BarChart3,
    description: 'Compare values across categories',
  },
  { id: 'line', name: 'Line Chart', icon: LineChart, description: 'Show trends over time' },
  { id: 'pie', name: 'Pie Chart', icon: PieChart, description: 'Show proportions of a whole' },
  { id: 'table', name: 'Data Table', icon: Table, description: 'Display detailed data in rows' },
  { id: 'metric', name: 'Metric Card', icon: Target, description: 'Highlight key numbers' },
  {
    id: 'gauge',
    name: 'Gauge Chart',
    icon: TrendingUp,
    description: 'Show progress towards goals',
  },
]

const dataFields = [
  {
    category: 'Processes',
    fields: ['name', 'department', 'efficiency', 'duration', 'status', 'participants'],
  },
  {
    category: 'Departments',
    fields: ['name', 'team_size', 'process_count', 'efficiency', 'budget'],
  },
  { category: 'Metrics', fields: ['value', 'change', 'trend', 'target', 'category'] },
  { category: 'Users', fields: ['name', 'department', 'role', 'last_active', 'processes_owned'] },
]

const existingReports = [
  {
    id: '1',
    name: 'Executive Summary',
    description: 'High-level overview of process performance',
    type: 'Executive Dashboard',
    charts: 6,
    schedule: 'Weekly',
    lastRun: '2 days ago',
    recipients: 5,
    status: 'active',
  },
  {
    id: '2',
    name: 'Department Performance',
    description: 'Detailed department-wise analysis',
    type: 'Department Report',
    charts: 4,
    schedule: 'Monthly',
    lastRun: '1 week ago',
    recipients: 12,
    status: 'active',
  },
  {
    id: '3',
    name: 'Process Optimization',
    description: 'AI-powered improvement recommendations',
    type: 'Optimization Report',
    charts: 8,
    schedule: 'On-demand',
    lastRun: 'Never',
    recipients: 3,
    status: 'draft',
  },
]

interface Chart {
  id: string
  type: string
  name: string
  dataSource: string
  filters: string[]
  groupBy: string
  aggregation: string
  width: string
  height: string
}

interface ChartType {
  id: string
  name: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  description: string
}

const reportTemplates = [
  {
    name: 'Executive Dashboard',
    description: 'High-level KPIs and trends',
    charts: ['metric', 'line', 'pie'],
  },
  {
    name: 'Department Analysis',
    description: 'Deep dive into department performance',
    charts: ['bar', 'table', 'gauge'],
  },
  {
    name: 'Process Efficiency',
    description: 'Process-specific performance metrics',
    charts: ['line', 'bar', 'table'],
  },
  {
    name: 'Compliance Report',
    description: 'Regulatory and audit compliance',
    charts: ['table', 'gauge', 'metric'],
  },
]

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('reports')
  const [showBuilder, setShowBuilder] = useState(false)
  const [selectedCharts, setSelectedCharts] = useState<Chart[]>([])

  const [reportBuilder, setReportBuilder] = useState({
    name: '',
    description: '',
    template: '',
    schedule: 'manual',
    recipients: [],
    charts: [],
  })

  const handleCreateReport = () => {
    setShowBuilder(true)
    setReportBuilder({
      name: '',
      description: '',
      template: '',
      schedule: 'manual',
      recipients: [],
      charts: [],
    })
  }

  const addChart = (chartType: ChartType) => {
    const newChart = {
      id: Date.now().toString(),
      type: chartType.id,
      name: `New ${chartType.name}`,
      dataSource: '',
      filters: [],
      groupBy: '',
      aggregation: 'count',
      width: 'full',
      height: 'medium',
    }
    setSelectedCharts([...selectedCharts, newChart])
  }

  const removeChart = (chartId: string) => {
    setSelectedCharts(selectedCharts.filter((chart) => chart.id !== chartId))
  }

  const duplicateChart = (chart: Chart) => {
    const duplicated = { ...chart, id: Date.now().toString(), name: `${chart.name} (Copy)` }
    setSelectedCharts([...selectedCharts, duplicated])
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Report Builder</h1>
            <p className="text-muted-foreground">
              Create custom reports and dashboards with drag-and-drop functionality
            </p>
          </div>
          <button
            onClick={handleCreateReport}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Plus size={16} />
            Create Report
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-6 border-b border-border">
          {['reports', 'templates', 'scheduled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
              {tab === 'reports' && ` (${existingReports.length})`}
              {tab === 'templates' && ` (${reportTemplates.length})`}
            </button>
          ))}
        </div>
      </div>

      {showBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-7xl max-h-[95vh] overflow-hidden flex">
            {/* Sidebar */}
            <div className="w-80 border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Report Builder</h2>
                  <button
                    onClick={() => setShowBuilder(false)}
                    className="p-2 hover:bg-accent rounded-md"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Report Details</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Report name..."
                      value={reportBuilder.name}
                      onChange={(e) =>
                        setReportBuilder((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                    <textarea
                      placeholder="Description..."
                      value={reportBuilder.description}
                      onChange={(e) =>
                        setReportBuilder((prev) => ({ ...prev, description: e.target.value }))
                      }
                      rows={3}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Chart Types</h3>
                  <div className="space-y-2">
                    {chartTypes.map((chart) => {
                      const Icon = chart.icon
                      return (
                        <button
                          key={chart.id}
                          onClick={() => addChart(chart)}
                          className="w-full p-3 border border-border rounded-lg hover:border-primary/50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Icon size={16} />
                            <span className="font-medium text-sm">{chart.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{chart.description}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Data Fields</h3>
                  <div className="space-y-3">
                    {dataFields.map((category) => (
                      <div key={category.category}>
                        <h4 className="text-sm font-medium mb-2">{category.category}</h4>
                        <div className="space-y-1">
                          {category.fields.map((field) => (
                            <div
                              key={field}
                              draggable
                              className="px-2 py-1 bg-muted/50 rounded text-xs cursor-move hover:bg-muted"
                            >
                              {field}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowBuilder(false)}
                    className="flex-1 px-3 py-2 border border-input rounded-md hover:bg-accent text-sm"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm">
                    Save Report
                  </button>
                </div>
              </div>
            </div>

            {/* Main Canvas */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{reportBuilder.name || 'Untitled Report'}</h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                      <Play size={14} />
                      Preview
                    </button>
                    <select className="px-3 py-1 border border-input rounded-md text-sm">
                      <option>Desktop View</option>
                      <option>Tablet View</option>
                      <option>Mobile View</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {selectedCharts.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="mx-auto text-muted-foreground mb-4" size={48} />
                      <h3 className="text-lg font-semibold mb-2">Start Building Your Report</h3>
                      <p className="text-muted-foreground mb-4">
                        Add charts and tables from the sidebar to create your custom report
                      </p>
                      <button
                        onClick={() => addChart(chartTypes[0])}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                      >
                        Add First Chart
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {selectedCharts.map((chart) => {
                      const ChartIcon =
                        chartTypes.find((ct) => ct.id === chart.type)?.icon || BarChart3
                      return (
                        <div
                          key={chart.id}
                          className="bg-background border border-border rounded-lg"
                        >
                          <div className="p-4 border-b border-border">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <GripVertical
                                  size={16}
                                  className="text-muted-foreground cursor-move"
                                />
                                <ChartIcon size={16} />
                                <span className="font-medium">{chart.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => duplicateChart(chart)}
                                  className="p-1 hover:bg-accent rounded"
                                >
                                  <Copy size={14} />
                                </button>
                                <button className="p-1 hover:bg-accent rounded">
                                  <Settings size={14} />
                                </button>
                                <button
                                  onClick={() => removeChart(chart.id)}
                                  className="p-1 hover:bg-accent rounded text-red-600"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 h-64 flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                              <ChartIcon size={32} className="mx-auto mb-2" />
                              <p className="text-sm">Configure this {chart.type} chart</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div>
          <div className="space-y-4">
            {existingReports.map((report) => (
              <div key={report.id} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{report.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          report.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">{report.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium">{report.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Charts</p>
                        <p className="font-medium">{report.charts}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Schedule</p>
                        <p className="font-medium">{report.schedule}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Recipients</p>
                        <p className="font-medium">{report.recipients}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                      <Eye size={14} />
                      View
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                      <Download size={14} />
                      Export
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                      <Share size={14} />
                      Share
                    </button>
                    <button className="p-2 hover:bg-accent rounded-md">
                      <Edit size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTemplates.map((template, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                    <p className="text-muted-foreground text-sm">{template.description}</p>
                  </div>
                  <BarChart3 className="text-primary" size={24} />
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Included Charts:</p>
                  <div className="flex gap-2">
                    {template.charts.map((chartType) => {
                      const ChartIcon =
                        chartTypes.find((ct) => ct.id === chartType)?.icon || BarChart3
                      return (
                        <div
                          key={chartType}
                          className="flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs"
                        >
                          <ChartIcon size={12} />
                          <span>{chartTypes.find((ct) => ct.id === chartType)?.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'scheduled' && (
        <div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Scheduled Reports</h2>

            <div className="space-y-4">
              {existingReports
                .filter((r) => r.schedule !== 'On-demand')
                .map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 bg-background rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Clock size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.schedule} • Next run: Tomorrow 9:00 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{report.recipients} recipients</p>
                        <p className="text-xs text-muted-foreground">Last sent: {report.lastRun}</p>
                      </div>
                      <button className="p-2 hover:bg-accent rounded-md">
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
