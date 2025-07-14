import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="grid gap-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="theme" className="text-base">Theme</Label>
              <p className="text-sm text-muted-foreground">Select your preferred color scheme.</p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                      Receive email updates for important events.
                  </p>
              </div>
              <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                      Get push notifications on your devices.
                  </p>
              </div>
              <Switch id="push-notifications" />
          </div>
        </CardContent>
        <CardContent>
            <div className="flex justify-end">
                <Button>Save Preferences</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
