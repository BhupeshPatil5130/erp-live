"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, FileText, DollarSign, Search, Plus, Edit, Eye, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

// Sample data for agreements
const agreementData = [
  {
    id: "AGR001",
    franchiseName: "EuroKids Bandra",
    owner: "Rajesh Sharma",
    startDate: "2022-04-01",
    endDate: "2027-03-31",
    status: "Active",
    royaltyRate: "8%",
  },
  {
    id: "AGR002",
    franchiseName: "EuroKids Koramangala",
    owner: "Priya Patel",
    startDate: "2021-06-15",
    endDate: "2026-06-14",
    status: "Active",
    royaltyRate: "7.5%",
  },
  {
    id: "AGR003",
    franchiseName: "EuroKids Adyar",
    owner: "Karthik Rajan",
    startDate: "2023-01-10",
    endDate: "2028-01-09",
    status: "Active",
    royaltyRate: "8%",
  },
  {
    id: "AGR004",
    franchiseName: "EuroKids Jubilee Hills",
    owner: "Ananya Reddy",
    startDate: "2023-05-20",
    endDate: "2028-05-19",
    status: "Pending",
    royaltyRate: "7.5%",
  },
  {
    id: "AGR005",
    franchiseName: "EuroKids Salt Lake",
    owner: "Debashish Roy",
    startDate: "2022-08-15",
    endDate: "2027-08-14",
    status: "Active",
    royaltyRate: "8%",
  },
]

// Sample data for royalty payments
const royaltyData = [
  {
    id: "ROY001",
    franchiseName: "EuroKids Bandra",
    month: "March 2023",
    revenue: 1250000,
    royaltyAmount: 100000,
    status: "Paid",
    paymentDate: "2023-04-05",
  },
  {
    id: "ROY002",
    franchiseName: "EuroKids Koramangala",
    month: "March 2023",
    revenue: 980000,
    royaltyAmount: 73500,
    status: "Paid",
    paymentDate: "2023-04-03",
  },
  {
    id: "ROY003",
    franchiseName: "EuroKids Adyar",
    month: "March 2023",
    revenue: 850000,
    royaltyAmount: 68000,
    status: "Pending",
    paymentDate: "-",
  },
  {
    id: "ROY004",
    franchiseName: "EuroKids Jubilee Hills",
    month: "March 2023",
    revenue: 920000,
    royaltyAmount: 69000,
    status: "Pending",
    paymentDate: "-",
  },
  {
    id: "ROY005",
    franchiseName: "EuroKids Salt Lake",
    month: "March 2023",
    revenue: 780000,
    royaltyAmount: 62400,
    status: "Paid",
    paymentDate: "2023-04-07",
  },
]

// Sample data for revenue chart
const revenueData = [
  { month: "Jan", bandra: 980000, koramangala: 850000, adyar: 720000, jubileeHills: 800000, saltLake: 650000 },
  { month: "Feb", bandra: 1050000, koramangala: 920000, adyar: 780000, jubileeHills: 850000, saltLake: 700000 },
  { month: "Mar", bandra: 1250000, koramangala: 980000, adyar: 850000, jubileeHills: 920000, saltLake: 780000 },
  { month: "Apr", bandra: 1100000, koramangala: 900000, adyar: 800000, jubileeHills: 880000, saltLake: 720000 },
  { month: "May", bandra: 1180000, koramangala: 950000, adyar: 830000, jubileeHills: 900000, saltLake: 750000 },
  { month: "Jun", bandra: 1300000, koramangala: 1000000, adyar: 870000, jubileeHills: 950000, saltLake: 790000 },
]

export default function FranchisePage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredAgreements, setFilteredAgreements] = useState(agreementData)
  const [filteredRoyalties, setFilteredRoyalties] = useState(royaltyData)

  const handleSearch = (tab: string) => {
    if (tab === "agreements") {
      const filtered = agreementData.filter(
        (agreement) =>
          agreement.franchiseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agreement.owner.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredAgreements(filtered)
    } else if (tab === "royalty") {
      const filtered = royaltyData.filter(
        (royalty) =>
          royalty.franchiseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          royalty.month.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredRoyalties(filtered)
    }
  }

  const handleAction = (action: string, item: any, type: string) => {
    toast({
      title: `${action} ${type}`,
      description: `${action} ${type} for ${item.franchiseName} (${item.id})`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Franchise Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Briefcase className="h-12 w-12 text-blue-600 mb-4" />
            <CardTitle className="mb-2">15</CardTitle>
            <CardDescription>Active Franchises</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <FileText className="h-12 w-12 text-green-600 mb-4" />
            <CardTitle className="mb-2">12</CardTitle>
            <CardDescription>Active Agreements</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <DollarSign className="h-12 w-12 text-amber-600 mb-4" />
            <CardTitle className="mb-2">₹373,900</CardTitle>
            <CardDescription>Monthly Royalty</CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Franchise Revenue Comparison</CardTitle>
          <CardDescription>Monthly revenue across top franchises</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
                <Legend />
                <Line type="monotone" dataKey="bandra" name="Bandra" stroke="#3b82f6" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="koramangala" name="Koramangala" stroke="#10b981" />
                <Line type="monotone" dataKey="adyar" name="Adyar" stroke="#f59e0b" />
                <Line type="monotone" dataKey="jubileeHills" name="Jubilee Hills" stroke="#8b5cf6" />
                <Line type="monotone" dataKey="saltLake" name="Salt Lake" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="agreements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="agreements">Agreements & Licensing</TabsTrigger>
          <TabsTrigger value="royalty">Royalty Management</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="agreements" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Franchise Agreements</CardTitle>
                <Button
                  onClick={() => toast({ title: "Add Agreement", description: "Opening agreement creation form" })}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Agreement
                </Button>
              </div>
              <CardDescription>Manage franchise agreements and licenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="Search agreements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline" onClick={() => handleSearch("agreements")}>
                    <Search className="h-4 w-4 mr-2" /> Search
                  </Button>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Franchise Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Royalty Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAgreements.map((agreement) => (
                      <TableRow key={agreement.id}>
                        <TableCell className="font-medium">{agreement.id}</TableCell>
                        <TableCell>{agreement.franchiseName}</TableCell>
                        <TableCell>{agreement.owner}</TableCell>
                        <TableCell>{agreement.startDate}</TableCell>
                        <TableCell>{agreement.endDate}</TableCell>
                        <TableCell>{agreement.royaltyRate}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              agreement.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : agreement.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {agreement.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAction("View", agreement, "agreement")}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAction("Edit", agreement, "agreement")}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAction("Download", agreement, "agreement")}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="royalty" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Royalty Payments</CardTitle>
                <Button
                  onClick={() => toast({ title: "Generate Invoice", description: "Generating royalty invoices" })}
                >
                  <Plus className="mr-2 h-4 w-4" /> Generate Invoices
                </Button>
              </div>
              <CardDescription>Track and manage royalty payments from franchises</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="Search royalty payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline" onClick={() => handleSearch("royalty")}>
                    <Search className="h-4 w-4 mr-2" /> Search
                  </Button>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Franchise Name</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Royalty Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoyalties.map((royalty) => (
                      <TableRow key={royalty.id}>
                        <TableCell className="font-medium">{royalty.id}</TableCell>
                        <TableCell>{royalty.franchiseName}</TableCell>
                        <TableCell>{royalty.month}</TableCell>
                        <TableCell>₹{royalty.revenue.toLocaleString()}</TableCell>
                        <TableCell>₹{royalty.royaltyAmount.toLocaleString()}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              royalty.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : royalty.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {royalty.status}
                          </span>
                        </TableCell>
                        <TableCell>{royalty.paymentDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAction("View", royalty, "royalty payment")}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAction("Download", royalty, "invoice")}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            {royalty.status === "Pending" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleAction("Record", royalty, "payment")}
                              >
                                <DollarSign className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Franchise Onboarding & Compliance</CardTitle>
              <CardDescription>Manage onboarding processes and compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Training Materials</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() =>
                          toast({
                            title: "Training Materials",
                            description: "Opening training materials repository",
                          })
                        }
                      >
                        Access Training Materials
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Compliance Checklists</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() =>
                          toast({
                            title: "Compliance Checklists",
                            description: "Opening compliance checklists",
                          })
                        }
                      >
                        View Compliance Checklists
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Operational Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() =>
                          toast({
                            title: "Operational Guidelines",
                            description: "Opening operational guidelines",
                          })
                        }
                      >
                        View Operational Guidelines
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Certification Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() =>
                          toast({
                            title: "Certification Programs",
                            description: "Opening certification programs",
                          })
                        }
                      >
                        View Certification Programs
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
