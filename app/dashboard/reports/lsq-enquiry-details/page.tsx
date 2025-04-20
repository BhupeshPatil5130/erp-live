"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DownloadIcon, FilterIcon, SearchIcon } from "lucide-react"

// Mock data for LSQ enquiry details
const lsqEnquiryData = [
  {
    id: "LSQ001",
    name: "John Smith",
    phone: "9876543210",
    email: "john@example.com",
    course: "Computer Science",
    source: "Website",
    date: "2023-04-10",
    status: "New",
    followUpDate: "2023-04-15",
    assignedTo: "Sarah Johnson",
    lsqId: "LSQID123456",
  },
  {
    id: "LSQ002",
    name: "Sarah Johnson",
    phone: "8765432109",
    email: "sarah@example.com",
    course: "Business Administration",
    source: "Social Media",
    date: "2023-04-09",
    status: "Contacted",
    followUpDate: "2023-04-14",
    assignedTo: "Michael Brown",
    lsqId: "LSQID123457",
  },
  {
    id: "LSQ003",
    name: "Michael Brown",
    phone: "7654321098",
    email: "michael@example.com",
    course: "Electrical Engineering",
    source: "Referral",
    date: "2023-04-08",
    status: "Interested",
    followUpDate: "2023-04-13",
    assignedTo: "Emily Davis",
    lsqId: "LSQID123458",
  },
  {
    id: "LSQ004",
    name: "Emily Davis",
    phone: "6543210987",
    email: "emily@example.com",
    course: "Psychology",
    source: "Google",
    date: "2023-04-07",
    status: "Not Interested",
    followUpDate: "-",
    assignedTo: "David Wilson",
    lsqId: "LSQID123459",
  },
  {
    id: "LSQ005",
    name: "David Wilson",
    phone: "5432109876",
    email: "david@example.com",
    course: "Mechanical Engineering",
    source: "Exhibition",
    date: "2023-04-06",
    status: "Enrolled",
    followUpDate: "-",
    assignedTo: "John Smith",
    lsqId: "LSQID123460",
  },
]

export default function LSQEnquiryDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sourceFilter, setSourceFilter] = useState("All")
  const [dateFilter, setDateFilter] = useState("")

  // Filter data based on search term and filters
  const filteredData = lsqEnquiryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.lsqId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || item.status === statusFilter
    const matchesSource = sourceFilter === "All" || item.source === sourceFilter
    const matchesDate = !dateFilter || item.date === dateFilter

    return matchesSearch && matchesStatus && matchesSource && matchesDate
  })

  // Function to handle export to CSV
  const handleExport = () => {
    // In a real application, this would generate and download a CSV file
    console.log("Exporting data to CSV...")
    alert("Export functionality would be implemented here")
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>LSQ Enquiry Details Report</CardTitle>
          <CardDescription>View and analyze all LSQ enquiries in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, phone or LSQ ID"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Interested">Interested</SelectItem>
                    <SelectItem value="Not Interested">Not Interested</SelectItem>
                    <SelectItem value="Enrolled">Enrolled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Sources</SelectItem>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="Exhibition">Exhibition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
              </div>
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleExport}>
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>LSQ ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Follow-up Date</TableHead>
                  <TableHead>Assigned To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.lsqId}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.course}</TableCell>
                      <TableCell>{item.source}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "New"
                              ? "bg-blue-100 text-blue-800"
                              : item.status === "Contacted"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.status === "Interested"
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "Not Interested"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>{item.followUpDate}</TableCell>
                      <TableCell>{item.assignedTo}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">
                      No enquiries found matching the criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredData.length} of {lsqEnquiryData.length} entries
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={true}>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={true}>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
