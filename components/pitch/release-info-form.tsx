"use client"

import { Input, Select } from "antd"
import { Label } from "@/components/ui/label"

const { Option } = Select
const { TextArea } = Input

interface ReleaseInfoFormProps {
  data: any
  updateData: (data: any) => void
}

export default function ReleaseInfoForm({ data, updateData }: ReleaseInfoFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="releaseTitle">Release Title *</Label>
          <Input
            id="releaseTitle"
            value={data.releaseTitle}
            onChange={(e) => updateData({ releaseTitle: e.target.value })}
            size="large"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="version">Version</Label>
          <Input
            id="version"
            value={data.version}
            onChange={(e) => updateData({ version: e.target.value })}
            size="large"
            placeholder="Original"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            id="type"
            value={data.type}
            onChange={(value) => updateData({ type: value })}
            className="w-full"
            size="large"
          >
            <Option value="Single">Single</Option>
            <Option value="EP">EP</Option>
            <Option value="Album">Album</Option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="recordName">Release Title</Label>
          <Input
            id="recordName"
            value={data.recordName}
            onChange={(e) => updateData({ recordName: e.target.value })}
            size="large"
            placeholder="Your record label name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="primaryArtist">Primary Artist *</Label>
          <Input
            id="primaryArtist"
            value={data.primaryArtist}
            onChange={(e) => updateData({ primaryArtist: e.target.value })}
            size="large"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="featuringArtist">Featuring Artist</Label>
          <Input
            id="featuringArtist"
            value={data.featuringArtist}
            onChange={(e) => updateData({ featuringArtist: e.target.value })}
            size="large"
            placeholder="Featured artists (if any)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="genre">Genre *</Label>
          <Input
            id="genre"
            value={data.genre}
            onChange={(e) => updateData({ genre: e.target.value })}
            size="large"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subGenre">Sub Genre</Label>
          <Input
            id="subGenre"
            value={data.subGenre}
            onChange={(e) => updateData({ subGenre: e.target.value })}
            size="large"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="releaseDescription">Release Description *</Label>
          <TextArea
            id="releaseDescription"
            value={data.releaseDescription}
            onChange={(e) => updateData({ releaseDescription: e.target.value })}
            rows={4}
            placeholder="Describe your release"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="upcEan">UPC/EAN</Label>
          <Input
            id="upcEan"
            value={data.upcEan}
            onChange={(e) => updateData({ upcEan: e.target.value })}
            size="large"
            placeholder="Enter UPC/EAN if you have one"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="marketingPlan">Marketing Plan</Label>
        <TextArea
          id="marketingPlan"
          value={data.marketingPlan}
          onChange={(e) => updateData({ marketingPlan: e.target.value })}
          rows={4}
          placeholder="Describe your marketing plan"
        />
      </div>
    </div>
  )
}

