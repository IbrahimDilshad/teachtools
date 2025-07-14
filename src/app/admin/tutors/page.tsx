
"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { tutors as initialTutors } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function AdminTutorsPage() {
  const [allTutors, setAllTutors] = useState(initialTutors)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const filteredTutors = useMemo(() => {
    if (!searchTerm) return allTutors
    return allTutors.filter(tutor =>
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, allTutors])

  const handlePremiumToggle = (tutorId: string, isPremium: boolean) => {
    setAllTutors(prevTutors =>
      prevTutors.map(tutor =>
        tutor.id === tutorId ? { ...tutor, isPremium } : tutor
      )
    )
    const tutorName = allTutors.find(t => t.id === tutorId)?.name
    toast({
      title: "Status Updated",
      description: `${tutorName}'s premium status has been set to ${isPremium ? "Active" : "Inactive"}.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutor Management</CardTitle>
        <CardDescription>
          View, manage, and set premium status for tutors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tutor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead className="text-right">Premium Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTutors.length > 0 ? (
                filteredTutors.map((tutor) => (
                  <TableRow key={tutor.id}>
                    <TableCell className="font-medium flex items-center gap-3">
                       <Image
                          alt="Tutor avatar"
                          className="aspect-square rounded-full object-cover"
                          height="32"
                          src={tutor.avatar}
                          width="32"
                          data-ai-hint="person avatar"
                      />
                      {tutor.name}
                    </TableCell>
                    <TableCell>{tutor.email}</TableCell>
                    <TableCell>{tutor.subjects.join(", ")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                          <Label htmlFor={`premium-${tutor.id}`} className="sr-only">
                              Premium
                          </Label>
                          <Switch
                              id={`premium-${tutor.id}`}
                              checked={tutor.isPremium}
                              onCheckedChange={(checked) => handlePremiumToggle(tutor.id, checked)}
                          />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No tutors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
