"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Users, Settings, Shield, Search, Plus, Edit, Trash, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample data for schools/franchises
const franchiseData = [
  {
    id: "FR001",
    name: "EuroKids Bandra",
    location: "Mumbai, Maharashtra",
    owner: "Rajesh Sharma",
    students: 245,
    staff: 28,
    status: "Active",
    type: "Premium",
  },
  {
    id: "FR002",
    name: "EuroKids Koramangala",
    location: "Bangalore, Karnataka",
    owner: "Priya Patel",
    students: 189,
    staff: 22,
    status: "Active",
    type: "Standard",
  },
  {
    id: "FR003",
    name: "EuroKids Adyar",
    location: "Chennai, Tamil Nadu",
    owner: "Karthik Rajan",
    students: 156,
    staff: 18,
    status: "Active",
    type: "Premium",
  },
  {
    id: "FR004",
    name: "EuroKids Jubilee Hills",
    location: "Hyderabad, Telangana",
    owner: "Ananya Reddy",
    students: 210,
    staff: 25,
    status: "Pending",
    type: "Standard",
  },
  {
    id: "FR005",
    name: "EuroKids Salt Lake",
    location: "Kolkata, West Bengal",
    owner: "Debashish Roy",
    students: 178,
    staff: 20,
    status: "Active",
    type: "Premium",
  },
]

// Sample data for roles
const rolesData = [
  {
    id: "ROLE001",
    name: "Super Admin",
    description: "Full access to all features and settings",
    users: 2,
    permissions: "All",
  },
  {
    id: "ROLE002",
    name: "Franchise Owner",
    description: "Access to franchise management and reports",
    users: 15,
    permissions: "Franchise, Reports, Students, Staff",
  },
  {
    id: "ROLE003",
    name: "Principal",
    description: "School management and academic oversight",
    users: 12,
    permissions: "Students, Staff, Curriculum, Reports",
  },
  {
    id: "ROLE004",
    name: "Teacher",
    description: "Class management and student assessments",
    users: 85,
    permissions: "Students, Curriculum, Assessments",
  },
  {
    id: "ROLE005",
    name: "Accountant",
    description: "Financial management and fee collection",
    users: 10,
    permissions: "Finance, Fee, Reports",
  },
]

export default function AdministrationPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredFranchises, setFilteredFranchises] = useState(franchiseData)
  const [filteredRoles, setFilteredRoles] = useState(rolesData)

  const handleSearch = (tab: string) => {
    if (tab === "franchises") {
      const filtered = franchiseData.filter(
        (franchise) =>
          franchise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          franchise.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          franchise.owner.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredFranchises(filtered)
    } else if (tab === "roles") {
      const filtered = rolesData.filter(
        (role) =>
          role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredRoles(filtered)
    }
  }

  const handleAction = (action: string, item: any, type: string) => {
    toast({
      title: `${action} ${type}`,
      description: `${action} ${type} ${item.name} (${item.id})`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Building className="h-12 w-12 text-blue-600 mb-4" />
            <CardTitle className="mb-2">15</CardTitle>
            <CardDescription>Total Franchises</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Users className="h-12 w-12 text-green-600 mb-4" />
            <CardTitle className="mb-2">124</CardTitle>
            <CardDescription>Total Users</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Shield className="h-12 w-12 text-amber-600 mb-4" />
            <CardTitle className="mb-2">5</CardTitle>
            <CardDescription>User Roles</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Settings className="h-12 w-12 text-purple-600 mb-4" />
            <CardTitle className="mb-2">8</CardTitle>
            <CardDescription>System Configurations</CardDescription>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="franchises" className="space-y-4">
        <TabsList>
          <TabsTrigger value="franchises">Franchises & Branches</TabsTrigger>
          <TabsTrigger value="roles">User Roles & Permissions</TabsTrigger>
          <TabsTrigger value="config">System Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="franchises" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Franchise Management</CardTitle>
                <Button
                  onClick={() => toast({ title: "Add Franchise", description: "Opening franchise creation form" })}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Franchise
                </Button>
              </div>
              <CardDescription>Manage all franchises and school branches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="Search franchises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline" onClick={() => handleSearch("franchises")}>
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
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Staff</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFranchises.map((franchise) => (
                      <TableRow key={franchise.id}>
                        <TableCell className="font-medium">{franchise.id}</TableCell>
                        <TableCell>{franchise.name}</TableCell>
                        <TableCell>{franchise.location}</TableCell>
                        <TableCell>{franchise.owner}</TableCell>
                        <TableCell>{franchise.students}</TableCell>
                        <TableCell>{franchise.staff}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              franchise.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : franchise.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {franchise.status}
                          </span>
                        </TableCell>
                        <TableCell>{franchise.type}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAction("View", franchise, "franchise")}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAction("Edit", franchise, "franchise")}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAction("Delete", franchise, "franchise")}
                            >
                              <Trash className="h-4 w-4" />
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

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Role-Based Access Control</CardTitle>
                <Button onClick={() => toast({ title: "Add Role", description: "Opening role creation form" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Role
                </Button>
              </div>
              <CardDescription>Manage user roles and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline" onClick={() => handleSearch("roles")}>
                    <Search className="h-4 w-4 mr-2" /> Search
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.id}</TableCell>
                        <TableCell>{role.name}</TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>{role.users}</TableCell>
                        <TableCell>{role.permissions}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => handleAction("View", role, "role")}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleAction("Edit", role, "role")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleAction("Delete", role, "role")}>
                              <Trash className="h-4 w-4" />
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

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Manage global system settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Academic Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() =>
                          toast({
                            title: "Academic Settings",
                            description: "Opening academic year configuration",
                          })
                        }
                      >
                        Configure Academic Year
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Branding</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() =>
                          toast({
                            title: "Branding Settings",
                            description: "Opening branding configuration",
                          })
                        }
                      >
                        Configure Branding
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() =>
                          toast({
                            title: "Security Settings",
                            description: "Opening security configuration",
                          })
                        }
                      >
                        Configure Security
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Backup & Restore</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() =>
                          toast({
                            title: "Backup Settings",
                            description: "Opening backup configuration",
                          })
                        }
                      >
                        Configure Backup
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