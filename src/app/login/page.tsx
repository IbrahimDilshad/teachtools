import dynamic from 'next/dynamic'
import { GraduationCap } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from '@/components/ui/skeleton'

// Dynamically import the component that uses client-side hooks and Firebase
const LoginForm = dynamic(() => import('@/components/login-form'), { 
  ssr: false,
  loading: () => (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
})

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50 p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="flex items-center gap-2 justify-center mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="font-headline text-2xl font-bold">TeachTools</span>
            </div>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}