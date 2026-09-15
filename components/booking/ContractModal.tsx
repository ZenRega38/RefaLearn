"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SketchBox } from "@/components/sketch/SketchBox";
import { X, ShieldCheck } from "lucide-react";

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (typedName: string) => void;
  contractHtml: string;
  expectedName: string;
}

export function ContractModal({ isOpen, onClose, onAccept, contractHtml, expectedName }: ContractModalProps) {
  const [typedName, setTypedName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedName.trim().toLowerCase() !== expectedName.toLowerCase()) {
      setError("Nama yang diketik harus persis sama dengan nama di profil Anda.");
      return;
    }
    setError("");
    onAccept(typedName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      
      <div className="bg-[var(--color-paper-bg)] w-full max-w-2xl max-h-[90vh] rounded-[var(--radius-card)] border-2 border-[var(--color-line)] shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-line)] bg-white">
          <h2 className="text-2xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" /> Persetujuan Kelas
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper-bg-alt)] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 font-[var(--font-inter)] text-[var(--color-ink)]">
          <div className="prose-content text-sm" dangerouslySetInnerHTML={{ __html: contractHtml }} />
        </div>
        
        {/* Footer & Signature */}
        <div className="p-6 bg-[var(--color-paper-bg-alt)] border-t border-dashed border-[var(--color-line)]">
          <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-4">
            Dengan mengetikkan nama Anda di bawah ini, Anda menyatakan setuju dan terikat dengan syarat dan ketentuan di atas.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1 w-full">
              <Input
                placeholder={`Ketik: ${expectedName}`}
                value={typedName}
                onChange={(e) => {
                  setTypedName(e.target.value);
                  setError("");
                }}
                error={error}
                className="font-[var(--font-caveat)] text-xl !py-2" // Make it look like a signature
              />
            </div>
            <Button 
              type="submit"
              disabled={typedName.trim().toLowerCase() !== expectedName.toLowerCase()}
              className="w-full sm:w-auto"
            >
              Saya Setuju & Lanjutkan
            </Button>
          </form>
        </div>
        
      </div>
      
    </div>
  );
}
