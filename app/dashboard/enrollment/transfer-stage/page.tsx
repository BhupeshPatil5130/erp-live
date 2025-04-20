// Final UI with Backend Integration
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowRight, Check, X, Eye, Edit, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Stage options
const stageOptions = ["Admission", "Enrollment", "Course Allocation", "Fee Payment", "Class Assignment", "Graduation"]

export default function TransferStagePage() {
  const { toast } = useToast()
  const [transferData, setTransferData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [selectedTransfer, setSelectedTransfer] = useState<any>(null)
  const [newTransfer, setNewTransfer] = useState({
    studentId: "",
    name: "",
    currentStage: "",
    nextStage: "",
    notes: "",
  })

  useEffect(() => {
    fetchTransfers()
  }, [])

  const handleAddTransfer = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transfers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransfer),
      })
      if (!res.ok) throw new Error("Failed to add transfer")
      toast({ title: "Added", description: `${newTransfer.name} has been added.` })
      fetchTransfers()
      setIsAddDialogOpen(false)
      setNewTransfer({ studentId: "", name: "", currentStage: "", nextStage: "", notes: "" })
    } catch (err) {
      toast({ title: "Add Failed", description: err.message, variant: "destructive" })
    }
  }
  const handleEditTransfer = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transfers/${selectedTransfer._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedTransfer),
      })
      if (!res.ok) throw new Error("Failed to update transfer request")
      toast({ title: "Updated", description: `${selectedTransfer.name} has been updated.` })
      fetchTransfers()
      setIsEditDialogOpen(false)
    } catch (err) {
      toast({ title: "Update Failed", description: err.message, variant: "destructive" })
    }
  }
  const handleDeleteTransfer = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transfers/${selectedTransfer._id}`, {
        method: "DELETE"
      })
      if (!res.ok) throw new Error("Failed to delete transfer request")
      toast({ title: "Deleted", description: `${selectedTransfer.name} has been deleted.` })
      fetchTransfers()
      setIsDeleteDialogOpen(false)
    } catch (err) {
      toast({ title: "Delete Failed", description: err.message, variant: "destructive" })
    }
  }
  const handleApproveTransfer = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transfers/${selectedTransfer._id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: selectedTransfer.notes }),
      })
      if (!res.ok) throw new Error("Failed to approve transfer request")
      toast({ title: "Approved", description: `${selectedTransfer.name}'s transfer was approved.` })
      fetchTransfers()
      setIsApproveDialogOpen(false)
    } catch (err) {
      toast({ title: "Approve Failed", description: err.message, variant: "destructive" })
    }
  } 
  const handleRejectTransfer = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transfers/${selectedTransfer._id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: selectedTransfer.notes }),
      })
      if (!res.ok) throw new Error("Failed to reject transfer request")
      toast({ title: "Rejected", description: `${selectedTransfer.name}'s transfer was rejected.` })
      fetchTransfers()
      setIsRejectDialogOpen(false)
    } catch (err) {
      toast({ title: "Reject Failed", description: err.message, variant: "destructive" })
    }
  }
  const fetchTransfers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transfers`)
      const data = await res.json()
      setTransferData(data)
      setFilteredData(data)
    } catch (err) {
      toast({ title: "Fetch Error", description: err.message, variant: "destructive" })
    }
  }

  const handleSearch = () => {
    const filtered = transferData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.currentStage.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nextStage.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredData(filtered)
  }

  const filterByCurrentStage = (stage: string) => {
    if (stage === "all") setFilteredData(transferData)
    else setFilteredData(transferData.filter((item) => item.currentStage.toLowerCase() === stage.toLowerCase()))
  }

  const filterByStatus = (status: string) => {
    if (status === "all") setFilteredData(transferData)
    else setFilteredData(transferData.filter((item) => item.status.toLowerCase() === status.toLowerCase()))
  }

  // update rest of CRUD to use the same fetch logic...

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Transfer Stage</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <ArrowRight className="mr-2 h-4 w-4" /> New Transfer Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Transfer Request</DialogTitle>
              <DialogDescription>
                Enter the details for the new transfer stage request. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student-id">Student ID</Label>
                  <Input
                    id="student-id"
                    value={newTransfer.studentId}
                    onChange={(e) => setNewTransfer({ ...newTransfer, studentId: e.target.value })}
                    placeholder="Enter student ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Student Name</Label>
                  <Input
                    id="name"
                    value={newTransfer.name}
                    onChange={(e) => setNewTransfer({ ...newTransfer, name: e.target.value })}
                    placeholder="Enter student name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-stage">Current Stage</Label>
                  <Select onValueChange={(value) => setNewTransfer({ ...newTransfer, currentStage: value })}>
                    <SelectTrigger id="current-stage">
                      <SelectValue placeholder="Select current stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stageOptions.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="next-stage">Next Stage</Label>
                  <Select onValueChange={(value) => setNewTransfer({ ...newTransfer, nextStage: value })}>
                    <SelectTrigger id="next-stage">
                      <SelectValue placeholder="Select next stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stageOptions.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
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
                  value={newTransfer.notes}
                  onChange={(e) => setNewTransfer({ ...newTransfer, notes: e.target.value })}
                  placeholder="Enter any additional information"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTransfer}>Save Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter transfer requests by various parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Search by name, ID, stage..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-stage-filter">Current Stage</Label>
              <Select onValueChange={filterByCurrentStage}>
                <SelectTrigger id="current-stage-filter">
                  <SelectValue placeholder="Select current stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  {stageOptions.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select onValueChange={filterByStatus}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Transfer Stage Requests</CardTitle>
          <CardDescription>Manage student transfer stage requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead>Next Stage</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell>{transfer.id}</TableCell>
                  <TableCell>{transfer.studentId}</TableCell>
                  <TableCell>{transfer.name}</TableCell>
                  <TableCell>{transfer.currentStage}</TableCell>
                  <TableCell>{transfer.nextStage}</TableCell>
                  <TableCell>{transfer.requestDate}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        transfer.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : transfer.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transfer.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedTransfer(transfer)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedTransfer(transfer)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {transfer.status === "Pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600"
                            onClick={() => {
                              setSelectedTransfer(transfer)
                              setIsApproveDialogOpen(true)
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600"
                            onClick={() => {
                              setSelectedTransfer(transfer)
                              setIsRejectDialogOpen(true)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedTransfer(transfer)
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

      {/* View Transfer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Transfer Request Details</DialogTitle>
            <DialogDescription>Detailed information about the transfer request.</DialogDescription>
          </DialogHeader>
          {selectedTransfer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Request ID</h3>
                  <p>{selectedTransfer.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Request Date</h3>
                  <p>{selectedTransfer.requestDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
                  <p>{selectedTransfer.studentId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Student Name</h3>
                  <p>{selectedTransfer.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Current Stage</h3>
                  <p>{selectedTransfer.currentStage}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Next Stage</h3>
                  <p>{selectedTransfer.nextStage}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedTransfer.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedTransfer.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedTransfer.status}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="text-sm">{selectedTransfer.notes}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedTransfer && selectedTransfer.status === "Pending" && (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false)
                  setIsApproveDialogOpen(true)
                }}
              >
                Approve Request
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Transfer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Transfer Request</DialogTitle>
            <DialogDescription>Update the transfer request details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedTransfer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-student-id">Student ID</Label>
                  <Input
                    id="edit-student-id"
                    value={selectedTransfer.studentId}
                    onChange={(e) => setSelectedTransfer({ ...selectedTransfer, studentId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Student Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedTransfer.name}
                    onChange={(e) => setSelectedTransfer({ ...selectedTransfer, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-current-stage">Current Stage</Label>
                  <Select
                    defaultValue={selectedTransfer.currentStage}
                    onValueChange={(value) => setSelectedTransfer({ ...selectedTransfer, currentStage: value })}
                  >
                    <SelectTrigger id="edit-current-stage">
                      <SelectValue placeholder="Select current stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stageOptions.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-next-stage">Next Stage</Label>
                  <Select
                    defaultValue={selectedTransfer.nextStage}
                    onValueChange={(value) => setSelectedTransfer({ ...selectedTransfer, nextStage: value })}
                  >
                    <SelectTrigger id="edit-next-stage">
                      <SelectValue placeholder="Select next stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stageOptions.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  defaultValue={selectedTransfer.status}
                  onValueChange={(value) => setSelectedTransfer({ ...selectedTransfer, status: value })}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedTransfer.notes}
                  onChange={(e) => setSelectedTransfer({ ...selectedTransfer, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTransfer}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this transfer request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTransfer}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Approve Transfer Request</DialogTitle>
            <DialogDescription>Confirm approval of this transfer stage request.</DialogDescription>
          </DialogHeader>
          {selectedTransfer && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium">Request Information</h3>
                <p className="text-sm">
                  <span className="font-medium">Student:</span> {selectedTransfer.name} ({selectedTransfer.studentId})
                </p>
                <p className="text-sm">
                  <span className="font-medium">Current Stage:</span> {selectedTransfer.currentStage}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Next Stage:</span> {selectedTransfer.nextStage}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="approval-notes">Approval Notes</Label>
                <Textarea
                  id="approval-notes"
                  value={selectedTransfer.notes}
                  onChange={(e) => setSelectedTransfer({ ...selectedTransfer, notes: e.target.value })}
                  placeholder="Enter any notes for approval"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveTransfer}>Approve Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reject Transfer Request</DialogTitle>
            <DialogDescription>Provide a reason for rejecting this transfer stage request.</DialogDescription>
          </DialogHeader>
          {selectedTransfer && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium">Request Information</h3>
                <p className="text-sm">
                  <span className="font-medium">Student:</span> {selectedTransfer.name} ({selectedTransfer.studentId})
                </p>
                <p className="text-sm">
                  <span className="font-medium">Current Stage:</span> {selectedTransfer.currentStage}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Next Stage:</span> {selectedTransfer.nextStage}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rejection-notes">Rejection Reason</Label>
                <Textarea
                  id="rejection-notes"
                  value={selectedTransfer.notes}
                  onChange={(e) => setSelectedTransfer({ ...selectedTransfer, notes: e.target.value })}
                  placeholder="Enter reason for rejection"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectTransfer}>
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
