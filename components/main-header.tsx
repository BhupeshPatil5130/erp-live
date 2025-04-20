"use client"

import { useEffect, useState } from "react"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "@/components/sidebar-provider"
import UserProfileMenu from "@/components/user-profile-menu"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

export function MainHeader() {
  const { isOpen, setIsOpen } = useSidebar()
  const { toast } = useToast()
  const [notificationCount, setNotificationCount] = useState(3)

  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
          withCredentials: true,
        })
        setUserName(res.data.name)
        setUserRole(res.data.role || "User") // fallback if role is not defined
      } catch (err) {
        console.error("Failed to fetch user info", err)
      }
    }

    fetchUser()
  }, [])

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    })
    setNotificationCount(0)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {notificationCount}
              </Badge>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
        <UserProfileMenu userName={userName} userRole={userRole} />
      </div>
    </header>
  )
}
