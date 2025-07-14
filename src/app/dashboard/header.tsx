"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"

type DashboardHeaderProps = {
  title: string,
  children?: React.ReactNode
}

export function DashboardHeader({ title, children }: DashboardHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl font-headline">{title}</h1>
        </div>
        {children}
    </header>
  )
}
