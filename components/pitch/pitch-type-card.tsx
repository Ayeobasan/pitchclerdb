"use client"

import { Card } from "antd"

interface PitchTypeCardProps {
  id: string
  title: string
  icon: string
  selected: boolean
  onClick: () => void
}

export default function PitchTypeCard({ id, title, icon, selected, onClick }: PitchTypeCardProps) {
  return (
    <Card hoverable className={selected ? "border-purple-600 border-2" : ""} onClick={onClick}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
    </Card>
  )
}

