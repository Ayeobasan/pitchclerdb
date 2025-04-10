import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow text-center">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold">Registration Request Submitted</h1>

        <p className="text-gray-600">
          Thank you for your interest in PitchClerk! Your registration request has been submitted successfully.
        </p>

        <p className="text-gray-600">
          Our team will review your application and get back to you shortly. Once approved, you'll receive an email with
          your login credentials.
        </p>

        <div className="pt-4">
          <Button asChild className="w-full">
            <Link href="/login">Return to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
