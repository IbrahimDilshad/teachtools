"use client"

import { PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { payments } from "@/lib/data"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function IncomePage() {
  const { toast } = useToast()
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);

  const handleAddIncome = () => {
    toast({
        title: "Income Added",
        description: "The new income record has been saved.",
    });
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Income & Payments</CardTitle>
          <CardDescription>
            Track your earnings and manage payments.
          </CardDescription>
        </div>
         <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Income
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Income Record</DialogTitle>
              <DialogDescription>Manually add a new payment record.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="student-name">Student Name</Label>
                <Input id="student-name" placeholder="Alex Johnson" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="50.00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button onClick={handleAddIncome}>Save Record</Button>
                </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Paid On</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium whitespace-nowrap">{payment.studentName}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={payment.status === 'paid' ? 'default' : payment.status === 'unpaid' ? 'secondary' : 'destructive'}
                      className={payment.status === 'paid' ? 'bg-accent text-accent-foreground' : ''}
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{payment.dueDate}</TableCell>
                  <TableCell className="whitespace-nowrap">{payment.paidDate || 'N/A'}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="whitespace-nowrap">Mark as Paid</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-5</strong> of <strong>{payments.length}</strong> payments
        </div>
        <div className="font-semibold">
          Total Paid (July): ${totalPaid.toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  )
}
