"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, UserCheck, Bot, Languages } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const summaryData = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 80) + 20,
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tutors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Tutors</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">380</div>
            <p className="text-xs text-muted-foreground">30% of total tutors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chatbot Queries Today</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+12 since last hour</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used Subject</CardTitle>
            <Languages className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mathematics</div>
            <p className="text-xs text-muted-foreground">Followed by Physics</p>
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>New Tutor Sign-ups</CardTitle>
          <CardDescription>A summary of new tutors joining the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={350} minWidth={300}>
                <BarChart data={summaryData}>
                    <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
