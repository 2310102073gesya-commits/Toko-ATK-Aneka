"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");
const AMBANG = 10;

export default function StokRestockPage() {
  const [produk, setProduk] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [tambahJumlah, setTambahJumlah] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase.from("produk").select("*").order("nama_produk")
      .then(({ data }) => { setProduk(data || []); setLoading(false); });
  }, []);

  const updateStok = async (id: string, newStok: number) => {
    if (newStok < 0) return;
    setSaving(id);
    setProduk(prev => prev.map(p => p.id === id ? { ...p, stok: newStok } : p));
    await supabase.from("produk").update({ stok: newStok }).eq("id", id);
    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const tambahRestock = async (id: string, stokSekarang: number) => {
    const jumlah = tambahJumlah[id] || 0;
    if (jumlah <= 0) return;
    await updateStok(id, stokSekarang + jumlah);
    setTambahJumlah(prev => ({ ...prev, [id]: 0 }));
  };

  if (loading) return <div style={{ color: "#7a6f5d" }}>Memuat data stok...</div>;

  const perluRestock = produk.filter(p => (p.stok || 0) <= AMBANG);
  const stokAman    = produk.filter(p => (p.stok || 0) > AMBANG);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 680 }}>

      {/* Info */}
      <p style={{ fontSize: 12.5, color: "#5A6B7B", margin: 0 }}>
        Tambah stok barang langsung dari sini. Perubahan tersimpan otomatis ke database.
      </p>

      {/* ===== BAGIAN PERLU RESTOCK ===== */}
      {perluRestock.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 14 }}>⚠️</span>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#BC4749" }}>Segera Restock ({perluRestock.length} produk)</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {perluRestock.map(p => (
              <KartuStok key={p.id} p={p} saving={saving} saved={saved} tambahJumlah={tambahJumlah} setTambahJumlah={setTambahJumlah} updateStok={updateStok} tambahRestock={tambahRestock} low />
            ))}
          </div>
        </div>
      )}

      {/* ===== BAGIAN STOK AMAN ===== */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 14 }}>✅</span>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#2D6A4F" }}>Stok Aman ({stokAman.length} produk)</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {stokAman.map(p => (
            <KartuStok key={p.id} p={p} saving={saving} saved={saved} tambahJumlah={tambahJumlah} setTambahJumlah={setTambahJumlah} updateStok={updateStok} tambahRestock={tambahRestock} low={false} />
          ))}
        </div>
      </div>

    </div>
  );
}

function KartuStok({ p, saving, saved, tambahJumlah, setTambahJumlah, updateStok, tambahRestock, low }: any) {
  const jumlah = tambahJumlah[p.id] || 0;

  return (
    <div style={{ background: "white", borderRadius: 12, padding: "12px 14px", border: `1px solid ${low ? "#F5C2C2" : "#ECEAE3"}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Emoji */}
        <div style={{ fontSize: 22, background: "#FAFAF7", borderRadius: 9, width: 44, height: 44, display: "grid", placeItems: "center", flexShrink: 0 }}>
          {p.emoji || "📦"}
        </div>

        {/* Info Produk */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.nama_produk}</div>
          <div style={{ fontSize: 11, color: "#888" }}>Modal {RP(p.modal || 0)} · Jual {RP(p.harga)}</div>
        </div>

        {/* Stok Sekarang */}
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>STOK</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: low ? "#BC4749" : "#1E2A3D" }}>{p.stok || 0}</div>
        </div>

        {/* Simpan status */}
        {saved === p.id && <span style={{ fontSize: 11, color: "#2D6A4F", fontWeight: 700 }}>✓ Tersimpan</span>}
        {saving === p.id && <span style={{ fontSize: 11, color: "#888" }}>💾...</span>}
      </div>

      {/* Baris Tambah Restock */}
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, paddingTop: 10, borderTop: "1px solid #f4f1ea" }}>
        <span style={{ fontSize: 12, color: "#5A6B7B", fontWeight: 600, flexShrink: 0 }}>Tambah stok:</span>

        {/* Quick buttons */}
        {[5, 10, 20, 50].map(n => (
          <button key={n} onClick={() => updateStok(p.id, (p.stok || 0) + n)} style={{ padding: "4px 10px", borderRadius: 8, border: "1px solid #ECEAE3", background: "#FAFAF7", color: "#1E2A3D", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Times New Roman', Times, serif" }}>
            +{n}
          </button>
        ))}

        {/* Input manual */}
        <input
          type="number"
          min={1}
          placeholder="manual"
          value={jumlah || ""}
          onChange={e => setTambahJumlah((prev: any) => ({ ...prev, [p.id]: parseInt(e.target.value) || 0 }))}
          style={{ width: 70, padding: "4px 8px", borderRadius: 8, border: "1px solid #ECEAE3", fontSize: 12, textAlign: "center", outline: "none", fontFamily: "'Times New Roman', Times, serif" }}
        />
        <button
          onClick={() => tambahRestock(p.id, p.stok || 0)}
          disabled={!jumlah || jumlah <= 0}
          style={{ padding: "4px 12px", borderRadius: 8, background: jumlah > 0 ? "#1E2A3D" : "#ccc", color: "white", fontSize: 12, fontWeight: 700, cursor: jumlah > 0 ? "pointer" : "not-allowed", border: "none", fontFamily: "'Times New Roman', Times, serif" }}
        >
          Tambah
        </button>
      </div>
    </div>
  );
}
