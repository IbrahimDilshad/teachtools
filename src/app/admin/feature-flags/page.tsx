
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function AdminFeatureFlagsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Flags</CardTitle>
        <CardDescription>
          Globally enable or disable features for all users.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
                <Label htmlFor="ai-assistant" className="text-base">AI Assistant</Label>
                <p className="text-sm text-muted-foreground">
                    Enable or disable the AI chatbot for all premium users.
                </p>
            </div>
            <Switch id="ai-assistant" defaultChecked />
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
                <Label htmlFor="new-signups" className="text-base">New Sign-ups</Label>
                <p className="text-sm text-muted-foreground">
                    Allow or disallow new tutors to register on the platform.
                </p>
            </div>
            <Switch id="new-signups" defaultChecked />
        </div>
        <div className="flex justify-end">
            <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
