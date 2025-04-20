"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, FileDown } from "lucide-react"

// Mock data for fee structures
const feeStructureData = [
  {
    id: "FS001",
    name: "Computer Science - 2023",
    course: "Computer Science",
    batch: "2023-24",
    totalFee: "₹75,000",
    components: 5,
    status: "Active",
  },
  {
    id: "FS002",
    name: "Business Administration - 2023",
    course: "Business Administration",
    batch: "2023-24",
    totalFee: "₹65,000",
    components: 4,
    status: "Active",
  },
  {
    id: "FS003",
    name: "Electrical Engineering - 2023",
    course: "Electrical Engineering",
    batch: "2023-24",
    totalFee: "₹80,000",
    components: 6,
    status: "Active",
  },
  {
    id: "FS004",
    name: "Psychology - 2023",
    course: "Psychology",
    batch: "2023-24",
    totalFee: "₹60,000",
    components: 4,
    status: "Active",
  },
  {
    id: "FS005",
    name: "Mechanical Engineering - 2023",
    course: "Mechanical Engineering",
    batch: "2023-24",
    totalFee: "₹80,000",
    components: 6,
    status: "Active",
  },
]

// Mock data for fee components
const feeComponentData = [
  { id: "FC001", name: "Tuition Fee", description: "Basic tuition fee", type: "Mandatory" },
  { id: "FC002", name: "Development Fee", description: "For infrastructure development", type: "Mandatory" },
  { id: "FC003", name: "Library Fee", description: "For library services", type: "Mandatory" },
  { id: "FC004", name: "Laboratory Fee", description: "For laboratory facilities", type: "Course Specific" },
  { id: "FC005", name: "Examination Fee", description: "For conducting examinations", type: "Mandatory" },
  { id: "FC006", name: "Sports Fee", description: "For sports facilities", type: "Optional" },
  { id: "FC007", name: "Hostel Fee", description: "For hostel accommodation", type: "Optional" },
  { id: "FC008", name: "Transportation Fee", description: "For transportation services", type: "Optional" },
]

// Mock data for detailed fee structure
const detailedFeeData = [
  {
    id: 1,
    component: "Tuition Fee",
    amount: "₹50,000",
    installments: "Yes",
    installmentDetails: "2 installments of ₹25,000 each",
  },
  {
    id: 2,
    component: "Development Fee",
    amount: "₹10,000",
    installments: "No",
    installmentDetails: "-",
  },
  {
    id: 3,
    component: "Library Fee",
    amount: "₹5,000",
    installments: "No",
    installmentDetails: "-",
  },
  {
    id: 4,
    component: "Laboratory Fee",
    amount: "₹7,000",
    installments: "No",
    installmentDetails: "-",
  },
  {
    id: 5,
    component: "Examination Fee",
    amount: "₹3,000",
    installments: "No",
    installmentDetails: "-",
  },
]

export default function FeeStructurePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(feeStructureData)
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null)

  const handleSearch = () => {
    const filtered = feeStructureData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fee Structure</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Structure
          </Button>
        </div>
      </div>

      <Tabs defaultValue="structures" className="space-y-4">
        <TabsList>
          <TabsTrigger value="structures">Fee Structures</TabsTrigger>
          <TabsTrigger value="components">Fee Components</TabsTrigger>
          <TabsTrigger value="details">Structure Details</TabsTrigger>
        </TabsList>

        <TabsContent value="structures" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 flex items-center gap-2">
              <Input
                placeholder="Search by name, ID, course..."
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
                <SelectValue placeholder="Filter by Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2022-23">2022-23</SelectItem>
                <SelectItem value="2021-22">2021-22</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Fee Structures</CardTitle>
              <CardDescription>Manage all fee structures for different courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Structure ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Total Fee</TableHead>
                    <TableHead>Components</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((structure) => (
                    <TableRow key={structure.id}>
                      <TableCell>{structure.id}</TableCell>
                      <TableCell>{structure.name}</TableCell>
                      <TableCell>{structure.course}</TableCell>
                      <TableCell>{structure.batch}</TableCell>
                      <TableCell>{structure.totalFee}</TableCell>
                      <TableCell>{structure.components}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          {structure.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedStructure(structure.id)}>
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <Input placeholder="Search components..." className="max-w-md" />
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Component
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Fee Components</CardTitle>
              <CardDescription>Manage all fee components that can be used in fee structures</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeComponentData.map((component) => (
                    <TableRow key={component.id}>
                      <TableCell>{component.id}</TableCell>
                      <TableCell>{component.name}</TableCell>
                      <TableCell>{component.description}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            component.type === "Mandatory"
                              ? "bg-blue-100 text-blue-800"
                              : component.type === "Course Specific"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {component.type}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure Details</CardTitle>
              <CardDescription>View detailed breakdown of a fee structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="structure-select">Select Fee Structure</Label>
                  <Select value={selectedStructure || undefined} onValueChange={(value) => setSelectedStructure(value)}>
                    <SelectTrigger id="structure-select">
                      <SelectValue placeholder="Select a fee structure" />
                    </SelectTrigger>
                    <SelectContent>
                      {feeStructureData.map((structure) => (
                        <SelectItem key={structure.id} value={structure.id}>
                          {structure.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedStructure && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Course</p>
                            <p className="text-lg font-medium">
                              {feeStructureData.find((s) => s.id === selectedStructure)?.course}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Batch</p>
                            <p className="text-lg font-medium">
                              {feeStructureData.find((s) => s.id === selectedStructure)?.batch}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Fee</p>
                            <p className="text-lg font-medium">
                              {feeStructureData.find((s) => s.id === selectedStructure)?.totalFee}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Component</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Installments Allowed</TableHead>
                          <TableHead>Installment Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {detailedFeeData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.component}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>{item.installments}</TableCell>
                            <TableCell>{item.installmentDetails}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
