"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileDown, Printer, Send } from "lucide-react"

// Mock data for student details
const studentDetails = {
  id: "STU1001",
  name: "John Smith",
  course: "Computer Science",
  batch: "2023-24",
  admissionDate: "2023-04-10",
  totalFees: "₹75,000",
  paidAmount: "₹45,000",
  pendingAmount: "₹30,000",
  lastPaymentDate: "2023-03-15",
  status: "Partially Paid",
}

// Mock data for fee structure
const feeStructure = [
  { id: 1, description: "Tuition Fee", amount: "₹50,000" },
  { id: 2, description: "Development Fee", amount: "₹10,000" },
  { id: 3, description: "Library Fee", amount: "₹5,000" },
  { id: 4, description: "Laboratory Fee", amount: "₹7,000" },
  { id: 5, description: "Examination Fee", amount: "₹3,000" },
]

// Mock data for payment history
const paymentHistory = [
  {
    id: "PAY001",
    date: "2023-03-15",
    amount: "₹25,000",
    mode: "Online",
    transactionId: "TXN78945612",
    status: "Completed",
  },
  {
    id: "PAY002",
    date: "2023-02-10",
    amount: "₹20,000",
    mode: "Cheque",
    transactionId: "CHQ123456",
    status: "Completed",
  },
]

// Mock data for pending payments
const pendingPayments = [
  {
    id: "PEN001",
    dueDate: "2023-05-15",
    amount: "₹15,000",
    description: "Second Installment",
    status: "Upcoming",
  },
  {
    id: "PEN002",
    dueDate: "2023-07-15",
    amount: "₹15,000",
    description: "Final Installment",
    status: "Upcoming",
  },
]

export default function SOADetailsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Statement of Account - Details</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" /> Email to Student
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Basic details of the student</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                <p>{studentDetails.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p>{studentDetails.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Course</p>
                <p>{studentDetails.course}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Batch</p>
                <p>{studentDetails.batch}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Admission Date</p>
                <p>{studentDetails.admissionDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Payment Date</p>
                <p>{studentDetails.lastPaymentDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Overview of fee payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Fees</p>
                <p className="text-2xl font-bold">{studentDetails.totalFees}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid Amount</p>
                <p className="text-2xl font-bold text-green-600">{studentDetails.paidAmount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
                <p className="text-2xl font-bold text-red-600">{studentDetails.pendingAmount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mt-1 ${
                    studentDetails.status === "Fully Paid"
                      ? "bg-green-100 text-green-800"
                      : studentDetails.status === "Partially Paid"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {studentDetails.status}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fee Structure</CardTitle>
          <CardDescription>Breakdown of fee components</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStructure.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell>{fee.description}</TableCell>
                  <TableCell className="text-right">{fee.amount}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{studentDetails.totalFees}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Record of all payments made</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.mode}</TableCell>
                    <TableCell>
                      <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        {payment.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Payments</CardTitle>
            <CardDescription>Upcoming payment installments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell>
                      <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                        {payment.status}
                      </div>
                    </TableCell>
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
