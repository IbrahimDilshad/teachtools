"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Wand2, Loader2 } from "lucide-react"

import {
  smartReminderGeneration,
  type SmartReminderGenerationOutput,
} from "@/ai/flows/smart-reminder-generation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  reminderType: z.enum(
    ["upcomingClass", "paymentDeadline", "missedAttendance"],
    { required_error: "Please select a reminder type." }
  ),
  studentName: z.string().min(1, "Student name is required."),
  className: z.string().optional(),
  paymentDueDate: z.string().optional(),
  date: z.string().optional(),
})

export function SmartReminderForm() {
  const [generationResult, setGenerationResult] = useState<SmartReminderGenerationOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "Alex Johnson",
      className: "Algebra II",
      date: new Date().toISOString().split('T')[0],
      paymentDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setGenerationResult(null)
    try {
      const result = await smartReminderGeneration({
        ...values,
        className: values.className || "",
        date: values.date || "",
        paymentDueDate: values.paymentDueDate || "",
      })
      setGenerationResult(result)
    } catch (error) {
      console.error("Error generating reminder:", error)
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate the reminder. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const reminderType = form.watch("reminderType")

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="reminderType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reminder Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type of reminder to generate" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="upcomingClass">Upcoming Class</SelectItem>
                    <SelectItem value="paymentDeadline">Payment Deadline</SelectItem>
                    <SelectItem value="missedAttendance">Missed Attendance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {reminderType === "upcomingClass" && (
            <>
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Advanced Calculus" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {reminderType === "paymentDeadline" && (
             <FormField
                control={form.control}
                name="paymentDueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          )}
           {reminderType === "missedAttendance" && (
            <>
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Missed Class Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., History 101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Missed Class Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Reminder
          </Button>
        </form>
      </Form>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Generated Message</h3>
        <Card className="min-h-[200px] bg-muted/50">
            <CardContent className="p-6">
                {isLoading && (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                {generationResult ? (
                    <p className="text-foreground/80 whitespace-pre-wrap">{generationResult.reminderMessage}</p>
                ) : !isLoading && (
                    <p className="text-muted-foreground text-center pt-16">Your generated reminder will appear here.</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
