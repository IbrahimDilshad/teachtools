
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  Bell, 
  Calendar, 
  CheckSquare, 
  DollarSign, 
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
import { DashboardHeader } from "@/components/dashboard/header"
import { Chatbot } from "@/components/dashboard/chatbot"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import type { User as AppUser } from "@/lib/data"
import { tutors } from "@/lib/data"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/schedule", icon: Calendar, label: "Schedule" },
  { href: "/dashboard/students", icon: Users, label: "Students" },
  { href: "/dashboard/income", icon: DollarSign, label: "Income" },
  { href: "/dashboard/attendance", icon: CheckSquare, label: "Attendance" },
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
    const router = useRouter()
    const { user, loading } = useAuth()
    const [currentUser, setCurrentUser] = useState<AppUser | null>(null)

    useEffect(() => {
        if (!loading) {
        if (!user) {
            router.push('/login');
        } else {
            const appUser = tutors.find(t => t.email === user.email)
            if (appUser) {
            setCurrentUser(appUser)
            } else {
            const newUser: AppUser = {
                id: user.uid,
                name: user.displayName || user.email || 'New User',
                email: user.email || 'no-email',
                isPremium: false,
                subjects: ['General'],
                avatar: user.photoURL || 'https://placehold.co/40x40.png',
            };
            setCurrentUser(newUser);
            }
        }
        }
    }, [user, loading, router]);

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
                        {loading || !currentUser ? (
                           <div className="w-full h-full space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    <Skeleton className="h-28" />
                                    <Skeleton className="h-28" />
                                    <Skeleton className="h-28" />
                                    <Skeleton className="h-28" />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Skeleton className="h-80" />
                                    <Skeleton className="h-80" />
                                </div>
                            </div>
                        ) : (
                            children
                        )}
                    </main>
                    {currentUser && <Chatbot user={currentUser} />}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
