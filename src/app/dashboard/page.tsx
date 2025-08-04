import { 
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  FileText,
  BarChart3,
  PieChart,
  DollarSign,
  Package,
  ShoppingCart,
  UserCheck,
  Briefcase,
  Building,
  CreditCard,
  MoreHorizontal,
  Download,
  RefreshCw,
  Database,
  Server,
  Shield,
  GitBranch,
  Code,
  Layers,
  Cpu,
  HardDrive,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  FileCode,
  Terminal,
  Workflow,
  Settings,
  Mic,
  Brain,
  Upload,
  PlayCircle,
  Headphones
} from 'lucide-react'

// ProcessPilot performance metrics
const performanceMetrics = [
  {
    title: 'Processes Discovered',
    value: '1,247',
    change: '+28.5%',
    trend: 'up',
    icon: Workflow,
    period: 'vs last month',
    chart: 'processes'
  },
  {
    title: 'Audio Recordings',
    value: '456',
    change: '+35.2%',
    trend: 'up',
    icon: Mic,
    period: 'vs last month',
    chart: 'recordings'
  },
  {
    title: 'Process Execution Errors',
    value: '12',
    change: '-60.3%',
    trend: 'up',
    icon: AlertTriangle,
    period: 'vs last month',
    chart: 'errors'
  },
  {
    title: 'Smart Coaching Active',
    value: '89%',
    change: '+15.7%',
    trend: 'up',
    icon: Brain,
    period: 'vs last month',
    chart: 'coaching'
  }
]

// ProcessPilot daily stats
const todayStats = [
  { label: 'Processes Recorded', value: '23', change: '+12', icon: Mic },
  { label: 'Documents Imported', value: '87', change: '+34', icon: Upload },
  { label: 'Coaching Sessions', value: '156', change: '+67', icon: Brain },
  { label: 'Active Users', value: '342', change: '+28', icon: UserCheck }
]

// ProcessPilot recent activity
const recentActivity = [
  {
    id: 1,
    type: 'process',
    message: 'New process discovered: Customer Onboarding',
    value: '12 steps',
    time: '5 min ago',
    status: 'success'
  },
  {
    id: 2,
    type: 'audio',
    message: 'Audio process recorded by Sarah Wilson',
    value: '8 min',
    time: '12 min ago',
    status: 'info'
  },
  {
    id: 3,
    type: 'import',
    message: 'Bulk process import completed',
    value: '24 processes',
    time: '1 hour ago',
    status: 'success'
  },
  {
    id: 4,
    type: 'coaching',
    message: 'Smart coaching error prevented',
    value: 'Invoice Processing',
    time: '2 hours ago',
    status: 'warning'
  },
  {
    id: 5,
    type: 'duplicate',
    message: 'Duplicate processes merged automatically',
    value: '3 duplicates',
    time: '3 hours ago',
    status: 'info'
  }
]

// ProcessPilot feature usage
const componentUsage = [
  { name: 'Audio Recording', usage: 456, percentage: 89, trend: '+35%' },
  { name: 'Document Import', usage: 387, percentage: 81, trend: '+42%' },
  { name: 'Smart Coaching', usage: 298, percentage: 68, trend: '+28%' },
  { name: 'Process Discovery', usage: 234, percentage: 56, trend: '+15%' },
  { name: 'Duplicate Detection', usage: 123, percentage: 50, trend: '+67%' }
]

// System resources
const systemResources = [
  {
    name: 'API Server 1',
    cpu: 45,
    memory: 62,
    status: 'healthy',
    region: 'US-East'
  },
  {
    name: 'API Server 2',
    cpu: 38,
    memory: 55,
    status: 'healthy',
    region: 'US-West'
  },
  {
    name: 'Database Primary',
    cpu: 72,
    memory: 84,
    status: 'warning',
    region: 'US-East'
  },
  {
    name: 'Cache Server',
    cpu: 23,
    memory: 41,
    status: 'healthy',
    region: 'Global'
  }
]

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">ProcessPilot Overview</h1>
            <p className="text-muted-foreground">
              Monitor your business processes, coaching effectiveness, and process optimization in real-time
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* System Health Alert */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20 mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="text-primary" size={20} />
          ProcessPilot Performance Today
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {todayStats.map((stat) => {
            const Icon = stat.icon
            const isPositive = stat.change.startsWith('+')
            return (
              <div key={stat.label} className="bg-background p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Icon size={16} className="text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from yesterday
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon
          const isUp = metric.trend === 'up'
          
          return (
            <div key={metric.title} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Icon size={20} className="text-primary" />
                </div>
                <button className="p-1 hover:bg-accent rounded">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 text-sm ${
                    isUp ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {metric.change}
                  </div>
                  <span className="text-sm text-muted-foreground">{metric.period}</span>
                </div>
              </div>
              <div className="mt-4 h-16 bg-muted/50 rounded flex items-end justify-around p-2">
                {/* Placeholder for mini chart */}
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-primary/30 rounded-t"
                    style={{ height: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity & System Resources */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <button className="text-sm text-primary hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 bg-background rounded-lg hover:bg-accent/50 transition-colors">
                  <div className={`w-2 h-10 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.message}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <span className="text-sm font-medium">{activity.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Resources */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">System Resources</h2>
              <button className="text-sm text-primary hover:underline">Manage</button>
            </div>
            <div className="space-y-4">
              {systemResources.map((resource) => (
                <div key={resource.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{resource.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        resource.status === 'healthy'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {resource.status}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{resource.region}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Cpu size={12} /> CPU
                        </span>
                        <span className="font-medium">{resource.cpu}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            resource.cpu > 80 ? 'bg-red-500' : resource.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${resource.cpu}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <HardDrive size={12} /> Memory
                        </span>
                        <span className="font-medium">{resource.memory}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            resource.memory > 80 ? 'bg-red-500' : resource.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${resource.memory}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Component Usage */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Feature Usage</h2>
              <button className="text-sm text-primary hover:underline">Analytics</button>
            </div>
            <div className="space-y-3">
              {componentUsage.map((component, index) => (
                <div key={component.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{component.name}</p>
                    <span className={`text-xs ${
                      component.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {component.trend}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${component.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{component.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-background rounded-lg hover:bg-accent transition-colors text-left">
                <Mic size={20} className="mb-2 text-primary" />
                <p className="text-sm font-medium">Record Process</p>
              </button>
              <button className="p-3 bg-background rounded-lg hover:bg-accent transition-colors text-left">
                <Upload size={20} className="mb-2 text-primary" />
                <p className="text-sm font-medium">Import Docs</p>
              </button>
              <button className="p-3 bg-background rounded-lg hover:bg-accent transition-colors text-left">
                <Brain size={20} className="mb-2 text-primary" />
                <p className="text-sm font-medium">Smart Coaching</p>
              </button>
              <button className="p-3 bg-background rounded-lg hover:bg-accent transition-colors text-left">
                <Workflow size={20} className="mb-2 text-primary" />
                <p className="text-sm font-medium">Discover</p>
              </button>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">Security Overview</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span className="text-sm">SSL Certificate</span>
                </div>
                <span className="text-sm text-green-600">Valid</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span className="text-sm">Firewall</span>
                </div>
                <span className="text-sm text-green-600">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-yellow-500" />
                  <span className="text-sm">Pending Updates</span>
                </div>
                <span className="text-sm text-yellow-600">3 available</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span className="text-sm">2FA Enabled</span>
                </div>
                <span className="text-sm text-green-600">98% users</span>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm">
              Security Center
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}