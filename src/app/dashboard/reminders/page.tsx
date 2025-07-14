import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SmartReminderForm } from "@/components/dashboard/smart-reminder-form"

export default function RemindersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Reminders</CardTitle>
        <CardDescription>
          Generate personalized reminders for your students using AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SmartReminderForm />
      </CardContent>
    </Card>
  )
}
