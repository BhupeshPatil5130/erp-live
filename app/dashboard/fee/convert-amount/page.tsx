"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Search } from "lucide-react"

export default function ConvertAmountPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Convert Amount</h1>
      </div>

      <Tabs defaultValue="cash-to-cheque" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cash-to-cheque">Cash to Cheque</TabsTrigger>
          <TabsTrigger value="cash-to-online">Cash to Online</TabsTrigger>
          <TabsTrigger value="cheque-to-online">Cheque to Online</TabsTrigger>
        </TabsList>

        <TabsContent value="cash-to-cheque" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Convert Cash Receipt to Cheque</CardTitle>
              <CardDescription>Convert a cash payment to cheque payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="receipt-number">Cash Receipt Number</Label>
                    <div className="flex gap-2">
                      <Input id="receipt-number" placeholder="Enter receipt number" />
                      <Button variant="outline">
                        <Search className="h-4 w-4 mr-2" /> Search
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Receipt Details</Label>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Student Name:</span>
                            <span className="text-sm">John Smith</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Student ID:</span>
                            <span className="text-sm">STU1001</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Amount:</span>
                            <span className="text-sm">₹15,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Date:</span>
                            <span className="text-sm">2023-04-10</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center my-4 md:my-0">
                    <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cheque-number">Cheque Number</Label>
                    <Input id="cheque-number" placeholder="Enter cheque number" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Select>
                      <SelectTrigger id="bank-name">
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hdfc">HDFC Bank</SelectItem>
                        <SelectItem value="icici">ICICI Bank</SelectItem>
                        <SelectItem value="sbi">State Bank of India</SelectItem>
                        <SelectItem value="axis">Axis Bank</SelectItem>
                        <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cheque-date">Cheque Date</Label>
                    <Input id="cheque-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks</Label>
                    <Input id="remarks" placeholder="Enter remarks (optional)" />
                  </div>

                  <Button className="w-full mt-4">Convert to Cheque</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-to-online" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Convert Cash Receipt to Online</CardTitle>
              <CardDescription>Convert a cash payment to online payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="receipt-number-online">Cash Receipt Number</Label>
                    <div className="flex gap-2">
                      <Input id="receipt-number-online" placeholder="Enter receipt number" />
                      <Button variant="outline">
                        <Search className="h-4 w-4 mr-2" /> Search
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Receipt Details</Label>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Student Name:</span>
                            <span className="text-sm">Sarah Johnson</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Student ID:</span>
                            <span className="text-sm">STU1002</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Amount:</span>
                            <span className="text-sm">₹12,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Date:</span>
                            <span className="text-sm">2023-04-09</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center my-4 md:my-0">
                    <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
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
                    <Label htmlFor="transaction-date">Transaction Date</Label>
                    <Input id="transaction-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="remarks-online">Remarks</Label>
                    <Input id="remarks-online" placeholder="Enter remarks (optional)" />
                  </div>

                  <Button className="w-full mt-4">Convert to Online</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cheque-to-online" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Convert Cheque to Online</CardTitle>
              <CardDescription>Convert a cheque payment to online payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cheque-receipt-number">Cheque Receipt Number</Label>
                    <div className="flex gap-2">
                      <Input id="cheque-receipt-number" placeholder="Enter receipt number" />
                      <Button variant="outline">
                        <Search className="h-4 w-4 mr-2" /> Search
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Cheque Details</Label>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Student Name:</span>
                            <span className="text-sm">Thomas Anderson</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Student ID:</span>
                            <span className="text-sm">STU1011</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Amount:</span>
                            <span className="text-sm">₹18,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Cheque Number:</span>
                            <span className="text-sm">123456</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Bank:</span>
                            <span className="text-sm">HDFC Bank</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Date:</span>
                            <span className="text-sm">2023-04-10</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center my-4 md:my-0">
                    <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="online-transaction-id">Transaction ID</Label>
                    <Input id="online-transaction-id" placeholder="Enter transaction ID" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="online-payment-method">Payment Method</Label>
                    <Select>
                      <SelectTrigger id="online-payment-method">
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
                    <Label htmlFor="online-transaction-date">Transaction Date</Label>
                    <Input id="online-transaction-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="online-remarks">Remarks</Label>
                    <Input id="online-remarks" placeholder="Enter remarks (optional)" />
                  </div>

                  <Button className="w-full mt-4">Convert to Online</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
