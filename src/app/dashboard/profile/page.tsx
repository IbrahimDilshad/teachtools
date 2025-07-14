import { Copy } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Shareable Profile</CardTitle>
        <CardDescription>
          Manage your public profile link to share on social media.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="profile-url">Your Profile URL</Label>
            <div className="flex items-center gap-2">
                <Input id="profile-url" readOnly defaultValue="teachtools.app/p/teacher-exampl" />
                <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="custom-slug">Custom Slug</Label>
            <div className="flex items-center gap-2">
                <span className="p-2 text-muted-foreground bg-muted rounded-l-md">teachtools.app/p/</span>
                <Input id="custom-slug" defaultValue="teacher-example" className="rounded-l-none" />
            </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
                <Label htmlFor="cta-toggle" className="text-base">Enable "Book me" CTA</Label>
                <p className="text-sm text-muted-foreground">
                    Allow potential students to book a session from your profile.
                </p>
            </div>
            <Switch id="cta-toggle" defaultChecked />
        </div>
        <div className="flex justify-end">
            <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
