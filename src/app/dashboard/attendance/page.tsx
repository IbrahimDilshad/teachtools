
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { students } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function AttendancePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance & Homework</CardTitle>
        <CardDescription>
          Track daily student attendance and homework completion.
        </CardDescription>
        <div className="flex items-center gap-4 pt-4">
            <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input type="date" id="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-[180px]" />
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="text-center">Attendance</TableHead>
              <TableHead className="text-center">Homework</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.filter(s => s.status === 'active').map(student => (
              <TableRow key={student.id}>
                <TableCell className="font-medium flex items-center gap-3">
                    <Image
                        alt="Student avatar"
                        className="aspect-square rounded-full object-cover"
                        height="32"
                        src={student.avatar}
                        width="32"
                        data-ai-hint="person avatar"
                    />
                    {student.name}
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox id={`attendance-${student.id}`} aria-label={`Mark ${student.name} as present`} />
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox id={`homework-${student.id}`} aria-label={`Mark ${student.name}'s homework as complete`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
            <Button>Save Log</Button>
        </div>
      </CardContent>
    </Card>
  )
}
