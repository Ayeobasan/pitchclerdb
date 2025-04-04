"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Typography, Space } from "antd"
import { ArrowRight } from "lucide-react"
import PitchTypeCard from "@/components/pitch/pitch-type-card"

const { Title, Paragraph } = Typography

export default function SubmitPitchPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const router = useRouter()

  const handleProceed = () => {
    if (selectedType) {
      router.push(`/dashboard/submit-pitch/${selectedType}`)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Title level={2} className="text-xl md:text-2xl">
          Pitch for Playlist placement
        </Title>
        <Paragraph className="text-gray-500 mb-6">Select the mode of pitch you want to submit</Paragraph>

        <Space direction="vertical" size="large" className="w-full">
          <PitchTypeCard
            id="Pitch to distribution"
            title="Pitch for Playlist placement"
            icon="🎵"
            selected={selectedType === "Pitch for Playlist placement"}
            onClick={() => setSelectedType("Pitch to distribution")}
          />

          {/* <PitchTypeCard
            id="distributor-aggregator"
            title="Pitch to distributor aggregator"
            icon="🏛️"
            selected={selectedType === "distributor-aggregator"}
            onClick={() => setSelectedType("distributor-aggregator")}
          />

          <PitchTypeCard
            id="publishing"
            title="Pitch for publishing"
            icon="📝"
            selected={selectedType === "publishing"}
            onClick={() => setSelectedType("publishing")}
          />

          <PitchTypeCard
            id="advance"
            title="Pitch for advance"
            icon="😎"
            selected={selectedType === "advance"}
            onClick={() => setSelectedType("advance")}
          /> */}
        </Space>

        <div className="mt-8">
          <Button
            type="primary"
            onClick={handleProceed}
            disabled={!selectedType}
            size="large"
            block
            className="flex items-center justify-center"
          >
            Proceed
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

