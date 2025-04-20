"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileDown, Eye, Download, Plus } from "lucide-react"

// Mock data for franchise invoices
const invoiceData = [
  {
    id: "INV001",
    franchiseId: "FR001",
    name: "City Education Center",
    amount: "₹125,000",
    date: "2023-04-10",
    dueDate: "2023-05-10",
    status: "Paid",
  },
  {
    id: "INV002",
    franchiseId: "FR002",
    name: "Metro Learning Hub",
    amount: "₹98,500",
    date: "2023-04-05",
    dueDate: "2023-05-05",
    status: "Pending",
  },
  {
    id: "INV003",
    franchiseId: "FR003",
    name: "Suburban Knowledge Center",
    amount: "₹145,000",
    date: "2023-04-01",
    dueDate: "2023-05-01",
    status: "Paid",
  },
  {
    id: "INV004",
    franchiseId: "FR004",
    name: "Downtown Institute",
    amount: "₹112,000",
    date: "2023-03-25",
    dueDate: "2023-04-25",
    status: "Overdue",
  },
  {
    id: "INV005",
    franchiseId: "FR005",
    name: "Riverside Academy",
    amount: "₹135,000",
    date: "2023-03-20",
    dueDate: "2023-04-20",
    status: "Paid",
  },
]

export default function InvoiceDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(invoiceData)

  const handleSearch = () => {
    const filtered = invoiceData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.franchiseId.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Franchise Invoice Details</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" /> Export All
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Invoice
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter invoice records by various parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Search by invoice ID, franchise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <div className="flex gap-2 items-center">
                <Input id="date-from" type="date" />
                <span>to</span>
                <Input id="date-to" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => {
                  if (value === "all") {
                    setFilteredData(invoiceData)
                  } else {
                    setFilteredData(invoiceData.filter((item) => item.status.toLowerCase() === value.toLowerCase()))
                  }
                }}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>Manage all franchise invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Franchise ID</TableHead>
                <TableHead>Franchise Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.franchiseId}</TableCell>
                  <TableCell>{invoice.name}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/dashboard/franchise/invoice-download?id=${invoice.id}`}>
                        <Download className="h-4 w-4 mr-1" /> Download
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
