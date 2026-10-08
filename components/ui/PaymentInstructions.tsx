"use client";

import { useState } from "react";
import { Copy, Check, Landmark, Wallet } from "lucide-react";

export type BankDetails = { bank_name?: string; account_number?: string; account_name?: string };
export type EwalletDetails = { provider?: string; number?: string; account_name?: string };

// A single "field + copy button" row used inside the payment instructions card.
export function CopyableRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can fail (permissions, insecure context) — not worth
      // blocking the flow over, the number is still visible to copy by hand.
    }
  };

  if (!value) return null;

  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div>
        <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">{label}</p>
        <p className="font-bold font-[var(--font-inter)] text-[var(--color-ink)]">{value}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] hover:bg-white rounded-md transition-colors shrink-0"
        title="Salin"
      >
        {copied ? <Check className="w-4 h-4 text-[var(--color-success-green)]" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

/** Bank + e-wallet transfer details from site_settings, with copy buttons. */
export function PaymentInstructions({ bank, ewallet }: { bank: BankDetails | null; ewallet: EwalletDetails | null }) {
  if (!bank?.account_number && !ewallet?.number) return null;

  return (
    <div className="bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-4 divide-y divide-[var(--color-line)] font-[var(--font-inter)]">
      {bank?.account_number && (
        <div className="pb-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
            <Landmark className="w-3.5 h-3.5" /> Transfer Bank
          </div>
          <CopyableRow label={bank.bank_name || "Bank"} value={bank.account_number} />
          <p className="text-xs text-[var(--color-ink-soft)]">a.n. {bank.account_name}</p>
        </div>
      )}
      {ewallet?.number && (
        <div className="pt-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
            <Wallet className="w-3.5 h-3.5" /> E-Wallet
          </div>
          <CopyableRow label={ewallet.provider || "E-Wallet"} value={ewallet.number} />
          <p className="text-xs text-[var(--color-ink-soft)]">a.n. {ewallet.account_name}</p>
        </div>
      )}
    </div>
  );
}
