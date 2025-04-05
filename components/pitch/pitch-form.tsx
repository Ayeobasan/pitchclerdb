"use client"

import { useState } from "react"
import { Button, message } from "antd"
import { ArrowRight, ArrowLeft } from "lucide-react"
import ReleaseInfoForm from "./release-info-form"
import UploadForm from "./upload-form"
import LinksForm from "./links-form"
import TerritoryForm from "./territory-form"
import PackageForm from "./package-form"
import SubmissionForm from "./submission-form"
import { PitchService } from "@/app/services/pitch.services"
import { useRouter } from "next/navigation"

interface PitchFormProps {
  step: number
  pitchType: string
  onNext: () => void
  onBack: () => void
  formData: any
  updateFormData: (data: any) => void
}

export default function PitchForm({ step, pitchType, onNext, onBack, formData, updateFormData }: PitchFormProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Map URL parameter to the exact pitch type expected by the API
  const getPitchTypeForAPI = (urlPitchType: string): string => {
    const pitchTypeMap: Record<string, string> = {
      distribution: "Pitch to distribution",
      "distributor-aggregator": "Pitch to distributor aggregator",
      publishing: "Pitch for publishing",
      advance: "Pitch for advance",
    }

    return pitchTypeMap[urlPitchType] || "Pitch to distribution"
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError(null)

    try {
      // Create a FormData object to send to the API
      const submitData = new FormData()

      // Add pitch type - map from URL parameter to expected API value
      submitData.append("pitchType", getPitchTypeForAPI(pitchType))

      // Add release info
      submitData.append("releaseInfo[title]", formData.releaseTitle)
      submitData.append("releaseInfo[version]", formData.version)
      submitData.append("releaseInfo[primaryArtist]", formData.primaryArtist)
      submitData.append("releaseInfo[featuringArtist]", formData.featuringArtist || "")
      submitData.append("releaseInfo[genre]", formData.genre)
      submitData.append("releaseInfo[subGenre]", formData.subGenre)
      submitData.append("releaseInfo[recordName]", formData.recordName || "")
      submitData.append("releaseInfo[upsEan]", formData.upcEan)

      // Add links
      submitData.append("links[pitchLocation]", formData.pitchLocation || formData.listenLink || "")
      submitData.append("links[appleMusic]", formData.appleMusic || "")
      submitData.append("links[musicLink]", formData.musicLink || formData.listenLink || "")
      submitData.append("links[releaseDate]", formData.releaseDate)
      submitData.append("links[promotionStartDate]", formData.promotionDate)
      submitData.append("links[language]", formData.language)
      submitData.append("links[country]", formData.country)

      // Add territory - use the first territory from the list or the territory field
      submitData.append(
        "territory",
        formData.territory || (formData.territories.length > 0 ? formData.territories[0] : ""),
      )

      // Add package plan
      submitData.append("packagePlan", formData.selectedPackage)

      // Add files
      if (formData.musicFile) {
        submitData.append("musicFile", formData.musicFile)
      }

      if (formData.coverPhoto) {
        submitData.append("coverPhoto", formData.coverPhoto)
      }

      console.log("Submitting pitch with data:", {
        pitchType: getPitchTypeForAPI(pitchType),
        releaseInfo: {
          title: formData.releaseTitle,
          version: formData.version,
          primaryArtist: formData.primaryArtist,
          featuringArtist: formData.featuringArtist,
          genre: formData.genre,
          subGenre: formData.subGenre,
          recordName: formData.recordName,
          upsEan: formData.upcEan,
        },
        links: {
          pitchLocation: formData.pitchLocation || formData.listenLink,
          appleMusic: formData.appleMusic,
          musicLink: formData.musicLink || formData.listenLink,
          releaseDate: formData.releaseDate,
          promotionStartDate: formData.promotionDate,
          language: formData.language,
          country: formData.country,
        },
        territory: formData.territory || (formData.territories.length > 0 ? formData.territories[0] : ""),
        packagePlan: formData.selectedPackage,
        files: {
          musicFile: formData.musicFile?.name,
          coverPhoto: formData.coverPhoto?.name,
        },
      })

      // Submit the form
      const response = await PitchService.createPitch(submitData)
      console.log(response)
      message.success("Pitch submitted successfully!")
      router.push(response.paymentLink)
    } catch (error: any) {
      console.error("Error submitting pitch:", error)
      console.log(error)

      const errorMessage =
        error?.response?.data?.message ||
        (error?.message === "File upload failed"
          ? "File upload failed. Please check your files and try again."
          : "Failed to submit pitch. Please try again.")

      setSubmitError(errorMessage)
      message.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return <ReleaseInfoForm data={formData} updateData={updateFormData} />
      case 1:
        return <UploadForm data={formData} updateData={updateFormData} />
      case 2:
        return <LinksForm data={formData} updateData={updateFormData} />
      case 3:
        return <TerritoryForm data={formData} updateData={updateFormData} />
      case 4:
        return <PackageForm data={formData} updateData={updateFormData} />
      case 5:
        return (
          <>
            {submitError && (
              <div className="mb-6">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{submitError}</span>
                </div>
              </div>
            )}
            <SubmissionForm data={formData} pitchType={getPitchTypeForAPI(pitchType)} />
          </>
        )
      default:
        return null
    }
  }

  const handleNextClick = () => {
    if (step === 5) {
      handleSubmit()
    } else {
      onNext()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {renderStep()}

      <div className="mt-8 flex justify-between">
        <Button type="default" onClick={onBack} size="large" icon={<ArrowLeft className="h-4 w-4 mr-2" />}>
          Go back
        </Button>

        <Button type="primary" onClick={handleNextClick} loading={submitting} size="large">
          {step === 5 ? "Submit" : "Proceed"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

