'use client'

import { useState } from 'react'
import { 
  Plus, 
  Calculator, 
  BarChart3, 
  Target, 
  TrendingUp,
  Clock,
  DollarSign,
  Percent,
  Hash,
  Type,
  Calendar,
  Database,
  Eye,
  Edit,
  Trash2,
  Play,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const metricTypes = [
  { id: 'number', name: 'Number', icon: Hash, description: 'Simple numeric value' },
  { id: 'percentage', name: 'Percentage', icon: Percent, description: 'Value between 0-100%' },
  { id: 'currency', name: 'Currency', icon: DollarSign, description: 'Monetary values' },
  { id: 'duration', name: 'Duration', icon: Clock, description: 'Time-based measurements' },
  { id: 'ratio', name: 'Ratio', icon: BarChart3, description: 'Comparative measurements' },
  { id: 'boolean', name: 'Boolean', icon: CheckCircle, description: 'True/false indicators' }
]

const dataSources = [
  { id: 'processes', name: 'Process Data', fields: ['duration', 'efficiency', 'completion_rate', 'participants'] },
  { id: 'departments', name: 'Department Data', fields: ['team_size', 'budget', 'process_count', 'efficiency'] },
  { id: 'integrations', name: 'Integration Data', fields: ['sync_status', 'data_points', 'error_rate', 'uptime'] },
  { id: 'users', name: 'User Activity', fields: ['login_count', 'active_time', 'processes_viewed', 'actions_taken'] }
]

const functions = [
  { name: 'SUM', description: 'Sum of values', category: 'Aggregation' },
  { name: 'AVG', description: 'Average of values', category: 'Aggregation' },
  { name: 'COUNT', description: 'Count of records', category: 'Aggregation' },
  { name: 'MIN', description: 'Minimum value', category: 'Aggregation' },
  { name: 'MAX', description: 'Maximum value', category: 'Aggregation' },
  { name: 'IF', description: 'Conditional logic', category: 'Logic' },
  { name: 'AND', description: 'Logical AND', category: 'Logic' },
  { name: 'OR', description: 'Logical OR', category: 'Logic' },
  { name: 'DATE_DIFF', description: 'Date difference', category: 'Date' },
  { name: 'NOW', description: 'Current timestamp', category: 'Date' }
]

const existingMetrics = [
  { 
    id: '1', 
    name: 'Process Efficiency Score', 
    type: 'percentage', 
    formula: 'AVG(processes.efficiency)',
    status: 'active',
    lastCalculated: '2 min ago',
    value: '87.3%'
  },
  { 
    id: '2', 
    name: 'Average Process Duration', 
    type: 'duration', 
    formula: 'AVG(processes.duration)',
    status: 'active',
    lastCalculated: '5 min ago',
    value: '2.5 hours'
  },
  { 
    id: '3', 
    name: 'Monthly Cost Savings', 
    type: 'currency', 
    formula: 'SUM(processes.cost_savings)',
    status: 'draft',
    lastCalculated: 'Never',
    value: '--'
  }
]

export default function MetricsPage() {
  const [activeTab, setActiveTab] = useState('builder')
  const [showBuilder, setShowBuilder] = useState(false)
  
  const [metricBuilder, setMetricBuilder] = useState({
    name: '',
    description: '',
    type: 'number',
    formula: '',
    dataSource: '',
    field: '',
    aggregation: 'SUM',
    filters: [],
    groupBy: '',
    timeframe: 'daily'
  })

  const [formulaBuilder, setFormulaBuilder] = useState('')
  const [selectedDataSource, setSelectedDataSource] = useState('')

  const handleCreateMetric = () => {
    setShowBuilder(true)
    setMetricBuilder({
      name: '',
      description: '',
      type: 'number',
      formula: '',
      dataSource: '',
      field: '',
      aggregation: 'SUM',
      filters: [],
      groupBy: '',
      timeframe: 'daily'
    })
  }

  const handleSaveMetric = () => {
    console.log('Saving metric:', metricBuilder)
    setShowBuilder(false)
  }

  const addToFormula = (text: string) => {
    setFormulaBuilder(prev => prev + text)
    setMetricBuilder(prev => ({ ...prev, formula: formulaBuilder + text }))
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Custom Metrics</h1>
            <p className="text-muted-foreground">
              Create and manage custom KPIs and metrics for your organization
            </p>
          </div>
          <button 
            onClick={handleCreateMetric}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Plus size={16} />
            Create Metric
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-6 border-b border-border">
          {['builder', 'metrics', 'categories'].map((tab) => (
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
            </button>
          ))}
        </div>
      </div>

      {showBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Create Custom Metric</h2>
                <button 
                  onClick={() => setShowBuilder(false)}
                  className="p-2 hover:bg-accent rounded-md"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Metric Configuration</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Metric Name</label>
                        <input
                          type="text"
                          value={metricBuilder.name}
                          onChange={(e) => setMetricBuilder(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Average Process Completion Time"
                          className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={metricBuilder.description}
                          onChange={(e) => setMetricBuilder(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe what this metric measures..."
                          rows={3}
                          className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Metric Type</label>
                        <div className="grid grid-cols-2 gap-2">
                          {metricTypes.map((type) => {
                            const Icon = type.icon
                            return (
                              <button
                                key={type.id}
                                onClick={() => setMetricBuilder(prev => ({ ...prev, type: type.id }))}
                                className={`p-3 border rounded-lg text-left transition-colors ${
                                  metricBuilder.type === type.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <Icon size={16} />
                                  <span className="font-medium text-sm">{type.name}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{type.description}</p>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Data Source</label>
                        <select
                          value={selectedDataSource}
                          onChange={(e) => {
                            setSelectedDataSource(e.target.value)
                            setMetricBuilder(prev => ({ ...prev, dataSource: e.target.value }))
                          }}
                          className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">Select data source...</option>
                          {dataSources.map((source) => (
                            <option key={source.id} value={source.id}>{source.name}</option>
                          ))}
                        </select>
                      </div>

                      {selectedDataSource && (
                        <div>
                          <label className="block text-sm font-medium mb-2">Field</label>
                          <select
                            value={metricBuilder.field}
                            onChange={(e) => setMetricBuilder(prev => ({ ...prev, field: e.target.value }))}
                            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select field...</option>
                            {dataSources.find(s => s.id === selectedDataSource)?.fields.map((field) => (
                              <option key={field} value={field}>{field}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium mb-2">Calculation Frequency</label>
                        <select
                          value={metricBuilder.timeframe}
                          onChange={(e) => setMetricBuilder(prev => ({ ...prev, timeframe: e.target.value }))}
                          className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="realtime">Real-time</option>
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Formula Builder</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Formula</label>
                      <textarea
                        value={formulaBuilder}
                        onChange={(e) => {
                          setFormulaBuilder(e.target.value)
                          setMetricBuilder(prev => ({ ...prev, formula: e.target.value }))
                        }}
                        placeholder="Enter formula or use the builder below..."
                        rows={4}
                        className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring font-mono text-sm"
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Functions</h4>
                      <div className="max-h-32 overflow-y-auto border border-border rounded-md">
                        {functions.map((func) => (
                          <button
                            key={func.name}
                            onClick={() => addToFormula(func.name + '()')}
                            className="w-full p-2 text-left hover:bg-accent border-b border-border last:border-0"
                          >
                            <div className="font-mono text-sm text-primary">{func.name}</div>
                            <div className="text-xs text-muted-foreground">{func.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Test Formula</h4>
                      <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent w-full">
                        <Play size={16} />
                        Test with Sample Data
                      </button>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="text-green-600" size={16} />
                        <span className="font-medium text-green-800 dark:text-green-200">Formula Valid</span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Expected result: 87.3%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
                <button 
                  onClick={() => setShowBuilder(false)}
                  className="px-6 py-2 border border-input rounded-md hover:bg-accent"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveMetric}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  <Save size={16} />
                  Create Metric
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'metrics' && (
        <div>
          <div className="space-y-4">
            {existingMetrics.map((metric) => (
              <div key={metric.id} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{metric.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        metric.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {metric.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium capitalize">{metric.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Value</p>
                        <p className="font-medium text-lg">{metric.value}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Updated</p>
                        <p className="font-medium">{metric.lastCalculated}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Formula</p>
                      <code className="text-sm font-mono">{metric.formula}</code>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 hover:bg-accent rounded-md">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-accent rounded-md">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 hover:bg-accent rounded-md text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Efficiency Metrics', count: 8, description: 'Process completion time, cycle time, throughput' },
              { name: 'Quality Metrics', count: 5, description: 'Error rates, rework frequency, satisfaction scores' },
              { name: 'Cost Metrics', count: 6, description: 'Process costs, labor costs, overhead allocation' },
              { name: 'Compliance Metrics', count: 4, description: 'SLA adherence, audit pass rates, policy compliance' },
              { name: 'Performance Metrics', count: 7, description: 'Goal achievement, benchmarks, trend analysis' },
              { name: 'Custom Metrics', count: 3, description: 'Organization-specific measurements' }
            ].map((category) => (
              <div key={category.name} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-4">
                  <Calculator className="text-primary" size={24} />
                  <span className="text-2xl font-bold">{category.count}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
                <button className="mt-4 text-sm text-primary hover:underline">
                  View Metrics →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}