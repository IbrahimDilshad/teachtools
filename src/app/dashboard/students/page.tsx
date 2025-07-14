"use client"

import Image from "next/image"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Textarea } from "@/components/ui/textarea"
import { students } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export default function StudentsPage() {
  const { toast } = useToast()
  const [isAddStudentOpen, setAddStudentOpen] = useState(false);
  const [isLogProgressOpen, setLogProgressOpen] = useState(false);

  const handleAddStudent = () => {
    toast({
        title: "Student Added",
        description: "The new student has been saved successfully.",
    })
    setAddStudentOpen(false);
  }

  const handleLogProgress = () => {
     toast({
        title: "Progress Logged",
        description: "The student's progress has been saved.",
    })
    setLogProgressOpen(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Students</CardTitle>
            <CardDescription>
            Manage your students and track their progress.
            </CardDescription>
        </div>
        <Dialog open={isAddStudentOpen} onOpenChange={setAddStudentOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-1 whitespace-nowrap">
                    <PlusCircle className="h-4 w-4" />
                    Add Student
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>Enter the details of the new student.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddStudent}>Save Student</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Avatar</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  Last Lesson
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Student avatar"
                      className="aspect-square rounded-full object-cover"
                      height="40"
                      src={student.avatar}
                      width="40"
                      data-ai-hint="person avatar"
                    />
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {student.name}
                    <div className="text-sm text-muted-foreground md:hidden">{student.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'active' ? 'outline' : 'secondary'} className={student.status === 'active' ? 'border-green-500 text-green-500' : ''}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell whitespace-nowrap">
                    {student.lastLesson}
                  </TableCell>
                  <TableCell>
                    <Dialog open={isLogProgressOpen} onOpenChange={setLogProgressOpen}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DialogTrigger asChild>
                              <DropdownMenuItem>Log Progress</DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent>
                          <DialogHeader>
                              <DialogTitle>Log Progress for {student.name}</DialogTitle>
                              <DialogDescription>Record lessons, homework, and remarks.</DialogDescription>
                          </DialogHeader>
                           <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                  <Label htmlFor="lesson">Lessons Taught</Label>
                                  <Textarea id="lesson" placeholder="e.g., Chapter 5: Photosynthesis" />
                              </div>
                              <div className="grid gap-2">
                                  <Label htmlFor="homework">Homework Given</Label>
                                  <Input id="homework" placeholder="e.g., Pg. 52, Ex. 1-5" />
                              </div>
                               <div className="grid gap-2">
                                  <Label htmlFor="remarks">Remarks</Label>
                                  <Textarea id="remarks" placeholder="e.g., Struggling with quadratic equations." />
                              </div>
                          </div>
                          <DialogFooter>
                              <Button variant="outline">Export Report</Button>
                              <Button onClick={handleLogProgress}>Save Log</Button>
                          </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
