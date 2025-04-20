"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Bell, Database } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated",
    })
  }

  const handleSaveBackup = () => {
    toast({
      title: "Backup Scheduled",
      description: "Database backup has been scheduled successfully",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic system settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="ERP Education System" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="asia-kolkata">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia-kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                        <SelectItem value="america-newyork">America/New_York (GMT-4:00)</SelectItem>
                        <SelectItem value="europe-london">Europe/London (GMT+1:00)</SelectItem>
                        <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="system-email">System Email</Label>
                  <Input id="system-email" type="email" defaultValue="system@erpeducation.com" />
                  <p className="text-sm text-muted-foreground">This email will be used for system notifications</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footer-text">Footer Text</Label>
                  <Textarea id="footer-text" defaultValue="© 2025 ERP Education System. All rights reserved." />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Enable maintenance mode to prevent user access during updates
                    </p>
                  </div>
                  <Switch
                    onCheckedChange={(checked) => {
                      toast({
                        title: checked ? "Maintenance Mode Enabled" : "Maintenance Mode Disabled",
                        description: checked
                          ? "Users will not be able to access the system"
                          : "System is now accessible to all users",
                      })
                    }}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveGeneral}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Enrollment</p>
                      <p className="text-sm text-muted-foreground">Send email when a new student enrolls</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Fee Payment</p>
                      <p className="text-sm text-muted-foreground">Send email when a fee payment is received</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Updates</p>
                      <p className="text-sm text-muted-foreground">Send email about system updates and maintenance</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-medium">SMS Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Fee Due Reminder</p>
                      <p className="text-sm text-muted-foreground">Send SMS reminders for fee payments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Admission Confirmation</p>
                      <p className="text-sm text-muted-foreground">Send SMS when admission is confirmed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>
                    <Bell className="mr-2 h-4 w-4" />
                    Save Notification Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Restore</CardTitle>
              <CardDescription>Manage database backups and restoration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Automated Backups</h3>

                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-time">Backup Time</Label>
                    <Select defaultValue="midnight">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="midnight">12:00 AM</SelectItem>
                        <SelectItem value="morning">6:00 AM</SelectItem>
                        <SelectItem value="noon">12:00 PM</SelectItem>
                        <SelectItem value="evening">6:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Retention Period</Label>
                    <Select defaultValue="30days">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">7 Days</SelectItem>
                        <SelectItem value="30days">30 Days</SelectItem>
                        <SelectItem value="90days">90 Days</SelectItem>
                        <SelectItem value="1year">1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-medium">Manual Backup</h3>
                  <p className="text-sm text-muted-foreground">Create an immediate backup of the database</p>

                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Backup Started",
                        description: "Manual backup process has been initiated",
                      })
                    }}
                  >
                    <Database className="mr-2 h-4 w-4" />
                    Create Backup Now
                  </Button>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-medium">Restore Database</h3>
                  <p className="text-sm text-muted-foreground">Restore from a previous backup</p>

                  <div className="space-y-2">
                    <Label htmlFor="backup-file">Select Backup File</Label>
                    <Input id="backup-file" type="file" />
                  </div>

                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast({
                        title: "Restore Confirmation",
                        description: "Please confirm this action in the admin panel",
                        variant: "destructive",
                      })
                    }}
                  >
                    Restore Database
                  </Button>
                </div>

                <div className="flex justify-end pt-6 border-t">
                  <Button onClick={handleSaveBackup}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Backup Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
