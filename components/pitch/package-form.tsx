"use client"

import { Card, Badge } from "antd"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PackageFormProps {
  data: any
  updateData: (data: any) => void
}

export default function PackageForm({ data, updateData }: PackageFormProps) {
  const packages = [
    {
      id: "Pro",
      name: "Pitch Pro",
      price: "$500",
      period: "/ Pitch",
      features: [
        "Guaranteed Editorial & Curator playlist & Pitch Placement across All DSPs",
        "pro search, filtering, and analytics tools",
        "Access to all educational resources, including advanced pitching strategies",
        "Priority email support",
        "Editorial Press Feature",
        "Unlimited number of pitch and placement",
        "Customizable pitch templates",
        "Full Pitch Asset Optimization",
      ],
      recommended: true,
    },
    {
      id: "Advance",
      name: "Pitch Boast",
      price: "$155",
      period: "/ Pitch",
      features: [
        "Limited Editorial Playlist Pitch & placements accross DSPs",
        "Advanced Pitch Evaluation",
        "Limited Pitch Exposure",
        "Access to basic educational resources on pitching, marketing and distribution",
        "Customizable pitch templates",
        "Pro feedback and suggestion",
        "Priority email support",
        "Editorial Press Feature",
      ],
    },
    {
      id: "Curator",
      name: "Curator Playlist Placement",
      price: "$35",
      period: "/ Pitch",
      features: [
        "Advanced Curator pitch &  Playlist placement Accross Dsp",
        "No pitch evaluation",
        "Limited Pitch exposure",
        "Limited feedback or suggestion",
        "Email Support",
      ],
    },
  ]

  const selectPackage = (packageId: string) => {
    updateData({ selectedPackage: packageId })
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Badge.Ribbon
            text="Recommended"
            color="#9333ea"
            style={{ display: pkg.recommended ? "block" : "none" }}
            key={pkg.id}
          >
            <Card
              hoverable
              className={`h-full ${data.selectedPackage === pkg.id ? "border-purple-600 border-2" : ""}`}
              title={
                <div className="text-center py-2">
                  <h3 className="text-lg font-medium">{pkg.name}</h3>
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                    <span className="text-gray-500 ml-1">{pkg.period}</span>
                  </div>
                </div>
              }
              actions={[
                <Button
                  key="buy"
                  onClick={() => selectPackage(pkg.id)}
                  variant={data.selectedPackage === pkg.id ? "default" : "outline"}
                  className="w-11/12 mx-auto"
                >
                  {data.selectedPackage === pkg.id ? "Selected" : "Select Package"}
                </Button>,
              ]}
            >
              <ul className="space-y-3 min-h-[320px]">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Badge.Ribbon>
        ))}
      </div>
    </div>
  )
}

