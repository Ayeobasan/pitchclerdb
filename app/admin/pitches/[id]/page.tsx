"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, Descriptions, Tag, Button, Spin, message, Select, Space } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { AdminService } from "@/app/services/admin.services"
import { useAuth } from "@/components/auth/auth-provider"

const { Option } = Select

export default function PitchDetailPage() {
  const params = useParams()
  const router = useRouter()
  const pitchId = params.id as string

  const [pitch, setPitch] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [newStatus, setNewStatus] = useState<string>("")

  useEffect(() => {
    if (pitchId) {
      fetchPitchDetails()
    }
  }, [pitchId])
const {user} = useAuth()
  const fetchPitchDetails = async () => {
    try {
      setLoading(true)
      // For now, we'll use the getAllPitches and filter for the specific pitch
      // In a real implementation, you'd have a dedicated endpoint for fetching a single pitch
      const response = await AdminService.getAllPitches()
      if (response.status === "success" && Array.isArray(response.data)) {
        const foundPitch = response.data.find((p) => p._id === pitchId)
        if (foundPitch) {
          setPitch(foundPitch)
          setNewStatus(foundPitch.status || "pending")
        } else {
          message.error("Pitch not found")
          router.push("/admin/pitches")
        }
      }
    } catch (error) {
      console.error("Failed to fetch pitch details:", error)
      message.error("Failed to load pitch details. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async () => {
    try {
      setUpdatingStatus(true)
      await AdminService.updatePitchStatus(pitchId, newStatus)
      message.success(`Pitch status updated to ${newStatus}`)

      // Update the local state
      setPitch((prev) => ({
        ...prev,
        status: newStatus,
      }))
    } catch (error) {
      console.error("Failed to update pitch status:", error)
      message.error("Failed to update pitch status. Please try again.")
    } finally {
      setUpdatingStatus(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "green"
      case "pending":
        return "orange"
      case "declined":
        return "red"
      case "in review":
        return "blue"
      default:
        return "default"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  if (!pitch) {
    return (
      <div className=" mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pitch Not Found</h1>
          <Button type="primary" onClick={() => router.push("/admin/pitches")}>
            Back to Pitches
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className=" mx-auto">
      <div className="mb-6">
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.push("/admin/pitches")} className="mb-4">
          Back to Pitches
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">{pitch.releaseInfo?.title || "Untitled Pitch"}</h1>
            <p className="text-gray-500">
              Submitted by {user?.firstName || "Unknown"} on {new Date(pitch.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Tag color={getStatusColor(pitch.status)} className="text-base px-3 py-1">
              {(pitch.status || "pending").toUpperCase()}
            </Tag>

            <Space>
              <Select value={newStatus} onChange={setNewStatus} style={{ width: 140 }} disabled={updatingStatus}>
                <Option value="approved">Approved</Option>
                <Option value="declined">Declined</Option>
              </Select>

              <Button type="primary" onClick={handleUpdateStatus} loading={updatingStatus}>
                Update Status
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card title="Release Information" className="shadow-sm">
          <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Title">{pitch.releaseInfo?.title || "Not provided"}</Descriptions.Item>
            <Descriptions.Item label="Version">{pitch.releaseInfo?.version || "Original"}</Descriptions.Item>
            <Descriptions.Item label="Primary Artist">
              {pitch.releaseInfo?.primaryArtist || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item label="Featuring Artist">
              {pitch.releaseInfo?.featuringArtist || "None"}
            </Descriptions.Item>
            <Descriptions.Item label="Genre">{pitch.releaseInfo?.genre || "Not provided"}</Descriptions.Item>
            <Descriptions.Item label="Sub Genre">{pitch.releaseInfo?.subGenre || "Not provided"}</Descriptions.Item>
            <Descriptions.Item label="Record Name">{pitch.releaseInfo?.recordName || "Not provided"}</Descriptions.Item>
            <Descriptions.Item label="UPC/EAN">{pitch.releaseInfo?.upsEan || "Not provided"}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Pitch Details" className="shadow-sm">
          <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Pitch Type">{pitch.pitchType || "Not specified"}</Descriptions.Item>
            <Descriptions.Item label="Package Plan">{pitch.packagePlan || "None"}</Descriptions.Item>
            <Descriptions.Item label="Territory">{pitch.territory || "Not specified"}</Descriptions.Item>
            <Descriptions.Item label="Payment Link">
              {pitch.paymentLink ? (
                <a
                  href={pitch.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Payment Link
                </a>
              ) : (
                "Not available"
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Links & Dates" className="shadow-sm">
          <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Pitch Location">
              {pitch.links?.pitchLocation ? (
                <a
                  href={pitch.links.pitchLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {pitch.links.pitchLocation}
                </a>
              ) : (
                "Not provided"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Apple Music">
              {pitch.links?.appleMusic ? (
                <a
                  href={pitch.links.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Apple Music Link
                </a>
              ) : (
                "Not provided"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Music Link">
              {pitch.links?.musicLink ? (
                <a
                  href={pitch.links.musicLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Music Link
                </a>
              ) : (
                "Not provided"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Release Date">
              {pitch.links?.releaseDate ? new Date(pitch.links.releaseDate).toLocaleDateString() : "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item label="Promotion Date">
              {pitch.links?.promotionStartDate
                ? new Date(pitch.links.promotionStartDate).toLocaleDateString()
                : "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item label="Language">{pitch.links?.language || "Not provided"}</Descriptions.Item>
            <Descriptions.Item label="Country">{pitch.links?.country || "Not provided"}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Files" className="shadow-sm">
          <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Music File">
              {pitch.uploads?.musicFile ? (
                <a
                  href={pitch.uploads.musicFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Download Music File
                </a>
              ) : (
                "Not uploaded"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Cover Photo">
              {pitch.uploads?.coverPhoto ? (
                <a
                  href={pitch.uploads.coverPhoto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Cover Photo
                </a>
              ) : (
                "Not uploaded"
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Submitter Information" className="shadow-sm">
          <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Name">
              {pitch.user?.firstName ? `${pitch.user.firstName} ${pitch.user.lastName || ""}` : "Unknown"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{pitch.user?.email || "Not available"}</Descriptions.Item>
            <Descriptions.Item label="Role">{pitch.user?.role || "user"}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  )
}
