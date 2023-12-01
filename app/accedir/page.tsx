import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col gap-2 h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <LoginButton />
      <span>
        per xatejar amb en Tomeu Pen<sup>IA</sup>
      </span>
    </div>
  )
}
