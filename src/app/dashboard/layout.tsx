"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Bell, 
  Calendar, 
  CheckSquare, 
  DollarSign, 
  FolderKanban, 
  GraduationCap, 
  LayoutDashboard, 
  Settings, 
  User, 
  Users
} from "lucide-react"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/header"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/schedule", icon: Calendar, label: "Schedule" },
  { href: "/dashboard/students", icon: Users, label: "Students" },
  { href: "/dashboard/income", icon: DollarSign, label: "Income" },
  { href: "/dashboard/attendance", icon: CheckSquare, label: "Attendance" },
  { href: "/dashboard/resources", icon: FolderKanban, label: "Resources" },
  { href: "/dashboard/reminders", icon: Bell, label: "Smart Reminders" },
]

const bottomNavItems = [
    { href: "/dashboard/profile", icon: User, label: "Profile" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const getPageTitle = () => {
    const allItems = [...navItems, ...bottomNavItems];
    const currentItem = allItems.find(item => item.href === pathname);
    return currentItem ? currentItem.label : "Dashboard";
  };
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="size-7 text-primary" />
            <span className="text-lg font-semibold font-headline">TeachTools</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton 
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            {bottomNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton isActive={pathname === item.href} tooltip={item.label}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
            ))}
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-full">
            <DashboardHeader title={getPageTitle()} />
            <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
