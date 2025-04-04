"use client"

import { Descriptions, Tag, Divider, Alert } from "antd"
import { CheckCircle } from "lucide-react"

interface SubmissionFormProps {
  data: any
  pitchType?: string
}

export default function SubmissionForm({ data, pitchType = "Pitch to distribution" }: SubmissionFormProps) {
  const getPackageName = () => {
    switch (data.selectedPackage) {
      case "Pro":
        return "Pitch Pro"
      case "Advance":
        return "Pitch Boast"
      case "Curator":
        return "Curator Playlist Placement"
      default:
        return "No package selected"
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided"

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return dateString
    }
  }

  // Debug log to see what data is being passed
  console.log("SubmissionForm data:", data)

  return (
    <div className="space-y-8">
      <Alert
        message="Review Your Submission"
        description="Please review all the information below before submitting your pitch."
        type="info"
        showIcon
        className="mb-6"
      />

      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <Divider orientation="left">Pitch Information</Divider>
        <Descriptions bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Pitch Type">{pitchType}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <Divider orientation="left">Release Information</Divider>
        <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Release Title">{data.releaseTitle || "Not provided"}</Descriptions.Item>
          <Descriptions.Item label="Version">{data.version || "Original"}</Descriptions.Item>
          <Descriptions.Item label="Type">{data.type}</Descriptions.Item>
          <Descriptions.Item label="Primary Artist">{data.primaryArtist || "Not provided"}</Descriptions.Item>
          <Descriptions.Item label="Featuring Artist">{data.featuringArtist || "None"}</Descriptions.Item>
          <Descriptions.Item label="Record Name">{data.recordName || "Not provided"}</Descriptions.Item>
          <Descriptions.Item label="Release Description">{data.releaseDescription || "None"}</Descriptions.Item>
          <Descriptions.Item label="Genre">{data.genre || "Not provided"}</Descriptions.Item>
          <Descriptions.Item label="Sub Genre">{data.subGenre || "Not provided"}</Descriptions.Item>
          <Descriptions.Item label="UPC/EAN">{data.upcEan || "Not provided"}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <Divider orientation="left">Files</Divider>
        <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Music File">{data.musicFile?.name || "Not uploaded"}</Descriptions.Item>
          <Descriptions.Item label="Cover Photo">{data.coverPhoto?.name || "Not uploaded"}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <Divider orientation="left">Links & Dates</Divider>
        <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Platforms">
            {data.platforms && data.platforms.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.platforms.map((platform: string) => (
                  <Tag key={platform} color="purple">
                    {platform}
                  </Tag>
                ))}
              </div>
            ) : data.platform ? (
              <Tag color="purple">{data.platform}</Tag>
            ) : (
              "Not selected"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Pitch Location">{data.pitchLocation || "Not provided"}</Descriptions.Item>
          <Descriptions.Item label="Apple Music Link">{data.appleMusic || "Not provided"}</Descriptions.Item>
          <Descriptions.Item label="Music Link">{data.musicLink || "Not provided"}</Descriptions.Item>
          <Descriptions.Item label="Listen Link">{data.listenLink || "Not provided"}</Descriptions.Item>
          <Descriptions.Item label="Release Date">{formatDate(data.releaseDate)}</Descriptions.Item>
          <Descriptions.Item label="Promotion Date">{formatDate(data.promotionDate)}</Descriptions.Item>
          <Descriptions.Item label="Language">{data.language || "Not provided"}</Descriptions.Item>
          <Descriptions.Item label="Country">{data.country || "Not provided"}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <Divider orientation="left">Territory</Divider>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Selected Countries">
            {data.territories && data.territories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.territories.slice(0, 5).map((territory: string) => (
                  <Tag key={territory} color="purple">
                    {territory}
                  </Tag>
                ))}
                {data.territories.length > 5 && <Tag color="blue">+{data.territories.length - 5} more</Tag>}
              </div>
            ) : (
              "No territories selected"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Primary Territory">
            {data.territory || (data.territories && data.territories.length > 0 ? data.territories[0] : "Not selected")}
          </Descriptions.Item>
        </Descriptions>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <Divider orientation="left">Package</Divider>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Selected Package">
            {data.selectedPackage ? (
              <Tag color="green" icon={<CheckCircle className="h-4 w-4 mr-1" />}>
                {getPackageName()}
              </Tag>
            ) : (
              "No package selected"
            )}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  )
}

