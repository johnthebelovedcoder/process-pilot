'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  Zap,
  AlertTriangle,
  CheckCircle,
  Edit,
  Play,
  Share,
  MoreVertical,
  Calendar,
  Target,
  Workflow,
} from 'lucide-react'
import { mockProcesses, mockOptimizationSuggestions } from '@/lib/mock-data'
import { Process } from '@/types/process'

interface ProcessDetailPageProps {
  params: { id: string }
}

export default function ProcessDetailPage({ params }: ProcessDetailPageProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const process = mockProcesses.find((p) => p.id === params.id)
  const suggestions = mockOptimizationSuggestions.filter((s) => s.processId === params.id)

  if (!process) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Process not found</p>
      </div>
    )
  }

  const getStatusColor = (status: Process['status']) => {
    switch (status) {
      case 'automated':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'optimized':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'documented':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'discovered':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
  }

  const getComplianceColor = (compliance: Process['compliance']) => {
    switch (compliance) {
      case 'compliant':
        return 'text-green-600'
      case 'review_needed':
        return 'text-yellow-600'
      case 'non_compliant':
        return 'text-red-600'
    }
  }

  return (
    <div>
      <div className="mb-6">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft size={20} />
          Back to Process Library
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{process.name}</h1>
            <p className="text-muted-foreground mb-4">{process.description}</p>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(process.status)}`}>
                {process.status}
              </span>
              <span className="text-sm text-muted-foreground">{process.department}</span>
              <span className="text-sm text-muted-foreground">Updated {process.lastUpdated}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
              <Share size={16} />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
              <Edit size={16} />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              <Play size={16} />
              Run Process
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-primary" size={20} />
            <span className="text-sm font-medium">Duration</span>
          </div>
          <p className="text-2xl font-bold">
            {Math.floor(process.totalDuration / 60)}h {process.totalDuration % 60}m
          </p>
          <p className="text-sm text-muted-foreground">{process.frequency}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-primary" size={20} />
            <span className="text-sm font-medium">Efficiency</span>
          </div>
          <p className="text-2xl font-bold">{process.efficiency}%</p>
          <p className="text-sm text-muted-foreground">Current performance</p>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-primary" size={20} />
            <span className="text-sm font-medium">Automation</span>
          </div>
          <p className="text-2xl font-bold">{process.automationPotential}%</p>
          <p className="text-sm text-muted-foreground">Potential</p>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-primary" size={20} />
            <span className="text-sm font-medium">Savings</span>
          </div>
          <p className="text-2xl font-bold">{process.potentialSavings}h</p>
          <p className="text-sm text-muted-foreground">Per month</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-6 border-b border-border">
          {['overview', 'steps', 'participants', 'analytics', 'optimization'].map((tab) => (
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

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Interactive Process Flow</h3>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm border border-input rounded-md hover:bg-accent">
                    Zoom In
                  </button>
                  <button className="px-3 py-1 text-sm border border-input rounded-md hover:bg-accent">
                    Reset View
                  </button>
                </div>
              </div>
              <div className="bg-muted/20 p-6 rounded-lg">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="text-xs text-muted-foreground">Legend:</div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-xs">Optimized</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-xs">Bottleneck</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-xs">Normal</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4">
                  {process.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`relative group cursor-pointer p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          step.isBottleneck
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        }`}
                        title={`${step.name} - ${step.duration} min`}
                      >
                        <div className="text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                              step.isBottleneck ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="text-xs font-medium max-w-20 truncate">{step.name}</div>
                          <div className="text-xs text-muted-foreground">{step.duration}m</div>
                        </div>

                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                          <div className="font-medium">{step.name}</div>
                          <div>Duration: {step.duration} minutes</div>
                          <div>Owner: {step.responsible}</div>
                          {step.tools && <div>Tools: {step.tools.join(', ')}</div>}
                        </div>
                      </div>

                      {index < process.steps.length - 1 && (
                        <div className="flex items-center mx-2">
                          <ArrowRight className="text-muted-foreground" size={20} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-background rounded border">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Process Duration:</span>
                    <span className="font-medium">
                      {Math.floor(process.totalDuration / 60)}h {process.totalDuration % 60}m
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Bottleneck Steps:</span>
                    <span className="font-medium text-red-600">
                      {process.steps.filter((s) => s.isBottleneck).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Automation Potential:</span>
                    <span className="font-medium text-green-600">
                      {process.automationPotential}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Average Completion Time</p>
                  <p className="text-xl font-bold">
                    {Math.floor(process.totalDuration / 60)}h {process.totalDuration % 60}m
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-xl font-bold">94.2%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bottlenecks</p>
                  <p className="text-xl font-bold">
                    {process.steps.filter((s) => s.isBottleneck).length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="text-xl font-bold">{process.participants.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">Process Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Owner</p>
                  <p className="font-medium">{process.owner}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      process.priority === 'high'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : process.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}
                  >
                    {process.priority}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Compliance Status</p>
                  <p className={`font-medium ${getComplianceColor(process.compliance)}`}>
                    {process.compliance.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tags</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {process.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {suggestions.length > 0 && (
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="text-primary" size={20} />
                  AI Suggestions
                </h3>
                <div className="space-y-3">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="p-3 bg-primary/5 rounded-lg border border-primary/20"
                    >
                      <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{suggestion.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-primary">
                          Save {suggestion.estimatedSavings}h/month
                        </span>
                        <button className="text-primary hover:underline">Apply</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'steps' && (
        <div className="bg-card rounded-lg border border-border">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold">Process Steps</h3>
          </div>
          <div className="divide-y divide-border">
            {process.steps.map((step, index) => (
              <div key={step.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.isBottleneck
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{step.name}</h4>
                      {step.isBottleneck && <AlertTriangle className="text-red-600" size={16} />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{step.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{step.responsible}</span>
                      </div>
                      {step.tools && (
                        <div className="flex items-center gap-1">
                          <span>Tools: {step.tools.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'participants' && (
        <div className="bg-card rounded-lg border border-border">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold">Process Participants</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {process.participants.map((participant) => (
                <div
                  key={participant}
                  className="flex items-center gap-3 p-3 bg-background rounded-lg"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{participant}</p>
                    <p className="text-sm text-muted-foreground">Role in process</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
              <div className="h-48 flex items-center justify-center text-muted-foreground">
                Performance chart placeholder
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">Completion Times</h3>
              <div className="h-48 flex items-center justify-center text-muted-foreground">
                Duration chart placeholder
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Bottleneck Analysis</h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Bottleneck analysis chart placeholder
            </div>
          </div>
        </div>
      )}

      {activeTab === 'optimization' && (
        <div className="space-y-6">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{suggestion.title}</h3>
                    <p className="text-muted-foreground">{suggestion.description}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      suggestion.type === 'automation'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : suggestion.type === 'improvement'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}
                  >
                    {suggestion.type}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Savings</p>
                    <p className="text-lg font-bold">{suggestion.estimatedSavings}h/month</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Implementation Effort</p>
                    <p className="text-lg font-bold capitalize">{suggestion.effort}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Impact</p>
                    <p className="text-lg font-bold capitalize">{suggestion.impact}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    Implement
                  </button>
                  <button className="px-4 py-2 border border-input rounded-md hover:bg-accent">
                    Learn More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <Zap className="mx-auto text-muted-foreground mb-4" size={48} />
              <p className="text-muted-foreground">
                No optimization suggestions available for this process yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
