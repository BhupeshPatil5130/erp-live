"use client"

import { useState, useRef, useEffect } from "react"
import { User, Users, Shield, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserProfileMenuProps {
  userName: string
  userRole: string
}

export default function UserProfileMenu({ userName, userRole }: UserProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleMenuItemClick = (path: string, title: string) => {
    setIsOpen(false)
    toast({
      title: `Navigating to ${title}`,
      description: "Loading page...",
      duration: 2000,
    })
    router.push(path)
  }

  const handleLogout = () => {
    setIsOpen(false)
    toast({
      title: "Logging out",
      description: "You are being logged out...",
      duration: 2000,
    })
    router.push("/login")
  }

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="hidden md:block">
          <p className="text-sm font-medium">{userName}</p>
          <p className="text-xs text-muted-foreground">{userRole}</p>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 overflow-hidden">
          <div className="p-4 border-b">
            <p className="font-medium">{userName}</p>
            <p className="text-sm text-muted-foreground">{userRole}</p>
          </div>

          <div className="py-1">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              onClick={() => handleMenuItemClick("/dashboard/profile", "Profile")}
            >
              <User className="mr-3 h-4 w-4" />
              Profile
            </button>

            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              onClick={() => handleMenuItemClick("/dashboard/users", "Manage Users")}
            >
              <Users className="mr-3 h-4 w-4" />
              Manage Users
            </button>

            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              onClick={() => handleMenuItemClick("/dashboard/settings/access", "Access Level")}
            >
              <Shield className="mr-3 h-4 w-4" />
              Access Level
            </button>

            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              onClick={() => handleMenuItemClick("/dashboard/settings", "Settings")}
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </button>
          </div>

          <div className="py-1 border-t">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
