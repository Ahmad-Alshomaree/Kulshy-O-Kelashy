"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface UploadButtonWithFeedbackProps {
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: Error) => void;
  endpoint: "productImage" | "avatar";
}

export const UploadButtonWithFeedback = ({
  onUploadComplete,
  onUploadError,
  endpoint,
}: UploadButtonWithFeedbackProps) => {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="relative">
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg z-10">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          const url = res?.[0]?.url;
          if (url) {
            toast.success("Upload complete!");
            onUploadComplete?.(url);
          }
        }}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          toast.error(`Upload failed: ${error.message}`);
          onUploadError?.(error);
        }}
        onUploadBegin={() => {
          setIsUploading(true);
          toast.info("Upload started...");
        }}
      />
    </div>
  );
};
