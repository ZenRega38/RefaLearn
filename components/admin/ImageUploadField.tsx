"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { uploadPublicImage } from "@/lib/storage";
import { ImageUp } from "lucide-react";

/**
 * URL field with an "Upload" button next to it. Uploading puts the image in
 * the public-assets bucket and fills the field with its public URL; pasting
 * an external URL still works.
 */
export function ImageUploadField({
  label,
  value,
  onChange,
  folder,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: "materials" | "news" | "alumni" | "partners";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(undefined);
    try {
      onChange(await uploadPublicImage(folder, file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload gagal.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input label={label} value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://... atau upload" error={error} />
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()} isLoading={uploading} className="shrink-0 mb-[1px]">
          <ImageUp className="w-4 h-4" /> Upload
        </Button>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-20 w-auto self-start rounded border border-[var(--color-line)] object-cover" />
      )}
    </div>
  );
}
