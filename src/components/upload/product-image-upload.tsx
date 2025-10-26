"use client";

import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ProductImageUploadProps {
  onUploadComplete: (urls: string[]) => void;
  maxFiles?: number;
  existingImages?: string[];
}

export function ProductImageUpload({
  onUploadComplete,
  maxFiles = 5,
  existingImages = [],
}: ProductImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(existingImages);
  const [uploading, setUploading] = useState(false);

  const { startUpload, isUploading } = useUploadThing("productImage", {
    onClientUploadComplete: (res) => {
      const urls = res.map((file) => file.url);
      setPreviews((prev) => [...prev, ...urls]);
      onUploadComplete([...previews, ...urls]);
      setFiles([]);
      toast.success(`${res.length} image(s) uploaded successfully!`);
      setUploading(false);
    },
    onUploadError: (error: Error) => {
      toast.error(`Upload failed: ${error.message}`);
      setUploading(false);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const totalFiles = previews.length + selectedFiles.length;

    if (totalFiles > maxFiles) {
      toast.error(`Maximum ${maxFiles} images allowed`);
      return;
    }

    setFiles(selectedFiles);

    // Create previews
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    setUploading(true);
    await startUpload(files);
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
    onUploadComplete(previews.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative aspect-square group">
            <Image
              src={preview}
              alt={`Product image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {previews.length < maxFiles && (
          <label className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mt-2">
              Upload Image
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading || isUploading}
            />
          </label>
        )}
      </div>

      {files.length > 0 && !uploading && (
        <Button
          onClick={handleUpload}
          disabled={uploading || isUploading}
          className="w-full"
        >
          {uploading || isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload {files.length} Image(s)
            </>
          )}
        </Button>
      )}

      <p className="text-sm text-muted-foreground">
        {previews.length} / {maxFiles} images uploaded
      </p>
    </div>
  );
}
