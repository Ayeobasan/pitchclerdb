"use client"

import { useState, useEffect } from "react"
import { Card, Row, Col, Statistic, Spin } from "antd"
import { UserOutlined, TeamOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { AdminService } from "@/app/services/admin.services"
import Link from "next/link"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    pendingApprovals: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await AdminService.getAllUsers()

      if (response.status === "success" && Array.isArray(response.data)) {
        const users = response.data as any[]
        const adminUsers = users.filter((user) => user.role === "admin").length
        const pendingApprovals = users.filter((user) => !user.isApproved && user.role !== "admin").length

        setStats({
          totalUsers: response.totalUsers || users.length,
          adminUsers,
          pendingApprovals,
        })
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Link href="/admin/users">
            <Card hoverable>
              <Statistic
                title="Total Users"
                value={stats.totalUsers}
                prefix={<TeamOutlined />}
                valueStyle={{ color: "#9333EA" }}
              />
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Link href="/admin/users">
            <Card hoverable>
              <Statistic
                title="Admin Users"
                value={stats.adminUsers}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#1677ff" }}
              />
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Link href="/admin/users">
            <Card hoverable>
              <Statistic
                title="Pending Approvals"
                value={stats.pendingApprovals}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: stats.pendingApprovals > 0 ? "#ff4d4f" : "#52c41a" }}
              />
            </Card>
          </Link>
        </Col>
      </Row>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Link href="/admin/users">
              <Card hoverable className="text-center">
                <UserOutlined style={{ fontSize: 24, color: "#9333EA", marginBottom: 8 }} />
                <p>Manage Users</p>
              </Card>
            </Link>
          </Col>

          {stats.pendingApprovals > 0 && (
            <Col xs={24} sm={12} md={8} lg={6}>
              <Link href="/admin/users">
                <Card hoverable className="text-center">
                  <CheckCircleOutlined style={{ fontSize: 24, color: "#52c41a", marginBottom: 8 }} />
                  <p>Approve Users</p>
                </Card>
              </Link>
            </Col>
          )}
        </Row>
      </div>
    </div>
  )
}
