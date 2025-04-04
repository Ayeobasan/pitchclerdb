"use client"

import type React from "react"

import { useState } from "react"
import { Input, Collapse, Checkbox, Button } from "antd"
import { Search, Check } from "lucide-react"

const { Panel } = Collapse

interface TerritoryFormProps {
  data: any
  updateData: (data: any) => void
}

export default function TerritoryForm({ data, updateData }: TerritoryFormProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeKey, setActiveKey] = useState<string | string[]>(["Africa"])

  const regions = [
    {
      name: "Africa",
      countries: [
        "Algeria",
        "Benin",
        "Botswana",
        "Angola",
        "Cameroon",
        "CAF",
        "Chad",
        "Comoros",
        "Togo",
        "Ethiopia",
        "Egypt",
        "Gabon",
        "Gambia",
        "Ghana",
        "Kenya",
        "Madagascar",
        "Malawi",
        "Morocco",
        "Niger",
        "Nigeria",
        "Rwanda",
        "Senegal",
        "South Africa",
        "Sudan",
      ],
    },
    {
      name: "Asia",
      countries: [
        "China",
        "Japan",
        "India",
        "South Korea",
        "Indonesia",
        "Malaysia",
        "Philippines",
        "Singapore",
        "Thailand",
        "Vietnam",
      ],
    },
    {
      name: "Europe",
      countries: [
        "United Kingdom",
        "France",
        "Germany",
        "Italy",
        "Spain",
        "Netherlands",
        "Belgium",
        "Sweden",
        "Norway",
        "Denmark",
        "Finland",
        "Switzerland",
      ],
    },
    {
      name: "South America",
      countries: [
        "Brazil",
        "Argentina",
        "Colombia",
        "Chile",
        "Peru",
        "Venezuela",
        "Ecuador",
        "Bolivia",
        "Paraguay",
        "Uruguay",
      ],
    },
    {
      name: "North America",
      countries: ["United States", "Canada", "Mexico"],
    },
  ]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)

    // If searching, expand all panels that have matching countries
    if (e.target.value) {
      const matchingRegions = regions
        .filter((region) =>
          region.countries.some((country) => country.toLowerCase().includes(e.target.value.toLowerCase())),
        )
        .map((region) => region.name)

      setActiveKey(matchingRegions)
    }
  }

  const handleCheckboxChange = (regionName: string, checkedValues: string[]) => {
    const otherRegionsTerritories = data.territories.filter(
      (territory: string) => !regions.find((r) => r.name === regionName)?.countries.includes(territory),
    )

    const newTerritories = [...otherRegionsTerritories, ...checkedValues]
    updateData({
      territories: newTerritories,
      // Set the primary territory as the first selected territory
      territory: newTerritories.length > 0 ? newTerritories[0] : "",
    })
  }

  const selectAll = () => {
    const allCountries = regions.flatMap((region) => region.countries)
    updateData({
      territories: allCountries,
      // Set the primary territory as the first country in the list
      territory: allCountries.length > 0 ? allCountries[0] : "",
    })
  }

  const filteredRegions = regions
    .map((region) => ({
      ...region,
      countries: region.countries.filter((country) => country.toLowerCase().includes(searchTerm.toLowerCase())),
    }))
    .filter((region) => region.countries.length > 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium mb-2">Select Territory</h2>
        <p className="text-gray-500 mb-4">Select countries that have access to this track</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative max-w-md w-full">
          <Input
            placeholder="Search countries"
            value={searchTerm}
            onChange={handleSearch}
            prefix={<Search className="h-4 w-4 text-gray-400" />}
            className="max-w-md"
          />
        </div>

        <Button type="default" onClick={selectAll} icon={<Check className="h-4 w-4 mr-2" />}>
          Select all
        </Button>
      </div>

      <Collapse activeKey={activeKey} onChange={setActiveKey} className="bg-white border border-gray-200 rounded-lg">
        {filteredRegions.map((region) => (
          <Panel header={<span className="font-medium">{region.name}</span>} key={region.name}>
            <Checkbox.Group
              value={region.countries.filter((country) => data.territories.includes(country))}
              onChange={(checkedValues) => handleCheckboxChange(region.name, checkedValues as string[])}
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {region.countries.map((country) => (
                  <Checkbox key={country} value={country}>
                    {country}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}

