"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data for courses
const courseData = [
  { id: "CRS001", name: "Computer Science", code: "CS", duration: "4 years", type: "B.Tech" },
  { id: "CRS002", name: "Business Administration", code: "BA", duration: "3 years", type: "BBA" },
  { id: "CRS003", name: "Electrical Engineering", code: "EE", duration: "4 years", type: "B.Tech" },
  { id: "CRS004", name: "Psychology", code: "PSY", duration: "3 years", type: "B.A." },
  { id: "CRS005", name: "Mechanical Engineering", code: "ME", duration: "4 years", type: "B.Tech" },
]

// Mock data for departments
const departmentData = [
  { id: "DEP001", name: "Computer Science", code: "CS", head: "John Smith" },
  { id: "DEP002", name: "Business Administration", code: "BA", head: "Sarah Johnson" },
  { id: "DEP003", name: "Electrical Engineering", code: "EE", head: "Michael Brown" },
  { id: "DEP004", name: "Psychology", code: "PSY", head: "Emily Davis" },
  { id: "DEP005", name: "Mechanical Engineering", code: "ME", head: "David Wilson" },
]

// Mock data for subjects
const subjectData = [
  { id: "SUB001", name: "Introduction to Programming", code: "CS101", department: "Computer Science", credits: 4 },
  { id: "SUB002", name: "Principles of Management", code: "BA101", department: "Business Administration", credits: 3 },
  { id: "SUB003", name: "Circuit Theory", code: "EE101", department: "Electrical Engineering", credits: 4 },
  { id: "SUB004", name: "Introduction to Psychology", code: "PSY101", department: "Psychology", credits: 3 },
  { id: "SUB005", name: "Engineering Mechanics", code: "ME101", department: "Mechanical Engineering", credits: 4 },
]

export default function StaticDataPage() {
  const { toast } = useToast()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [itemType, setItemType] = useState<"course" | "department" | "subject">("course")

  const handleEditItem = (item: any, type: "course" | "department" | "subject") => {
    setSelectedItem(item)
    setItemType(type)
    setIsEditDialogOpen(true)
  }

  const handleDeleteItem = (item: any, type: "course" | "department" | "subject") => {
    setSelectedItem(item)
    setItemType(type)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API
    toast({
      title: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} Deleted`,
      description: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} ${selectedItem.name} has been deleted successfully.`,
    })
    setIsDeleteDialogOpen(false)
  }

  const saveEditedItem = () => {
    // In a real app, this would call an API
    toast({
      title: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} Updated`,
      description: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} ${selectedItem.name} has been updated successfully.`,
    })
    setIsEditDialogOpen(false)
  }

  const [courseSearchTerm, setCourseSearchTerm] = useState("")
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState("")
  const [subjectSearchTerm, setSubjectSearchTerm] = useState("")

  const [filteredCourses, setFilteredCourses] = useState(courseData)
  const [filteredDepartments, setFilteredDepartments] = useState(departmentData)
  const [filteredSubjects, setFilteredSubjects] = useState(subjectData)

  const handleCourseSearch = () => {
    const filtered = courseData.filter(
      (item) =>
        item.name.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(courseSearchTerm.toLowerCase()),
    )
    setFilteredCourses(filtered)
  }

  const handleDepartmentSearch = () => {
    const filtered = departmentData.filter(
      (item) =>
        item.name.toLowerCase().includes(departmentSearchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(departmentSearchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(departmentSearchTerm.toLowerCase()) ||
        item.head.toLowerCase().includes(departmentSearchTerm.toLowerCase()),
    )
    setFilteredDepartments(filtered)
  }

  const handleSubjectSearch = () => {
    const filtered = subjectData.filter(
      (item) =>
        item.name.toLowerCase().includes(subjectSearchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(subjectSearchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(subjectSearchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(subjectSearchTerm.toLowerCase()),
    )
    setFilteredSubjects(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Static Data Management</h1>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search courses..."
                value={courseSearchTerm}
                onChange={(e) => setCourseSearchTerm(e.target.value)}
                className="w-80"
              />
              <Button variant="outline" onClick={handleCourseSearch}>
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Course
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Courses</CardTitle>
              <CardDescription>Manage all courses offered by the institutes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.id}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.type}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditItem(course, "course")}>
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeleteItem(course, "course")}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search departments..."
                value={departmentSearchTerm}
                onChange={(e) => setDepartmentSearchTerm(e.target.value)}
                className="w-80"
              />
              <Button variant="outline" onClick={handleDepartmentSearch}>
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Department
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Departments</CardTitle>
              <CardDescription>Manage all departments in the institutes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Department Head</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell>{department.id}</TableCell>
                      <TableCell>{department.name}</TableCell>
                      <TableCell>{department.code}</TableCell>
                      <TableCell>{department.head}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditItem(department, "department")}>
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeleteItem(department, "department")}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search subjects..."
                value={subjectSearchTerm}
                onChange={(e) => setSubjectSearchTerm(e.target.value)}
                className="w-80"
              />
              <Button variant="outline" onClick={handleSubjectSearch}>
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Subject
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Subjects</CardTitle>
              <CardDescription>Manage all subjects taught in the institutes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell>{subject.id}</TableCell>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{subject.code}</TableCell>
                      <TableCell>{subject.department}</TableCell>
                      <TableCell>{subject.credits}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditItem(subject, "subject")}>
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeleteItem(subject, "subject")}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit {itemType.charAt(0).toUpperCase() + itemType.slice(1)}</DialogTitle>
            <DialogDescription>Update the {itemType} details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-4 py-4">
              {itemType === "course" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Course Name</Label>
                    <Input
                      id="edit-name"
                      value={selectedItem.name}
                      onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-code">Course Code</Label>
                      <Input
                        id="edit-code"
                        value={selectedItem.code}
                        onChange={(e) => setSelectedItem({ ...selectedItem, code: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-duration">Duration</Label>
                      <Input
                        id="edit-duration"
                        value={selectedItem.duration}
                        onChange={(e) => setSelectedItem({ ...selectedItem, duration: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Type</Label>
                    <Input
                      id="edit-type"
                      value={selectedItem.type}
                      onChange={(e) => setSelectedItem({ ...selectedItem, type: e.target.value })}
                    />
                  </div>
                </>
              )}

              {itemType === "department" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Department Name</Label>
                    <Input
                      id="edit-name"
                      value={selectedItem.name}
                      onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-code">Department Code</Label>
                      <Input
                        id="edit-code"
                        value={selectedItem.code}
                        onChange={(e) => setSelectedItem({ ...selectedItem, code: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-head">Department Head</Label>
                      <Input
                        id="edit-head"
                        value={selectedItem.head}
                        onChange={(e) => setSelectedItem({ ...selectedItem, head: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}

              {itemType === "subject" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Subject Name</Label>
                    <Input
                      id="edit-name"
                      value={selectedItem.name}
                      onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-code">Subject Code</Label>
                      <Input
                        id="edit-code"
                        value={selectedItem.code}
                        onChange={(e) => setSelectedItem({ ...selectedItem, code: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-credits">Credits</Label>
                      <Input
                        id="edit-credits"
                        type="number"
                        value={selectedItem.credits}
                        onChange={(e) => setSelectedItem({ ...selectedItem, credits: Number.parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-department">Department</Label>
                    <Input
                      id="edit-department"
                      value={selectedItem.department}
                      onChange={(e) => setSelectedItem({ ...selectedItem, department: e.target.value })}
                    />
                  </div>
                </>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedItem}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {itemType}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
