"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileDown, Filter, Eye, UserPlus, Mail, Phone, Edit, Trash, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StaffDetailsPage() {
  const { toast } = useToast()
  const [staffList, setStaffList] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [newStaff, setNewStaff] = useState({
    id: "",
    name: "",
    department: "",
    designation: "",
    email: "",
    phone: "",
    joiningDate: "",
    status: "Active",
  })

  const fetchStaff = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:4000/api/staff")
      if (!res.ok) throw new Error("Failed to fetch staff data")
      const data = await res.json()
      setStaffList(data)
      filterByTab(data, activeTab)
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const filterByTab = (data, tab) => {
    if (tab === "all") {
      setFilteredData(data)
    } else {
      const filtered = data.filter((staff) => staff.status.toLowerCase() === tab.replace("-", " ").toLowerCase())
      setFilteredData(filtered)
    }
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  useEffect(() => {
    filterByTab(staffList, activeTab)
  }, [activeTab, staffList])

  const handleSearch = () => {
    const filtered = staffList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm)
    )
    filterByTab(filtered, activeTab)
  }

  const handleViewStaff = (staff) => {
    setSelectedStaff(staff)
    setIsViewDialogOpen(true)
  }

  const handleEditStaff = (staff) => {
    setSelectedStaff({ ...staff })
    setIsEditDialogOpen(true)
  }

  const handleDeleteStaff = (staff) => {
    setSelectedStaff(staff)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/staff/${selectedStaff._id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete staff")
      toast({ title: "Deleted", description: `${selectedStaff.name} was removed.` })
      fetchStaff()
    } catch (err) {
      toast({ title: "Delete Failed", description: err.message, variant: "destructive" })
    }
    setIsDeleteDialogOpen(false)
  }

  const saveEditedStaff = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/staff/${selectedStaff._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedStaff),
      })
      if (!res.ok) throw new Error("Failed to update staff")
      toast({ title: "Updated", description: `${selectedStaff.name} updated successfully.` })
      fetchStaff()
      setIsEditDialogOpen(false)
    } catch (err) {
      toast({ title: "Update Failed", description: err.message, variant: "destructive" })
    }
  }

  const handleAddStaff = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStaff),
      })
      if (!res.ok) throw new Error("Failed to add staff")
      toast({ title: "Added", description: `${newStaff.name} has been added.` })
      fetchStaff()
      setNewStaff({ id: "", name: "", department: "", designation: "", email: "", phone: "", joiningDate: "", status: "Active" })
      setIsAddDialogOpen(false)
    } catch (err) {
      toast({ title: "Add Failed", description: err.message, variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Staff Details</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add New Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Staff</DialogTitle>
              <DialogDescription>Fill in the staff details and click add.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input placeholder="Staff ID" value={newStaff.id} onChange={(e) => setNewStaff({ ...newStaff, id: e.target.value })} />
              <Input placeholder="Full Name" value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} />
              <Input placeholder="Department" value={newStaff.department} onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })} />
              <Input placeholder="Designation" value={newStaff.designation} onChange={(e) => setNewStaff({ ...newStaff, designation: e.target.value })} />
              <Input type="email" placeholder="Email" value={newStaff.email} onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })} />
              <Input placeholder="Phone" value={newStaff.phone} onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })} />
              <Input type="date" value={newStaff.joiningDate} onChange={(e) => setNewStaff({ ...newStaff, joiningDate: e.target.value })} />
              <Select defaultValue={newStaff.status} onValueChange={(value) => setNewStaff({ ...newStaff, status: value })}>
                <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Former">Former</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button onClick={handleAddStaff}>Add Staff</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="on-leave">On Leave</TabsTrigger>
          <TabsTrigger value="former">Former Staff</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by name, ID, department, designation..."
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

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Staff Members</CardTitle>
              <CardDescription>View and manage staff members</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Joining Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((staff) => (
                      <TableRow key={staff._id}>
                        <TableCell>{staff.id}</TableCell>
                        <TableCell>{staff.name}</TableCell>
                        <TableCell>{staff.department}</TableCell>
                        <TableCell>{staff.designation}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="flex items-center text-xs">
                              <Mail className="h-3 w-3 mr-1" /> {staff.email}
                            </span>
                            <span className="flex items-center text-xs mt-1">
                              <Phone className="h-3 w-3 mr-1" /> {staff.phone}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{staff.joiningDate}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              staff.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : staff.status === "On Leave"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {staff.status}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleViewStaff(staff)}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditStaff(staff)}>
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleDeleteStaff(staff)}
                          >
                            <Trash className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
