'use client'

import { useState } from 'react'
import { 
  Brain, 
  Target, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Lightbulb,
  Shield,
  Zap,
  Eye,
  EyeOff,
  Smartphone,
  Globe,
  Monitor,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  Bell,
  X
} from 'lucide-react'

export default function SmartCoachingPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [coachingEnabled, setCoachingEnabled] = useState(true)
  const [coachingIntensity, setCoachingIntensity] = useState('adaptive')
  const [showSettings, setShowSettings] = useState(false)

  const coachingStats = [
    { label: 'Errors Prevented', value: '47', change: '+23', icon: Shield, color: 'text-green-600' },
    { label: 'Users Coached', value: '156', change: '+28', icon: Users, color: 'text-blue-600' },
    { label: 'Processes Covered', value: '34', change: '+8', icon: Target, color: 'text-purple-600' },
    { label: 'Average Success Rate', value: '94%', change: '+12%', icon: TrendingUp, color: 'text-orange-600' }
  ]

  const recentCoachingEvents = [
    {
      id: 1,
      user: 'Sarah Wilson',
      process: 'Invoice Processing',
      type: 'error_prevention',
      description: 'Prevented incorrect approval amount entry',
      time: '5 min ago',
      saved_time: '15 min'
    },
    {
      id: 2,
      user: 'Mike Chen',
      process: 'Customer Onboarding',
      type: 'guidance',
      description: 'Provided step-by-step guidance for new user',
      time: '12 min ago',
      saved_time: '8 min'
    },
    {
      id: 3,
      user: 'Emma Davis',
      process: 'Expense Approval',
      type: 'suggestion',
      description: 'Suggested faster approval workflow',
      time: '1 hour ago',
      saved_time: '5 min'
    },
    {
      id: 4,
      user: 'John Smith',
      process: 'Project Setup',
      type: 'error_prevention',
      description: 'Warned about missing required fields',
      time: '2 hours ago',
      saved_time: '20 min'
    }
  ]

  const coachingRules = [
    {
      id: 1,
      name: 'New Employee Guidance',
      description: 'Provide detailed coaching for users with < 30 days experience',
      department: 'All',
      active: true,
      users_affected: 23
    },
    {
      id: 2,
      name: 'Critical Process Warnings',
      description: 'Show warnings for processes affecting customer data',
      department: 'Sales, Support',
      active: true,
      users_affected: 67
    },
    {
      id: 3,
      name: 'Efficiency Suggestions',
      description: 'Suggest shortcuts for frequently repeated actions',
      department: 'Operations',
      active: false,
      users_affected: 34
    },
    {
      id: 4,
      name: 'Compliance Reminders',
      description: 'Ensure regulatory requirements are met',
      department: 'Finance, Legal',
      active: true,
      users_affected: 12
    }
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'error_prevention': return <Shield size={16} className="text-red-600" />
      case 'guidance': return <Lightbulb size={16} className="text-blue-600" />
      case 'suggestion': return <Zap size={16} className="text-yellow-600" />
      default: return <HelpCircle size={16} className="text-gray-600" />
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Smart Process Coaching</h1>
            <p className="text-muted-foreground">
              AI-powered guidance to reduce errors and improve process execution
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Coaching</span>
              <button
                onClick={() => setCoachingEnabled(!coachingEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  coachingEnabled ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    coachingEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <button 
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              <Settings size={16} />
              Configure
            </button>
          </div>
        </div>
      </div>

      {/* Status Alert */}
      {coachingEnabled && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 dark:bg-green-900/20 dark:border-green-800">
          <div className="flex items-center gap-3">
            <Brain className="text-green-600" size={20} />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">Smart Coaching Active</p>
              <p className="text-sm text-green-600 dark:text-green-300">
                AI coaching is monitoring {coachingRules.filter(r => r.active).length} active rules across all departments
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-6 border-b border-border">
          {[
            { id: 'overview', label: 'Overview', icon: Brain },
            { id: 'events', label: 'Coaching Events', icon: Bell },
            { id: 'rules', label: 'Coaching Rules', icon: Target },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coachingStats.map((stat, index) => {
              const Icon = stat.icon
              const isPositive = stat.change.startsWith('+')
              return (
                <div key={index} className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-md bg-gray-100 dark:bg-gray-800`}>
                      <Icon size={20} className={stat.color} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} this week
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recent Events and Active Rules */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Coaching Events */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Coaching Events</h2>
                <button className="text-sm text-primary hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {recentCoachingEvents.slice(0, 4).map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                    <div className="mt-1">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{event.user}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{event.process}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{event.time}</span>
                        <span className="text-green-600">Saved {event.saved_time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Coaching Rules */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Active Coaching Rules</h2>
                <button className="text-sm text-primary hover:underline">Manage Rules</button>
              </div>
              <div className="space-y-3">
                {coachingRules.filter(rule => rule.active).map((rule) => (
                  <div key={rule.id} className="p-3 bg-background rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm">{rule.name}</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900/30 dark:text-green-400">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{rule.department}</span>
                      <span>{rule.users_affected} users affected</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coaching Events Tab */}
      {activeTab === 'events' && (
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Coaching Events</h2>
              <div className="flex items-center gap-3">
                <select className="px-3 py-1 text-sm bg-background border border-input rounded">
                  <option>All Types</option>
                  <option>Error Prevention</option>
                  <option>Guidance</option>
                  <option>Suggestions</option>
                </select>
                <select className="px-3 py-1 text-sm bg-background border border-input rounded">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium">User</th>
                  <th className="text-left p-4 font-medium">Process</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Description</th>
                  <th className="text-left p-4 font-medium">Time Saved</th>
                  <th className="text-left p-4 font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {recentCoachingEvents.map((event) => (
                  <tr key={event.id} className="border-b border-border hover:bg-accent/50">
                    <td className="p-4 font-medium">{event.user}</td>
                    <td className="p-4">{event.process}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getEventIcon(event.type)}
                        <span className="text-sm capitalize">{event.type.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{event.description}</td>
                    <td className="p-4 text-sm text-green-600">{event.saved_time}</td>
                    <td className="p-4 text-sm text-muted-foreground">{event.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Coaching Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Coaching Rules</h2>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                Create New Rule
              </button>
            </div>
            <div className="space-y-4">
              {coachingRules.map((rule) => (
                <div key={rule.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{rule.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        rule.active 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {rule.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-sm text-primary hover:underline">Edit</button>
                      <button
                        className={`relative w-10 h-5 rounded-full transition-colors ${
                          rule.active ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                            rule.active ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Department: {rule.department}</span>
                    <span>{rule.users_affected} users affected</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">Error Prevention Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Errors Prevented This Month</span>
                  <span className="font-bold text-green-600">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Time Saved</span>
                  <span className="font-bold text-blue-600">47 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cost Savings Estimated</span>
                  <span className="font-bold text-purple-600">$12,400</span>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">User Adoption</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Users</span>
                  <span className="font-bold">156 / 200</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>78% adoption rate</span>
                  <span>+12% this month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border border-border w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Coaching Settings</h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-accent rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Coaching Intensity</label>
                <div className="space-y-2">
                  {[
                    { id: 'minimal', label: 'Minimal', description: 'Only critical errors and warnings' },
                    { id: 'adaptive', label: 'Adaptive', description: 'Adjusts based on user experience level' },
                    { id: 'comprehensive', label: 'Comprehensive', description: 'Full guidance and suggestions' }
                  ].map((option) => (
                    <div key={option.id} className="flex items-center gap-3">
                      <input
                        type="radio"
                        id={option.id}
                        name="intensity"
                        checked={coachingIntensity === option.id}
                        onChange={() => setCoachingIntensity(option.id)}
                        className="w-4 h-4"
                      />
                      <div>
                        <label htmlFor={option.id} className="font-medium text-sm">{option.label}</label>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Integration Platforms</label>
                <div className="space-y-2">
                  {[
                    { id: 'browser', label: 'Browser Extension', icon: Globe, enabled: true },
                    { id: 'mobile', label: 'Mobile App', icon: Smartphone, enabled: true },
                    { id: 'desktop', label: 'Desktop Application', icon: Monitor, enabled: false }
                  ].map((platform) => (
                    <div key={platform.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <platform.icon size={20} />
                        <span className="font-medium text-sm">{platform.label}</span>
                      </div>
                      <button
                        className={`relative w-10 h-5 rounded-full transition-colors ${
                          platform.enabled ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                            platform.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 border border-input rounded-md hover:bg-accent"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}