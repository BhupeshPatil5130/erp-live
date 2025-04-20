"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarClock, CalendarDays, Clock, Plus } from "lucide-react"

// Mock data for events
const events = [
  {
    id: 1,
    title: "Admission Start Date",
    date: new Date(2023, 5, 15),
    type: "admission",
    description: "Start of admission process for new academic year",
  },
  {
    id: 2,
    title: "Entrance Examination",
    date: new Date(2023, 6, 10),
    type: "exam",
    description: "Entrance examination for all courses",
  },
  {
    id: 3,
    title: "Results Declaration",
    date: new Date(2023, 6, 25),
    type: "result",
    description: "Declaration of entrance examination results",
  },
  {
    id: 4,
    title: "Fee Payment Deadline",
    date: new Date(2023, 7, 15),
    type: "fee",
    description: "Last date for fee payment for admitted students",
  },
  {
    id: 5,
    title: "Orientation Program",
    date: new Date(2023, 7, 25),
    type: "orientation",
    description: "Orientation program for new students",
  },
  {
    id: 6,
    title: "Classes Begin",
    date: new Date(2023, 8, 1),
    type: "academic",
    description: "Start of regular classes for all courses",
  },
  {
    id: 7,
    title: "Mid-Term Examination",
    date: new Date(2023, 10, 15),
    type: "exam",
    description: "Mid-term examinations for all courses",
  },
  {
    id: 8,
    title: "Winter Break",
    date: new Date(2023, 11, 20),
    type: "holiday",
    description: "Winter break for all students",
  },
]

// Event type colors
const eventColors: Record<string, string> = {
  admission: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  exam: "bg-red-100 text-red-800 hover:bg-red-200",
  result: "bg-green-100 text-green-800 hover:bg-green-200",
  fee: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  orientation: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  academic: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  holiday: "bg-gray-100 text-gray-800 hover:bg-gray-200",
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"month" | "list">("month")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEventType, setSelectedEventType] = useState<string>("admission")

  // Filter events for the selected date
  const selectedDateEvents = events.filter((event) => date && event.date.toDateString() === date.toDateString())

  // Function to check if a date has events
  const hasEvent = (day: Date) => {
    return events.some((event) => event.date.toDateString() === day.toDateString())
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Academic Calendar</h1>
          <p className="text-muted-foreground">Manage academic events and schedules</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 sm:mt-0">
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Create a new event in the academic calendar.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input id="event-title" placeholder="Enter event title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input id="event-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                    <SelectTrigger id="event-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admission">Admission</SelectItem>
                      <SelectItem value="exam">Examination</SelectItem>
                      <SelectItem value="result">Results</SelectItem>
                      <SelectItem value="fee">Fee Related</SelectItem>
                      <SelectItem value="orientation">Orientation</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea id="event-description" placeholder="Enter event description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Save Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar" onClick={() => setView("month")}>
            <CalendarDays className="mr-2 h-4 w-4" />
            Month View
          </TabsTrigger>
          <TabsTrigger value="list" onClick={() => setView("list")}>
            <CalendarClock className="mr-2 h-4 w-4" />
            List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View and manage academic events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  modifiers={{
                    hasEvent: (day) => hasEvent(day),
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      fontWeight: "bold",
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {date ? (
                    <span>
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  ) : (
                    <span>Select a date</span>
                  )}
                </CardTitle>
                <CardDescription>
                  {selectedDateEvents.length === 0
                    ? "No events scheduled"
                    : `${selectedDateEvents.length} events scheduled`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CalendarDays className="mb-2 h-12 w-12 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No events scheduled for this date</p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" /> Add Event
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <div key={event.id} className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge className={eventColors[event.type]}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                        <div className="mt-4 flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{event.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Academic Calendar Events</CardTitle>
              <CardDescription>All scheduled events for the academic year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {events
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event) => (
                    <div key={event.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <div className="min-w-[60px] text-center">
                        <div className="font-medium">{event.date.toLocaleDateString("en-US", { month: "short" })}</div>
                        <div className="text-2xl font-bold">{event.date.getDate()}</div>
                        <div className="text-xs text-muted-foreground">{event.date.getFullYear()}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge className={eventColors[event.type]}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
