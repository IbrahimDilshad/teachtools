
import { GraduationCap } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignupClient from "./signup-client";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50 p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <div className="flex items-center gap-2 justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold">TeachTools</span>
          </div>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create your account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupClient />
        </CardContent>
      </Card>
    </div>
  )
}
