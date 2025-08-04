'use client'

import { useState } from 'react'
import {
  Link2,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Settings,
  RefreshCw,
  Search,
  Filter,
  Clock,
  Activity,
  Zap,
  Database,
  Globe,
  Cpu,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Key,
  Shield,
  Lock,
  Unlock,
  Bell,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  FileText,
  Code,
  Terminal,
  Webhook,
  Cloud,
  Server,
  Network,
  Wifi,
  WifiOff,
  Power,
  PowerOff,
  Play,
  Pause,
  Square,
  RotateCcw,
  Copy,
  ExternalLink,
  Monitor,
  Smartphone,
  Mail,
  MessageSquare,
  Phone,
  Video,
  Share,
  Archive,
  Star,
  Heart,
  Flag,
  Bookmark,
  Tag,
  Layers,
  Grid3X3,
  List,
  X,
  Save,
  Send,
  Paperclip,
  Image,
  Mic,
  Camera,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Target,
  Award,
  Brain,
  Workflow,
  GitBranch,
  Layout,
  LayoutDashboard,
} from 'lucide-react'
import Link from 'next/link'

const integrationCategories = [
  {
    name: 'CRM & Sales',
    icon: Building2,
    integrations: [
      {
        id: 'salesforce',
        name: 'Salesforce',
        icon: Cloud,
        status: 'connected',
        processes: 23,
        lastSync: '2 min ago',
        description: 'Customer relationship management platform',
        authType: 'OAuth 2.0',
        syncFrequency: 'Real-time',
        dataPoints: 1247,
        healthScore: 95,
        version: 'v54.0',
        apiCalls: '1.2k/day',
        permissions: ['Read Contacts', 'Write Opportunities', 'Read Activities'],
        webhooks: 3,
        features: [
          'Lead Tracking',
          'Opportunity Management',
          'Contact Sync',
          'Activity Monitoring',
        ],
      },
      {
        id: 'hubspot',
        name: 'HubSpot',
        icon: Target,
        status: 'error',
        processes: 12,
        lastSync: '2 hours ago',
        description: 'Marketing automation and sales platform',
        authType: 'API Key',
        syncFrequency: 'Every 15 minutes',
        dataPoints: 0,
        healthScore: 25,
        version: 'v3',
        apiCalls: '0/day',
        permissions: ['Read Contacts', 'Write Deals'],
        webhooks: 0,
        features: ['Marketing Automation', 'Deal Pipeline', 'Email Tracking'],
        error: 'Authentication failed - API key expired',
      },
      {
        id: 'pipedrive',
        name: 'Pipedrive',
        icon: BarChart3,
        status: 'available',
        processes: 0,
        lastSync: null,
        description: 'Sales pipeline management tool',
        authType: 'OAuth 2.0',
        syncFrequency: 'Every 30 minutes',
        dataPoints: 0,
        healthScore: 0,
        version: 'v1',
        apiCalls: '0/day',
        permissions: [],
        webhooks: 0,
        features: ['Pipeline Management', 'Activity Tracking', 'Sales Reports'],
      },
    ],
  },
  {
    name: 'Communication',
    icon: MessageSquare,
    integrations: [
      {
        id: 'slack',
        name: 'Slack',
        icon: MessageSquare,
        status: 'connected',
        processes: 18,
        lastSync: '1 min ago',
        description: 'Team messaging and collaboration platform',
        authType: 'OAuth 2.0',
        syncFrequency: 'Real-time',
        dataPoints: 856,
        healthScore: 98,
        version: 'v1.7',
        apiCalls: '2.8k/day',
        permissions: ['Read Messages', 'Write Messages', 'Read Channels'],
        webhooks: 5,
        features: ['Message Analysis', 'Channel Monitoring', 'Bot Integration', 'File Sharing'],
      },
      {
        id: 'teams',
        name: 'Microsoft Teams',
        icon: Video,
        status: 'connected',
        processes: 32,
        lastSync: '3 min ago',
        description: 'Video conferencing and team collaboration',
        authType: 'Azure AD',
        syncFrequency: 'Real-time',
        dataPoints: 1432,
        healthScore: 92,
        version: 'v1.0',
        apiCalls: '3.1k/day',
        permissions: ['Read Messages', 'Read Meetings', 'Read Users'],
        webhooks: 4,
        features: [
          'Meeting Analytics',
          'Chat Monitoring',
          'File Collaboration',
          'Calendar Integration',
        ],
      },
      {
        id: 'discord',
        name: 'Discord',
        icon: Users,
        status: 'available',
        processes: 0,
        lastSync: null,
        description: 'Voice and text communication platform',
        authType: 'Bot Token',
        syncFrequency: 'Real-time',
        dataPoints: 0,
        healthScore: 0,
        version: 'v10',
        apiCalls: '0/day',
        permissions: [],
        webhooks: 0,
        features: ['Voice Channel Analysis', 'Text Monitoring', 'Server Management'],
      },
    ],
  },
  {
    name: 'Productivity',
    icon: Workflow,
    integrations: [
      {
        id: 'microsoft365',
        name: 'Microsoft 365',
        icon: Grid3X3,
        status: 'connected',
        processes: 45,
        lastSync: '30 sec ago',
        description: 'Office suite and productivity platform',
        authType: 'Azure AD',
        syncFrequency: 'Real-time',
        dataPoints: 2341,
        healthScore: 97,
        version: 'v1.0',
        apiCalls: '4.5k/day',
        permissions: ['Read Files', 'Read Calendar', 'Read Mail', 'Read Users'],
        webhooks: 8,
        features: [
          'Email Analysis',
          'Calendar Integration',
          'Document Workflow',
          'SharePoint Sync',
        ],
      },
      {
        id: 'googleworkspace',
        name: 'Google Workspace',
        icon: Globe,
        status: 'available',
        processes: 0,
        lastSync: null,
        description: 'Email, docs, and productivity tools',
        authType: 'OAuth 2.0',
        syncFrequency: 'Every 5 minutes',
        dataPoints: 0,
        healthScore: 0,
        version: 'v1',
        apiCalls: '0/day',
        permissions: [],
        webhooks: 0,
        features: ['Gmail Integration', 'Drive Sync', 'Calendar Analysis', 'Meet Insights'],
      },
      {
        id: 'jira',
        name: 'Jira',
        icon: Target,
        status: 'disconnected',
        processes: 8,
        lastSync: '1 day ago',
        description: 'Project tracking and agile development',
        authType: 'API Token',
        syncFrequency: 'Every 15 minutes',
        dataPoints: 0,
        healthScore: 0,
        version: 'v3',
        apiCalls: '0/day',
        permissions: ['Read Issues', 'Read Projects'],
        webhooks: 2,
        features: ['Issue Tracking', 'Sprint Analysis', 'Workflow Monitoring'],
        error: 'Connection timeout - server unreachable',
      },
    ],
  },
  {
    name: 'ERP & Finance',
    icon: Database,
    integrations: [
      {
        id: 'sap',
        name: 'SAP',
        icon: Server,
        status: 'connected',
        processes: 31,
        lastSync: '5 min ago',
        description: 'Enterprise resource planning system',
        authType: 'SAML',
        syncFrequency: 'Every 10 minutes',
        dataPoints: 1876,
        healthScore: 89,
        version: 'S/4HANA',
        apiCalls: '892/day',
        permissions: ['Read Financial Data', 'Read HR Data', 'Read Inventory'],
        webhooks: 2,
        features: ['Financial Processes', 'HR Workflows', 'Supply Chain', 'Procurement'],
      },
      {
        id: 'oracle',
        name: 'Oracle',
        icon: Database,
        status: 'available',
        processes: 0,
        lastSync: null,
        description: 'Database and enterprise software suite',
        authType: 'Database Auth',
        syncFrequency: 'Every 30 minutes',
        dataPoints: 0,
        healthScore: 0,
        version: '19c',
        apiCalls: '0/day',
        permissions: [],
        webhooks: 0,
        features: ['Database Monitoring', 'ERP Integration', 'Cloud Services'],
      },
      {
        id: 'quickbooks',
        name: 'QuickBooks',
        icon: BarChart3,
        status: 'available',
        processes: 0,
        lastSync: null,
        description: 'Accounting and bookkeeping software',
        authType: 'OAuth 2.0',
        syncFrequency: 'Every 1 hour',
        dataPoints: 0,
        healthScore: 0,
        version: 'v3',
        apiCalls: '0/day',
        permissions: [],
        webhooks: 0,
        features: ['Invoice Processing', 'Payment Tracking', 'Financial Reports'],
      },
    ],
  },
  {
    name: 'Development & DevOps',
    icon: Code,
    integrations: [
      {
        id: 'github',
        name: 'GitHub',
        icon: GitBranch,
        status: 'connected',
        processes: 15,
        lastSync: '1 min ago',
        description: 'Code repository and collaboration platform',
        authType: 'OAuth 2.0',
        syncFrequency: 'Real-time',
        dataPoints: 654,
        healthScore: 96,
        version: 'v4',
        apiCalls: '1.8k/day',
        permissions: ['Read Repositories', 'Read Issues', 'Read Pull Requests'],
        webhooks: 6,
        features: [
          'Code Review Process',
          'CI/CD Monitoring',
          'Issue Tracking',
          'Release Management',
        ],
      },
      {
        id: 'jenkins',
        name: 'Jenkins',
        icon: Workflow,
        status: 'connected',
        processes: 12,
        lastSync: '5 min ago',
        description: 'Continuous integration and deployment',
        authType: 'API Token',
        syncFrequency: 'Every 5 minutes',
        dataPoints: 423,
        healthScore: 88,
        version: '2.401',
        apiCalls: '567/day',
        permissions: ['Read Jobs', 'Read Builds'],
        webhooks: 3,
        features: ['Build Monitoring', 'Deployment Tracking', 'Pipeline Analysis'],
      },
    ],
  },
  {
    name: 'Cloud Infrastructure',
    icon: Cloud,
    integrations: [
      {
        id: 'aws',
        name: 'Amazon Web Services',
        icon: Cloud,
        status: 'connected',
        processes: 28,
        lastSync: '2 min ago',
        description: 'Cloud computing and infrastructure services',
        authType: 'IAM Roles',
        syncFrequency: 'Every 5 minutes',
        dataPoints: 1923,
        healthScore: 94,
        version: 'v1',
        apiCalls: '2.1k/day',
        permissions: ['Read EC2', 'Read S3', 'Read CloudWatch'],
        webhooks: 4,
        features: [
          'Infrastructure Monitoring',
          'Cost Analysis',
          'Security Compliance',
          'Resource Management',
        ],
      },
      {
        id: 'azure',
        name: 'Microsoft Azure',
        icon: Cloud,
        status: 'available',
        processes: 0,
        lastSync: null,
        description: 'Cloud platform and infrastructure services',
        authType: 'Azure AD',
        syncFrequency: 'Every 5 minutes',
        dataPoints: 0,
        healthScore: 0,
        version: 'v1',
        apiCalls: '0/day',
        permissions: [],
        webhooks: 0,
        features: ['Resource Monitoring', 'Cost Management', 'Security Center'],
      },
    ],
  },
]

const recentActivity = [
  {
    id: '1',
    integration: 'Microsoft 365',
    action: 'Process discovered',
    detail: 'Email approval workflow detected in Outlook',
    time: '2 min ago',
    type: 'discovery',
    severity: 'info',
    processId: 'proc_365_001',
  },
  {
    id: '2',
    integration: 'Salesforce',
    action: 'Data sync completed',
    detail: '1,247 contact records and 89 opportunities updated',
    time: '5 min ago',
    type: 'sync',
    severity: 'success',
    dataVolume: '1.2MB',
  },
  {
    id: '3',
    integration: 'Slack',
    action: 'New process identified',
    detail: 'Support escalation workflow mapped from #support-team',
    time: '12 min ago',
    type: 'discovery',
    severity: 'info',
    processId: 'proc_slack_002',
  },
  {
    id: '4',
    integration: 'SAP',
    action: 'Webhook triggered',
    detail: 'Financial process automation updated via webhook',
    time: '18 min ago',
    type: 'webhook',
    severity: 'success',
    webhookId: 'wh_sap_fin_001',
  },
  {
    id: '5',
    integration: 'HubSpot',
    action: 'Authentication failed',
    detail: 'API key expired - integration disconnected',
    time: '2 hours ago',
    type: 'error',
    severity: 'error',
    errorCode: 'AUTH_EXPIRED',
  },
  {
    id: '6',
    integration: 'GitHub',
    action: 'CI/CD process mapped',
    detail: 'Deploy pipeline workflow discovered in repository',
    time: '25 min ago',
    type: 'discovery',
    severity: 'info',
    processId: 'proc_gh_cicd_001',
  },
  {
    id: '7',
    integration: 'AWS',
    action: 'Infrastructure scan',
    detail: 'EC2 auto-scaling processes analyzed',
    time: '35 min ago',
    type: 'scan',
    severity: 'info',
    resourceCount: 23,
  },
]

const webhookEvents = [
  {
    id: 'wh_001',
    integration: 'Salesforce',
    event: 'opportunity.updated',
    status: 'success',
    timestamp: '2024-01-15 14:32:15',
    payload: '{"id": "opp_123", "stage": "closed-won", "amount": 15000}',
    responseTime: '245ms',
    retryCount: 0,
  },
  {
    id: 'wh_002',
    integration: 'Slack',
    event: 'message.sent',
    status: 'success',
    timestamp: '2024-01-15 14:31:48',
    payload: '{"channel": "support", "user": "john.doe", "message": "Issue resolved"}',
    responseTime: '156ms',
    retryCount: 0,
  },
  {
    id: 'wh_003',
    integration: 'Microsoft Teams',
    event: 'meeting.ended',
    status: 'failed',
    timestamp: '2024-01-15 14:30:22',
    payload: '{"meeting_id": "meet_456", "duration": 3600}',
    responseTime: 'timeout',
    retryCount: 3,
    error: 'Connection timeout after 30s',
  },
]

const apiMetrics = [
  {
    integration: 'Salesforce',
    requestsToday: 1247,
    responseTime: '245ms',
    errorRate: '0.2%',
    uptime: '99.9%',
    rateLimitUsed: '45%',
    trend: 'up',
  },
  {
    integration: 'Microsoft 365',
    requestsToday: 4532,
    responseTime: '189ms',
    errorRate: '0.1%',
    uptime: '99.95%',
    rateLimitUsed: '23%',
    trend: 'stable',
  },
  {
    integration: 'Slack',
    requestsToday: 2891,
    responseTime: '156ms',
    errorRate: '0.3%',
    uptime: '99.8%',
    rateLimitUsed: '67%',
    trend: 'up',
  },
  {
    integration: 'GitHub',
    requestsToday: 1834,
    responseTime: '298ms',
    errorRate: '0.5%',
    uptime: '99.7%',
    rateLimitUsed: '34%',
    trend: 'down',
  },
]

const integrationTemplates = [
  {
    id: 'custom-api',
    name: 'Custom REST API',
    description: 'Connect any REST API with custom authentication',
    category: 'Custom',
    authTypes: ['API Key', 'OAuth 2.0', 'Basic Auth', 'Bearer Token'],
    features: ['Custom Headers', 'Request Mapping', 'Response Parsing', 'Error Handling'],
    complexity: 'medium',
  },
  {
    id: 'database',
    name: 'Database Connection',
    description: 'Direct database integration for process mining',
    category: 'Data Sources',
    authTypes: ['Database Credentials', 'Connection String'],
    features: ['SQL Queries', 'Table Mapping', 'Real-time Sync', 'Batch Processing'],
    complexity: 'high',
  },
  {
    id: 'webhook-listener',
    name: 'Webhook Endpoint',
    description: 'Create webhook endpoints for external systems',
    category: 'Custom',
    authTypes: ['API Key', 'HMAC Signature', 'IP Whitelist'],
    features: ['Event Filtering', 'Payload Validation', 'Rate Limiting', 'Retry Logic'],
    complexity: 'low',
  },
]

const securityAlerts = [
  {
    id: 'sec_001',
    integration: 'HubSpot',
    type: 'authentication',
    severity: 'critical',
    message: 'API key has expired and needs renewal',
    timestamp: '2 hours ago',
    status: 'active',
  },
  {
    id: 'sec_002',
    integration: 'Jira',
    type: 'connection',
    severity: 'warning',
    message: 'Connection timeout detected - verify network settings',
    timestamp: '1 day ago',
    status: 'acknowledged',
  },
  {
    id: 'sec_003',
    integration: 'Salesforce',
    type: 'permissions',
    severity: 'medium',
    message: 'New permissions requested by integration',
    timestamp: '3 days ago',
    status: 'resolved',
  },
]

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)
  const [showIntegrationModal, setShowIntegrationModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showWebhookModal, setShowWebhookModal] = useState(false)
  const [showSecurityModal, setShowSecurityModal] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [filterHealth, setFilterHealth] = useState('all')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="text-green-600" size={20} />
      case 'error':
        return <XCircle className="text-red-600" size={20} />
      case 'disconnected':
        return <AlertCircle className="text-yellow-600" size={20} />
      default:
        return <Plus className="text-muted-foreground" size={20} />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return { text: 'Connected', color: 'text-green-600' }
      case 'error':
        return { text: 'Error', color: 'text-red-600' }
      case 'disconnected':
        return { text: 'Disconnected', color: 'text-yellow-600' }
      default:
        return { text: 'Available', color: 'text-muted-foreground' }
    }
  }

  const filteredIntegrations = integrationCategories
    .flatMap((category) =>
      category.integrations.map((integration) => ({ ...integration, category: category.name }))
    )
    .filter((integration) => {
      const matchesSearch =
        integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === 'all' || integration.category === selectedCategory
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'connected' && integration.status === 'connected') ||
        (activeTab === 'available' && integration.status === 'available') ||
        (activeTab === 'issues' &&
          (integration.status === 'error' || integration.status === 'disconnected'))

      return matchesSearch && matchesCategory && matchesTab
    })

  const connectedCount = integrationCategories
    .flatMap((c) => c.integrations)
    .filter((i) => i.status === 'connected').length
  const availableCount = integrationCategories
    .flatMap((c) => c.integrations)
    .filter((i) => i.status === 'available').length
  const issuesCount = integrationCategories
    .flatMap((c) => c.integrations)
    .filter((i) => i.status === 'error' || i.status === 'disconnected').length

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Integrations</h1>
            <p className="text-muted-foreground">
              Connect and manage your business tools for comprehensive process intelligence
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              <BarChart3 size={16} />
              Analytics
            </Link>
            <button
              onClick={() => setShowWebhookModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              <Webhook size={16} />
              Webhooks
            </button>
            <button
              onClick={() => setShowSecurityModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              <Shield size={16} />
              Security
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              <Plus size={16} />
              Add Integration
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex gap-6 border-b border-border overflow-x-auto">
          {[
            { key: 'overview', label: 'Overview', icon: LayoutDashboard },
            { key: 'connected', label: 'Connected', count: connectedCount, icon: CheckCircle },
            { key: 'available', label: 'Available', count: availableCount, icon: Plus },
            { key: 'monitoring', label: 'Monitoring', icon: Activity },
            { key: 'webhooks', label: 'Webhooks', count: webhookEvents.length, icon: Webhook },
            {
              key: 'security',
              label: 'Security',
              count: securityAlerts.filter((a) => a.status === 'active').length,
              icon: Shield,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 pb-2 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
              {tab.count !== undefined && ` (${tab.count})`}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Link2 className="text-primary" size={24} />
                <CheckCircle className="text-green-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">{connectedCount}</p>
              <p className="text-sm text-muted-foreground">Connected Integrations</p>
              <p className="text-xs text-green-600 mt-1">+2 this month</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Activity className="text-primary" size={24} />
                <TrendingUp className="text-green-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">
                {integrationCategories
                  .flatMap((c) => c.integrations)
                  .reduce((sum, i) => sum + i.processes, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Processes Tracked</p>
              <p className="text-xs text-green-600 mt-1">+47 this week</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Database className="text-primary" size={24} />
                <RefreshCw className="text-blue-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">
                {(
                  integrationCategories
                    .flatMap((c) => c.integrations)
                    .reduce((sum, i) => sum + (i.dataPoints || 0), 0) / 1000
                ).toFixed(1)}
                k
              </p>
              <p className="text-sm text-muted-foreground">Data Points/Hour</p>
              <p className="text-xs text-blue-600 mt-1">Real-time sync</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <AlertCircle className="text-primary" size={24} />
                <span
                  className={`text-sm font-medium ${issuesCount > 0 ? 'text-red-600' : 'text-green-600'}`}
                >
                  {issuesCount > 0 ? 'Issues' : 'Healthy'}
                </span>
              </div>
              <p className="text-2xl font-bold mb-1">{issuesCount}</p>
              <p className="text-sm text-muted-foreground">Need Attention</p>
              {issuesCount > 0 && <p className="text-xs text-red-600 mt-1">Resolve issues</p>}
            </div>
          </div>

          {/* Integration Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {integrationCategories.map((category) => {
              const CategoryIcon = category.icon
              const connectedInCategory = category.integrations.filter(
                (i) => i.status === 'connected'
              ).length
              const totalInCategory = category.integrations.length

              return (
                <div key={category.name} className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <CategoryIcon className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {connectedInCategory}/{totalInCategory} connected
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {category.integrations.slice(0, 3).map((integration) => (
                      <div key={integration.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <integration.icon size={16} className="text-muted-foreground" />
                          <span className="text-sm">{integration.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(integration.status)}
                          {integration.status === 'connected' && (
                            <span className="text-xs text-muted-foreground">
                              {integration.processes} processes
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {category.integrations.length > 3 && (
                      <p className="text-xs text-muted-foreground">
                        +{category.integrations.length - 3} more integrations
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="text-primary" size={20} />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.slice(0, 5).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 bg-background rounded-lg"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.severity === 'error'
                            ? 'bg-red-500'
                            : activity.severity === 'success'
                              ? 'bg-green-500'
                              : 'bg-blue-500'
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{activity.integration}</p>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="text-sm text-primary hover:underline mt-4">
                  View all activity →
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Health Overview */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Heart className="text-primary" size={20} />
                  Integration Health
                </h3>
                <div className="space-y-3">
                  {integrationCategories
                    .flatMap((c) => c.integrations)
                    .filter((i) => i.status === 'connected')
                    .slice(0, 4)
                    .map((integration) => (
                      <div key={integration.id} className="flex items-center justify-between">
                        <span className="text-sm">{integration.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-secondary rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                integration.healthScore >= 95
                                  ? 'bg-green-500'
                                  : integration.healthScore >= 85
                                    ? 'bg-blue-500'
                                    : integration.healthScore >= 70
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                              }`}
                              style={{ width: `${integration.healthScore}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {integration.healthScore}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Zap className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-medium mb-1">Expand Your Coverage</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Connect more tools to get comprehensive process insights across your
                      organization.
                    </p>
                    <button
                      onClick={() => setActiveTab('available')}
                      className="text-sm text-primary hover:underline"
                    >
                      Browse available integrations →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connected Tab */}
      {activeTab === 'connected' && (
        <div>
          <div className="bg-card p-4 rounded-lg border border-border mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search connected integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Categories</option>
                {integrationCategories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={filterHealth}
                onChange={(e) => setFilterHealth(e.target.value)}
                className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Health</option>
                <option value="excellent">Excellent (95%+)</option>
                <option value="good">Good (85-94%)</option>
                <option value="fair">Fair (70-84%)</option>
                <option value="poor">Poor (&lt;70%)</option>
              </select>

              <div className="flex items-center border border-input rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-accent' : ''}`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-accent' : ''}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations
                .filter((i) => i.status === 'connected')
                .map((integration) => (
                  <div
                    key={integration.id}
                    className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <integration.icon className="text-primary" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{integration.name}</h3>
                          <p className="text-sm text-muted-foreground">{integration.authType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            integration.healthScore >= 95
                              ? 'bg-green-500'
                              : integration.healthScore >= 85
                                ? 'bg-blue-500'
                                : integration.healthScore >= 70
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                          }`}
                        />
                        <span className="text-sm font-medium">{integration.healthScore}%</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Processes</span>
                        <span className="font-medium">{integration.processes}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">API Calls</span>
                        <span className="font-medium">{integration.apiCalls}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Sync Frequency</span>
                        <span className="font-medium">{integration.syncFrequency}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Webhooks</span>
                        <span className="font-medium">{integration.webhooks}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Key Features</p>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {integration.features.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-muted rounded">
                            +{integration.features.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Last sync: {integration.lastSync}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedIntegration(integration)
                            setShowIntegrationModal(true)
                          }}
                          className="p-1 hover:bg-accent rounded"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-1 hover:bg-accent rounded" title="Configure">
                          <Settings size={16} />
                        </button>
                        <button className="p-1 hover:bg-accent rounded" title="Disconnect">
                          <Link2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 font-medium">Integration</th>
                      <th className="text-left p-4 font-medium">Health</th>
                      <th className="text-left p-4 font-medium">Processes</th>
                      <th className="text-left p-4 font-medium">API Usage</th>
                      <th className="text-left p-4 font-medium">Last Sync</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIntegrations
                      .filter((i) => i.status === 'connected')
                      .map((integration) => (
                        <tr
                          key={integration.id}
                          className="border-b border-border hover:bg-accent/50"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <integration.icon size={20} className="text-primary" />
                              <div>
                                <p className="font-medium">{integration.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {integration.authType}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-secondary rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    integration.healthScore >= 95
                                      ? 'bg-green-500'
                                      : integration.healthScore >= 85
                                        ? 'bg-blue-500'
                                        : integration.healthScore >= 70
                                          ? 'bg-yellow-500'
                                          : 'bg-red-500'
                                  }`}
                                  style={{ width: `${integration.healthScore}%` }}
                                />
                              </div>
                              <span className="text-sm">{integration.healthScore}%</span>
                            </div>
                          </td>
                          <td className="p-4">{integration.processes}</td>
                          <td className="p-4">{integration.apiCalls}</td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {integration.lastSync}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedIntegration(integration)
                                  setShowIntegrationModal(true)
                                }}
                                className="p-1 hover:bg-accent rounded"
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                              <button className="p-1 hover:bg-accent rounded" title="Configure">
                                <Settings size={16} />
                              </button>
                              <button className="p-1 hover:bg-accent rounded" title="Disconnect">
                                <Power size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Available Tab */}
      {activeTab === 'available' && (
        <div>
          <div className="bg-card p-4 rounded-lg border border-border mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search available integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Categories</option>
                {integrationCategories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredIntegrations
              .filter((i) => i.status === 'available')
              .map((integration) => (
                <div
                  key={integration.id}
                  className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <integration.icon className="text-muted-foreground" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.authType}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs bg-secondary rounded">Available</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Features</p>
                    <div className="flex flex-wrap gap-1">
                      {integration.features.slice(0, 4).map((feature, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-muted rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Sync: {integration.syncFrequency}
                    </span>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                      Connect
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Custom Integration Templates */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Custom Integration Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {integrationTemplates.map((template) => (
                <div key={template.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="text-primary" size={20} />
                    <h4 className="font-medium">{template.name}</h4>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        template.complexity === 'low'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : template.complexity === 'medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {template.complexity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <button className="w-full py-2 border border-input rounded-md hover:bg-accent">
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Monitoring Tab */}
      {activeTab === 'monitoring' && (
        <div>
          {/* API Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="text-primary" size={24} />
                <TrendingUp className="text-green-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">
                {apiMetrics.reduce((sum, m) => sum + m.requestsToday, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">API Calls Today</p>
              <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Clock className="text-primary" size={24} />
                <Activity className="text-blue-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">
                {Math.round(
                  apiMetrics.reduce((sum, m) => sum + parseInt(m.responseTime), 0) /
                    apiMetrics.length
                )}
                ms
              </p>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
              <p className="text-xs text-blue-600 mt-1">Within SLA</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Target className="text-primary" size={24} />
                <CheckCircle className="text-green-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">
                {(
                  apiMetrics.reduce((sum, m) => sum + parseFloat(m.uptime), 0) / apiMetrics.length
                ).toFixed(2)}
                %
              </p>
              <p className="text-sm text-muted-foreground">Avg Uptime</p>
              <p className="text-xs text-green-600 mt-1">Excellent</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <AlertCircle className="text-primary" size={24} />
                <span className="text-sm text-red-600 font-medium">0.28%</span>
              </div>
              <p className="text-2xl font-bold mb-1">
                {(
                  apiMetrics.reduce((sum, m) => sum + parseFloat(m.errorRate), 0) /
                  apiMetrics.length
                ).toFixed(2)}
                %
              </p>
              <p className="text-sm text-muted-foreground">Avg Error Rate</p>
              <p className="text-xs text-green-600 mt-1">Below threshold</p>
            </div>
          </div>

          {/* Detailed API Metrics */}
          <div className="bg-card p-6 rounded-lg border border-border mb-8">
            <h3 className="text-lg font-semibold mb-4">Integration Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium">Integration</th>
                    <th className="text-left p-3 font-medium">Requests Today</th>
                    <th className="text-left p-3 font-medium">Response Time</th>
                    <th className="text-left p-3 font-medium">Error Rate</th>
                    <th className="text-left p-3 font-medium">Uptime</th>
                    <th className="text-left p-3 font-medium">Rate Limit</th>
                    <th className="text-left p-3 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {apiMetrics.map((metric) => (
                    <tr
                      key={metric.integration}
                      className="border-b border-border hover:bg-accent/50"
                    >
                      <td className="p-3 font-medium">{metric.integration}</td>
                      <td className="p-3">{metric.requestsToday.toLocaleString()}</td>
                      <td className="p-3">
                        <span
                          className={`${parseInt(metric.responseTime) < 300 ? 'text-green-600' : parseInt(metric.responseTime) < 500 ? 'text-yellow-600' : 'text-red-600'}`}
                        >
                          {metric.responseTime}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`${parseFloat(metric.errorRate) < 0.5 ? 'text-green-600' : parseFloat(metric.errorRate) < 1 ? 'text-yellow-600' : 'text-red-600'}`}
                        >
                          {metric.errorRate}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`${parseFloat(metric.uptime) >= 99.5 ? 'text-green-600' : parseFloat(metric.uptime) >= 99 ? 'text-yellow-600' : 'text-red-600'}`}
                        >
                          {metric.uptime}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-secondary rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${parseInt(metric.rateLimitUsed) > 80 ? 'bg-red-500' : parseInt(metric.rateLimitUsed) > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ width: metric.rateLimitUsed }}
                            />
                          </div>
                          <span className="text-xs">{metric.rateLimitUsed}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        {metric.trend === 'up' && (
                          <TrendingUp className="text-green-600" size={16} />
                        )}
                        {metric.trend === 'down' && (
                          <TrendingDown className="text-red-600" size={16} />
                        )}
                        {metric.trend === 'stable' && (
                          <Activity className="text-blue-600" size={16} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Real-time Monitoring */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Monitor className="text-primary" size={20} />
                Real-time Data Flow
              </h3>
              <div className="space-y-4">
                {integrationCategories
                  .flatMap((c) => c.integrations)
                  .filter((i) => i.status === 'connected')
                  .slice(0, 5)
                  .map((integration) => (
                    <div
                      key={integration.id}
                      className="flex items-center justify-between p-3 bg-background rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${integration.dataPoints > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}
                        />
                        <span className="font-medium">{integration.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {(integration.dataPoints || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">data points/hour</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="text-primary" size={20} />
                Active Alerts
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <XCircle className="text-red-600" size={16} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">HubSpot API Rate Limit</p>
                    <p className="text-xs text-muted-foreground">95% of rate limit exceeded</p>
                  </div>
                  <span className="text-xs text-red-600">5 min ago</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <AlertCircle className="text-yellow-600" size={16} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Slow Response Time</p>
                    <p className="text-xs text-muted-foreground">GitHub API response &gt; 500ms</p>
                  </div>
                  <span className="text-xs text-yellow-600">12 min ago</span>
                </div>

                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">No critical alerts</p>
                  <p className="text-xs text-muted-foreground">All systems operating normally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === 'webhooks' && (
        <div>
          {/* Webhook Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Webhook className="text-primary" size={24} />
                <CheckCircle className="text-green-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">
                {integrationCategories
                  .flatMap((c) => c.integrations)
                  .reduce((sum, i) => sum + i.webhooks, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Active Webhooks</p>
              <p className="text-xs text-green-600 mt-1">Across {connectedCount} integrations</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Activity className="text-primary" size={24} />
                <TrendingUp className="text-green-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">
                {webhookEvents.filter((e) => e.status === 'success').length}
              </p>
              <p className="text-sm text-muted-foreground">Successful Events</p>
              <p className="text-xs text-green-600 mt-1">Last 24 hours</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Clock className="text-primary" size={24} />
                <Activity className="text-blue-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">
                {Math.round(
                  webhookEvents
                    .filter((e) => e.responseTime !== 'timeout')
                    .reduce((sum, e) => sum + parseInt(e.responseTime), 0) /
                    webhookEvents.filter((e) => e.responseTime !== 'timeout').length
                )}
                ms
              </p>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
              <p className="text-xs text-blue-600 mt-1">Excellent performance</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <AlertCircle className="text-primary" size={24} />
                <span
                  className={`text-sm font-medium ${webhookEvents.filter((e) => e.status === 'failed').length > 0 ? 'text-red-600' : 'text-green-600'}`}
                >
                  {webhookEvents.filter((e) => e.status === 'failed').length > 0
                    ? 'Issues'
                    : 'Healthy'}
                </span>
              </div>
              <p className="text-2xl font-bold mb-1">
                {webhookEvents.filter((e) => e.status === 'failed').length}
              </p>
              <p className="text-sm text-muted-foreground">Failed Events</p>
              {webhookEvents.filter((e) => e.status === 'failed').length > 0 && (
                <p className="text-xs text-red-600 mt-1">Needs attention</p>
              )}
            </div>
          </div>

          {/* Recent Webhook Events */}
          <div className="bg-card p-6 rounded-lg border border-border mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Webhook className="text-primary" size={20} />
                Recent Webhook Events
              </h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm border border-input rounded hover:bg-accent">
                  <Filter size={14} className="inline mr-1" />
                  Filter
                </button>
                <button className="px-3 py-1 text-sm border border-input rounded hover:bg-accent">
                  <RefreshCw size={14} className="inline mr-1" />
                  Refresh
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium">Integration</th>
                    <th className="text-left p-3 font-medium">Event Type</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Timestamp</th>
                    <th className="text-left p-3 font-medium">Response Time</th>
                    <th className="text-left p-3 font-medium">Retries</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {webhookEvents.map((event) => (
                    <tr key={event.id} className="border-b border-border hover:bg-accent/50">
                      <td className="p-3 font-medium">{event.integration}</td>
                      <td className="p-3">
                        <code className="px-2 py-1 text-xs bg-muted rounded">{event.event}</code>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            event.status === 'success'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{event.timestamp}</td>
                      <td className="p-3">
                        <span
                          className={`${
                            event.responseTime === 'timeout'
                              ? 'text-red-600'
                              : parseInt(event.responseTime) > 1000
                                ? 'text-yellow-600'
                                : 'text-green-600'
                          }`}
                        >
                          {event.responseTime}
                        </span>
                      </td>
                      <td className="p-3">
                        {event.retryCount > 0 ? (
                          <span className="text-yellow-600">{event.retryCount}</span>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-accent rounded" title="View Payload">
                            <Eye size={14} />
                          </button>
                          <button className="p-1 hover:bg-accent rounded" title="Retry">
                            <RefreshCw size={14} />
                          </button>
                          <button className="p-1 hover:bg-accent rounded" title="Copy">
                            <Copy size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Webhook Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="text-primary" size={20} />
                Webhook Endpoints
              </h3>
              <div className="space-y-4">
                {integrationCategories
                  .flatMap((c) => c.integrations)
                  .filter((i) => i.status === 'connected' && i.webhooks > 0)
                  .map((integration) => (
                    <div key={integration.id} className="p-3 bg-background rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{integration.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {integration.webhooks} webhooks
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>POST https://api.processpilot.com/webhooks/{integration.id}</p>
                        <p>Events: process.created, process.updated, data.synced</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button className="text-xs text-primary hover:underline">Configure</button>
                        <button className="text-xs text-primary hover:underline">Test</button>
                        <button className="text-xs text-muted-foreground hover:underline">
                          Logs
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <button className="w-full mt-4 py-2 border border-input rounded-md hover:bg-accent">
                <Plus size={16} className="inline mr-2" />
                Add Webhook Endpoint
              </button>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="text-primary" size={20} />
                Event Statistics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">process.updated</span>
                    <span className="text-sm font-medium">1,247</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">data.synced</span>
                    <span className="text-sm font-medium">856</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '41%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">process.created</span>
                    <span className="text-sm font-medium">423</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">error.occurred</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '1%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div>
          {/* Security Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Shield className="text-primary" size={24} />
                <CheckCircle className="text-green-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">{connectedCount}</p>
              <p className="text-sm text-muted-foreground">Secure Connections</p>
              <p className="text-xs text-green-600 mt-1">All encrypted</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Key className="text-primary" size={24} />
                <Activity className="text-blue-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">
                {
                  integrationCategories
                    .flatMap((c) => c.integrations)
                    .filter((i) => i.status === 'connected').length
                }
              </p>
              <p className="text-sm text-muted-foreground">Valid Credentials</p>
              <p className="text-xs text-blue-600 mt-1">Auto-renewed</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <Lock className="text-primary" size={24} />
                <CheckCircle className="text-green-600" size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">256</p>
              <p className="text-sm text-muted-foreground">Encryption Level</p>
              <p className="text-xs text-green-600 mt-1">TLS 1.3</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <AlertCircle className="text-primary" size={24} />
                <span
                  className={`text-sm font-medium ${securityAlerts.filter((a) => a.status === 'active').length > 0 ? 'text-red-600' : 'text-green-600'}`}
                >
                  {securityAlerts.filter((a) => a.status === 'active').length > 0
                    ? 'Alerts'
                    : 'Secure'}
                </span>
              </div>
              <p className="text-2xl font-bold mb-1">
                {securityAlerts.filter((a) => a.status === 'active').length}
              </p>
              <p className="text-sm text-muted-foreground">Security Alerts</p>
              {securityAlerts.filter((a) => a.status === 'active').length > 0 && (
                <p className="text-xs text-red-600 mt-1">Requires action</p>
              )}
            </div>
          </div>

          {/* Security Alerts */}
          <div className="bg-card p-6 rounded-lg border border-border mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <AlertCircle className="text-primary" size={20} />
                Security Alerts
              </h3>
              <div className="flex items-center gap-2">
                <select className="px-3 py-1 text-sm border border-input rounded">
                  <option>All Alerts</option>
                  <option>Critical</option>
                  <option>Warning</option>
                  <option>Info</option>
                </select>
                <button className="px-3 py-1 text-sm border border-input rounded hover:bg-accent">
                  <RefreshCw size={14} className="inline mr-1" />
                  Refresh
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {securityAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.severity === 'critical'
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      : alert.severity === 'warning'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {alert.severity === 'critical' && (
                        <XCircle className="text-red-600 mt-1" size={20} />
                      )}
                      {alert.severity === 'warning' && (
                        <AlertCircle className="text-yellow-600 mt-1" size={20} />
                      )}
                      {alert.severity === 'medium' && (
                        <AlertCircle className="text-blue-600 mt-1" size={20} />
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{alert.integration}</h4>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              alert.severity === 'critical'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                : alert.severity === 'warning'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}
                          >
                            {alert.severity}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              alert.status === 'active'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                : alert.status === 'acknowledged'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}
                          >
                            {alert.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.type} • {alert.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.status === 'active' && (
                        <>
                          <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90">
                            Acknowledge
                          </button>
                          <button className="px-3 py-1 text-xs border border-input rounded hover:bg-accent">
                            Resolve
                          </button>
                        </>
                      )}
                      <button className="p-1 hover:bg-accent rounded" title="View Details">
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="text-primary" size={20} />
                Authentication Methods
              </h3>
              <div className="space-y-4">
                {integrationCategories
                  .flatMap((c) => c.integrations)
                  .filter((i) => i.status === 'connected')
                  .map((integration) => (
                    <div
                      key={integration.id}
                      className="flex items-center justify-between p-3 bg-background rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <integration.icon size={20} className="text-primary" />
                        <div>
                          <p className="font-medium">{integration.name}</p>
                          <p className="text-sm text-muted-foreground">{integration.authType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            integration.authType === 'OAuth 2.0' ||
                            integration.authType === 'Azure AD' ||
                            integration.authType === 'SAML'
                              ? 'bg-green-500'
                              : integration.authType === 'API Key' ||
                                  integration.authType === 'API Token'
                                ? 'bg-yellow-500'
                                : 'bg-blue-500'
                          }`}
                        />
                        <button className="text-xs text-primary hover:underline">Configure</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Key className="text-primary" size={20} />
                Data Access Permissions
              </h3>
              <div className="space-y-4">
                {integrationCategories
                  .flatMap((c) => c.integrations)
                  .filter((i) => i.status === 'connected' && i.permissions.length > 0)
                  .slice(0, 4)
                  .map((integration) => (
                    <div key={integration.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{integration.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {integration.permissions.length} permissions
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {integration.permissions.slice(0, 3).map((permission, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-muted rounded">
                            {permission}
                          </span>
                        ))}
                        {integration.permissions.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-muted rounded">
                            +{integration.permissions.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <button className="w-full mt-4 py-2 border border-input rounded-md hover:bg-accent">
                Review All Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Integration Detail Modal */}
      {showIntegrationModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <selectedIntegration.icon className="text-primary" size={32} />
                  <div>
                    <h2 className="text-xl font-bold">{selectedIntegration.name}</h2>
                    <p className="text-muted-foreground">{selectedIntegration.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIntegrationModal(false)}
                  className="p-2 hover:bg-accent rounded"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Connection Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={getStatusText(selectedIntegration.status).color}>
                          {getStatusText(selectedIntegration.status).text}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Authentication:</span>
                        <span>{selectedIntegration.authType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Version:</span>
                        <span>{selectedIntegration.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Health Score:</span>
                        <span
                          className={`${selectedIntegration.healthScore >= 90 ? 'text-green-600' : selectedIntegration.healthScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}
                        >
                          {selectedIntegration.healthScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Usage Statistics</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processes Tracked:</span>
                        <span>{selectedIntegration.processes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">API Calls:</span>
                        <span>{selectedIntegration.apiCalls}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data Points:</span>
                        <span>{selectedIntegration.dataPoints?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Webhooks:</span>
                        <span>{selectedIntegration.webhooks}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Sync Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Frequency:</span>
                        <span>{selectedIntegration.syncFrequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Sync:</span>
                        <span>{selectedIntegration.lastSync || 'Never'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Permissions</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedIntegration.permissions.map((permission: string, index: number) => (
                        <span key={index} className="px-2 py-1 text-xs bg-muted rounded">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedIntegration.error && (
                    <div>
                      <h3 className="font-semibold mb-2 text-red-600">Error Details</h3>
                      <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                        {selectedIntegration.error}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Available Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedIntegration.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-background rounded">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button className="px-4 py-2 border border-input rounded-md hover:bg-accent">
                  View Logs
                </button>
                <button className="px-4 py-2 border border-input rounded-md hover:bg-accent">
                  Test Connection
                </button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Configure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Integration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border w-full max-w-2xl">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Add New Integration</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-accent rounded"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Integration Type</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>Select integration type...</option>
                    <option>Custom REST API</option>
                    <option>Database Connection</option>
                    <option>Webhook Endpoint</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Enter integration name"
                    className="w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    placeholder="Describe this integration"
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Authentication Method</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>OAuth 2.0</option>
                    <option>API Key</option>
                    <option>Basic Auth</option>
                    <option>Bearer Token</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-input rounded-md hover:bg-accent"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Create Integration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
