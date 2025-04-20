"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileDown, Filter, Eye, RefreshCw, Edit, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for exchange orders
const exchangeData = [
  {
    id: "EXC001",
    studentId: "STU1001",
    name: "John Smith",
    oldItem: "Physics Textbook",
    newItem: "Advanced Physics Textbook",
    reason: "Updated Edition",
    date: "2023-04-10",
    status: "Pending",
  },
  {
    id: "EXC002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    oldItem: "Calculator",
    newItem: "Scientific Calculator",
    reason: "Damaged",
    date: "2023-04-09",
    status: "Approved",
  },
  {
    id: "EXC003",
    studentId: "STU1003",
    name: "Michael Brown",
    oldItem: "Lab Coat (M)",
    newItem: "Lab Coat (L)",
    reason: "Size Issue",
    date: "2023-04-08",
    status: "Completed",
  },
  {
    id: "EXC004",
    studentId: "STU1004",
    name: "Emily Davis",
    oldItem: "Chemistry Kit",
    newItem: "Advanced Chemistry Kit",
    reason: "Course Requirement",
    date: "2023-04-07",
    status: "Rejected",
  },
  {
    id: "EXC005",
    studentId: "STU1005",
    name: "David Wilson",
    oldItem: "Engineering Drawing Kit",
    newItem: "Professional Drawing Kit",
    reason: "Quality Issue",
    date: "2023-04-06",
    status: "Pending",
  },
]

export default function ExchangeOrderPage() {
  const { toast } = useToast()
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  const handleEditOrder = (order: any) => {
    setSelectedOrder(order)
    setIsEditDialogOpen(true)
  }

  const handleDeleteOrder = (order: any) => {
    setSelectedOrder(order)
    setIsDeleteDialogOpen(true)
  }

  const handleApproveOrder = (order: any) => {
    // In a real app, this would call an API
    toast({
      title: "Order Approved",
      description: `Exchange order for ${order.name} has been approved successfully.`,
    })
  }

  const handleRejectOrder = (order: any) => {
    // In a real app, this would call an API
    toast({
      title: "Order Rejected",
      description: `Exchange order for ${order.name} has been rejected.`,
    })
  }

  const confirmDelete = () => {
    // In a real app, this would call an API
    toast({
      title: "Order Deleted",
      description: `Exchange order for ${selectedOrder.name} has been deleted successfully.`,
    })
    setIsDeleteDialogOpen(false)
  }

  const saveEditedOrder = () => {
    // In a real app, this would call an API
    toast({
      title: "Order Updated",
      description: `Exchange order for ${selectedOrder.name} has been updated successfully.`,
    })
    setIsEditDialogOpen(false)
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(exchangeData)

  const handleSearch = () => {
    const filtered = exchangeData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.oldItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.newItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reason.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Exchange Orders</h1>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" /> New Exchange Order
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 flex items-center gap-2">
          <Input
            placeholder="Search by ID, name, items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Button variant="outline" onClick={handleSearch}>
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

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Exchange Order Requests</CardTitle>
          <CardDescription>Manage item exchange requests from students</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Old Item</TableHead>
                <TableHead>New Item</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((exchange) => (
                <TableRow key={exchange.id}>
                  <TableCell>{exchange.id}</TableCell>
                  <TableCell>{exchange.studentId}</TableCell>
                  <TableCell>{exchange.name}</TableCell>
                  <TableCell>{exchange.oldItem}</TableCell>
                  <TableCell>{exchange.newItem}</TableCell>
                  <TableCell>{exchange.reason}</TableCell>
                  <TableCell>{exchange.date}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        exchange.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : exchange.status === "Approved"
                            ? "bg-blue-100 text-blue-800"
                            : exchange.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {exchange.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleViewOrder(exchange)}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditOrder(exchange)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => handleDeleteOrder(exchange)}
                    >
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                    {exchange.status === "Pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600"
                          onClick={() => handleApproveOrder(exchange)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleRejectOrder(exchange)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Exchange Order Details</DialogTitle>
            <DialogDescription>Detailed information about the exchange order.</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
                  <p>{selectedOrder.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
                  <p>{selectedOrder.studentId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{selectedOrder.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{selectedOrder.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Old Item</h3>
                  <p>{selectedOrder.oldItem}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">New Item</h3>
                  <p>{selectedOrder.newItem}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Reason</h3>
                  <p>{selectedOrder.reason}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedOrder.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedOrder.status === "Approved"
                          ? "bg-blue-100 text-blue-800"
                          : selectedOrder.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedOrder.status}
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
                handleEditOrder(selectedOrder)
              }}
            >
              Edit Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Exchange Order</DialogTitle>
            <DialogDescription>Update the exchange order details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Student Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedOrder.name}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-student-id">Student ID</Label>
                  <Input
                    id="edit-student-id"
                    value={selectedOrder.studentId}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, studentId: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-old-item">Old Item</Label>
                  <Input
                    id="edit-old-item"
                    value={selectedOrder.oldItem}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, oldItem: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-new-item">New Item</Label>
                  <Input
                    id="edit-new-item"
                    value={selectedOrder.newItem}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, newItem: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={selectedOrder.date}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    defaultValue={selectedOrder.status}
                    onValueChange={(value) => setSelectedOrder({ ...selectedOrder, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-reason">Reason</Label>
                <Textarea
                  id="edit-reason"
                  value={selectedOrder.reason}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, reason: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedOrder}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this exchange order? This action cannot be undone.
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
