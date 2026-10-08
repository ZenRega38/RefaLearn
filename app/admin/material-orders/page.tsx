"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShoppingBag, Check, X, RefreshCw, ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import { getSignedProofUrl } from "@/lib/storage";
import { formatTimestamp, isSafeHttpUrl } from "@/lib/format";

type Order = {
  id: string;
  student_id: string;
  material_ids: string[];
  total_amount: number;
  status: 'pending' | 'proof_uploaded' | 'confirmed' | 'rejected';
  proof_url: string | null;
  created_at: string;
  profiles: { full_name: string; phone: string } | null;
};

const errorText = (err: unknown) => (err instanceof Error ? err.message : "Terjadi kesalahan.");

export default function AdminMaterialOrdersPage() {
  const [supabase] = useState(() => createClient());
  const [orders, setOrders] = useState<Order[]>([]);
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'review' | 'confirmed'>('review');
  const [viewingId, setViewingId] = useState<string | null>(null);

  const handleViewProof = async (order: Order) => {
    if (!order.proof_url) return;
    // Orders from before proof uploads existed stored a pasted link. Only
    // ever open real http(s) URLs — never a student-supplied javascript: URL.
    if (isSafeHttpUrl(order.proof_url)) {
      window.open(order.proof_url, '_blank', 'noopener,noreferrer');
      return;
    }
    setViewingId(order.id);
    try {
      const url = await getSignedProofUrl(order.proof_url);
      window.open(url, '_blank', 'noopener');
    } catch (err) {
      alert(`Gagal membuka bukti: ${errorText(err)}`);
    } finally {
      setViewingId(null);
    }
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('material_orders')
      .select('*, profiles(full_name, phone)')
      .order('created_at', { ascending: false });

    if (filter === 'pending') {
      query = query.in('status', ['pending', 'rejected']);
    } else if (filter === 'review') {
      query = query.eq('status', 'proof_uploaded');
    } else if (filter === 'confirmed') {
      query = query.eq('status', 'confirmed');
    }

    const { data } = await query;
    const list = (data || []) as Order[];
    setOrders(list);

    const ids = Array.from(new Set(list.flatMap((o) => o.material_ids)));
    if (ids.length > 0) {
      const { data: mats } = await supabase.from('materials').select('id, title').in('id', ids);
      setTitles(Object.fromEntries((mats || []).map((m) => [m.id, m.title])));
    }
    setLoading(false);
  }, [supabase, filter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data load on filter change
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('material_orders')
      .update({
        status: newStatus,
        confirmed_at: newStatus === 'confirmed' ? new Date().toISOString() : null
      })
      .eq('id', id);

    if (!error) {
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'material_order_status', recordId: id }),
      }).catch((err) => console.error('[admin/material-orders] notify failed:', err));
      fetchOrders();
    } else {
      alert(`Gagal update status: ${error.message}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="amber">Menunggu Pembayaran</Badge>;
      case 'proof_uploaded': return <Badge variant="blue">Perlu Review</Badge>;
      case 'confirmed': return <Badge variant="green">Lunas & Aktif</Badge>;
      case 'rejected': return <Badge variant="red">Ditolak</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <PaperBackground className="p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
            <ShoppingBag className="w-8 h-8" /> Pembelian Materi
          </h1>
          <div className="flex gap-2">
            <select
              className="input-field py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
            >
              <option value="review">Perlu Review (Bukti Diupload)</option>
              <option value="pending">Menunggu Pembayaran</option>
              <option value="confirmed">Lunas & Selesai</option>
              <option value="all">Semua Pembelian</option>
            </select>
            <Button variant="ghost" onClick={fetchOrders} size="sm" className="px-3" aria-label="Muat ulang">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="responsive-table w-full text-left text-sm border-collapse font-[var(--font-inter)]">
              <thead>
                <tr className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Tanggal Order</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Siswa</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Total</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-center">Status</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-[var(--color-ink-soft)]">Memuat...</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-[var(--color-ink-soft)]">Tidak ada pesanan untuk filter ini.</td></tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)]/50 transition-colors">
                      <td className="p-4" data-label="Tanggal Order">
                        <div className="font-bold text-[var(--color-ink)]">
                          {formatTimestamp(order.created_at, 'dd MMM yyyy HH:mm')}
                        </div>
                        <ul className="text-xs text-[var(--color-ink-soft)] mt-1 space-y-0.5">
                          {order.material_ids.map((mid) => (
                            <li key={mid}>• {titles[mid] || 'Materi dihapus'}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-4" data-label="Siswa">
                        <div className="font-semibold text-[var(--color-ink)]">{order.profiles?.full_name}</div>
                        <div className="text-xs text-[var(--color-ink-soft)] mt-1">{order.profiles?.phone}</div>
                      </td>
                      <td className="p-4 font-bold text-[var(--color-ink)]" data-label="Total">
                        {order.total_amount === 0 ? "Gratis" : formatPrice(order.total_amount)}
                      </td>
                      <td className="p-4 text-center" data-label="Status">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="p-4 text-right" data-label="Aksi">

                        {order.status === 'proof_uploaded' && (
                          <div className="flex justify-end gap-2 items-center">
                            {order.proof_url && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleViewProof(order)}
                                isLoading={viewingId === order.id}
                                className="px-2"
                                title="Lihat Bukti"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              onClick={() => updateStatus(order.id, 'confirmed')}
                              className="bg-[var(--color-success-green)] hover:bg-[var(--color-success-green)] text-white px-3"
                            >
                              <Check className="w-4 h-4 mr-1" /> Konfirmasi
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                if (window.confirm("Tolak bukti pembayaran ini?")) {
                                  updateStatus(order.id, 'rejected');
                                }
                              }}
                              className="text-[var(--color-danger-red)] px-2"
                              aria-label="Tolak"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}

                        {['pending', 'rejected'].includes(order.status) && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (window.confirm("Tandai pesanan ini lunas tanpa bukti di sistem?")) {
                                updateStatus(order.id, 'confirmed');
                              }
                            }}
                            className="text-xs"
                          >
                            Set Lunas Manual
                          </Button>
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
