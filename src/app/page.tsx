import { redirect } from 'next/navigation'

export default function Home() {
  // In a real app, check if user needs onboarding
  const needsOnboarding = false // Set to true to test onboarding flow
  
  if (needsOnboarding) {
    redirect('/onboarding')
  } else {
    redirect('/dashboard')
  }
}