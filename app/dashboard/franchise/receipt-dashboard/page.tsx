"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Eye, FileDown, BarChart } from "lucide-react"

// Mock data for receipts
const receiptData = [
  {
    id: "RCP001",
    franchiseId: "FR001",
    name: "City Education Center",
    amount: "₹125,000",
    date: "2023-04-10",
    paymentMode: "Online",
    transactionId: "TXN78945612",
    status: "Completed",
  },
  {
    id: "RCP002",
    franchiseId: "FR002",
    name: "Metro Learning Hub",
    amount: "₹98,500",
    date: "2023-04-05",
    paymentMode: "Cheque",
    transactionId: "CHQ123456",
    status: "Pending",
  },
  {
    id: "RCP003",
    franchiseId: "FR003",
    name: "Suburban Knowledge Center",
    amount: "₹145,000",
    date: "2023-04-01",
    paymentMode: "Online",
    transactionId: "TXN78945614",
    status: "Completed",
  },
  {
    id: "RCP004",
    franchiseId: "FR004",
    name: "Downtown Institute",
    amount: "₹112,000",
    date: "2023-03-25",
    paymentMode: "Cash",
    transactionId: "CSH78945615",
    status: "Completed",
  },
  {
    id: "RCP005",
    franchiseId: "FR005",
    name: "Riverside Academy",
    amount: "₹135,000",
    date: "2023-03-20",
    paymentMode: "Online",
    transactionId: "TXN78945616",
    status: "Completed",
  },
]

export default function ReceiptDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(receiptData)
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null)

  const handleSearch = () => {
    const filtered = receiptData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.franchiseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Receipt Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart className="mr-2 h-4 w-4" /> Analytics
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" /> Export All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Receipts</p>
                <h3 className="text-2xl font-bold">₹615,500</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Payments</p>
                <h3 className="text-2xl font-bold">₹517,000</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                <h3 className="text-2xl font-bold">₹98,500</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Receipts</TabsTrigger>
          <TabsTrigger value="online">Online</TabsTrigger>
          <TabsTrigger value="cheque">Cheque</TabsTrigger>
          <TabsTrigger value="cash">Cash</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by receipt ID, franchise, transaction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Button variant="outline" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="date-range" className="whitespace-nowrap">
              Date Range:
            </Label>
            <Input id="date-from" type="date" className="w-40" />
            <span>to</span>
            <Input id="date-to" type="date" className="w-40" />
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Receipt List</CardTitle>
            <CardDescription>View and download all franchise payment receipts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt ID</TableHead>
                  <TableHead>Franchise ID</TableHead>
                  <TableHead>Franchise Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell>{receipt.id}</TableCell>
                    <TableCell>{receipt.franchiseId}</TableCell>
                    <TableCell>{receipt.name}</TableCell>
                    <TableCell>{receipt.amount}</TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>{receipt.paymentMode}</TableCell>
                    <TableCell>{receipt.transactionId}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          receipt.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {receipt.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedReceipt(receipt.id)}>
                        <Eye className="h-4 w-4 mr-1" /> View
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
      </Tabs>

      {selectedReceipt && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Receipt Preview</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" /> Print
                </Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
              </div>
            </div>
            <CardDescription>
              Preview of receipt {selectedReceipt} for {receiptData.find((rec) => rec.id === selectedReceipt)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">RECEIPT</h2>
                  <p className="text-muted-foreground">
                    Receipt #: {selectedReceipt}
                    <br />
                    Date: {receiptData.find((rec) => rec.id === selectedReceipt)?.date}
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
                  </p>
                </div>
              </div>

              <div className="border-t border-b py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Received From:</p>
                    <p>
                      {receiptData.find((rec) => rec.id === selectedReceipt)?.name}
                      <br />
                      Franchise ID: {receiptData.find((rec) => rec.id === selectedReceipt)?.franchiseId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Payment Details:</p>
                    <p>
                      Mode: {receiptData.find((rec) => rec.id === selectedReceipt)?.paymentMode}
                      <br />
                      Transaction ID: {receiptData.find((rec) => rec.id === selectedReceipt)?.transactionId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Amount Received:</p>
                <p className="text-3xl font-bold">{receiptData.find((rec) => rec.id === selectedReceipt)?.amount}</p>
                <p className="text-sm text-muted-foreground">One Hundred Twenty-Five Thousand Rupees Only</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium text-muted-foreground">For Payment Of:</p>
                <p>Franchise Fee - April 2023</p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Authorized Signature:</p>
                  <div className="mt-6 border-b w-40"></div>
                </div>
                <div
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                    receiptData.find((rec) => rec.id === selectedReceipt)?.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {receiptData.find((rec) => rec.id === selectedReceipt)?.status}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
