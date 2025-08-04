export type ProcessStatus = 'discovered' | 'documented' | 'optimized' | 'automated'
export type ProcessPriority = 'high' | 'medium' | 'low'
export type ProcessCompliance = 'compliant' | 'review_needed' | 'non_compliant'

export interface ProcessStep {
  id: string
  name: string
  description: string
  duration: number // in minutes
  responsible: string
  tools?: string[]
  isBottleneck?: boolean
}

export interface Process {
  id: string
  name: string
  department: string
  status: ProcessStatus
  priority: ProcessPriority
  description: string
  steps: ProcessStep[]
  totalDuration: number // in minutes
  frequency: string // e.g., "Daily", "Weekly", "Monthly"
  lastUpdated: string
  compliance: ProcessCompliance
  efficiency: number // percentage
  potentialSavings: number // in hours per month
  automationPotential: number // percentage
  owner: string
  participants: string[]
  tags: string[]
}

export interface Department {
  id: string
  name: string
  processCount: number
  teamSize: number
  efficiency: number
  head: string
}

export interface Integration {
  id: string
  name: string
  type: 'crm' | 'erp' | 'communication' | 'productivity' | 'custom'
  status: 'connected' | 'disconnected' | 'error'
  lastSync?: string
  processesLinked: number
}

export interface Metric {
  id: string
  name: string
  value: number | string
  change: number
  trend: 'up' | 'down' | 'stable'
  target?: number | string
}

export interface OptimizationSuggestion {
  id: string
  processId: string
  type: 'automation' | 'elimination' | 'consolidation' | 'improvement'
  title: string
  description: string
  estimatedSavings: number // in hours
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
}