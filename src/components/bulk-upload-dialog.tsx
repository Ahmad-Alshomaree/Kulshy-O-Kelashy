"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface BulkUploadDialogProps {
  children?: React.ReactNode
}

export function BulkUploadDialog({ children }: BulkUploadDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [results, setResults] = useState<{ success: number; failed: number; errors: string[] } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()
      if (fileExtension === 'csv' || fileExtension === 'xlsx') {
        setFile(selectedFile)
        setResults(null)
      } else {
        toast.error('Please upload a CSV or Excel file')
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/seller/products/bulk-upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setResults(data.results)
        toast.success(`Successfully uploaded ${data.results.success} products`)
        
        if (data.results.failed > 0) {
          toast.warning(`${data.results.failed} products failed to upload`)
        }
      } else {
        toast.error(data.error || 'Failed to upload products')
      }
    } catch (error) {
      console.error('Bulk upload error:', error)
      toast.error('An error occurred during upload')
    } finally {
      setIsUploading(false)
    }
  }

  const downloadTemplate = () => {
    const csvContent = `name,description,price,originalPrice,stock,sku,categoryId,colors,sizes,tags,mainImage
"Eco T-Shirt","Sustainable cotton t-shirt",29.99,39.99,100,ECO-TS-001,1,"Black,White,Navy","S,M,L,XL","eco,sustainable,cotton",https://example.com/image.jpg
"Organic Jeans","100% organic denim jeans",79.99,99.99,50,ECO-JN-001,2,"Blue,Black","28,30,32,34","organic,denim,sustainable",https://example.com/image.jpg`

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'product-upload-template.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Bulk Upload
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Bulk Upload Products</DialogTitle>
          <DialogDescription>
            Upload multiple products at once using a CSV or Excel file
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="secondary" asChild>
                <span>Choose File</span>
              </Button>
            </label>
            {file && (
              <p className="text-sm mt-4 text-primary">
                Selected: {file.name}
              </p>
            )}
          </div>

          {results && (
            <div className="space-y-2 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p className="text-sm font-medium">
                  {results.success} products uploaded successfully
                </p>
              </div>
              {results.failed > 0 && (
                <>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <p className="text-sm font-medium">
                      {results.failed} products failed
                    </p>
                  </div>
                  {results.errors.length > 0 && (
                    <div className="mt-2 max-h-32 overflow-y-auto">
                      <p className="text-xs font-medium mb-1">Errors:</p>
                      {results.errors.map((error, i) => (
                        <p key={i} className="text-xs text-red-600">
                          • {error}
                        </p>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={downloadTemplate}>
              Download Template
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!file || isUploading}>
                {isUploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
