"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

export default function AccessLevelPage() {
  const { toast } = useToast()
  const [selectedRole, setSelectedRole] = useState("admin")

  const modules = [
    { id: 1, name: "Dashboard", view: true, create: true, edit: true, delete: true },
    { id: 2, name: "Enrollment", view: true, create: true, edit: true, delete: true },
    { id: 3, name: "Staff", view: true, create: true, edit: true, delete: false },
    { id: 4, name: "Fee Collection", view: true, create: true, edit: true, delete: false },
    { id: 5, name: "Reports", view: true, create: false, edit: false, delete: false },
    { id: 6, name: "Franchise", view: true, create: false, edit: false, delete: false },
    { id: 7, name: "Operations", view: true, create: true, edit: true, delete: false },
    { id: 8, name: "Account", view: true, create: false, edit: false, delete: false },
  ]

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "staff", label: "Staff" },
    { value: "franchise", label: "Franchise Owner" },
  ]

  const handlePermissionChange = (moduleId: number, permission: string, checked: boolean) => {
    toast({
      title: "Permission Updated",
      description: `Permission ${checked ? "granted" : "revoked"} successfully`,
    })
  }

  const handleSavePermissions = () => {
    toast({
      title: "Permissions Saved",
      description: `Access levels for ${selectedRole} role have been updated`,
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Access Level Management</h1>
        <p className="text-muted-foreground">Configure user role permissions and access levels</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Define what each role can access and modify</CardDescription>
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Module</TableHead>
                  <TableHead className="text-center">View</TableHead>
                  <TableHead className="text-center">Create</TableHead>
                  <TableHead className="text-center">Edit</TableHead>
                  <TableHead className="text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modules.map((module) => (
                  <TableRow key={module.id}>
                    <TableCell className="font-medium">{module.name}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={module.view}
                        onCheckedChange={(checked) => handlePermissionChange(module.id, "view", checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={module.create}
                        onCheckedChange={(checked) => handlePermissionChange(module.id, "create", checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={module.edit}
                        onCheckedChange={(checked) => handlePermissionChange(module.id, "edit", checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={module.delete}
                        onCheckedChange={(checked) => handlePermissionChange(module.id, "delete", checked as boolean)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={handleSavePermissions}>
              <Save className="mr-2 h-4 w-4" />
              Save Permissions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
