'use client'

import { useState } from 'react'
import { 
  Search, 
  Filter,
  Copy,
  CheckCircle,
  AlertCircle,
  GitMerge,
  Eye,
  X,
  ArrowRight,
  Target,
  Users,
  Clock,
  Workflow,
  FileText,
  MoreHorizontal,
  Settings,
  Brain,
  TrendingUp,
  Zap
} from 'lucide-react'

export default function DuplicateDetectionPage() {
  const [activeTab, setActiveTab] = useState('detected')
  const [selectedDuplicates, setSelectedDuplicates] = useState<string[]>([])
  const [showMergeModal, setShowMergeModal] = useState(false)
  const [mergeCandidates, setMergeCandidates] = useState<any[]>([])

  const duplicateGroups = [
    {
      id: '1',
      similarity: 94,
      processes: [
        {
          id: 'p1',
          name: 'Customer Onboarding - Sales',
          department: 'Sales',
          steps: 12,
          lastModified: '2 days ago',
          usage: 'High',
          source: 'Manual Entry'
        },
        {
          id: 'p2', 
          name: 'New Customer Setup',
          department: 'Customer Success',
          steps: 14,
          lastModified: '1 week ago',
          usage: 'Medium',
          source: 'Document Import'
        },
        {
          id: 'p3',
          name: 'Client Onboarding Process',
          department: 'Operations',
          steps: 11,
          lastModified: '3 days ago', 
          usage: 'Low',
          source: 'Audio Recording'
        }
      ],
      suggestedAction: 'merge',
      confidence: 'high'
    },
    {
      id: '2',
      similarity: 87,
      processes: [
        {
          id: 'p4',
          name: 'Invoice Processing - Finance',
          department: 'Finance',
          steps: 8,
          lastModified: '1 day ago',
          usage: 'High',
          source: 'Manual Entry'
        },
        {
          id: 'p5',
          name: 'Invoice Approval Workflow',
          department: 'Accounting',
          steps: 9,
          lastModified: '4 days ago',
          usage: 'Medium',
          source: 'URL Import'
        }
      ],
      suggestedAction: 'review',
      confidence: 'medium'
    },
    {
      id: '3',
      similarity: 76,
      processes: [
        {
          id: 'p6',
          name: 'Employee Onboarding Checklist',
          department: 'HR',
          steps: 15,
          lastModified: '5 days ago',
          usage: 'High',
          source: 'Document Import'
        },
        {
          id: 'p7',
          name: 'New Hire Process',
          department: 'HR',
          steps: 13,
          lastModified: '1 week ago',
          usage: 'Medium',
          source: 'Manual Entry'
        }
      ],
      suggestedAction: 'review',
      confidence: 'medium'
    }
  ]

  const mergedHistory = [
    {
      id: '1',
      primaryProcess: 'Customer Support Ticket Resolution',
      mergedProcesses: ['Support Ticket Handling', 'Customer Issue Resolution'],
      mergedDate: '2 days ago',
      mergedBy: 'Sarah Wilson',
      improvement: '+23% efficiency'
    },
    {
      id: '2',
      primaryProcess: 'Project Planning Workflow',
      mergedProcesses: ['Project Setup', 'Planning Process Template'],
      mergedDate: '1 week ago',
      mergedBy: 'Mike Chen',
      improvement: '+15% consistency'
    }
  ]

  const stats = [
    { label: 'Duplicates Detected', value: '47', icon: Copy, color: 'text-blue-600' },
    { label: 'Processes Merged', value: '23', icon: GitMerge, color: 'text-green-600' },
    { label: 'Time Saved', value: '156h', icon: Clock, color: 'text-purple-600' },
    { label: 'Efficiency Gained', value: '+18%', icon: TrendingUp, color: 'text-orange-600' }
  ]

  const handleMerge = (groupId: string) => {
    const group = duplicateGroups.find(g => g.id === groupId)
    if (group) {
      setMergeCandidates(group.processes)
      setShowMergeModal(true)
    }
  }

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 90) return 'text-red-600 bg-red-100 dark:bg-red-900/30'
    if (similarity >= 80) return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
    return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
  }

  const getConfidenceColor = (confidence: string) => {
    if (confidence === 'high') return 'text-green-600 bg-green-100 dark:bg-green-900/30'
    if (confidence === 'medium') return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
    return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Smart Duplicate Detection</h1>
            <p className="text-muted-foreground">
              AI-powered detection and merging of similar processes to eliminate redundancy
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
              <Settings size={16} />
              Detection Rules
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              <Brain size={16} />
              Run Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-100 rounded-md dark:bg-gray-800">
                  <Icon size={20} className={stat.color} />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-6 border-b border-border">
          {[
            { id: 'detected', label: 'Detected Duplicates', count: duplicateGroups.length },
            { id: 'history', label: 'Merge History', count: mergedHistory.length },
            { id: 'settings', label: 'Detection Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Detected Duplicates Tab */}
      {activeTab === 'detected' && (
        <div className="space-y-6">
          {duplicateGroups.map((group) => (
            <div key={group.id} className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getSimilarityColor(group.similarity)}`}>
                      {group.similarity}% Similar
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getConfidenceColor(group.confidence)}`}>
                      {group.confidence} confidence
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-sm text-primary hover:underline">View Details</button>
                  <button 
                    onClick={() => handleMerge(group.id)}
                    className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90"
                  >
                    {group.suggestedAction === 'merge' ? 'Merge' : 'Review'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {group.processes.map((process) => (
                  <div key={process.id} className="p-4 bg-background rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium text-sm">{process.name}</h3>
                      <MoreHorizontal size={16} className="text-muted-foreground" />
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Department:</span>
                        <span>{process.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Steps:</span>
                        <span>{process.steps}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Usage:</span>
                        <span className={`${
                          process.usage === 'High' ? 'text-green-600' :
                          process.usage === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {process.usage}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Source:</span>
                        <span>{process.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modified:</span>
                        <span>{process.lastModified}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Merge History Tab */}
      {activeTab === 'history' && (
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Merge History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium">Primary Process</th>
                  <th className="text-left p-4 font-medium">Merged Processes</th>
                  <th className="text-left p-4 font-medium">Merged By</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Improvement</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mergedHistory.map((merge) => (
                  <tr key={merge.id} className="border-b border-border hover:bg-accent/50">
                    <td className="p-4 font-medium">{merge.primaryProcess}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {merge.mergedProcesses.map((process, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {process}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">{merge.mergedBy}</td>
                    <td className="p-4 text-sm text-muted-foreground">{merge.mergedDate}</td>
                    <td className="p-4">
                      <span className="text-sm text-green-600">{merge.improvement}</span>
                    </td>
                    <td className="p-4">
                      <button className="text-sm text-primary hover:underline">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detection Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-6">Detection Settings</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Similarity Threshold</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Minimum similarity for detection</span>
                  <div className="flex items-center gap-3">
                    <input type="range" min="50" max="100" defaultValue="75" className="w-32" />
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Detection Scope</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Cross-department detection</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Include archived processes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Auto-merge high confidence duplicates</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Analysis Frequency</h3>
              <select className="px-3 py-2 bg-background border border-input rounded-md">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Manual only</option>
              </select>
            </div>

            <div className="pt-4 border-t border-border">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Merge Modal */}
      {showMergeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border border-border w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Merge Processes</h2>
              <button 
                onClick={() => setShowMergeModal(false)}
                className="p-1 hover:bg-accent rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <Brain className="text-blue-600" size={20} />
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">AI Merge Recommendation</p>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Combining these processes will create a unified workflow and eliminate redundancy
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Select Primary Process</h3>
                <div className="space-y-3">
                  {mergeCandidates.map((process, index) => (
                    <div key={process.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <input type="radio" name="primary" defaultChecked={index === 0} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{process.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{process.department}</span>
                            <span>{process.steps} steps</span>
                            <span className={`${
                              process.usage === 'High' ? 'text-green-600' :
                              process.usage === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {process.usage} usage
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Merge Options</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Preserve all step variations</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Maintain department-specific instructions</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">Archive original processes</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
              <button 
                onClick={() => setShowMergeModal(false)}
                className="px-4 py-2 border border-input rounded-md hover:bg-accent"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowMergeModal(false)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Merge Processes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}