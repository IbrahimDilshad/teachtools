"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3,
  Bot,
  Flag,
  Shield,
  Users,
  CreditCard,
  GraduationCap
} from "lucide-react"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

const navItems = [
  { href: "/admin", icon: BarChart3, label: "Summary" },
  { href: "/admin/tutors", icon: Users, label: "Tutor Management" },
  { href: "/admin/subscriptions", icon: CreditCard, label: "Subscriptions" },
  { href: "/admin/chatbot-logs", icon: Bot, label: "Chatbot Logs" },
  { href: "/admin/feature-flags", icon: Flag, label: "Feature Flags" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const getPageTitle = () => {
    const currentItem = navItems.find(item => item.href === pathname);
    return currentItem ? currentItem.label : "Admin Dashboard";
  };
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Shield className="size-7 text-primary" />
            <div className="flex flex-col">
                <span className="text-lg font-semibold font-headline">TeachTools</span>
                <span className="text-xs text-muted-foreground">Admin Panel</span>
            </div>
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
