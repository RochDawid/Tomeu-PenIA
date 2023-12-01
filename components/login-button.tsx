'use client'

import { signIn } from 'next-auth/react'
import * as React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { IconSpinner } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface LoginButtonProps extends ButtonProps {
  text?: string
}

export function LoginButton({
  text = 'Accedeix amb Google',
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <Button
      onClick={() => {
        setIsLoading(true)
        signIn('google', { callbackUrl: '/' })
      }}
      disabled={isLoading}
      className={`${cn('mr-2', className)}`}
      {...props}
    >
      {isLoading && <IconSpinner className="mr-2 animate-spin" />}
      {text}
    </Button>
  )
}
