"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Eye, Download, Calendar } from "lucide-react"

// Mock data for admission details
const admissionData = [
  {
    id: "ADM001",
    studentId: "STU1001",
    name: "John Smith",
    course: "Computer Science",
    batch: "2023-24",
    admissionDate: "2023-04-10",
    status: "Active",
    fee: "₹75,000",
  },
  {
    id: "ADM002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    course: "Business Administration",
    batch: "2023-24",
    admissionDate: "2023-04-09",
    status: "Active",
    fee: "₹65,000",
  },
  {
    id: "ADM003",
    studentId: "STU1003",
    name: "Michael Brown",
    course: "Electrical Engineering",
    batch: "2023-24",
    admissionDate: "2023-04-08",
    status: "Pending",
    fee: "₹80,000",
  },
  {
    id: "ADM004",
    studentId: "STU1004",
    name: "Emily Davis",
    course: "Psychology",
    batch: "2023-24",
    admissionDate: "2023-04-07",
    status: "Active",
    fee: "₹60,000",
  },
  {
    id: "ADM005",
    studentId: "STU1005",
    name: "David Wilson",
    course: "Mechanical Engineering",
    batch: "2023-24",
    admissionDate: "2023-04-06",
    status: "Cancelled",
    fee: "₹80,000",
  },
  {
    id: "ADM006",
    studentId: "STU1006",
    name: "Jennifer Lee",
    course: "Computer Science",
    batch: "2023-24",
    admissionDate: "2023-04-05",
    status: "Active",
    fee: "₹75,000",
  },
  {
    id: "ADM007",
    studentId: "STU1007",
    name: "Robert Taylor",
    course: "Business Administration",
    batch: "2023-24",
    admissionDate: "2023-04-04",
    status: "Active",
    fee: "₹65,000",
  },
  {
    id: "ADM008",
    studentId: "STU1008",
    name: "Jessica Clark",
    course: "Electrical Engineering",
    batch: "2023-24",
    admissionDate: "2023-04-03",
    status: "Pending",
    fee: "₹80,000",
  },
]

export default function AdmissionDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(admissionData)
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  const handleSearch = () => {
    const filtered = admissionData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  const handleDateFilter = () => {
    if (!dateRange.from && !dateRange.to) return

    const filtered = admissionData.filter((item) => {
      const admissionDate = new Date(item.admissionDate)
      const fromDate = dateRange.from ? new Date(dateRange.from) : new Date(0)
      const toDate = dateRange.to ? new Date(dateRange.to) : new Date()

      return admissionDate >= fromDate && admissionDate <= toDate
    })

    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admission Details</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter admission details by various parameters</CardDescription>
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
              <Label htmlFor="date-from">Date Range</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="date-from"
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                />
                <span>to</span>
                <Input
                  id="date-to"
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                />
                <Button variant="outline" onClick={handleDateFilter}>
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => {
                  if (value === "all") {
                    setFilteredData(admissionData)
                  } else {
                    setFilteredData(admissionData.filter((item) => item.status.toLowerCase() === value.toLowerCase()))
                  }
                }}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Admissions</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Admission Details</CardTitle>
              <CardDescription>Showing {filteredData.length} admission records</CardDescription>
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
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((admission) => (
                    <TableRow key={admission.id}>
                      <TableCell>{admission.id}</TableCell>
                      <TableCell>{admission.studentId}</TableCell>
                      <TableCell>{admission.name}</TableCell>
                      <TableCell>{admission.course}</TableCell>
                      <TableCell>{admission.batch}</TableCell>
                      <TableCell>{admission.admissionDate}</TableCell>
                      <TableCell>{admission.fee}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            admission.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : admission.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {admission.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" /> Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would follow the same pattern with filtered data */}
      </Tabs>
    </div>
  )
}
