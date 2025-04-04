import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"
import { AntdRegistry } from "@ant-design/nextjs-registry"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PitchClerk - Music Distribution Platform",
  description: "Submit and distribute your music to platforms worldwide",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <AntdRegistry>
          <AuthProvider>{children}</AuthProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}



import './globals.css'