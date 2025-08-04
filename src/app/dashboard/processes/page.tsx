'use client'

import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Grid3x3,
  List,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle,
  MoreVertical,
  TrendingUp,
  Users,
  Calendar,
  Upload,
  Plus,
  Link2,
  FileText,
  X,
  Mic,
  Brain
} from 'lucide-react'
import { mockProcesses } from '@/lib/mock-data'
import { Process } from '@/types/process'

export default function ProcessesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showImportModal, setShowImportModal] = useState(false)
  const [importType, setImportType] = useState<'upload' | 'url' | 'audio'>('upload')

  const departments = ['all', ...new Set(mockProcesses.map(p => p.department))]
  const statuses = ['all', 'discovered', 'documented', 'optimized', 'automated']

  const filteredProcesses = mockProcesses.filter(process => {
    const matchesSearch = process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         process.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || process.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || process.status === filterStatus
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status: Process['status']) => {
    switch (status) {
      case 'automated': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'optimized': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'documented': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'discovered': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
  }

  const getComplianceIcon = (compliance: Process['compliance']) => {
    switch (compliance) {
      case 'compliant': return <CheckCircle className="text-green-600" size={16} />
      case 'review_needed': return <AlertCircle className="text-yellow-600" size={16} />
      case 'non_compliant': return <AlertCircle className="text-red-600" size={16} />
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Process Library</h1>
            <p className="text-muted-foreground">
              Comprehensive documentation of all discovered and optimized business processes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              <Upload size={16} />
              Import Processes
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card p-4 rounded-lg border border-border mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search processes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <div className="flex border border-input rounded-md overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`p-2 ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 ${view === 'list' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredProcesses.length} of {mockProcesses.length} processes
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProcesses.map((process) => (
            <div key={process.id} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{process.name}</h3>
                  <p className="text-sm text-muted-foreground">{process.department}</p>
                </div>
                <button className="p-1 hover:bg-accent rounded">
                  <MoreVertical size={16} />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {process.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(process.status)}`}>
                    {process.status}
                  </span>
                  <div className="flex items-center gap-1">
                    {getComplianceIcon(process.compliance)}
                    <span className="text-xs text-muted-foreground">Compliance</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock size={14} />
                    <span>{Math.floor(process.totalDuration / 60)}h {process.totalDuration % 60}m</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users size={14} />
                    <span>{process.participants.length} people</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp size={14} />
                    <span>{process.efficiency}% efficient</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Zap size={14} />
                    <span>{process.automationPotential}% auto</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <a href={`/dashboard/processes/${process.id}`} className="text-sm text-primary hover:underline">
                    View Details →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium">Process Name</th>
                <th className="text-left p-4 font-medium">Department</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Duration</th>
                <th className="text-left p-4 font-medium">Efficiency</th>
                <th className="text-left p-4 font-medium">Compliance</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcesses.map((process) => (
                <tr key={process.id} className="border-b border-border hover:bg-accent/50">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{process.name}</p>
                      <p className="text-sm text-muted-foreground">{process.frequency}</p>
                    </div>
                  </td>
                  <td className="p-4">{process.department}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(process.status)}`}>
                      {process.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    {Math.floor(process.totalDuration / 60)}h {process.totalDuration % 60}m
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${process.efficiency}%` }}
                        />
                      </div>
                      <span className="text-sm">{process.efficiency}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {getComplianceIcon(process.compliance)}
                    </div>
                  </td>
                  <td className="p-4">
                    <a href={`/dashboard/processes/${process.id}`} className="text-sm text-primary hover:underline">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border border-border w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Import Processes</h2>
              <button 
                onClick={() => setShowImportModal(false)}
                className="p-1 hover:bg-accent rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Import Type Tabs */}
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setImportType('upload')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  importType === 'upload' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'
                }`}
              >
                <Upload size={16} />
                Upload Files
              </button>
              <button 
                onClick={() => setImportType('url')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  importType === 'url' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'
                }`}
              >
                <Link2 size={16} />
                Import URLs
              </button>
              <button 
                onClick={() => setImportType('audio')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  importType === 'audio' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'
                }`}
              >
                <Mic size={16} />
                Audio Recording
              </button>
            </div>

            {/* Upload Files Tab */}
            {importType === 'upload' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <p className="text-lg font-medium mb-2">Drag and drop files here</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports PDF, Word, PowerPoint, Excel, Visio, and more
                  </p>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    Choose Files
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Supported formats:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Documents: PDF, Word (.docx), PowerPoint (.pptx)</li>
                    <li>Spreadsheets: Excel (.xlsx), Google Sheets</li>
                    <li>Diagrams: Visio, Lucidchart, Draw.io files</li>
                    <li>Text: Markdown, plain text, structured formats</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Import URLs Tab */}
            {importType === 'url' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Website URLs</label>
                  <textarea
                    placeholder="Enter URLs (one per line)&#10;https://company.com/processes&#10;https://wiki.internal.com/procedures"
                    className="w-full h-32 px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Supported sources:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Company intranets and wikis</li>
                    <li>Public documentation sites</li>
                    <li>Training and help documentation</li>
                    <li>Process databases and repositories</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Audio Recording Tab */}
            {importType === 'audio' && (
              <div className="space-y-4">
                <div className="text-center p-8 bg-background rounded-lg">
                  <Mic className="mx-auto mb-4 text-primary" size={48} />
                  <p className="text-lg font-medium mb-2">Record Process Description</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Speak naturally about your process - AI will convert it to structured steps
                  </p>
                  <button className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2 mx-auto">
                    <Mic size={16} />
                    Start Recording
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Recording tips:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Speak clearly and describe each step in order</li>
                    <li>Mention any decision points or exceptions</li>
                    <li>Include estimated time for each step</li>
                    <li>Specify who is responsible for each action</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain size={16} />
                AI will automatically structure and optimize imported processes
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 border border-input rounded-md hover:bg-accent"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  {importType === 'upload' ? 'Process Files' : 
                   importType === 'url' ? 'Import URLs' : 'Process Recording'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}