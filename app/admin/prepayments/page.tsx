"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { Wallet, Check, X, RefreshCw, ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import { getSignedProofUrl } from "@/lib/storage";

type Prepayment = {
    id: string;
    student_id: string;
    total_amount: number;
    status: 'pending' | 'proof_uploaded' | 'confirmed' | 'rejected';
    proof_url: string | null;
    waived_fee_ids: string[] | null;
    created_at: string;
    profiles: { full_name: string; phone: string };
};

export default function AdminPrepaymentsPage() {
    const supabase = createClient();
    const [items, setItems] = useState<Prepayment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'review' | 'all'>('review');
    const [viewingId, setViewingId] = useState<string | null>(null);

    const fetchItems = async () => {
        setLoading(true);
        let query = supabase
            .from('prepayments')
            .select('*, profiles(full_name, phone)')
            .order('created_at', { ascending: false });

        if (filter === 'review') query = query.eq('status', 'proof_uploaded');

        const { data } = await query;
        if (data) setItems(data as Prepayment[]);
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, [filter]);

    const handleViewProof = async (item: Prepayment) => {
        if (!item.proof_url) return;
        setViewingId(item.id);
        try {
            const url = await getSignedProofUrl(item.proof_url);
            window.open(url, '_blank');
        } catch (err: any) {
            alert(`Gagal membuka bukti: ${err.message}`);
        } finally {
            setViewingId(null);
        }
    };

    const handleConfirm = async (item: Prepayment) => {
        const { error: prepaymentError } = await supabase
            .from('prepayments')
            .update({ status: 'confirmed', confirmed_at: new Date().toISOString() })
            .eq('id', item.id);

        if (prepaymentError) {
            alert(`Gagal konfirmasi: ${prepaymentError.message}`);
            return;
        }

        if (item.waived_fee_ids && item.waived_fee_ids.length > 0) {
            const { error: feeError } = await supabase
                .from('cancellation_fees')
                .update({ status: 'waived', resolved_at: new Date().toISOString() })
                .in('id', item.waived_fee_ids);

            if (feeError) {
                alert(`Pembayaran dikonfirmasi, tapi gagal menghapus denda lama: ${feeError.message}. Cek manual.`);
            }
        }

        fetchItems();
    };

    const handleReject = async (id: string) => {
        if (!window.confirm("Tolak bukti pembayaran ini?")) return;
        const { error } = await supabase.from('prepayments').update({ status: 'rejected' }).eq('id', id);
        if (!error) fetchItems();
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="amber">Menunggu Transfer</Badge>;
            case 'proof_uploaded': return <Badge variant="blue">Perlu Review</Badge>;
            case 'confirmed': return <Badge variant="green">Lunas</Badge>;
            case 'rejected': return <Badge variant="red">Ditolak</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <PaperBackground className="p-4 md:p-8 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
                        <Wallet className="w-8 h-8" /> Pembayaran di Muka
                    </h1>
                    <div className="flex gap-2">
                        <select className="input-field py-2" value={filter} onChange={(e) => setFilter(e.target.value as any)}>
                            <option value="review">Perlu Review</option>
                            <option value="all">Semua</option>
                        </select>
                        <Button variant="ghost" onClick={fetchItems} size="sm" className="px-3">
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                    </div>
                </div>

                <Card className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse font-[var(--font-inter)]">
                            <thead>
                                <tr className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
                                    <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Tanggal</th>
                                    <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Siswa</th>
                                    <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Total</th>
                                    <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Denda Dihapus</th>
                                    <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-center">Status</th>
                                    <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={6} className="p-8 text-center text-[var(--color-ink-soft)]">Memuat...</td></tr>
                                ) : items.length === 0 ? (
                                    <tr><td colSpan={6} className="p-8 text-center text-[var(--color-ink-soft)]">Tidak ada data.</td></tr>
                                ) : (
                                    items.map((item) => (
                                        <tr key={item.id} className="border-b border-[var(--color-line)]">
                                            <td className="p-4">{format(parseISO(item.created_at), 'dd MMM yyyy', { locale: id })}</td>
                                            <td className="p-4">
                                                <div className="font-semibold">{item.profiles?.full_name}</div>
                                                <div className="text-xs text-[var(--color-ink-soft)]">{item.profiles?.phone}</div>
                                            </td>
                                            <td className="p-4 font-bold">{formatPrice(item.total_amount)}</td>
                                            <td className="p-4 text-xs">{item.waived_fee_ids?.length ? `${item.waived_fee_ids.length} denda` : "-"}</td>
                                            <td className="p-4 text-center">{getStatusBadge(item.status)}</td>
                                            <td className="p-4 text-right">
                                                {item.status === 'proof_uploaded' && (
                                                    <div className="flex justify-end gap-2">
                                                        {item.proof_url && (
                                                            <Button size="sm" variant="ghost" onClick={() => handleViewProof(item)} isLoading={viewingId === item.id} className="px-2">
                                                                <ExternalLink className="w-4 h-4" />
                                                            </Button>
                                                        )}
                                                        <Button size="sm" onClick={() => handleConfirm(item)} className="bg-[var(--color-success-green)] hover:bg-[var(--color-success-green)] text-white px-3">
                                                            <Check className="w-4 h-4 mr-1" /> Konfirmasi
                                                        </Button>
                                                        <Button size="sm" variant="ghost" onClick={() => handleReject(item.id)} className="text-[var(--color-danger-red)] px-2">
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                )}
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