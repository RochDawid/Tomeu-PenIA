import * as React from "react";
import Link from "next/link";

import { auth } from "@/auth";
import { clearChats } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import { SidebarList } from "@/components/sidebar-list";
import { SidebarFooter } from "@/components/sidebar-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { ClearHistory } from "@/components/clear-history";
import { UserMenu } from "@/components/user-menu";

async function UserOrLogin() {
  const session = await auth();

  return (
    <div className="flex items-center">
      {session?.user ? (
        <UserMenu user={session.user} />
      ) : (
        <Button variant="link" asChild className="-ml-2">
          <Link href="/sign-in?callbackUrl=/">Accedeix</Link>
        </Button>
      )}
    </div>
  );
}

export async function Header() {
  const session = await auth();

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
  );
}
