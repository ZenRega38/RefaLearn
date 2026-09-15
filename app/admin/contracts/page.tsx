"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Plus, RefreshCw, ShieldCheck, Eye } from "lucide-react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

type Contract = {
    id: string;
    version: number;
    content: string;
    effective_date: string; // date
    created_at: string;
};

export default function AdminContractsPage() {
    const supabase = createClient();
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [loading, setLoading] = useState(true);

    // "New version" editor state
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");
    const [effectiveDate, setEffectiveDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [saving, setSaving] = useState(false);

    // Preview state (view any past version's full text)
    const [previewing, setPreviewing] = useState<Contract | null>(null);

    const fetchContracts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("contracts")
            .select("*")
            .order("version", { ascending: false });

        if (!error && data) {
            setContracts(data as Contract[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchContracts();
    }, []);

    // Today's effective version — same query the public /schedule page runs:
    // highest version whose effective_date has already passed.
    const activeContract = contracts.find(
        (c) => c.effective_date <= new Date().toISOString().slice(0, 10)
    );

    const nextVersion = contracts.length > 0 ? contracts[0].version + 1 : 1;

    const handleStartNew = () => {
        // Pre-fill with the currently active contract's text so the admin is
        // editing a copy, not starting from a blank page every time.
        setContent(activeContract?.content ?? "");
        setEffectiveDate(new Date().toISOString().slice(0, 10));
        setIsEditing(true);
    };

    const handleCancel = () => setIsEditing(false);

    const handlePublish = async () => {
        if (!content.trim() || content === "<p></p>") {
            alert("Isi kontrak tidak boleh kosong.");
            return;
        }
        if (!effectiveDate) {
            alert("Tanggal berlaku wajib diisi.");
            return;
        }

        setSaving(true);
        const { error } = await supabase.from("contracts").insert([
            {
                version: nextVersion,
                content,
                effective_date: effectiveDate,
            },
        ]);
        setSaving(false);

        if (error) {
            alert(`Gagal menerbitkan kontrak: ${error.message}`);
            return;
        }

        setIsEditing(false);
        fetchContracts();
    };

    if (isEditing) {
        return (
            <PaperBackground className="p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
                            Terbitkan Versi Kontrak Baru (v{nextVersion})
                        </h1>
                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={handleCancel}>
                                Batal
                            </Button>
                            <Button onClick={handlePublish} isLoading={saving}>
                                Terbitkan
                            </Button>
                        </div>
                    </div>

                    <Card variant="sketch" className="space-y-6">
                        <div className="bg-[var(--color-warning-amber)]/10 border border-[var(--color-warning-amber)] rounded-[var(--radius-card)] p-4 text-sm font-[var(--font-inter)] text-[var(--color-ink)]">
                            Setelah tanggal berlaku tercapai, versi ini otomatis menjadi
                            kontrak aktif yang ditampilkan ke siswa saat booking. Versi
                            lama tetap tersimpan sebagai arsip dan tetap terhubung ke
                            persetujuan (contract_acceptances) yang sudah pernah dibuat.
                        </div>

                        <Input
                            label="Tanggal Berlaku"
                            type="date"
                            value={effectiveDate}
                            onChange={(e) => setEffectiveDate(e.target.value)}
                            required
                        />

                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)] mb-1.5">
                                Isi Kontrak
                            </label>
                            <RichTextEditor content={content} onChange={setContent} />
                        </div>
                    </Card>
                </div>
            </PaperBackground>
        );
    }

    if (previewing) {
        return (
            <PaperBackground className="p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
                            Kontrak v{previewing.version}
                        </h1>
                        <Button variant="ghost" onClick={() => setPreviewing(null)}>
                            Kembali
                        </Button>
                    </div>
                    <Card className="prose-content text-sm">
                        <div dangerouslySetInnerHTML={{ __html: previewing.content }} />
                    </Card>
                </div>
            </PaperBackground>
        );
    }

    return (
        <PaperBackground className="p-4 md:p-8 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-4">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-[var(--color-brand-blue)]" />
                        <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
                            Kontrak Sesi
                        </h1>
                    </div>
                    <Button onClick={handleStartNew} className="gap-2">
                        <Plus className="w-4 h-4" /> Terbitkan Versi Baru
                    </Button>
                </div>

                {!loading && !activeContract && (
                    <div className="bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)] rounded-[var(--radius-card)] p-4 text-sm font-[var(--font-inter)] text-[var(--color-danger-red)]">
                        Belum ada kontrak yang aktif. Booking sesi (/schedule) akan
                        dinonaktifkan untuk siswa sampai Anda menerbitkan versi pertama.
                    </div>
                )}

                <Card className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-[var(--font-inter)] text-sm border-collapse">
                            <thead>
                                <tr className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
                                    <th className="p-4 font-semibold text-[var(--color-ink-soft)]">
                                        Versi
                                    </th>
                                    <th className="p-4 font-semibold text-[var(--color-ink-soft)]">
                                        Berlaku Sejak
                                    </th>
                                    <th className="p-4 font-semibold text-[var(--color-ink-soft)]">
                                        Diterbitkan
                                    </th>
                                    <th className="p-4 font-semibold text-[var(--color-ink-soft)]">
                                        Status
                                    </th>
                                    <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-[var(--color-ink-soft)]">
                                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            Memuat data...
                                        </td>
                                    </tr>
                                ) : contracts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-[var(--color-ink-soft)]">
                                            Belum ada kontrak. Klik "Terbitkan Versi Baru" untuk
                                            membuat kontrak pertama.
                                        </td>
                                    </tr>
                                ) : (
                                    contracts.map((c) => (
                                        <tr
                                            key={c.id}
                                            className="border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)]/50 transition-colors"
                                        >
                                            <td className="p-4 font-semibold text-[var(--color-ink)]">
                                                v{c.version}
                                            </td>
                                            <td className="p-4 text-[var(--color-ink-soft)]">
                                                {format(parseISO(c.effective_date), "dd MMM yyyy", { locale: id })}
                                            </td>
                                            <td className="p-4 text-[var(--color-ink-soft)]">
                                                {format(parseISO(c.created_at), "dd MMM yyyy, HH:mm", { locale: id })}
                                            </td>
                                            <td className="p-4">
                                                {activeContract?.id === c.id ? (
                                                    <Badge variant="green">Aktif</Badge>
                                                ) : c.effective_date > new Date().toISOString().slice(0, 10) ? (
                                                    <Badge variant="amber">Terjadwal</Badge>
                                                ) : (
                                                    <Badge variant="outline">Arsip</Badge>
                                                )}
                                            </td>
                                            <td className="p-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setPreviewing(c)}
                                                    className="px-2 text-[var(--color-brand-blue)] gap-1"
                                                >
                                                    <Eye className="w-4 h-4" /> Lihat
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </PaperBackground>
    );
}