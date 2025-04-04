import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SubmitSuccessPage() {
  return (
    <div className="container mx-auto p-6 max-w-md">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Submission Successful!</h1>
        <p className="text-gray-500 mb-6">
          Your pitch has been submitted successfully. We'll review it and get back to you soon.
        </p>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/submit-pitch">Submit Another Pitch</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

