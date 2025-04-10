"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "./logo"
import { Home, Music, Upload, BarChart2, Share2, BookOpen, Headphones, Settings, ChevronDown, Users, Shield } from "lucide-react"
import { useAuth } from "./auth/auth-provider"

export default function Sidebar() {
  const pathname = usePathname()
  const [toolsExpanded, setToolsExpanded] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }
  const allert = (message: string) => {
    window.alert(message)
  }
  const { user } = useAuth()

  const isAdmin = user?.role === "admin"
  const isAdminPath = pathname.startsWith("/admin")


  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-40 w-full bg-white border-b border-gray-200 p-3 flex items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="ml-3">
          {/* <Logo /> */}
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`w-60 border-r border-gray-200 flex flex-col h-full bg-white fixed lg:static z-40 transition-all duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >


        <nav className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          <ul className="px-2 space-y-1">
            <div className="">
              <Logo />
            </div>
            {isAdmin && isAdminPath ? (
              // Admin Navigation
              <ul className="px-2 space-y-1">
                <li>
                  <Link
                    href="/admin"
                    className={`sidebar-link ${isActive("/admin") && !isActive("/admin/users") ? "active" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Shield className="h-5 w-5" />
                    <span>Admin Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/users"
                    className={`sidebar-link ${isActive("/admin/users") ? "active" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Users className="h-5 w-5" />
                    <span>User Management</span>
                  </Link>
                </li>
                <li className="mt-4">
                  <Link href="/dashboard" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
                    <Home className="h-5 w-5" />
                    <span>Back to Dashboard</span>
                  </Link>
                </li>
              </ul>
            ) : (
              // Regular Navigation
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className={`sidebar-link ${isActive("/dashboard") && !isActive("/dashboard/submit-pitch") ? "active" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                </li>

                <li onClick={() => allert("Coming Soon")} className={`sidebar-link `}>

                  <Music className="h-5 w-5" />
                  <span >My Pitch</span>
                </li>
                <li>
                  <Link
                    href="/dashboard/submit-pitch"
                    className={`sidebar-link ${isActive("/dashboard/submit-pitch") ? "active" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Upload className="h-5 w-5" />
                    <span>Submit New Pitch</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  )
}

