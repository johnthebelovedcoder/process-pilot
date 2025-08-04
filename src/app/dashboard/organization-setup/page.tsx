'use client'

import { useState } from 'react'
import { 
  Building2, 
  Users, 
  Target, 
  Settings,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  Plus,
  Trash2,
  Edit,
  Globe,
  MapPin,
  Phone,
  Mail,
  Crown,
  Shield,
  User,
  Briefcase,
  Calendar,
  Zap,
  Database
} from 'lucide-react'
import Link from 'next/link'

const industryOptions = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Government',
  'Non-profit',
  'Consulting',
  'Other'
]

const companySizes = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1000 employees' },
  { value: '1000+', label: '1000+ employees' }
]

const departmentTemplates = [
  { name: 'Sales', description: 'Lead generation, customer acquisition, deal closing', suggested: true },
  { name: 'Marketing', description: 'Brand awareness, content creation, campaign management', suggested: true },
  { name: 'Operations', description: 'Daily operations, process optimization, quality control', suggested: true },
  { name: 'Finance', description: 'Financial planning, accounting, budgeting, reporting', suggested: true },
  { name: 'Human Resources', description: 'Recruitment, employee relations, training, compliance', suggested: true },
  { name: 'Engineering', description: 'Product development, technical architecture, quality assurance', suggested: false },
  { name: 'Customer Support', description: 'Customer service, technical support, issue resolution', suggested: false },
  { name: 'Legal', description: 'Contract management, compliance, risk assessment', suggested: false },
  { name: 'IT', description: 'Infrastructure, software management, security', suggested: false }
]

const integrationOptions = [
  {
    name: 'Microsoft 365',
    description: 'Connect with Outlook, Teams, SharePoint, and Office apps',
    logo: '📧',
    category: 'Productivity',
    popular: true
  },
  {
    name: 'Google Workspace',
    description: 'Integrate with Gmail, Drive, Calendar, and Google apps',
    logo: '🌐',
    category: 'Productivity',
    popular: true
  },
  {
    name: 'Salesforce',
    description: 'Sync customer data and sales processes',
    logo: '☁️',
    category: 'CRM',
    popular: true
  },
  {
    name: 'Slack',
    description: 'Team communication and workflow notifications',
    logo: '💬',
    category: 'Communication',
    popular: true
  },
  {
    name: 'HubSpot',
    description: 'Marketing automation and customer relationship management',
    logo: '🎯',
    category: 'CRM',
    popular: false
  },
  {
    name: 'Jira',
    description: 'Project management and issue tracking',
    logo: '📋',
    category: 'Project Management',
    popular: false
  }
]

export default function OrganizationSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [organizationData, setOrganizationData] = useState({
    name: '',
    industry: '',
    size: '',
    website: '',
    address: '',
    phone: '',
    description: ''
  })

  const [departments, setDepartments] = useState([])
  const [teamMembers, setTeamMembers] = useState([
    { name: '', email: '', role: 'member', department: '' }
  ])
  const [selectedIntegrations, setSelectedIntegrations] = useState([])
  const [goals, setGoals] = useState([])
  const [newGoal, setNewGoal] = useState('')

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', email: '', role: 'member', department: '' }])
  }

  const removeTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index))
  }

  const updateTeamMember = (index, field, value) => {
    const updated = [...teamMembers]
    updated[index][field] = value
    setTeamMembers(updated)
  }

  const toggleDepartment = (dept) => {
    if (departments.find(d => d.name === dept.name)) {
      setDepartments(departments.filter(d => d.name !== dept.name))
    } else {
      setDepartments([...departments, dept])
    }
  }

  const toggleIntegration = (integration) => {
    if (selectedIntegrations.find(i => i.name === integration.name)) {
      setSelectedIntegrations(selectedIntegrations.filter(i => i.name !== integration.name))
    } else {
      setSelectedIntegrations([...selectedIntegrations, integration])
    }
  }

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()])
      setNewGoal('')
    }
  }

  const removeGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index))
  }

  const handleFinishSetup = () => {
    console.log('Organization setup completed:', {
      organization: organizationData,
      departments,
      teamMembers,
      integrations: selectedIntegrations,
      goals
    })
    // Redirect to dashboard
    window.location.href = '/dashboard'
  }

  const totalSteps = 5

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto pt-8 pb-16 px-4">
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Organization Setup</h1>
              <p className="text-muted-foreground">Configure your organization to get the most out of ProcessPilot</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 mb-8">
            {Array.from({ length: totalSteps }, (_, index) => {
              const step = index + 1
              return (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : step === currentStep + 1
                      ? 'bg-primary/20 text-primary border-2 border-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step < currentStep ? <CheckCircle size={16} /> : step}
                  </div>
                  {step < totalSteps && (
                    <div className={`w-12 h-0.5 ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>

          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Step 1: Organization Information */}
        {currentStep === 1 && (
          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Organization Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Organization Name *</label>
                <input
                  type="text"
                  value={organizationData.name}
                  onChange={(e) => setOrganizationData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your Company Name"
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Industry *</label>
                <select
                  value={organizationData.industry}
                  onChange={(e) => setOrganizationData(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select industry...</option>
                  {industryOptions.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Company Size *</label>
                <select
                  value={organizationData.size}
                  onChange={(e) => setOrganizationData(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select size...</option>
                  {companySizes.map(size => (
                    <option key={size.value} value={size.value}>{size.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  value={organizationData.website}
                  onChange={(e) => setOrganizationData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://yourcompany.com"
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={organizationData.phone}
                  onChange={(e) => setOrganizationData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={organizationData.address}
                  onChange={(e) => setOrganizationData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Business St, City, State, Country"
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={organizationData.description}
                  onChange={(e) => setOrganizationData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of your organization and what you do..."
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                onClick={() => setCurrentStep(2)}
                disabled={!organizationData.name || !organizationData.industry || !organizationData.size}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Departments */}
        {currentStep === 2 && (
          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Configure Departments</h2>
            <p className="text-muted-foreground mb-6">
              Select the departments that exist in your organization. You can customize these later.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {departmentTemplates.map((dept) => (
                <div 
                  key={dept.name}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    departments.find(d => d.name === dept.name)
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => toggleDepartment(dept)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <Briefcase className="text-primary" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{dept.name}</h3>
                        {dept.suggested && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                            Suggested
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{dept.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Selected: {departments.length} departments
              </p>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 px-6 py-2 border border-input rounded-md hover:bg-accent"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button 
                onClick={() => setCurrentStep(3)}
                disabled={departments.length === 0}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Team Members */}
        {currentStep === 3 && (
          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Invite Team Members</h2>
            <p className="text-muted-foreground mb-6">
              Add team members who will use ProcessPilot. You can invite more people later.
            </p>
            
            <div className="space-y-4 mb-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-3">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                  </div>
                  <div className="col-span-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                      placeholder="email@company.com"
                      className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    >
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Department</label>
                    <select
                      value={member.department}
                      onChange={(e) => updateTeamMember(index, 'department', e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    >
                      <option value="">Select...</option>
                      {departments.map(dept => (
                        <option key={dept.name} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1">
                    {teamMembers.length > 1 && (
                      <button
                        onClick={() => removeTeamMember(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addTeamMember}
              className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent mb-6"
            >
              <Plus size={16} />
              Add Team Member
            </button>

            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-6 py-2 border border-input rounded-md hover:bg-accent"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button 
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Integrations */}
        {currentStep === 4 && (
          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Connect Integrations</h2>
            <p className="text-muted-foreground mb-6">
              Connect your existing tools to automatically discover and document processes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {integrationOptions.map((integration) => (
                <div 
                  key={integration.name}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedIntegrations.find(i => i.name === integration.name)
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => toggleIntegration(integration)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{integration.logo}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{integration.name}</h3>
                        {integration.popular && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full dark:bg-green-900/30 dark:text-green-400">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{integration.description}</p>
                      <span className="px-2 py-1 text-xs bg-secondary rounded">
                        {integration.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Database className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">Data Security</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    All integrations use secure OAuth connections. We only access the data necessary for process discovery and never store sensitive information.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-6 py-2 border border-input rounded-md hover:bg-accent"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button 
                onClick={() => setCurrentStep(5)}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Goals & Objectives */}
        {currentStep === 5 && (
          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Set Your Goals</h2>
            <p className="text-muted-foreground mb-6">
              What do you hope to achieve with ProcessPilot? This helps us customize your experience.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="e.g., Reduce process completion time by 30%"
                  className="flex-1 px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                />
                <button
                  onClick={addGoal}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  <Plus size={16} />
                </button>
              </div>

              {goals.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">Your Goals:</h3>
                  {goals.map((goal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Target className="text-primary" size={16} />
                        <span>{goal}</span>
                      </div>
                      <button
                        onClick={() => removeGoal(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="text-green-600" size={20} />
                  <span className="font-medium text-green-800 dark:text-green-200">Process Efficiency</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Streamline workflows and eliminate bottlenecks
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="text-blue-600" size={20} />
                  <span className="font-medium text-blue-800 dark:text-blue-200">Compliance</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Ensure regulatory compliance and audit readiness
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg dark:bg-purple-900/20 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="text-purple-600" size={20} />
                  <span className="font-medium text-purple-800 dark:text-purple-200">Team Collaboration</span>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Improve communication and knowledge sharing
                </p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg border border-primary/20 text-center">
              <CheckCircle className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Ready to Launch!</h3>
              <p className="text-muted-foreground mb-4">
                Your organization is configured and ready to start discovering and optimizing processes.
              </p>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 px-6 py-2 border border-input rounded-md hover:bg-accent"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button 
                onClick={handleFinishSetup}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-lg font-medium"
              >
                <Zap size={20} />
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}