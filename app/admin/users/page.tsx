"use client"

import { useState, useEffect } from "react"
import { Table, Button, Input, Space, Tag, message, Modal } from "antd"
import { SearchOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { AdminService } from "@/app/services/admin.services"

type User = {
  _id: string
  email: string
  firstName: string
  lastName: string
  role: string
  authMethod: string
  createdAt: string
  status?: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState("")
  const [approving, setApproving] = useState<string | null>(null)

  // Custom modal state
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await AdminService.getAllUsers()
      console.log("Users response:", response)
      if (response.status === "success" && Array.isArray(response.data)) {
        setUsers(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
      message.error("Failed to load users. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleApproveUser = async () => {
    if (!selectedUser) return

    try {
      setApproving(selectedUser.id)
      await AdminService.approveUser(selectedUser.id)
      message.success("User approved successfully")

      // Update the local state to reflect the approval
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === selectedUser.id ? { ...user, status: "approved" } : user)),
      )

      // Refresh the user list to get updated data
      fetchUsers()
    } catch (error) {
      console.error("Failed to approve user:", error)
      message.error("Failed to approve user. Please try again.")
    } finally {
      setApproving(null)
      setModalVisible(false)
      setSelectedUser(null)
    }
  }

  const showApproveModal = (userId: string, userName: string) => {
    console.log("Opening modal for:", userId, userName)
    setSelectedUser({ id: userId, name: userName })
    setModalVisible(true)
  }

  const filteredUsers = users.filter((user) => {
    const searchLower = searchText.toLowerCase()
    return (
      user.email?.toLowerCase().includes(searchLower) ||
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.role?.toLowerCase().includes(searchLower)
    )
  })

  // Helper function to determine if a user needs approval
  const needsApproval = (user: User) => {
    // Check if status is not approved or pending
    return user.status !== "approved" && user.role !== "admin"
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: User) => `${record.firstName || ""} ${record.lastName || ""}`,
      sorter: (a: User, b: User) =>
        `${a.firstName || ""} ${a.lastName || ""}`.localeCompare(`${b.firstName || ""} ${b.lastName || ""}`),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: User, b: User) => (a.email || "").localeCompare(b.email || ""),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "purple" : "blue"}>{(role || "user").toUpperCase()}</Tag>
      ),
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
      onFilter: (value: string | number | boolean, record: User) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        if (status === "approved") {
          return <Tag color="green">APPROVED</Tag>
        } else if (status === "pending") {
          return <Tag color="orange">PENDING</Tag>
        } else {
          return <Tag color="red">NEEDS APPROVAL</Tag>
        }
      },
      filters: [
        { text: "Approved", value: "approved" },
        { text: "Pending", value: "pending" },
        { text: "Needs Approval", value: null },
      ],
      onFilter: (value: string | number | boolean, record: User) => {
        if (value === null) {
          return !record.status || record.status === ""
        }
        return record.status === value
      },
    },
    {
      title: "Auth Method",
      dataIndex: "authMethod",
      key: "authMethod",
      render: (method: string) => <Tag color={method === "email" ? "green" : "orange"}>{method || "email"}</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (date ? new Date(date).toLocaleDateString() : "N/A"),
      sorter: (a: User, b: User) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateA - dateB
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => {
        const canApprove = needsApproval(record)
        console.log(`User ${record.email} can be approved: ${canApprove}`)

        return (
          <Space>
            {canApprove && (
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => {
                  console.log("Approve button clicked for:", record._id)
                  showApproveModal(record._id, `${record.firstName || ""} ${record.lastName || ""}`)
                }}
                loading={approving === record._id}
              >
                Approve
              </Button>
            )}
          </Space>
        )
      },
    },
  ]

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">User Management</h1>
          <p className="text-gray-500">Manage and approve users in the system</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Input
            placeholder="Search users..."
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
          dataSource={filteredUsers}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* Custom Approval Modal */}
      <Modal
        title="Approve User"
        open={modalVisible}
        onOk={handleApproveUser}
        onCancel={() => {
          setModalVisible(false)
          setSelectedUser(null)
        }}
        confirmLoading={!!approving}
        okText="Approve"
        cancelText="Cancel"
      >
        <p>Are you sure you want to approve {selectedUser?.name}? This will send them a password.</p>
      </Modal>
    </div>
  )
}
