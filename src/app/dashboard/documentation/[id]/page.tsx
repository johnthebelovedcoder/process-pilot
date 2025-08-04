'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft,
  Star,
  StarOff,
  Share2,
  Download,
  Edit3,
  History,
  MessageSquare,
  Eye,
  Users,
  Building2,
  Tag,
  Clock,
  User,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Send,
  Bookmark,
  BookmarkCheck,
  Printer,
  Copy,
  ExternalLink,
  GitBranch,
  AlertCircle,
  CheckCircle,
  Calendar,
  FileText,
  Shield,
  BookOpen,
  List,
  File
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
  bookmarked?: boolean
}

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  replies?: Comment[]
  likes: number
  dislikes: number
}

interface Version {
  id: string
  version: string
  author: string
  timestamp: string
  changes: string
  size: string
}

export default function DocumentViewPage() {
  const params = useParams()
  const documentId = params.id as string

  // Mock document data - in real app, this would come from API
  const [document, setDocument] = useState<Document>({
    id: documentId,
    title: 'Employee Onboarding Process',
    content: `# Employee Onboarding Process

## Overview
This comprehensive guide outlines the complete employee onboarding process for new hires across all departments. The process ensures consistent, thorough integration of new team members while maintaining compliance with company policies and procedures.

## Pre-boarding (1-2 weeks before start date)

### HR Responsibilities
1. **Document Preparation**
   - Prepare employment contract and offer letter
   - Create employee ID and email account
   - Order necessary equipment (laptop, phone, access cards)
   - Schedule first-day activities and meetings

2. **Communication**
   - Send welcome email with first-day details
   - Provide parking information and building access
   - Share dress code and company culture guide
   - Coordinate with hiring manager for workspace setup

### Manager Responsibilities
1. **Team Preparation**
   - Announce new hire to existing team members
   - Prepare workspace and necessary supplies
   - Plan first-week schedule and training agenda
   - Assign onboarding buddy/mentor

## First Day

### Morning (9:00 AM - 12:00 PM)
1. **Welcome and Check-in** (30 minutes)
   - Meet with HR representative
   - Complete I-9 verification
   - Receive employee handbook and policies
   - Photo for employee ID card

2. **IT Setup** (45 minutes)
   - Laptop configuration and software installation
   - Email account setup and password creation
   - VPN and security software installation
   - Access to company systems and platforms

3. **Facility Tour** (30 minutes)
   - Building layout and emergency procedures
   - Introduction to key locations (cafeteria, restrooms, meeting rooms)
   - Security procedures and badge access areas
   - Parking and transportation information

4. **Meet the Team** (45 minutes)
   - Introduction to immediate team members
   - Overview of team structure and roles
   - Initial meeting with direct supervisor
   - Assignment of onboarding buddy

### Afternoon (1:00 PM - 5:00 PM)
1. **Company Overview** (60 minutes)
   - Mission, vision, and values presentation
   - Organizational structure and departments
   - Company history and culture
   - Key products and services overview

2. **Department Orientation** (90 minutes)
   - Department-specific goals and objectives
   - Key processes and procedures
   - Performance expectations and metrics
   - Relevant tools and systems training

3. **Initial Training** (90 minutes)
   - Job-specific training modules
   - Safety and compliance requirements
   - Customer service standards
   - Quality assurance procedures

## First Week

### Days 2-3: Core Training
- Complete mandatory training modules
- Shadow experienced team members
- Begin hands-on work with supervision
- Regular check-ins with manager and HR

### Days 4-5: Integration
- Take on initial responsibilities
- Participate in team meetings and projects
- Complete additional system training
- Provide feedback on onboarding experience

## First Month

### Week 2-3: Skill Development
- Advanced job-specific training
- Professional development planning
- Goal setting for first 90 days
- Performance review preparation

### Week 4: First Month Review
- Formal performance review meeting
- Feedback collection and discussion
- Adjustment of goals and expectations
- Planning for continued development

## 90-Day Milestone

### Performance Evaluation
- Comprehensive performance review
- Assessment of integration success
- Career development discussion
- Long-term goal setting

### Documentation
- Complete employee file review
- Update training records
- Document any accommodation needs
- Finalize probationary period status

## Key Contacts

### Human Resources
- **Sarah Wilson** - HR Manager
- **Email:** sarah.wilson@company.com
- **Phone:** (555) 123-4567
- **Office:** Building A, Suite 250

### IT Support
- **Help Desk:** helpdesk@company.com
- **Phone:** (555) 123-HELP (4357)
- **Hours:** Monday-Friday, 8:00 AM - 6:00 PM

### Facilities
- **Mike Chen** - Facilities Manager
- **Email:** facilities@company.com
- **Emergency:** (555) 123-9999

## Required Documents
- [ ] Employment eligibility verification (I-9)
- [ ] Tax withholding forms (W-4)
- [ ] Emergency contact information
- [ ] Direct deposit authorization
- [ ] Benefits enrollment forms
- [ ] Confidentiality agreement
- [ ] Employee handbook acknowledgment

## Training Checklist
- [ ] Company orientation completed
- [ ] Department-specific training
- [ ] Safety training and certification
- [ ] Systems access and training
- [ ] Customer service standards
- [ ] Quality procedures training
- [ ] Performance expectations review

## Success Metrics
- Employee satisfaction score: ≥ 4.5/5.0
- Time to productivity: ≤ 30 days
- First-year retention rate: ≥ 95%
- Training completion rate: 100%
- Manager satisfaction score: ≥ 4.0/5.0

This process ensures new employees feel welcomed, prepared, and integrated into our company culture while meeting all legal and operational requirements.`,
    department: 'Human Resources',
    author: 'Sarah Wilson',
    status: 'approved',
    version: '2.1',
    created: '2024-01-15',
    updated: '2024-07-20',
    tags: ['onboarding', 'hr', 'process', 'training', 'new-hire'],
    starred: true,
    type: 'procedure',
    permissions: 'department',
    comments: 8,
    views: 245,
    collaborators: ['Sarah Wilson', 'Mike Chen', 'Emma Davis'],
    bookmarked: false
  })

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Mike Chen',
      content: 'Great comprehensive guide! I think we should add a section about remote worker onboarding as well.',
      timestamp: '2024-07-19 10:30 AM',
      likes: 5,
      dislikes: 0,
      replies: [
        {
          id: '1-1',
          author: 'Sarah Wilson',
          content: 'That\'s an excellent suggestion, Mike. I\'ll work on adding a remote onboarding section in the next version.',
          timestamp: '2024-07-19 11:15 AM',
          likes: 3,
          dislikes: 0
        }
      ]
    },
    {
      id: '2',
      author: 'Emma Davis',
      content: 'The IT setup section is very thorough. This will definitely help new hires feel more prepared.',
      timestamp: '2024-07-18 2:45 PM',
      likes: 4,
      dislikes: 0
    },
    {
      id: '3',
      author: 'John Smith',
      content: 'Could we include information about the company org chart? It would help new employees understand the structure better.',
      timestamp: '2024-07-17 9:20 AM',
      likes: 2,
      dislikes: 0
    }
  ])

  const [versions, setVersions] = useState<Version[]>([
    {
      id: 'v2.1',
      version: '2.1',
      author: 'Sarah Wilson',
      timestamp: '2024-07-20 3:30 PM',
      changes: 'Added success metrics section and updated contact information',
      size: '15.2 KB'
    },
    {
      id: 'v2.0',
      version: '2.0',
      author: 'Sarah Wilson',
      timestamp: '2024-06-15 1:20 PM',
      changes: 'Major restructure: added 90-day milestone section, expanded training checklist',
      size: '14.8 KB'
    },
    {
      id: 'v1.3',
      version: '1.3',
      author: 'Mike Chen',
      timestamp: '2024-05-10 11:45 AM',
      changes: 'Updated IT setup procedures and facility tour information',
      size: '13.5 KB'
    },
    {
      id: 'v1.2',
      version: '1.2',
      author: 'Sarah Wilson',
      timestamp: '2024-04-02 9:15 AM',
      changes: 'Added key contacts section and emergency procedures',
      size: '12.9 KB'
    },
    {
      id: 'v1.1',
      version: '1.1',
      author: 'Sarah Wilson',
      timestamp: '2024-02-28 4:00 PM',
      changes: 'Initial comprehensive version with full process details',
      size: '11.2 KB'
    }
  ])

  const [activeTab, setActiveTab] = useState<'content' | 'comments' | 'history' | 'info'>('content')
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')

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
      case 'policy': return <Shield size={20} />
      case 'procedure': return <List size={20} />
      case 'manual': return <BookOpen size={20} />
      case 'guide': return <FileText size={20} />
      case 'template': return <Copy size={20} />
      default: return <File size={20} />
    }
  }

  const toggleStar = () => {
    setDocument(prev => ({ ...prev, starred: !prev.starred }))
  }

  const toggleBookmark = () => {
    setDocument(prev => ({ ...prev, bookmarked: !prev.bookmarked }))
  }

  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Current User',
        content: newComment,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        dislikes: 0
      }
      setComments(prev => [comment, ...prev])
      setNewComment('')
      setDocument(prev => ({ ...prev, comments: prev.comments + 1 }))
    }
  }

  const addReply = (commentId: string) => {
    if (replyContent.trim()) {
      const reply: Comment = {
        id: `${commentId}-${Date.now()}`,
        author: 'Current User',
        content: replyContent,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        dislikes: 0
      }
      
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies ? [...comment.replies, reply] : [reply]
          }
        }
        return comment
      }))
      
      setReplyContent('')
      setReplyTo(null)
    }
  }

  // Increment view count on mount
  useEffect(() => {
    setDocument(prev => ({ ...prev, views: prev.views + 1 }))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard/documentation"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Documents</span>
              </Link>
              
              <div className="h-6 w-px bg-border" />
              
              <div className="flex items-center gap-3">
                {getTypeIcon(document.type)}
                <h1 className="text-xl font-semibold">{document.title}</h1>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(document.status)}`}>
                  {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={toggleStar}
                className="p-2 hover:bg-accent rounded-md transition-colors"
                title={document.starred ? 'Remove from favorites' : 'Add to favorites'}
              >
                {document.starred ? <Star size={18} className="text-yellow-500" /> : <StarOff size={18} />}
              </button>
              
              <button 
                onClick={toggleBookmark}
                className="p-2 hover:bg-accent rounded-md transition-colors"
                title={document.bookmarked ? 'Remove bookmark' : 'Bookmark document'}
              >
                {document.bookmarked ? <BookmarkCheck size={18} className="text-blue-500" /> : <Bookmark size={18} />}
              </button>

              <button 
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-3 py-2 border border-input rounded-md hover:bg-accent transition-colors"
              >
                <Share2 size={16} />
                Share
              </button>

              <button className="flex items-center gap-2 px-3 py-2 border border-input rounded-md hover:bg-accent transition-colors">
                <Download size={16} />
                Export
              </button>

              <button className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                <Edit3 size={16} />
                Edit
              </button>

              <button className="p-2 hover:bg-accent rounded-md transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Document Meta Info */}
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>By {document.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={16} />
                      <span>{document.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Updated {document.updated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitBranch size={16} />
                      <span>Version {document.version}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      <span>{document.views} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} />
                      <span>{document.comments} comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{document.collaborators.length} collaborators</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mb-4">
                <Tag size={16} className="text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex gap-6 border-b border-border">
                {[
                  { id: 'content', label: 'Content', icon: FileText },
                  { id: 'comments', label: `Comments (${document.comments})`, icon: MessageSquare },
                  { id: 'history', label: 'Version History', icon: History },
                  { id: 'info', label: 'Document Info', icon: AlertCircle }
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'content' | 'comments' | 'history' | 'info')}
                      className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-card rounded-lg border border-border">
              {activeTab === 'content' && (
                <div className="p-6">
                  <div className="prose max-w-none dark:prose-invert">
                    <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                      {document.content}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div className="p-6">
                  {/* Add Comment */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Add Comment</h3>
                    <div className="space-y-3">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts about this document..."
                        className="w-full p-3 border border-input rounded-md bg-background resize-none"
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <button 
                          onClick={addComment}
                          disabled={!newComment.trim()}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send size={16} />
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                              {comment.author.charAt(0)}
                            </div>
                            <div>
                              <span className="font-medium">{comment.author}</span>
                              <span className="text-sm text-muted-foreground ml-2">{comment.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-3 ml-11">{comment.content}</p>
                        
                        <div className="flex items-center gap-4 ml-11">
                          <div className="flex items-center gap-1">
                            <button className="p-1 hover:bg-accent rounded text-muted-foreground hover:text-foreground">
                              <ThumbsUp size={14} />
                            </button>
                            <span className="text-xs text-muted-foreground">{comment.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button className="p-1 hover:bg-accent rounded text-muted-foreground hover:text-foreground">
                              <ThumbsDown size={14} />
                            </button>
                            <span className="text-xs text-muted-foreground">{comment.dislikes}</span>
                          </div>
                          <button 
                            onClick={() => setReplyTo(comment.id)}
                            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                          >
                            <Reply size={14} />
                            Reply
                          </button>
                        </div>

                        {/* Reply Form */}
                        {replyTo === comment.id && (
                          <div className="mt-3 ml-11 space-y-2">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Write a reply..."
                              className="w-full p-2 border border-input rounded-md bg-background text-sm resize-none"
                              rows={2}
                            />
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => {
                                  setReplyTo(null)
                                  setReplyContent('')
                                }}
                                className="px-3 py-1 text-sm border border-input rounded hover:bg-accent"
                              >
                                Cancel
                              </button>
                              <button 
                                onClick={() => addReply(comment.id)}
                                disabled={!replyContent.trim()}
                                className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 ml-11 space-y-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="border-l-2 border-border pl-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs font-medium">
                                    {reply.author.charAt(0)}
                                  </div>
                                  <span className="font-medium text-sm">{reply.author}</span>
                                  <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                </div>
                                <p className="text-sm ml-9">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Version History</h3>
                  <div className="space-y-4">
                    {versions.map((version, index) => (
                      <div key={version.id} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            index === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                          }`}>
                            {version.version}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">Version {version.version}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{version.size}</span>
                              {index === 0 && (
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Current</span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{version.changes}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>By {version.author}</span>
                            <span>{version.timestamp}</span>
                            {index !== 0 && (
                              <button className="text-primary hover:underline">View Changes</button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'info' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Document Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Document ID</label>
                        <p className="text-sm">{document.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Type</label>
                        <p className="text-sm capitalize">{document.type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Permissions</label>
                        <p className="text-sm capitalize">{document.permissions}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Created</label>
                        <p className="text-sm">{document.created}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                        <p className="text-sm">{document.updated}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Current Version</label>
                        <p className="text-sm">{document.version}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                        <p className="text-sm capitalize">{document.status}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Collaborators</label>
                        <div className="flex flex-wrap gap-1">
                          {document.collaborators.map((collaborator) => (
                            <span key={collaborator} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                              {collaborator}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-background hover:bg-accent rounded-md transition-colors">
                    <Printer size={16} />
                    Print Document
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-background hover:bg-accent rounded-md transition-colors">
                    <Copy size={16} />
                    Copy Link
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-background hover:bg-accent rounded-md transition-colors">
                    <ExternalLink size={16} />
                    Open in New Tab
                  </button>
                </div>
              </div>

              {/* Related Documents */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-semibold mb-3">Related Documents</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-background rounded-md">
                    <h4 className="font-medium text-sm mb-1">Employee Handbook</h4>
                    <p className="text-xs text-muted-foreground">HR policies and procedures</p>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <h4 className="font-medium text-sm mb-1">Training Manual</h4>
                    <p className="text-xs text-muted-foreground">Comprehensive training guide</p>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <h4 className="font-medium text-sm mb-1">Code of Conduct</h4>
                    <p className="text-xs text-muted-foreground">Company ethical guidelines</p>
                  </div>
                </div>
              </div>

              {/* Document Stats */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-semibold mb-3">Document Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Views</span>
                    <span className="text-sm font-medium">{document.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Comments</span>
                    <span className="text-sm font-medium">{document.comments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Versions</span>
                    <span className="text-sm font-medium">{versions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contributors</span>
                    <span className="text-sm font-medium">{document.collaborators.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}