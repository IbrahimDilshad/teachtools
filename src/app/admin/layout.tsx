
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  BarChart3,
  Flag,
  Shield,
  Users,
  CreditCard,
} from "lucide-react"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAuth } from "@/hooks/use-auth"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const navItems = [
  { href: "/admin", icon: BarChart3, label: "Summary" },
  { href: "/admin/tutors", icon: Users, label: "Tutor Management" },
  { href: "/admin/subscriptions", icon: CreditCard, label: "Subscriptions" },
  { href: "/admin/feature-flags", icon: Flag, label: "Feature Flags" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAuth()
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.email !== adminEmail) {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router, adminEmail])

  const getPageTitle = () => {
    const currentItem = navItems.find(item => item.href === pathname);
    return currentItem ? currentItem.label : "Admin Dashboard";
  };

  const isLoadingOrUnauthorized = loading || !user || user.email !== adminEmail;

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
              {isLoadingOrUnauthorized ? (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <Skeleton className="h-28" />
                      <Skeleton className="h-28" />
                      <Skeleton className="h-28" />
                      <Skeleton className="h-28" />
                  </div>
                  <Skeleton className="h-96" />
                </div>
              ) : (
                children
              )}
            </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
