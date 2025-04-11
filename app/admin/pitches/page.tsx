"use client"

import { useState, useEffect } from "react"
import { Table, Button, Input, Space, Tag, message, Modal, Select, Tooltip } from "antd"
import { SearchOutlined, EyeOutlined } from "@ant-design/icons"
import { AdminService } from "@/app/services/admin.services"
import Link from "next/link"

const { Option } = Select

type Pitch = {
  _id: string
  pitchType: string
  status: string
  createdAt: string
  updatedAt: string
  user: {
    _id: string
    email: string
    firstName: string
    lastName?: string
  }
  releaseInfo: {
    title: string
    primaryArtist: string
    genre: string
  }
  packagePlan: string
}

export default function AdminPitchesPage() {
  const [pitches, setPitches] = useState<Pitch[]>([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState("")
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  // Status update modal
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedPitch, setSelectedPitch] = useState<{ id: string; title: string } | null>(null)
  const [newStatus, setNewStatus] = useState<string>("approved")

  useEffect(() => {
    fetchPitches()
  }, [])

  const fetchPitches = async () => {
    try {
      setLoading(true)
      const response = await AdminService.getAllPitches()
      if (response.status === "success" && Array.isArray(response.data)) {
        setPitches(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch pitches:", error)
      message.error("Failed to load pitches. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async () => {
    if (!selectedPitch) return

    try {
      setUpdatingStatus(selectedPitch.id)
      await AdminService.updatePitchStatus(selectedPitch.id, newStatus)
      message.success(`Pitch status updated to ${newStatus}`)

      // Update the local state to reflect the status change
      setPitches((prevPitches) =>
        prevPitches.map((pitch) => (pitch._id === selectedPitch.id ? { ...pitch, status: newStatus } : pitch)),
      )

      // Refresh the pitch list to get updated data
      fetchPitches()
    } catch (error) {
      console.error("Failed to update pitch status:", error)
      message.error("Failed to update pitch status. Please try again.")
    } finally {
      setUpdatingStatus(null)
      setModalVisible(false)
      setSelectedPitch(null)
    }
  }

  const showStatusUpdateModal = (pitchId: string, pitchTitle: string) => {
    console.log("Opening status update modal for:", pitchId, pitchTitle)
    setSelectedPitch({ id: pitchId, title: pitchTitle })
    setModalVisible(true)
  }

  const filteredPitches = pitches.filter((pitch) => {
    const searchLower = searchText.toLowerCase()
    return (
      pitch.releaseInfo?.title?.toLowerCase().includes(searchLower) ||
      pitch.releaseInfo?.primaryArtist?.toLowerCase().includes(searchLower) ||
      pitch.user?.email?.toLowerCase().includes(searchLower) ||
      pitch.pitchType?.toLowerCase().includes(searchLower) ||
      pitch.status?.toLowerCase().includes(searchLower)
    )
  })

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

  const columns = [
    {
      title: "Title",
      dataIndex: ["releaseInfo", "title"],
      key: "title",
      render: (title: string, record: Pitch) => (
        <Tooltip title="View pitch details">
          <Link href={`/admin/pitches/${record._id}`} className="text-blue-600 hover:underline">
            {title || "Untitled"}
          </Link>
        </Tooltip>
      ),
      sorter: (a: Pitch, b: Pitch) => (a.releaseInfo?.title || "").localeCompare(b.releaseInfo?.title || ""),
    },
    {
      title: "Artist",
      dataIndex: ["releaseInfo", "primaryArtist"],
      key: "artist",
      render: (artist: string) => artist || "Unknown",
      sorter: (a: Pitch, b: Pitch) =>
        (a.releaseInfo?.primaryArtist || "").localeCompare(b.releaseInfo?.primaryArtist || ""),
    },
    {
      title: "Submitted By",
      dataIndex: ["user", "email"],
      key: "submitter",
      render: (email: string, record: Pitch) => {
        const name = record.user?.firstName ? `${record.user.firstName} ${record.user.lastName || ""}` : "Unknown"
        return <Tooltip title={email}>{name}</Tooltip>
      },
    },
    {
      title: "Pitch Type",
      dataIndex: "pitchType",
      key: "pitchType",
      render: (type: string) => <Tag>{type || "Unknown"}</Tag>,
      filters: [
        { text: "Distribution", value: "Pitch to distribution" },
        { text: "Distributor Aggregator", value: "Pitch to distributor aggregator" },
        { text: "Publishing", value: "Pitch for publishing" },
        { text: "Advance", value: "Pitch for advance" },
      ],
      onFilter: (value: string | number | boolean, record: Pitch) => record.pitchType === value,
    },
    {
      title: "Package",
      dataIndex: "packagePlan",
      key: "package",
      render: (plan: string) => plan || "None",
      filters: [
        { text: "Pro", value: "Pro" },
        { text: "Advance", value: "Advance" },
        { text: "Curator", value: "Curator" },
      ],
      onFilter: (value: string | number | boolean, record: Pitch) => record.packagePlan === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color={getStatusColor(status)}>{(status || "pending").toUpperCase()}</Tag>,
      filters: [
        { text: "Approved", value: "approved" },
        { text: "Pending", value: "pending" },
        { text: "Declined", value: "declined" },
        { text: "In Review", value: "in review" },
      ],
      onFilter: (value: string | number | boolean, record: Pitch) => record.status === value,
    },
    {
      title: "Submitted On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (date ? new Date(date).toLocaleDateString() : "N/A"),
      sorter: (a: Pitch, b: Pitch) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateA - dateB
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Pitch) => {
        return (
          <Space>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => showStatusUpdateModal(record._id, record.releaseInfo?.title || "Untitled")}
              loading={updatingStatus === record._id}
            >
              Update Status
            </Button>
          </Space>
        )
      },
    },
  ]

  return (
    <div className=" mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Pitch Management</h1>
          <p className="text-gray-500">Manage and review pitch submissions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Input
            placeholder="Search pitches..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          columns={columns}
          dataSource={filteredPitches}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* Status Update Modal */}
      <Modal
        title="Update Pitch Status"
        open={modalVisible}
        onOk={handleUpdateStatus}
        onCancel={() => {
          setModalVisible(false)
          setSelectedPitch(null)
        }}
        confirmLoading={!!updatingStatus}
        okText="Update"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          <p>
            Update status for pitch: <strong>{selectedPitch?.title}</strong>
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Status</label>
            <Select value={newStatus} onChange={setNewStatus} style={{ width: "100%" }} size="large">
              <Option value="approved">Approved</Option>
              <Option value="declined">Declined</Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
