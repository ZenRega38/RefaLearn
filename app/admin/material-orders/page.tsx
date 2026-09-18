"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { ShoppingBag, Check, X, RefreshCw, ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import { getSignedProofUrl } from "@/lib/storage";

type Order = {
  id: string;
  student_id: string;
  material_ids: string[];
  total_amount: number;
  status: 'pending' | 'proof_uploaded' | 'confirmed' | 'rejected';
  proof_url: string | null;
  created_at: string;
  profiles: { full_name: string; phone: string };
};

export default function AdminMaterialOrdersPage() {
  const supabase = createClient();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'review' | 'confirmed'>('review');
  const [viewingId, setViewingId] = useState<string | null>(null);

  const handleViewProof = async (order: Order) => {
    if (!order.proof_url) return;
    setViewingId(order.id);
    try {
      const url = await getSignedProofUrl(order.proof_url);
      window.open(url, '_blank');
    } catch (err: any) {
      alert(`Gagal membuka bukti: ${err.message}`);
    } finally {
      setViewingId(null);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase
      .from('material_orders')
      .select('*, profiles(full_name, phone)')
      .order('created_at', { ascending: false });

    if (filter === 'pending') {
      query = query.eq('status', 'pending');
    } else if (filter === 'review') {
      query = query.eq('status', 'proof_uploaded');
    } else if (filter === 'confirmed') {
      query = query.eq('status', 'confirmed');
    }

    const { data, error } = await query;
    if (data) setOrders(data as Order[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('material_orders')
      .update({
        status: newStatus,
        confirmed_at: newStatus === 'confirmed' ? new Date().toISOString() : null
      })
      .eq('id', id);

    if (!error) {
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
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="review">Perlu Review (Bukti Diupload)</option>
              <option value="pending">Menunggu Pembayaran</option>
              <option value="confirmed">Lunas & Selesai</option>
              <option value="all">Semua Pembelian</option>
            </select>
            <Button variant="ghost" onClick={fetchOrders} size="sm" className="px-3">
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
                          {format(parseISO(order.created_at), 'dd MMM yyyy HH:mm', { locale: id })}
                        </div>
                        <div className="text-xs text-[var(--color-ink-soft)] mt-1">
                          {order.material_ids.length} Item
                        </div>
                      </td>
                      <td className="p-4" data-label="Siswa">
                        <div className="font-semibold text-[var(--color-ink)]">{order.profiles?.full_name}</div>
                        <div className="text-xs text-[var(--color-ink-soft)] mt-1">{order.profiles?.phone}</div>
                      </td>
                      <td className="p-4 font-bold text-[var(--color-ink)]" data-label="Total">
                        {formatPrice(order.total_amount)}
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
                                onClick={() => window.open(order.proof_url!, '_blank')}
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
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}

                        {order.status === 'pending' && (
                          <Button size="sm" variant="ghost" onClick={() => updateStatus(order.id, 'confirmed')} className="text-xs">
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
