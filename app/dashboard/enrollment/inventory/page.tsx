"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileDown, Package, ShoppingCart,Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function InventoryPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [inventoryItems, setInventoryItems] = useState([])
  const [purchaseOrders, setPurchaseOrders] = useState([])
  const [filteredInventory, setFilteredInventory] = useState([])
  const [filteredPO, setFilteredPO] = useState([])
  const [activeTab, setActiveTab] = useState("inventory")
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [isAddPODialogOpen, setIsAddPODialogOpen] = useState(false)

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
    description: "",
  })

  const [newPO, setNewPO] = useState({
    supplier: "",
    items: "",
    quantity: "",
    totalAmount: "",
    expectedDelivery: "",
    notes: "",
  })

  const categoryOptions = ["Books", "Lab Equipment", "Electronics", "Equipment", "Stationery", "Furniture", "Uniforms"]
  const supplierOptions = [
    "Academic Publishers",
    "Science Supplies Co.",
    "Tech Solutions",
    "Office Supplies Ltd.",
    "Furniture Mart",
    "Uniform Manufacturers",
  ]

  useEffect(() => {
    fetchInventory()
    fetchPurchaseOrders()
  }, [])

  const fetchInventory = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/inventory")
      const data = await res.json()
      setInventoryItems(data)
      setFilteredInventory(data)
    } catch (error) {
      console.error("Failed to fetch inventory:", error)
    }
  }

  const fetchPurchaseOrders = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/purchase-orders")
      const data = await res.json()
      setPurchaseOrders(data)
      setFilteredPO(data)
    } catch (error) {
      console.error("Failed to fetch purchase orders:", error)
    }
  }

  const handleAddItem = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })

      if (res.ok) {
        toast({ title: "Item Added", description: `${newItem.name} has been added.` })
        setNewItem({ name: "", category: "", quantity: "", price: "", supplier: "", description: "" })
        setIsAddItemDialogOpen(false)
        fetchInventory()
      } else {
        toast({ title: "Failed to add item", variant: "destructive" })
      }
    } catch (err) {
      console.error("Error adding item:", err)
      toast({ title: "Error", description: err.message, variant: "destructive" })
    }
  }

  const handleAddPO = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/purchase-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPO),
      })

      if (res.ok) {
        toast({ title: "Purchase Order Created", description: `Order for ${newPO.supplier} has been placed.` })
        setNewPO({ supplier: "", items: "", quantity: "", totalAmount: "", expectedDelivery: "", notes: "" })
        setIsAddPODialogOpen(false)
        fetchPurchaseOrders()
      } else {
        toast({ title: "Failed to create order", variant: "destructive" })
      }
    } catch (err) {
      console.error("Error creating PO:", err)
      toast({ title: "Error", description: err.message, variant: "destructive" })
    }
  }

  const handleInventorySearch = () => {
    const filtered = inventoryItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredInventory(filtered)
  }

  const filterInventoryByCategory = (category) => {
    if (category === "all") {
      setFilteredInventory(inventoryItems)
    } else {
      setFilteredInventory(inventoryItems.filter((item) => item.category === category))
    }
  }

  const handleTabChange = (tab) => setActiveTab(tab)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory & Purchase Orders</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddItemDialogOpen(true)}><Package className="w-4 h-4 mr-2" /> Add Item</Button>
          <Button onClick={() => setIsAddPODialogOpen(true)}><ShoppingCart className="w-4 h-4 mr-2" /> Create PO</Button>
        </div>
      </div>
      <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 flex items-center gap-2">
          <Input
            placeholder="Search inventory by name, ID, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Button variant="outline" onClick={handleInventorySearch}>
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </div>
        <Select onValueChange={filterInventoryByCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categoryOptions.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline">
          <FileDown className="h-4 w-4 mr-2" /> Export
        </Button>
      </div>
    </div>

      <Tabs defaultValue="inventory" value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="po">Purchase Orders</TabsTrigger>
        </TabsList>


        <TabsContent value="inventory">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Inventory item</CardTitle>
              <CardDescription>View and manage your inventory items.</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex justify-end mb-4">
                <Button onClick={() => setIsAddItemDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </div>
          
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Supplier</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="po">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>All created purchase orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Delivery</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPO.map((po, i) => (
                    <TableRow key={i}>
                      <TableCell>{po.supplier}</TableCell>
                      <TableCell>{po.items}</TableCell>
                      <TableCell>{po.quantity}</TableCell>
                      <TableCell>{po.totalAmount}</TableCell>
                      <TableCell>{po.expectedDelivery}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Inventory Dialog */}
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <Input placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            <Select onValueChange={(val) => setNewItem({ ...newItem, category: val })}>
              <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                {categoryOptions.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="Quantity" type="number" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} />
            <Input placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
            <Select onValueChange={(val) => setNewItem({ ...newItem, supplier: val })}>
              <SelectTrigger><SelectValue placeholder="Supplier" /></SelectTrigger>
              <SelectContent>
                {supplierOptions.map((sup) => <SelectItem key={sup} value={sup}>{sup}</SelectItem>)}
              </SelectContent>
            </Select>
            <Textarea placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
          </div>
          <DialogFooter>
            <Button onClick={handleAddItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Purchase Order Dialog */}
      <Dialog open={isAddPODialogOpen} onOpenChange={setIsAddPODialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <Select onValueChange={(val) => setNewPO({ ...newPO, supplier: val })}>
              <SelectTrigger><SelectValue placeholder="Supplier" /></SelectTrigger>
              <SelectContent>
                {supplierOptions.map((sup) => <SelectItem key={sup} value={sup}>{sup}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="Items" value={newPO.items} onChange={(e) => setNewPO({ ...newPO, items: e.target.value })} />
            <Input placeholder="Quantities" value={newPO.quantity} onChange={(e) => setNewPO({ ...newPO, quantity: e.target.value })} />
            <Input placeholder="Total Amount" value={newPO.totalAmount} onChange={(e) => setNewPO({ ...newPO, totalAmount: e.target.value })} />
            <Input type="date" value={newPO.expectedDelivery} onChange={(e) => setNewPO({ ...newPO, expectedDelivery: e.target.value })} />
            <Textarea placeholder="Notes" value={newPO.notes} onChange={(e) => setNewPO({ ...newPO, notes: e.target.value })} />
          </div>
          <DialogFooter>
            <Button onClick={handleAddPO}>Create Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
