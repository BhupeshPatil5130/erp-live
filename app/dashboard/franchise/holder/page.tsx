"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Eye, Edit, Mail, Phone, MapPin } from "lucide-react"

// Mock data for franchise holders
const franchiseHolderData = [
  {
    id: "FH001",
    franchiseId: "FR001",
    name: "John Smith",
    email: "john@cityeducation.com",
    phone: "9876543210",
    franchiseName: "City Education Center",
    location: "Mumbai",
    type: "Premium",
    status: "Active",
  },
  {
    id: "FH002",
    franchiseId: "FR002",
    name: "Sarah Johnson",
    email: "sarah@metrolearning.com",
    phone: "8765432109",
    franchiseName: "Metro Learning Hub",
    location: "Delhi",
    type: "Standard",
    status: "Active",
  },
  {
    id: "FH003",
    franchiseId: "FR003",
    name: "Michael Brown",
    email: "michael@suburban.com",
    phone: "7654321098",
    franchiseName: "Suburban Knowledge Center",
    location: "Bangalore",
    type: "Premium",
    status: "Active",
  },
  {
    id: "FH004",
    franchiseId: "FR004",
    name: "Emily Davis",
    email: "emily@downtown.com",
    phone: "6543210987",
    franchiseName: "Downtown Institute",
    location: "Chennai",
    type: "Standard",
    status: "Inactive",
  },
  {
    id: "FH005",
    franchiseId: "FR005",
    name: "David Wilson",
    email: "david@riverside.com",
    phone: "5432109876",
    franchiseName: "Riverside Academy",
    location: "Hyderabad",
    type: "Premium",
    status: "Active",
  },
]

export default function FranchiseHolderPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(franchiseHolderData)
  const [selectedHolder, setSelectedHolder] = useState<string | null>(null)

  const handleSearch = () => {
    const filtered = franchiseHolderData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.franchiseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.franchiseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Franchise Holders</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Franchise Holder
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Holders</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by name, ID, franchise..."
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
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Franchise Holders</CardTitle>
            <CardDescription>Manage all franchise holders</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Holder ID</TableHead>
                  <TableHead>Franchise ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Franchise Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((holder) => (
                  <TableRow key={holder.id}>
                    <TableCell>{holder.id}</TableCell>
                    <TableCell>{holder.franchiseId}</TableCell>
                    <TableCell>{holder.name}</TableCell>
                    <TableCell>{holder.franchiseName}</TableCell>
                    <TableCell>{holder.location}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          holder.type === "Premium" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {holder.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          holder.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {holder.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedHolder(holder.id)}>
                        <Eye className="h-4 w-4 mr-1" /> View
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
      </Tabs>

      {selectedHolder && (
        <Card>
          <CardHeader>
            <CardTitle>Franchise Holder Details</CardTitle>
            <CardDescription>
              Detailed information about {franchiseHolderData.find((h) => h.id === selectedHolder)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">
                        {franchiseHolderData
                          .find((h) => h.id === selectedHolder)
                          ?.name.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">
                      {franchiseHolderData.find((h) => h.id === selectedHolder)?.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {franchiseHolderData.find((h) => h.id === selectedHolder)?.franchiseName}
                    </p>
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{franchiseHolderData.find((h) => h.id === selectedHolder)?.email}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{franchiseHolderData.find((h) => h.id === selectedHolder)?.phone}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{franchiseHolderData.find((h) => h.id === selectedHolder)?.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Franchise Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Franchise ID</Label>
                        <p className="font-medium">
                          {franchiseHolderData.find((h) => h.id === selectedHolder)?.franchiseId}
                        </p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Holder ID</Label>
                        <p className="font-medium">{selectedHolder}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Type</Label>
                        <p className="font-medium">{franchiseHolderData.find((h) => h.id === selectedHolder)?.type}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Status</Label>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            franchiseHolderData.find((h) => h.id === selectedHolder)?.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {franchiseHolderData.find((h) => h.id === selectedHolder)?.status}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-muted-foreground">Address</Label>
                      <p className="font-medium">
                        123 Education Street, {franchiseHolderData.find((h) => h.id === selectedHolder)?.location},
                        India
                      </p>
                    </div>

                    <div>
                      <Label className="text-muted-foreground">Agreement Details</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Start Date</p>
                          <p>01-Jan-2023</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">End Date</p>
                          <p>31-Dec-2025</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Renewal Date</p>
                          <p>01-Oct-2025</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Agreement Status</p>
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Revenue (YTD)</span>
                      <span className="font-medium">₹12,50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pending Payments</span>
                      <span className="font-medium text-red-600">₹98,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Payment</span>
                      <span className="font-medium">₹125,000 (10-Apr-2023)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Royalty Rate</span>
                      <span className="font-medium">15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Students</span>
                      <span className="font-medium">245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">New Enrollments (Last 30 days)</span>
                      <span className="font-medium">32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Satisfaction Rating</span>
                      <span className="font-medium">4.7/5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Compliance Score</span>
                      <span className="font-medium">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
