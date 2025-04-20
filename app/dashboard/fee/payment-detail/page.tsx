"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, FileDown, Filter, Eye, Download } from "lucide-react"
import { Edit, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for payment details
const onlinePayments = [
  {
    id: "ONL001",
    studentId: "STU1001",
    name: "John Smith",
    amount: "₹15,000",
    date: "2023-04-10",
    status: "Completed",
    transactionId: "TXN78945612",
  },
  {
    id: "ONL002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    amount: "₹12,500",
    date: "2023-04-09",
    status: "Completed",
    transactionId: "TXN78945613",
  },
  {
    id: "ONL003",
    studentId: "STU1003",
    name: "Michael Brown",
    amount: "₹18,000",
    date: "2023-04-08",
    status: "Pending",
    transactionId: "TXN78945614",
  },
  {
    id: "ONL004",
    studentId: "STU1004",
    name: "Emily Davis",
    amount: "₹9,500",
    date: "2023-04-07",
    status: "Failed",
    transactionId: "TXN78945615",
  },
  {
    id: "ONL005",
    studentId: "STU1005",
    name: "David Wilson",
    amount: "₹21,000",
    date: "2023-04-06",
    status: "Completed",
    transactionId: "TXN78945616",
  },
]

const cashPayments = [
  {
    id: "CSH001",
    studentId: "STU1006",
    name: "Jennifer Lee",
    amount: "₹10,000",
    date: "2023-04-10",
    receiptNo: "RCP78945612",
  },
  {
    id: "CSH002",
    studentId: "STU1007",
    name: "Robert Taylor",
    amount: "₹8,500",
    date: "2023-04-09",
    receiptNo: "RCP78945613",
  },
  {
    id: "CSH003",
    studentId: "STU1008",
    name: "Jessica Clark",
    amount: "₹15,000",
    date: "2023-04-08",
    receiptNo: "RCP78945614",
  },
  {
    id: "CSH004",
    studentId: "STU1009",
    name: "William Moore",
    amount: "₹12,000",
    date: "2023-04-07",
    receiptNo: "RCP78945615",
  },
  {
    id: "CSH005",
    studentId: "STU1010",
    name: "Elizabeth White",
    amount: "₹9,000",
    date: "2023-04-06",
    receiptNo: "RCP78945616",
  },
]

const chequePayments = [
  {
    id: "CHQ001",
    studentId: "STU1011",
    name: "Thomas Anderson",
    amount: "₹18,000",
    date: "2023-04-10",
    chequeNo: "123456",
    bankName: "HDFC Bank",
    status: "Cleared",
  },
  {
    id: "CHQ002",
    studentId: "STU1012",
    name: "Patricia Martin",
    amount: "₹14,500",
    date: "2023-04-09",
    chequeNo: "123457",
    bankName: "ICICI Bank",
    status: "Pending",
  },
  {
    id: "CHQ003",
    studentId: "STU1013",
    name: "Charles Harris",
    amount: "₹22,000",
    date: "2023-04-08",
    chequeNo: "123458",
    bankName: "SBI",
    status: "Cleared",
  },
  {
    id: "CHQ004",
    studentId: "STU1014",
    name: "Linda Robinson",
    amount: "₹16,500",
    date: "2023-04-07",
    chequeNo: "123459",
    bankName: "Axis Bank",
    status: "Bounced",
  },
  {
    id: "CHQ005",
    studentId: "STU1015",
    name: "Richard Lewis",
    amount: "₹19,000",
    date: "2023-04-06",
    chequeNo: "123460",
    bankName: "Kotak Bank",
    status: "Cleared",
  },
]

export default function PaymentDetailPage() {
  const { toast } = useToast()
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsViewDialogOpen(true)
  }

  const handleEditPayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsEditDialogOpen(true)
  }

  const handleDeletePayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API
    toast({
      title: "Payment Deleted",
      description: `Payment ${selectedPayment.id} has been deleted successfully.`,
    })
    setIsDeleteDialogOpen(false)
  }

  const saveEditedPayment = () => {
    // In a real app, this would call an API
    toast({
      title: "Payment Updated",
      description: `Payment ${selectedPayment.id} has been updated successfully.`,
    })
    setIsEditDialogOpen(false)
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredOnline, setFilteredOnline] = useState(onlinePayments)
  const [filteredCash, setFilteredCash] = useState(cashPayments)
  const [filteredCheque, setFilteredCheque] = useState(chequePayments)

  const handleSearch = (tab: string) => {
    if (tab === "online" || tab === "all") {
      const filtered = onlinePayments.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredOnline(filtered)
    }

    if (tab === "cash" || tab === "all") {
      const filtered = cashPayments.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredCash(filtered)
    }

    if (tab === "cheque" || tab === "all") {
      const filtered = chequePayments.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.chequeNo.includes(searchTerm) ||
          item.bankName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredCheque(filtered)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payment Details</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Export All
        </Button>
      </div>

      <Tabs defaultValue="online" className="space-y-4" onValueChange={(value) => handleSearch(value)}>
        <TabsList>
          <TabsTrigger value="online">Online Payments</TabsTrigger>
          <TabsTrigger value="cash">Cash Payments</TabsTrigger>
          <TabsTrigger value="cheque">Cheque Payments</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by name, ID, transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Button variant="outline" onClick={() => handleSearch("all")}>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline">
            <FileDown className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>

        <TabsContent value="online" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Online Payments</CardTitle>
              <CardDescription>View all online payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOnline.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>{payment.studentId}</TableCell>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.transactionId}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            payment.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {payment.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewPayment(payment)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditPayment(payment)}>
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeletePayment(payment)}
                        >
                          <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Payments</CardTitle>
              <CardDescription>View all cash payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Receipt No</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCash.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>{payment.studentId}</TableCell>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.receiptNo}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" /> Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cheque" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cheque Payments</CardTitle>
              <CardDescription>View all cheque payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Cheque No</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCheque.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>{payment.studentId}</TableCell>
                      <TableCell>{payment.name}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.chequeNo}</TableCell>
                      <TableCell>{payment.bankName}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            payment.status === "Cleared"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {payment.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Payment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>Detailed information about the payment.</DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment ID</h3>
                  <p>{selectedPayment.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
                  <p>{selectedPayment.studentId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{selectedPayment.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                  <p>{selectedPayment.amount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{selectedPayment.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Transaction ID</h3>
                  <p>{selectedPayment.transactionId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedPayment.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : selectedPayment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedPayment.status}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false)
                handleEditPayment(selectedPayment)
              }}
            >
              Edit Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Payment</DialogTitle>
            <DialogDescription>Update the payment details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Student Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedPayment.name}
                    onChange={(e) => setSelectedPayment({ ...selectedPayment, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-amount">Amount</Label>
                  <Input
                    id="edit-amount"
                    value={selectedPayment.amount.replace("₹", "")}
                    onChange={(e) => setSelectedPayment({ ...selectedPayment, amount: `₹${e.target.value}` })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={selectedPayment.date}
                    onChange={(e) => setSelectedPayment({ ...selectedPayment, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    defaultValue={selectedPayment.status}
                    onValueChange={(value) => setSelectedPayment({ ...selectedPayment, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-transaction">Transaction ID</Label>
                <Input
                  id="edit-transaction"
                  value={selectedPayment.transactionId}
                  onChange={(e) => setSelectedPayment({ ...selectedPayment, transactionId: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedPayment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this payment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
