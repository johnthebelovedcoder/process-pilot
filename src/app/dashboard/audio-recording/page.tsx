'use client'

import { useState, useRef } from 'react'
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Upload,
  Brain,
  Clock,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Monitor,
  Smartphone,
  Headphones,
  Volume2,
  Save,
  RotateCcw
} from 'lucide-react'

export default function AudioRecordingPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordingMode, setRecordingMode] = useState<'audio-only' | 'screen-share'>('audio-only')
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [transcription, setTranscription] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const recordingTemplates = [
    {
      id: 'quick-capture',
      name: 'Quick Capture',
      description: 'Describe your process start to finish',
      prompts: ['Describe the overall process', 'What triggers this process?', 'What are the main steps?', 'Who is involved?', 'How long does it take?']
    },
    {
      id: 'detailed-walkthrough',
      name: 'Detailed Walkthrough',
      description: 'Comprehensive process documentation',
      prompts: ['Process overview and purpose', 'Prerequisites and requirements', 'Step-by-step instructions', 'Decision points and branches', 'Quality checks and validation', 'Common issues and solutions']
    },
    {
      id: 'exception-mapping',
      name: 'Exception Mapping',
      description: 'Focus on edge cases and problems',
      prompts: ['Normal process flow', 'What can go wrong?', 'How to handle exceptions', 'Escalation procedures', 'Recovery steps']
    },
    {
      id: 'role-based',
      name: 'Role-Based Recording',
      description: 'Department-specific process capture',
      prompts: ['Your role in this process', 'Tools and systems used', 'Handoffs to other teams', 'Reporting requirements', 'Success metrics']
    }
  ]

  const handleStartRecording = () => {
    setIsRecording(true)
    setIsPaused(false)
    setRecordingTime(0)
    // Start recording timer
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setTranscription("I'll walk you through our customer onboarding process. When a new customer signs up, the first step is to verify their email address. Once verified, we send them a welcome email with their account details. Next, our customer success team reaches out within 24 hours to schedule an onboarding call. During the call, we review their goals and configure their account settings...")
    }, 3000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Audio Process Recording</h1>
        <p className="text-muted-foreground">
          Record process explanations and convert them to structured workflows with AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recording Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recording Mode Selection */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-4">Recording Mode</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRecordingMode('audio-only')}
                className={`p-4 rounded-lg border transition-colors ${
                  recordingMode === 'audio-only' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:bg-accent'
                }`}
              >
                <Mic className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-medium mb-2">Audio Only</h3>
                <p className="text-sm text-muted-foreground">Voice recording with AI transcription</p>
              </button>
              <button
                onClick={() => setRecordingMode('screen-share')}
                className={`p-4 rounded-lg border transition-colors ${
                  recordingMode === 'screen-share' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:bg-accent'
                }`}
              >
                <Monitor className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-medium mb-2">Screen + Audio</h3>
                <p className="text-sm text-muted-foreground">Record screen actions with narration</p>
              </button>
            </div>
          </div>

          {/* Recording Controls */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="text-center">
              {!isRecording && !transcription && (
                <div className="space-y-4">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Mic size={48} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Ready to Record</h3>
                  <p className="text-muted-foreground">
                    {recordingMode === 'audio-only' 
                      ? 'Click start to begin audio recording' 
                      : 'Click start to begin screen and audio recording'}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setShowTemplates(true)}
                      className="px-4 py-2 border border-input rounded-md hover:bg-accent"
                    >
                      Use Template
                    </button>
                    <button
                      onClick={handleStartRecording}
                      className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                    >
                      <Mic size={20} />
                      Start Recording
                    </button>
                  </div>
                </div>
              )}

              {isRecording && (
                <div className="space-y-4">
                  <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Square size={48} className="text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-600">Recording in Progress</h3>
                  <p className="text-2xl font-mono">{formatTime(recordingTime)}</p>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="px-4 py-2 border border-input rounded-md hover:bg-accent flex items-center gap-2"
                    >
                      {isPaused ? <Play size={16} /> : <Pause size={16} />}
                      {isPaused ? 'Resume' : 'Pause'}
                    </button>
                    <button
                      onClick={handleStopRecording}
                      className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                    >
                      <Square size={20} />
                      Stop Recording
                    </button>
                  </div>
                </div>
              )}

              {isProcessing && (
                <div className="space-y-4">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Brain size={48} className="text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold">Processing Recording</h3>
                  <p className="text-muted-foreground">AI is converting your audio to structured process steps...</p>
                  <div className="w-48 h-2 bg-secondary rounded-full mx-auto">
                    <div className="h-2 bg-primary rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}

              {transcription && !isProcessing && (
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Recording Complete</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTranscription('')}
                        className="px-3 py-1 text-sm border border-input rounded-md hover:bg-accent flex items-center gap-1"
                      >
                        <RotateCcw size={14} />
                        New Recording
                      </button>
                    </div>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Transcription:</h4>
                    <p className="text-sm text-muted-foreground mb-4">{transcription}</p>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle size={16} />
                      Ready to convert to process documentation
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2">
                      <Brain size={16} />
                      Generate Process
                    </button>
                    <button className="px-4 py-2 border border-input rounded-md hover:bg-accent flex items-center gap-2">
                      <Save size={16} />
                      Save Recording
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Audio Settings */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Audio Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Input Device</label>
                <select className="w-full px-3 py-2 bg-background border border-input rounded-md">
                  <option>Default Microphone</option>
                  <option>External Microphone</option>
                  <option>Headset</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Input Level</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-secondary rounded-full">
                    <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <Volume2 size={16} className="text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Quality</span>
                <select className="px-2 py-1 text-sm bg-background border border-input rounded">
                  <option>High (44.1kHz)</option>
                  <option>Standard (22kHz)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recording Tips */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Recording Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Speak clearly and at a normal pace</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Describe each step in chronological order</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Mention decision points and exceptions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Include time estimates for each step</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Specify who is responsible for actions</span>
              </div>
            </div>
          </div>

          {/* Recent Recordings */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4">Recent Recordings</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 hover:bg-accent rounded">
                <FileText size={16} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Customer Onboarding</p>
                  <p className="text-xs text-muted-foreground">5 min • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-accent rounded">
                <FileText size={16} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Invoice Processing</p>
                  <p className="text-xs text-muted-foreground">8 min • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-accent rounded">
                <FileText size={16} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Employee Onboarding</p>
                  <p className="text-xs text-muted-foreground">12 min • 3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recording Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border border-border w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recording Templates</h2>
              <button 
                onClick={() => setShowTemplates(false)}
                className="p-1 hover:bg-accent rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recordingTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedTemplate === template.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:bg-accent'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <h3 className="font-medium mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">Prompts include:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {template.prompts.slice(0, 3).map((prompt, index) => (
                        <li key={index}>{prompt}</li>
                      ))}
                      {template.prompts.length > 3 && (
                        <li>+ {template.prompts.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowTemplates(false)}
                className="px-4 py-2 border border-input rounded-md hover:bg-accent"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowTemplates(false)
                  handleStartRecording()
                }}
                disabled={!selectedTemplate}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
              >
                Start with Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}