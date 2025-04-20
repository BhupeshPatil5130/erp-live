"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Calculator } from "lucide-react"

// Mock data for courses and fee structures
const courses = [
  { id: "cs", name: "Computer Science" },
  { id: "business", name: "Business Administration" },
  { id: "engineering", name: "Engineering" },
  { id: "arts", name: "Arts & Humanities" },
  { id: "medicine", name: "Medical Sciences" },
]

const feeStructures = {
  cs: {
    tuition: 75000,
    registration: 5000,
    examination: 3000,
    laboratory: 8000,
    library: 2000,
    sports: 3000,
    transportation: 12000,
    hostel: 60000,
    scholarshipOptions: [
      { id: "merit", name: "Merit Scholarship", discount: 20 },
      { id: "sports", name: "Sports Excellence", discount: 15 },
      { id: "sibling", name: "Sibling Discount", discount: 10 },
    ],
  },
  business: {
    tuition: 65000,
    registration: 5000,
    examination: 3000,
    laboratory: 4000,
    library: 2000,
    sports: 3000,
    transportation: 12000,
    hostel: 60000,
    scholarshipOptions: [
      { id: "merit", name: "Merit Scholarship", discount: 20 },
      { id: "sibling", name: "Sibling Discount", discount: 10 },
    ],
  },
  engineering: {
    tuition: 85000,
    registration: 5000,
    examination: 3000,
    laboratory: 12000,
    library: 2000,
    sports: 3000,
    transportation: 12000,
    hostel: 60000,
    scholarshipOptions: [
      { id: "merit", name: "Merit Scholarship", discount: 25 },
      { id: "sports", name: "Sports Excellence", discount: 15 },
      { id: "sibling", name: "Sibling Discount", discount: 10 },
    ],
  },
  arts: {
    tuition: 55000,
    registration: 5000,
    examination: 3000,
    laboratory: 2000,
    library: 2000,
    sports: 3000,
    transportation: 12000,
    hostel: 60000,
    scholarshipOptions: [
      { id: "merit", name: "Merit Scholarship", discount: 15 },
      { id: "sibling", name: "Sibling Discount", discount: 10 },
    ],
  },
  medicine: {
    tuition: 120000,
    registration: 5000,
    examination: 3000,
    laboratory: 15000,
    library: 2000,
    sports: 3000,
    transportation: 12000,
    hostel: 60000,
    scholarshipOptions: [
      { id: "merit", name: "Merit Scholarship", discount: 20 },
      { id: "sports", name: "Sports Excellence", discount: 10 },
      { id: "sibling", name: "Sibling Discount", discount: 5 },
    ],
  },
}

export default function FeeCalculatorPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [selectedScholarship, setSelectedScholarship] = useState<string>("")
  const [includeHostel, setIncludeHostel] = useState(false)
  const [includeTransportation, setIncludeTransportation] = useState(false)
  const [calculatedFees, setCalculatedFees] = useState<any>(null)
  const [installments, setInstallments] = useState(1)

  const handleCalculate = () => {
    if (!selectedCourse) return

    const fees = feeStructures[selectedCourse as keyof typeof feeStructures]
    let totalFees = fees.tuition + fees.registration + fees.examination + fees.laboratory + fees.library + fees.sports

    if (includeHostel) {
      totalFees += fees.hostel
    }

    if (includeTransportation) {
      totalFees += fees.transportation
    }

    let discountPercentage = 0
    let discountAmount = 0

    if (selectedScholarship) {
      const scholarship = fees.scholarshipOptions.find((s) => s.id === selectedScholarship)
      if (scholarship) {
        discountPercentage = scholarship.discount
        discountAmount = (totalFees * scholarship.discount) / 100
      }
    }

    const netFees = totalFees - discountAmount
    const installmentAmount = netFees / installments

    setCalculatedFees({
      totalFees,
      discountPercentage,
      discountAmount,
      netFees,
      installments,
      installmentAmount,
      breakdown: {
        tuition: fees.tuition,
        registration: fees.registration,
        examination: fees.examination,
        laboratory: fees.laboratory,
        library: fees.library,
        sports: fees.sports,
        hostel: includeHostel ? fees.hostel : 0,
        transportation: includeTransportation ? fees.transportation : 0,
      },
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Fee Calculator</h1>
        <p className="text-muted-foreground">Calculate student fees based on course and applicable discounts</p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calculator">Fee Calculator</TabsTrigger>
          <TabsTrigger value="comparison">Course Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  <span>Fee Calculator</span>
                </CardTitle>
                <CardDescription>Enter details to calculate fees</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Select Course</Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCourse && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="scholarship">Scholarship/Discount</Label>
                        <Select value={selectedScholarship} onValueChange={setSelectedScholarship}>
                          <SelectTrigger id="scholarship">
                            <SelectValue placeholder="Select scholarship (if applicable)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Scholarship</SelectItem>
                            {feeStructures[selectedCourse as keyof typeof feeStructures].scholarshipOptions.map(
                              (option) => (
                                <SelectItem key={option.id} value={option.id}>
                                  {option.name} ({option.discount}% off)
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="hostel">Include Hostel Fees</Label>
                          <Switch id="hostel" checked={includeHostel} onCheckedChange={setIncludeHostel} />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="transportation">Include Transportation</Label>
                          <Switch
                            id="transportation"
                            checked={includeTransportation}
                            onCheckedChange={setIncludeTransportation}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="installments">Payment Installments</Label>
                        <Select
                          value={installments.toString()}
                          onValueChange={(value) => setInstallments(Number.parseInt(value))}
                        >
                          <SelectTrigger id="installments">
                            <SelectValue placeholder="Select number of installments" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Full Payment (1 installment)</SelectItem>
                            <SelectItem value="2">2 Installments</SelectItem>
                            <SelectItem value="3">3 Installments</SelectItem>
                            <SelectItem value="4">4 Installments</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCalculate} disabled={!selectedCourse}>
                  Calculate Fees
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee Breakdown</CardTitle>
                <CardDescription>Detailed breakdown of applicable fees</CardDescription>
              </CardHeader>
              <CardContent>
                {calculatedFees ? (
                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <div className="text-lg font-semibold">
                        Total Fee: ₹{calculatedFees.totalFees.toLocaleString()}
                      </div>
                      {calculatedFees.discountAmount > 0 && (
                        <div className="text-sm text-muted-foreground">
                          Discount: ₹{calculatedFees.discountAmount.toLocaleString()} (
                          {calculatedFees.discountPercentage}%)
                        </div>
                      )}
                      <div className="mt-2 text-lg font-bold">
                        Net Payable: ₹{calculatedFees.netFees.toLocaleString()}
                      </div>
                      {calculatedFees.installments > 1 && (
                        <div className="mt-1 text-sm">
                          ₹{Math.ceil(calculatedFees.installmentAmount).toLocaleString()} per installment (
                          {calculatedFees.installments} installments)
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 font-medium">Fee Components</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Tuition Fee</span>
                          <span>₹{calculatedFees.breakdown.tuition.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Registration Fee</span>
                          <span>₹{calculatedFees.breakdown.registration.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Examination Fee</span>
                          <span>₹{calculatedFees.breakdown.examination.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Laboratory Fee</span>
                          <span>₹{calculatedFees.breakdown.laboratory.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Library Fee</span>
                          <span>₹{calculatedFees.breakdown.library.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sports Fee</span>
                          <span>₹{calculatedFees.breakdown.sports.toLocaleString()}</span>
                        </div>
                        {calculatedFees.breakdown.hostel > 0 && (
                          <div className="flex justify-between">
                            <span>Hostel Fee</span>
                            <span>₹{calculatedFees.breakdown.hostel.toLocaleString()}</span>
                          </div>
                        )}
                        {calculatedFees.breakdown.transportation > 0 && (
                          <div className="flex justify-between">
                            <span>Transportation Fee</span>
                            <span>₹{calculatedFees.breakdown.transportation.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[300px] items-center justify-center text-center">
                    <div className="max-w-md space-y-2">
                      <p>Select a course and click Calculate to see the fee breakdown</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Course Fee Comparison</CardTitle>
              <CardDescription>Compare tuition fees across different courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left font-medium">Course</th>
                      <th className="py-3 text-right font-medium">Tuition Fee</th>
                      <th className="py-3 text-right font-medium">Lab Fee</th>
                      <th className="py-3 text-right font-medium">Total (Basic)</th>
                      <th className="py-3 text-right font-medium">With Hostel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => {
                      const fees = feeStructures[course.id as keyof typeof feeStructures]
                      const basicFees =
                        fees.tuition +
                        fees.registration +
                        fees.examination +
                        fees.laboratory +
                        fees.library +
                        fees.sports
                      const withHostel = basicFees + fees.hostel

                      return (
                        <tr key={course.id} className="border-b">
                          <td className="py-3 font-medium">{course.name}</td>
                          <td className="py-3 text-right">₹{fees.tuition.toLocaleString()}</td>
                          <td className="py-3 text-right">₹{fees.laboratory.toLocaleString()}</td>
                          <td className="py-3 text-right">₹{basicFees.toLocaleString()}</td>
                          <td className="py-3 text-right">₹{withHostel.toLocaleString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
