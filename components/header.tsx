import * as React from 'react'

import { clearChats } from '@/app/actions'
import { auth } from '@/auth'
import { ClearHistory } from '@/components/clear-history'
import { Sidebar } from '@/components/sidebar'
import { SidebarFooter } from '@/components/sidebar-footer'
import { SidebarList } from '@/components/sidebar-list'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserMenu } from '@/components/user-menu'

async function UserOrLogin() {
  const session = await auth()

  return (
    <div className="flex items-center">
      {session?.user ? (
        <UserMenu user={session.user} />
      ) : (
        <h1 className="text-2xl font-semibold">
          Tomeu Pen<sup>IA</sup>
        </h1>
      )}
    </div>
  )
}

export async function Header() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      {session?.user && (
        <Sidebar>
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            <SidebarList userId={session?.user?.id} />
          </React.Suspense>
          <SidebarFooter>
            <ThemeToggle />
            <ClearHistory clearChats={clearChats} />
          </SidebarFooter>
        </Sidebar>
      )}
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
    </header>
  )
}
