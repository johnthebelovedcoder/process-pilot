'use client'

import { useState } from 'react'
import { 
  Users, 
  Plus, 
  Edit, 
  MoreVertical, 
  TrendingUp, 
  Clock,
  Target,
  Shield,
  UserCheck,
  Building2,
  Settings,
  Search,
  Filter,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Star,
  Activity,
  BarChart3,
  FileText,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  Download,
  Upload,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  X,
  Save,
  Workflow,
  Database,
  Globe,
  MessageSquare,
  Bell,
  Archive,
  RotateCcw,
  Zap,
  Brain,
  Network,
  Layers,
  GitBranch,
  Award,
  Bookmark,
  Flag,
  Heart,
  ThumbsUp,
  Share,
  Link2,
  ExternalLink,
  RefreshCw,
  Maximize,
  Minimize,
  Grid3X3,
  List,
  Layout,
  PieChart
} from 'lucide-react'
import { mockDepartments, mockProcesses } from '@/lib/mock-data'
import Link from 'next/link'

const teamMembers = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    role: 'Sales Manager', 
    department: 'Sales', 
    email: 'sarah@company.com', 
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    processes: 8, 
    lastActive: '2 hours ago', 
    avatar: 'SJ',
    status: 'active',
    joinDate: '2023-01-15',
    skills: ['Sales', 'CRM', 'Lead Generation', 'Customer Relations'],
    certifications: ['Salesforce Certified', 'HubSpot Certified'],
    efficiency: 92,
    tasksCompleted: 156,
    teamLead: true,
    permissions: ['Department Access', 'Edit Processes', 'Manage Team'],
    workload: 85,
    performance: 'excellent'
  },
  { 
    id: '2', 
    name: 'Michael Chen', 
    role: 'Finance Director', 
    department: 'Finance', 
    email: 'michael@company.com', 
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    processes: 12, 
    lastActive: '1 hour ago', 
    avatar: 'MC',
    status: 'active',
    joinDate: '2022-08-20',
    skills: ['Financial Analysis', 'Budgeting', 'Compliance', 'Risk Management'],
    certifications: ['CPA', 'FRM Certified'],
    efficiency: 96,
    tasksCompleted: 234,
    teamLead: true,
    permissions: ['Department Access', 'Edit Processes', 'Financial Controls'],
    workload: 78,
    performance: 'excellent'
  },
  { 
    id: '3', 
    name: 'Lisa Wang', 
    role: 'HR Manager', 
    department: 'HR', 
    email: 'lisa@company.com', 
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    processes: 6, 
    lastActive: '30 min ago', 
    avatar: 'LW',
    status: 'active',
    joinDate: '2023-03-10',
    skills: ['Talent Acquisition', 'Employee Relations', 'Performance Management'],
    certifications: ['SHRM-CP', 'PHR Certified'],
    efficiency: 88,
    tasksCompleted: 98,
    teamLead: true,
    permissions: ['Department Access', 'Edit Processes', 'HR Systems'],
    workload: 72,
    performance: 'good'
  },
  { 
    id: '4', 
    name: 'David Kumar', 
    role: 'Engineering Lead', 
    department: 'Engineering', 
    email: 'david@company.com', 
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    processes: 15, 
    lastActive: '5 min ago', 
    avatar: 'DK',
    status: 'active',
    joinDate: '2021-11-05',
    skills: ['Software Development', 'System Architecture', 'DevOps', 'AI/ML'],
    certifications: ['AWS Certified', 'Google Cloud Professional'],
    efficiency: 94,
    tasksCompleted: 312,
    teamLead: true,
    permissions: ['Department Access', 'Edit Processes', 'Technical Systems'],
    workload: 89,
    performance: 'excellent'
  },
  { 
    id: '5', 
    name: 'Jennifer Lee', 
    role: 'Marketing Director', 
    department: 'Marketing', 
    email: 'jennifer@company.com', 
    phone: '+1 (555) 567-8901',
    location: 'Los Angeles, CA',
    processes: 9, 
    lastActive: '1 day ago', 
    avatar: 'JL',
    status: 'away',
    joinDate: '2022-05-18',
    skills: ['Digital Marketing', 'Brand Management', 'Content Strategy', 'Analytics'],
    certifications: ['Google Ads Certified', 'HubSpot Content Marketing'],
    efficiency: 85,
    tasksCompleted: 187,
    teamLead: true,
    permissions: ['Department Access', 'Edit Processes', 'Marketing Tools'],
    workload: 65,
    performance: 'good'
  },
  { 
    id: '6', 
    name: 'Maria Garcia', 
    role: 'Support Manager', 
    department: 'Support', 
    email: 'maria@company.com', 
    phone: '+1 (555) 678-9012',
    location: 'Miami, FL',
    processes: 7, 
    lastActive: '3 hours ago', 
    avatar: 'MG',
    status: 'active',
    joinDate: '2023-07-22',
    skills: ['Customer Service', 'Technical Support', 'Training', 'Process Optimization'],
    certifications: ['ITIL Foundation', 'Customer Success Certified'],
    efficiency: 91,
    tasksCompleted: 143,
    teamLead: true,
    permissions: ['Department Access', 'Edit Processes', 'Support Systems'],
    workload: 76,
    performance: 'excellent'
  },
  { 
    id: '7', 
    name: 'Alex Thompson', 
    role: 'Process Analyst', 
    department: 'Operations', 
    email: 'alex@company.com', 
    phone: '+1 (555) 789-0123',
    location: 'Denver, CO',
    processes: 4, 
    lastActive: '1 hour ago', 
    avatar: 'AT',
    status: 'active',
    joinDate: '2023-09-14',
    skills: ['Process Mapping', 'Data Analysis', 'Lean Six Sigma', 'Automation'],
    certifications: ['Six Sigma Green Belt', 'BPMN Certified'],
    efficiency: 87,
    tasksCompleted: 67,
    teamLead: false,
    permissions: ['View Processes', 'Add Comments', 'Data Access'],
    workload: 82,
    performance: 'good'
  },
  { 
    id: '8', 
    name: 'Emma Rodriguez', 
    role: 'Compliance Officer', 
    department: 'Legal', 
    email: 'emma@company.com', 
    phone: '+1 (555) 890-1234',
    location: 'Washington, DC',
    processes: 11, 
    lastActive: '45 min ago', 
    avatar: 'ER',
    status: 'active',
    joinDate: '2022-12-03',
    skills: ['Regulatory Compliance', 'Risk Assessment', 'Legal Review', 'Audit Management'],
    certifications: ['CRCM', 'Compliance Certified'],
    efficiency: 93,
    tasksCompleted: 201,
    teamLead: false,
    permissions: ['Department Access', 'Compliance Review', 'Audit Access'],
    workload: 88,
    performance: 'excellent'
  }
]

const roles = [
  { 
    name: 'Admin', 
    permissions: ['All Access', 'System Configuration', 'User Management', 'Security Controls'], 
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    description: 'Full system access with administrative privileges',
    memberCount: 2
  },
  { 
    name: 'Manager', 
    permissions: ['Department Access', 'Edit Processes', 'Team Management', 'Reporting'], 
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    description: 'Department-level management with team oversight',
    memberCount: 6
  },
  { 
    name: 'Contributor', 
    permissions: ['View Processes', 'Add Comments', 'Create Documentation', 'Edit Own Content'], 
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    description: 'Active participation in process development',
    memberCount: 12
  },
  { 
    name: 'Viewer', 
    permissions: ['View Only', 'Download Reports'], 
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    description: 'Read-only access to approved content',
    memberCount: 8
  },
  { 
    name: 'Specialist', 
    permissions: ['Domain Expertise', 'Process Review', 'Quality Assurance', 'Training'], 
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    description: 'Subject matter expertise and quality oversight',
    memberCount: 4
  }
]

const teamActivities = [
  {
    id: '1',
    type: 'member_added',
    user: 'Admin',
    target: 'Alex Thompson',
    description: 'Added Alex Thompson to Operations team',
    timestamp: '2 hours ago',
    department: 'Operations'
  },
  {
    id: '2',
    type: 'role_updated',
    user: 'Sarah Johnson',
    target: 'Emma Rodriguez',
    description: 'Updated role permissions for Emma Rodriguez',
    timestamp: '5 hours ago',
    department: 'Legal'
  },
  {
    id: '3',
    type: 'department_created',
    user: 'Admin',
    target: 'Legal',
    description: 'Created new Legal department',
    timestamp: '1 day ago',
    department: 'Legal'
  },
  {
    id: '4',
    type: 'training_completed',
    user: 'David Kumar',
    target: 'Process Management',
    description: 'Completed Process Management certification',
    timestamp: '2 days ago',
    department: 'Engineering'
  }
]

const teamCollaboration = [
  {
    processId: 'proc_001',
    processName: 'Customer Onboarding',
    collaborators: ['Sarah Johnson', 'Maria Garcia', 'Alex Thompson'],
    department: 'Sales',
    status: 'active',
    lastUpdate: '1 hour ago',
    efficiency: 94
  },
  {
    processId: 'proc_002',
    processName: 'Invoice Processing',
    collaborators: ['Michael Chen', 'Emma Rodriguez'],
    department: 'Finance',
    status: 'review',
    lastUpdate: '3 hours ago',
    efficiency: 87
  },
  {
    processId: 'proc_003',
    processName: 'Employee Onboarding',
    collaborators: ['Lisa Wang', 'David Kumar', 'Sarah Johnson'],
    department: 'HR',
    status: 'active',
    lastUpdate: '2 hours ago',
    efficiency: 91
  }
]

const skillsMatrix = [
  {
    skill: 'Process Mapping',
    experts: ['Alex Thompson', 'David Kumar'],
    proficient: ['Sarah Johnson', 'Maria Garcia'],
    learning: ['Emma Rodriguez'],
    demand: 'high'
  },
  {
    skill: 'Data Analysis',
    experts: ['Michael Chen', 'Alex Thompson'],
    proficient: ['David Kumar', 'Jennifer Lee'],
    learning: ['Lisa Wang'],
    demand: 'high'
  },
  {
    skill: 'Automation',
    experts: ['David Kumar'],
    proficient: ['Alex Thompson'],
    learning: ['Sarah Johnson', 'Michael Chen'],
    demand: 'critical'
  },
  {
    skill: 'Compliance',
    experts: ['Emma Rodriguez', 'Michael Chen'],
    proficient: ['Lisa Wang'],
    learning: ['Maria Garcia'],
    demand: 'medium'
  }
]

const departmentGoals = [
  {
    department: 'Sales',
    goals: [
      { name: 'Process Automation', progress: 75, target: '85%', status: 'on-track' },
      { name: 'Customer Satisfaction', progress: 92, target: '90%', status: 'achieved' },
      { name: 'Response Time', progress: 68, target: '80%', status: 'behind' }
    ]
  },
  {
    department: 'Engineering',
    goals: [
      { name: 'Code Quality', progress: 88, target: '85%', status: 'achieved' },
      { name: 'Deployment Frequency', progress: 82, target: '90%', status: 'on-track' },
      { name: 'Bug Resolution', progress: 76, target: '80%', status: 'on-track' }
    ]
  },
  {
    department: 'Finance',
    goals: [
      { name: 'Process Efficiency', progress: 95, target: '90%', status: 'achieved' },
      { name: 'Compliance Rate', progress: 98, target: '95%', status: 'achieved' },
      { name: 'Report Accuracy', progress: 87, target: '95%', status: 'behind' }
    ]
  }
]

export default function TeamsPage() {
  const [activeTab, setActiveTab] = useState('departments')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedMember, setSelectedMember] = useState(null)
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus
    return matchesSearch && matchesDepartment && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'efficiency':
        return b.efficiency - a.efficiency
      case 'processes':
        return b.processes - a.processes
      case 'joinDate':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      default:
        return 0
    }
  })

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Teams & Departments</h1>
            <p className="text-muted-foreground">
              Manage your organizational structure, team members, and collaboration workflows
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard/analytics"
              className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              <BarChart3 size={16} />
              Team Analytics
            </Link>
            <button 
              onClick={() => setShowDepartmentModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              <Building2 size={16} />
              New Department
            </button>
            <button 
              onClick={() => setShowAddMemberModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              <UserPlus size={16} />
              Add Member
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-6 border-b border-border overflow-x-auto">
          {[
            { key: 'departments', label: 'Departments', count: mockDepartments.length },
            { key: 'members', label: 'Team Members', count: teamMembers.length },
            { key: 'roles', label: 'Roles & Permissions', count: roles.length },
            { key: 'collaboration', label: 'Collaboration', count: teamCollaboration.length },
            { key: 'skills', label: 'Skills Matrix', count: skillsMatrix.length },
            { key: 'activities', label: 'Activities', count: teamActivities.length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'departments' && (
        <div>
          {/* Department Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mockDepartments.map((dept) => {
              const deptGoals = departmentGoals.find(g => g.department === dept.name)
              const avgGoalProgress = deptGoals ? 
                Math.round(deptGoals.goals.reduce((sum, goal) => sum + goal.progress, 0) / deptGoals.goals.length) : 0
              
              return (
                <div key={dept.id} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{dept.name}</h3>
                        <p className="text-sm text-muted-foreground">{dept.teamSize} members</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 hover:bg-accent rounded-md"
                        title="Department Analytics"
                      >
                        <BarChart3 size={16} />
                      </button>
                      <button className="p-2 hover:bg-accent rounded-md">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Target size={14} className="text-primary" />
                        <span className="text-sm text-muted-foreground">Processes</span>
                      </div>
                      <p className="text-xl font-bold">{dept.processCount}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp size={14} className="text-primary" />
                        <span className="text-sm text-muted-foreground">Efficiency</span>
                      </div>
                      <p className="text-xl font-bold">{dept.efficiency}%</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Performance</span>
                      <span className="font-medium">{dept.efficiency}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 mb-2">
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

                  {deptGoals && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Goals Progress</span>
                        <span className="font-medium">{avgGoalProgress}%</span>
                      </div>
                      <div className="space-y-1">
                        {deptGoals.goals.slice(0, 2).map((goal, index) => (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{goal.name}</span>
                            <span className={`px-1 py-0.5 rounded text-xs ${
                              goal.status === 'achieved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              goal.status === 'on-track' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {goal.progress}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Department Head</p>
                      <p className="font-medium">{dept.head}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-primary hover:underline">
                        View Team
                      </button>
                      <button className="text-xs text-primary hover:underline">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Department Metrics</h2>
              <select className="px-3 py-1 bg-background border border-input rounded-md text-sm">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last year</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium">Department</th>
                    <th className="text-left p-3 font-medium">Team Size</th>
                    <th className="text-left p-3 font-medium">Processes</th>
                    <th className="text-left p-3 font-medium">Avg. Efficiency</th>
                    <th className="text-left p-3 font-medium">Time Saved</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDepartments.map((dept) => (
                    <tr key={dept.id} className="border-b border-border hover:bg-accent/50">
                      <td className="p-3 font-medium">{dept.name}</td>
                      <td className="p-3">{dept.teamSize}</td>
                      <td className="p-3">{dept.processCount}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-secondary rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                dept.efficiency >= 80 ? 'bg-green-600' :
                                dept.efficiency >= 60 ? 'bg-yellow-600' :
                                'bg-red-600'
                              }`}
                              style={{ width: `${dept.efficiency}%` }}
                            />
                          </div>
                          <span className="text-sm">{dept.efficiency}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        {Math.floor(Math.random() * 50) + 10}h/month
                      </td>
                      <td className="p-3">
                        <button className="text-sm text-primary hover:underline">
                          Configure
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div>
          {/* Enhanced Filters */}
          <div className="bg-card p-4 rounded-lg border border-border mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, role, department, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Departments</option>
                {mockDepartments.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="away">Away</option>
                <option value="offline">Offline</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="name">Sort by Name</option>
                <option value="efficiency">Sort by Efficiency</option>
                <option value="processes">Sort by Processes</option>
                <option value="joinDate">Sort by Join Date</option>
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

          {/* Team Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Users className="text-primary" size={24} />
                <div>
                  <p className="text-2xl font-bold">{teamMembers.length}</p>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Activity className="text-green-600" size={24} />
                <div>
                  <p className="text-2xl font-bold">{teamMembers.filter(m => m.status === 'active').length}</p>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-blue-600" size={24} />
                <div>
                  <p className="text-2xl font-bold">{Math.round(teamMembers.reduce((sum, m) => sum + m.efficiency, 0) / teamMembers.length)}%</p>
                  <p className="text-sm text-muted-foreground">Avg Efficiency</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Award className="text-purple-600" size={24} />
                <div>
                  <p className="text-2xl font-bold">{teamMembers.filter(m => m.teamLead).length}</p>
                  <p className="text-sm text-muted-foreground">Team Leaders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Members Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <div key={member.id} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{member.avatar}</span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                          member.status === 'active' ? 'bg-green-500' :
                          member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        {member.teamLead && (
                          <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full mt-1">
                            <Award size={10} />
                            Team Lead
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedMember(member)
                        setShowMemberModal(true)
                      }}
                      className="p-1 hover:bg-accent rounded"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Department</span>
                      <span className="font-medium">{member.department}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Efficiency</span>
                      <span className="font-medium">{member.efficiency}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Processes</span>
                      <span className="font-medium">{member.processes}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Workload</span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-secondary rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              member.workload >= 90 ? 'bg-red-500' :
                              member.workload >= 75 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${member.workload}%` }}
                          />
                        </div>
                        <span className="text-xs">{member.workload}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Top Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-muted rounded">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Last active: {member.lastActive}</span>
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-1 hover:bg-accent rounded"
                        title="Send Message"
                      >
                        <MessageSquare size={14} />
                      </button>
                      <button 
                        className="p-1 hover:bg-accent rounded"
                        title="View Profile"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        className="p-1 hover:bg-accent rounded"
                        title="Edit Member"
                      >
                        <Edit size={14} />
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
                      <th className="text-left p-4 font-medium">Member</th>
                      <th className="text-left p-4 font-medium">Department</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Efficiency</th>
                      <th className="text-left p-4 font-medium">Processes</th>
                      <th className="text-left p-4 font-medium">Workload</th>
                      <th className="text-left p-4 font-medium">Last Active</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="border-b border-border hover:bg-accent/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">{member.avatar}</span>
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                                member.status === 'active' ? 'bg-green-500' :
                                member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                              }`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{member.name}</p>
                                {member.teamLead && <Award className="text-blue-600" size={14} />}
                              </div>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">{member.department}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded">
                            {member.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-secondary rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  member.efficiency >= 90 ? 'bg-green-600' :
                                  member.efficiency >= 80 ? 'bg-blue-600' :
                                  member.efficiency >= 70 ? 'bg-yellow-600' :
                                  'bg-red-600'
                                }`}
                                style={{ width: `${member.efficiency}%` }}
                              />
                            </div>
                            <span className="text-sm">{member.efficiency}%</span>
                          </div>
                        </td>
                        <td className="p-4">{member.processes}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-secondary rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  member.workload >= 90 ? 'bg-red-500' :
                                  member.workload >= 75 ? 'bg-yellow-500' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${member.workload}%` }}
                              />
                            </div>
                            <span className="text-sm">{member.workload}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{member.lastActive}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button 
                              className="p-1 hover:bg-accent rounded"
                              title="View Profile"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              className="p-1 hover:bg-accent rounded"
                              title="Edit Member"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedMember(member)
                                setShowMemberModal(true)
                              }}
                              className="p-1 hover:bg-accent rounded"
                            >
                              <MoreVertical size={16} />
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

      {activeTab === 'roles' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Permission Roles</h2>
            <p className="text-muted-foreground">
              Manage access levels and permissions for different user roles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {roles.map((role) => (
              <div key={role.name} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Shield className="text-primary" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg">{role.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${role.color}`}>
                        {role.memberCount} members
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedRole(role)
                      setShowRoleModal(true)
                    }}
                    className="p-2 hover:bg-accent rounded-md"
                  >
                    <Settings size={16} />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{role.description}</p>

                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-muted-foreground">Key Permissions:</p>
                  {role.permissions.slice(0, 3).map((permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <UserCheck size={14} className="text-green-600" />
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                  {role.permissions.length > 3 && (
                    <p className="text-xs text-muted-foreground">+{role.permissions.length - 3} more permissions</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 text-sm text-primary hover:underline">
                    View All
                  </button>
                  <button className="flex-1 text-sm text-primary hover:underline">
                    Edit Permissions
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Role Assignment Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium">Permission</th>
                    <th className="text-center p-3 font-medium">Admin</th>
                    <th className="text-center p-3 font-medium">Manager</th>
                    <th className="text-center p-3 font-medium">Contributor</th>
                    <th className="text-center p-3 font-medium">Viewer</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'View Processes',
                    'Edit Processes',
                    'Delete Processes',
                    'Manage Team',
                    'Configure Integrations',
                    'Access Analytics',
                    'Export Data',
                    'System Settings'
                  ].map((permission) => (
                    <tr key={permission} className="border-b border-border">
                      <td className="p-3 font-medium">{permission}</td>
                      <td className="p-3 text-center">
                        <UserCheck className="text-green-600 mx-auto" size={16} />
                      </td>
                      <td className="p-3 text-center">
                        {['View Processes', 'Edit Processes', 'Access Analytics', 'Export Data'].includes(permission) ? (
                          <UserCheck className="text-green-600 mx-auto" size={16} />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {['View Processes', 'Access Analytics'].includes(permission) ? (
                          <UserCheck className="text-green-600 mx-auto" size={16} />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {permission === 'View Processes' ? (
                          <UserCheck className="text-green-600 mx-auto" size={16} />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Collaboration Tab */}
      {activeTab === 'collaboration' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Team Collaboration</h2>
            <p className="text-muted-foreground">
              Monitor cross-functional collaboration and team process involvement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-4">Active Collaborations</h3>
                <div className="space-y-4">
                  {teamCollaboration.map((collab) => (
                    <div key={collab.processId} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{collab.processName}</h4>
                          <p className="text-sm text-muted-foreground">{collab.department} • {collab.lastUpdate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            collab.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            collab.status === 'review' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                          }`}>
                            {collab.status}
                          </span>
                          <span className="text-sm font-medium">{collab.efficiency}%</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Users size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Collaborators:</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {collab.collaborators.map((collaborator, index) => {
                          const member = teamMembers.find(m => m.name === collaborator)
                          return (
                            <div key={index} className="flex items-center gap-2 bg-background px-3 py-1 rounded-full">
                              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium">{member?.avatar || collaborator.split(' ').map(n => n[0]).join('')}</span>
                              </div>
                              <span className="text-sm">{collaborator}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-4">Collaboration Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cross-Department Projects</span>
                    <span className="text-xl font-bold">{teamCollaboration.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Team Size</span>
                    <span className="text-xl font-bold">
                      {Math.round(teamCollaboration.reduce((sum, c) => sum + c.collaborators.length, 0) / teamCollaboration.length)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-xl font-bold text-green-600">92%</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-4">Top Collaborators</h3>
                <div className="space-y-3">
                  {teamMembers
                    .sort((a, b) => b.processes - a.processes)
                    .slice(0, 5)
                    .map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">{member.avatar}</span>
                          </div>
                          <span className="text-sm font-medium">{member.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{member.processes} processes</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills Matrix Tab */}
      {activeTab === 'skills' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Skills Matrix</h2>
            <p className="text-muted-foreground">
              Track team skills, expertise levels, and identify skill gaps
            </p>
          </div>

          <div className="space-y-6">
            {skillsMatrix.map((skill) => (
              <div key={skill.skill} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Brain className="text-primary" size={24} />
                    <div>
                      <h3 className="text-lg font-semibold">{skill.skill}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        skill.demand === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        skill.demand === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {skill.demand} demand
                      </span>
                    </div>
                  </div>
                  <button className="text-sm text-primary hover:underline">
                    Add Training
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-green-600 mb-2">Experts ({skill.experts.length})</h4>
                    <div className="space-y-2">
                      {skill.experts.map((expert) => {
                        const member = teamMembers.find(m => m.name === expert)
                        return (
                          <div key={expert} className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-green-800 dark:text-green-200">{member?.avatar || 'EX'}</span>
                            </div>
                            <span className="text-sm">{expert}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-blue-600 mb-2">Proficient ({skill.proficient.length})</h4>
                    <div className="space-y-2">
                      {skill.proficient.map((prof) => {
                        const member = teamMembers.find(m => m.name === prof)
                        return (
                          <div key={prof} className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-blue-800 dark:text-blue-200">{member?.avatar || 'PR'}</span>
                            </div>
                            <span className="text-sm">{prof}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-yellow-600 mb-2">Learning ({skill.learning.length})</h4>
                    <div className="space-y-2">
                      {skill.learning.map((learner) => {
                        const member = teamMembers.find(m => m.name === learner)
                        return (
                          <div key={learner} className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-yellow-800 dark:text-yellow-200">{member?.avatar || 'LR'}</span>
                            </div>
                            <span className="text-sm">{learner}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">Skills Development Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-red-600" size={16} />
                    <span className="text-sm font-medium text-red-800 dark:text-red-200">Critical Skills Gap</span>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Automation skills are in critical demand but have limited experts. Consider training programs.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-blue-600" size={16} />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Growth Opportunity</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Data Analysis has strong expert coverage. Consider mentorship programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activities Tab */}
      {activeTab === 'activities' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Team Activities</h2>
            <p className="text-muted-foreground">
              Track team changes, updates, and organizational activities
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Activities</h3>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                    <option value="all">All Activities</option>
                    <option value="member_added">Members Added</option>
                    <option value="role_updated">Role Updates</option>
                    <option value="department_created">Department Changes</option>
                    <option value="training_completed">Training Completed</option>
                  </select>
                  <select className="px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="divide-y divide-border">
              {teamActivities.map((activity) => (
                <div key={activity.id} className="p-6 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'member_added' ? 'bg-green-100 dark:bg-green-900' :
                      activity.type === 'role_updated' ? 'bg-blue-100 dark:bg-blue-900' :
                      activity.type === 'department_created' ? 'bg-purple-100 dark:bg-purple-900' :
                      'bg-orange-100 dark:bg-orange-900'
                    }`}>
                      {activity.type === 'member_added' && <UserPlus className="text-green-600" size={16} />}
                      {activity.type === 'role_updated' && <Settings className="text-blue-600" size={16} />}
                      {activity.type === 'department_created' && <Building2 className="text-purple-600" size={16} />}
                      {activity.type === 'training_completed' && <Award className="text-orange-600" size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">{activity.description}</p>
                        <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by {activity.user}</span>
                        <span>•</span>
                        <span>{activity.department}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-border">
              <button className="w-full py-2 text-center text-primary hover:bg-accent rounded-md transition-colors">
                Load More Activities
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Sidebar */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-3">
        <Link 
          href="/dashboard/metrics"
          className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          title="Custom Metrics"
        >
          <Target size={20} />
        </Link>
        <Link 
          href="/dashboard/dashboard-builder"
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          title="Dashboard Builder"
        >
          <Layout size={20} />
        </Link>
        <Link 
          href="/dashboard/alerts"
          className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          title="Alerts"
        >
          <Bell size={20} />
        </Link>
        <Link 
          href="/dashboard/automation"
          className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          title="Automation Hub"
        >
          <Zap size={20} />
        </Link>
      </div>
    </div>
  )
}