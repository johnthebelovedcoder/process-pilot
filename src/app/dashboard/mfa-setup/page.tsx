'use client'

import { useState } from 'react'
import { 
  Shield, 
  Smartphone, 
  Copy, 
  QrCode, 
  CheckCircle, 
  AlertCircle,
  Download,
  ArrowLeft,
  Key,
  RefreshCw,
  Eye,
  EyeOff,
  Clock,
  Mail,
  Phone,
  Zap,
  Lock
} from 'lucide-react'
import Link from 'next/link'

const backupCodes = [
  '1A2B-3C4D-5E6F',
  '7G8H-9I0J-1K2L',
  '3M4N-5O6P-7Q8R',
  '9S0T-1U2V-3W4X',
  '5Y6Z-7A8B-9C0D',
  '1E2F-3G4H-5I6J',
  '7K8L-9M0N-1O2P',
  '3Q4R-5S6T-7U8V'
]

const mfaApps = [
  { 
    name: 'Google Authenticator', 
    description: 'Free app by Google for Android and iOS',
    platforms: ['Android', 'iOS'],
    recommended: true
  },
  { 
    name: 'Authy', 
    description: 'Multi-device authenticator with cloud backup',
    platforms: ['Android', 'iOS', 'Desktop'],
    recommended: true
  },
  { 
    name: 'Microsoft Authenticator', 
    description: 'Enterprise-grade authenticator by Microsoft',
    platforms: ['Android', 'iOS'],
    recommended: false
  },
  { 
    name: '1Password', 
    description: 'Password manager with built-in authenticator',
    platforms: ['Android', 'iOS', 'Desktop'],
    recommended: false
  }
]

export default function MFASetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [verificationCode, setVerificationCode] = useState('')
  const [showBackupCodes, setShowBackupCodes] = useState(false)
  const [codesDownloaded, setCodesDownloaded] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('app')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showSecretKey, setShowSecretKey] = useState(false)
  
  const secretKey = 'JBSWY3DPEHPK3PXP'
  const qrCodeUrl = `otpauth://totp/ProcessPilot:john.doe@company.com?secret=${secretKey}&issuer=ProcessPilot`

  const handleVerifyCode = () => {
    if (verificationCode.length === 6) {
      setCurrentStep(4)
    }
  }

  const handleDownloadCodes = () => {
    const codesText = backupCodes.join('\n')
    const blob = new Blob([codesText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'processpilot-backup-codes.txt'
    a.click()
    setCodesDownloaded(true)
  }

  const handleFinishSetup = () => {
    // Complete MFA setup
    console.log('MFA setup completed')
    // Redirect to profile page
    window.location.href = '/dashboard/profile'
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto pt-8 pb-16 px-4">
        <div className="mb-8">
          <Link 
            href="/dashboard/profile" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Two-Factor Authentication Setup</h1>
              <p className="text-muted-foreground">Secure your account with an additional layer of protection</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step < currentStep ? <CheckCircle size={16} /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-0.5 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Choose Method */}
        {currentStep === 1 && (
          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Choose Authentication Method</h2>
            
            <div className="space-y-4">
              <div 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === 'app' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedMethod('app')}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <Smartphone className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">Authenticator App</h3>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full dark:bg-green-900/30 dark:text-green-400">
                        Recommended
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Use an authenticator app like Google Authenticator or Authy to generate time-based codes.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Zap size={14} className="text-green-600" />
                      <span className="text-xs text-muted-foreground">More secure, works offline</span>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === 'sms' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedMethod('sms')}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">SMS Text Message</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive verification codes via text message to your phone.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <AlertCircle size={14} className="text-yellow-600" />
                      <span className="text-xs text-muted-foreground">Less secure, requires cell service</span>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === 'email' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedMethod('email')}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Email Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive verification codes via email to your registered email address.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock size={14} className="text-blue-600" />
                      <span className="text-xs text-muted-foreground">Backup option, may be slower</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Setup Method */}
        {currentStep === 2 && (
          <div className="bg-card p-8 rounded-lg border border-border">
            {selectedMethod === 'app' && (
              <>
                <h2 className="text-xl font-semibold mb-6">Setup Authenticator App</h2>
                
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">1. Download an Authenticator App</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {mfaApps.map((app) => (
                      <div key={app.name} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{app.name}</h4>
                          {app.recommended && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full dark:bg-green-900/30 dark:text-green-400">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{app.description}</p>
                        <div className="flex gap-1">
                          {app.platforms.map((platform) => (
                            <span key={platform} className="px-2 py-1 text-xs bg-secondary rounded">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold mb-4">2. Scan QR Code or Enter Secret Key</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium mb-3">Scan QR Code</h4>
                      <div className="bg-white p-4 rounded-lg border border-border inline-block">
                        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded">
                          <QrCode size={64} className="text-gray-400" />
                          <div className="absolute text-xs text-gray-500 mt-20">QR Code would appear here</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Open your authenticator app and scan this QR code
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Or Enter Secret Key Manually</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Account</label>
                          <input 
                            type="text" 
                            value="john.doe@company.com" 
                            readOnly 
                            className="w-full px-3 py-2 bg-muted border border-input rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Secret Key</label>
                          <div className="relative">
                            <input 
                              type={showSecretKey ? 'text' : 'password'}
                              value={secretKey} 
                              readOnly 
                              className="w-full px-3 py-2 bg-muted border border-input rounded-md text-sm pr-20 font-mono"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                              <button
                                onClick={() => setShowSecretKey(!showSecretKey)}
                                className="p-1 hover:bg-accent rounded"
                              >
                                {showSecretKey ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                              <button 
                                onClick={() => navigator.clipboard.writeText(secretKey)}
                                className="p-1 hover:bg-accent rounded"
                              >
                                <Copy size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedMethod === 'sms' && (
              <>
                <h2 className="text-xl font-semibold mb-6">Setup SMS Verification</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter your phone number with country code
                    </p>
                  </div>
                </div>
              </>
            )}

            {selectedMethod === 'email' && (
              <>
                <h2 className="text-xl font-semibold mb-6">Setup Email Verification</h2>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="text-blue-600" size={16} />
                    <span className="font-medium">Email verification will be sent to:</span>
                  </div>
                  <p className="text-sm">john.doe@company.com</p>
                </div>
              </>
            )}

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
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Verify Setup */}
        {currentStep === 3 && (
          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Verify Your Setup</h2>
            
            <div className="mb-6">
              <p className="text-muted-foreground mb-4">
                {selectedMethod === 'app' && 'Enter the 6-digit code from your authenticator app to verify the setup.'}
                {selectedMethod === 'sms' && 'Enter the 6-digit code sent to your phone number.'}
                {selectedMethod === 'email' && 'Enter the 6-digit code sent to your email address.'}
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="w-full px-4 py-3 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-center text-2xl font-mono tracking-widest"
                    maxLength={6}
                  />
                </div>

                {selectedMethod === 'sms' && (
                  <button className="text-sm text-primary hover:underline">
                    Didn&apos;t receive the code? Resend SMS
                  </button>
                )}

                {selectedMethod === 'email' && (
                  <button className="text-sm text-primary hover:underline">
                    Didn&apos;t receive the code? Resend Email
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-6 py-2 border border-input rounded-md hover:bg-accent"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button 
                onClick={handleVerifyCode}
                disabled={verificationCode.length !== 6}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Key size={16} />
                Verify Code
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Backup Codes */}
        {currentStep === 4 && (
          <div className="bg-card p-8 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <h2 className="text-xl font-semibold">Setup Complete!</h2>
                <p className="text-muted-foreground">Two-factor authentication has been successfully enabled.</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-4">Save Your Backup Codes</h3>
              <p className="text-muted-foreground mb-4">
                These backup codes can be used to access your account if you lose access to your authenticator device. 
                Store them in a safe place - each code can only be used once.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="p-2 bg-background rounded border">
                      {code}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button 
                  onClick={handleDownloadCodes}
                  className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
                >
                  <Download size={16} />
                  Download Codes
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(backupCodes.join('\n'))}
                  className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent"
                >
                  <Copy size={16} />
                  Copy to Clipboard
                </button>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6 dark:bg-yellow-900/20 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">Important Security Notice</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Keep these backup codes secure and accessible. If you lose both your authenticator device and backup codes, 
                    you may be locked out of your account.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="codes-saved" 
                  checked={codesDownloaded}
                  onChange={(e) => setCodesDownloaded(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="codes-saved" className="text-sm">
                  I have saved my backup codes in a secure location
                </label>
              </div>
              <button 
                onClick={handleFinishSetup}
                disabled={!codesDownloaded}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock size={16} />
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}