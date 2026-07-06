"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");
const AMBANG = 10;

function Kartu({ icon, label, nilai, warna, sub }: { icon: string; label: string; nilai: string; warna: string; sub?: string }) {
  return (
    <div style={{ background: "white", borderRadius: 14, padding: 14, border: "1px solid #ECEAE3" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: warna, marginBottom: 8 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: "#888" }}>{label}</span>
      </div>
      <div style={{ fontWeight: 800, fontSize: 18, color: warna }}>{nilai}</div>
      {sub && <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Panel({ judul, children }: { judul: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", borderRadius: 14, padding: 16, border: "1px solid #ECEAE3" }}>
      <h3 style={{ margin: "0 0 14px", fontSize: 15, color: "#1E2A3D" }}>{judul}</h3>
      {children}
    </div>
  );
}

export default function AdminRingkasan() {
  const [produk, setProduk] = useState<any[]>([]);
  const [pesanan, setPesanan] = useState<any[]>([]);
  const [beban, setBeban] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [{ data: p }, { data: o }, { data: b }] = await Promise.all([
        supabase.from("produk").select("*"),
        supabase.from("pesanan").select("*").order("created_at", { ascending: false }),
        supabase.from("pengeluaran").select("*"),
      ]);
      setProduk(p || []);
      setPesanan(o || []);
      setBeban(b || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const stat = useMemo(() => {
    const omzet     = produk.reduce((s, p) => s + (p.harga || 0) * (p.terjual || 0), 0);
    const hpp       = produk.reduce((s, p) => s + (p.modal || 0) * (p.terjual || 0), 0);
    const labaKotor = omzet - hpp;
    const totalBeban = beban.reduce((s, b) => s + (b.jumlah || 0), 0);
    const labaBersih = labaKotor - totalBeban;
    const nilaiStok  = produk.reduce((s, p) => s + (p.modal || 0) * (p.stok || 0), 0);
    const perluRestock = produk.filter(p => (p.stok || 0) <= AMBANG);
    const terlaris = [...produk].sort((a, b) => (b.terjual || 0) - (a.terjual || 0)).slice(0, 5);
    return { omzet, hpp, labaKotor, labaBersih, nilaiStok, totalBeban, perluRestock, terlaris, margin: omzet ? labaKotor / omzet * 100 : 0 };
  }, [produk, beban]);

  if (loading) return <div style={{ color: "#7a6f5d", fontSize: 14 }}>Memuat data...</div>;

  const maxTerjual = stat.terlaris[0]?.terjual || 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* 4 Kartu Metrik */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        <Kartu icon="$" label="Omzet Total" nilai={RP(stat.omzet)} warna="#1E2A3D" />
        <Kartu icon={stat.labaBersih >= 0 ? "↗" : "↘"} label={stat.labaBersih >= 0 ? "Laba Bersih" : "Rugi Bersih"} nilai={RP(Math.abs(stat.labaBersih))} warna={stat.labaBersih >= 0 ? "#2D6A4F" : "#BC4749"} sub={`Margin kotor ${stat.margin.toFixed(1)}%`} />
        <Kartu icon="📦" label="Nilai Stok (modal)" nilai={RP(stat.nilaiStok)} warna="#5A6B7B" />
        <Kartu icon="⚠️" label="Perlu Restock" nilai={`${stat.perluRestock.length} produk`} warna={stat.perluRestock.length ? "#BC4749" : "#2D6A4F"} />
      </div>

      {/* Produk Terlaris + Segera Restock */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        <Panel judul="⭐ Produk Paling Diminati">
          {stat.terlaris.length === 0
            ? <p style={{ color: "#999", fontSize: 13, margin: 0 }}>Belum ada data penjualan.</p>
            : stat.terlaris.map((p, i) => (
              <div key={p.id} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>{i + 1}. {p.emoji || "📦"} {p.nama_produk || p.nama}</span>
                  <span style={{ color: "#888" }}>{p.terjual}</span>
                </div>
                <div style={{ height: 8, background: "#f0ede5", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(p.terjual / maxTerjual) * 100}%`, background: "#1E2A3D", borderRadius: 999 }} />
                </div>
              </div>
            ))
          }
        </Panel>

        <Panel judul="⚠️ Segera Restock">
          {stat.perluRestock.length === 0
            ? <p style={{ color: "#2D6A4F", fontSize: 13, margin: 0 }}>✓ Semua stok aman.</p>
            : stat.perluRestock.map(p => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0ede5" }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{p.emoji || "📦"} {p.nama_produk || p.nama}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#BC4749", background: "#FDECEC", padding: "3px 10px", borderRadius: 999 }}>sisa {p.stok}</span>
              </div>
            ))
          }
        </Panel>
      </div>

      {/* Pesanan Online Terbaru */}
      <Panel judul="Pesanan Online Terbaru">
        {pesanan.length === 0
          ? <p style={{ color: "#999", fontSize: 13, margin: 0 }}>Belum ada pesanan online. Checkout dari mode Pelanggan buat lihat di sini.</p>
          : pesanan.slice(0, 4).map((o: any) => (
            <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0ede5" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{o.nama_pemesan}</div>
                <div style={{ fontSize: 11, color: "#999" }}>{o.metode_bayar} · {o.kurir}</div>
              </div>
              <b style={{ color: "#1E2A3D", fontSize: 14 }}>{RP(o.total)}</b>
            </div>
          ))
        }
      </Panel>
    </div>
  );
}
