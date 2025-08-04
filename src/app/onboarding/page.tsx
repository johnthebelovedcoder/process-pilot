'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Building2, 
  Users, 
  Link2, 
  BarChart3, 
  Search, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react'

const steps = [
  { id: 1, title: 'Account Setup', icon: Building2 },
  { id: 2, title: 'Connect Integrations', icon: Link2 },
  { id: 3, title: 'Choose Departments', icon: Users },
  { id: 4, title: 'Configure Metrics', icon: BarChart3 },
  { id: 5, title: 'Start Discovery', icon: Search },
]

const integrations = [
  { name: 'Salesforce', icon: '⚡', description: 'CRM and sales processes', popular: true },
  { name: 'Microsoft 365', icon: '📊', description: 'Email, Teams, SharePoint', popular: true },
  { name: 'Slack', icon: '💬', description: 'Team communication', popular: true },
  { name: 'SAP', icon: '🏢', description: 'Enterprise resource planning', popular: false },
  { name: 'Jira', icon: '🎯', description: 'Project management', popular: true },
  { name: 'HubSpot', icon: '🚀', description: 'Marketing automation', popular: false },
  { name: 'Google Workspace', icon: '🌐', description: 'Email, Drive, Calendar', popular: true },
  { name: 'Zoom', icon: '📹', description: 'Video conferencing', popular: false },
]

const departments = [
  { name: 'Sales', processes: 23, icon: '💼', selected: true },
  { name: 'Marketing', processes: 19, icon: '📈', selected: true },
  { name: 'Finance', processes: 18, icon: '💰', selected: true },
  { name: 'HR', processes: 15, icon: '👥', selected: false },
  { name: 'Engineering', processes: 31, icon: '⚙️', selected: false },
  { name: 'Support', processes: 12, icon: '🎧', selected: false },
  { name: 'Operations', processes: 14, icon: '🔧', selected: false },
  { name: 'Legal', processes: 8, icon: '⚖️', selected: false },
]

const metrics = [
  { name: 'Process Efficiency', description: 'Completion time vs target', selected: true },
  { name: 'Automation Rate', description: 'Percentage of automated steps', selected: true },
  { name: 'Compliance Score', description: 'Adherence to regulations', selected: true },
  { name: 'Cost per Process', description: 'Financial cost analysis', selected: false },
  { name: 'Error Rate', description: 'Process failure frequency', selected: false },
  { name: 'User Satisfaction', description: 'Employee experience rating', selected: false },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    company: '',
    industry: '',
    size: '',
    email: '',
    name: '',
    selectedIntegrations: [] as string[],
    selectedDepartments: departments.filter(d => d.selected).map(d => d.name),
    selectedMetrics: metrics.filter(m => m.selected).map(m => m.name),
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      router.push('/dashboard?onboarding=complete')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleIntegration = (name: string) => {
    setFormData(prev => ({
      ...prev,
      selectedIntegrations: prev.selectedIntegrations.includes(name)
        ? prev.selectedIntegrations.filter(i => i !== name)
        : [...prev.selectedIntegrations, name]
    }))
  }

  const toggleDepartment = (name: string) => {
    setFormData(prev => ({
      ...prev,
      selectedDepartments: prev.selectedDepartments.includes(name)
        ? prev.selectedDepartments.filter(d => d !== name)
        : [...prev.selectedDepartments, name]
    }))
  }

  const toggleMetric = (name: string) => {
    setFormData(prev => ({
      ...prev,
      selectedMetrics: prev.selectedMetrics.includes(name)
        ? prev.selectedMetrics.filter(m => m !== name)
        : [...prev.selectedMetrics, name]
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to ProcessPilot</h1>
          <p className="text-muted-foreground">
            Let&apos;s set up your AI-powered process management platform
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const Icon = step.icon
              const isCompleted = step.id < currentStep
              const isCurrent = step.id === currentStep
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted ? 'bg-primary border-primary text-primary-foreground' :
                    isCurrent ? 'border-primary text-primary' :
                    'border-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  <span className={`ml-2 text-sm hidden md:block ${
                    isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                  {step.id < steps.length && (
                    <div className={`w-8 h-0.5 ml-4 ${
                      isCompleted ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card p-8 rounded-lg border border-border">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Tell us about your company</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company Size</label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Connect your tools</h2>
              <p className="text-muted-foreground mb-6">
                Select the tools your team uses daily. We&apos;ll analyze processes across these platforms.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.map((integration) => (
                  <div
                    key={integration.name}
                    onClick={() => toggleIntegration(integration.name)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.selectedIntegrations.includes(integration.name)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        {integration.popular && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Selected: {formData.selectedIntegrations.length} integrations
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose your departments</h2>
              <p className="text-muted-foreground mb-6">
                Select the departments you want to monitor. We&apos;ll focus process discovery on these areas.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {departments.map((dept) => (
                  <div
                    key={dept.name}
                    onClick={() => toggleDepartment(dept.name)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.selectedDepartments.includes(dept.name)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-3xl mb-2 block">{dept.icon}</span>
                      <h3 className="font-medium mb-1">{dept.name}</h3>
                      <p className="text-sm text-muted-foreground">~{dept.processes} processes</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Selected: {formData.selectedDepartments.length} departments
              </p>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Configure your metrics</h2>
              <p className="text-muted-foreground mb-6">
                Choose the key performance indicators you want to track for your processes.
              </p>
              <div className="space-y-4">
                {metrics.map((metric) => (
                  <div
                    key={metric.name}
                    onClick={() => toggleMetric(metric.name)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.selectedMetrics.includes(metric.name)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{metric.name}</h3>
                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                      </div>
                      {formData.selectedMetrics.includes(metric.name) && (
                        <CheckCircle className="text-primary" size={20} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Selected: {formData.selectedMetrics.length} metrics
              </p>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center">
              <Sparkles className="mx-auto text-primary mb-4" size={64} />
              <h2 className="text-2xl font-bold mb-4">Ready to discover your processes!</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                ProcessPilot will now begin analyzing your connected tools and mapping your business processes. 
                You&apos;ll see your first insights within 24 hours, with continuous discovery running in the background.
              </p>
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">What happens next:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2">
                      1
                    </div>
                    <p className="font-medium">AI Scanning</p>
                    <p className="text-muted-foreground">Analyzing {formData.selectedIntegrations.length} connected tools</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2">
                      2
                    </div>
                    <p className="font-medium">Process Mapping</p>
                    <p className="text-muted-foreground">Discovering processes in {formData.selectedDepartments.length} departments</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2">
                      3
                    </div>
                    <p className="font-medium">First Insights</p>
                    <p className="text-muted-foreground">Initial documentation within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-2 border border-input rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            {currentStep === steps.length ? 'Start Discovery' : 'Continue'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}