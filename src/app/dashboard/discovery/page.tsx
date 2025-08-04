'use client'

import { useState } from 'react'
import { 
  Play, 
  Pause, 
  Square, 
  Download, 
  Settings,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  FileText,
  BarChart3,
  Zap,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Target,
  TrendingUp,
  Activity,
  Database,
  Link2,
  Mail,
  MessageSquare,
  Video,
  Monitor,
  Shield,
  Brain,
  Workflow,
  Mic,
  Camera,
  Globe,
  Cpu,
  Network,
  Languages,
  Calendar,
  Timer,
  UserCheck,
  FileVideo,
  HeadphoneIcon,
  Headphones,
  MicIcon,
  ScanLine,
  Layers,
  GitBranch,
  Share2,
  Upload as Export,
  MapPin,
  Workflow as FlowChart,
  X
} from 'lucide-react'

// Updated data structures based on FRD requirements
const dataSourceIntegrations = [
  {
    id: 'salesforce',
    name: 'Salesforce CRM',
    type: 'CRM',
    status: 'connected',
    authType: 'OAuth 2.0',
    lastSync: '5 minutes ago',
    syncFrequency: 'Real-time',
    processesFound: 15,
    dataPoints: 12847,
    icon: '☁️',
    setupTime: '3 minutes',
    apiCalls: 2847,
    errorRate: '0.1%'
  },
  {
    id: 'slack',
    name: 'Slack Workspace',
    type: 'Communication',
    status: 'connected',
    authType: 'OAuth 2.0',
    lastSync: '2 minutes ago',
    syncFrequency: 'Real-time',
    processesFound: 23,
    dataPoints: 45623,
    icon: '💬',
    setupTime: '2 minutes',
    apiCalls: 5623,
    errorRate: '0.05%'
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    type: 'Communication',
    status: 'connected',
    authType: 'OAuth 2.0',
    lastSync: '1 minute ago',
    syncFrequency: 'Real-time',
    processesFound: 18,
    dataPoints: 34521,
    icon: '👥',
    setupTime: '4 minutes',
    apiCalls: 3452,
    errorRate: '0.2%'
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    type: 'CRM',
    status: 'connected',
    authType: 'OAuth 2.0',
    lastSync: '8 minutes ago',
    syncFrequency: 'Every 15 minutes',
    processesFound: 12,
    dataPoints: 8934,
    icon: '🎯',
    setupTime: '3 minutes',
    apiCalls: 1234,
    errorRate: '0.1%'
  },
  {
    id: 'jira',
    name: 'Jira Software',
    type: 'Project Management',
    status: 'connected',
    authType: 'OAuth 2.0',
    lastSync: '12 minutes ago',
    syncFrequency: 'Every 15 minutes',
    processesFound: 21,
    dataPoints: 15623,
    icon: '📋',
    setupTime: '5 minutes',
    apiCalls: 2156,
    errorRate: '0.3%'
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    type: 'Email',
    status: 'setup_required',
    authType: 'OAuth 2.0',
    lastSync: 'Never',
    syncFrequency: 'Real-time',
    processesFound: 0,
    dataPoints: 0,
    icon: '📧',
    setupTime: '4 minutes',
    apiCalls: 0,
    errorRate: '0%'
  }
]

const communicationAnalysis = {
  daily_capacity: 10000,
  current_processed: 7842,
  accuracy: 87,
  languages_supported: 12,
  privacy_controls: 'Enabled',
  anonymization: 'Active',
  process_extraction_rate: 92
}

const screenMonitoring = {
  enabled: false,
  opted_in_users: 0,
  total_users: 24,
  screenshot_interval: 30,
  privacy_controls: 'Full Control',
  data_retention: '7 days',
  encryption: 'AES-256'
}

const meetingIntelligence = {
  platforms: ['Zoom', 'Google Meet', 'Microsoft Teams'],
  transcription_accuracy: 91,
  monthly_hours_processed: 156,
  languages_supported: 15,
  action_item_accuracy: 82,
  meetings_analyzed: 47
}

const aiProcessEngine = {
  nlp_accuracy: 91,
  entity_recognition: 87,
  processing_latency: '3.2 seconds',
  industries_supported: 23,
  pattern_recognition: 82,
  process_variations_detected: 76,
  learning_improvement: '5.2% monthly',
  bpmn_support: true
}

const activeDiscoveryScans = [
  {
    id: '1',
    name: 'Sales Process Discovery',
    sources: ['Salesforce', 'Slack', 'Outlook'],
    department: 'Sales',
    status: 'in_progress',
    progress: 78,
    processesFound: 12,
    startedAt: '2 hours ago',
    estimatedCompletion: '45 minutes',
    dataPoints: 8945,
    aiConfidence: 89,
    patternsIdentified: 7,
    type: 'full_analysis'
  },
  {
    id: '2',
    name: 'Engineering Workflow Analysis',
    sources: ['Jira', 'GitHub', 'Slack'],
    department: 'Engineering',
    status: 'in_progress',
    progress: 45,
    processesFound: 18,
    startedAt: '1 hour ago',
    estimatedCompletion: '2 hours',
    dataPoints: 15623,
    aiConfidence: 85,
    patternsIdentified: 12,
    type: 'communication_analysis'
  },
  {
    id: '3',
    name: 'Customer Support Process Mining',
    sources: ['Zendesk', 'Teams', 'Email'],
    department: 'Support',
    status: 'paused',
    progress: 32,
    processesFound: 8,
    startedAt: '4 hours ago',
    estimatedCompletion: '3 hours',
    dataPoints: 6234,
    aiConfidence: 76,
    patternsIdentified: 5,
    type: 'meeting_intelligence'
  }
]

const discoveredProcesses = [
  {
    id: '1',
    name: 'Lead Qualification & Scoring',
    source: 'Salesforce + Slack Analysis',
    confidence: 94,
    steps: 8,
    participants: ['Sales Rep', 'Sales Manager', 'Marketing'],
    averageDuration: '2.5 hours',
    lastSeen: '1 hour ago',
    category: 'Sales',
    processType: 'approval_workflow',
    variations: 3,
    automation_potential: 85,
    bpmn_generated: true,
    entities_extracted: ['Lead', 'Score', 'Qualification Criteria'],
    decision_points: 4
  },
  {
    id: '2',
    name: 'Bug Triage & Assignment',
    source: 'Jira + Slack Communication',
    confidence: 91,
    steps: 6,
    participants: ['Developer', 'QA Engineer', 'Product Manager'],
    averageDuration: '45 minutes',
    lastSeen: '3 hours ago',
    category: 'Engineering',
    processType: 'escalation_procedure',
    variations: 2,
    automation_potential: 78,
    bpmn_generated: true,
    entities_extracted: ['Bug Report', 'Severity', 'Assignment'],
    decision_points: 3
  },
  {
    id: '3',
    name: 'Invoice Processing & Approval',
    source: 'Email Analysis + Meeting Intelligence',
    confidence: 88,
    steps: 5,
    participants: ['Accounts Payable', 'Manager', 'Finance Director'],
    averageDuration: '1.8 hours',
    lastSeen: '2 days ago',
    category: 'Finance',
    processType: 'approval_workflow',
    variations: 4,
    automation_potential: 92,
    bpmn_generated: true,
    entities_extracted: ['Invoice', 'Approval Amount', 'Vendor'],
    decision_points: 2
  }
]

export default function ProcessDiscoveryPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDiscovery, setSelectedDiscovery] = useState(null)
  const [showNewScanModal, setShowNewScanModal] = useState(false)

  const startDiscovery = (sources) => {
    console.log('Starting discovery for:', sources)
  }

  const pauseDiscovery = (id) => {
    console.log('Pausing discovery:', id)
  }

  const stopDiscovery = (id) => {
    console.log('Stopping discovery:', id)
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Process Discovery</h1>
            <p className="text-muted-foreground">
              Intelligent discovery and mapping of business processes across your organization
            </p>
          </div>
          <button 
            onClick={() => setShowNewScanModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <ScanLine size={16} />
            Start New Discovery
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-6 border-b border-border">
          {['overview', 'active-scans', 'discovered-processes', 'data-sources', 'ai-engine'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-primary" size={24} />
                <div>
                  <p className="text-2xl font-bold">{activeDiscoveryScans.length}</p>
                  <p className="text-sm text-muted-foreground">Active Scans</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Workflow className="text-green-600" size={24} />
                <div>
                  <p className="text-2xl font-bold">{discoveredProcesses.length}</p>
                  <p className="text-sm text-muted-foreground">Processes Mapped</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="text-blue-600" size={24} />
                <div>
                  <p className="text-2xl font-bold">{aiProcessEngine.nlp_accuracy}%</p>
                  <p className="text-sm text-muted-foreground">AI Accuracy</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-purple-600" size={24} />
                <div>
                  <p className="text-2xl font-bold">
                    {dataSourceIntegrations.reduce((sum, d) => sum + d.dataPoints, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Data Points</p>
                </div>
              </div>
            </div>
          </div>

          {/* Discovery Capabilities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="text-primary" size={20} />
                Communication Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Daily Processing Capacity</span>
                  <span className="text-sm font-medium">{communicationAnalysis.daily_capacity.toLocaleString()} messages</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current Processed Today</span>
                  <span className="text-sm font-medium">{communicationAnalysis.current_processed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Process Extraction Accuracy</span>
                  <span className="text-sm font-medium text-green-600">{communicationAnalysis.process_extraction_rate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Languages Supported</span>
                  <span className="text-sm font-medium">{communicationAnalysis.languages_supported}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Privacy Controls</span>
                  <span className="text-sm font-medium text-green-600">{communicationAnalysis.privacy_controls}</span>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Video className="text-primary" size={20} />
                Meeting Intelligence
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Transcription Accuracy</span>
                  <span className="text-sm font-medium text-green-600">{meetingIntelligence.transcription_accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hours Processed (Monthly)</span>
                  <span className="text-sm font-medium">{meetingIntelligence.monthly_hours_processed} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Action Item Accuracy</span>
                  <span className="text-sm font-medium text-green-600">{meetingIntelligence.action_item_accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Meetings Analyzed</span>
                  <span className="text-sm font-medium">{meetingIntelligence.meetings_analyzed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Language Support</span>
                  <span className="text-sm font-medium">{meetingIntelligence.languages_supported} languages</span>
                </div>
              </div>
            </div>
          </div>

          {/* Screen Monitoring (Optional) */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Monitor className="text-primary" size={20} />
                Screen Activity Monitoring (Optional)
              </h3>
              <div className="flex items-center gap-2">
                <Shield className="text-green-600" size={16} />
                <span className="text-sm text-green-600">Privacy Controlled</span>
              </div>
            </div>
            
            {!screenMonitoring.enabled ? (
              <div className="text-center py-8">
                <Monitor className="mx-auto text-muted-foreground mb-4" size={48} />
                <h4 className="text-lg font-medium mb-2">Screen Monitoring Disabled</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Optional feature requiring explicit user consent for detailed workflow capture
                </p>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Configure Screen Monitoring
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Opted-in Users</p>
                  <p className="text-lg font-medium">{screenMonitoring.opted_in_users}/{screenMonitoring.total_users}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Screenshot Interval</p>
                  <p className="text-lg font-medium">{screenMonitoring.screenshot_interval} min</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Retention</p>
                  <p className="text-lg font-medium">{screenMonitoring.data_retention}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Encryption</p>
                  <p className="text-lg font-medium">{screenMonitoring.encryption}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Scans Tab */}
      {activeTab === 'active-scans' && (
        <div className="space-y-6">
          {activeDiscoveryScans.map((scan) => (
            <div key={scan.id} className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    scan.status === 'in_progress' ? 'bg-green-500 animate-pulse' :
                    scan.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                  <h3 className="text-lg font-semibold">{scan.name}</h3>
                  <span className="px-2 py-1 text-xs bg-secondary rounded">{scan.department}</span>
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">{scan.type.replace('_', ' ')}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {scan.status === 'in_progress' ? (
                    <button 
                      onClick={() => pauseDiscovery(scan.id)}
                      className="p-2 hover:bg-accent rounded-md"
                      title="Pause scan"
                    >
                      <Pause size={16} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => startDiscovery(scan.sources)}
                      className="p-2 hover:bg-accent rounded-md"
                      title="Resume scan"
                    >
                      <Play size={16} />
                    </button>
                  )}
                  <button 
                    onClick={() => stopDiscovery(scan.id)}
                    className="p-2 hover:bg-accent rounded-md"
                    title="Stop scan"
                  >
                    <Square size={16} />
                  </button>
                  <button className="p-2 hover:bg-accent rounded-md" title="Settings">
                    <Settings size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="font-medium">{scan.progress}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Processes Found</p>
                  <p className="font-medium">{scan.processesFound}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">AI Confidence</p>
                  <p className="font-medium text-green-600">{scan.aiConfidence}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patterns ID&apos;d</p>
                  <p className="font-medium">{scan.patternsIdentified}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Points</p>
                  <p className="font-medium">{scan.dataPoints.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ETA</p>
                  <p className="font-medium">{scan.estimatedCompletion}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Data Sources:</p>
                <div className="flex gap-2">
                  {scan.sources.map((source) => (
                    <span key={source} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded dark:bg-blue-900/30 dark:text-blue-400">
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scan.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Discovered Processes Tab */}
      {activeTab === 'discovered-processes' && (
        <div>
          <div className="flex items-center gap-4 mb-6 bg-card p-4 rounded-lg border border-border">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search discovered processes..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select className="px-3 py-2 bg-background border border-input rounded-md">
              <option value="all">All Categories</option>
              <option value="sales">Sales</option>
              <option value="engineering">Engineering</option>
              <option value="finance">Finance</option>
            </select>
            <select className="px-3 py-2 bg-background border border-input rounded-md">
              <option value="confidence">Sort by Confidence</option>
              <option value="recent">Most Recent</option>
              <option value="automation">Automation Potential</option>
            </select>
          </div>

          <div className="space-y-4">
            {discoveredProcesses.map((process) => (
              <div key={process.id} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{process.name}</h3>
                      <span className="px-2 py-1 text-xs bg-secondary rounded">{process.category}</span>
                      <div className="flex items-center gap-1">
                        <Brain size={14} className="text-green-600" />
                        <span className="text-sm font-medium text-green-600">{process.confidence}% confidence</span>
                      </div>
                      {process.bpmn_generated && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded dark:bg-blue-900/30 dark:text-blue-400">
                          BPMN Ready
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      Discovered from: {process.source}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Steps</p>
                        <p className="font-medium">{process.steps}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Decision Points</p>
                        <p className="font-medium">{process.decision_points}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Variations</p>
                        <p className="font-medium">{process.variations}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{process.averageDuration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Automation Potential</p>
                        <p className="font-medium text-blue-600">{process.automation_potential}%</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-1">Participants:</p>
                      <div className="flex gap-2">
                        {process.participants.map((participant) => (
                          <span key={participant} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded dark:bg-green-900/30 dark:text-green-400">
                            {participant}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Extracted Entities:</p>
                      <div className="flex gap-2">
                        {process.entities_extracted.map((entity) => (
                          <span key={entity} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded dark:bg-purple-900/30 dark:text-purple-400">
                            {entity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                      <FlowChart size={14} />
                      View BPMN
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md hover:bg-accent text-sm">
                      <Eye size={14} />
                      Details
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm">
                      <FileText size={14} />
                      Document
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Sources Tab */}
      {activeTab === 'data-sources' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dataSourceIntegrations.map((source) => (
              <div key={source.id} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{source.icon}</div>
                    <div>
                      <h3 className="font-semibold">{source.name}</h3>
                      <p className="text-sm text-muted-foreground">{source.type}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    source.status === 'connected' ? 'bg-green-500' :
                    source.status === 'setup_required' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Auth Type</span>
                    <span className="font-medium">{source.authType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Setup Time</span>
                    <span className="font-medium text-green-600">{source.setupTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sync Frequency</span>
                    <span className="font-medium">{source.syncFrequency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processes Found</span>
                    <span className="font-medium">{source.processesFound}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data Points</span>
                    <span className="font-medium">{source.dataPoints.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Error Rate</span>
                    <span className="font-medium text-green-600">{source.errorRate}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {source.status === 'connected' ? (
                    <>
                      <button className="flex-1 px-3 py-2 border border-input rounded-md hover:bg-accent text-sm">
                        Configure
                      </button>
                      <button className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm">
                        <RefreshCw size={14} className="inline mr-1" />
                        Sync
                      </button>
                    </>
                  ) : (
                    <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm">
                      Setup Integration
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-border rounded-lg hover:border-primary/50 mx-auto">
              <Plus size={20} />
              Add New Integration
              <span className="text-sm text-muted-foreground ml-2">(50+ available)</span>
            </button>
          </div>
        </div>
      )}

      {/* AI Engine Tab */}
      {activeTab === 'ai-engine' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="text-primary" size={20} />
                Natural Language Processing
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Process Step Extraction</span>
                  <span className="text-sm font-medium text-green-600">{aiProcessEngine.nlp_accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Entity Recognition</span>
                  <span className="text-sm font-medium text-green-600">{aiProcessEngine.entity_recognition}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Processing Latency</span>
                  <span className="text-sm font-medium">{aiProcessEngine.processing_latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Industries Supported</span>
                  <span className="text-sm font-medium">{aiProcessEngine.industries_supported}</span>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GitBranch className="text-primary" size={20} />
                Pattern Recognition
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pattern Identification</span>
                  <span className="text-sm font-medium text-green-600">{aiProcessEngine.pattern_recognition}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Variation Detection</span>
                  <span className="text-sm font-medium text-green-600">{aiProcessEngine.process_variations_detected}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Learning Improvement</span>
                  <span className="text-sm font-medium text-blue-600">{aiProcessEngine.learning_improvement}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">BPMN Support</span>
                  <span className="text-sm font-medium text-green-600">
                    {aiProcessEngine.bpmn_support ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FlowChart className="text-primary" size={20} />
              Process Mapping & Visualization
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 dark:bg-blue-900/30">
                  <Workflow size={24} className="text-blue-600" />
                </div>
                <p className="text-sm font-medium">Flowcharts</p>
                <p className="text-xs text-muted-foreground">Auto-generated</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 dark:bg-green-900/30">
                  <Layers size={24} className="text-green-600" />
                </div>
                <p className="text-sm font-medium">Swimlanes</p>
                <p className="text-xs text-muted-foreground">Multi-participant</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 dark:bg-purple-900/30">
                  <Share2 size={24} className="text-purple-600" />
                </div>
                <p className="text-sm font-medium">BPMN</p>
                <p className="text-xs text-muted-foreground">Industry standard</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2 dark:bg-orange-900/30">
                  <Export size={24} className="text-orange-600" />
                </div>
                <p className="text-sm font-medium">Export</p>
                <p className="text-xs text-muted-foreground">PDF, PNG, SVG</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Discovery Modal */}
      {showNewScanModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-2xl">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Start New Process Discovery</h2>
                <button 
                  onClick={() => setShowNewScanModal(false)}
                  className="p-2 hover:bg-accent rounded-md"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Discovery Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Sales Process Discovery"
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Department/Team</label>
                  <select className="w-full px-4 py-2 bg-background border border-input rounded-md">
                    <option value="">Select department...</option>
                    <option value="sales">Sales</option>
                    <option value="engineering">Engineering</option>
                    <option value="finance">Finance</option>
                    <option value="support">Support</option>
                    <option value="hr">Human Resources</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Discovery Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button className="p-3 border border-primary bg-primary/5 rounded-lg text-left">
                      <MessageSquare size={16} className="mb-2" />
                      <p className="font-medium text-sm">Communication Analysis</p>
                      <p className="text-xs text-muted-foreground">Email & chat mining</p>
                    </button>
                    <button className="p-3 border border-border rounded-lg text-left hover:border-primary/50">
                      <Video size={16} className="mb-2" />
                      <p className="font-medium text-sm">Meeting Intelligence</p>
                      <p className="text-xs text-muted-foreground">Recording analysis</p>
                    </button>
                    <button className="p-3 border border-border rounded-lg text-left hover:border-primary/50">
                      <Database size={16} className="mb-2" />
                      <p className="font-medium text-sm">Full Analysis</p>
                      <p className="text-xs text-muted-foreground">All data sources</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Data Sources</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {dataSourceIntegrations.filter(s => s.status === 'connected').map((source) => (
                      <label key={source.id} className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-xl">{source.icon}</span>
                        <span className="text-sm">{source.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button 
                onClick={() => setShowNewScanModal(false)}
                className="px-6 py-2 border border-input rounded-md hover:bg-accent"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                Start Discovery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}