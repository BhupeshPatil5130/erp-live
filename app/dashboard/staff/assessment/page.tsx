"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Eye, FileDown, Filter, Search, Plus, Star, StarHalf, Loader2 } from "lucide-react"
import { getStaffAssessments } from "@/lib/api-service"

export default function StaffAssessmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [assessments, setAssessments] = useState<any[]>([])
  const [filteredAssessments, setFilteredAssessments] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [filterType, setFilterType] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("")

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await getStaffAssessments()
        if (response.success) {
          setAssessments(response.data)
          setFilteredAssessments(response.data)
        } else {
          toast({
            title: "Error",
            description: "Failed to load staff assessments",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching staff assessments:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAssessments()
  }, [toast])

  const handleSearch = () => {
    let filtered = assessments

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (assessment) =>
          assessment.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assessment.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assessment.designation.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((assessment) => {
        if (activeTab === "excellent") return assessment.overallRating >= 4.5
        if (activeTab === "good") return assessment.overallRating >= 4.0 && assessment.overallRating < 4.5
        if (activeTab === "average") return assessment.overallRating >= 3.0 && assessment.overallRating < 4.0
        if (activeTab === "needsImprovement") return assessment.overallRating < 3.0
        return true
      })
    }

    // Apply assessment type filter
    if (filterType) {
      filtered = filtered.filter((assessment) => assessment.assessmentType === filterType)
    }

    // Apply department filter
    if (filterDepartment) {
      filtered = filtered.filter((assessment) => assessment.department === filterDepartment)
    }

    setFilteredAssessments(filtered)
  }

  useEffect(() => {
    handleSearch()
  }, [activeTab, filterType, filterDepartment])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleViewAssessment = (id: string) => {
    router.push(`/dashboard/staff/assessment/${id}`)
  }

  const handleNewAssessment = () => {
    toast({
      title: "Creating New Assessment",
      description: "Navigating to the new assessment form",
    })
    // In a real app, this would navigate to a new assessment form
    router.push("/dashboard/staff/assessment/new")
  }

  const handleExportAssessments = () => {
    toast({
      title: "Exporting Assessments",
      description: "Your assessment data is being exported",
    })
    // In a real app, this would trigger an export function
  }

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading staff assessments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Staff Assessment</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportAssessments}>
            <FileDown className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={handleNewAssessment}>
            <Plus className="mr-2 h-4 w-4" /> New Assessment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Assessments</TabsTrigger>
          <TabsTrigger value="excellent">Excellent</TabsTrigger>
          <TabsTrigger value="good">Good</TabsTrigger>
          <TabsTrigger value="average">Average</TabsTrigger>
          <TabsTrigger value="needsImprovement">Needs Improvement</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by name, ID or designation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Button variant="outline" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assessment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Quarterly">Quarterly</SelectItem>
                <SelectItem value="Annual">Annual</SelectItem>
                <SelectItem value="Probation">Probation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Pre-Primary">Pre-Primary</SelectItem>
                <SelectItem value="Primary">Primary</SelectItem>
                <SelectItem value="Administration">Administration</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" /> More Filters
            </Button>
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Staff Assessments</CardTitle>
              <CardDescription>
                Showing {filteredAssessments.length} assessment{filteredAssessments.length !== 1 && "s"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Assessment Date</TableHead>
                    <TableHead>Assessment Type</TableHead>
                    <TableHead>Overall Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssessments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                        No assessments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAssessments.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell>{assessment.staffId}</TableCell>
                        <TableCell>{assessment.staffName}</TableCell>
                        <TableCell>{assessment.designation}</TableCell>
                        <TableCell>{assessment.department}</TableCell>
                        <TableCell>{assessment.assessmentDate}</TableCell>
                        <TableCell>{assessment.assessmentType}</TableCell>
                        <TableCell>{renderRatingStars(assessment.overallRating)}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              assessment.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : assessment.status === "In Progress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {assessment.status}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleViewAssessment(assessment.id)}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
