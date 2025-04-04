"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ChevronDown } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard"
    if (pathname === "/dashboard/my-pitch") return "My Pitch"
    if (pathname === "/dashboard/submit-pitch") return "Submit New Pitch"
    if (pathname.startsWith("/dashboard/submit-pitch/")) {
      const type = pathname.split("/").pop()
      switch (type) {
        case "distribution":
          return "Pitch To Distribution"
        case "distributor-aggregator":
          return "Pitch To Distributor Aggregator"
        case "publishing":
          return "Pitch For Publishing"
        case "advance":
          return "Pitch For Advance"
        default:
          return "Submit New Pitch"
      }
    }
    if (pathname === "/dashboard/analytics") return "Analytics"
    if (pathname === "/dashboard/distribute") return "Distribute"
    return "Dashboard"
  }

  return (
    <header className="h-14 border-b border-gray-200 flex items-center px-4 bg-white sticky top-0 z-10 mt-14 lg:mt-0">
      <div className="flex-1 flex items-center">
        <h1 className="text-lg font-medium">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name || "User"} />
                <AvatarFallback>
                  {user?.firstName ? user.firstName.charAt(0) : user?.name ? user.name.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className=" flex-col items-start text-sm hidden sm:flex">
                <span className="font-medium">
                  {user?.name || (user?.firstName && user?.lastName) ? `${user.firstName} ${user.lastName}` : "User"}
                </span>
                <span className="text-xs text-gray-500">Artist</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button asChild className="hidden sm:flex">
          <Link href="/dashboard/submit-pitch">Submit New Pitch</Link>
        </Button>
      </div>
    </header>
  )
}

