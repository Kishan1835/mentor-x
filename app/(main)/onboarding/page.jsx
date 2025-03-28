import { getUserOnboardingStatus } from '@/actions/user'
import { industries } from '@/data/industries'
import { redirect } from 'next/navigation'
import OnboardingForm from './_components/Onboarding-form'

export default async function OnboardingPage() {
  // Check if the user is already onboarding 
  const { isOnboarding } = await getUserOnboardingStatus()

  if (isOnboarding) {
    redirect("/dashboard")
  }
  return <main>
    <OnboardingForm industries={industries} />
  </main>

}

