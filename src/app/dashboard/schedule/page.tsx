
"use client"

import { PlusCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { classes } from "@/lib/data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function SchedulePage() {
  const { toast } = useToast()

  const handleCreateClass = () => {
    toast({
      title: "Class Created",
      description: "The new class has been added to your schedule.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Class Schedule</CardTitle>
          <CardDescription>Manage your weekly tutoring sessions.</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              New Class
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new class</DialogTitle>
              <DialogDescription>
                Fill in the details for the new session.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class-name" className="text-right">
                  Class Name
                </Label>
                <Input id="class-name" defaultValue="Algebra II" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="student-name" className="text-right">
                  Student
                </Label>
                <Input id="student-name" defaultValue="Alex Johnson" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" defaultValue="2024-07-25" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input id="time" type="time" defaultValue="10:00" className="col-span-3" />
              </div>
               <div className="flex items-center space-x-2 col-start-2 col-span-3">
                <Checkbox id="recurring" />
                <Label htmlFor="recurring">Set as recurring class</Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={handleCreateClass}>Create Class</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {classes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle className="text-lg">{session.title}</CardTitle>
                    <CardDescription>{session.studentName}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-medium">{session.date}</p>
                    <p className="text-muted-foreground">{session.startTime} - {session.endTime}</p>
                </CardContent>
                </Card>
            ))}
            </div>
        ) : (
             <div className="flex flex-col items-center justify-center text-center p-10 border-dashed border-2 rounded-lg">
                <h3 className="text-xl font-semibold">No Classes Scheduled</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                    Create your first class to see it on your schedule.
                </p>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        New Class
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Create a new class</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the new session.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="class-name-2" className="text-right">
                            Class Name
                            </Label>
                            <Input id="class-name-2" defaultValue="Algebra II" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="student-name-2" className="text-right">
                            Student
                            </Label>
                            <Input id="student-name-2" defaultValue="Alex Johnson" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date-2" className="text-right">
                            Date
                            </Label>
                            <Input id="date-2" type="date" defaultValue="2024-07-25" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time-2" className="text-right">
                            Time
                            </Label>
                            <Input id="time-2" type="time" defaultValue="10:00" className="col-span-3" />
                        </div>
                        <div className="flex items-center space-x-2 col-start-2 col-span-3">
                            <Checkbox id="recurring-2" />
                            <Label htmlFor="recurring-2">Set as recurring class</Label>
                        </div>
                        </div>
                        <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" onClick={handleCreateClass}>Create Class</Button>
                        </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        )}
      </CardContent>
    </Card>
  )
}
