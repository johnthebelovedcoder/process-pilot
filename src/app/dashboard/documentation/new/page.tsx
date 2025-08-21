'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  ArrowLeft,
  Save,
  Eye,
  Upload,
  X,
  Plus,
  FileText,
  Briefcase,
  Code2,
  BookOpen,
  Shield,
  HelpCircle,
  Users,
  Building2,
  DollarSign as Finance,
  Cog,
  HeartHandshake,
  ShieldCheck,
  Truck,
  Target,
  MessageCircle,
  Calendar,
  Tag,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Paperclip,
  Trash2,
  Settings,
  Globe,
  Mic,
  Video,
  Monitor,
  Square,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Download,
  Waveform
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Document types following PRD/FRD/BRD standards
const documentTypes = [
  {
    id: 'prd',
    name: 'Product Requirements Document',
    description: 'Product vision, features, and success metrics',
    icon: Target,
    template: 'prd',
    color: 'text-blue-600 bg-blue-50',
    sections: ['Executive Summary', 'Product Vision', 'Problem Statement', 'Target Audience', 'Product Objectives', 'Core Features', 'Success Metrics']
  },
  {
    id: 'frd',
    name: 'Functional Requirements Document',
    description: 'Detailed functional specifications and technical requirements',
    icon: Code2,
    template: 'frd',
    color: 'text-purple-600 bg-purple-50',
    sections: ['Introduction', 'System Overview', 'Functional Requirements', 'User Interface Requirements', 'Data Requirements', 'Security Requirements', 'Performance Requirements']
  },
  {
    id: 'brd',
    name: 'Business Requirements Document',
    description: 'Business objectives, stakeholder needs, and ROI analysis',
    icon: Briefcase,
    template: 'brd',
    color: 'text-green-600 bg-green-50',
    sections: ['Executive Summary', 'Business Context', 'Business Objectives', 'Business Requirements', 'Stakeholder Analysis', 'Success Metrics', 'Risk Assessment']
  },
  {
    id: 'api',
    name: 'API Documentation',
    description: 'API endpoints, authentication, and integration guides',
    icon: Globe,
    template: 'api',
    color: 'text-indigo-600 bg-indigo-50',
    sections: ['Overview', 'Authentication', 'Endpoints', 'Request/Response', 'Error Handling', 'Rate Limits', 'SDKs', 'Examples']
  },
  {
    id: 'guide',
    name: 'Process Guide',
    description: 'Step-by-step process documentation and procedures',
    icon: BookOpen,
    template: 'guide',
    color: 'text-orange-600 bg-orange-50',
    sections: ['Overview', 'Prerequisites', 'Process Steps', 'Attached Documents', 'Success Criteria', 'Troubleshooting', 'FAQ']
  },
  {
    id: 'policy',
    name: 'Policy Document',
    description: 'Company policies, compliance, and governance',
    icon: Shield,
    template: 'policy',
    color: 'text-red-600 bg-red-50',
    sections: ['Policy Statement', 'Scope', 'Definitions', 'Procedures', 'Compliance', 'Enforcement', 'Review Schedule']
  }
]

// Departments configuration
const departments = [
  { id: 'hr', name: 'Human Resources', icon: Users, color: 'text-blue-600' },
  { id: 'finance', name: 'Finance', icon: Finance, color: 'text-green-600' },
  { id: 'operations', name: 'Operations', icon: Cog, color: 'text-purple-600' },
  { id: 'legal', name: 'Legal & Compliance', icon: ShieldCheck, color: 'text-red-600' },
  { id: 'sales', name: 'Sales & Marketing', icon: Target, color: 'text-orange-600' },
  { id: 'it', name: 'Information Technology', icon: Code2, color: 'text-indigo-600' },
  { id: 'customer', name: 'Customer Service', icon: HeartHandshake, color: 'text-pink-600' },
  { id: 'logistics', name: 'Logistics & Supply', icon: Truck, color: 'text-amber-600' }
]

// Status options
const statusOptions = [
  { id: 'draft', name: 'Draft', icon: Clock, color: 'text-gray-600' },
  { id: 'review', name: 'In Review', icon: Eye, color: 'text-yellow-600' },
  { id: 'approved', name: 'Approved', icon: CheckCircle, color: 'text-green-600' },
  { id: 'published', name: 'Published', icon: Globe, color: 'text-blue-600' }
]

// Priority levels
const priorityLevels = [
  { id: 'low', name: 'Low', color: 'text-gray-600 bg-gray-100' },
  { id: 'medium', name: 'Medium', color: 'text-yellow-600 bg-yellow-100' },
  { id: 'high', name: 'High', color: 'text-orange-600 bg-orange-100' },
  { id: 'critical', name: 'Critical', color: 'text-red-600 bg-red-100' }
]

interface Attachment {
  id: string
  name: string
  size: number
  type: string
  url?: string
}

interface MediaRecording {
  id: string
  type: 'audio' | 'video' | 'screen'
  name: string
  duration: number
  url: string
  transcript?: string
  createdAt: Date
}

interface RecordingState {
  isRecording: boolean
  isPaused: boolean
  duration: number
  type: 'audio' | 'video' | 'screen' | null
}

export default function NewDocumentationPage() {
  const router = useRouter()
  const contentRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const videoPreviewRef = useRef<HTMLVideoElement>(null)
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Form state
  const [documentType, setDocumentType] = useState<string>('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [department, setDepartment] = useState('')
  const [status, setStatus] = useState('draft')
  const [priority, setPriority] = useState('medium')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [content, setContent] = useState('')
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [assignedReviewers, setAssignedReviewers] = useState<string[]>([])
  const [dueDate, setDueDate] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [enableComments, setEnableComments] = useState(true)
  const [enableVersioning, setEnableVersioning] = useState(true)

  // UI state
  const [showPreview, setShowPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [step, setStep] = useState(1)

  // Media recording state
  const [mediaRecordings, setMediaRecordings] = useState<MediaRecording[]>([])
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
    type: null
  })
  const [showMediaModal, setShowMediaModal] = useState(false)
  const [selectedMediaType, setSelectedMediaType] = useState<'audio' | 'video' | 'screen' | null>(null)
  const [isTranscribing, setIsTranscribing] = useState(false)

  const selectedDocumentType = documentTypes.find(type => type.id === documentType)

  // Media recording functions
  const startMediaRecording = async (type: 'audio' | 'video' | 'screen') => {
    try {
      let stream: MediaStream

      switch (type) {
        case 'audio':
          stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          break
        case 'video':
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
          })
          if (videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = stream
            videoPreviewRef.current.play()
          }
          break
        case 'screen':
          stream = await navigator.mediaDevices.getDisplayMedia({ 
            video: true, 
            audio: true 
          })
          if (videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = stream
            videoPreviewRef.current.play()
          }
          break
        default:
          throw new Error('Invalid media type')
      }

      streamRef.current = stream
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: Blob[] = []
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { 
          type: type === 'audio' ? 'audio/webm' : 'video/webm' 
        })
        const url = URL.createObjectURL(blob)
        
        const recording: MediaRecording = {
          id: Date.now().toString(),
          type,
          name: `${type} Recording ${new Date().toLocaleTimeString()}`,
          duration: recordingState.duration,
          url,
          createdAt: new Date()
        }

        setMediaRecordings(prev => [...prev, recording])
        
        // Simulate transcription for audio/video
        if (type !== 'screen') {
          simulateTranscription(recording.id)
        }

        // Cleanup
        stream.getTracks().forEach(track => track.stop())
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = null
        }
      }

      mediaRecorder.start()
      
      setRecordingState({
        isRecording: true,
        isPaused: false,
        duration: 0,
        type
      })

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingState(prev => ({
          ...prev,
          duration: prev.duration + 1
        }))
      }, 1000)

    } catch (error) {
      console.error('Error starting media recording:', error)
      alert('Failed to start recording. Please check your permissions.')
    }
  }

  const stopMediaRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop()
      
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }

      setRecordingState({
        isRecording: false,
        isPaused: false,
        duration: 0,
        type: null
      })
      
      setShowMediaModal(false)
      setSelectedMediaType(null)
    }
  }

  const pauseResumeRecording = () => {
    if (mediaRecorderRef.current) {
      if (recordingState.isPaused) {
        mediaRecorderRef.current.resume()
        // Resume timer
        recordingTimerRef.current = setInterval(() => {
          setRecordingState(prev => ({
            ...prev,
            duration: prev.duration + 1
          }))
        }, 1000)
      } else {
        mediaRecorderRef.current.pause()
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current)
        }
      }
      
      setRecordingState(prev => ({
        ...prev,
        isPaused: !prev.isPaused
      }))
    }
  }

  const simulateTranscription = async (recordingId: string) => {
    setIsTranscribing(true)
    // Simulate transcription API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const mockTranscript = "This is a simulated transcript of the recorded audio. In a real implementation, this would be generated using speech-to-text services like Azure Speech Services, Google Cloud Speech-to-Text, or AWS Transcribe."
    
    setMediaRecordings(prev => prev.map(recording => 
      recording.id === recordingId 
        ? { ...recording, transcript: mockTranscript }
        : recording
    ))
    
    setIsTranscribing(false)
  }

  const insertTranscriptToContent = (transcript: string) => {
    const transcriptSection = `\n\n## Transcript\n${transcript}\n\n`
    setContent(content + transcriptSection)
    if (contentRef.current) {
      contentRef.current.innerHTML = content + transcriptSection
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const deleteMediaRecording = (recordingId: string) => {
    setMediaRecordings(prev => {
      const recording = prev.find(r => r.id === recordingId)
      if (recording?.url) {
        URL.revokeObjectURL(recording.url)
      }
      return prev.filter(r => r.id !== recordingId)
    })
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      mediaRecordings.forEach(recording => {
        if (recording.url) {
          URL.revokeObjectURL(recording.url)
        }
      })
    }
  }, [mediaRecordings])

  const handleFormatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newAttachments: Attachment[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        newAttachments.push({
          id: Date.now().toString() + i,
          name: file.name,
          size: file.size,
          type: file.type
        })
      }
      setAttachments(prev => [...prev, ...newAttachments])
    }
  }

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    // In real app, would save to API
    console.log('Saving draft...', {
      documentType,
      title,
      description,
      department,
      status,
      priority,
      tags,
      content,
      attachments
    })
  }

  const handlePublish = async () => {
    setIsSaving(true)
    // Simulate publish
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    // In real app, would publish to API
    router.push('/dashboard/documentation')
  }

  const loadTemplate = (templateId: string) => {
    const templates = {
      prd: `# Product Requirements Document

## Executive Summary
[Brief overview of the product and its business value]

## Product Vision
[Vision statement and mission]

## Problem Statement
[Current challenges and market opportunity]

## Target Audience
[Primary and secondary user personas]

## Product Objectives
[Specific, measurable objectives]

## Core Features
[Detailed feature specifications]

## Success Metrics
[KPIs and success criteria]`,
      
      frd: `# Functional Requirements Document

## Introduction
[Purpose, scope, and definitions]

## System Overview
[Architecture and system components]

## Functional Requirements
[Detailed functional specifications]

## User Interface Requirements
[UI/UX specifications]

## Data Requirements
[Data models and storage requirements]

## Security Requirements
[Authentication, authorization, and compliance]

## Performance Requirements
[Response times, throughput, and scalability]`,
      
      brd: `# Business Requirements Document

## Executive Summary
[Business context and strategic importance]

## Business Context
[Current state analysis and market analysis]

## Business Objectives
[Strategic and financial objectives]

## Business Requirements
[Detailed business requirements]

## Stakeholder Analysis
[Primary stakeholders and RACI matrix]

## Success Metrics
[KPIs and business metrics]

## Risk Assessment
[Business and technical risks]`,
      
      guide: `# Process Guide

## Overview
[Process description and purpose]

## Prerequisites
[Required resources and permissions]

## Process Steps
[Detailed step-by-step procedures]

## Attached Documents
[Related templates and resources]

## Success Criteria
[Expected outcomes and quality measures]

## Troubleshooting
[Common issues and solutions]

## FAQ
[Frequently asked questions]`,
      
      policy: `# Policy Document

## Policy Statement
[Clear policy statement and purpose]

## Scope
[Who and what this policy covers]

## Definitions
[Key terms and definitions]

## Procedures
[Step-by-step procedures]

## Compliance
[Compliance requirements and standards]

## Enforcement
[Consequences and enforcement procedures]

## Review Schedule
[Review frequency and approval process]`,
      
      api: `# API Documentation

## Overview
[API description and capabilities]

## Authentication
[Authentication methods and examples]

## Endpoints
[Detailed endpoint documentation]

## Request/Response
[Request/response formats and examples]

## Error Handling
[Error codes and troubleshooting]

## Rate Limits
[Rate limiting policies]

## SDKs
[Available SDKs and libraries]

## Examples
[Code examples and use cases]`
    }
    
    setContent(templates[templateId as keyof typeof templates] || '')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard/documentation" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Documentation</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-2xl font-bold">Create New Documentation</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 px-3 py-2 border border-input rounded-lg hover:bg-accent transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>{showPreview ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="flex items-center space-x-2 px-3 py-2 border border-input rounded-lg hover:bg-accent transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={handlePublish}
              disabled={isSaving || !title || !documentType || !content}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Zap className="h-4 w-4" />
              <span>{isSaving ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pb-4">
          <div className="flex items-center space-x-8">
            {[
              { step: 1, name: 'Document Type', icon: FileText },
              { step: 2, name: 'Basic Information', icon: Settings },
              { step: 3, name: 'Content Creation', icon: BookOpen },
              { step: 4, name: 'Review & Publish', icon: CheckCircle }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="flex items-center space-x-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= item.step 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`text-sm font-medium ${
                    step >= item.step ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {item.name}
                  </span>
                  {index < 3 && (
                    <div className={`w-12 h-px ml-4 ${
                      step > item.step ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Step 1: Document Type Selection */}
        {step === 1 && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Choose Document Type</h2>
                <p className="text-muted-foreground text-lg">
                  Select the type of documentation you want to create. Each type has specialized templates and sections.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setDocumentType(type.id)
                        setStep(2)
                        loadTemplate(type.id)
                      }}
                      className={`p-6 rounded-lg border-2 text-left hover:shadow-lg transition-all ${
                        documentType === type.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-2 rounded-lg ${type.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg">{type.name}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{type.description}</p>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">Template includes:</p>
                        {type.sections.slice(0, 3).map((section) => (
                          <p key={section} className="text-sm text-muted-foreground">• {section}</p>
                        ))}
                        {type.sections.length > 3 && (
                          <p className="text-sm text-muted-foreground">• +{type.sections.length - 3} more sections</p>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Basic Information */}
        {step === 2 && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Change Document Type</span>
                </button>
                <h2 className="text-3xl font-bold mb-4">Basic Information</h2>
                <p className="text-muted-foreground text-lg">
                  Set up the basic details for your {selectedDocumentType?.name.toLowerCase()}.
                </p>
              </div>

              <div className="space-y-8">
                {/* Title and Description */}
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold mb-4">Document Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Document Title *
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a descriptive title for your document"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-2">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide a brief description of this document's purpose and scope"
                        rows={3}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Organization */}
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold mb-4">Organization</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium mb-2">
                        Department *
                      </label>
                      <select
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium mb-2">
                        Priority Level
                      </label>
                      <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                      >
                        {priorityLevels.map((level) => (
                          <option key={level.id} value={level.id}>
                            {level.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          <Tag className="h-3 w-3" />
                          <span>{tag}</span>
                          <button
                            onClick={() => removeTag(tag)}
                            className="hover:bg-primary/20 rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        placeholder="Add a tag..."
                        className="flex-1 px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                      />
                      <button
                        onClick={addTag}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold mb-4">Document Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium mb-2">
                        Initial Status
                      </label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
                        Due Date (Optional)
                      </label>
                      <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        id="isPublic"
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="rounded border-input"
                      />
                      <label htmlFor="isPublic" className="text-sm font-medium">
                        Make this document publicly accessible
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        id="enableComments"
                        type="checkbox"
                        checked={enableComments}
                        onChange={(e) => setEnableComments(e.target.checked)}
                        className="rounded border-input"
                      />
                      <label htmlFor="enableComments" className="text-sm font-medium">
                        Enable comments and collaboration
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        id="enableVersioning"
                        type="checkbox"
                        checked={enableVersioning}
                        onChange={(e) => setEnableVersioning(e.target.checked)}
                        className="rounded border-input"
                      />
                      <label htmlFor="enableVersioning" className="text-sm font-medium">
                        Enable version control
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center space-x-2 px-4 py-2 border border-input rounded-lg hover:bg-accent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!title || !description || !department}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
                  >
                    <span>Next: Content Creation</span>
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Content Creation */}
        {step === 3 && (
          <div className="flex-1 flex flex-col">
            <div className="border-b border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Basic Information</span>
                  </button>
                  <h2 className="text-2xl font-bold">Content Creation</h2>
                </div>
                <button
                  onClick={() => setStep(4)}
                  disabled={!content.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  <span>Review & Publish</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </button>
              </div>

              {/* Rich Text Editor Toolbar */}
              <div className="flex items-center space-x-1 p-2 bg-muted rounded-lg">
                <button
                  onClick={() => handleFormatText('bold')}
                  className="p-2 hover:bg-background rounded transition-colors"
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleFormatText('italic')}
                  className="p-2 hover:bg-background rounded transition-colors"
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleFormatText('underline')}
                  className="p-2 hover:bg-background rounded transition-colors"
                  title="Underline"
                >
                  <Underline className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-border mx-1" />
                <button
                  onClick={() => handleFormatText('insertUnorderedList')}
                  className="p-2 hover:bg-background rounded transition-colors"
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleFormatText('insertOrderedList')}
                  className="p-2 hover:bg-background rounded transition-colors"
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-border mx-1" />
                <button
                  onClick={() => handleFormatText('justifyLeft')}
                  className="p-2 hover:bg-background rounded transition-colors"
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleFormatText('justifyCenter')}
                  className="p-2 hover:bg-background rounded transition-colors"
                  title="Align Center"
                >
                  <AlignCenter className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleFormatText('justifyRight')}
                  className="p-2 hover:bg-background rounded transition-colors"
                  title="Align Right"
                >
                  <AlignRight className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-border mx-1" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 px-3 py-2 bg-background hover:bg-accent rounded transition-colors"
                  title="Add Attachment"
                >
                  <Paperclip className="h-4 w-4" />
                  <span>Attach</span>
                </button>
                <div className="w-px h-6 bg-border mx-1" />
                <button
                  onClick={() => {
                    setSelectedMediaType('audio')
                    setShowMediaModal(true)
                  }}
                  className="flex items-center space-x-2 px-3 py-2 bg-background hover:bg-accent rounded transition-colors"
                  title="Record Audio"
                >
                  <Mic className="h-4 w-4" />
                  <span>Voice</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedMediaType('video')
                    setShowMediaModal(true)
                  }}
                  className="flex items-center space-x-2 px-3 py-2 bg-background hover:bg-accent rounded transition-colors"
                  title="Record Video"
                >
                  <Video className="h-4 w-4" />
                  <span>Video</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedMediaType('screen')
                    setShowMediaModal(true)
                  }}
                  className="flex items-center space-x-2 px-3 py-2 bg-background hover:bg-accent rounded transition-colors"
                  title="Record Screen"
                >
                  <Monitor className="h-4 w-4" />
                  <span>Screen</span>
                </button>
              </div>
            </div>

            <div className="flex-1 flex">
              <div className="flex-1 p-6">
                {/* Content Editor */}
                <div
                  ref={contentRef}
                  contentEditable
                  className="w-full h-96 p-4 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none overflow-y-auto"
                  style={{ minHeight: '400px' }}
                  onInput={(e) => setContent(e.currentTarget.innerHTML)}
                  dangerouslySetInnerHTML={{ __html: content }}
                  suppressContentEditableWarning={true}
                />

                {/* Media Recordings */}
                {mediaRecordings.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Media Recordings ({mediaRecordings.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mediaRecordings.map((recording) => (
                        <div
                          key={recording.id}
                          className="p-4 bg-card border border-border rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {recording.type === 'audio' && <Mic className="h-4 w-4 text-blue-600" />}
                              {recording.type === 'video' && <Video className="h-4 w-4 text-green-600" />}
                              {recording.type === 'screen' && <Monitor className="h-4 w-4 text-purple-600" />}
                              <span className="text-sm font-medium">{recording.name}</span>
                            </div>
                            <button
                              onClick={() => deleteMediaRecording(recording.id)}
                              className="p-1 hover:bg-accent rounded transition-colors text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="mb-3">
                            {recording.type === 'audio' ? (
                              <audio 
                                controls 
                                src={recording.url}
                                className="w-full"
                              />
                            ) : (
                              <video 
                                controls 
                                src={recording.url}
                                className="w-full rounded"
                                style={{ maxHeight: '200px' }}
                              />
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Duration: {formatDuration(recording.duration)}</span>
                            <span>{recording.createdAt.toLocaleTimeString()}</span>
                          </div>

                          {recording.transcript && (
                            <div className="space-y-2">
                              <div className="p-2 bg-background rounded text-xs">
                                <p className="font-medium mb-1">Transcript:</p>
                                <p className="text-muted-foreground">{recording.transcript}</p>
                              </div>
                              <button
                                onClick={() => insertTranscriptToContent(recording.transcript!)}
                                className="text-xs text-primary hover:underline"
                              >
                                Insert transcript to content
                              </button>
                            </div>
                          )}

                          {!recording.transcript && recording.type !== 'screen' && (
                            <div className="text-xs text-muted-foreground">
                              {isTranscribing ? 'Generating transcript...' : 'Transcript will be generated'}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attachments */}
                {attachments.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Attachments ({attachments.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium truncate">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeAttachment(attachment.id)}
                            className="p-1 hover:bg-accent rounded transition-colors text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Sidebar with template sections */}
              {selectedDocumentType && (
                <div className="w-80 border-l border-border p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-4">Template Sections</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedDocumentType.name} typically includes these sections:
                  </p>
                  <div className="space-y-2">
                    {selectedDocumentType.sections.map((section) => (
                      <div
                        key={section}
                        className="p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => {
                          const heading = `\n## ${section}\n[Add content for ${section}]\n\n`
                          setContent(content + heading)
                          if (contentRef.current) {
                            contentRef.current.innerHTML = content + heading
                          }
                        }}
                      >
                        <p className="text-sm font-medium">{section}</p>
                        <p className="text-xs text-muted-foreground">Click to add to document</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="text-sm font-semibold mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => loadTemplate(documentType)}
                        className="w-full text-left p-2 text-sm bg-background rounded hover:bg-accent transition-colors"
                      >
                        Reset to template
                      </button>
                      <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="w-full text-left p-2 text-sm bg-background rounded hover:bg-accent transition-colors"
                      >
                        {showPreview ? 'Hide' : 'Show'} preview
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Review & Publish */}
        {step === 4 && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Content Creation</span>
                </button>
                <h2 className="text-3xl font-bold mb-4">Review & Publish</h2>
                <p className="text-muted-foreground text-lg">
                  Review your document before publishing or saving as draft.
                </p>
              </div>

              {/* Document Summary */}
              <div className="bg-card p-6 rounded-lg border border-border mb-6">
                <h3 className="text-xl font-semibold mb-4">Document Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Document Type</p>
                    <p className="text-lg">{selectedDocumentType?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Department</p>
                    <p className="text-lg">{departments.find(d => d.id === department)?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Title</p>
                    <p className="text-lg font-semibold">{title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <p className="text-lg">{statusOptions.find(s => s.id === status)?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Attachments</p>
                    <p className="text-lg">{attachments.length} file{attachments.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              <div className="bg-card p-6 rounded-lg border border-border mb-6">
                <h3 className="text-xl font-semibold mb-4">Content Preview</h3>
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center space-x-2 px-4 py-2 border border-input rounded-lg hover:bg-accent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Edit Content</span>
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveDraft}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-4 py-2 border border-input rounded-lg hover:bg-accent disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save as Draft</span>
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
                  >
                    <Zap className="h-4 w-4" />
                    <span>{isSaving ? 'Publishing...' : 'Publish Document'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Media Recording Modal */}
        {showMediaModal && selectedMediaType && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background rounded-lg border border-border p-6 w-full max-w-2xl mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center space-x-2">
                  {selectedMediaType === 'audio' && <Mic className="h-5 w-5 text-blue-600" />}
                  {selectedMediaType === 'video' && <Video className="h-5 w-5 text-green-600" />}
                  {selectedMediaType === 'screen' && <Monitor className="h-5 w-5 text-purple-600" />}
                  <span>
                    {selectedMediaType === 'audio' && 'Record Audio'}
                    {selectedMediaType === 'video' && 'Record Video'}
                    {selectedMediaType === 'screen' && 'Record Screen'}
                  </span>
                </h3>
                <button
                  onClick={() => {
                    if (recordingState.isRecording) {
                      stopMediaRecording()
                    } else {
                      setShowMediaModal(false)
                      setSelectedMediaType(null)
                    }
                  }}
                  className="p-1 hover:bg-accent rounded transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Video Preview */}
              {(selectedMediaType === 'video' || selectedMediaType === 'screen') && (
                <div className="mb-6">
                  <video
                    ref={videoPreviewRef}
                    autoPlay
                    muted
                    className="w-full rounded-lg bg-black"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
              )}

              {/* Audio Visualization */}
              {selectedMediaType === 'audio' && recordingState.isRecording && (
                <div className="mb-6 flex items-center justify-center h-32 bg-muted rounded-lg">
                  <div className="flex items-center space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-primary rounded-full animate-pulse"
                        style={{ 
                          height: `${Math.random() * 60 + 10}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Recording Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {recordingState.isRecording && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                      <span className="font-medium">Recording</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono text-lg">
                      {formatDuration(recordingState.duration)}
                    </span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {selectedMediaType === 'audio' && 'Click record to start capturing audio'}
                  {selectedMediaType === 'video' && 'Click record to start capturing video'}
                  {selectedMediaType === 'screen' && 'Click record to start screen capture'}
                </div>
              </div>

              {/* Recording Controls */}
              <div className="flex justify-center space-x-4">
                {!recordingState.isRecording ? (
                  <button
                    onClick={() => startMediaRecording(selectedMediaType)}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <div className="w-4 h-4 bg-white rounded-full" />
                    <span>Start Recording</span>
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={pauseResumeRecording}
                      className="flex items-center space-x-2 px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors"
                    >
                      {recordingState.isPaused ? (
                        <>
                          <Play className="h-4 w-4" />
                          <span>Resume</span>
                        </>
                      ) : (
                        <>
                          <Pause className="h-4 w-4" />
                          <span>Pause</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={stopMediaRecording}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Square className="h-4 w-4" />
                      <span>Stop Recording</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Instructions:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedMediaType === 'audio' && (
                    <>
                      <li>• Make sure your microphone is connected and working</li>
                      <li>• Speak clearly and at a normal pace</li>
                      <li>• Recording will be automatically transcribed after completion</li>
                    </>
                  )}
                  {selectedMediaType === 'video' && (
                    <>
                      <li>• Make sure your camera and microphone are connected</li>
                      <li>• Position yourself clearly in the camera view</li>
                      <li>• Audio will be automatically transcribed after completion</li>
                    </>
                  )}
                  {selectedMediaType === 'screen' && (
                    <>
                      <li>• You'll be asked to select which screen or application to record</li>
                      <li>• Include system audio to capture application sounds</li>
                      <li>• Recording will capture everything visible on the selected screen</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}