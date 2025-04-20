"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Check, FileDown, Search } from "lucide-react"

// Mock data for staff attendance
const staffData = [
  {
    id: "STF001",
    name: "John Smith",
    department: "Computer Science",
    date: "2023-04-10",
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
    status: "Present",
  },
  {
    id: "STF002",
    name: "Sarah Johnson",
    department: "Business Administration",
    date: "2023-04-10",
    checkIn: "09:15 AM",
    checkOut: "05:30 PM",
    status: "Present",
  },
  {
    id: "STF003",
    name: "Michael Brown",
    department: "Electrical Engineering",
    date: "2023-04-10",
    checkIn: "09:05 AM",
    checkOut: "04:45 PM",
    status: "Present",
  },
  {
    id: "STF004",
    name: "Emily Davis",
    department: "Psychology",
    date: "2023-04-10",
    checkIn: "",
    checkOut: "",
    status: "Absent",
  },
  {
    id: "STF005",
    name: "David Wilson",
    department: "Mechanical Engineering",
    date: "2023-04-10",
    checkIn: "10:30 AM",
    checkOut: "05:15 PM",
    status: "Late",
  },
]

export default function StaffAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("2023-04-10")
  const [filteredData, setFilteredData] = useState(staffData)

  const handleSearch = () => {
    const filtered = staffData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Staff Attendance</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Mark Attendance
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter staff attendance by date and other parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Search by name, ID, department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => {
                  if (value === "all") {
                    setFilteredData(staffData)
                  } else {
                    setFilteredData(staffData.filter((item) => item.status.toLowerCase() === value.toLowerCase()))
                  }
                }}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Staff Attendance for {selectedDate}</CardTitle>
          <CardDescription>View and manage staff attendance records</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.id}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{staff.date}</TableCell>
                  <TableCell>{staff.checkIn || "-"}</TableCell>
                  <TableCell>{staff.checkOut || "-"}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        staff.status === "Present"
                          ? "bg-green-100 text-green-800"
                          : staff.status === "Absent"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {staff.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    {staff.status === "Absent" && (
                      <Button variant="ghost" size="sm" className="text-green-600">
                        <Check className="h-4 w-4 mr-1" /> Mark Present
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
