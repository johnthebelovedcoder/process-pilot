import { Process, Department, Integration, OptimizationSuggestion } from '@/types/process'

export const mockProcesses: Process[] = [
  {
    id: '1',
    name: 'Customer Onboarding',
    department: 'Sales',
    status: 'optimized',
    priority: 'high',
    description: 'End-to-end process for onboarding new customers from initial contact to account activation',
    steps: [
      { id: '1-1', name: 'Initial Contact', description: 'First interaction with potential customer', duration: 30, responsible: 'Sales Rep' },
      { id: '1-2', name: 'Qualification', description: 'Assess customer needs and fit', duration: 45, responsible: 'Sales Rep' },
      { id: '1-3', name: 'Proposal Creation', description: 'Create customized proposal', duration: 120, responsible: 'Sales Manager' },
      { id: '1-4', name: 'Contract Negotiation', description: 'Finalize terms and conditions', duration: 180, responsible: 'Legal Team' },
      { id: '1-5', name: 'Account Setup', description: 'Create customer account and credentials', duration: 30, responsible: 'IT Support' },
      { id: '1-6', name: 'Training & Handoff', description: 'Initial training and handoff to success team', duration: 90, responsible: 'Customer Success' }
    ],
    totalDuration: 495,
    frequency: 'Weekly',
    lastUpdated: '2025-07-20',
    compliance: 'compliant',
    efficiency: 92,
    potentialSavings: 15,
    automationPotential: 75,
    owner: 'Sarah Johnson',
    participants: ['Sales Rep', 'Sales Manager', 'Legal Team', 'IT Support', 'Customer Success'],
    tags: ['customer-facing', 'revenue-critical', 'automated']
  },
  {
    id: '2',
    name: 'Invoice Processing',
    department: 'Finance',
    status: 'documented',
    priority: 'high',
    description: 'Process for receiving, validating, and paying supplier invoices',
    steps: [
      { id: '2-1', name: 'Invoice Receipt', description: 'Receive invoice via email or portal', duration: 10, responsible: 'AP Clerk' },
      { id: '2-2', name: 'Data Entry', description: 'Enter invoice details into system', duration: 15, responsible: 'AP Clerk', isBottleneck: true },
      { id: '2-3', name: 'Three-Way Match', description: 'Match invoice with PO and receipt', duration: 20, responsible: 'AP Clerk' },
      { id: '2-4', name: 'Approval Routing', description: 'Route for appropriate approvals', duration: 60, responsible: 'Manager', isBottleneck: true },
      { id: '2-5', name: 'Payment Processing', description: 'Schedule and execute payment', duration: 15, responsible: 'AP Manager' }
    ],
    totalDuration: 120,
    frequency: 'Daily',
    lastUpdated: '2025-07-22',
    compliance: 'review_needed',
    efficiency: 78,
    potentialSavings: 25,
    automationPotential: 85,
    owner: 'Michael Chen',
    participants: ['AP Clerk', 'AP Manager', 'Department Managers'],
    tags: ['financial', 'compliance-critical', 'bottleneck']
  },
  {
    id: '3',
    name: 'Employee Offboarding',
    department: 'HR',
    status: 'discovered',
    priority: 'medium',
    description: 'Complete process for employee departure including asset return and access revocation',
    steps: [
      { id: '3-1', name: 'Resignation Receipt', description: 'Receive and acknowledge resignation', duration: 15, responsible: 'HR Manager' },
      { id: '3-2', name: 'Exit Interview Schedule', description: 'Schedule exit interview', duration: 10, responsible: 'HR Coordinator' },
      { id: '3-3', name: 'Knowledge Transfer', description: 'Document and transfer responsibilities', duration: 480, responsible: 'Direct Manager' },
      { id: '3-4', name: 'Asset Collection', description: 'Collect company assets', duration: 30, responsible: 'IT Support' },
      { id: '3-5', name: 'Access Revocation', description: 'Revoke system access', duration: 20, responsible: 'IT Security' },
      { id: '3-6', name: 'Final Payroll', description: 'Process final payment', duration: 45, responsible: 'Payroll' }
    ],
    totalDuration: 600,
    frequency: 'Monthly',
    lastUpdated: '2025-07-18',
    compliance: 'compliant',
    efficiency: 65,
    potentialSavings: 8,
    automationPotential: 60,
    owner: 'Lisa Wang',
    participants: ['HR Manager', 'HR Coordinator', 'Direct Manager', 'IT Support', 'IT Security', 'Payroll'],
    tags: ['compliance', 'security-critical']
  },
  {
    id: '4',
    name: 'Product Release',
    department: 'Engineering',
    status: 'automated',
    priority: 'high',
    description: 'End-to-end process for releasing new product features to production',
    steps: [
      { id: '4-1', name: 'Code Review', description: 'Peer review of code changes', duration: 60, responsible: 'Senior Developer' },
      { id: '4-2', name: 'Automated Testing', description: 'Run test suites', duration: 30, responsible: 'CI/CD System', tools: ['Jenkins', 'Jest'] },
      { id: '4-3', name: 'Staging Deployment', description: 'Deploy to staging environment', duration: 15, responsible: 'DevOps', tools: ['Kubernetes'] },
      { id: '4-4', name: 'QA Verification', description: 'Manual QA testing', duration: 120, responsible: 'QA Team' },
      { id: '4-5', name: 'Production Deploy', description: 'Deploy to production', duration: 30, responsible: 'DevOps', tools: ['Kubernetes', 'ArgoCD'] },
      { id: '4-6', name: 'Monitoring', description: 'Monitor for issues', duration: 60, responsible: 'DevOps', tools: ['Datadog'] }
    ],
    totalDuration: 315,
    frequency: 'Weekly',
    lastUpdated: '2025-07-23',
    compliance: 'compliant',
    efficiency: 95,
    potentialSavings: 5,
    automationPotential: 90,
    owner: 'David Kumar',
    participants: ['Developers', 'QA Team', 'DevOps', 'Product Manager'],
    tags: ['automated', 'technical', 'critical-path']
  },
  {
    id: '5',
    name: 'Support Ticket Resolution',
    department: 'Support',
    status: 'optimized',
    priority: 'high',
    description: 'Process for handling and resolving customer support tickets',
    steps: [
      { id: '5-1', name: 'Ticket Creation', description: 'Customer creates support ticket', duration: 5, responsible: 'Customer' },
      { id: '5-2', name: 'Triage', description: 'Categorize and prioritize ticket', duration: 10, responsible: 'Support Agent' },
      { id: '5-3', name: 'Investigation', description: 'Investigate issue', duration: 30, responsible: 'Support Agent' },
      { id: '5-4', name: 'Resolution', description: 'Implement solution', duration: 45, responsible: 'Support Agent' },
      { id: '5-5', name: 'Customer Verification', description: 'Confirm resolution with customer', duration: 15, responsible: 'Support Agent' },
      { id: '5-6', name: 'Documentation', description: 'Update knowledge base', duration: 10, responsible: 'Support Agent' }
    ],
    totalDuration: 115,
    frequency: 'Hourly',
    lastUpdated: '2025-07-21',
    compliance: 'compliant',
    efficiency: 88,
    potentialSavings: 20,
    automationPotential: 70,
    owner: 'Maria Garcia',
    participants: ['Support Agents', 'Technical Specialists', 'Customer Success'],
    tags: ['customer-facing', 'sla-bound', 'automated']
  },
  {
    id: '6',
    name: 'Marketing Campaign Launch',
    department: 'Marketing',
    status: 'documented',
    priority: 'medium',
    description: 'Process for planning and launching marketing campaigns',
    steps: [
      { id: '6-1', name: 'Campaign Planning', description: 'Define goals and strategy', duration: 480, responsible: 'Marketing Manager' },
      { id: '6-2', name: 'Content Creation', description: 'Create campaign assets', duration: 960, responsible: 'Creative Team', isBottleneck: true },
      { id: '6-3', name: 'Review & Approval', description: 'Stakeholder approval', duration: 240, responsible: 'CMO' },
      { id: '6-4', name: 'Channel Setup', description: 'Configure marketing channels', duration: 180, responsible: 'Marketing Ops' },
      { id: '6-5', name: 'Launch', description: 'Execute campaign', duration: 60, responsible: 'Marketing Coordinator' },
      { id: '6-6', name: 'Performance Tracking', description: 'Monitor metrics', duration: 120, responsible: 'Analytics Team' }
    ],
    totalDuration: 2040,
    frequency: 'Monthly',
    lastUpdated: '2025-07-19',
    compliance: 'compliant',
    efficiency: 72,
    potentialSavings: 30,
    automationPotential: 55,
    owner: 'Jennifer Lee',
    participants: ['Marketing Manager', 'Creative Team', 'CMO', 'Marketing Ops', 'Analytics Team'],
    tags: ['creative', 'revenue-impact', 'cross-functional']
  },
  {
    id: '7',
    name: 'Expense Report Approval',
    department: 'Finance',
    status: 'optimized',
    priority: 'low',
    description: 'Process for submitting and approving employee expense reports',
    steps: [
      { id: '7-1', name: 'Report Submission', description: 'Employee submits expense report', duration: 20, responsible: 'Employee' },
      { id: '7-2', name: 'Receipt Verification', description: 'Verify receipts and compliance', duration: 15, responsible: 'Finance Clerk' },
      { id: '7-3', name: 'Manager Approval', description: 'Direct manager approval', duration: 30, responsible: 'Manager' },
      { id: '7-4', name: 'Finance Review', description: 'Final finance review', duration: 10, responsible: 'Finance Manager' },
      { id: '7-5', name: 'Reimbursement', description: 'Process payment', duration: 5, responsible: 'Payroll' }
    ],
    totalDuration: 80,
    frequency: 'Weekly',
    lastUpdated: '2025-07-20',
    compliance: 'compliant',
    efficiency: 91,
    potentialSavings: 10,
    automationPotential: 80,
    owner: 'Robert Taylor',
    participants: ['Employees', 'Managers', 'Finance Team', 'Payroll'],
    tags: ['financial', 'automated', 'policy-driven']
  },
  {
    id: '8',
    name: 'Vendor Onboarding',
    department: 'Procurement',
    status: 'discovered',
    priority: 'medium',
    description: 'Process for onboarding new vendors and suppliers',
    steps: [
      { id: '8-1', name: 'Vendor Application', description: 'Vendor submits application', duration: 30, responsible: 'Vendor' },
      { id: '8-2', name: 'Due Diligence', description: 'Background and compliance checks', duration: 480, responsible: 'Procurement Team', isBottleneck: true },
      { id: '8-3', name: 'Contract Negotiation', description: 'Negotiate terms', duration: 720, responsible: 'Legal Team' },
      { id: '8-4', name: 'System Setup', description: 'Add vendor to systems', duration: 60, responsible: 'IT Support' },
      { id: '8-5', name: 'Training', description: 'Vendor portal training', duration: 90, responsible: 'Procurement Team' }
    ],
    totalDuration: 1380,
    frequency: 'Monthly',
    lastUpdated: '2025-07-17',
    compliance: 'review_needed',
    efficiency: 58,
    potentialSavings: 40,
    automationPotential: 65,
    owner: 'Amanda Brown',
    participants: ['Procurement Team', 'Legal Team', 'IT Support', 'Finance'],
    tags: ['compliance-heavy', 'manual', 'improvement-needed']
  }
]

export const mockDepartments: Department[] = [
  { id: '1', name: 'Sales', processCount: 23, teamSize: 45, efficiency: 87, head: 'Sarah Johnson' },
  { id: '2', name: 'Finance', processCount: 18, teamSize: 22, efficiency: 92, head: 'Michael Chen' },
  { id: '3', name: 'HR', processCount: 15, teamSize: 18, efficiency: 75, head: 'Lisa Wang' },
  { id: '4', name: 'Engineering', processCount: 31, teamSize: 67, efficiency: 89, head: 'David Kumar' },
  { id: '5', name: 'Marketing', processCount: 19, teamSize: 28, efficiency: 82, head: 'Jennifer Lee' },
  { id: '6', name: 'Support', processCount: 12, teamSize: 35, efficiency: 88, head: 'Maria Garcia' },
  { id: '7', name: 'Procurement', processCount: 9, teamSize: 12, efficiency: 65, head: 'Amanda Brown' }
]

export const mockIntegrations: Integration[] = [
  { id: '1', name: 'Salesforce', type: 'crm', status: 'connected', lastSync: '2025-07-23T10:30:00', processesLinked: 23 },
  { id: '2', name: 'Microsoft 365', type: 'productivity', status: 'connected', lastSync: '2025-07-23T11:00:00', processesLinked: 45 },
  { id: '3', name: 'SAP', type: 'erp', status: 'connected', lastSync: '2025-07-23T09:15:00', processesLinked: 31 },
  { id: '4', name: 'Slack', type: 'communication', status: 'connected', lastSync: '2025-07-23T11:30:00', processesLinked: 18 },
  { id: '5', name: 'Jira', type: 'productivity', status: 'disconnected', processesLinked: 0 },
  { id: '6', name: 'HubSpot', type: 'crm', status: 'error', lastSync: '2025-07-22T14:00:00', processesLinked: 12 }
]

export const mockOptimizationSuggestions: OptimizationSuggestion[] = [
  {
    id: '1',
    processId: '2',
    type: 'automation',
    title: 'Automate Invoice Data Entry',
    description: 'Implement OCR and AI to automatically extract invoice data, reducing manual entry time by 80%',
    estimatedSavings: 120,
    effort: 'medium',
    impact: 'high'
  },
  {
    id: '2',
    processId: '8',
    type: 'improvement',
    title: 'Streamline Vendor Due Diligence',
    description: 'Create standardized checklist and parallel review process to reduce bottlenecks',
    estimatedSavings: 80,
    effort: 'low',
    impact: 'high'
  },
  {
    id: '3',
    processId: '6',
    type: 'consolidation',
    title: 'Merge Content Review Steps',
    description: 'Combine creative and compliance reviews to reduce approval cycles',
    estimatedSavings: 40,
    effort: 'low',
    impact: 'medium'
  }
]