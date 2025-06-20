"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileDown, Printer, Eye, Calendar } from "lucide-react"

// Mock data for reports
const reportData = [
  {
    id: "RPT001",
    name: "Shortage Report - April 2023",
    type: "Shortage",
    generatedBy: "John Smith",
    generatedDate: "2023-04-15",
    format: "PDF",
    size: "1.2 MB",
  },
  {
    id: "RPT002",
    name: "Damage Report - April 2023",
    type: "Damage",
    generatedBy: "Sarah Johnson",
    generatedDate: "2023-04-15",
    format: "PDF",
    size: "1.5 MB",
  },
  {
    id: "RPT003",
    name: "Shortage Report - March 2023",
    type: "Shortage",
    generatedBy: "Michael Brown",
    generatedDate: "2023-03-15",
    format: "PDF",
    size: "1.1 MB",
  },
  {
    id: "RPT004",
    name: "Damage Report - March 2023",
    type: "Damage",
    generatedBy: "Emily Davis",
    generatedDate: "2023-03-15",
    format: "PDF",
    size: "1.3 MB",
  },
  {
    id: "RPT005",
    name: "Combined Shortage & Damage Report - Q1 2023",
    type: "Combined",
    generatedBy: "David Wilson",
    generatedDate: "2023-04-01",
    format: "PDF",
    size: "2.5 MB",
  },
]

export default function DownloadReportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(reportData)
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const handleSearch = () => {
    const filtered = reportData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.generatedBy.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Download Shortage/Damage Reports</h1>
        <Button>
          <Calendar className="mr-2 h-4 w-4" /> Generate New Report
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter reports by various parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Search by name, ID, type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="shortage">Shortage</SelectItem>
                  <SelectItem value="damage">Damage</SelectItem>
                  <SelectItem value="combined">Combined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <div className="flex gap-2 items-center">
                <Input id="date-from" type="date" />
                <span>to</span>
                <Input id="date-to" type="date" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>View and download shortage and damage reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Generated By</TableHead>
                <TableHead>Generated Date</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        report.type === "Shortage"
                          ? "bg-blue-100 text-blue-800"
                          : report.type === "Damage"
                            ? "bg-red-100 text-red-800"
                            : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {report.type}
                    </div>
                  </TableCell>
                  <TableCell>{report.generatedBy}</TableCell>
                  <TableCell>{report.generatedDate}</TableCell>
                  <TableCell>{report.format}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedReport(report.id)}>
                      <Eye className="h-4 w-4 mr-1" /> Preview
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileDown className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedReport && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Report Preview</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-1" /> Print
                </Button>
                <Button size="sm">
                  <FileDown className="h-4 w-4 mr-1" /> Download
                </Button>
              </div>
            </div>
            <CardDescription>Preview of {reportData.find((r) => r.id === selectedReport)?.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">{reportData.find((r) => r.id === selectedReport)?.name}</h2>
                <p className="text-muted-foreground">
                  Generated on {reportData.find((r) => r.id === selectedReport)?.generatedDate} by{" "}
                  {reportData.find((r) => r.id === selectedReport)?.generatedBy}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                        <p className="text-2xl font-bold">35</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                        <p className="text-2xl font-bold text-red-600">8</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                        <p className="text-2xl font-bold text-green-600">12</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-lg font-medium">Details</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Physics Textbook</TableCell>
                      <TableCell>Books</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                          High
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chemistry Lab Kit</TableCell>
                      <TableCell>Lab Equipment</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                          Medium
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                          In Progress
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Whiteboard Markers</TableCell>
                      <TableCell>Stationery</TableCell>
                      <TableCell>50</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          Low
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          Resolved
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="text-center text-sm text-muted-foreground">
                  <p>End of Report Preview</p>
                  <p>Download the full report for complete details</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
