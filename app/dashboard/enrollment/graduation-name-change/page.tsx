"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Search, FileDown, Filter, Eye, Check, X, Edit, Trash } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function GraduationNameChangePage() {
  const { toast } = useToast()
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [requests, setRequests] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [activeTab, setActiveTab] = useState("all")
  const [newRequest, setNewRequest] = useState({
    studentId: "",
    oldName: "",
    newName: "",
    reason: "",
    supportingDocs: []
  })

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    const res = await fetch("http://localhost:4000/api/Graduationnamechangeconfirmation")
    const data = await res.json()
    setRequests(data)
    setFilteredData(data)
  }

  const handleSearch = () => {
    const filtered = requests.filter((item) =>
      item.oldName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.newName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredData(filtered)
  }

  const handleTabChange = (value) => {
    setActiveTab(value)
    if (value === "all") setFilteredData(requests)
    else setFilteredData(requests.filter((item) => item.status.toLowerCase() === value))
  }

  const updateStatus = async (id, status) => {
    const res = await fetch(`http://localhost:4000/api/Graduationnamechangeconfirmation/${id}/${status}`, {
      method: "POST",
    })
    if (res.ok) {
      toast({ title: `Request ${status.charAt(0).toUpperCase() + status.slice(1)}` })
      fetchRequests()
    }
  }

  const deleteRequest = async (id) => {
    const res = await fetch(`http://localhost:4000/api/Graduationnamechangeconfirmation/${id}`, {
      method: "DELETE"
    })
    if (res.ok) {
      toast({ title: "Request Deleted" })
      fetchRequests()
    } else {
      toast({ title: "Failed to delete", variant: "destructive" })
    }
  }

  const handleSubmitRequest = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(newRequest).forEach(([key, value]) => {
      if (key === "supportingDocs") {
        value.forEach((file) => formData.append("supportingDocs", file))
      } else {
        formData.append(key, value)
      }
    })

    const res = await fetch("http://localhost:4000/api/Graduationnamechangeconfirmation", {
      method: "POST",
      body: formData
    })

    if (res.ok) {
      toast({ title: "Request Submitted" })
      setNewRequest({ studentId: "", oldName: "", newName: "", reason: "", supportingDocs: [] })
      fetchRequests()
    } else {
      toast({ title: "Submission Failed", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Graduation Name Change Confirmation</h1>
        <Button><FileDown className="mr-2 h-4 w-4" /> Export Report</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by name, ID, reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Button variant="outline" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          <Button variant="outline"><FileDown className="h-4 w-4 mr-2" /> Export</Button>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Name Change Requests</CardTitle>
              <CardDescription>Manage graduation name change requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Current Name</TableHead>
                    <TableHead>Requested Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((request) => (
                    <TableRow key={request._id}>
                      <TableCell>{request.studentId}</TableCell>
                      <TableCell>{request.oldName}</TableCell>
                      <TableCell>{request.newName}</TableCell>
                      <TableCell>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          request.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                          request.status === "Approved" ? "bg-green-100 text-green-800" :
                          "bg-red-100 text-red-800"}`}>{request.status}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {request.status === "Pending" && (
                            <>
                              <Button size="icon" variant="ghost" onClick={() => updateStatus(request._id, "approve")}><Check className="h-4 w-4 text-green-600" /></Button>
                              <Button size="icon" variant="ghost" onClick={() => updateStatus(request._id, "reject")}><X className="h-4 w-4 text-red-600" /></Button>
                            </>
                          )}
                          <Button size="icon" variant="ghost" onClick={() => { setSelectedRequest(request); setIsViewOpen(true) }}><Eye className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => { setSelectedRequest(request); setIsEditOpen(true) }}><Edit className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => deleteRequest(request._id)}><Trash className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
  <DialogContent className="sm:max-w-lg">
    <DialogHeader>
      <DialogTitle>View Request Details</DialogTitle>
    </DialogHeader>
    {selectedRequest && (
      <div className="space-y-4">
        <p><strong>Student ID:</strong> {selectedRequest.studentId}</p>
        <p><strong>Current Name:</strong> {selectedRequest.oldName}</p>
        <p><strong>Requested Name:</strong> {selectedRequest.newName}</p>
        <p><strong>Reason:</strong> {selectedRequest.reason}</p>
        <p><strong>Status:</strong> {selectedRequest.status}</p>

        <div>
          <strong>Supporting Documents:</strong>
          <ul className="list-disc list-inside space-y-2">
            {(selectedRequest.supportingDocs || []).map((doc, index) => {
              const fileUrl = `http://localhost:4000/${doc.replace(/^.*?uploads[\\/]/, "uploads/")}`

              const isImage = /\.(jpg|jpeg|png)$/i.test(doc)
              const isPdf = /\.pdf$/i.test(doc)

              return (
                <li key={index}>
                  {isImage ? (
                    <img src={fileUrl} alt={`doc-${index}`} className="h-32 rounded shadow" />
                  ) : isPdf ? (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View PDF Document {index + 1}
                    </a>
                  ) : (
                    <span>Unsupported file type</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label>Student ID</Label>
                  <Input value={selectedRequest.studentId} onChange={(e) => setSelectedRequest({ ...selectedRequest, studentId: e.target.value })} />
                </div>
                <div>
                  <Label>Current Name</Label>
                  <Input value={selectedRequest.oldName} onChange={(e) => setSelectedRequest({ ...selectedRequest, oldName: e.target.value })} />
                </div>
                <div>
                  <Label>Requested Name</Label>
                  <Input value={selectedRequest.newName} onChange={(e) => setSelectedRequest({ ...selectedRequest, newName: e.target.value })} />
                </div>
                <div>
                  <Label>Reason</Label>
                  <Textarea value={selectedRequest.reason} onChange={(e) => setSelectedRequest({ ...selectedRequest, reason: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                <Button type="button" onClick={async () => {
                  const res = await fetch(`http://localhost:4000/api/Graduationnamechangeconfirmation/${selectedRequest._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(selectedRequest)
                  })
                  if (res.ok) {
                    toast({ title: "Request Updated" })
                    setIsEditOpen(false)
                    fetchRequests()
                  } else {
                    toast({ title: "Update Failed", variant: "destructive" })
                  }
                }}>Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Submit New Name Change Request</CardTitle>
          <CardDescription>Fill in the details to submit a new name change request</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmitRequest}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student-id">Student ID</Label>
                <Input
                  id="student-id"
                  placeholder="Enter student ID"
                  value={newRequest.studentId}
                  onChange={(e) => setNewRequest({ ...newRequest, studentId: e.target.value })}
                  required
              
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-name">Current Name</Label>
                <Input
                  id="current-name"
                  placeholder="Current name as per records"
                  value={newRequest.oldName}
                  onChange={(e) => setNewRequest({ ...newRequest, oldName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-name">New Name</Label>
                <Input
                  id="new-name"
                  placeholder="Requested new name"
                  value={newRequest.newName}
                  onChange={(e) => setNewRequest({ ...newRequest, newName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supporting-doc">Supporting Documents</Label>
                <Input
                  id="supporting-doc"
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setNewRequest({
                        ...newRequest,
                        supportingDocs: Array.from(e.target.files),
                      })
                    }
                  }}
                  required
                />
                <p className="text-xs text-gray-500">
                  Upload ID proof, affidavit, or any other supporting documents (PDF, JPG, PNG)
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Name Change</Label>
              <Textarea
                id="reason"
                placeholder="Provide detailed reason for name change request"
                rows={4}
                value={newRequest.reason}
                onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Submit Request</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}