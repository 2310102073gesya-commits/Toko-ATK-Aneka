"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

function Panel({ judul, children }: { judul: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", borderRadius: 14, padding: 16, border: "1px solid #ECEAE3" }}>
      <h3 style={{ margin: "0 0 14px", fontSize: 15, color: "#1E2A3D" }}>{judul}</h3>
      {children}
    </div>
  );
}

export default function PenjualanPage() {
  const [produk, setProduk] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("produk").select("*").then(({ data }) => { setProduk(data || []); setLoading(false); });
  }, []);

  const { perKategori, maxKat, sorted } = useMemo(() => {
    const map: Record<string, number> = {};
    produk.forEach(p => { map[p.kategori] = (map[p.kategori] || 0) + (p.harga || 0) * (p.terjual || 0); });
    const perKategori = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const maxKat = Math.max(...perKategori.map(k => k[1]), 1);
    const sorted = [...produk].sort((a, b) => (b.harga * b.terjual) - (a.harga * a.terjual));
    return { perKategori, maxKat, sorted };
  }, [produk]);

  if (loading) return <div style={{ color: "#7a6f5d" }}>Memuat data...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 640 }}>
      <Panel judul="📈 Omzet per Kategori">
        {perKategori.map(([kat, val]) => (
          <div key={kat} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
              <span style={{ fontWeight: 600 }}>{kat}</span>
              <span style={{ color: "#1E2A3D", fontWeight: 700 }}>{RP(val)}</span>
            </div>
            <div style={{ height: 10, background: "#f0ede5", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(val / maxKat) * 100}%`, background: "#1E2A3D", borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </Panel>

      <Panel judul="Rincian Penjualan per Produk">
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sorted.map(p => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f4f1ea", fontSize: 13 }}>
              <span>{p.emoji || "📦"} {p.nama_produk || p.nama}</span>
              <span style={{ display: "flex", gap: 14 }}>
                <span style={{ color: "#999" }}>{p.terjual || 0}x</span>
                <b style={{ color: "#1E2A3D", minWidth: 80, textAlign: "right" }}>{RP((p.harga || 0) * (p.terjual || 0))}</b>
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
