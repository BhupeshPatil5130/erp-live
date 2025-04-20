"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for franchise types
const franchiseTypes = [
  {
    id: 1,
    name: "Premium Partner",
    description: "Full-service franchise with complete curriculum access",
    royaltyPercentage: 15,
    initialFee: 500000,
    status: "active",
    benefits: ["Complete curriculum access", "Marketing support", "Teacher training", "Technology platform"],
  },
  {
    id: 2,
    name: "Standard Partner",
    description: "Standard franchise with core curriculum access",
    royaltyPercentage: 12,
    initialFee: 300000,
    status: "active",
    benefits: ["Core curriculum access", "Basic marketing support", "Limited teacher training"],
  },
  {
    id: 3,
    name: "Basic Partner",
    description: "Entry-level franchise with limited curriculum access",
    royaltyPercentage: 10,
    initialFee: 150000,
    status: "active",
    benefits: ["Limited curriculum access", "Self-managed marketing", "Online training resources"],
  },
  {
    id: 4,
    name: "International Partner",
    description: "International franchise with adapted curriculum",
    royaltyPercentage: 18,
    initialFee: 800000,
    status: "active",
    benefits: [
      "Adapted international curriculum",
      "Global marketing support",
      "Comprehensive training",
      "Technology platform",
    ],
  },
  {
    id: 5,
    name: "Legacy Partner",
    description: "Legacy franchise model (discontinued)",
    royaltyPercentage: 8,
    initialFee: 100000,
    status: "inactive",
    benefits: ["Basic curriculum", "No additional support"],
  },
]

export default function FranchiseTypePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTypes = franchiseTypes.filter(
    (type) =>
      type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Franchise Types</h1>
          <p className="text-muted-foreground">Manage franchise type configurations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 sm:mt-0">Add New Franchise Type</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Franchise Type</DialogTitle>
              <DialogDescription>
                Add a new franchise type to the system. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Type Name</Label>
                <Input id="name" placeholder="Enter franchise type name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="royalty">Royalty Percentage</Label>
                  <Input id="royalty" type="number" placeholder="e.g. 15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fee">Initial Fee (₹)</Label>
                  <Input id="fee" type="number" placeholder="e.g. 500000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits (one per line)</Label>
                <Textarea id="benefits" placeholder="Enter benefits, one per line" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Save Type</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Franchise Types</CardTitle>
          <CardDescription>View and manage all franchise type configurations</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="Search franchise types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Royalty %</TableHead>
                <TableHead>Initial Fee (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTypes.map((type) => (
                <TableRow key={type.id}>
                  <TableCell className="font-medium">{type.name}</TableCell>
                  <TableCell>{type.description}</TableCell>
                  <TableCell>{type.royaltyPercentage}%</TableCell>
                  <TableCell>₹{type.initialFee.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={type.status === "active" ? "default" : "secondary"}>
                      {type.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTypes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No franchise types found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
