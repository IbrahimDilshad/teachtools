
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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { students } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StudentsPage() {
  const { toast } = useToast()
  const [isAddStudentOpen, setAddStudentOpen] = useState(false);
  const [isLogProgressOpen, setLogProgressOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null);

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
        description: `Progress for ${selectedStudent?.name} has been saved.`,
    })
    setLogProgressOpen(false)
  }

  const openLogProgressDialog = (student: typeof students[0]) => {
    setSelectedStudent(student);
    setLogProgressOpen(true);
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
        {students.length > 0 ? (
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
                            <DropdownMenuItem onClick={() => openLogProgressDialog(student)}>Log Progress</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-10 border-dashed border-2 rounded-lg">
            <h3 className="text-xl font-semibold">No Students Added Yet</h3>
            <p className="text-muted-foreground mt-2 mb-4">
              Click the button below to add your first student.
            </p>
            <Dialog open={isAddStudentOpen} onOpenChange={setAddStudentOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Add Your First Student
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>Enter the details of the new student.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name-2">Name</Label>
                            <Input id="name-2" placeholder="John Doe" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email-2">Email</Label>
                            <Input id="email-2" type="email" placeholder="john@example.com" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAddStudent}>Save Student</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
       <Dialog open={isLogProgressOpen} onOpenChange={setLogProgressOpen}>
           <DialogContent>
                <DialogHeader>
                    <DialogTitle>Log Progress for {selectedStudent?.name}</DialogTitle>
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
    </Card>
  )
}
