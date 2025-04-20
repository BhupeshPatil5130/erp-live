"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileDown, ArrowRight, Eye } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Mock data for fund transfers
const transferData = [
  {
    id: "TRF001",
    fromAccount: "Main Account",
    toAccount: "Operational Account",
    amount: "₹500,000",
    date: "2023-04-10",
    reference: "OP-FUND-APR23",
    approvedBy: "John Smith",
    status: "Completed",
  },
  {
    id: "TRF002",
    fromAccount: "Main Account",
    toAccount: "Salary Account",
    amount: "₹750,000",
    date: "2023-04-05",
    reference: "SAL-APR23",
    approvedBy: "Sarah Johnson",
    status: "Completed",
  },
  {
    id: "TRF003",
    fromAccount: "Operational Account",
    toAccount: "Development Fund",
    amount: "₹200,000",
    date: "2023-04-03",
    reference: "DEV-FUND-APR23",
    approvedBy: "Michael Brown",
    status: "Pending",
  },
  {
    id: "TRF004",
    fromAccount: "Main Account",
    toAccount: "Scholarship Fund",
    amount: "₹300,000",
    date: "2023-03-28",
    reference: "SCH-FUND-APR23",
    approvedBy: "Emily Davis",
    status: "Completed",
  },
  {
    id: "TRF005",
    fromAccount: "Operational Account",
    toAccount: "Emergency Fund",
    amount: "₹100,000",
    date: "2023-03-25",
    reference: "EMRG-FUND-APR23",
    approvedBy: "David Wilson",
    status: "Rejected",
  },
]

// Mock data for accounts
const accountData = [
  { id: "ACC001", name: "Main Account", bank: "HDFC Bank", accountNumber: "XXXX1234", balance: "₹2,500,000" },
  { id: "ACC002", name: "Operational Account", bank: "ICICI Bank", accountNumber: "XXXX5678", balance: "₹750,000" },
  { id: "ACC003", name: "Salary Account", bank: "SBI", accountNumber: "XXXX9012", balance: "₹1,200,000" },
  { id: "ACC004", name: "Development Fund", bank: "Axis Bank", accountNumber: "XXXX3456", balance: "₹500,000" },
  { id: "ACC005", name: "Scholarship Fund", bank: "Kotak Bank", accountNumber: "XXXX7890", balance: "₹350,000" },
  { id: "ACC006", name: "Emergency Fund", bank: "Yes Bank", accountNumber: "XXXX2345", balance: "₹200,000" },
]

export default function FundTransferPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(transferData)

  const handleSearch = () => {
    const filtered = transferData.filter(
      (item) =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fromAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.toAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fund Transfer</h1>
        <Button>
          <FileDown className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <Tabs defaultValue="transfers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transfers">Transfer History</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="new-transfer">New Transfer</TabsTrigger>
        </TabsList>

        <TabsContent value="transfers" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 flex items-center gap-2">
              <Input
                placeholder="Search by ID, account, reference..."
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
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FileDown className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Fund Transfer History</CardTitle>
              <CardDescription>View all fund transfers between accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transfer ID</TableHead>
                    <TableHead>From Account</TableHead>
                    <TableHead>To Account</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((transfer) => (
                    <TableRow key={transfer.id}>
                      <TableCell>{transfer.id}</TableCell>
                      <TableCell>{transfer.fromAccount}</TableCell>
                      <TableCell>{transfer.toAccount}</TableCell>
                      <TableCell>{transfer.amount}</TableCell>
                      <TableCell>{transfer.date}</TableCell>
                      <TableCell>{transfer.reference}</TableCell>
                      <TableCell>{transfer.approvedBy}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            transfer.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : transfer.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transfer.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Account Information</CardTitle>
              <CardDescription>View all accounts and their balances</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account ID</TableHead>
                    <TableHead>Account Name</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Current Balance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accountData.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.id}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{account.bank}</TableCell>
                      <TableCell>{account.accountNumber}</TableCell>
                      <TableCell className="font-medium">{account.balance}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View Transactions
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-transfer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Fund Transfer</CardTitle>
              <CardDescription>Transfer funds between accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="from-account">From Account</Label>
                      <Select>
                        <SelectTrigger id="from-account">
                          <SelectValue placeholder="Select source account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accountData.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name} - {account.balance}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" placeholder="Enter amount to transfer" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reference">Reference</Label>
                      <Input id="reference" placeholder="Enter reference for this transfer" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center my-4 md:my-0">
                      <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="to-account">To Account</Label>
                      <Select>
                        <SelectTrigger id="to-account">
                          <SelectValue placeholder="Select destination account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accountData.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name} - {account.balance}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transfer-date">Transfer Date</Label>
                      <Input id="transfer-date" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="approved-by">Approved By</Label>
                      <Input id="approved-by" placeholder="Enter name of approver" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Enter any additional notes" rows={3} />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Process Transfer
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
