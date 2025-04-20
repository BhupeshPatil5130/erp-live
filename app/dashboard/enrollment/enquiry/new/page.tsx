"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import axios from "axios"

export default function NewEnquiryPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    gender: "",
    program: "",
    enquirerName: "",
    email: "",
    emailDomain: "@gmail.com",
    mobile: "",
    alternateMobile: "",
    locality: "",
    referralSource: "",
    followupDate: "",
    admissionForm: false,
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, followupDate: format(selectedDate, "yyyy-MM-dd") }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const fullEmail = formData.email + formData.emailDomain
      const enquiryData = { ...formData, email: fullEmail }

      const response = await axios.post("http://localhost:4000/api/enquiries", enquiryData, {
        withCredentials: true,
      })

      if (response.data.success) {
        toast({
          title: "Enquiry Created",
          description: `New enquiry for ${formData.studentName} has been created successfully.`,
        })
        router.push("/dashboard/enrollment/enquiry")
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to create enquiry",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating enquiry:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">New Enquiry</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Enter the details of the student for this enquiry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="studentName">
                  Student Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="Enter student's full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  id="gender"
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  className="flex space-x-4"
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">
                  Program <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.program}
                  onValueChange={(value) => handleSelectChange("program", value)}
                  required
                >
                  <SelectTrigger id="program">
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="playgroup">Play Group</SelectItem>
                    <SelectItem value="nursery">Nursery</SelectItem>
                    <SelectItem value="eurojunior">Euro Junior</SelectItem>
                    <SelectItem value="eurosenior">Euro Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Enquirer Information Section */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-4">Enquirer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="enquirerName">
                    Enquirer Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="enquirerName"
                    name="enquirerName"
                    value={formData.enquirerName}
                    onChange={handleInputChange}
                    placeholder="Enter enquirer's name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex">
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      className="rounded-r-none"
                      required
                    />
                    <Select
                      value={formData.emailDomain}
                      onValueChange={(value) => handleSelectChange("emailDomain", value)}
                    >
                      <SelectTrigger className="w-[180px] rounded-l-none">
                        <SelectValue placeholder="Domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="@gmail.com">@gmail.com</SelectItem>
                        <SelectItem value="@yahoo.com">@yahoo.com</SelectItem>
                        <SelectItem value="@hotmail.com">@hotmail.com</SelectItem>
                        <SelectItem value="@outlook.com">@outlook.com</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">
                    Mobile <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternateMobile">Alternate Mobile</Label>
                  <Input
                    id="alternateMobile"
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    onChange={handleInputChange}
                    placeholder="Enter alternate mobile number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locality">
                    Locality <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="locality"
                    name="locality"
                    value={formData.locality}
                    onChange={handleInputChange}
                    placeholder="Enter locality"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Other Details Section */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-4">Other Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="referralSource">
                    Referral Source <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.referralSource}
                    onValueChange={(value) => handleSelectChange("referralSource", value)}
                    required
                  >
                    <SelectTrigger id="referralSource">
                      <SelectValue placeholder="Select referral source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="social_media">Social Media</SelectItem>
                      <SelectItem value="friend">Friend/Family</SelectItem>
                      <SelectItem value="newspaper">Newspaper</SelectItem>
                      <SelectItem value="hoarding">Hoarding</SelectItem>
                      <SelectItem value="pamphlet">Pamphlet</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="followupDate">
                    Follow-up Date <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2 col-span-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="admissionForm"
                      checked={formData.admissionForm}
                      onCheckedChange={(checked) => handleCheckboxChange("admissionForm", checked as boolean)}
                    />
                    <Label htmlFor="admissionForm">Admission Form Issued</Label>
                  </div>
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Enter any additional notes"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Enquiry"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
