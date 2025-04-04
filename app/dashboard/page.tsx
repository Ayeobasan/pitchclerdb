import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Pitches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">You haven't submitted any pitches yet.</p>
            <Button asChild>
              <Link href="/dashboard/submit-pitch">
                Submit New Pitch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Track your music performance across platforms.</p>
            <Button asChild variant="outline">
              <Link href="/dashboard/analytics">
                View Analytics <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Manage your music distribution.</p>
            <Button asChild variant="outline">
              <Link href="/dashboard/distribute">
                Manage Distribution <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

