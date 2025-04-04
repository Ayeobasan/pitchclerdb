"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import PitchForm from "@/components/pitch/pitch-form"
import { Tabs } from "antd"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PitchFormPage() {
  const params = useParams()
  const pitchType = params.type as string
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  // Define the form data state at this level so it persists between tab changes
  const [formData, setFormData] = useState({
    // Release info
    releaseTitle: "",
    type: "Single",
    primaryArtist: "",
    featuringArtist: "",
    releaseDescription: "",
    genre: "",
    subGenre: "",
    marketingPlan: "",
    recordName: "",
    upcEan: "",
    version: "Original",

    // Upload
    musicFile: null as File | null,
    coverPhoto: null as File | null,

    // Links
    platform: "Apple Music",
    platforms: ["Apple Music"] as string[],
    pitchLocation: "",
    appleMusic: "",
    musicLink: "",
    listenLink: "",
    releaseDate: "",
    promotionDate: "",
    language: "",
    country: "",

    // Territory
    territories: [] as string[],
    territory: "",

    // Package
    selectedPackage: "",
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }))
    console.log("Form data updated:", { ...formData, ...data })
  }

  const steps = ["Release information", "Upload", "Links", "Territory", "Package", "Submission"]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form and redirect handled in PitchForm component
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push("/dashboard/submit-pitch")
    }
  }

  const getPitchTypeTitle = () => {
    switch (pitchType) {
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

  const onChange = (key: string) => {
    setCurrentStep(Number.parseInt(key))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-2" onClick={() => router.push("/dashboard/submit-pitch")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-medium text-gray-500">Pitch / {getPitchTypeTitle()}</h1>
      </div>

      <Tabs
        activeKey={currentStep.toString()}
        onChange={onChange}
        type="card"
        className="custom-tabs"
        items={steps.map((step, i) => ({
          label: step,
          key: i.toString(),
          children: (
            <div className="pt-6">
              <PitchForm
                step={currentStep}
                pitchType={pitchType}
                onNext={handleNext}
                onBack={handleBack}
                formData={formData}
                updateFormData={updateFormData}
              />
            </div>
          ),
        }))}
      />
    </div>
  )
}

