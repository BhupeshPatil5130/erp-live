"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, FileDown, AlertTriangle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Mock data for shortage reports
const shortageReportData = [
  {
    id: "SR001",
    itemName: "Physics Textbook",
    category: "Books",
    quantity: 15,
    reportedBy: "John Smith",
    reportDate: "2023-04-10",
    status: "Pending",
    priority: "High",
  },
  {
    id: "SR002",
    itemName: "Chemistry Lab Kit",
    category: "Lab Equipment",
    quantity: 8,
    reportedBy: "Sarah Johnson",
    reportDate: "2023-04-09",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "SR003",
    itemName: "Whiteboard Markers",
    category: "Stationery",
    quantity: 50,
    reportedBy: "Michael Brown",
    reportDate: "2023-04-08",
    status: "Resolved",
    priority: "Low",
  },
  {
    id: "SR004",
    itemName: "Computer Monitors",
    category: "Electronics",
    quantity: 5,
    reportedBy: "Emily Davis",
    reportDate: "2023-04-07",
    status: "Pending",
    priority: "High",
  },
  {
    id: "SR005",
    itemName: "Student Desks",
    category: "Furniture",
    quantity: 10,
    reportedBy: "David Wilson",
    reportDate: "2023-04-06",
    status: "In Progress",
    priority: "Medium",
  },
]

export default function ReportShortagePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(shortageReportData)
  const [isCreating, setIsCreating] = useState(false)

  const handleSearch = () => {
    const filtered = shortageReportData.filter(
      (item) =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Report Shortage</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Shortage Report
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by item name, ID, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Button variant="outline" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="lab-equipment">Lab Equipment</SelectItem>
              <SelectItem value="stationery">Stationery</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileDown className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Shortage Reports</CardTitle>
              <CardDescription>View and manage all shortage reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Report Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.itemName}</TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>{report.quantity}</TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>{report.reportDate}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            report.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : report.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {report.priority}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            report.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : report.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {report.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Update
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

      {isCreating && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Create New Shortage Report</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
            <CardDescription>Report a shortage of items or materials</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input id="item-name" placeholder="Enter item name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="lab-equipment">Lab Equipment</SelectItem>
                      <SelectItem value="stationery">Stationery</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" min="1" placeholder="Enter quantity" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Provide details about the shortage" rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="impact">Impact</Label>
                <Textarea id="impact" placeholder="Describe the impact of this shortage" rows={2} />
              </div>
              <Button type="submit" className="w-full md:w-auto">
                <AlertTriangle className="mr-2 h-4 w-4" /> Submit Shortage Report
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
