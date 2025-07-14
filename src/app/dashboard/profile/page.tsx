import { Check, Lightbulb, ClipboardList } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function ProfilePage() {
  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Personal Hub</CardTitle>
          <CardDescription>
            Your private space to organize personal goals, notes, and stay motivated.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid md:grid-cols-2 gap-6">
            {/* Daily Goals Section */}
            <Card>
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                    <ClipboardList className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">Daily Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="goal1" />
                        <Label htmlFor="goal1" className="text-base font-normal">Finish grading Algebra tests</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="goal2" />
                        <Label htmlFor="goal2" className="text-base font-normal">Prepare lesson plan for Chemistry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="goal3" defaultChecked />
                        <Label htmlFor="goal3" className="text-base font-normal line-through text-muted-foreground">Respond to parent emails</Label>
                    </div>
                     <div className="flex items-center gap-2 pt-2">
                        <Input placeholder="Add a new goal..." />
                        <Button variant="outline">Add</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Notes Section */}
            <Card>
                 <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                    <Lightbulb className="w-6 h-6 text-yellow-500" />
                    <CardTitle className="text-xl">Quick Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea placeholder="Jot down a quick thought or reminder..." className="min-h-[140px]" />
                    <div className="flex justify-end">
                        <Button>Save Note</Button>
                    </div>
                </CardContent>
            </Card>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}
