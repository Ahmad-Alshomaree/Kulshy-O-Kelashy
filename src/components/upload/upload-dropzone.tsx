"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface UploadDropzoneWithFeedbackProps {
  onUploadComplete?: (urls: string[]) => void;
  onUploadError?: (error: Error) => void;
  endpoint: "productImage" | "avatar";
}

export const UploadDropzoneWithFeedback = ({
  onUploadComplete,
  onUploadError,
  endpoint,
}: UploadDropzoneWithFeedbackProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

  return (
    <div className="relative">
      {isUploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 rounded-lg z-10 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{uploadProgress}% uploaded</p>
        </div>
      )}

      {uploadStatus === "success" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-50 dark:bg-green-950/20 rounded-lg z-10 gap-2">
          <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
          <p className="text-sm font-medium text-green-700 dark:text-green-300">Upload successful!</p>
        </div>
      )}

      {uploadStatus === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 dark:bg-red-950/20 rounded-lg z-10 gap-2">
          <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          <p className="text-sm font-medium text-red-700 dark:text-red-300">Upload failed</p>
        </div>
      )}

      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          setUploadStatus("success");
          const urls = res?.map((file) => file.url) || [];
          toast.success(`Successfully uploaded ${urls.length} file(s)`);
          onUploadComplete?.(urls);
          
          // Reset status after 2 seconds
          setTimeout(() => setUploadStatus("idle"), 2000);
        }}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          setUploadStatus("error");
          toast.error(`Upload failed: ${error.message}`);
          onUploadError?.(error);
          
          // Reset status after 3 seconds
          setTimeout(() => setUploadStatus("idle"), 3000);
        }}
        onUploadBegin={() => {
          setIsUploading(true);
          setUploadStatus("uploading");
          setUploadProgress(0);
          toast.info("Starting upload...");
        }}
        onUploadProgress={(progress) => {
          setUploadProgress(progress);
        }}
      />
    </div>
  );
};
