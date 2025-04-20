"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, FileDown, Eye, Download, Calendar, Edit, Trash, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const courseOptions = [
  "Computer Science",
  "Business Administration",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Psychology",
  "Civil Engineering",
  "Information Technology",
  "Data Science",
]

const batchOptions = ["2023-24", "2024-25", "2025-26"]

const instructorOptions = [
  "Dr. Robert Johnson",
  "Prof. Emily Williams",
  "Dr. James Anderson",
  "Dr. Sarah Thompson",
  "Prof. Michael Clark",
  "Dr. Lisa Martinez",
  "Prof. David Wilson",
]

export default function DTPViewPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [dtpData, setDtpData] = useState([])
  const [students, setStudents] = useState([])
  const [selectedDTP, setSelectedDTP] = useState(null)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [newDTP, setNewDTP] = useState({
    studentId: "",
    name: "",
    course: "",
    batch: "",
    startDate: "",
    endDate: "",
    instructor: "",
    notes: "",
  })

  useEffect(() => {
    fetchStudents()
    fetchDtpData()
  }, [])

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admissions/students")
      setStudents(res.data)
    } catch (error) {
      console.error("Failed to fetch students:", error)
    }
  }

  const fetchDtpData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/dtp")
      setDtpData(res.data)
      setFilteredData(res.data)
    } catch (error) {
      console.error("Failed to fetch DTP data:", error)
    }
  }

  const handleSearch = () => {
    const filtered = dtpData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredData(filtered)
  }

  const handleScheduleDTP = async () => {
    try {
      await axios.post("http://localhost:4000/api/dtp", newDTP)
      toast({
        title: "DTP Scheduled",
        description: `DTP for ${newDTP.name} has been scheduled.`,
      })
      setIsScheduleDialogOpen(false)
      setNewDTP({
        studentId: "",
        name: "",
        course: "",
        batch: "",
        startDate: "",
        endDate: "",
        instructor: "",
        notes: "",
      })
      fetchDtpData()
    } catch (error) {
      console.error("Failed to schedule DTP:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">DTP View</h1>
        <div className="flex gap-2">
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Schedule DTP
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule DTP</DialogTitle>
                <DialogDescription>Select student and schedule details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Select Student</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem
                            key={student._id}
                            value={student.studentId}
                            onClick={() =>
                              setNewDTP((prev) => ({
                                ...prev,
                                studentId: student.studentId,
                                name: student.name,
                                course: student.course,
                                batch: student.batch,
                              }))
                            }
                          >
                            {student.name} ({student.studentId})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Select Instructor</Label>
                    <Select onValueChange={(value) => setNewDTP({ ...newDTP, instructor: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        {instructorOptions.map((inst) => (
                          <SelectItem key={inst} value={inst}>
                            {inst}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={newDTP.startDate}
                      onChange={(e) => setNewDTP({ ...newDTP, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={newDTP.endDate}
                      onChange={(e) => setNewDTP({ ...newDTP, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Enter any additional notes"
                    value={newDTP.notes}
                    onChange={(e) => setNewDTP({ ...newDTP, notes: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleScheduleDTP}>Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>
            <FileDown className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Search DTP</CardTitle>
          <CardDescription>Filter records by student or course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Search by name, ID, course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>DTP Records</CardTitle>
          <CardDescription>Overview of scheduled training programs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DTP ID</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Instructor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((dtp) => (
                <TableRow key={dtp._id}>
                  <TableCell>{dtp.id}</TableCell>
                  <TableCell>{dtp.studentId}</TableCell>
                  <TableCell>{dtp.name}</TableCell>
                  <TableCell>{dtp.course}</TableCell>
                  <TableCell>{dtp.batch}</TableCell>
                  <TableCell>{dtp.startDate}</TableCell>
                  <TableCell>{dtp.endDate}</TableCell>
                  <TableCell>{dtp.instructor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
