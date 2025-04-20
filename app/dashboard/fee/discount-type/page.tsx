"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Percent } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Mock data for discount types
const discountTypeData = [
  {
    id: "DT001",
    name: "Merit Scholarship",
    description: "Discount for students with excellent academic performance",
    type: "Percentage",
    value: "25%",
    maxAmount: "₹20,000",
    applicableTo: "Tuition Fee",
    status: "Active",
  },
  {
    id: "DT002",
    name: "Sibling Discount",
    description: "Discount for students with siblings already enrolled",
    type: "Percentage",
    value: "10%",
    maxAmount: "₹10,000",
    applicableTo: "Total Fee",
    status: "Active",
  },
  {
    id: "DT003",
    name: "Early Bird Discount",
    description: "Discount for early fee payment",
    type: "Fixed",
    value: "₹5,000",
    maxAmount: "₹5,000",
    applicableTo: "Total Fee",
    status: "Active",
  },
  {
    id: "DT004",
    name: "Staff Ward Discount",
    description: "Discount for children of staff members",
    type: "Percentage",
    value: "50%",
    maxAmount: "₹40,000",
    applicableTo: "Tuition Fee",
    status: "Active",
  },
  {
    id: "DT005",
    name: "Financial Aid",
    description: "Discount for students from economically weaker sections",
    type: "Percentage",
    value: "30%",
    maxAmount: "₹25,000",
    applicableTo: "Total Fee",
    status: "Active",
  },
]

// Mock data for discount applications
const discountApplicationData = [
  {
    id: "DA001",
    studentId: "STU1001",
    studentName: "John Smith",
    discountType: "Merit Scholarship",
    originalAmount: "₹75,000",
    discountAmount: "₹18,750",
    finalAmount: "₹56,250",
    approvedBy: "Sarah Johnson",
    status: "Approved",
  },
  {
    id: "DA002",
    studentId: "STU1002",
    studentName: "Emily Davis",
    discountType: "Sibling Discount",
    originalAmount: "₹65,000",
    discountAmount: "₹6,500",
    finalAmount: "₹58,500",
    approvedBy: "Michael Brown",
    status: "Approved",
  },
  {
    id: "DA003",
    studentId: "STU1003",
    studentName: "David Wilson",
    discountType: "Early Bird Discount",
    originalAmount: "₹80,000",
    discountAmount: "₹5,000",
    finalAmount: "₹75,000",
    approvedBy: "John Smith",
    status: "Approved",
  },
  {
    id: "DA004",
    studentId: "STU1004",
    studentName: "Sarah Johnson",
    discountType: "Staff Ward Discount",
    originalAmount: "₹60,000",
    discountAmount: "₹30,000",
    finalAmount: "₹30,000",
    approvedBy: "David Wilson",
    status: "Pending",
  },
  {
    id: "DA005",
    studentId: "STU1005",
    studentName: "Michael Brown",
    discountType: "Financial Aid",
    originalAmount: "₹80,000",
    discountAmount: "₹24,000",
    finalAmount: "₹56,000",
    approvedBy: "Emily Davis",
    status: "Rejected",
  },
]

export default function DiscountTypePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTypes, setFilteredTypes] = useState(discountTypeData)
  const [filteredApplications, setFilteredApplications] = useState(discountApplicationData)

  const handleTypeSearch = () => {
    const filtered = discountTypeData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredTypes(filtered)
  }

  const handleApplicationSearch = () => {
    const filtered = discountApplicationData.filter(
      (item) =>
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.discountType.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredApplications(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Discount Types</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Discount Type
        </Button>
      </div>

      <Tabs defaultValue="types" className="space-y-4">
        <TabsList>
          <TabsTrigger value="types">Discount Types</TabsTrigger>
          <TabsTrigger value="applications">Discount Applications</TabsTrigger>
          <TabsTrigger value="new">New Application</TabsTrigger>
        </TabsList>

        <TabsContent value="types" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 flex items-center gap-2">
              <Input
                placeholder="Search by name, ID, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <Button variant="outline" onClick={handleTypeSearch}>
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Discount Types</CardTitle>
              <CardDescription>Manage all discount types available in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Max Amount</TableHead>
                    <TableHead>Applicable To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTypes.map((discount) => (
                    <TableRow key={discount.id}>
                      <TableCell>{discount.id}</TableCell>
                      <TableCell>{discount.name}</TableCell>
                      <TableCell className="max-w-xs truncate" title={discount.description}>
                        {discount.description}
                      </TableCell>
                      <TableCell>{discount.type}</TableCell>
                      <TableCell>{discount.value}</TableCell>
                      <TableCell>{discount.maxAmount}</TableCell>
                      <TableCell>{discount.applicableTo}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          {discount.status}
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

        <TabsContent value="applications" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 flex items-center gap-2">
              <Input
                placeholder="Search by student, ID, discount type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <Button variant="outline" onClick={handleApplicationSearch}>
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Discount Applications</CardTitle>
              <CardDescription>View all discount applications by students</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Discount Type</TableHead>
                    <TableHead>Original Amount</TableHead>
                    <TableHead>Discount Amount</TableHead>
                    <TableHead>Final Amount</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>{application.id}</TableCell>
                      <TableCell>{application.studentId}</TableCell>
                      <TableCell>{application.studentName}</TableCell>
                      <TableCell>{application.discountType}</TableCell>
                      <TableCell>{application.originalAmount}</TableCell>
                      <TableCell className="text-red-600">{application.discountAmount}</TableCell>
                      <TableCell className="font-medium">{application.finalAmount}</TableCell>
                      <TableCell>{application.approvedBy}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            application.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : application.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {application.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        {application.status === "Pending" && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600">
                              Approve
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Reject
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Discount Application</CardTitle>
              <CardDescription>Apply a discount to a student's fee</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-id">Student ID</Label>
                    <Input id="student-id" placeholder="Enter student ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Student Name</Label>
                    <Input id="student-name" placeholder="Enter student name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-type">Discount Type</Label>
                    <Select>
                      <SelectTrigger id="discount-type">
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                      <SelectContent>
                        {discountTypeData.map((discount) => (
                          <SelectItem key={discount.id} value={discount.id}>
                            {discount.name} ({discount.value})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="original-amount">Original Amount</Label>
                    <Input id="original-amount" placeholder="Enter original fee amount" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-amount">Discount Amount</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="discount-amount" placeholder="Calculated discount amount" className="pl-9" disabled />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="final-amount">Final Amount</Label>
                    <Input id="final-amount" placeholder="Final amount after discount" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Discount</Label>
                  <Textarea id="reason" placeholder="Enter reason for applying this discount" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supporting-doc">Supporting Document (if any)</Label>
                  <Input id="supporting-doc" type="file" />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
