"use client"
import { useState } from "react"
import { Upload, message } from "antd"
import { UploadIcon, File, X, Music } from "lucide-react"
import { Alert } from "antd"

const { Dragger } = Upload

interface UploadFormProps {
  data: any
  updateData: (data: any) => void
}

export default function UploadForm({ data, updateData }: UploadFormProps) {
  const [musicFileProgress, setMusicFileProgress] = useState(0)
  const [coverUploadProgress, setCoverUploadProgress] = useState(0)
  const [musicFileUploading, setMusicFileUploading] = useState(false)
  const [coverUploading, setCoverUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleUploadError = (errorMessage: string) => {
    setUploadError(errorMessage)
    message.error(errorMessage)
  }

  const musicFileProps = {
    name: "musicFile",
    multiple: false,
    accept: "audio/*,.mp3,.wav,.flac,.aac",
    showUploadList: false,
    beforeUpload: (file: File) => {
      // Clear any previous errors
      setUploadError(null)

      // Validate file size (e.g., max 50MB)
      const isLt50M = file.size / 1024 / 1024 < 50
      if (!isLt50M) {
        handleUploadError("Music file must be smaller than 50MB!")
        return Upload.LIST_IGNORE
      }

      try {
        // Store the file directly in the form data
        updateData({ musicFile: file })
        message.success(`${file.name} selected successfully.`)
      } catch (error) {
        handleUploadError("Failed to process music file. Please try again.")
        console.error("Music file processing error:", error)
        return Upload.LIST_IGNORE
      }

      return false // Prevent actual upload
    },
    onRemove: () => {
      updateData({ musicFile: null })
      return true
    },
    onError: (error: any) => {
      handleUploadError("File upload failed. Please try again.")
      console.error("Upload error:", error)
    },
  }

  const coverProps = {
    name: "coverPhoto",
    multiple: false,
    accept: "image/*,.jpg,.jpeg,.png",
    showUploadList: false,
    beforeUpload: (file: File) => {
      // Clear any previous errors
      setUploadError(null)

      // Validate file size (e.g., max 10MB) and dimensions
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        handleUploadError("Cover image must be smaller than 10MB!")
        return Upload.LIST_IGNORE
      }

      try {
        // Store the file directly in the form data
        updateData({ coverPhoto: file })
        message.success(`${file.name} selected successfully.`)
      } catch (error) {
        handleUploadError("Failed to process cover image. Please try again.")
        console.error("Cover image processing error:", error)
        return Upload.LIST_IGNORE
      }

      return false // Prevent actual upload
    },
    onRemove: () => {
      updateData({ coverPhoto: null })
      return true
    },
    onError: (error: any) => {
      handleUploadError("File upload failed. Please try again.")
      console.error("Upload error:", error)
    },
  }

  return (
    <div className="space-y-8">
      {uploadError && (
        <Alert
          message="Upload Error"
          description={uploadError}
          type="error"
          showIcon
          closable
          onClose={() => setUploadError(null)}
        />
      )}

      <div>
        <h2 className="text-xl font-medium mb-2">Attach press picture *</h2>
        <p className="text-gray-500 mb-4">Upload your music file (MP3, WAV, FLAC, AAC)</p>

        {data.musicFile ? (
          <div className="border rounded-lg p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-md mr-3">
                  <Music className="text-green-600 h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{data.musicFile.name}</p>
                  <p className="text-sm text-green-600">Selected successfully</p>
                </div>
              </div>
              <button onClick={() => updateData({ musicFile: null })} className="text-gray-500 hover:text-red-500">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <Dragger {...musicFileProps} className="bg-gray-50 border-gray-300">
            <p className="ant-upload-drag-icon">
              <UploadIcon className="h-10 w-10 mx-auto text-gray-400" />
            </p>
            <p className="ant-upload-text">Click or drag attach press picture to this area to upload</p>
            <p className="ant-upload-hint text-gray-500">Support for MP3, WAV, FLAC, AAC (max 50MB)</p>
          </Dragger>
        )}
      </div>

      <div>
        <h2 className="text-xl font-medium mb-2">Upload Cover Photo *</h2>
        <p className="text-gray-500 mb-4">Select and upload your cover art (JPG, PNG)</p>

        {data.coverPhoto ? (
          <div className="border rounded-lg p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-md mr-3">
                  <File className="text-green-600 h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{data.coverPhoto.name}</p>
                  <p className="text-sm text-green-600">Selected successfully</p>
                </div>
              </div>
              <button onClick={() => updateData({ coverPhoto: null })} className="text-gray-500 hover:text-red-500">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <Dragger {...coverProps} className="bg-gray-50 border-gray-300">
            <p className="ant-upload-drag-icon">
              <UploadIcon className="h-10 w-10 mx-auto text-gray-400" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint text-gray-500">Recommended: 3000 by 3000 px, JPG or PNG (max 10MB)</p>
          </Dragger>
        )}
      </div>
    </div>
  )
}

