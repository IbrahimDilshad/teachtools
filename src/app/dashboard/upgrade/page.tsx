
"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Mail, PartyPopper } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

const premiumFeatures = [
  "Unlimited AI Assistant Usage",
  "Advanced Progress Reporting",
  "Priority Support",
  "Exclusive Access to New Features",
]

export default function UpgradePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
        title: "Request Sent!",
        description: "We've received your upgrade request. We'll email you the payment details shortly.",
    })
    setSubmitted(true)
  }

  return (
    <div className="flex justify-center items-start pt-10 h-full">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Go Premium</CardTitle>
          <CardDescription>
            Unlock the full potential of TeachTools and supercharge your
            teaching.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <span className="text-4xl font-bold">$10</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <ul className="space-y-3 mb-8">
            {premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="p-1 bg-accent rounded-full">
                  <Check className="h-4 w-4 text-accent-foreground" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
           {submitted ? (
            <Card className="bg-muted/50">
                <CardContent className="p-6 text-center">
                    <PartyPopper className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-xl mb-2">Request Received!</h4>
                    <p className="text-sm text-muted-foreground">
                        Thank you! We will send payment details to <strong>{user?.email}</strong> shortly. Once paid, we will activate your premium membership.
                    </p>
                </CardContent>
            </Card>
           ) : (
             <form onSubmit={handleSubmit}>
                <Card className="bg-muted/50">
                    <CardHeader>
                        <h4 className="font-semibold text-center">Ready to Upgrade?</h4>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground text-center">
                            Enter your email below. We'll send you payment details via JazzCash, EasyPaisa, or another local method.
                        </p>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="sr-only">Email</Label>
                            <Input id="email" type="email" defaultValue={user?.email || ""} required readOnly />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit">
                            <Mail className="mr-2 h-4 w-4" />
                            Request Payment Details
                        </Button>
                    </CardFooter>
                </Card>
             </form>
           )}
        </CardContent>
      </Card>
    </div>
  )
}
