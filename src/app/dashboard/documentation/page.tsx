'use client'

import { useState } from 'react'
import { 
  FileText, 
  Plus,
  Building2,
  Upload,
  Search,
  Filter,
  Download,
  Share2,
  Eye,
  Clock,
  User,
  Tag,
  Star,
  StarOff,
  Copy,
  ChevronRight,
  ChevronLeft,
  File,
  MoreHorizontal,
  BookOpen,
  X,
  Shield,
  List,
  Grid,
  Table,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

interface Document {
  id: string
  title: string
  content: string
  department: string
  author: string
  status: 'draft' | 'review' | 'approved' | 'archived'
  version: string
  created: string
  updated: string
  tags: string[]
  starred: boolean
  type: 'policy' | 'procedure' | 'manual' | 'guide' | 'template'
  permissions: 'public' | 'department' | 'private'
  comments: number
  views: number
  collaborators: string[]
}

interface Department {
  id: string
  name: string
  documentCount: number
  color: string
  expanded: boolean
}

interface DocumentTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

export default function DocumentationPage() {
  // State management
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Employee Onboarding Process',
      content: 'Comprehensive guide for onboarding new employees...',
      department: 'Human Resources',
      author: 'Sarah Wilson',
      status: 'approved',
      version: '2.1',
      created: '2024-01-15',
      updated: '2024-07-20',
      tags: ['onboarding', 'hr', 'process'],
      starred: true,
      type: 'procedure',
      permissions: 'department',
      comments: 8,
      views: 245,
      collaborators: ['Sarah Wilson', 'Mike Chen', 'Emma Davis']
    },
    {
      id: '2',
      title: 'Invoice Processing Guidelines',
      content: 'Step-by-step process for handling invoices...',
      department: 'Finance',
      author: 'John Smith',
      status: 'approved',
      version: '1.3',
      created: '2024-02-10',
      updated: '2024-07-18',
      tags: ['finance', 'invoices', 'accounting'],
      starred: false,
      type: 'procedure',
      permissions: 'department',
      comments: 5,
      views: 189,
      collaborators: ['John Smith', 'Lisa Brown']
    },
    {
      id: '3',
      title: 'Customer Support Best Practices',
      content: 'Guidelines for providing excellent customer support...',
      department: 'Customer Service',
      author: 'Emma Davis',
      status: 'review',
      version: '1.0',
      created: '2024-07-15',
      updated: '2024-07-19',
      tags: ['customer-service', 'support', 'best-practices'],
      starred: true,
      type: 'guide',
      permissions: 'public',
      comments: 12,
      views: 156,
      collaborators: ['Emma Davis', 'Tom Wilson']
    },
    {
      id: '4',
      title: 'IT Security Policy',
      content: 'Comprehensive security policies and procedures...',
      department: 'Information Technology',
      author: 'Alex Rodriguez',
      status: 'approved',
      version: '3.0',
      created: '2024-01-01',
      updated: '2024-07-10',
      tags: ['security', 'it', 'policy'],
      starred: false,
      type: 'policy',
      permissions: 'public',
      comments: 15,
      views: 892,
      collaborators: ['Alex Rodriguez', 'David Lee', 'Maria Garcia']
    },
    {
      id: '5',
      title: 'Sales Process Documentation',
      content: 'Complete sales process from lead to close...',
      department: 'Sales',
      author: 'Mike Chen',
      status: 'draft',
      version: '0.8',
      created: '2024-07-01',
      updated: '2024-07-21',
      tags: ['sales', 'process', 'crm'],
      starred: false,
      type: 'procedure',
      permissions: 'department',
      comments: 3,
      views: 67,
      collaborators: ['Mike Chen', 'Sarah Wilson']
    },
    {
      id: '6',
      title: 'Quality Assurance Manual',
      content: 'Detailed QA procedures and standards...',
      department: 'Operations',
      author: 'Lisa Brown',
      status: 'approved',
      version: '2.5',
      created: '2023-12-15',
      updated: '2024-07-12',
      tags: ['qa', 'quality', 'operations'],
      starred: true,
      type: 'manual',
      permissions: 'department',
      comments: 7,
      views: 321,
      collaborators: ['Lisa Brown', 'Tom Wilson', 'Alex Rodriguez']
    }
  ])

  const [departments, setDepartments] = useState<Department[]>([
    { id: 'hr', name: 'Human Resources', documentCount: 1, color: 'bg-blue-500', expanded: true },
    { id: 'finance', name: 'Finance', documentCount: 1, color: 'bg-green-500', expanded: true },
    { id: 'cs', name: 'Customer Service', documentCount: 1, color: 'bg-purple-500', expanded: true },
    { id: 'it', name: 'Information Technology', documentCount: 1, color: 'bg-red-500', expanded: true },
    { id: 'sales', name: 'Sales', documentCount: 1, color: 'bg-yellow-500', expanded: true },
    { id: 'ops', name: 'Operations', documentCount: 1, color: 'bg-indigo-500', expanded: true }
  ])

  const [templates] = useState<DocumentTemplate[]>([
    { id: '1', name: 'Policy Document', description: 'Standard company policy template', category: 'governance', icon: Shield },
    { id: '2', name: 'Procedure Guide', description: 'Step-by-step procedure documentation', category: 'process', icon: List },
    { id: '3', name: 'User Manual', description: 'Product or system user manual', category: 'guide', icon: BookOpen },
    { id: '4', name: 'Meeting Minutes', description: 'Standard meeting minutes template', category: 'meeting', icon: FileText },
    { id: '5', name: 'Project Plan', description: 'Project planning and tracking document', category: 'project', icon: Calendar }
  ])

  // UI State
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'table'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'title' | 'views'>('updated')
  const [showFilters, setShowFilters] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  // Computed values
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter
    const matchesType = typeFilter === 'all' || doc.type === typeFilter
    const matchesDepartment = !selectedDepartment || doc.department === selectedDepartment

    return matchesSearch && matchesStatus && matchesType && matchesDepartment
  })

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'created':
        return new Date(b.created).getTime() - new Date(a.created).getTime()
      case 'views':
        return b.views - a.views
      case 'updated':
      default:
        return new Date(b.updated).getTime() - new Date(a.updated).getTime()
    }
  })


  const toggleDepartment = (deptId: string) => {
    setDepartments(prev => prev.map(dept => 
      dept.id === deptId ? { ...dept, expanded: !dept.expanded } : dept
    ))
  }

  const toggleDocumentStar = (docId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, starred: !doc.starred } : doc
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      case 'archived': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'policy': return <Shield size={16} />
      case 'procedure': return <List size={16} />
      case 'manual': return <BookOpen size={16} />
      case 'guide': return <FileText size={16} />
      case 'template': return <Copy size={16} />
      default: return <File size={16} />
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar - Department Navigation */}
      <div className={`bg-card border-r border-border transition-all duration-300 ${sidebarExpanded ? 'w-80' : 'w-16'}`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {sidebarExpanded && (
              <h2 className="font-semibold text-lg">Departments</h2>
            )}
            <button 
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="p-1 hover:bg-accent rounded"
            >
              {sidebarExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>

        {sidebarExpanded && (
          <div className="p-4 space-y-2">
            <button
              onClick={() => setSelectedDepartment(null)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                !selectedDepartment ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">All Departments</span>
                <span className="ml-auto text-sm bg-background/20 px-2 py-1 rounded">
                  {documents.length}
                </span>
              </div>
            </button>

            {departments.map((dept) => (
              <div key={dept.id}>
                <button
                  onClick={() => {
                    setSelectedDepartment(dept.name)
                    toggleDepartment(dept.id)
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedDepartment === dept.name ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 ${dept.color} rounded-full`}></div>
                    <span className="font-medium">{dept.name}</span>
                    <span className="ml-auto text-sm bg-background/20 px-2 py-1 rounded">
                      {documents.filter(doc => doc.department === dept.name).length}
                    </span>
                  </div>
                </button>

                {dept.expanded && selectedDepartment === dept.name && (
                  <div className="ml-6 mt-2 space-y-1">
                    {documents
                      .filter(doc => doc.department === dept.name)
                      .slice(0, 5)
                      .map((doc) => (
                        <Link
                          key={doc.id}
                          href={`/dashboard/documentation/${doc.id}`}
                          className="w-full text-left p-2 text-sm rounded hover:bg-accent text-muted-foreground hover:text-foreground block"
                        >
                          <div className="flex items-center gap-2">
                            {getTypeIcon(doc.type)}
                            <span className="truncate">{doc.title}</span>
                          </div>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Documentation Management</h1>
              <p className="text-muted-foreground">
                Create, manage, and collaborate on enterprise documentation with version control and approval workflows
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
                <Upload size={16} />
                Bulk Import
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              <Filter size={16} />
              Filters
            </button>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'updated' | 'created' | 'title' | 'views')}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="updated">Last Updated</option>
              <option value="created">Date Created</option>
              <option value="title">Title</option>
              <option value="views">Most Viewed</option>
            </select>

            <div className="flex items-center gap-1 border border-input rounded-md">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-accent' : ''}`}
              >
                <List size={16} />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-accent' : ''}`}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`p-2 ${viewMode === 'table' ? 'bg-accent' : ''}`}
              >
                <Table size={16} />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-background rounded-lg border border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="all">All Statuses</option>
                    <option value="draft">Draft</option>
                    <option value="review">In Review</option>
                    <option value="approved">Approved</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Document Type</label>
                  <select 
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="all">All Types</option>
                    <option value="policy">Policy</option>
                    <option value="procedure">Procedure</option>
                    <option value="manual">Manual</option>
                    <option value="guide">Guide</option>
                    <option value="template">Template</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date Range</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last year</option>
                    <option>All time</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Document List/Grid */}
        <div className="flex-1 p-6">
          <div>
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {sortedDocuments.map((doc) => (
                    <div key={doc.id} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            {getTypeIcon(doc.type)}
                            <Link 
                              href={`/dashboard/documentation/${doc.id}`}
                              className="text-lg font-semibold hover:text-primary"
                            >
                              {doc.title}
                            </Link>
                            <button 
                              onClick={() => toggleDocumentStar(doc.id)}
                              className="p-1 hover:bg-accent rounded"
                            >
                              {doc.starred ? <Star size={16} className="text-yellow-500" /> : <StarOff size={16} />}
                            </button>
                          </div>
                          
                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {doc.content.substring(0, 150)}...
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <User size={14} />
                              {doc.author}
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 size={14} />
                              {doc.department}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={14} />
                              {doc.updated}
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye size={14} />
                              {doc.views} views
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            {doc.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
                                {tag}
                              </span>
                            ))}
                            {doc.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground">+{doc.tags.length - 3} more</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 ml-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(doc.status)}`}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                          
                          <div className="flex items-center gap-1">
                            <button className="p-2 hover:bg-accent rounded">
                              <Download size={16} />
                            </button>
                            <button className="p-2 hover:bg-accent rounded">
                              <Share2 size={16} />
                            </button>
                            <button className="p-2 hover:bg-accent rounded">
                              <MoreHorizontal size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedDocuments.map((doc) => (
                    <div key={doc.id} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(doc.type)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </div>
                        <button 
                          onClick={() => toggleDocumentStar(doc.id)}
                          className="p-1 hover:bg-accent rounded"
                        >
                          {doc.starred ? <Star size={16} className="text-yellow-500" /> : <StarOff size={16} />}
                        </button>
                      </div>

                      <Link 
                        href={`/dashboard/documentation/${doc.id}`}
                        className="text-lg font-semibold hover:text-primary mb-2 text-left block"
                      >
                        {doc.title}
                      </Link>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {doc.content.substring(0, 100)}...
                      </p>

                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>{doc.author}</span>
                          <span>{doc.updated}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>{doc.department}</span>
                          <span>{doc.views} views</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {doc.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === 'table' && (
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-medium">Document</th>
                          <th className="text-left p-4 font-medium">Author</th>
                          <th className="text-left p-4 font-medium">Department</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Updated</th>
                          <th className="text-left p-4 font-medium">Views</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedDocuments.map((doc) => (
                          <tr key={doc.id} className="border-b border-border hover:bg-accent/50">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                {getTypeIcon(doc.type)}
                                <div>
                                  <Link 
                                    href={`/dashboard/documentation/${doc.id}`}
                                    className="font-medium hover:text-primary"
                                  >
                                    {doc.title}
                                  </Link>
                                  <div className="text-xs text-muted-foreground">
                                    Version {doc.version}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{doc.author}</td>
                            <td className="p-4">{doc.department}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                                {doc.status}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">{doc.updated}</td>
                            <td className="p-4 text-sm text-muted-foreground">{doc.views}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={() => toggleDocumentStar(doc.id)}
                                  className="p-1 hover:bg-accent rounded"
                                >
                                  {doc.starred ? <Star size={14} className="text-yellow-500" /> : <StarOff size={14} />}
                                </button>
                                <button className="p-1 hover:bg-accent rounded">
                                  <Download size={14} />
                                </button>
                                <button className="p-1 hover:bg-accent rounded">
                                  <Share2 size={14} />
                                </button>
                                <button className="p-1 hover:bg-accent rounded">
                                  <MoreHorizontal size={14} />
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
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-200 flex items-center justify-center z-50"
        title="Create New Document"
      >
        <Plus size={24} />
      </button>


      {/* Create Document Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border border-border w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Create New Document</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-accent rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Choose Template</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {templates.map((template) => (
                    <button key={template.id} className="p-4 border border-input rounded-lg hover:bg-accent text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <template.icon size={20} />
                        <span className="font-medium">{template.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Document Title</label>
                  <input 
                    type="text"
                    placeholder="Enter document title..."
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Document Type</label>
                <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                  <option value="procedure">Procedure</option>
                  <option value="policy">Policy</option>
                  <option value="manual">Manual</option>
                  <option value="guide">Guide</option>
                  <option value="template">Template</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input 
                  type="text"
                  placeholder="Enter tags separated by commas..."
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-input rounded-md hover:bg-accent"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Create Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}