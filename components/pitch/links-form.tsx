"use client"

import { useState, useEffect } from "react"
import { Select, Input, Tag } from "antd"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"

const { Option } = Select
const { TextArea } = Input

interface LinksFormProps {
  data: any
  updateData: (data: any) => void
}

export default function LinksForm({ data, updateData }: LinksFormProps) {
  const [releaseDate, setReleaseDate] = useState<Date | undefined>(
    data.releaseDate ? new Date(data.releaseDate) : undefined,
  )
  const [promotionDate, setPromotionDate] = useState<Date | undefined>(
    data.promotionDate ? new Date(data.promotionDate) : undefined,
  )

  // Initialize platforms as an array if it doesn't exist
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    Array.isArray(data.platforms) && data.platforms.length > 0
      ? data.platforms
      : data.platform
        ? [data.platform]
        : ["Apple Music"],
  )

  // Update the form data when the component mounts to ensure platforms are set
  useEffect(() => {
    if (selectedPlatforms.length > 0 && (!data.platforms || data.platforms.length === 0)) {
      updateData({ platforms: selectedPlatforms })
    }
  }, [])

  const handlePlatformsChange = (values: string[]) => {
    setSelectedPlatforms(values)
    updateData({ platforms: values })
  }

  const handleReleaseDateChange = (date: Date | undefined) => {
    setReleaseDate(date)
    updateData({
      releaseDate: date ? date.toISOString().split("T")[0] : "", // Format as YYYY-MM-DD
    })
  }

  const handlePromotionDateChange = (date: Date | undefined) => {
    setPromotionDate(date)
    updateData({
      promotionDate: date ? date.toISOString().split("T")[0] : "", // Format as YYYY-MM-DD
    })
  }

  const platforms = [
    "Apple Music",
    "Spotify",
    "Amazon Music",
    "YouTube Music",
    "Deezer",
    "Tidal",
    "Audiomack",
    "Boomplay",
    "Mdundo",
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="platforms">Where are you pitching to? (Select multiple)</Label>
        <Select
          id="platforms"
          mode="multiple"
          value={selectedPlatforms}
          onChange={handlePlatformsChange}
          className="w-full"
          size="large"
          placeholder="Select platforms"
          maxTagCount={3}
          maxTagTextLength={10}
          tagRender={(props) => (
            <Tag color="purple" closable={props.closable} onClose={props.onClose} style={{ marginRight: 3 }}>
              {props.label}
            </Tag>
          )}
        >
          {platforms.map((platform) => (
            <Option key={platform} value={platform}>
              {platform}
            </Option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pitchLocation">Press Picture Link - (Google Drive )</Label>
          <Input
            id="pitchLocation"
            value={data.pitchLocation}
            onChange={(e) => updateData({ pitchLocation: e.target.value })}
            placeholder="https://example.com/pitch-location"
            size="large"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="appleMusic">Apple Music Link</Label>
          <Input
            id="appleMusic"
            value={data.appleMusic}
            onChange={(e) => updateData({ appleMusic: e.target.value })}
            placeholder="https://music.apple.com/album/..."
            size="large"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="musicLink"> Spotify Artist Link </Label>
          <Input
            id="musicLink"
            value={data.musicLink}
            onChange={(e) => updateData({ musicLink: e.target.value })}
            placeholder="https://open.spotify.com/track/..."
            size="large"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="listenLink">Listen Link (SoundCloud / Google Drive)</Label>
          <Input
            id="listenLink"
            value={data.listenLink}
            onChange={(e) => updateData({ listenLink: e.target.value })}
            placeholder="https://soundcloud.com/artist/track"
            size="large"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="releaseDate">Release Date *</Label>
          <DatePicker date={releaseDate} setDate={handleReleaseDateChange} placeholder="Select release date" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="promotionDate">Promotion Start Date</Label>
          <DatePicker date={promotionDate} setDate={handlePromotionDateChange} placeholder="Select promotion date" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="language">Language *</Label>
          <Input
            id="language"
            value={data.language}
            onChange={(e) => updateData({ language: e.target.value })}
            size="large"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            value={data.country}
            onChange={(e) => updateData({ country: e.target.value })}
            size="large"
            required
          />
        </div>
      </div>
    </div>
  )
}

