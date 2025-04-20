"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Eye, FileDown, Printer } from "lucide-react"

// Mock data for invoices
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

export default function InvoiceDownloadPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(invoiceData)
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)

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
        <h1 className="text-3xl font-bold tracking-tight">Invoice Download</h1>
        <Button>
          <FileDown className="mr-2 h-4 w-4" /> Export All
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter invoices by various parameters</CardDescription>
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
              <Select>
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
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Download franchise invoices</CardDescription>
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
                    <Button variant="ghost" size="sm" onClick={() => setSelectedInvoice(invoice.id)}>
                      <Eye className="h-4 w-4 mr-1" /> Preview
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedInvoice && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Invoice Preview</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-1" /> Print
                </Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-1" /> Download PDF
                </Button>
              </div>
            </div>
            <CardDescription>
              Preview of invoice {selectedInvoice} for {invoiceData.find((inv) => inv.id === selectedInvoice)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">INVOICE</h2>
                  <p className="text-muted-foreground">
                    Invoice #: {selectedInvoice}
                    <br />
                    Date: {invoiceData.find((inv) => inv.id === selectedInvoice)?.date}
                    <br />
                    Due Date: {invoiceData.find((inv) => inv.id === selectedInvoice)?.dueDate}
                  </p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold">ERP System</h3>
                  <p className="text-muted-foreground">
                    123 Education Street
                    <br />
                    City, State 12345
                    <br />
                    Phone: (123) 456-7890
                    <br />
                    Email: billing@erpsystem.com
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">Bill To:</h3>
                  <p className="text-muted-foreground">
                    {invoiceData.find((inv) => inv.id === selectedInvoice)?.name}
                    <br />
                    Franchise ID: {invoiceData.find((inv) => inv.id === selectedInvoice)?.franchiseId}
                    <br />
                    456 Learning Avenue
                    <br />
                    City, State 12345
                    <br />
                    Phone: (987) 654-3210
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">Status:</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      invoiceData.find((inv) => inv.id === selectedInvoice)?.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : invoiceData.find((inv) => inv.id === selectedInvoice)?.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {invoiceData.find((inv) => inv.id === selectedInvoice)?.status}
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Franchise Fee - Monthly</TableCell>
                    <TableCell className="text-right">1</TableCell>
                    <TableCell className="text-right">₹75,000</TableCell>
                    <TableCell className="text-right">₹75,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Marketing Support</TableCell>
                    <TableCell className="text-right">1</TableCell>
                    <TableCell className="text-right">₹25,000</TableCell>
                    <TableCell className="text-right">₹25,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Training Materials</TableCell>
                    <TableCell className="text-right">5</TableCell>
                    <TableCell className="text-right">₹5,000</TableCell>
                    <TableCell className="text-right">₹25,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">
                      Subtotal
                    </TableCell>
                    <TableCell className="text-right">₹125,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">
                      Tax (0%)
                    </TableCell>
                    <TableCell className="text-right">₹0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-bold">
                      Total
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {invoiceData.find((inv) => inv.id === selectedInvoice)?.amount}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="space-y-2">
                <h3 className="font-bold">Payment Terms:</h3>
                <p className="text-muted-foreground">
                  Payment is due within 30 days of invoice date. Please make payment to the bank account details
                  provided below.
                </p>
                <div className="border rounded p-3 bg-muted/20">
                  <p>
                    <span className="font-medium">Bank Name:</span> National Bank
                    <br />
                    <span className="font-medium">Account Name:</span> ERP System
                    <br />
                    <span className="font-medium">Account Number:</span> 1234567890
                    <br />
                    <span className="font-medium">IFSC Code:</span> NATB0001234
                  </p>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Thank you for your business!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
