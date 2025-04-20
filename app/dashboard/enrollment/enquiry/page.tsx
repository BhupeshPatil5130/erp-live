"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { getEnquiries } from "@/lib/api-service"

export default function EnquiryPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await getEnquiries()
        console.log("Fetched Enquiries:", response)

        if (response.success && Array.isArray(response.data)) {
          setEnquiries(response.data)
          setFilteredData(response.data)
        } else {
          toast({
            title: "Error",
            description: "Unexpected response format",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiries()
  }, [toast])

  const handleSearch = () => {
    const filtered = enquiries.filter(
      (item) =>
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile.includes(searchTerm),
    )
    setFilteredData(filtered)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "all") {
      setFilteredData(enquiries)
    } else {
      const filtered = enquiries.filter((e) => e.status?.toLowerCase() === value.toLowerCase())
      setFilteredData(filtered)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading enquiries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Enquiry Management</h1>
        <Button onClick={() => router.push("/dashboard/enrollment/enquiry/new")}>+ New Enquiry</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="interested">Interested</TabsTrigger>
          <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Button onClick={handleSearch} variant="outline">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </div>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Enquiries</CardTitle>
              <CardDescription>Showing all enquiries for: {activeTab}</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredData.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((enquiry, index) => (
                      <TableRow key={index}>
                        <TableCell>{enquiry.studentName}</TableCell>
                        <TableCell>{enquiry.email}</TableCell>
                        <TableCell>{enquiry.mobile}</TableCell>
                        <TableCell>{enquiry.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground text-sm px-4 py-6">
                  No enquiries found for this tab or search term.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
