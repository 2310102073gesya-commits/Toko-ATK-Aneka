"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

export default function PengeluaranPage() {
  const [pengeluaran, setPengeluaran] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [tanggal, setTanggal] = useState(new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);
  const [pesan, setPesan] = useState<{ teks: string; ok: boolean } | null>(null);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("pengeluaran").select("*").order("tanggal", { ascending: false });
    setPengeluaran(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const simpan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !jumlah || Number(jumlah) <= 0) return;
    setSaving(true);
    setPesan(null);

    const { error } = await supabase.from("pengeluaran").insert({
      nama: nama.trim(),
      jumlah: Number(jumlah),
      tanggal: tanggal,
    });

    if (error) {
      setPesan({ teks: "❌ Gagal mencatat: " + error.message, ok: false });
    } else {
      setPesan({ teks: "✓ Pengeluaran berhasil dicatat!", ok: true });
      setNama("");
      setJumlah("");
      setTanggal(new Date().toISOString().split("T")[0]);
      fetch();
    }
    setSaving(false);
  };

  const hapus = async (id: string, namaExp: string) => {
    if (!window.confirm(`Yakin ingin menghapus pengeluaran "${namaExp}"?`)) return;
    const { error } = await supabase.from("pengeluaran").delete().eq("id", id);
    if (!error) {
      fetch();
    }
  };

  const totalBeban = pengeluaran.reduce((s, x) => s + (x.jumlah || 0), 0);

  if (loading) return <div style={{ color: "#7a6f5d" }}>Memuat pengeluaran...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>

      {/* Info Ringkasan */}
      <div style={{ background: "#1E2A3D", color: "white", borderRadius: 14, padding: "16px 20px" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>TOTAL PENGELUARAN BULAN INI</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#C9A24B", marginTop: 4 }}>{RP(totalBeban)}</div>
      </div>

      {pesan && (
        <div style={{ background: pesan.ok ? "#EAF3EE" : "#FDECEC", color: pesan.ok ? "#2D6A4F" : "#BC4749", padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600 }}>
          {pesan.teks}
        </div>
      )}

      {/* Form Input Baru */}
      <div style={{ background: "white", borderRadius: 14, padding: 18, border: "1px solid #ECEAE3" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, color: "#1E2A3D" }}>💸 Catat Pengeluaran Baru</h3>
        <form onSubmit={simpan} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 10 }}>
            <div>
              <label style={lblStyle}>Deskripsi Pengeluaran</label>
              <input type="text" placeholder="cth: Bayar Listrik Toko" value={nama} onChange={e => setNama(e.target.value)} style={inputStyle} required />
            </div>
            <div>
              <label style={lblStyle}>Jumlah Biaya (Rp)</label>
              <input type="number" placeholder="cth: 250000" value={jumlah} onChange={e => setJumlah(e.target.value)} style={inputStyle} required />
            </div>
          </div>
          <div>
            <label style={lblStyle}>Tanggal Pengeluaran</label>
            <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} style={inputStyle} required />
          </div>
          <button type="submit" disabled={saving} style={{ background: "#1E2A3D", color: "white", border: "none", borderRadius: 10, padding: "11px 0", fontWeight: 800, cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Times New Roman', Times, serif" }}>
            {saving ? "Menyimpan..." : "Simpan Pengeluaran"}
          </button>
        </form>
      </div>

      {/* List Pengeluaran */}
      <div style={{ background: "white", borderRadius: 14, padding: 16, border: "1px solid #ECEAE3" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, color: "#1E2A3D" }}>Daftar Pengeluaran Terdaftar</h3>
        {pengeluaran.length === 0 ? (
          <p style={{ color: "#999", fontSize: 13, margin: 0 }}>Belum ada catatan pengeluaran.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {pengeluaran.map(x => (
              <div key={x.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f4f1ea", fontSize: 13 }}>
                <div>
                  <div style={{ fontWeight: 600, color: "#1E2A3D" }}>{x.nama}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{new Date(x.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <b style={{ color: "#BC4749" }}>-{RP(x.jumlah)}</b>
                  <button onClick={() => hapus(x.id, x.nama)} style={{ color: "#BC4749", background: "none", border: "none", cursor: "pointer", fontSize: 12, textDecoration: "underline", fontWeight: 700, fontFamily: "'Times New Roman', Times, serif" }}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

const lblStyle = { fontSize: 11.5, fontWeight: 700, color: "#444", display: "block", marginBottom: 4 };
const inputStyle = { width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #ECEAE3", fontSize: 13, outline: "none", fontFamily: "'Times New Roman', Times, serif", boxSizing: "border-box" as const };
