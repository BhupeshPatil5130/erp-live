"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, FileDown, AlertTriangle, Upload } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Mock data for damage reports
const damageReportData = [
  {
    id: "DR001",
    itemName: "Computer Monitor",
    category: "Electronics",
    quantity: 2,
    reportedBy: "John Smith",
    reportDate: "2023-04-10",
    damageType: "Physical Damage",
    status: "Pending",
    priority: "High",
  },
  {
    id: "DR002",
    itemName: "Student Chair",
    category: "Furniture",
    quantity: 5,
    reportedBy: "Sarah Johnson",
    reportDate: "2023-04-09",
    damageType: "Broken Parts",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "DR003",
    itemName: "Library Books",
    category: "Books",
    quantity: 10,
    reportedBy: "Michael Brown",
    reportDate: "2023-04-08",
    damageType: "Water Damage",
    status: "Resolved",
    priority: "Low",
  },
  {
    id: "DR004",
    itemName: "Projector",
    category: "Electronics",
    quantity: 1,
    reportedBy: "Emily Davis",
    reportDate: "2023-04-07",
    damageType: "Not Working",
    status: "Pending",
    priority: "High",
  },
  {
    id: "DR005",
    itemName: "Lab Equipment",
    category: "Lab Equipment",
    quantity: 3,
    reportedBy: "David Wilson",
    reportDate: "2023-04-06",
    damageType: "Broken Parts",
    status: "In Progress",
    priority: "Medium",
  },
]

export default function DamageShortagePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(damageReportData)
  const [isCreating, setIsCreating] = useState(false)

  const handleSearch = () => {
    const filtered = damageReportData.filter(
      (item) =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.damageType.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Damage Reports</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Damage Report
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
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="lab-equipment">Lab Equipment</SelectItem>
              <SelectItem value="stationery">Stationery</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileDown className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Damage Reports</CardTitle>
              <CardDescription>View and manage all damage reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Damage Type</TableHead>
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
                      <TableCell>{report.damageType}</TableCell>
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
              <CardTitle>Create New Damage Report</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
            <CardDescription>Report damaged items or materials</CardDescription>
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
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="lab-equipment">Lab Equipment</SelectItem>
                      <SelectItem value="stationery">Stationery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" min="1" placeholder="Enter quantity" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="damage-type">Damage Type</Label>
                  <Select>
                    <SelectTrigger id="damage-type">
                      <SelectValue placeholder="Select damage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physical-damage">Physical Damage</SelectItem>
                      <SelectItem value="broken-parts">Broken Parts</SelectItem>
                      <SelectItem value="water-damage">Water Damage</SelectItem>
                      <SelectItem value="not-working">Not Working</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Textarea id="description" placeholder="Provide details about the damage" rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photos">Upload Photos</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                  <Input id="photos" type="file" multiple className="max-w-xs" />
                  <p className="text-xs text-muted-foreground mt-2">Supported formats: JPG, PNG (Max size: 5MB)</p>
                </div>
              </div>
              <Button type="submit" className="w-full md:w-auto">
                <AlertTriangle className="mr-2 h-4 w-4" /> Submit Damage Report
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
