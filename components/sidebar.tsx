"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "./logo"
import { Home, Music, Upload, BarChart2, Share2, BookOpen, Headphones, Settings, ChevronDown } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const [toolsExpanded, setToolsExpanded] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

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
            <li>
              <Link
                href="/dashboard/my-pitch"
                className={`sidebar-link ${isActive("/dashboard/my-pitch") ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Music className="h-5 w-5" />
                <span>My Pitch</span>
              </Link>
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
            {/* <li>
              <Link
                href="/dashboard/analytics"
                className={`sidebar-link ${isActive("/dashboard/analytics") ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <BarChart2 className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/distribute"
                className={`sidebar-link ${isActive("/dashboard/distribute") ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Share2 className="h-5 w-5" />
                <span>Distribute</span>
              </Link>
            </li> */}
          </ul>

          {/* <div className="mt-4">
            <button
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
              onClick={() => setToolsExpanded(!toolsExpanded)}
            >
              <span>Professional tool</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${toolsExpanded ? "transform rotate-180" : ""}`} />
            </button>

            {toolsExpanded && (
              <ul className="px-2 space-y-1 mt-1">
                <li>
                  <Link
                    href="/dashboard/music-publishing"
                    className={`sidebar-link ${isActive("/dashboard/music-publishing") ? "active" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>Music Publishing</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <ul className="px-2 space-y-1 mt-4">
            <li>
              <Link
                href="/dashboard/support"
                className={`sidebar-link ${isActive("/dashboard/support") ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Headphones className="h-5 w-5" />
                <span>Support ticket</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className={`sidebar-link ${isActive("/dashboard/settings") ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul> */}
        </nav>
      </div>
    </>
  )
}

