"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Download, Edit, Printer, Star, StarHalf, Loader2 } from "lucide-react"
import { getStaffAssessmentById } from "@/lib/api-service"

export default function StaffAssessmentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [assessment, setAssessment] = useState<any>(null)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await getStaffAssessmentById(params.id)
        if (response.success) {
          setAssessment(response.data)
        } else {
          toast({
            title: "Error",
            description: "Failed to load assessment details",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching assessment details:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAssessment()
  }, [params.id, toast])

  const handleEditAssessment = () => {
    toast({
      title: "Editing Assessment",
      description: "Navigating to edit assessment form",
    })
    // In a real app, this would navigate to an edit form
    router.push(`/dashboard/staff/assessment/${params.id}/edit`)
  }

  const handlePrintAssessment = () => {
    toast({
      title: "Printing Assessment",
      description: "Preparing assessment for printing",
    })
    // In a real app, this would trigger a print function
    window.print()
  }

  const handleDownloadReport = () => {
    toast({
      title: "Downloading Report",
      description: "Your assessment report is being downloaded",
    })
    // In a real app, this would trigger a download function
  }

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please enter feedback before submitting",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Feedback Submitted",
      description: "Your feedback has been submitted successfully",
    })
    setFeedback("")
  }

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        {hasHalfStar && <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
        <span className="ml-2 text-lg font-medium">{rating.toFixed(1)}</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading assessment details...</p>
        </div>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-muted-foreground">Assessment not found</p>
        <Button className="mt-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Staff Assessment Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrintAssessment}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button onClick={handleEditAssessment}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Staff Information</CardTitle>
            <CardDescription>Basic information about the staff member</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Staff ID</h3>
                <p className="text-lg font-medium">{assessment.staffId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                <p className="text-lg font-medium">{assessment.staffName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Designation</h3>
                <p className="text-lg font-medium">{assessment.designation}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                <p className="text-lg font-medium">{assessment.department}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Assessment Date</h3>
                <p className="text-lg font-medium">{assessment.assessmentDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Assessment Type</h3>
                <p className="text-lg font-medium">{assessment.assessmentType}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Overall assessment rating and summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Overall Rating</h3>
                <div className="flex items-center">
                  {renderRatingStars(assessment.overallRating)}
                  <span className="ml-4 text-sm text-muted-foreground">
                    {assessment.overallRating >= 4.5
                      ? "Excellent"
                      : assessment.overallRating >= 4.0
                        ? "Good"
                        : assessment.overallRating >= 3.0
                          ? "Average"
                          : "Needs Improvement"}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Assessor</h3>
                <p>{assessment.assessor}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Status</h3>
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
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="criteria" className="md:col-span-3">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="criteria">Performance Criteria</TabsTrigger>
            <TabsTrigger value="strengths">Strengths & Areas for Improvement</TabsTrigger>
            <TabsTrigger value="action">Action Plan</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="criteria">
            <Card>
              <CardHeader>
                <CardTitle>Performance Criteria</CardTitle>
                <CardDescription>Detailed ratings for each performance area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {assessment.criteria.map((criterion: any, index: number) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{criterion.name}</h3>
                        <div className="flex items-center">{renderRatingStars(criterion.rating)}</div>
                      </div>
                      <p className="text-sm text-muted-foreground">{criterion.comments}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strengths">
            <Card>
              <CardHeader>
                <CardTitle>Strengths & Areas for Improvement</CardTitle>
                <CardDescription>Key strengths and areas where improvement is needed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Strengths</h3>
                    <p className="text-sm">{assessment.strengths}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Areas for Improvement</h3>
                    <p className="text-sm">{assessment.areasOfImprovement}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="action">
            <Card>
              <CardHeader>
                <CardTitle>Action Plan</CardTitle>
                <CardDescription>Steps to be taken for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Action Plan</h3>
                    <p className="text-sm">{assessment.actionPlan}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Assessor Comments</h3>
                    <p className="text-sm">{assessment.assessorComments}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Staff Comments</h3>
                    <p className="text-sm">{assessment.staffComments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Provide Feedback</CardTitle>
                <CardDescription>Add your feedback or comments to this assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your feedback or comments here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
