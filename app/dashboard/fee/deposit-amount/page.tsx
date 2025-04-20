"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, DollarSign, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function DepositAmountPage() {
  const [studentId, setStudentId] = useState("")
  const [studentDetails, setStudentDetails] = useState<any>(null)

  // Mock function to search for student
  const handleStudentSearch = () => {
    // In a real app, this would fetch student data from an API
    if (studentId) {
      setStudentDetails({
        id: studentId,
        name: "John Smith",
        course: "Computer Science",
        batch: "2023-24",
        totalFees: "₹75,000",
        paidAmount: "₹45,000",
        pendingAmount: "₹30,000",
      })
    } else {
      setStudentDetails(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Deposit Amount</h1>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Student Search</CardTitle>
          <CardDescription>Search for a student to deposit amount</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={handleStudentSearch}>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {studentDetails && (
        <>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Student Details</CardTitle>
              <CardDescription>Basic information about the student</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                  <p>{studentDetails.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p>{studentDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Course</p>
                  <p>{studentDetails.course}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Batch</p>
                  <p>{studentDetails.batch}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Fees</p>
                  <p>{studentDetails.totalFees}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Paid Amount</p>
                  <p className="text-green-600">{studentDetails.paidAmount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
                  <p className="text-red-600">{studentDetails.pendingAmount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="cash" className="space-y-4">
            <TabsList>
              <TabsTrigger value="cash">Cash Payment</TabsTrigger>
              <TabsTrigger value="cheque">Cheque Payment</TabsTrigger>
              <TabsTrigger value="online">Online Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="cash" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cash Payment</CardTitle>
                  <CardDescription>Enter details for cash payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input id="amount" placeholder="0.00" className="pl-9" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-date">Payment Date</Label>
                        <Input id="payment-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-for">Payment For</Label>
                        <Select>
                          <SelectTrigger id="payment-for">
                            <SelectValue placeholder="Select payment purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tuition">Tuition Fee</SelectItem>
                            <SelectItem value="development">Development Fee</SelectItem>
                            <SelectItem value="library">Library Fee</SelectItem>
                            <SelectItem value="laboratory">Laboratory Fee</SelectItem>
                            <SelectItem value="examination">Examination Fee</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="received-by">Received By</Label>
                        <Input id="received-by" placeholder="Enter name of receiver" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="remarks">Remarks</Label>
                      <Textarea id="remarks" placeholder="Enter any additional remarks" rows={3} />
                    </div>
                    <Button type="submit" className="w-full md:w-auto">
                      <Check className="mr-2 h-4 w-4" /> Process Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cheque" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cheque Payment</CardTitle>
                  <CardDescription>Enter details for cheque payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cheque-amount">Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input id="cheque-amount" placeholder="0.00" className="pl-9" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cheque-date">Cheque Date</Label>
                        <Input id="cheque-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cheque-number">Cheque Number</Label>
                        <Input id="cheque-number" placeholder="Enter cheque number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bank-name">Bank Name</Label>
                        <Input id="bank-name" placeholder="Enter bank name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-for-cheque">Payment For</Label>
                        <Select>
                          <SelectTrigger id="payment-for-cheque">
                            <SelectValue placeholder="Select payment purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tuition">Tuition Fee</SelectItem>
                            <SelectItem value="development">Development Fee</SelectItem>
                            <SelectItem value="library">Library Fee</SelectItem>
                            <SelectItem value="laboratory">Laboratory Fee</SelectItem>
                            <SelectItem value="examination">Examination Fee</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="received-by-cheque">Received By</Label>
                        <Input id="received-by-cheque" placeholder="Enter name of receiver" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="remarks-cheque">Remarks</Label>
                      <Textarea id="remarks-cheque" placeholder="Enter any additional remarks" rows={3} />
                    </div>
                    <Button type="submit" className="w-full md:w-auto">
                      <Check className="mr-2 h-4 w-4" /> Process Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="online" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Online Payment</CardTitle>
                  <CardDescription>Enter details for online payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="online-amount">Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input id="online-amount" placeholder="0.00" className="pl-9" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transaction-date">Transaction Date</Label>
                        <Input id="transaction-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transaction-id">Transaction ID</Label>
                        <Input id="transaction-id" placeholder="Enter transaction ID" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Select>
                          <SelectTrigger id="payment-method">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="netbanking">Net Banking</SelectItem>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="creditcard">Credit Card</SelectItem>
                            <SelectItem value="debitcard">Debit Card</SelectItem>
                            <SelectItem value="wallet">Digital Wallet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-for-online">Payment For</Label>
                        <Select>
                          <SelectTrigger id="payment-for-online">
                            <SelectValue placeholder="Select payment purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tuition">Tuition Fee</SelectItem>
                            <SelectItem value="development">Development Fee</SelectItem>
                            <SelectItem value="library">Library Fee</SelectItem>
                            <SelectItem value="laboratory">Laboratory Fee</SelectItem>
                            <SelectItem value="examination">Examination Fee</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="verified-by">Verified By</Label>
                        <Input id="verified-by" placeholder="Enter name of verifier" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="remarks-online">Remarks</Label>
                      <Textarea id="remarks-online" placeholder="Enter any additional remarks" rows={3} />
                    </div>
                    <Button type="submit" className="w-full md:w-auto">
                      <Check className="mr-2 h-4 w-4" /> Process Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
