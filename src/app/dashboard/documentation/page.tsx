'use client'

import { useState, useEffect } from 'react'
import { getAllDocuments } from '@/lib/documentation-data'
import { 
  FileText, 
  Plus,
  Search,
  Filter,
  Eye,
  Clock,
  User,
  Tag,
  Star,
  StarOff,
  Copy,
  ChevronRight,
  MoreHorizontal,
  BookOpen,
  Shield,
  List,
  Calendar,
  Hash,
  Zap,
  GitBranch,
  Users,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  Settings,
  BarChart3,
  Video,
  Map,
  Workflow,
  FileImage,
  Code,
  Globe,
  Brain,
  Award,
  Activity,
  Target,
  Timer,
  Edit3,
  Share2,
  Archive,
  Grid3X3,
  Building2,
  Building,
  Briefcase,
  Cog,
  HeartHandshake,
  DollarSign as Finance,
  ShieldCheck,
  Truck
} from 'lucide-react'
import Link from 'next/link'

interface ProcessDocumentItem {
  id: string
  title: string
  description: string
  department: string
  process: {
    id: string
    name: string
    steps: number
    discoveredAt: string
  }
  generationStatus: 'generating' | 'completed' | 'failed' | 'pending'
  formats: {
    visualMap: { status: 'generated' | 'generating' | 'failed', lastGenerated?: string }
    procedures: { status: 'generated' | 'generating' | 'failed', lastGenerated?: string }
    interactive: { status: 'generated' | 'generating' | 'failed', lastGenerated?: string }
    video: { status: 'generated' | 'generating' | 'failed', lastGenerated?: string }
    checklist: { status: 'generated' | 'generating' | 'failed', lastGenerated?: string }
  }
  qualityScore: number
  compliance: {
    iso: boolean
    sox: boolean
    gdpr: boolean
  }
  version: string
  author: string
  collaborators: string[]
  comments: number
  reviews: {
    pending: number
    approved: number
  }
  lastUpdated: string
  template: string
  starred: boolean
  tags: string[]
  views: number
}

// Departments configuration
const departments = [
  { id: 'all', name: 'All Departments', icon: Building2, count: 0, color: 'text-gray-600' },
  { id: 'hr', name: 'Human Resources', icon: Users, count: 0, color: 'text-blue-600' },
  { id: 'finance', name: 'Finance', icon: Finance, count: 0, color: 'text-green-600' },
  { id: 'operations', name: 'Operations', icon: Cog, count: 0, color: 'text-purple-600' },
  { id: 'legal', name: 'Legal & Compliance', icon: ShieldCheck, count: 0, color: 'text-red-600' },
  { id: 'sales', name: 'Sales & Marketing', icon: Target, count: 0, color: 'text-orange-600' },
  { id: 'it', name: 'Information Technology', icon: Code, count: 0, color: 'text-indigo-600' },
  { id: 'customer', name: 'Customer Service', icon: HeartHandshake, count: 0, color: 'text-pink-600' },
  { id: 'logistics', name: 'Logistics & Supply', icon: Truck, count: 0, color: 'text-amber-600' }
]

// Function to determine department based on document content
const getDepartmentFromDocument = (doc: any): string => {
  const title = doc.title.toLowerCase()
  const description = doc.description.toLowerCase()
  const category = doc.category?.toLowerCase() || ''
  
  if (title.includes('employee') || title.includes('recruitment') || title.includes('hr') || title.includes('hiring')) return 'hr'
  if (title.includes('invoice') || title.includes('payment') || title.includes('financial') || title.includes('budget')) return 'finance'
  if (title.includes('customer') || title.includes('support') || title.includes('service')) return 'customer'
  if (title.includes('legal') || title.includes('compliance') || title.includes('audit')) return 'legal'
  if (title.includes('sales') || title.includes('marketing') || title.includes('lead')) return 'sales'
  if (title.includes('it') || title.includes('software') || title.includes('system')) return 'it'
  if (title.includes('logistics') || title.includes('supply') || title.includes('shipping')) return 'logistics'
  
  return 'operations' // Default department
}

export default function ProcessDocumentationPage() {
  // Get actual documents from data source
  const allDocuments = getAllDocuments()
  
  // Convert to ProcessDocumentItem format for the UI
  const processDocuments = allDocuments.map(doc => ({
    id: doc.id,
    title: doc.title,
    description: doc.description,
    department: getDepartmentFromDocument(doc),
    process: {
      id: `proc-${doc.id}-001`,
      name: doc.title.replace(' Process', ''),
      steps: 12,
      discoveredAt: doc.created + 'T10:30:00Z'
    },
    generationStatus: 'completed' as const,
    formats: {
      visualMap: { status: 'generated' as const, lastGenerated: doc.updated + 'T11:00:00Z' },
      procedures: { status: 'generated' as const, lastGenerated: doc.updated + 'T11:05:00Z' },
      interactive: { status: 'generated' as const, lastGenerated: doc.updated + 'T11:10:00Z' },
      video: { status: 'generating' as const },
      checklist: { status: 'generated' as const, lastGenerated: doc.updated + 'T11:15:00Z' }
    },
    qualityScore: 90 + Math.floor(Math.random() * 10),
    compliance: { iso: true, sox: false, gdpr: true },
    version: doc.version,
    author: doc.author.name,
    collaborators: doc.contributors?.map(c => c.name) || [],
    comments: doc.comments?.length || 0,
    reviews: { pending: 0, approved: Math.floor(Math.random() * 5) },
    lastUpdated: doc.updated + 'T14:30:00Z',
    template: doc.category,
    starred: doc.starred,
    tags: doc.tags,
    views: doc.views
  }))
  
  // Calculate department counts
  const departmentsWithCounts = departments.map(dept => ({
    ...dept,
    count: dept.id === 'all' 
      ? processDocuments.length 
      : processDocuments.filter(doc => doc.department === dept.id).length
  }))

  // State management
  const [documents, setDocuments] = useState(processDocuments)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [qualityFilter, setQualityFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'updated' | 'quality' | 'title' | 'process'>('updated')
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null)

  // Computed values
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.process.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || doc.generationStatus === statusFilter
    const matchesQuality = qualityFilter === 'all' || 
                          (qualityFilter === 'high' && doc.qualityScore >= 90) ||
                          (qualityFilter === 'medium' && doc.qualityScore >= 70 && doc.qualityScore < 90) ||
                          (qualityFilter === 'low' && doc.qualityScore < 70)
    const matchesType = typeFilter === 'all' || doc.template.toLowerCase().includes(typeFilter.toLowerCase())
    const matchesDepartment = departmentFilter === 'all' || doc.department === departmentFilter

    return matchesSearch && matchesStatus && matchesQuality && matchesType && matchesDepartment
  })

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'quality':
        return b.qualityScore - a.qualityScore
      case 'process':
        return a.process.name.localeCompare(b.process.name)
      case 'updated':
      default:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    }
  })

  const toggleDocumentStar = (docId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, starred: !doc.starred } : doc
    ))
  }

  const triggerDocumentGeneration = (processName: string) => {
    console.log(`Generating documentation for process: ${processName}`)
    setShowGenerateModal(false)
    setSelectedProcess(null)
    // In a real app, this would trigger documentation generation
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': 
        return 'text-green-700 bg-green-100'
      case 'generating': 
        return 'text-blue-700 bg-blue-100'
      case 'failed': 
        return 'text-red-700 bg-red-100'
      case 'pending': 
        return 'text-orange-700 bg-orange-100'
      default: 
        return 'text-gray-700 bg-gray-100'
    }
  }


  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Departments */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold mb-1">Departments</h2>
          <p className="text-sm text-muted-foreground">Filter by department</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {departmentsWithCounts.map((dept) => {
              const Icon = dept.icon
              return (
                <button
                  key={dept.id}
                  onClick={() => setDepartmentFilter(dept.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    departmentFilter === dept.id
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${departmentFilter === dept.id ? 'text-primary' : dept.color}`} />
                    <span className="text-sm font-medium">{dept.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    departmentFilter === dept.id 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {dept.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Documentation</h1>
              <p className="text-muted-foreground">Comprehensive documentation for all your business needs</p>
            </div>
            <Link 
              href="/dashboard/documentation/new"
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Document</span>
            </Link>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-input rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Grid View"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="approved">Approved</option>
                <option value="review">In Review</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'updated' | 'quality' | 'title' | 'process')}
                className="px-3 py-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
              >
                <option value="updated">Recently Updated</option>
                <option value="quality">Quality Score</option>
                <option value="title">Title</option>
                <option value="process">Process Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents Display */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedDocuments.map((doc) => {
                const departmentInfo = departmentsWithCounts.find(d => d.id === doc.department)
                const DepartmentIcon = departmentInfo?.icon || Workflow
                
                return (
                  <div key={doc.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <DepartmentIcon className={`h-4 w-4 ${departmentInfo?.color || 'text-gray-600'}`} />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.generationStatus)}`}>
                          {doc.generationStatus.charAt(0).toUpperCase() + doc.generationStatus.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => toggleDocumentStar(doc.id)}
                          className="p-1 hover:bg-accent rounded transition-colors"
                        >
                          {doc.starred ? 
                            <Star className="h-4 w-4 text-yellow-500 fill-current" /> : 
                            <StarOff className="h-4 w-4 text-muted-foreground" />
                          }
                        </button>
                        <button className="p-1 hover:bg-accent rounded transition-colors">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>

                    <Link href={`/dashboard/documentation/${doc.id}`} className="group">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {doc.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {doc.description}
                      </p>
                    </Link>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{doc.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(doc.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{doc.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>v{doc.version}</span>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                          {departmentInfo?.name || 'Operations'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <Link
                        href={`/dashboard/documentation/${doc.id}`}
                        className="flex items-center justify-between text-primary hover:text-primary/80 transition-colors"
                      >
                        <span className="text-sm font-medium">Read More</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-2">
              {sortedDocuments.map((doc) => {
                const departmentInfo = departmentsWithCounts.find(d => d.id === doc.department)
                const DepartmentIcon = departmentInfo?.icon || Workflow
                
                return (
                  <div key={doc.id} className="bg-card rounded-lg border border-border p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <DepartmentIcon className={`h-5 w-5 flex-shrink-0 ${departmentInfo?.color || 'text-gray-600'}`} />
                        
                        <div className="flex-1 min-w-0">
                          <Link href={`/dashboard/documentation/${doc.id}`} className="group">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                              {doc.title}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {doc.description}
                            </p>
                          </Link>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{doc.author}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(doc.lastUpdated).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4" />
                            <span>{doc.views}</span>
                          </div>
                          
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.generationStatus)}`}>
                            {doc.generationStatus.charAt(0).toUpperCase() + doc.generationStatus.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                        <button 
                          onClick={() => toggleDocumentStar(doc.id)}
                          className="p-1 hover:bg-accent rounded transition-colors"
                        >
                          {doc.starred ? 
                            <Star className="h-4 w-4 text-yellow-500 fill-current" /> : 
                            <StarOff className="h-4 w-4 text-muted-foreground" />
                          }
                        </button>
                        <button className="p-1 hover:bg-accent rounded transition-colors">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Empty State */}
          {sortedDocuments.length === 0 && (
            <div className="text-center py-12">
              <Workflow className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No process documentation found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || statusFilter !== 'all' || qualityFilter !== 'all' || departmentFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Generate documentation from discovered processes'
                }
              </p>
              {!searchQuery && statusFilter === 'all' && qualityFilter === 'all' && departmentFilter === 'all' && (
                <button 
                  onClick={() => setShowGenerateModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mx-auto"
                >
                  <Zap className="h-4 w-4" />
                  <span>Generate Documentation</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Generate Documentation Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg border border-border p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Generate Process Documentation</h3>
            <p className="text-muted-foreground mb-4">
              Select a discovered process to generate comprehensive documentation in multiple formats.
            </p>
            <div className="space-y-2 mb-6">
              {['Customer Support Workflow', 'Data Processing Pipeline', 'Quality Assurance Process'].map((process) => (
                <label key={process} className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="process" 
                    value={process}
                    checked={selectedProcess === process}
                    onChange={(e) => setSelectedProcess(e.target.value)}
                    className="text-primary"
                  />
                  <span className="text-sm">{process}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setShowGenerateModal(false)}
                className="px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => selectedProcess && triggerDocumentGeneration(selectedProcess)}
                disabled={!selectedProcess}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Generate Documentation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}