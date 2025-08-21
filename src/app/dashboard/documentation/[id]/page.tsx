'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getDocument, Document as DocumentType } from '@/lib/documentation-data'
import { 
  ArrowLeft,
  Clock,
  Calendar,
  Hash,
  Eye,
  MessageCircle,
  Share2,
  Download,
  Edit,
  Users,
  GitBranch,
  Star,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Info,
  ThumbsUp,
  Send,
  Reply,
  Copy,
  Check,
  ExternalLink,
  Printer,
  Mail,
  Link2,
  Twitter,
  Linkedin,
  FileText,
  BarChart3,
  Activity,
  Workflow,
  Database,
  Settings,
  Target,
  TrendingUp,
  Zap,
  Shield,
  BookOpen,
  List,
  Brain,
  PieChart,
  LineChart,
  DollarSign,
  Building,
  Layers,
  Award,
  Map,
  Globe,
  Video,
  CheckCircle,
  Edit3,
  PlayCircle,
  Timer,
  Plus,
  Upload
} from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  replies: Comment[]
}

export default function ProcessDocumentationViewPage() {
  const params = useParams()
  const router = useRouter()
  const documentId = params.id as string
  
  // Get the document from our data source
  const documentData = getDocument(documentId)
  
  const [document, setDocument] = useState<DocumentType>(documentData || {
    id: documentId,
    title: 'Document Not Found',
    description: 'The requested business process document could not be found.',
    content: '# Document Not Found\\n\\nThe business process document you are looking for does not exist or has been removed.\\n\\nPlease check the URL or return to the process documentation list.',
    category: 'Process Documentation',
    type: 'guide' as const,
    author: {
      name: 'System',
      avatar: '/avatars/system.jpg',
      role: 'Process Administrator'
    },
    status: 'draft' as const,
    version: '1.0.0',
    created: new Date().toISOString().split('T')[0],
    updated: new Date().toISOString().split('T')[0],
    readTime: 1,
    tags: [],
    starred: false,
    bookmarked: false,
    views: 0,
    likes: 0,
    comments: [],
    toc: [],
    contributors: [],
    relatedDocs: []
  })

  const [copied, setCopied] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [commentText, setCommentText] = useState('')
  // Removed activeTab since we only show content now
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState(document.content)
  const [editTitle, setEditTitle] = useState(document.title)
  const [editDescription, setEditDescription] = useState(document.description)
  const [isRichTextMode, setIsRichTextMode] = useState(true)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [currentUser] = useState({ 
    name: 'Current User', 
    isOwner: false,
    email: 'user@example.com' 
  }) // Simulated user state - in real app this would come from auth context
  const [pendingEdits, setPendingEdits] = useState<any[]>([])
  const [showUploadArea, setShowUploadArea] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<'visual' | 'procedures' | 'interactive' | 'video' | 'checklist'>('visual')
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [showQualityDetails, setShowQualityDetails] = useState(false)
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false)
  const [versionToRestore, setVersionToRestore] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null)

  // Update document when route changes
  useEffect(() => {
    const newDocument = getDocument(documentId)
    if (newDocument) {
      setDocument(newDocument)
    }
  }, [documentId])

  // Show loading state if document is not available
  if (!document) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl font-semibold mb-2">Loading Process Documentation...</h1>
          <p className="text-muted-foreground">Please wait while we load the business process details.</p>
        </div>
      </div>
    )
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = document.title
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${title}&body=${url}`
    }
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank')
    }
    setShowShareMenu(false)
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return
    
    const newComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'Current User',
        avatar: '/avatars/user.jpg'
      },
      content: commentText,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    }
    
    setDocument(prev => ({
      ...prev,
      comments: [newComment, ...prev.comments]
    }))
    setCommentText('')
  }

  const handleRestoreVersion = (versionNumber: string) => {
    setVersionToRestore(versionNumber)
    setShowRestoreConfirm(true)
  }

  const confirmRestoreVersion = () => {
    if (versionToRestore) {
      // In a real app, this would make an API call to restore the version
      // For now, we'll simulate updating the document version
      setDocument(prev => ({
        ...prev,
        version: versionToRestore,
        updated: new Date().toISOString().split('T')[0]
      }))
      
      setShowRestoreConfirm(false)
      setVersionToRestore(null)
      
      // Show success message (you could add a toast notification here)
      console.log(`Restored to version ${versionToRestore}`)
    }
  }

  const handleApproveChange = (changeId: string) => {
    console.log(`Approved change request ${changeId}`)
    // In a real app, this would update the change request status via API
  }

  const handleDeclineChange = (changeId: string) => {
    console.log(`Declined change request ${changeId}`)
    // In a real app, this would update the change request status via API
  }

  const handleSuggestChange = () => {
    if (!commentText.trim()) return
    
    const newChangeRequest = {
      id: Date.now().toString(),
      type: 'change_request',
      author: 'Current User',
      avatar: '/avatars/user.jpg',
      content: commentText,
      timestamp: 'Just now',
      status: 'open'
    }
    
    // Add the change request to the comments section
    console.log('New change request:', newChangeRequest)
    setCommentText('')
  }

  const handleSaveChanges = () => {
    if (currentUser.isOwner) {
      // If user is owner, apply changes directly
      setDocument(prev => ({
        ...prev,
        title: editTitle,
        description: editDescription,
        content: editContent,
        updated: new Date().toISOString().split('T')[0],
        version: `${parseInt(prev.version.split('.')[0])}.${parseInt(prev.version.split('.')[1]) + 1}.0`
      }))
      setEditMode(false)
      setAttachedFiles([])
      console.log('Document updated directly by owner')
    } else {
      // If user is not owner, add to pending edits
      const pendingEdit = {
        id: Date.now().toString(),
        type: 'edit_request',
        author: currentUser.name,
        title: editTitle,
        description: editDescription,
        content: editContent,
        attachedFiles: attachedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
        originalTitle: document.title,
        originalDescription: document.description,
        originalContent: document.content,
        timestamp: new Date().toLocaleString(),
        status: 'pending'
      }
      
      // Add to pending edits list
      setPendingEdits(prev => [pendingEdit, ...prev])
      
      setEditMode(false)
      setAttachedFiles([])
      
      // Show success notification
      setNotification({
        message: 'Your changes have been submitted for approval by the process owner.',
        type: 'success'
      })
      setTimeout(() => setNotification(null), 5000)
      console.log('Edit request created:', pendingEdit)
    }
  }

  // Approve/decline pending edits
  const handleApprovePendingEdit = (editId: string) => {
    const edit = pendingEdits.find(e => e.id === editId)
    if (edit) {
      // Apply the changes
      setDocument(prev => ({
        ...prev,
        title: edit.title,
        description: edit.description,
        content: edit.content,
        updated: new Date().toISOString().split('T')[0],
        version: `${parseInt(prev.version.split('.')[0])}.${parseInt(prev.version.split('.')[1]) + 1}.0`
      }))
      
      // Remove from pending edits
      setPendingEdits(prev => prev.filter(e => e.id !== editId))
      
      // Show success notification
      setNotification({
        message: `Changes from ${edit.author} have been approved and applied to the document.`,
        type: 'success'
      })
      setTimeout(() => setNotification(null), 5000)
      console.log('Edit approved and applied:', edit)
    }
  }

  const handleDeclinePendingEdit = (editId: string) => {
    const edit = pendingEdits.find(e => e.id === editId)
    setPendingEdits(prev => prev.filter(e => e.id !== editId))
    
    // Show notification
    setNotification({
      message: `Edit request from ${edit?.author || 'user'} has been declined.`,
      type: 'info'
    })
    setTimeout(() => setNotification(null), 5000)
    console.log('Edit declined and removed:', editId)
  }

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const validTypes = [
        'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain', 'text/markdown', 'image/png', 'image/jpeg', 'image/jpg'
      ]
      const maxSize = 10 * 1024 * 1024 // 10MB
      
      if (!validTypes.includes(file.type)) {
        alert(`File "${file.name}" is not a supported file type.`)
        return false
      }
      
      if (file.size > maxSize) {
        alert(`File "${file.name}" exceeds the maximum size limit of 10MB.`)
        return false
      }
      
      return true
    })
    
    if (validFiles.length > 0) {
      setAttachedFiles(prev => [...prev, ...validFiles])
    }
    
    // Clear the input
    if (event.target) {
      event.target.value = ''
    }
  }

  const removeAttachedFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄'
    if (fileType.includes('word') || fileType.includes('document')) return '📝'
    if (fileType.includes('excel') || fileType.includes('sheet')) return '📊'
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📈'
    if (fileType.includes('text')) return '📄'
    if (fileType.includes('image')) return '🖼️'
    return '📎'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Rich text editor functions
  const richTextRef = useRef<HTMLDivElement>(null)
  
  const applyFormatting = (command: string, value?: string) => {
    if (richTextRef.current) {
      richTextRef.current.focus()
      document.execCommand(command, false, value)
      // Update the state with the new HTML content
      setEditContent(richTextRef.current.innerHTML)
    }
  }

  const insertHeading = (level: number) => {
    if (richTextRef.current) {
      richTextRef.current.focus()
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        
        // If there's selected text, wrap it in the heading
        if (!selection.isCollapsed) {
          document.execCommand('formatBlock', false, `h${level}`)
        } else {
          // If no selection, create a new heading
          const heading = document.createElement(`h${level}`)
          heading.textContent = `Heading ${level}`
          range.insertNode(heading)
          
          // Place cursor at the end of the heading
          const newRange = document.createRange()
          newRange.setStartAfter(heading)
          newRange.collapse(true)
          selection.removeAllRanges()
          selection.addRange(newRange)
        }
        
        setEditContent(richTextRef.current.innerHTML)
      }
    }
  }

  const insertList = (type: 'ul' | 'ol') => {
    if (richTextRef.current) {
      richTextRef.current.focus()
      document.execCommand(type === 'ul' ? 'insertUnorderedList' : 'insertOrderedList', false)
      setEditContent(richTextRef.current.innerHTML)
    }
  }

  const handleRichTextChange = () => {
    if (richTextRef.current) {
      setEditContent(richTextRef.current.innerHTML)
    }
  }

  const insertLink = () => {
    if (richTextRef.current) {
      richTextRef.current.focus()
      const url = prompt('Enter URL:')
      if (url) {
        document.execCommand('createLink', false, url)
        setEditContent(richTextRef.current.innerHTML)
      }
    }
  }

  const formatText = (format: string) => {
    if (richTextRef.current) {
      richTextRef.current.focus()
      document.execCommand(format, false)
      setEditContent(richTextRef.current.innerHTML)
    }
  }

  // Convert markdown to HTML when switching to rich text mode
  const convertMarkdownToHtml = (markdown: string) => {
    // Simple markdown to HTML conversion for basic formatting
    return markdown
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.*)$/gm, '<p>$1</p>')
      .replace(/<p><\/p>/g, '')
      .replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/g, '$1')
  }

  // Convert HTML to markdown when switching to markdown mode
  const convertHtmlToMarkdown = (html: string) => {
    return html
      .replace(/<h1>(.*?)<\/h1>/g, '# $1')
      .replace(/<h2>(.*?)<\/h2>/g, '## $1')
      .replace(/<h3>(.*?)<\/h3>/g, '### $1')
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<em>(.*?)<\/em>/g, '*$1*')
      .replace(/<br>/g, '\n')
      .replace(/<\/p><p>/g, '\n\n')
      .replace(/<p>(.*?)<\/p>/g, '$1')
      .replace(/<[^>]*>/g, '') // Remove remaining HTML tags
  }

  // File drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setShowUploadArea(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setShowUploadArea(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setShowUploadArea(false)
    const files = Array.from(e.dataTransfer.files)
    setAttachedFiles(prev => [...prev, ...files])
  }

  const handleCancelEdit = () => {
    // Reset edit fields to original values
    setEditTitle(document.title)
    setEditDescription(document.description)
    setEditContent(document.content)
    setAttachedFiles([])
    setEditMode(false)
  }

  const getStatusColor = (status: string) => {
    const colors = {
      published: 'text-green-700 bg-green-100',
      draft: 'text-orange-700 bg-orange-100',
      review: 'text-blue-700 bg-blue-100',
      archived: 'text-red-700 bg-red-100'
    }
    return colors[status as keyof typeof colors] || colors.draft
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      published: <CheckCircle2 size={14} />,
      draft: <AlertCircle size={14} />,
      review: <Info size={14} />,
      archived: <XCircle size={14} />
    }
    return icons[status as keyof typeof icons] || icons.draft
  }

  const getDocumentTypeInfo = (docId: string) => {
    const typeInfo = {
      'prd': {
        icon: <Target className="h-5 w-5" />,
        color: 'text-blue-600 bg-blue-100',
        label: 'Product Requirements',
        description: 'Product vision, objectives, and feature specifications'
      },
      'frd': {
        icon: <Settings className="h-5 w-5" />,
        color: 'text-purple-600 bg-purple-100',
        label: 'Functional Requirements',
        description: 'Technical specifications and system requirements'
      },
      'brd': {
        icon: <Building className="h-5 w-5" />,
        color: 'text-green-600 bg-green-100',
        label: 'Business Requirements',
        description: 'Business objectives, ROI, and success metrics'
      }
    }
    return typeInfo[docId as keyof typeof typeInfo] || {
      icon: <FileText className="h-5 w-5" />,
      color: 'text-gray-600 bg-gray-100',
      label: 'Process Document',
      description: 'Business process documentation'
    }
  }

  const documentTypeInfo = getDocumentTypeInfo(document.id)

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border max-w-md ${
          notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          notification.type === 'warning' ? 'bg-orange-50 border-orange-200 text-orange-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : notification.type === 'warning' ? (
                <AlertCircle className="h-5 w-5 text-orange-500" />
              ) : (
                <Info className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="flex-shrink-0 p-1 hover:bg-background/50 rounded transition-colors"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      {/* Compact Document Header */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          {/* Left side - Title and info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 rounded-lg ${documentTypeInfo.color} flex-shrink-0`}>
                {documentTypeInfo.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2 flex-wrap">
                  {editMode ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="text-2xl font-bold bg-transparent border-none outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 flex-1 min-w-0"
                      placeholder="Document title"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold truncate">{document.title}</h1>
                  )}
                  <span className={`inline-flex items-center space-x-1.5 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(document.status)}`}>
                    {getStatusIcon(document.status)}
                    <span>{document.status.charAt(0).toUpperCase() + document.status.slice(1)}</span>
                  </span>
                </div>
                
                {/* Author and metadata in compact rows */}
                <div className="space-y-2">
                  {/* First row - Author and basic metadata */}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground flex-wrap gap-y-1">
                    <div className="flex items-center space-x-2">
                      <img
                        src={document.author.avatar}
                        alt={document.author.name}
                        className="w-4 h-4 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${document.author.name}&background=3b82f6&color=fff`
                        }}
                      />
                      <span className="font-medium">{document.author.name}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{document.updated}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{document.views.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{document.readTime}min</span>
                    </div>
                  </div>
                  
                  {/* Second row - Version history and changes */}
                  <div className="flex items-center space-x-4 text-sm flex-wrap gap-y-1">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <GitBranch className="h-3 w-3" />
                      <span>v{document.version}</span>
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded">15 revisions</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MessageCircle className="h-3 w-3" />
                      <span>Comments</span>
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded">{document.comments?.length || 0}</span>
                    </div>
                    
                    {pendingEdits.length > 0 && (
                      <div className="flex items-center space-x-1 text-orange-600">
                        <AlertCircle className="h-3 w-3" />
                        <span>Pending Changes</span>
                        <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">{pendingEdits.length}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{document.contributors?.length || 0} collaborators</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{document.likes} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description */}
            {editMode ? (
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full text-muted-foreground bg-transparent border border-input rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
                rows={2}
                placeholder="Document description"
              />
            ) : (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {document.description}
              </p>
            )}
          </div>

          {/* Right side - Actions */}
          <div className="flex items-start space-x-2 flex-shrink-0 ml-4">
            {/* Star & Bookmark */}
            <button
              onClick={() => setDocument(prev => ({ ...prev, starred: !prev.starred }))}
              className={`p-2 rounded-md transition-colors ${
                document.starred
                  ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
              title={document.starred ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={`h-4 w-4 ${document.starred ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={() => setDocument(prev => ({ ...prev, bookmarked: !prev.bookmarked }))}
              className={`p-2 rounded-md transition-colors ${
                document.bookmarked
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
              title={document.bookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              <Bookmark className={`h-4 w-4 ${document.bookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share Menu */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors"
                title="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
              
              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-background rounded-lg shadow-lg border border-border py-2 z-10">
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-accent"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy link'}
                  </button>
                  <button
                    onClick={() => handleShare('email')}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-accent"
                  >
                    <Mail className="h-4 w-4" />
                    Share via Email
                  </button>
                </div>
              )}
            </div>

            {/* Export */}
            <button 
              className="p-2 text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors"
              title="Export"
            >
              <Download className="h-4 w-4" />
            </button>

            {/* Edit Actions */}
            {editMode ? (
              <div className="flex items-center space-x-1">
                <button 
                  onClick={handleCancelEdit}
                  className="p-2 text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors"
                  title="Cancel"
                >
                  <XCircle className="h-4 w-4" />
                </button>
                <button 
                  onClick={handleSaveChanges}
                  className="p-2 bg-green-600 text-white hover:bg-green-700 rounded-md transition-colors"
                  title="Save Changes"
                >
                  <CheckCircle className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setEditMode(true)}
                className="p-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tags */}
        {document.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
            {document.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
              >
                <Hash className="h-3 w-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}
      </div>


      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Content */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Main Documentation Content */}
            <div className="bg-card rounded-lg border border-border">
              {editMode ? (
                <div className="p-6 space-y-6">
                    {/* Editor Mode Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <label className="block text-sm font-medium text-foreground">
                          Document Content
                        </label>
                        <div className="flex items-center space-x-2 bg-muted rounded-md p-1">
                          <button
                            onClick={() => {
                              if (!isRichTextMode) {
                                // Converting from markdown to rich text
                                const htmlContent = convertMarkdownToHtml(editContent)
                                setEditContent(htmlContent)
                              }
                              setIsRichTextMode(true)
                            }}
                            className={`px-3 py-1 text-xs rounded transition-colors ${
                              isRichTextMode 
                                ? 'bg-background text-foreground shadow-sm' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            Rich Text
                          </button>
                          <button
                            onClick={() => {
                              if (isRichTextMode) {
                                // Converting from rich text to markdown
                                const markdownContent = convertHtmlToMarkdown(editContent)
                                setEditContent(markdownContent)
                              }
                              setIsRichTextMode(false)
                            }}
                            className={`px-3 py-1 text-xs rounded transition-colors ${
                              !isRichTextMode 
                                ? 'bg-background text-foreground shadow-sm' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            Markdown
                          </button>
                        </div>
                      </div>
                      {!currentUser.isOwner && (
                        <div className="flex items-center space-x-2 text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-md">
                          <AlertCircle className="h-4 w-4" />
                          <span>Changes require owner approval</span>
                        </div>
                      )}
                    </div>

                    {/* Rich Text Editor */}
                    {isRichTextMode ? (
                      <div className="space-y-4">
                        {/* Rich Text Toolbar */}
                        <div className="border border-border rounded-lg">
                          <div className="flex items-center space-x-1 p-3 border-b border-border bg-muted/30 flex-wrap gap-1">
                            {/* Text Formatting */}
                            <button 
                              onClick={() => formatText('bold')}
                              className="p-2 hover:bg-accent rounded text-sm font-bold transition-colors" 
                              title="Bold"
                              type="button"
                            >
                              <strong>B</strong>
                            </button>
                            <button 
                              onClick={() => formatText('italic')}
                              className="p-2 hover:bg-accent rounded text-sm italic transition-colors" 
                              title="Italic"
                              type="button"
                            >
                              <em>I</em>
                            </button>
                            <button 
                              onClick={() => formatText('underline')}
                              className="p-2 hover:bg-accent rounded text-sm underline transition-colors" 
                              title="Underline"
                              type="button"
                            >
                              U
                            </button>
                            <button 
                              onClick={() => formatText('strikeThrough')}
                              className="p-2 hover:bg-accent rounded text-sm line-through transition-colors" 
                              title="Strikethrough"
                              type="button"
                            >
                              S
                            </button>
                            
                            <div className="w-px h-4 bg-border mx-2" />
                            
                            {/* Headings */}
                            <button 
                              onClick={() => insertHeading(1)}
                              className="p-2 hover:bg-accent rounded text-sm font-bold transition-colors" 
                              title="Heading 1"
                              type="button"
                            >
                              H1
                            </button>
                            <button 
                              onClick={() => insertHeading(2)}
                              className="p-2 hover:bg-accent rounded text-sm font-semibold transition-colors" 
                              title="Heading 2"
                              type="button"
                            >
                              H2
                            </button>
                            <button 
                              onClick={() => insertHeading(3)}
                              className="p-2 hover:bg-accent rounded text-sm font-medium transition-colors" 
                              title="Heading 3"
                              type="button"
                            >
                              H3
                            </button>
                            
                            <div className="w-px h-4 bg-border mx-2" />
                            
                            {/* Lists */}
                            <button 
                              onClick={() => insertList('ul')}
                              className="p-2 hover:bg-accent rounded text-sm transition-colors" 
                              title="Bullet List"
                              type="button"
                            >
                              •
                            </button>
                            <button 
                              onClick={() => insertList('ol')}
                              className="p-2 hover:bg-accent rounded text-sm transition-colors" 
                              title="Numbered List"
                              type="button"
                            >
                              1.
                            </button>
                            
                            <div className="w-px h-4 bg-border mx-2" />
                            
                            {/* Text Alignment */}
                            <button 
                              onClick={() => formatText('justifyLeft')}
                              className="p-2 hover:bg-accent rounded text-sm transition-colors" 
                              title="Align Left"
                              type="button"
                            >
                              ⬅
                            </button>
                            <button 
                              onClick={() => formatText('justifyCenter')}
                              className="p-2 hover:bg-accent rounded text-sm transition-colors" 
                              title="Center"
                              type="button"
                            >
                              ⬌
                            </button>
                            <button 
                              onClick={() => formatText('justifyRight')}
                              className="p-2 hover:bg-accent rounded text-sm transition-colors" 
                              title="Align Right"
                              type="button"
                            >
                              ➡
                            </button>
                            
                            <div className="w-px h-4 bg-border mx-2" />
                            
                            {/* Link */}
                            <button 
                              onClick={insertLink}
                              className="p-2 hover:bg-accent rounded text-sm transition-colors" 
                              title="Insert Link"
                              type="button"
                            >
                              🔗
                            </button>
                            
                            {/* Clear Formatting */}
                            <button 
                              onClick={() => formatText('removeFormat')}
                              className="p-2 hover:bg-accent rounded text-sm transition-colors" 
                              title="Clear Formatting"
                              type="button"
                            >
                              🗑
                            </button>
                          </div>
                          
                          {/* Rich Text Content Area - WYSIWYG */}
                          <div
                            ref={richTextRef}
                            contentEditable
                            suppressContentEditableWarning
                            dangerouslySetInnerHTML={{ __html: editContent }}
                            onInput={handleRichTextChange}
                            onBlur={handleRichTextChange}
                            className="w-full min-h-80 p-4 border-none bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 prose prose-sm max-w-none [&_p]:my-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:my-3 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:my-2 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:my-1 [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_a]:text-primary [&_a]:underline"
                            style={{ minHeight: '320px' }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                          💡 Markdown Tips: **Bold**, *Italic*, ## Heading, - List items
                        </div>
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full h-80 p-4 border border-input rounded-lg bg-background text-foreground font-mono text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                          placeholder="Write your documentation content here using Markdown..."
                        />
                      </div>
                    )}

                    {/* File Attachments */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-foreground">Attach Documents</h3>
                        <label className="flex items-center space-x-2 px-3 py-2 border border-input bg-background hover:bg-accent rounded-md cursor-pointer transition-colors">
                          <Plus className="h-4 w-4" />
                          <span className="text-sm">Add Files</span>
                          <input
                            id="file-input"
                            type="file"
                            multiple
                            onChange={handleFileAttachment}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.md,.png,.jpg,.jpeg"
                          />
                        </label>
                      </div>

                      {/* Drag and Drop Area */}
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 cursor-pointer ${
                          showUploadArea
                            ? 'border-primary bg-primary/10 border-solid scale-105'
                            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5'
                        }`}
                        onClick={() => document.getElementById('file-input')?.click()}
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                            showUploadArea ? 'bg-primary/20' : 'bg-muted'
                          }`}>
                            <Upload className={`h-6 w-6 transition-colors ${
                              showUploadArea ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div>
                            <p className={`text-sm font-medium transition-colors ${
                              showUploadArea ? 'text-primary' : 'text-foreground'
                            }`}>
                              {showUploadArea ? 'Drop files here to attach' : 'Drag files here or click to browse'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Supports: PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX, TXT, MD, PNG, JPG
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Maximum file size: 10MB per file
                            </p>
                          </div>
                        </div>
                        {attachedFiles.length > 0 && (
                          <div className="mt-4 text-xs text-primary font-medium">
                            {attachedFiles.length} file{attachedFiles.length !== 1 ? 's' : ''} attached
                          </div>
                        )}
                      </div>
                      
                      {attachedFiles.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-foreground">
                              Attached Files ({attachedFiles.length})
                            </h4>
                            <button
                              onClick={() => setAttachedFiles([])}
                              className="text-xs text-muted-foreground hover:text-red-600 transition-colors"
                            >
                              Clear all
                            </button>
                          </div>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {attachedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background hover:bg-accent/50 transition-colors">
                                <div className="flex items-center space-x-3 min-w-0 flex-1">
                                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">{getFileIcon(file.type)}</span>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium truncate" title={file.name}>
                                      {file.name}
                                    </p>
                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                                      <span className="px-2 py-0.5 bg-muted rounded text-xs">
                                        {file.type.split('/').pop()?.toUpperCase() || 'FILE'}
                                      </span>
                                      <span>•</span>
                                      <span>{formatFileSize(file.size)}</span>
                                      <span>•</span>
                                      <span className="flex items-center space-x-1 text-green-600">
                                        <CheckCircle className="h-3 w-3" />
                                        <span>Ready</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                                  <button
                                    onClick={() => {
                                      // Create a temporary URL for the file preview
                                      const url = URL.createObjectURL(file)
                                      if (file.type.startsWith('image/')) {
                                        // For images, open in new tab
                                        window.open(url, '_blank')
                                      } else {
                                        // For other files, trigger download
                                        const a = document.createElement('a')
                                        a.href = url
                                        a.download = file.name
                                        a.click()
                                      }
                                      setTimeout(() => URL.revokeObjectURL(url), 1000)
                                    }}
                                    className="p-1.5 hover:bg-accent rounded transition-colors text-muted-foreground hover:text-primary"
                                    title={file.type.startsWith('image/') ? 'Preview' : 'Download'}
                                  >
                                    {file.type.startsWith('image/') ? (
                                      <Eye className="h-3 w-3" />
                                    ) : (
                                      <Download className="h-3 w-3" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => removeAttachedFile(index)}
                                    className="p-1.5 hover:bg-accent rounded transition-colors text-muted-foreground hover:text-red-600"
                                    title="Remove file"
                                  >
                                    <XCircle className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                            💡 These files will be attached to your document and available for download after saving.
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Edit Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        {currentUser.isOwner 
                          ? "Your changes will be applied immediately" 
                          : "Your changes will be submitted for approval"
                        }
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 border border-input bg-background hover:bg-accent rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveChanges}
                          className={`px-4 py-2 text-white rounded-md transition-colors ${
                            currentUser.isOwner 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {currentUser.isOwner ? 'Save Changes' : 'Submit for Approval'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8">
                    <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-blockquote:text-muted-foreground prose-code:text-foreground prose-pre:bg-muted">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-3xl font-bold text-foreground mb-6 pb-4 border-b border-border">{children}</h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">{children}</h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">{children}</h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-foreground leading-relaxed mb-4">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground">{children}</ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-foreground">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-foreground">{children}</strong>
                          ),
                          code: ({ node, inline, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg my-4"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props}>
                                {children}
                              </code>
                            )
                          }
                        }}
                      >
                        {document.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>


        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Related Processes */}
          {document.relatedDocs && document.relatedDocs.length > 0 && (
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Related Processes</span>
              </h3>
              <div className="space-y-3">
                {(document.relatedDocs || []).map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/dashboard/documentation/${doc.id}`}
                    className="block group"
                  >
                    <div className="p-3 rounded-lg hover:bg-accent transition-colors">
                      <h4 className="font-medium text-sm group-hover:text-primary">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {doc.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Attached Documents */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <Copy className="h-4 w-4" />
              <span>Attached Documents</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Job Requisition Form', type: 'PDF' },
                { name: 'Interview Evaluation Form', type: 'DOCX' },
                { name: 'Offer Letter Template', type: 'DOCX' },
                { name: 'Onboarding Checklist', type: 'PDF' }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                      <FileText className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{doc.name}</h4>
                      <p className="text-xs text-muted-foreground">{doc.type}</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-accent rounded transition-colors" title="Download">
                    <Download className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-foreground hover:bg-accent rounded-lg transition-colors">
                <Printer className="h-4 w-4" />
                <span>Print Process Doc</span>
              </button>
              <button 
                onClick={handleCopyLink}
                className="w-full flex items-center space-x-3 px-3 py-2 text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <Copy className="h-4 w-4" />
                <span>Copy Link</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-foreground hover:bg-accent rounded-lg transition-colors">
                <ExternalLink className="h-4 w-4" />
                <span>Open in New Tab</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-foreground hover:bg-accent rounded-lg transition-colors">
                <GitBranch className="h-4 w-4" />
                <span>Process History</span>
              </button>
            </div>
          </div>

          {/* Process Statistics */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold mb-4">Process Impact</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Views</span>
                <span className="text-sm font-medium">{document.views.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Stakeholder Approval</span>
                <span className="text-sm font-medium">{document.likes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Discussion Points</span>
                <span className="text-sm font-medium">{document.comments?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Contributors</span>
                <span className="text-sm font-medium">{document.contributors?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* Pending Edits & Change Requests */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Pending Changes</span>
              </div>
              {pendingEdits.length > 0 && (
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                  {pendingEdits.length} pending
                </span>
              )}
            </h3>
            
            {/* Pending Edits */}
            {pendingEdits.length > 0 && (
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-medium text-orange-600">Pending Edit Requests</h4>
                {pendingEdits.map((edit) => (
                  <div key={edit.id} className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-orange-700">
                            {edit.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-sm">{edit.author}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{edit.timestamp}</span>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div>
                        <strong>Title Change:</strong>
                        <div className="bg-background p-2 rounded mt-1">
                          <div className="text-red-600 line-through">{edit.originalTitle}</div>
                          <div className="text-green-600">{edit.title}</div>
                        </div>
                      </div>
                      
                      {edit.attachedFiles && edit.attachedFiles.length > 0 && (
                        <div>
                          <strong>Attached Files ({edit.attachedFiles.length}):</strong>
                          <div className="mt-1 space-y-1">
                            {edit.attachedFiles.map((file, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-xs">
                                <span>{getFileIcon(file.type)}</span>
                                <span>{file.name}</span>
                                <span className="text-muted-foreground">({formatFileSize(file.size)})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Only show approve/decline buttons to document owner */}
                    {currentUser.name === document.author.name ? (
                      <div className="flex items-center justify-end space-x-2 mt-3 pt-2 border-t border-orange-200">
                        <button 
                          onClick={() => handleDeclinePendingEdit(edit.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
                        >
                          Decline
                        </button>
                        <button 
                          onClick={() => handleApprovePendingEdit(edit.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
                        >
                          Approve & Apply
                        </button>
                      </div>
                    ) : (
                      <div className="mt-3 pt-2 border-t border-orange-200 text-xs text-muted-foreground">
                        Only the process owner ({document.author.name}) can approve or decline this edit.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Sample Comments */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Recent Comments</h4>
              {[
                {
                  id: '1',
                  type: 'change_request',
                  author: 'David Kim',
                  content: 'Add background check step after offer acceptance',
                  timestamp: '2h ago',
                  status: 'pending'
                },
                {
                  id: '2',
                  type: 'comment',
                  author: 'Sarah Wilson',
                  content: 'Process timeline looks realistic',
                  timestamp: '1d ago',
                  status: 'resolved'
                },
                {
                  id: '3',
                  type: 'change_request',
                  author: 'Mike Chen',
                  content: 'Update interview panel size requirement',
                  timestamp: '2d ago',
                  status: 'approved'
                }
              ].slice(0, pendingEdits.length > 0 ? 2 : 3).map((comment) => (
                <div key={comment.id} className="border border-border rounded-lg p-3 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-xs">{comment.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  
                  <p className="text-xs mb-2 text-foreground">{comment.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      comment.type === 'change_request' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {comment.type === 'change_request' ? 'Change Request' : 'Comment'}
                    </span>
                    
                    {comment.type === 'change_request' && comment.status === 'pending' && (
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleApproveChange(comment.id)}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleDeclineChange(comment.id)}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                    
                    {comment.status !== 'pending' && (
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        comment.status === 'approved' ? 'bg-green-100 text-green-700' :
                        comment.status === 'resolved' ? 'bg-gray-100 text-gray-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-xs text-primary hover:text-primary/80 transition-colors">
              View All Comments
            </button>
          </div>

          {/* Collaborators */}
          {document.contributors && document.contributors.length > 0 && (
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Collaborators</span>
              </h3>
              <div className="space-y-2">
                {(document.contributors || []).slice(0, 4).map((contributor) => (
                  <div key={contributor.name} className="flex items-center space-x-3">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${contributor.name}&background=3b82f6&color=fff`
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">{contributor.commits} contributions</p>
                    </div>
                  </div>
                ))}
                {(document.contributors || []).length > 4 && (
                  <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                    +{(document.contributors || []).length - 4} more collaborators
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Restore Version Confirmation Modal */}
      {showRestoreConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg border border-border p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <GitBranch className="h-5 w-5 text-orange-500" />
              <span>Restore Version</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to restore to version <strong>{versionToRestore}</strong>? 
              This will create a new version with the content from the selected version. 
              The current changes will not be lost.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowRestoreConfirm(false)
                  setVersionToRestore(null)
                }}
                className="px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRestoreVersion}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Restore Version
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}