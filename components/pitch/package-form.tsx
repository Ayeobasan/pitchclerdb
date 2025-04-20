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
      id: "Curator",
      name: "Advance Pitch",
      originalPrice: "$55",
      price: "$35",
      period: "/ Pitch",
      discounted: true,
      features: [
        "Advanced Curator pitch &  Playlist placement Accross Dsp",
        "No pitch evaluation",
        "Limited Pitch exposure (Audiomack, Boomplay,Mdundo….)",
        "Press Feature",
        "Limited feedback or suggestion",
        "Email Support",
      ],
    },
    {
      id: "Advance",
      name: "Pitch Boast",
      price: "$155",
      period: "/ Pitch",
      features: [
        "Limited Editorial Playlist Pitch & placements accross DSPs",
        "Advanced Pitch Evaluation",
        "Advance Pitch Exposure (Tidal,Apple music, Deezer, YouTube Music, Spotify……)",
        "Access to basic educational resources on pitching, marketing and distribution",
        "Curator Playlist Placement",
        "Pro feedback and suggestion",
        "Priority email support",
        "Customizable pitch templates",
        "Editorial Press Feature",
      ],
      recommended: true,
    },
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
            style={{ display: pkg.recommended ? "" : "none", fontSize: "10px", }}
            key={pkg.id}
            placement="start"
          >
            <Card
              hoverable
              className={`h-full ${data.selectedPackage === pkg.id ? "border-purple-600 border-2 " : ""}`}
              title={
                <div className="text-center py-2">
                  <h3 className="text-lg font-medium text-purple-600">{pkg.name}</h3>
                  <div className="flex items-center justify-center mt-2">
                    {pkg.discounted ? (
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 line-through">{pkg.originalPrice}</span>
                        <div className="flex items-center">
                          <span className="text-4xl font-bold text-green-600">{pkg.price}</span>
                          <span className="text-gray-500 ml-1">{pkg.period}</span>
                        </div>
                        <span className="text-xs text-green-600 font-medium mt-1">Limited Time Offer!</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="text-4xl font-bold">{pkg.price}</span>
                        <span className="text-gray-500 ml-1">{pkg.period}</span>
                      </div>
                    )}
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

