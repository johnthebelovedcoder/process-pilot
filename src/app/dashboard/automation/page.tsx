'use client'

import { useState } from 'react'
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  Clock, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Cpu,
  Workflow,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  Users
} from 'lucide-react'

const automationRules = [
  {
    id: '1',
    name: 'Invoice Auto-Approval',
    description: 'Automatically approve invoices under $500 from verified vendors',
    status: 'active',
    trigger: 'Invoice received',
    actions: ['Verify vendor', 'Check amount', 'Auto-approve', 'Notify finance'],
    timeSaved: 120,
    processesAffected: 3,
    successRate: 98,
    lastRun: '2 min ago',
    createdBy: 'Michael Chen'
  },
  {
    id: '2',
    name: 'Customer Onboarding Notification',
    description: 'Send welcome email and setup tasks when new customer is added',
    status: 'active',
    trigger: 'New customer in CRM',
    actions: ['Send welcome email', 'Create onboarding tasks', 'Assign CSM'],
    timeSaved: 45,
    processesAffected: 1,
    successRate: 100,
    lastRun: '15 min ago',
    createdBy: 'Sarah Johnson'
  },
  {
    id: '3',
    name: 'Support Ticket Escalation',
    description: 'Escalate high-priority tickets to managers after 2 hours',
    status: 'paused',
    trigger: 'High priority ticket aging',
    actions: ['Check ticket age', 'Notify manager', 'Update priority'],
    timeSaved: 30,
    processesAffected: 2,
    successRate: 95,
    lastRun: '1 day ago',
    createdBy: 'Maria Garcia'
  },
  {
    id: '4',
    name: 'Employee Offboarding Checklist',
    description: 'Automatically create and assign offboarding tasks when employee leaves',
    status: 'draft',
    trigger: 'Employee status change to "Terminated"',
    actions: ['Create checklist', 'Assign to HR', 'Schedule exit interview'],
    timeSaved: 60,
    processesAffected: 1,
    successRate: 0,
    lastRun: 'Never',
    createdBy: 'Lisa Wang'
  }
]

const automationTemplates = [
  {
    name: 'Document Approval Flow',
    description: 'Streamline document review and approval processes',
    category: 'Approval',
    useCases: ['Contract approval', 'Policy review', 'Marketing content'],
    estimatedSavings: 180,
    difficulty: 'Easy'
  },
  {
    name: 'Customer Communication Sequence',
    description: 'Automated follow-up sequences for customer engagement',
    category: 'Communication',
    useCases: ['Onboarding', 'Follow-up', 'Renewal reminders'],
    estimatedSavings: 240,
    difficulty: 'Medium'
  },
  {
    name: 'Data Synchronization',
    description: 'Keep data consistent across multiple systems',
    category: 'Integration',
    useCases: ['CRM sync', 'Inventory updates', 'Financial data'],
    estimatedSavings: 300,
    difficulty: 'Advanced'
  },
  {
    name: 'Report Generation',
    description: 'Automatically generate and distribute regular reports',
    category: 'Reporting',
    useCases: ['Weekly metrics', 'Monthly summaries', 'Compliance reports'],
    estimatedSavings: 120,
    difficulty: 'Easy'
  }
]

const recentActivity = [
  { rule: 'Invoice Auto-Approval', action: 'Processed invoice #INV-2024-1523', time: '2 min ago', status: 'success' },
  { rule: 'Customer Onboarding Notification', action: 'Welcomed new customer: Acme Corp', time: '15 min ago', status: 'success' },
  { rule: 'Invoice Auto-Approval', action: 'Processed invoice #INV-2024-1522', time: '18 min ago', status: 'success' },
  { rule: 'Support Ticket Escalation', action: 'Escalated ticket #SUP-4421', time: '1 hour ago', status: 'success' },
  { rule: 'Invoice Auto-Approval', action: 'Failed to process invoice #INV-2024-1521', time: '2 hours ago', status: 'error' }
]

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState('rules')
  const [filterStatus, setFilterStatus] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="text-green-600" size={16} />
      case 'paused':
        return <Pause className="text-yellow-600" size={16} />
      case 'draft':
        return <Settings className="text-gray-600" size={16} />
      default:
        return <Settings className="text-gray-600" size={16} />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const filteredRules = automationRules.filter(rule => 
    filterStatus === 'all' || rule.status === filterStatus
  )

  const totalTimeSaved = automationRules
    .filter(rule => rule.status === 'active')
    .reduce((sum, rule) => sum + rule.timeSaved, 0)

  const activeRules = automationRules.filter(rule => rule.status === 'active').length
  const averageSuccessRate = Math.round(
    automationRules
      .filter(rule => rule.status === 'active')
      .reduce((sum, rule) => sum + rule.successRate, 0) / activeRules
  )

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Automation Hub</h1>
            <p className="text-muted-foreground">
              Create, manage, and monitor automated workflows to streamline your business processes
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            <Plus size={16} />
            Create Automation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <Zap className="text-primary" size={24} />
            <span className="text-sm text-green-600 font-medium">Active</span>
          </div>
          <p className="text-2xl font-bold mb-1">{activeRules}</p>
          <p className="text-sm text-muted-foreground">Active Rules</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-primary" size={24} />
            <TrendingUp className="text-blue-600" size={16} />
          </div>
          <p className="text-2xl font-bold mb-1">{totalTimeSaved}h</p>
          <p className="text-sm text-muted-foreground">Time Saved/Month</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <Target className="text-primary" size={24} />
            <CheckCircle className="text-green-600" size={16} />
          </div>
          <p className="text-2xl font-bold mb-1">{averageSuccessRate || 0}%</p>
          <p className="text-sm text-muted-foreground">Success Rate</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <Workflow className="text-primary" size={24} />
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
          <p className="text-2xl font-bold mb-1">{automationRules.reduce((sum, rule) => sum + rule.processesAffected, 0)}</p>
          <p className="text-sm text-muted-foreground">Processes Automated</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-6 border-b border-border">
          {['rules', 'templates', 'activity'].map((tab) => (
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
              {tab === 'rules' && ` (${automationRules.length})`}
              {tab === 'templates' && ` (${automationTemplates.length})`}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'rules' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <p className="text-sm text-muted-foreground">
              Showing {filteredRules.length} of {automationRules.length} rules
            </p>
          </div>

          <div className="space-y-4">
            {filteredRules.map((rule) => (
              <div key={rule.id} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(rule.status)}
                      <h3 className="text-lg font-semibold">{rule.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(rule.status)}`}>
                        {rule.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">{rule.description}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>Saves {rule.timeSaved}h/month</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Workflow size={14} />
                        <span>{rule.processesAffected} processes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target size={14} />
                        <span>{rule.successRate}% success rate</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>Created by {rule.createdBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-accent rounded-md">
                      <Settings size={16} />
                    </button>
                    <button className="p-2 hover:bg-accent rounded-md">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Trigger</p>
                      <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-md">
                        <Zap className="text-primary" size={16} />
                        <span className="text-sm">{rule.trigger}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Actions ({rule.actions.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {rule.actions.slice(0, 3).map((action, index) => (
                          <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                            {action}
                          </span>
                        ))}
                        {rule.actions.length > 3 && (
                          <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                            +{rule.actions.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-muted-foreground">
                      Last run: {rule.lastRun}
                    </span>
                    <div className="flex items-center gap-2">
                      {rule.status === 'active' && (
                        <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200">
                          Pause
                        </button>
                      )}
                      {rule.status === 'paused' && (
                        <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 dark:bg-green-900 dark:text-green-200">
                          Resume
                        </button>
                      )}
                      {rule.status === 'draft' && (
                        <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                          Activate
                        </button>
                      )}
                      <button className="px-3 py-1 text-sm border border-input rounded-md hover:bg-accent">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div>
          <div className="mb-6">
            <p className="text-muted-foreground">
              Get started quickly with pre-built automation templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automationTemplates.map((template, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                    <p className="text-muted-foreground text-sm">{template.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Category</p>
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                      {template.category}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Common Use Cases</p>
                    <div className="flex flex-wrap gap-1">
                      {template.useCases.map((useCase, idx) => (
                        <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Estimated Savings</p>
                      <p className="text-lg font-bold text-primary">{template.estimatedSavings}h/month</p>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div>
          <div className="bg-card rounded-lg border border-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-semibold">Recent Automation Activity</h2>
            </div>
            <div className="divide-y divide-border">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium">{activity.rule}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {activity.status === 'success' ? (
                        <CheckCircle className="text-green-600" size={16} />
                      ) : (
                        <AlertCircle className="text-red-600" size={16} />
                      )}
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <button className="text-sm text-primary hover:underline">
                View all activity →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}