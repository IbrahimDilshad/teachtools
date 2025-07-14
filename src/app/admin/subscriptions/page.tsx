
"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { upgradeRequests as initialRequests } from "@/lib/data"
import type { UpgradeRequest } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function AdminSubscriptionsPage() {
  const [requests, setRequests] = useState<UpgradeRequest[]>(initialRequests)
  const { toast } = useToast()

  const handleMarkAsComplete = (id: string) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'completed' } : req))
    toast({ title: "Request Updated", description: "Marked as completed. Don't forget to enable premium for the user." })
  }

  const handleDelete = (id: string) => {
    setRequests(requests.filter(req => req.id !== id))
    toast({ title: "Request Deleted", description: "The upgrade request has been removed." })
  }

  const activeRequests = requests.filter(r => r.status === 'pending')
  const completedRequests = requests.filter(r => r.status === 'completed')

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pending Upgrade Requests</CardTitle>
          <CardDescription>
            Users who have requested to upgrade to a premium plan. Send them payment details and then mark as complete.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Requested On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeRequests.length > 0 ? (
                activeRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.email}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>
                      <Badge variant={request.status === 'pending' ? 'destructive' : 'default'} className={request.status === 'completed' ? 'bg-accent' : ''}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleMarkAsComplete(request.id)}>
                            Mark as Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(request.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No pending requests.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Completed Requests</CardTitle>
          <CardDescription>
            Requests that have been marked as complete.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Requested On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedRequests.length > 0 ? (
                completedRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.email}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    No completed requests.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
