"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { Plus, Trash2, Calendar, Clock, RefreshCw } from "lucide-react";

type AvailabilityRule = {
  id: string;
  day_of_week: number | null;
  specific_date: string | null;
  start_time: string;
  end_time: string;
  is_recurring: boolean;
  is_active: boolean;
};

type BlackoutDate = {
  id: string;
  date: string;
  reason: string | null;
};

const DAYS = [
  { value: 0, label: "Minggu" },
  { value: 1, label: "Senin" },
  { value: 2, label: "Selasa" },
  { value: 3, label: "Rabu" },
  { value: 4, label: "Kamis" },
  { value: 5, label: "Jumat" },
  { value: 6, label: "Sabtu" },
];

export default function AdminAvailabilityPage() {
  const supabase = createClient();
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [blackouts, setBlackouts] = useState<BlackoutDate[]>([]);
  const [loading, setLoading] = useState(true);

  // New rule state
  const [isRecurring, setIsRecurring] = useState(true);
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [specificDate, setSpecificDate] = useState("");
  const [startTime, setStartTime] = useState("16:00");
  const [endTime, setEndTime] = useState("17:30"); // Default 90 mins

  // New blackout state
  const [blackoutDate, setBlackoutDate] = useState("");
  const [blackoutReason, setBlackoutReason] = useState("");

  const fetchData = async () => {
    setLoading(true);

    // Fetch rules
    const { data: rulesData } = await supabase
      .from('availability_rules')
      .select('*')
      .order('is_recurring', { ascending: false })
      .order('day_of_week', { ascending: true })
      .order('specific_date', { ascending: true });

    if (rulesData) setRules(rulesData);

    // Fetch blackouts
    const { data: blackoutsData } = await supabase
      .from('blackout_dates')
      .select('*')
      .order('date', { ascending: true });

    if (blackoutsData) setBlackouts(blackoutsData);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddRule = async () => {
    if (!isRecurring && !specificDate) {
      alert("Pilih tanggal untuk jadwal satu kali (one-off).");
      return;
    }

    const newRule = {
      is_recurring: isRecurring,
      day_of_week: isRecurring ? dayOfWeek : null,
      specific_date: !isRecurring ? specificDate : null,
      start_time: startTime,
      end_time: endTime,
      is_active: true
    };

    const { error } = await supabase.from('availability_rules').insert([newRule]);

    if (error) {
      alert(`Gagal menambah jadwal: ${error.message}`);
    } else {
      fetchData();
      // Reset some fields
      setSpecificDate("");
    }
  };

  const handleToggleRuleActive = async (id: string, currentStatus: boolean) => {
    await supabase
      .from('availability_rules')
      .update({ is_active: !currentStatus })
      .eq('id', id);
    fetchData();
  };

  const handleDeleteRule = async (id: string) => {
    if (window.confirm("Hapus jadwal ini?")) {
      await supabase.from('availability_rules').delete().eq('id', id);
      fetchData();
    }
  };

  const handleAddBlackout = async () => {
    if (!blackoutDate) {
      alert("Pilih tanggal yang akan diblokir.");
      return;
    }

    const { error } = await supabase.from('blackout_dates').insert([{
      date: blackoutDate,
      reason: blackoutReason || null
    }]);

    if (error) {
      alert(`Gagal menambah tanggal libur: ${error.message}`);
    } else {
      fetchData();
      setBlackoutDate("");
      setBlackoutReason("");
    }
  };

  const handleDeleteBlackout = async (id: string) => {
    await supabase.from('blackout_dates').delete().eq('id', id);
    fetchData();
  };

  const formatTimeStr = (time: string) => {
    return time.substring(0, 5); // Extract HH:mm from HH:mm:ss
  };

  return (
    <PaperBackground className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
            Pengaturan Jadwal & Ketersediaan
          </h1>
          <Button variant="ghost" onClick={fetchData} size="sm">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* =========================================================
              AVAILABILITY RULES SECTION
              ========================================================= */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--color-accent-coral)]" />
              Aturan Ketersediaan
            </h2>

            {/* Add Rule Form */}
            <Card variant="sketch" className="p-5">
              <h3 className="text-sm font-semibold mb-4 border-b border-dashed border-[var(--color-line)] pb-2 text-[var(--color-brand-blue)]">
                Tambah Jadwal Baru
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm cursor-pointer font-[var(--font-inter)]">
                    <input
                      type="radio"
                      checked={isRecurring}
                      onChange={() => setIsRecurring(true)}
                      className="text-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)]"
                    />
                    Rutin Mingguan
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer font-[var(--font-inter)]">
                    <input
                      type="radio"
                      checked={!isRecurring}
                      onChange={() => setIsRecurring(false)}
                      className="text-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)]"
                    />
                    Satu Kali (Spesifik)
                  </label>
                </div>

                {isRecurring ? (
                  <Select
                    label="Hari"
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(parseInt(e.target.value))}
                  >
                    {DAYS.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    label="Tanggal Spesifik"
                    type="date"
                    value={specificDate}
                    onChange={(e) => setSpecificDate(e.target.value)}
                  />
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Jam Mulai"
                    type="time"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                      // Auto-calculate 90 mins end time if possible
                      try {
                        const [h, m] = e.target.value.split(':').map(Number);
                        const date = new Date();
                        date.setHours(h, m + 90);
                        const endH = String(date.getHours()).padStart(2, '0');
                        const endM = String(date.getMinutes()).padStart(2, '0');
                        setEndTime(`${endH}:${endM}`);
                      } catch (e) { }
                    }}
                  />
                  <Input
                    label="Jam Selesai (90 menit)"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>

                <Button onClick={handleAddRule} className="w-full">
                  <Plus className="w-4 h-4 mr-1" /> Tambah Jadwal
                </Button>
              </div>
            </Card>

            {/* Rules List */}
            <Card className="p-0 overflow-hidden">
              <table className="responsive-table w-full text-left text-sm border-collapse font-[var(--font-inter)]">
                <thead>
                  <tr className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
                    <th className="p-3 font-semibold text-[var(--color-ink-soft)]">Tipe</th>
                    <th className="p-3 font-semibold text-[var(--color-ink-soft)]">Waktu</th>
                    <th className="p-3 font-semibold text-[var(--color-ink-soft)] text-center">Status</th>
                    <th className="p-3 font-semibold text-[var(--color-ink-soft)] text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.length === 0 ? (
                    <tr><td colSpan={4} className="p-4 text-center text-[var(--color-ink-soft)]">Belum ada aturan jadwal</td></tr>
                  ) : (
                    rules.map((rule) => (
                      <tr key={rule.id} className={`border-b border-[var(--color-line)] ${!rule.is_active ? 'opacity-50 bg-gray-50' : ''}`}>
                        <td className="p-3" data-label="Tipe">
                          {rule.is_recurring ? (
                            <span className="font-semibold text-[var(--color-brand-blue)]">Setiap {DAYS.find(d => d.value === rule.day_of_week)?.label}</span>
                          ) : (
                            <span className="font-semibold text-[var(--color-accent-coral)]">{format(parseISO(rule.specific_date!), 'dd MMM yyyy', { locale: id })}</span>
                          )}
                        </td>
                        <td className="p-3 font-mono text-xs" data-label="Waktu">
                          {formatTimeStr(rule.start_time)} - {formatTimeStr(rule.end_time)}
                        </td>
                        <td className="p-3 text-center" data-label="Status">
                          <button
                            onClick={() => handleToggleRuleActive(rule.id, rule.is_active)}
                            className={`px-2 py-1 text-xs rounded-full border ${rule.is_active
                              ? 'bg-green-50 border-green-200 text-green-700'
                              : 'bg-gray-100 border-gray-300 text-gray-600'
                              }`}
                          >
                            {rule.is_active ? 'Aktif' : 'Nonaktif'}
                          </button>
                        </td>
                        <td className="p-3 text-right" data-label="Aksi">
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteRule(rule.id)} className="px-2 text-[var(--color-danger-red)]">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Card>
          </div>

          {/* =========================================================
              BLACKOUT DATES SECTION
              ========================================================= */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-danger-red)]" />
              Tanggal Libur (Blackout)
            </h2>

            {/* Add Blackout Form */}
            <Card variant="sketch" className="p-5">
              <h3 className="text-sm font-semibold mb-4 border-b border-dashed border-[var(--color-line)] pb-2 text-[var(--color-brand-blue)]">
                Tutup Jadwal
              </h3>
              <p className="text-xs text-[var(--color-ink-soft)] mb-4">
                Pilih tanggal di mana Anda tidak bisa mengajar (misal: hari raya, cuti, sakit). Tanggal ini akan membatalkan jadwal rutin yang ada.
              </p>

              <div className="space-y-4">
                <Input
                  label="Tanggal Libur"
                  type="date"
                  value={blackoutDate}
                  onChange={(e) => setBlackoutDate(e.target.value)}
                />

                <Input
                  label="Alasan / Keterangan (Opsional)"
                  type="text"
                  value={blackoutReason}
                  onChange={(e) => setBlackoutReason(e.target.value)}
                  placeholder="Cuti, Libur Lebaran, dll."
                />

                <Button onClick={handleAddBlackout} className="w-full bg-[var(--color-danger-red)] hover:bg-[var(--color-danger-red-light)] border-transparent">
                  <Plus className="w-4 h-4 mr-1" /> Blokir Tanggal
                </Button>
              </div>
            </Card>

            {/* Blackout List */}
            <Card className="p-0 overflow-hidden border-[var(--color-danger-red)]/30">
              <table className="responsive-table w-full text-left text-sm border-collapse font-[var(--font-inter)]">
                <thead>
                  <tr className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
                    <th className="p-3 font-semibold text-[var(--color-ink-soft)]">Tanggal Libur</th>
                    <th className="p-3 font-semibold text-[var(--color-ink-soft)]">Keterangan</th>
                    <th className="p-3 font-semibold text-[var(--color-ink-soft)] text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {blackouts.length === 0 ? (
                    <tr><td colSpan={3} className="p-4 text-center text-[var(--color-ink-soft)]">Tidak ada tanggal libur</td></tr>
                  ) : (
                    blackouts.map((b) => (
                      <tr key={b.id} className="border-b border-[var(--color-line)]">
                        <td className="p-3 font-semibold text-[var(--color-ink)]" data-label="Tanggal Libur">
                          {format(parseISO(b.date), 'dd MMMM yyyy', { locale: id })}
                        </td>
                        <td className="p-3 text-[var(--color-ink-soft)]" data-label="Keterangan">
                          {b.reason || '-'}
                        </td>
                        <td className="p-3 text-right" data-label="Aksi">
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteBlackout(b.id)} className="px-2 text-[var(--color-danger-red)]">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Card>
          </div>

        </div>
      </div>
    </PaperBackground>
  );
}
