'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'react-hot-toast'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/ui/icons'
import { ServerActionResult } from '@/lib/types'

interface ClearHistoryProps {
  clearChats: () => ServerActionResult<void>
}

export function ClearHistory({ clearChats }: ClearHistoryProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" disabled={isPending}>
          {isPending && <IconSpinner className="mr-2" />}
          Eliminar historial
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estàs completament segur?</AlertDialogTitle>
          <AlertDialogDescription>
            Aquesta acció eliminarà permanentment el teu historial de xats dels
            nostres servidors.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel·lar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={event => {
              event.preventDefault()
              startTransition(async () => {
                const result = await clearChats()

                if (result && 'error' in result) {
                  toast.error("Error eliminant l'historial de xats")
                  return
                }

                setOpen(false)
                router.push('/')
              })
            }}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
