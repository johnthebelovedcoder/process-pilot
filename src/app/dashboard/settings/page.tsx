'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Save, 
  User, 
  Bell, 
  Settings as SettingsIcon, 
  Shield,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  Palette,
  Building,
  Key,
  Smartphone,
  Eye,
  EyeOff,
  Camera,
  MapPin,
  Clock,
  History,
  AlertTriangle,
  Target,
  TrendingUp,
  Plus,
  Zap,
  Database,
  Workflow,
  CheckCircle2,
  CreditCard,
  Users,
  HelpCircle,
  Download,
  Upload,
  Trash2
} from 'lucide-react'

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('account')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['account', 'profile', 'security', 'notifications', 'billing', 'team', 'integrations', 'advanced'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])
  const [settings, setSettings] = useState({
    siteName: 'ProcessPilot',
    siteDescription: 'AI-powered business process management and optimization platform',
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    theme: 'light',
  })

  // Profile state
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    language: 'English',
    jobTitle: 'Process Manager',
    department: 'Operations',
    location: 'New York, NY'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Alert preferences state
  const [alertPreferences, setAlertPreferences] = useState({
    emailAlerts: true,
    smsAlerts: false,
    slackAlerts: true,
    pushAlerts: true,
    maxAlertsPerHour: 10,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    severityFilters: {
      low: true,
      medium: true,
      high: true,
      critical: true
    }
  })

  const notificationChannels = [
    { id: 'email', name: 'Email', icon: Mail, description: 'Send email notifications' },
    { id: 'sms', name: 'SMS', icon: Phone, description: 'Send text messages' },
    { id: 'slack', name: 'Slack', icon: MessageSquare, description: 'Post to Slack channels' },
    { id: 'webhook', name: 'Webhook', icon: Zap, description: 'HTTP webhook integration' },
    { id: 'push', name: 'Push Notification', icon: Bell, description: 'Browser push notifications' }
  ]

  const activityHistory = [
    { action: 'Login', details: 'Web browser', time: '2 hours ago', ip: '192.168.1.100' },
    { action: 'Process viewed', details: 'Customer Onboarding', time: '4 hours ago', ip: '192.168.1.100' },
    { action: 'Settings updated', details: 'Notification preferences', time: '1 day ago', ip: '192.168.1.100' },
    { action: 'Login', details: 'Mobile app', time: '2 days ago', ip: '10.0.0.150' },
    { action: 'Password changed', details: 'Security update', time: '1 week ago', ip: '192.168.1.100' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Settings saved:', settings)
  }

  const handleProfileUpdate = () => {
    console.log('Profile updated:', profileData)
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match')
      return
    }
    console.log('Password change requested')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-border">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'account', label: 'Account', icon: User },
              { id: 'profile', label: 'Profile', icon: Building },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'billing', label: 'Billing', icon: CreditCard },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'integrations', label: 'Integrations', icon: Zap },
              { id: 'advanced', label: 'Advanced', icon: SettingsIcon }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Account Tab */}
      {activeTab === 'account' && (
        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="bg-card p-6 rounded-lg border border-border mb-6">
            <h2 className="text-xl font-semibold mb-4">Site Configuration</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium mb-2">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium mb-2">
                Site Description
              </label>
              <textarea
                id="siteDescription"
                rows={3}
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border mb-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className="w-5 h-5"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
              </div>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                className="w-5 h-5"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">Receive weekly summary reports via email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.weeklyReports}
                onChange={(e) => setSettings({ ...settings, weeklyReports: e.target.checked })}
                className="w-5 h-5"
              />
            </label>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border mb-6">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          
          <div>
            <label htmlFor="theme" className="block text-sm font-medium mb-2">
              Theme
            </label>
            <select
              id="theme"
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Save size={20} />
            Save Settings
          </button>
        </form>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <input
                    type="text"
                    value={profileData.jobTitle}
                    onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select
                    value={profileData.department}
                    onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="City, State/Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Timezone</label>
                  <select
                    value={profileData.timezone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="America/New_York">Eastern Time (UTC-5)</option>
                    <option value="America/Chicago">Central Time (UTC-6)</option>
                    <option value="America/Denver">Mountain Time (UTC-7)</option>
                    <option value="America/Los_Angeles">Pacific Time (UTC-8)</option>
                    <option value="Europe/London">GMT (UTC+0)</option>
                    <option value="Europe/Paris">CET (UTC+1)</option>
                    <option value="Asia/Tokyo">JST (UTC+9)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <button
                  onClick={handleProfileUpdate}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">Profile Photo</h3>
              <div className="text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-primary" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent mx-auto">
                  <Camera size={16} />
                  Upload Photo
                </button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG up to 5MB
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border mt-6">
              <h3 className="text-lg font-semibold mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Verified</span>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle2 size={16} />
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Two-Factor Auth</span>
                  <span className="text-yellow-600 font-medium">Setup Required</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Account Type</span>
                  <span className="font-medium">Professional</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Member Since</span>
                  <span className="text-muted-foreground">January 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="max-w-2xl">
          <div className="bg-card p-6 rounded-lg border border-border mb-6">
            <h2 className="text-xl font-semibold mb-6">Change Password</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  8+ characters with mixed case, numbers, and symbols
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                <Key size={16} />
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Two-Factor Authentication</h2>
            
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800">
              <div className="flex items-center gap-3">
                <Shield className="text-yellow-600" size={24} />
                <div>
                  <p className="font-medium">Two-Factor Authentication is not enabled</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                <Smartphone size={16} />
                Setup MFA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="max-w-4xl">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Email Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Process Discovery Updates</p>
                      <p className="text-sm text-muted-foreground">New processes discovered in your organization</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Process Optimization Suggestions</p>
                      <p className="text-sm text-muted-foreground">AI-powered improvement recommendations</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Smart Coaching Alerts</p>
                      <p className="text-sm text-muted-foreground">Notifications when coaching prevents errors</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Audio Recording Completed</p>
                      <p className="text-sm text-muted-foreground">When audio process recordings are processed</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Duplicate Process Detection</p>
                      <p className="text-sm text-muted-foreground">When similar processes are found and merged</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Reports</p>
                      <p className="text-sm text-muted-foreground">Weekly process performance summaries</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Push Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Smart Coaching Alerts</p>
                      <p className="text-sm text-muted-foreground">Real-time process guidance and error prevention</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Process Completion</p>
                      <p className="text-sm text-muted-foreground">When you complete a tracked process</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Recording Reminders</p>
                      <p className="text-sm text-muted-foreground">Reminders to record new or updated processes</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mentions</p>
                      <p className="text-sm text-muted-foreground">When someone mentions you in process comments</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                <Save size={16} />
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Preferences Tab */}
      {activeTab === 'alerts' && (
        <div className="max-w-2xl">
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-6">Alert Configuration</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Default Alert Channels</h3>
                  <div className="space-y-3">
                    {notificationChannels.map((channel) => {
                      const Icon = channel.icon
                      return (
                        <div key={channel.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon size={20} />
                            <div>
                              <p className="font-medium">{channel.name}</p>
                              <p className="text-sm text-muted-foreground">{channel.description}</p>
                            </div>
                          </div>
                          <input 
                            type="checkbox" 
                            defaultChecked={alertPreferences[`${channel.id}Alerts` as keyof typeof alertPreferences] as boolean}
                            className="w-4 h-4" 
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Alert Frequency</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Maximum alerts per hour</span>
                      <input 
                        type="number" 
                        value={alertPreferences.maxAlertsPerHour} 
                        onChange={(e) => setAlertPreferences(prev => ({ ...prev, maxAlertsPerHour: parseInt(e.target.value) }))}
                        className="w-20 px-3 py-1 bg-background border border-input rounded-md text-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Quiet hours (no notifications)</span>
                      <div className="flex items-center gap-2">
                        <input 
                          type="time" 
                          value={alertPreferences.quietHoursStart} 
                          onChange={(e) => setAlertPreferences(prev => ({ ...prev, quietHoursStart: e.target.value }))}
                          className="px-3 py-1 bg-background border border-input rounded-md text-sm"
                        />
                        <span className="text-sm">to</span>
                        <input 
                          type="time" 
                          value={alertPreferences.quietHoursEnd} 
                          onChange={(e) => setAlertPreferences(prev => ({ ...prev, quietHoursEnd: e.target.value }))}
                          className="px-3 py-1 bg-background border border-input rounded-md text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Severity Filters</h3>
                  <div className="space-y-2">
                    {Object.entries(alertPreferences.severityFilters).map(([level, enabled]) => (
                      <div key={level} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{level} alerts</span>
                        <input 
                          type="checkbox" 
                          checked={enabled}
                          onChange={(e) => setAlertPreferences(prev => ({
                            ...prev,
                            severityFilters: {
                              ...prev.severityFilters,
                              [level]: e.target.checked
                            }
                          }))}
                          className="w-4 h-4" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Save Alert Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-6">Current Plan</h2>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Professional Plan</h3>
                  <p className="text-muted-foreground">Advanced process management with AI features</p>
                  <p className="text-2xl font-bold mt-2">$49<span className="text-sm font-normal">/month</span></p>
                </div>
                <div className="text-right">
                  <button className="px-4 py-2 border border-input rounded-md hover:bg-accent">
                    Change Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard size={20} />
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/26</p>
                  </div>
                </div>
                <button className="text-sm text-primary hover:underline">
                  Update
                </button>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-6">Billing History</h2>
              <div className="space-y-3">
                {[
                  { date: 'Dec 1, 2024', amount: '$49.00', status: 'Paid' },
                  { date: 'Nov 1, 2024', amount: '$49.00', status: 'Paid' },
                  { date: 'Oct 1, 2024', amount: '$49.00', status: 'Paid' }
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div>
                      <p className="font-medium">{invoice.date}</p>
                      <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-green-600">{invoice.status}</span>
                      <button className="text-sm text-primary hover:underline">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Team Members</h2>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Invite Member
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'John Doe', email: 'john.doe@company.com', role: 'Admin', status: 'Active' },
                  { name: 'Sarah Wilson', email: 'sarah.wilson@company.com', role: 'Editor', status: 'Active' },
                  { name: 'Mike Chen', email: 'mike.chen@company.com', role: 'Viewer', status: 'Pending' }
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">{member.role}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {member.status}
                      </span>
                      <button className="text-sm text-muted-foreground hover:text-foreground">
                        ⋯
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Settings */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-6">Team Settings</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow team members to invite others</p>
                    <p className="text-sm text-muted-foreground">Team members can send invitations to new users</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Require admin approval for new processes</p>
                    <p className="text-sm text-muted-foreground">New processes must be approved before becoming active</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Connected Integrations */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-6">Connected Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Slack', description: 'Team communication', connected: true, icon: MessageSquare },
                  { name: 'Microsoft Teams', description: 'Video conferencing', connected: false, icon: Users },
                  { name: 'Zapier', description: 'Workflow automation', connected: true, icon: Zap },
                  { name: 'Google Drive', description: 'File storage', connected: false, icon: Database }
                ].map((integration, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <integration.icon size={20} />
                        <div>
                          <p className="font-medium">{integration.name}</p>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <button className={`px-3 py-1 text-sm rounded-md ${
                        integration.connected 
                          ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}>
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* API Keys */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-6">API Keys</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div>
                    <p className="font-medium">Production API Key</p>
                    <p className="text-sm text-muted-foreground font-mono">pk_live_••••••••••••••••••••••••4242</p>
                  </div>
                  <button className="text-sm text-primary hover:underline">
                    Regenerate
                  </button>
                </div>
                <button className="w-full p-3 border-2 border-dashed border-border rounded-lg text-center text-muted-foreground hover:border-primary hover:text-primary">
                  + Create New API Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Tab */}
      {activeTab === 'advanced' && (
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Data Export */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-6">Data Export</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Export All Data</p>
                    <p className="text-sm text-muted-foreground">Download all your processes, recordings, and settings</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-6">Account Activity</h2>
              <div className="space-y-4">
                {activityHistory.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <History size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{activity.time}</p>
                      <p className="text-xs text-muted-foreground">IP: {activity.ip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-card p-6 rounded-lg border border-red-200">
              <h2 className="text-xl font-semibold mb-6 text-red-600">Danger Zone</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-600">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    <Trash2 size={16} />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}