import Link from "next/link"
import {
  ArrowUpRight,
  Calendar,
  DollarSign,
  Users,
  AlertCircle,
} from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { classes, students, payments } from "@/lib/data"

export default function Dashboard() {
  const totalIncome = payments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
  const unpaidCount = payments.filter(p => p.status !== 'paid').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Income (July)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter(s => s.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">
              +2 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-muted-foreground">
              3 scheduled for today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unpaidCount}</div>
            <p className="text-xs text-muted-foreground">
              {payments.filter(p => p.status === 'overdue').length} overdue
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>
                Here are your next scheduled sessions.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1 whitespace-nowrap">
              <Link href="/dashboard/schedule">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.slice(0, 3).map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="font-medium whitespace-nowrap">{c.studentName}</div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{c.title}</TableCell>
                    <TableCell className="whitespace-nowrap">{c.date} @ {c.startTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>
                Overview of recent payment statuses.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1 whitespace-nowrap">
              <Link href="/dashboard/income">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.slice(0, 3).map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="font-medium whitespace-nowrap">{p.studentName}</div>
                    </TableCell>
                    <TableCell>${p.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={p.status === 'paid' ? 'default' : p.status === 'unpaid' ? 'secondary' : 'destructive'}
                        className={p.status === 'paid' ? 'bg-accent text-accent-foreground' : ''}
                      >
                          {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{p.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
