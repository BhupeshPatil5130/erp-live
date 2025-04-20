"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, FileDown, Filter, ExternalLink, Eye, Edit, Trash, CheckCircle } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function LSQEnquiryPage() {
  const { toast } = useToast()

  const [lsqData, setLsqData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFollowUpDialogOpen, setIsFollowUpDialogOpen] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null)
  const [newEnquiry, setNewEnquiry] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    source: "",
    notes: "",
  })

  const courseOptions = [
    "Computer Science",
    "Business Administration",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Psychology",
    "Civil Engineering",
    "Information Technology",
    "Data Science",
  ]

  const sourceOptions = [
    "Website",
    "Social Media",
    "Referral",
    "Google",
    "Exhibition",
    "Newspaper",
    "TV Ad",
    "Direct Walk-in",
  ]

  const fetchLsqEnquiries = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/lsq-enquiries`)
      setLsqData(res.data)
      setFilteredData(res.data)
    } catch (err) {
      console.error("Error fetching LSQ enquiries", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLsqEnquiries()
  }, [])

  const handleSearch = () => {
    const term = searchTerm.toLowerCase()
    const filtered = lsqData.filter(
      (item: any) =>
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.phone.includes(term) ||
        item.course.toLowerCase().includes(term) ||
        item.source.toLowerCase().includes(term)
    )
    setFilteredData(filtered)
  }

  const handleAddEnquiry = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/lsq-enquiries`, newEnquiry)
      toast({
        title: "LSQ Enquiry Added",
        description: `New LSQ enquiry for ${newEnquiry.name} has been created successfully.`,
      })
      setIsAddDialogOpen(false)
      setNewEnquiry({ name: "", phone: "", email: "", course: "", source: "", notes: "" })
      fetchLsqEnquiries()
    } catch (err) {
      toast({
        title: "Failed to add enquiry",
        description: "Something went wrong.",
        variant: "destructive",
      })
    }
  }

  const handleEditEnquiry = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/lsq-enquiries/${selectedEnquiry._id}`, selectedEnquiry)
      toast({ title: "Updated", description: `Updated ${selectedEnquiry.name}` })
      fetchLsqEnquiries()
      setIsEditDialogOpen(false)
    } catch (err) {
      toast({ title: "Error", description: "Failed to update", variant: "destructive" })
    }
  }
  
  const handleDeleteEnquiry = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/lsq-enquiries/${selectedEnquiry._id}`)
      toast({ title: "Deleted", description: `Deleted ${selectedEnquiry.name}` })
      fetchLsqEnquiries()
      setIsDeleteDialogOpen(false)
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" })
    }
  }
  

  const handleFollowUp = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/lsq-enquiries/${selectedEnquiry._id}`, {
        status: selectedEnquiry.status,
        notes: selectedEnquiry.notes,
      })
  
      toast({
        title: "Follow-up Recorded",
        description: `Follow-up for ${selectedEnquiry.name} has been recorded successfully.`,
      })
  
      fetchLsqEnquiries()
      setIsFollowUpDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record follow-up",
        variant: "destructive",
      })
    }
  }
  const handleConvertToAdmission = async (enquiry: any) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/lsq-enquiries/${enquiry._id}`, {
        status: "Converted",
      })
  
      toast({
        title: "Converted to Admission",
        description: `LSQ enquiry for ${enquiry.name} has been converted to admission successfully.`,
      })
  
      fetchLsqEnquiries()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert to admission",
        variant: "destructive",
      })
    }
  }
  

  const openLSQPortal = () => {
    window.open("https://leadersquare.com/portal", "_blank")
    toast({
      title: "Opening LSQ Portal",
      description: "Redirecting to the Leadersquare portal in a new tab.",
    })
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Leadersquare Enquiry Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openLSQPortal}>
            <ExternalLink className="mr-2 h-4 w-4" /> Open LSQ Portal
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New LSQ Enquiry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New LSQ Enquiry</DialogTitle>
                <DialogDescription>
                  Enter the details of the new Leadersquare enquiry. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newEnquiry.name}
                      onChange={(e) => setNewEnquiry({ ...newEnquiry, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newEnquiry.phone}
                      onChange={(e) => setNewEnquiry({ ...newEnquiry, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newEnquiry.email}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Interested Course</Label>
                    <Select onValueChange={(value) => setNewEnquiry({ ...newEnquiry, course: value })}>
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseOptions.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source">Enquiry Source</Label>
                    <Select onValueChange={(value) => setNewEnquiry({ ...newEnquiry, source: value })}>
                      <SelectTrigger id="source">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        {sourceOptions.map((source) => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={newEnquiry.notes}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, notes: e.target.value })}
                    placeholder="Enter any additional information"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEnquiry}>Save Enquiry</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Enquiries</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="interested">Interested</TabsTrigger>
          <TabsTrigger value="converted">Converted</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by name, ID, phone, email or source..."
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

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All LSQ Enquiries</CardTitle>
              <CardDescription>Manage all Leadersquare enquiries from this panel</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((enquiry) => (
                    <TableRow key={enquiry.id}>
                      <TableCell>{enquiry.id}</TableCell>
                      <TableCell>{enquiry.name}</TableCell>
                      <TableCell>{enquiry.phone}</TableCell>
                      <TableCell>{enquiry.email}</TableCell>
                      <TableCell>{enquiry.course}</TableCell>
                      <TableCell>{enquiry.source}</TableCell>
                      <TableCell>{enquiry.date}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            enquiry.status === "New"
                              ? "bg-blue-100 text-blue-800"
                              : enquiry.status === "Contacted"
                                ? "bg-yellow-100 text-yellow-800"
                                : enquiry.status === "Interested"
                                  ? "bg-green-100 text-green-800"
                                  : enquiry.status === "Not Interested"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {enquiry.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedEnquiry(enquiry)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedEnquiry(enquiry)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedEnquiry(enquiry)
                              setIsFollowUpDialogOpen(true)
                            }}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedEnquiry(enquiry)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would follow the same pattern */}
      </Tabs>

      {/* View Enquiry Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>LSQ Enquiry Details</DialogTitle>
            <DialogDescription>Detailed information about the Leadersquare enquiry.</DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Enquiry ID</h3>
                  <p>{selectedEnquiry.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{selectedEnquiry.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{selectedEnquiry.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p>{selectedEnquiry.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{selectedEnquiry.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedEnquiry.status === "New"
                        ? "bg-blue-100 text-blue-800"
                        : selectedEnquiry.status === "Contacted"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedEnquiry.status === "Interested"
                            ? "bg-green-100 text-green-800"
                            : selectedEnquiry.status === "Not Interested"
                              ? "bg-red-100 text-red-800"
                              : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {selectedEnquiry.status}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Course</h3>
                  <p>{selectedEnquiry.course}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Source</h3>
                  <p>{selectedEnquiry.source}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="text-sm">{selectedEnquiry.notes}</p>
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
                handleConvertToAdmission(selectedEnquiry)
              }}
            >
              Convert to Admission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Enquiry Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit LSQ Enquiry</DialogTitle>
            <DialogDescription>Update the Leadersquare enquiry details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedEnquiry.name}
                    onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={selectedEnquiry.phone}
                    onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedEnquiry.email}
                  onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-course">Interested Course</Label>
                  <Select
                    defaultValue={selectedEnquiry.course}
                    onValueChange={(value) => setSelectedEnquiry({ ...selectedEnquiry, course: value })}
                  >
                    <SelectTrigger id="edit-course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseOptions.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    defaultValue={selectedEnquiry.status}
                    onValueChange={(value) => setSelectedEnquiry({ ...selectedEnquiry, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Interested">Interested</SelectItem>
                      <SelectItem value="Not Interested">Not Interested</SelectItem>
                      <SelectItem value="Converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Additional Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedEnquiry.notes}
                  onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEnquiry}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this LSQ enquiry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEnquiry}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Follow-up Dialog */}
      <Dialog open={isFollowUpDialogOpen} onOpenChange={setIsFollowUpDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Record LSQ Follow-up</DialogTitle>
            <DialogDescription>Record details of your follow-up with this Leadersquare enquiry.</DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="followup-status">Update Status</Label>
                <Select
                  defaultValue={selectedEnquiry.status}
                  onValueChange={(value) => setSelectedEnquiry({ ...selectedEnquiry, status: value })}
                >
                  <SelectTrigger id="followup-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Interested">Interested</SelectItem>
                    <SelectItem value="Not Interested">Not Interested</SelectItem>
                    <SelectItem value="Converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="followup-notes">Follow-up Notes</Label>
                <Textarea
                  id="followup-notes"
                  value={selectedEnquiry.notes}
                  onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, notes: e.target.value })}
                  placeholder="Enter details of your conversation"
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFollowUpDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFollowUp}>Save Follow-up</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
