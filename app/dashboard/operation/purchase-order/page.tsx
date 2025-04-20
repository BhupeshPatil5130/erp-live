"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileDown, Eye, Plus, ShoppingCart, Check, Trash } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for purchase orders
const purchaseOrderData = [
  {
    id: "PO001",
    supplier: "Academic Publishers",
    items: "Physics Textbook, Mathematics Textbook",
    quantity: "50, 30",
    totalAmount: "₹52,500",
    orderDate: "2023-04-05",
    expectedDelivery: "2023-04-20",
    status: "Pending",
  },
  {
    id: "PO002",
    supplier: "Science Supplies Co.",
    items: "Chemistry Lab Kit",
    quantity: "15",
    totalAmount: "₹18,000",
    orderDate: "2023-04-03",
    expectedDelivery: "2023-04-18",
    status: "Shipped",
  },
  {
    id: "PO003",
    supplier: "Tech Solutions",
    items: "Laptop, Projector",
    quantity: "10, 5",
    totalAmount: "₹575,000",
    orderDate: "2023-03-28",
    expectedDelivery: "2023-04-15",
    status: "Delivered",
  },
  {
    id: "PO004",
    supplier: "Office Supplies Ltd.",
    items: "Student ID Card Printer",
    quantity: "2",
    totalAmount: "₹50,000",
    orderDate: "2023-03-25",
    expectedDelivery: "2023-04-10",
    status: "Cancelled",
  },
  {
    id: "PO005",
    supplier: "Stationery World",
    items: "Notebooks, Pens, Markers",
    quantity: "500, 1000, 200",
    totalAmount: "₹35,000",
    orderDate: "2023-03-20",
    expectedDelivery: "2023-04-05",
    status: "Delivered",
  },
]

// Mock data for suppliers
const supplierData = [
  { id: "SUP001", name: "Academic Publishers", contact: "9876543210", email: "info@academicpub.com" },
  { id: "SUP002", name: "Science Supplies Co.", contact: "8765432109", email: "contact@sciencesupplies.com" },
  { id: "SUP003", name: "Tech Solutions", contact: "7654321098", email: "sales@techsolutions.com" },
  { id: "SUP004", name: "Office Supplies Ltd.", contact: "6543210987", email: "orders@officesupplies.com" },
  { id: "SUP005", name: "Stationery World", contact: "5432109876", email: "info@stationeryworld.com" },
]

export default function PurchaseOrderPage() {
  const { toast } = useToast()
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPO, setSelectedPO] = useState<any>(null)

  const handleViewPO = (po: any) => {
    setSelectedPO(po)
    setIsViewDialogOpen(true)
  }

  const handleEditPO = (po: any) => {
    setSelectedPO(po)
    setIsEditDialogOpen(true)
  }

  const handleDeletePO = (po: any) => {
    setSelectedPO(po)
    setIsDeleteDialogOpen(true)
  }

  const handleMarkDelivered = (po: any) => {
    // In a real app, this would call an API
    toast({
      title: "Order Marked as Delivered",
      description: `Purchase order ${po.id} has been marked as delivered.`,
    })
  }

  const confirmDelete = () => {
    // In a real app, this would call an API
    toast({
      title: "Purchase Order Deleted",
      description: `Purchase order ${selectedPO.id} has been deleted successfully.`,
    })
    setIsDeleteDialogOpen(false)
  }

  const saveEditedPO = () => {
    // In a real app, this would call an API
    toast({
      title: "Purchase Order Updated",
      description: `Purchase order ${selectedPO.id} has been updated successfully.`,
    })
    setIsEditDialogOpen(false)
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(purchaseOrderData)

  const handleSearch = () => {
    const filtered = purchaseOrderData.filter(
      (item) =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.items.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
        <Button>
          <ShoppingCart className="mr-2 h-4 w-4" /> Create Purchase Order
        </Button>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="create">Create New Order</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 flex items-center gap-2">
              <Input
                placeholder="Search by PO ID, supplier, items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <Button variant="outline" onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FileDown className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>Manage all purchase orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Expected Delivery</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((po) => (
                    <TableRow key={po.id}>
                      <TableCell>{po.id}</TableCell>
                      <TableCell>{po.supplier}</TableCell>
                      <TableCell>{po.items}</TableCell>
                      <TableCell>{po.quantity}</TableCell>
                      <TableCell>{po.totalAmount}</TableCell>
                      <TableCell>{po.orderDate}</TableCell>
                      <TableCell>{po.expectedDelivery}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            po.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : po.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : po.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {po.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewPO(po)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        {po.status === "Pending" && (
                          <Button variant="ghost" size="sm" onClick={() => handleEditPO(po)}>
                            Edit
                          </Button>
                        )}
                        {po.status === "Shipped" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600"
                            onClick={() => handleMarkDelivered(po)}
                          >
                            <Check className="h-4 w-4 mr-1" /> Mark Delivered
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeletePO(po)}>
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

        <TabsContent value="suppliers" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <Input placeholder="Search suppliers..." className="max-w-md" />
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Supplier
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Suppliers</CardTitle>
              <CardDescription>Manage all suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplierData.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>{supplier.id}</TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.contact}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Purchase Order</CardTitle>
              <CardDescription>Fill in the details to create a new purchase order</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select>
                      <SelectTrigger id="supplier">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {supplierData.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order-date">Order Date</Label>
                    <Input id="order-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expected-delivery">Expected Delivery Date</Label>
                    <Input id="expected-delivery" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-terms">Payment Terms</Label>
                    <Select>
                      <SelectTrigger id="payment-terms">
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="15days">15 Days</SelectItem>
                        <SelectItem value="30days">30 Days</SelectItem>
                        <SelectItem value="45days">45 Days</SelectItem>
                        <SelectItem value="60days">60 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Order Items</Label>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-5">
                            <Label htmlFor="item-name">Item Name</Label>
                            <Input id="item-name" placeholder="Enter item name" />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input id="quantity" type="number" min="1" placeholder="Qty" />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="unit-price">Unit Price</Label>
                            <Input id="unit-price" placeholder="₹0.00" />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="total">Total</Label>
                            <Input id="total" placeholder="₹0.00" disabled />
                          </div>
                          <div className="col-span-1 flex items-end">
                            <Button variant="outline" size="icon" className="mt-2">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item Name</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Unit Price</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={5} className="text-center text-muted-foreground">
                                No items added yet
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>

                        <div className="flex justify-end">
                          <div className="w-64 space-y-2">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>₹0.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax (18%):</span>
                              <span>₹0.00</span>
                            </div>
                            <div className="flex justify-between font-bold">
                              <span>Total:</span>
                              <span>₹0.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Enter any additional notes or instructions" rows={3} />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit">Create Purchase Order</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* View PO Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Purchase Order Details</DialogTitle>
            <DialogDescription>Detailed information about the purchase order.</DialogDescription>
          </DialogHeader>
          {selectedPO && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">PO ID</h3>
                  <p>{selectedPO.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Supplier</h3>
                  <p>{selectedPO.supplier}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                  <p>{selectedPO.orderDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Expected Delivery</h3>
                  <p>{selectedPO.expectedDelivery}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Items</h3>
                  <p>{selectedPO.items}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
                  <p>{selectedPO.quantity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                  <p>{selectedPO.totalAmount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedPO.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedPO.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : selectedPO.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedPO.status}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedPO && selectedPO.status === "Pending" && (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false)
                  handleEditPO(selectedPO)
                }}
              >
                Edit Order
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit PO Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Purchase Order</DialogTitle>
            <DialogDescription>Update the purchase order details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedPO && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-supplier">Supplier</Label>
                  <Input
                    id="edit-supplier"
                    value={selectedPO.supplier}
                    onChange={(e) => setSelectedPO({ ...selectedPO, supplier: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-order-date">Order Date</Label>
                  <Input
                    id="edit-order-date"
                    type="date"
                    value={selectedPO.orderDate}
                    onChange={(e) => setSelectedPO({ ...selectedPO, orderDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-expected-delivery">Expected Delivery</Label>
                  <Input
                    id="edit-expected-delivery"
                    type="date"
                    value={selectedPO.expectedDelivery}
                    onChange={(e) => setSelectedPO({ ...selectedPO, expectedDelivery: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    defaultValue={selectedPO.status}
                    onValueChange={(value) => setSelectedPO({ ...selectedPO, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-items">Items</Label>
                <Input
                  id="edit-items"
                  value={selectedPO.items}
                  onChange={(e) => setSelectedPO({ ...selectedPO, items: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-quantity">Quantity</Label>
                  <Input
                    id="edit-quantity"
                    value={selectedPO.quantity}
                    onChange={(e) => setSelectedPO({ ...selectedPO, quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-total-amount">Total Amount</Label>
                  <Input
                    id="edit-total-amount"
                    value={selectedPO.totalAmount.replace("₹", "")}
                    onChange={(e) => setSelectedPO({ ...selectedPO, totalAmount: `₹${e.target.value}` })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedPO}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this purchase order? This action cannot be undone.
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
