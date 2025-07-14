import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminChatbotLogsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chatbot Usage Logs</CardTitle>
        <CardDescription>
          Monitor AI assistant usage across tutors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Chatbot usage logs will be displayed here.</p>
      </CardContent>
    </Card>
  )
}
