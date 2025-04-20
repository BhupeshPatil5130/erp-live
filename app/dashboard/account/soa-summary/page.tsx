"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileDown, Eye, DollarSign } from "lucide-react"
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

// Mock data for SOA summary
const soaData = [
  {
    id: "SOA001",
    studentId: "STU1001",
    name: "John Smith",
    course: "Computer Science",
    totalFees: "₹75,000",
    paidAmount: "₹45,000",
    pendingAmount: "₹30,000",
    lastPaymentDate: "2023-03-15",
    status: "Partially Paid",
  },
  {
    id: "SOA002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    course: "Business Administration",
    totalFees: "₹65,000",
    paidAmount: "₹65,000",
    pendingAmount: "₹0",
    lastPaymentDate: "2023-02-28",
    status: "Fully Paid",
  },
  {
    id: "SOA003",
    studentId: "STU1003",
    name: "Michael Brown",
    course: "Electrical Engineering",
    totalFees: "₹80,000",
    paidAmount: "₹20,000",
    pendingAmount: "₹60,000",
    lastPaymentDate: "2023-04-01",
    status: "Partially Paid",
  },
  {
    id: "SOA004",
    studentId: "STU1004",
    name: "Emily Davis",
    course: "Psychology",
    totalFees: "₹60,000",
    paidAmount: "₹0",
    pendingAmount: "₹60,000",
    lastPaymentDate: "-",
    status: "Unpaid",
  },
  {
    id: "SOA005",
    studentId: "STU1005",
    name: "David Wilson",
    course: "Mechanical Engineering",
    totalFees: "₹80,000",
    paidAmount: "₹80,000",
    pendingAmount: "₹0",
    lastPaymentDate: "2023-01-20",
    status: "Fully Paid",
  },
]

export default function SOASummaryPage() {
  const { toast } = useToast()
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSOA, setSelectedSOA] = useState<any>(null)

  const handleViewSOA = (soa: any) => {
    setSelectedSOA(soa)
    setIsViewDialogOpen(true)
  }

  const handleEditSOA = (soa: any) => {
    setSelectedSOA(soa)
    setIsEditDialogOpen(true)
  }

  const handleDeleteSOA = (soa: any) => {
    setSelectedSOA(soa)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API
    toast({
      title: "SOA Record Deleted",
      description: `SOA record for ${selectedSOA.name} has been deleted successfully.`,
    })
    setIsDeleteDialogOpen(false)
  }

  const saveEditedSOA = () => {
    // In a real app, this would call an API
    toast({
      title: "SOA Record Updated",
      description: `SOA record for ${selectedSOA.name} has been updated successfully.`,
    })
    setIsEditDialogOpen(false)
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(soaData)

  const handleSearch = () => {
    const filtered = soaData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Statement of Accounts - Summary</h1>
        <Button>
          <FileDown className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter SOA records by various parameters</CardDescription>
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
              <Label htmlFor="course">Course</Label>
              <Select>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="business-administration">Business Administration</SelectItem>
                  <SelectItem value="electrical-engineering">Electrical Engineering</SelectItem>
                  <SelectItem value="psychology">Psychology</SelectItem>
                  <SelectItem value="mechanical-engineering">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Payment Status</Label>
              <Select
                onValueChange={(value) => {
                  if (value === "all") {
                    setFilteredData(soaData)
                  } else {
                    setFilteredData(soaData.filter((item) => item.status.toLowerCase() === value.toLowerCase()))
                  }
                }}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="fully paid">Fully Paid</SelectItem>
                  <SelectItem value="partially paid">Partially Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>SOA Summary</CardTitle>
          <CardDescription>Overview of student financial accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Fees</p>
                    <h3 className="text-2xl font-bold">₹360,000</h3>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary opacity-75" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Collected</p>
                    <h3 className="text-2xl font-bold">₹210,000</h3>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500 opacity-75" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Pending</p>
                    <h3 className="text-2xl font-bold">₹150,000</h3>
                  </div>
                  <DollarSign className="h-8 w-8 text-red-500 opacity-75" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SOA ID</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Total Fees</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((soa) => (
                <TableRow key={soa.id}>
                  <TableCell>{soa.id}</TableCell>
                  <TableCell>{soa.studentId}</TableCell>
                  <TableCell>{soa.name}</TableCell>
                  <TableCell>{soa.course}</TableCell>
                  <TableCell>{soa.totalFees}</TableCell>
                  <TableCell>{soa.paidAmount}</TableCell>
                  <TableCell>{soa.pendingAmount}</TableCell>
                  <TableCell>{soa.lastPaymentDate}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        soa.status === "Fully Paid"
                          ? "bg-green-100 text-green-800"
                          : soa.status === "Partially Paid"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {soa.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleViewSOA(soa)}>
                      <Eye className="h-4 w-4 mr-1" /> Details
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditSOA(soa)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteSOA(soa)}>
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View SOA Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>SOA Details</DialogTitle>
            <DialogDescription>Detailed information about the Statement of Account.</DialogDescription>
          </DialogHeader>
          {selectedSOA && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">SOA ID</h3>
                  <p>{selectedSOA.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
                  <p>{selectedSOA.studentId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{selectedSOA.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Course</h3>
                  <p>{selectedSOA.course}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Fees</h3>
                  <p>{selectedSOA.totalFees}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Paid Amount</h3>
                  <p>{selectedSOA.paidAmount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Pending Amount</h3>
                  <p>{selectedSOA.pendingAmount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Payment Date</h3>
                  <p>{selectedSOA.lastPaymentDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedSOA.status === "Fully Paid"
                        ? "bg-green-100 text-green-800"
                        : selectedSOA.status === "Partially Paid"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedSOA.status}
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
                handleEditSOA(selectedSOA)
              }}
            >
              Edit SOA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit SOA Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit SOA</DialogTitle>
            <DialogDescription>Update the Statement of Account details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedSOA && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Student Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedSOA.name}
                    onChange={(e) => setSelectedSOA({ ...selectedSOA, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-course">Course</Label>
                  <Input
                    id="edit-course"
                    value={selectedSOA.course}
                    onChange={(e) => setSelectedSOA({ ...selectedSOA, course: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-total-fees">Total Fees</Label>
                  <Input
                    id="edit-total-fees"
                    value={selectedSOA.totalFees.replace("₹", "")}
                    onChange={(e) => setSelectedSOA({ ...selectedSOA, totalFees: `₹${e.target.value}` })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-paid-amount">Paid Amount</Label>
                  <Input
                    id="edit-paid-amount"
                    value={selectedSOA.paidAmount.replace("₹", "")}
                    onChange={(e) => setSelectedSOA({ ...selectedSOA, paidAmount: `₹${e.target.value}` })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-pending-amount">Pending Amount</Label>
                  <Input
                    id="edit-pending-amount"
                    value={selectedSOA.pendingAmount.replace("₹", "")}
                    onChange={(e) => setSelectedSOA({ ...selectedSOA, pendingAmount: `₹${e.target.value}` })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-last-payment-date">Last Payment Date</Label>
                  <Input
                    id="edit-last-payment-date"
                    value={selectedSOA.lastPaymentDate}
                    onChange={(e) => setSelectedSOA({ ...selectedSOA, lastPaymentDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    defaultValue={selectedSOA.status}
                    onValueChange={(value) => setSelectedSOA({ ...selectedSOA, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fully Paid">Fully Paid</SelectItem>
                      <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                      <SelectItem value="Unpaid">Unpaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedSOA}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this SOA record? This action cannot be undone.
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
