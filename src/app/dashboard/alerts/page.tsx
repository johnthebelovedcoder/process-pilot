'use client'

import { useState } from 'react'
import { 
  Bell, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Mail,
  Phone,
  MessageSquare,
  Settings,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  Copy,
  Target,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Filter,
  Search,
  MoreHorizontal,
  Zap,
  AlertCircle,
  Info,
  X,
  Save,
  TestTube,
  Send,
  History,
  Activity,
  BarChart3,
  Database,
  Workflow,
  RefreshCw
} from 'lucide-react'

const alertTypes = [
  { id: 'threshold', name: 'Threshold Alert', icon: Target, description: 'Trigger when metrics cross thresholds' },
  { id: 'trend', name: 'Trend Alert', icon: TrendingUp, description: 'Detect significant trend changes' },
  { id: 'anomaly', name: 'Anomaly Detection', icon: AlertTriangle, description: 'Identify unusual patterns' },
  { id: 'sla', name: 'SLA Breach', icon: Clock, description: 'Monitor service level agreements' },
  { id: 'system', name: 'System Alert', icon: Database, description: 'System health and performance' },
  { id: 'process', name: 'Process Alert', icon: Workflow, description: 'Process execution and status' }
]

const notificationChannels = [
  { id: 'email', name: 'Email', icon: Mail, description: 'Send email notifications' },
  { id: 'sms', name: 'SMS', icon: Phone, description: 'Send text messages' },
  { id: 'slack', name: 'Slack', icon: MessageSquare, description: 'Post to Slack channels' },
  { id: 'webhook', name: 'Webhook', icon: Zap, description: 'HTTP webhook integration' },
  { id: 'push', name: 'Push Notification', icon: Bell, description: 'Browser push notifications' }
]

const severityLevels = [
  { id: 'low', name: 'Low', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
  { id: 'medium', name: 'Medium', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30' },
  { id: 'high', name: 'High', color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30' },
  { id: 'critical', name: 'Critical', color: 'text-red-600 bg-red-100 dark:bg-red-900/30' }
]

const mockAlerts = [
  {
    id: '1',
    name: 'Process Efficiency Below 80%',
    type: 'threshold',
    severity: 'high',
    status: 'active',
    metric: 'Process Efficiency',
    condition: 'below 80%',
    channels: ['email', 'slack'],
    lastTriggered: '2 hours ago',
    triggerCount: 5,
    created: '2024-01-15'
  },
  {
    id: '2',
    name: 'Customer Onboarding Time Spike',
    type: 'anomaly',
    severity: 'medium',
    status: 'active',
    metric: 'Onboarding Duration',
    condition: '50% above average',
    channels: ['email'],
    lastTriggered: '1 day ago',
    triggerCount: 2,
    created: '2024-01-10'
  },
  {
    id: '3',
    name: 'SLA Breach - Response Time',
    type: 'sla',
    severity: 'critical',
    status: 'paused',
    metric: 'Response Time',
    condition: 'exceeds 4 hours',
    channels: ['email', 'sms', 'slack'],
    lastTriggered: 'Never',
    triggerCount: 0,
    created: '2024-01-08'
  },
  {
    id: '4',
    name: 'Weekly Process Review',
    type: 'system',
    severity: 'low',
    status: 'active',
    metric: 'System Health',
    condition: 'scheduled weekly',
    channels: ['email'],
    lastTriggered: '3 days ago',
    triggerCount: 12,
    created: '2024-01-01'
  }
]

const recentNotifications = [
  {
    id: '1',
    title: 'Process Efficiency Alert',
    message: 'Customer Support process efficiency dropped to 76%',
    severity: 'high',
    timestamp: '2 hours ago',
    channel: 'email',
    read: false
  },
  {
    id: '2',
    title: 'Anomaly Detected',
    message: 'Unusual spike in invoice processing time detected',
    severity: 'medium',
    timestamp: '1 day ago',
    channel: 'slack',
    read: true
  },
  {
    id: '3',
    title: 'Weekly Report',
    message: 'Weekly process performance summary is ready',
    severity: 'low',
    timestamp: '3 days ago',
    channel: 'email',
    read: true
  }
]

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('alerts')
  const [showCreateAlert, setShowCreateAlert] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSeverity, setFilterSeverity] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [alertForm, setAlertForm] = useState({
    name: '',
    type: 'threshold',
    metric: '',
    condition: '',
    threshold: '',
    operator: 'above',
    severity: 'medium',
    channels: [],
    description: '',
    enabled: true
  })

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = alert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.metric.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity
    return matchesSearch && matchesStatus && matchesSeverity
  })

  const handleCreateAlert = () => {
    setShowCreateAlert(true)
    setAlertForm({
      name: '',
      type: 'threshold',
      metric: '',
      condition: '',
      threshold: '',
      operator: 'above',
      severity: 'medium',
      channels: [],
      description: '',
      enabled: true
    })
  }

  const handleSaveAlert = () => {
    console.log('Saving alert:', alertForm)
    setShowCreateAlert(false)
  }

  const toggleChannel = (channelId) => {
    const channels = alertForm.channels.includes(channelId)
      ? alertForm.channels.filter(c => c !== channelId)
      : [...alertForm.channels, channelId]
    setAlertForm({ ...alertForm, channels })
  }

  const testAlert = (alert) => {
    console.log('Testing alert:', alert.name)
    // Simulate test notification
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Alerts & Notifications</h1>
            <p className="text-muted-foreground">
              Monitor key metrics and get notified when attention is needed
            </p>
          </div>
          <button 
            onClick={handleCreateAlert}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Plus size={16} />
            Create Alert
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-6 border-b border-border">
          {['alerts', 'notifications', 'settings'].map((tab) => (
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
              {tab === 'alerts' && ` (${mockAlerts.length})`}
              {tab === 'notifications' && ` (${recentNotifications.filter(n => !n.read).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6 bg-card p-4 rounded-lg border border-border">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const alertType = alertTypes.find(t => t.id === alert.type)
              const AlertIcon = alertType?.icon || Bell
              const severity = severityLevels.find(s => s.id === alert.severity)
              
              return (
                <div key={alert.id} className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertIcon size={20} className="text-primary" />
                        <h3 className="text-lg font-semibold">{alert.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${severity?.color}`}>
                          {severity?.name}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          alert.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {alert.metric} {alert.condition}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium">{alertType?.name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Triggered</p>
                          <p className="font-medium">{alert.lastTriggered}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Trigger Count</p>
                          <p className="font-medium">{alert.triggerCount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Channels</p>
                          <div className="flex gap-1 mt-1">
                            {alert.channels.map((channelId) => {
                              const channel = notificationChannels.find(c => c.id === channelId)
                              const ChannelIcon = channel?.icon || Bell
                              return (
                                <div key={channelId} className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center">
                                  <ChannelIcon size={12} className="text-primary" />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button 
                        onClick={() => testAlert(alert)}
                        className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm"
                      >
                        <TestTube size={14} />
                        Test
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                        <Eye size={14} />
                        View
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                        <Edit size={14} />
                        Edit
                      </button>
                      <button className="p-2 hover:bg-accent rounded-md">
                        {alert.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <button className="p-2 hover:bg-accent rounded-md">
                        <Copy size={16} />
                      </button>
                      <button className="p-2 hover:bg-accent rounded-md text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {recentNotifications.map((notification) => {
                  const severity = severityLevels.find(s => s.id === notification.severity)
                  const channel = notificationChannels.find(c => c.id === notification.channel)
                  const ChannelIcon = channel?.icon || Bell
                  
                  return (
                    <div 
                      key={notification.id} 
                      className={`bg-card p-4 rounded-lg border transition-colors ${
                        notification.read ? 'border-border' : 'border-primary/50 bg-primary/5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.read ? 'bg-gray-400' : 'bg-primary'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${severity?.color}`}>
                              {severity?.name}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{notification.message}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <ChannelIcon size={12} />
                            <span>{channel?.name}</span>
                            <span>•</span>
                            <span>{notification.timestamp}</span>
                          </div>
                        </div>
                        <button className="p-1 hover:bg-accent rounded">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="text-center mt-6">
                <button className="text-sm text-primary hover:underline">
                  View All Notifications
                </button>
              </div>
            </div>

            {/* Notification Stats */}
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">Notification Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Today</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Week</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Month</span>
                    <span className="font-medium">184</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">Top Alert Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target size={14} className="text-orange-600" />
                      <span className="text-sm">Threshold</span>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={14} className="text-red-600" />
                      <span className="text-sm">Anomaly</span>
                    </div>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-yellow-600" />
                      <span className="text-sm">SLA</span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl">
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Default Channels</h3>
                  <div className="space-y-3">
                    {notificationChannels.map((channel) => {
                      const Icon = channel.icon
                      return (
                        <div key={channel.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon size={20} />
                            <div>
                              <p className="font-medium">{channel.name}</p>
                              <p className="text-sm text-muted-foreground">{channel.description}</p>
                            </div>
                          </div>
                          <input type="checkbox" className="w-4 h-4" />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Alert Frequency</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Maximum alerts per hour</span>
                      <input 
                        type="number" 
                        defaultValue="10" 
                        className="w-20 px-3 py-1 bg-background border border-input rounded-md text-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Quiet hours (no notifications)</span>
                      <div className="flex items-center gap-2">
                        <input 
                          type="time" 
                          defaultValue="22:00" 
                          className="px-3 py-1 bg-background border border-input rounded-md text-sm"
                        />
                        <span className="text-sm">to</span>
                        <input 
                          type="time" 
                          defaultValue="08:00" 
                          className="px-3 py-1 bg-background border border-input rounded-md text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Severity Filters</h3>
                  <div className="space-y-2">
                    {severityLevels.map((level) => (
                      <div key={level.id} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{level.name} alerts</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Alert Modal */}
      {showCreateAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Create New Alert</h2>
                <button 
                  onClick={() => setShowCreateAlert(false)}
                  className="p-2 hover:bg-accent rounded-md"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Alert Name</label>
                <input
                  type="text"
                  value={alertForm.name}
                  onChange={(e) => setAlertForm({ ...alertForm, name: e.target.value })}
                  placeholder="e.g., Process Efficiency Alert"
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Alert Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {alertTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => setAlertForm({ ...alertForm, type: type.id })}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          alertForm.type === type.id
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Metric</label>
                  <select
                    value={alertForm.metric}
                    onChange={(e) => setAlertForm({ ...alertForm, metric: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select metric...</option>
                    <option value="process_efficiency">Process Efficiency</option>
                    <option value="completion_time">Completion Time</option>
                    <option value="error_rate">Error Rate</option>
                    <option value="throughput">Throughput</option>
                    <option value="sla_compliance">SLA Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Severity</label>
                  <select
                    value={alertForm.severity}
                    onChange={(e) => setAlertForm({ ...alertForm, severity: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {severityLevels.map((level) => (
                      <option key={level.id} value={level.id}>{level.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Condition</label>
                  <select
                    value={alertForm.operator}
                    onChange={(e) => setAlertForm({ ...alertForm, operator: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                    <option value="equals">Equals</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Threshold</label>
                  <input
                    type="text"
                    value={alertForm.threshold}
                    onChange={(e) => setAlertForm({ ...alertForm, threshold: e.target.value })}
                    placeholder="e.g., 80, 50%, 2 hours"
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notification Channels</label>
                <div className="grid grid-cols-2 gap-3">
                  {notificationChannels.map((channel) => {
                    const Icon = channel.icon
                    const isSelected = alertForm.channels.includes(channel.id)
                    return (
                      <button
                        key={channel.id}
                        onClick={() => toggleChannel(channel.id)}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon size={16} />
                          <span className="font-medium text-sm">{channel.name}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={alertForm.description}
                  onChange={(e) => setAlertForm({ ...alertForm, description: e.target.value })}
                  placeholder="Optional description for this alert..."
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateAlert(false)}
                className="px-6 py-2 border border-input rounded-md hover:bg-accent"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveAlert}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                <Save size={16} />
                Create Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}