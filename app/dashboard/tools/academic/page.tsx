"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Clock, FileText, Plus } from "lucide-react"

// Mock data for academic years
const academicYears = [
  { id: "2023-24", name: "2023-2024", status: "current" },
  { id: "2022-23", name: "2022-2023", status: "past" },
  { id: "2021-22", name: "2021-2022", status: "past" },
  { id: "2024-25", name: "2024-2025", status: "upcoming" },
]

// Mock data for courses
const courses = [
  {
    id: "cs-2023",
    name: "Computer Science",
    year: "2023-24",
    students: 120,
    duration: "4 years",
    coordinator: "Dr. Smith",
  },
  {
    id: "business-2023",
    name: "Business Administration",
    year: "2023-24",
    students: 85,
    duration: "3 years",
    coordinator: "Dr. Johnson",
  },
  {
    id: "engineering-2023",
    name: "Engineering",
    year: "2023-24",
    students: 150,
    duration: "4 years",
    coordinator: "Dr. Williams",
  },
  {
    id: "arts-2023",
    name: "Arts & Humanities",
    year: "2023-24",
    students: 70,
    duration: "3 years",
    coordinator: "Dr. Brown",
  },
  {
    id: "medicine-2023",
    name: "Medical Sciences",
    year: "2023-24",
    students: 60,
    duration: "5 years",
    coordinator: "Dr. Davis",
  },
  {
    id: "cs-2022",
    name: "Computer Science",
    year: "2022-23",
    students: 110,
    duration: "4 years",
    coordinator: "Dr. Smith",
  },
  {
    id: "business-2022",
    name: "Business Administration",
    year: "2022-23",
    students: 80,
    duration: "3 years",
    coordinator: "Dr. Johnson",
  },
]

// Mock data for semesters
const semesters = [
  {
    id: "sem1-2023",
    name: "Semester 1",
    year: "2023-24",
    startDate: "Aug 1, 2023",
    endDate: "Dec 15, 2023",
    status: "active",
  },
  {
    id: "sem2-2023",
    name: "Semester 2",
    year: "2023-24",
    startDate: "Jan 15, 2024",
    endDate: "May 30, 2024",
    status: "upcoming",
  },
  {
    id: "sem1-2022",
    name: "Semester 1",
    year: "2022-23",
    startDate: "Aug 1, 2022",
    endDate: "Dec 15, 2022",
    status: "completed",
  },
  {
    id: "sem2-2022",
    name: "Semester 2",
    year: "2022-23",
    startDate: "Jan 15, 2023",
    endDate: "May 30, 2023",
    status: "completed",
  },
]

export default function AcademicPage() {
  const [selectedYear, setSelectedYear] = useState<string>("2023-24")
  const [searchTerm, setSearchTerm] = useState("")
  const [isYearDialogOpen, setIsYearDialogOpen] = useState(false)
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false)
  const [isSemesterDialogOpen, setIsSemesterDialogOpen] = useState(false)

  // Filter courses based on selected year and search term
  const filteredCourses = courses.filter(
    (course) =>
      course.year === selectedYear &&
      (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.coordinator.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Filter semesters based on selected year
  const filteredSemesters = semesters.filter((semester) => semester.year === selectedYear)

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Academic Management</h1>
        <p className="text-muted-foreground">Manage academic years, courses, and semesters</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {academicYears.map((year) => (
              <SelectItem key={year.id} value={year.id}>
                {year.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex-1">
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      <Tabs defaultValue="years" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="years">
            <Calendar className="mr-2 h-4 w-4" />
            Academic Years
          </TabsTrigger>
          <TabsTrigger value="courses">
            <BookOpen className="mr-2 h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="semesters">
            <Clock className="mr-2 h-4 w-4" />
            Semesters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="years">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Academic Years</CardTitle>
                <CardDescription>Manage academic year configurations</CardDescription>
              </div>
              <Dialog open={isYearDialogOpen} onOpenChange={setIsYearDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-4 sm:mt-0">
                    <Plus className="mr-2 h-4 w-4" /> Add Academic Year
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Academic Year</DialogTitle>
                    <DialogDescription>Create a new academic year in the system.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="year-name">Academic Year</Label>
                      <Input id="year-name" placeholder="e.g. 2024-2025" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year-start">Start Date</Label>
                      <Input id="year-start" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year-end">End Date</Label>
                      <Input id="year-end" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year-status">Status</Label>
                      <Select defaultValue="upcoming">
                        <SelectTrigger id="year-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="current">Current</SelectItem>
                          <SelectItem value="past">Past</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsYearDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsYearDialogOpen(false)}>Save Year</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Academic Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {academicYears.map((year) => (
                    <TableRow key={year.id}>
                      <TableCell className="font-medium">{year.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            year.status === "current" ? "default" : year.status === "upcoming" ? "outline" : "secondary"
                          }
                        >
                          {year.status.charAt(0).toUpperCase() + year.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{courses.filter((course) => course.year === year.id).length}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Courses for {academicYears.find((y) => y.id === selectedYear)?.name}</CardTitle>
                <CardDescription>Manage courses for the selected academic year</CardDescription>
              </div>
              <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-4 sm:mt-0">
                    <Plus className="mr-2 h-4 w-4" /> Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                    <DialogDescription>
                      Create a new course for the academic year {academicYears.find((y) => y.id === selectedYear)?.name}
                      .
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="course-name">Course Name</Label>
                      <Input id="course-name" placeholder="e.g. Computer Science" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-duration">Duration</Label>
                      <Select defaultValue="4">
                        <SelectTrigger id="course-duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Year</SelectItem>
                          <SelectItem value="2">2 Years</SelectItem>
                          <SelectItem value="3">3 Years</SelectItem>
                          <SelectItem value="4">4 Years</SelectItem>
                          <SelectItem value="5">5 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-coordinator">Course Coordinator</Label>
                      <Input id="course-coordinator" placeholder="e.g. Dr. Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-capacity">Maximum Capacity</Label>
                      <Input id="course-capacity" type="number" placeholder="e.g. 120" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCourseDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCourseDialogOpen(false)}>Save Course</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Coordinator</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>{course.coordinator}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCourses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No courses found for the selected academic year.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="semesters">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Semesters for {academicYears.find((y) => y.id === selectedYear)?.name}</CardTitle>
                <CardDescription>Manage semesters for the selected academic year</CardDescription>
              </div>
              <Dialog open={isSemesterDialogOpen} onOpenChange={setIsSemesterDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-4 sm:mt-0">
                    <Plus className="mr-2 h-4 w-4" /> Add Semester
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Semester</DialogTitle>
                    <DialogDescription>
                      Create a new semester for the academic year{" "}
                      {academicYears.find((y) => y.id === selectedYear)?.name}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="semester-name">Semester Name</Label>
                      <Input id="semester-name" placeholder="e.g. Semester 1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester-start">Start Date</Label>
                      <Input id="semester-start" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester-end">End Date</Label>
                      <Input id="semester-end" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester-status">Status</Label>
                      <Select defaultValue="upcoming">
                        <SelectTrigger id="semester-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsSemesterDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsSemesterDialogOpen(false)}>Save Semester</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSemesters.map((semester) => (
                    <TableRow key={semester.id}>
                      <TableCell className="font-medium">{semester.name}</TableCell>
                      <TableCell>{semester.startDate}</TableCell>
                      <TableCell>{semester.endDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            semester.status === "active"
                              ? "default"
                              : semester.status === "upcoming"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {semester.status.charAt(0).toUpperCase() + semester.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" /> Timetable
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredSemesters.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No semesters found for the selected academic year.
                      </TableCell>
                    </TableRow>
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
