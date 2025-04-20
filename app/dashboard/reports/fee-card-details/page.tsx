"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileDown, Eye, Download, Printer } from "lucide-react"

// Mock data for fee cards
const feeCardData = [
  {
    id: "FC001",
    studentId: "STU1001",
    studentName: "John Smith",
    course: "Computer Science",
    batch: "2023-24",
    totalFee: "₹75,000",
    paidAmount: "₹45,000",
    pendingAmount: "₹30,000",
    dueDate: "2023-05-15",
    status: "Partially Paid",
  },
  {
    id: "FC002",
    studentId: "STU1002",
    studentName: "Sarah Johnson",
    course: "Business Administration",
    batch: "2023-24",
    totalFee: "₹65,000",
    paidAmount: "₹65,000",
    pendingAmount: "₹0",
    dueDate: "2023-05-15",
    status: "Fully Paid",
  },
  {
    id: "FC003",
    studentId: "STU1003",
    studentName: "Michael Brown",
    course: "Electrical Engineering",
    batch: "2023-24",
    totalFee: "₹80,000",
    paidAmount: "₹20,000",
    pendingAmount: "₹60,000",
    dueDate: "2023-05-15",
    status: "Partially Paid",
  },
  {
    id: "FC004",
    studentId: "STU1004",
    studentName: "Emily Davis",
    course: "Psychology",
    batch: "2023-24",
    totalFee: "₹60,000",
    paidAmount: "₹0",
    pendingAmount: "₹60,000",
    dueDate: "2023-05-15",
    status: "Unpaid",
  },
  {
    id: "FC005",
    studentId: "STU1005",
    studentName: "David Wilson",
    course: "Mechanical Engineering",
    batch: "2023-24",
    totalFee: "₹80,000",
    paidAmount: "₹80,000",
    pendingAmount: "₹0",
    dueDate: "2023-05-15",
    status: "Fully Paid",
  },
]

// Mock data for fee components
const feeComponentData = [
  { id: 1, component: "Tuition Fee", amount: "₹50,000" },
  { id: 2, component: "Development Fee", amount: "₹10,000" },
  { id: 3, component: "Library Fee", amount: "₹5,000" },
  { id: 4, component: "Laboratory Fee", amount: "₹7,000" },
  { id: 5, component: "Examination Fee", amount: "₹3,000" },
]

// Mock data for payment history
const paymentHistoryData = [
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

export default function FeeCardDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(feeCardData)
  const [selectedFeeCard, setSelectedFeeCard] = useState<string | null>(null)

  const handleSearch = () => {
    const filtered = feeCardData.filter(
      (item) =>
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fee Card Details</h1>
        <Button>
          <FileDown className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter fee card details by various parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Search by name, ID, course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Select>
                <SelectTrigger id="batch">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-24">2023-24</SelectItem>
                  <SelectItem value="2022-23">2022-23</SelectItem>
                  <SelectItem value="2021-22">2021-22</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Payment Status</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="fully-paid">Fully Paid</SelectItem>
                  <SelectItem value="partially-paid">Partially Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Fee Card List</CardTitle>
          <CardDescription>View and manage fee cards for all students</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Card ID</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Total Fee</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((feeCard) => (
                <TableRow key={feeCard.id}>
                  <TableCell>{feeCard.id}</TableCell>
                  <TableCell>{feeCard.studentId}</TableCell>
                  <TableCell>{feeCard.studentName}</TableCell>
                  <TableCell>{feeCard.course}</TableCell>
                  <TableCell>{feeCard.totalFee}</TableCell>
                  <TableCell>{feeCard.paidAmount}</TableCell>
                  <TableCell>{feeCard.pendingAmount}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        feeCard.status === "Fully Paid"
                          ? "bg-green-100 text-green-800"
                          : feeCard.status === "Partially Paid"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {feeCard.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedFeeCard(feeCard.id)}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedFeeCard && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Fee Card Details</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-1" /> Print
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
              </div>
            </div>
            <CardDescription>
              Fee card for {feeCardData.find((fc) => fc.id === selectedFeeCard)?.studentName} (
              {feeCardData.find((fc) => fc.id === selectedFeeCard)?.studentId})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Total Fee</p>
                      <p className="text-2xl font-bold">
                        {feeCardData.find((fc) => fc.id === selectedFeeCard)?.totalFee}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Paid Amount</p>
                      <p className="text-2xl font-bold text-green-600">
                        {feeCardData.find((fc) => fc.id === selectedFeeCard)?.paidAmount}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
                      <p className="text-2xl font-bold text-red-600">
                        {feeCardData.find((fc) => fc.id === selectedFeeCard)?.pendingAmount}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Fee Structure</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeComponentData.map((component) => (
                      <TableRow key={component.id}>
                        <TableCell>{component.component}</TableCell>
                        <TableCell className="text-right">{component.amount}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">
                        {feeCardData.find((fc) => fc.id === selectedFeeCard)?.totalFee}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Payment History</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Receipt ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistoryData.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.mode}</TableCell>
                        <TableCell>{payment.transactionId}</TableCell>
                        <TableCell>
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            {payment.status}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Upcoming Payments</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Installment</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Final Installment</TableCell>
                      <TableCell>{feeCardData.find((fc) => fc.id === selectedFeeCard)?.dueDate}</TableCell>
                      <TableCell>{feeCardData.find((fc) => fc.id === selectedFeeCard)?.pendingAmount}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
