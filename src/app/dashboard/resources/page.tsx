
"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Wand2 } from "lucide-react"
  
  export default function ResourcesPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Content Generation Assistant</CardTitle>
          <CardDescription>
            This feature has been upgraded with our new AI assistant.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center p-10 gap-4">
            <div className="p-4 bg-primary/10 rounded-full">
                <Wand2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">AI Assistant is now available for content help</h3>
            <p className="text-muted-foreground max-w-md">
                This powerful new feature is exclusive for Premium Tutors. Use the "Ask AI" button to get started.
            </p>
        </CardContent>
      </Card>
    )
  }
