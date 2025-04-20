"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileDown, Eye, BarChart } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function AdmissionStatusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [admissionData, setAdmissionData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedAdmission, setSelectedAdmission] = useState(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    const fetchAdmissionData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admissions")
        setAdmissionData(response.data)
        setFilteredData(response.data)
      } catch (error) {
        console.error("Error fetching admission data:", error)
      }
    }
    fetchAdmissionData()
  }, [])

  const handleSearch = () => {
    const filtered = admissionData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admission Status</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart className="mr-2 h-4 w-4" /> View Analytics
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter admission status by various parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <Label htmlFor="fee-status">Fee Status</Label>
              <Select>
                <SelectTrigger id="fee-status">
                  <SelectValue placeholder="Select fee status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="enrollment-status">Enrollment Status</Label>
              <Select>
                <SelectTrigger id="enrollment-status">
                  <SelectValue placeholder="Select enrollment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Enrolled">Enrolled</SelectItem>
                  <SelectItem value="Provisional">Provisional</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Admission Status Overview</CardTitle>
          <CardDescription>View and manage admission status for all students</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admission ID</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Document Status</TableHead>
                <TableHead>Enrollment Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((admission: any, index: number) => (
                <TableRow key={admission.id || index}>
                  <TableCell>{admission.admissionId}</TableCell>
                  <TableCell>{admission.studentId}</TableCell>
                  <TableCell>{admission.name}</TableCell>
                  <TableCell>{admission.course}</TableCell>
                  <TableCell>{admission.batch}</TableCell>
                  <TableCell>{admission.admissionDate}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${admission.feeStatus === "Paid"
                          ? "bg-green-100 text-green-800"
                          : admission.feeStatus === "Partially Paid"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {admission.feeStatus}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${admission.documentStatus === "Complete"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {admission.documentStatus}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${admission.enrollmentStatus === "Enrolled"
                          ? "bg-green-100 text-green-800"
                          : admission.enrollmentStatus === "Provisional"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {admission.enrollmentStatus}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedAdmission(admission)
                        setIsViewOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedAdmission(admission)
                        setIsEditOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Admission Details</DialogTitle>
            <DialogDescription>View complete information of the selected admission</DialogDescription>
          </DialogHeader>
          {selectedAdmission && (
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedAdmission.id}</p>
              <p><strong>Student ID:</strong> {selectedAdmission.studentId}</p>
              <p><strong>Name:</strong> {selectedAdmission.name}</p>
              <p><strong>Course:</strong> {selectedAdmission.course}</p>
              <p><strong>Batch:</strong> {selectedAdmission.batch}</p>
              <p><strong>Admission Date:</strong> {selectedAdmission.admissionDate}</p>
              <p><strong>Fee Status:</strong> {selectedAdmission.feeStatus}</p>
              <p><strong>Document Status:</strong> {selectedAdmission.documentStatus}</p>
              <p><strong>Enrollment Status:</strong> {selectedAdmission.enrollmentStatus}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Admission</DialogTitle>
            <DialogDescription>Update the selected admission details</DialogDescription>
          </DialogHeader>
          {selectedAdmission && (
            <div className="space-y-4">
              <Label>Name</Label>
              <Input value={selectedAdmission.name} onChange={(e) => setSelectedAdmission({ ...selectedAdmission, name: e.target.value })} />
              <Label>Course</Label>
              <Input value={selectedAdmission.course} onChange={(e) => setSelectedAdmission({ ...selectedAdmission, course: e.target.value })} />
              <Label>Batch</Label>
              <Input value={selectedAdmission.batch} onChange={(e) => setSelectedAdmission({ ...selectedAdmission, batch: e.target.value })} />
              <Label>Notes</Label>
              <Textarea value={selectedAdmission.notes || ""} onChange={(e) => setSelectedAdmission({ ...selectedAdmission, notes: e.target.value })} rows={3} />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button
              onClick={async () => {
                try {
                  await axios.put(`http://localhost:4000/api/admissions/${selectedAdmission.id}`, selectedAdmission)
                  setIsEditOpen(false)
                  const res = await axios.get("http://localhost:4000/api/admissions")
                  setAdmissionData(res.data)
                  setFilteredData(res.data)
                } catch (err) {
                  console.error("Error updating admission:", err)
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}