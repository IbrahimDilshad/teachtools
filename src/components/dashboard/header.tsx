"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserNav } from "@/components/dashboard/user-nav"

type DashboardHeaderProps = {
  title: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl font-headline">{title}</h1>
        </div>
        <UserNav />
    </header>
  )
}
