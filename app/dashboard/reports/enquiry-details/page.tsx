"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileDown, BarChart, Calendar } from "lucide-react"

// Mock data for enquiry details
const enquiryData = [
  {
    id: "ENQ001",
    name: "John Smith",
    phone: "9876543210",
    email: "john@example.com",
    course: "Computer Science",
    source: "Website",
    date: "2023-04-10",
    status: "New",
    followUpDate: "2023-04-15",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "ENQ002",
    name: "Sarah Johnson",
    phone: "8765432109",
    email: "sarah@example.com",
    course: "Business Administration",
    source: "Social Media",
    date: "2023-04-09",
    status: "Contacted",
    followUpDate: "2023-04-14",
    assignedTo: "Michael Brown",
  },
  {
    id: "ENQ003",
    name: "Michael Brown",
    phone: "7654321098",
    email: "michael@example.com",
    course: "Electrical Engineering",
    source: "Referral",
    date: "2023-04-08",
    status: "Interested",
    followUpDate: "2023-04-13",
    assignedTo: "Emily Davis",
  },
  {
    id: "ENQ004",
    name: "Emily Davis",
    phone: "6543210987",
    email: "emily@example.com",
    course: "Psychology",
    source: "Google",
    date: "2023-04-07",
    status: "Not Interested",
    followUpDate: "-",
    assignedTo: "David Wilson",
  },
  {
    id: "ENQ005",
    name: "David Wilson",
    phone: "5432109876",
    email: "david@example.com",
    course: "Mechanical Engineering",
    source: "Exhibition",
    date: "2023-04-06",
    status: "Converted",
    followUpDate: "-",
    assignedTo: "John Smith",
  },
]

export default function EnquiryDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(enquiryData)
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  const handleSearch = () => {
    const filtered = enquiryData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  const handleDateFilter = () => {
    if (!dateRange.from && !dateRange.to) return

    const filtered = enquiryData.filter((item) => {
      const enquiryDate = new Date(item.date)
      const fromDate = dateRange.from ? new Date(dateRange.from) : new Date(0)
      const toDate = dateRange.to ? new Date(dateRange.to) : new Date()

      return enquiryDate >= fromDate && enquiryDate <= toDate
    })

    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Enquiry Details Report</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart className="mr-2 h-4 w-4" /> Analytics
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter enquiry details by various parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Search by name, ID, phone, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
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
                    setFilteredData(enquiryData)
                  } else {
                    setFilteredData(enquiryData.filter((item) => item.status.toLowerCase() === value.toLowerCase()))
                  }
                }}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="interested">Interested</SelectItem>
                  <SelectItem value="not interested">Not Interested</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Enquiries</p>
                <h3 className="text-2xl font-bold">{enquiryData.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <h3 className="text-2xl font-bold">
                  {Math.round(
                    (enquiryData.filter((item) => item.status === "Converted").length / enquiryData.length) * 100,
                  )}
                  %
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Follow-ups</p>
                <h3 className="text-2xl font-bold">{enquiryData.filter((item) => item.followUpDate !== "-").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Enquiry Details</CardTitle>
          <CardDescription>Detailed report of all enquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Enquiry ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Follow-up Date</TableHead>
                <TableHead>Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell>{enquiry.id}</TableCell>
                  <TableCell>{enquiry.name}</TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div>{enquiry.phone}</div>
                      <div>{enquiry.email}</div>
                    </div>
                  </TableCell>
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
                  <TableCell>{enquiry.followUpDate}</TableCell>
                  <TableCell>{enquiry.assignedTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
