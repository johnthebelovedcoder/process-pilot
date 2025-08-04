'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfileRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to settings page with profile tab active
    router.replace('/dashboard/settings?tab=profile')
  }, [router])

  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to Profile Settings...</p>
      </div>
    </div>
  )
}