"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ImageUpload() {
  const [images, setImages] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    if (images.length + files.length > 5) {
      alert("You can only upload up to 5 images")
      return
    }

    const newImages: string[] = []

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return

      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string)
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages])
          }
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <h3 className="text-lg font-medium">Drag and drop your images here</h3>
          <p className="text-sm text-gray-500">or click to browse (max 5 images)</p>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            id="image-upload"
            onChange={handleFileChange}
          />
          <Button variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
            Select Files
          </Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image || "/placeholder.svg"}
                alt={`Product image ${index + 1}`}
                className="h-32 w-full object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">Main</div>
              )}
            </div>
          ))}
          {Array.from({ length: Math.max(0, 5 - images.length) }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
