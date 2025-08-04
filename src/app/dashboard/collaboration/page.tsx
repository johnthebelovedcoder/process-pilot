'use client'

import { useState } from 'react'
import { 
  MessageSquare, 
  Users, 
  Clock, 
  Eye,
  Edit,
  Share,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Tag,
  Send,
  Reply,
  Heart,
  Flag,
  Bell,
  Settings,
  FileText,
  Link2,
  Download,
  Paperclip,
  Image,
  Video,
  Mic,
  AtSign,
  Hash
} from 'lucide-react'

const collaborationActivities = [
  {
    id: '1',
    type: 'comment',
    user: { name: 'Sarah Wilson', avatar: '👩‍💼', role: 'Process Manager' },
    process: 'Customer Onboarding',
    action: 'commented on',
    content: 'I think we should add a verification step after document upload to ensure completeness.',
    timestamp: '2 hours ago',
    replies: 3,
    likes: 5,
    priority: 'medium'
  },
  {
    id: '2',
    type: 'revision',
    user: { name: 'Mike Chen', avatar: '👨‍💻', role: 'Business Analyst' },
    process: 'Invoice Processing',
    action: 'updated the process flow',
    content: 'Added automated approval routing for invoices under $1000',
    timestamp: '4 hours ago',
    replies: 1,
    likes: 8,
    priority: 'high'
  },
  {
    id: '3',
    type: 'suggestion',
    user: { name: 'Lisa Rodriguez', avatar: '👩‍🔬', role: 'Quality Assurance' },
    process: 'Product Testing',
    action: 'suggested improvements',
    content: 'We could reduce testing time by 30% by implementing parallel testing phases.',
    timestamp: '6 hours ago',
    replies: 7,
    likes: 12,
    priority: 'high'
  },
  {
    id: '4',
    type: 'approval',
    user: { name: 'David Park', avatar: '👨‍💼', role: 'Department Head' },
    process: 'Budget Approval',
    action: 'approved changes',
    content: 'Process documentation updated and approved for implementation.',
    timestamp: '1 day ago',
    replies: 0,
    likes: 6,
    priority: 'low'
  }
]

const activeDiscussions = [
  {
    id: '1',
    title: 'Streamlining Customer Support Workflow',
    process: 'Customer Support',
    participants: 5,
    messages: 23,
    lastActivity: '30 min ago',
    status: 'active',
    priority: 'high',
    tags: ['efficiency', 'customer-service']
  },
  {
    id: '2',
    title: 'Compliance Review for Financial Processes',
    process: 'Financial Reporting',
    participants: 8,
    messages: 41,
    lastActivity: '2 hours ago',
    status: 'review',
    priority: 'critical',
    tags: ['compliance', 'finance', 'audit']
  },
  {
    id: '3',
    title: 'Automation Opportunities in HR',
    process: 'Employee Onboarding',
    participants: 3,
    messages: 15,
    lastActivity: '4 hours ago',
    status: 'planning',
    priority: 'medium',
    tags: ['automation', 'hr']
  }
]

const teamMembers = [
  { name: 'Sarah Wilson', role: 'Process Manager', avatar: '👩‍💼', status: 'online', expertise: ['Process Design', 'Optimization'] },
  { name: 'Mike Chen', role: 'Business Analyst', avatar: '👨‍💻', status: 'online', expertise: ['Data Analysis', 'Requirements'] },
  { name: 'Lisa Rodriguez', role: 'Quality Assurance', avatar: '👩‍🔬', status: 'away', expertise: ['Testing', 'Compliance'] },
  { name: 'David Park', role: 'Department Head', avatar: '👨‍💼', status: 'offline', expertise: ['Strategy', 'Leadership'] },
  { name: 'Emma Thompson', role: 'UX Designer', avatar: '👩‍🎨', status: 'online', expertise: ['User Experience', 'Design'] }
]

export default function CollaborationPage() {
  const [activeTab, setActiveTab] = useState('activity')
  const [selectedDiscussion, setSelectedDiscussion] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [showNewDiscussion, setShowNewDiscussion] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredActivities = collaborationActivities.filter(activity => {
    const matchesSearch = activity.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.process.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || activity.priority === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Process Collaboration</h1>
            <p className="text-muted-foreground">
              Collaborate with your team to improve and optimize business processes
            </p>
          </div>
          <button 
            onClick={() => setShowNewDiscussion(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Plus size={16} />
            Start Discussion
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-6 border-b border-border">
          {['activity', 'discussions', 'team', 'notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
              {tab === 'activity' && ` (${collaborationActivities.length})`}
              {tab === 'discussions' && ` (${activeDiscussions.length})`}
              {tab === 'team' && ` (${teamMembers.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      {activeTab === 'activity' && (
        <div>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6 bg-card p-4 rounded-lg border border-border">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{activity.user.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{activity.user.name}</span>
                      <span className="text-muted-foreground">{activity.action}</span>
                      <span className="font-medium text-primary">{activity.process}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activity.priority === 'high' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : activity.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {activity.priority}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{activity.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {activity.timestamp}
                        </span>
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <Heart size={14} />
                          {activity.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <MessageSquare size={14} />
                          {activity.replies} replies
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-accent rounded-md">
                          <Reply size={16} />
                        </button>
                        <button className="p-2 hover:bg-accent rounded-md">
                          <Share size={16} />
                        </button>
                        <button className="p-2 hover:bg-accent rounded-md">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discussions */}
      {activeTab === 'discussions' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {activeDiscussions.map((discussion) => (
                  <div 
                    key={discussion.id} 
                    className={`bg-card p-6 rounded-lg border cursor-pointer transition-colors ${
                      selectedDiscussion?.id === discussion.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedDiscussion(discussion)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{discussion.title}</h3>
                        <p className="text-muted-foreground">Process: {discussion.process}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        discussion.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : discussion.status === 'review'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {discussion.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {discussion.participants} participants
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={14} />
                        {discussion.messages} messages
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {discussion.lastActivity}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {discussion.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs bg-secondary rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discussion Detail */}
            <div className="bg-card rounded-lg border border-border">
              {selectedDiscussion ? (
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold">{selectedDiscussion.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedDiscussion.process}</p>
                  </div>
                  
                  <div className="flex-1 p-4 space-y-4 max-h-96 overflow-y-auto">
                    {/* Sample messages */}
                    <div className="flex gap-3">
                      <div className="text-lg">👩‍💼</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">Sarah Wilson</span>
                          <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="text-sm">We should consider implementing a priority queue for urgent support tickets.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="text-lg">👨‍💻</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">Mike Chen</span>
                          <span className="text-xs text-muted-foreground">1 hour ago</span>
                        </div>
                        <p className="text-sm">Good point! I can help set up the automated routing logic.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MessageSquare size={48} className="mx-auto mb-4" />
                    <p>Select a discussion to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Team */}
      {activeTab === 'team' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="text-3xl">{member.avatar}</div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                      member.status === 'online' ? 'bg-green-500' :
                      member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 border border-input rounded-md hover:bg-accent text-sm">
                    <MessageSquare size={14} className="inline mr-1" />
                    Message
                  </button>
                  <button className="px-3 py-2 border border-input rounded-md hover:bg-accent">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="max-w-2xl">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Collaboration Notifications</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Email Notifications</h3>
                <div className="space-y-3">
                  {[
                    { name: 'New comments on processes I follow', enabled: true },
                    { name: 'Process approval requests', enabled: true },
                    { name: 'Mentions in discussions', enabled: true },
                    { name: 'Weekly collaboration summary', enabled: false }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{notification.name}</span>
                      <input 
                        type="checkbox" 
                        checked={notification.enabled}
                        className="w-4 h-4"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">In-App Notifications</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Real-time discussion updates', enabled: true },
                    { name: 'Process status changes', enabled: true },
                    { name: 'New team member joins', enabled: false },
                    { name: 'Collaboration insights', enabled: true }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{notification.name}</span>
                      <input 
                        type="checkbox" 
                        checked={notification.enabled}
                        className="w-4 h-4"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Discussion Modal */}
      {showNewDiscussion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-2xl">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Start New Discussion</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Discussion Title</label>
                <input
                  type="text"
                  placeholder="What would you like to discuss?"
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Related Process</label>
                <select className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select a process...</option>
                  <option value="customer-onboarding">Customer Onboarding</option>
                  <option value="invoice-processing">Invoice Processing</option>
                  <option value="product-testing">Product Testing</option>
                  <option value="budget-approval">Budget Approval</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  placeholder="Describe what you'd like to discuss..."
                  rows={4}
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Invite Participants</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {teamMembers.slice(0, 3).map((member, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                      <span className="text-sm">{member.avatar}</span>
                      <span className="text-sm">{member.name}</span>
                      <button className="text-xs hover:text-red-600">×</button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Search team members..."
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button 
                onClick={() => setShowNewDiscussion(false)}
                className="px-6 py-2 border border-input rounded-md hover:bg-accent"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                Start Discussion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}