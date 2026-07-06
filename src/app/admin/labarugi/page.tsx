"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

function Garis() {
  return <div style={{ borderTop: "1px solid #e8e4d9", margin: "8px 0" }} />;
}
function Baris({ label, nilai, tebal, merah, kecil, warna }: { label: string; nilai: number; tebal?: boolean; merah?: boolean; kecil?: boolean; warna?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: kecil ? "3px 0 3px 12px" : "5px 0", fontSize: kecil ? 12.5 : 13.5 }}>
      <span style={{ fontWeight: tebal ? 700 : 400, color: kecil ? "#888" : "#444" }}>{label}</span>
      <span style={{ fontWeight: tebal ? 800 : 600, color: warna || (merah ? "#BC4749" : "#1E2A3D") }}>
        {nilai < 0 ? `(${RP(Math.abs(nilai))})` : RP(nilai)}
      </span>
    </div>
  );
}

export default function LabaRugiPage() {
  const [produk, setProduk] = useState<any[]>([]);
  const [beban, setBeban] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [{ data: p }, { data: b }] = await Promise.all([
        supabase.from("produk").select("*"),
        supabase.from("pengeluaran").select("*"),
      ]);
      setProduk(p || []);
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
    return { omzet, hpp, labaKotor, totalBeban, labaBersih, margin: omzet ? labaKotor / omzet * 100 : 0 };
  }, [produk, beban]);

  if (loading) return <div style={{ color: "#7a6f5d" }}>Memuat data...</div>;

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ background: "white", borderRadius: 14, padding: 16, border: "1px solid #ECEAE3" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, color: "#1E2A3D" }}>📄 Laporan Laba Rugi</h3>
        <Baris label="Pendapatan Usaha (Omzet)" nilai={stat.omzet} tebal />
        <Baris label="Beban Pokok Penjualan (HPP)" nilai={-stat.hpp} merah />
        <Garis />
        <Baris label="Laba Kotor" nilai={stat.labaKotor} tebal warna="#2D6A4F" />
        <div style={{ height: 10 }} />
        <div style={{ fontSize: 11, color: "#5A6B7B", fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>BEBAN OPERASIONAL</div>
        {beban.length === 0 ? (
          <div style={{ fontSize: 12.5, color: "#999", paddingLeft: 12, marginBottom: 6 }}>Belum ada pengeluaran dicatat</div>
        ) : (
          beban.map(b => <Baris key={b.id} label={b.nama} nilai={-b.jumlah} merah kecil />)
        )}
        <Baris label="Total Beban Operasional" nilai={-stat.totalBeban} merah />
        <Garis />
        <div style={{ background: stat.labaBersih >= 0 ? "#EAF3EE" : "#FDECEC", borderRadius: 10, padding: "12px 14px", marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <b style={{ color: stat.labaBersih >= 0 ? "#2D6A4F" : "#BC4749", fontSize: 15 }}>
            {stat.labaBersih >= 0 ? "LABA BERSIH" : "RUGI BERSIH"}
          </b>
          <b style={{ color: stat.labaBersih >= 0 ? "#2D6A4F" : "#BC4749", fontSize: 17 }}>
            {RP(Math.abs(stat.labaBersih))}
          </b>
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: "#999", marginTop: 12 }}>
        Angka pendapatan dan HPP dihitung dari transaksi produk. Beban operasional dicatat secara dinamis di menu <b>Catat Pengeluaran</b>.
      </p>
    </div>
  );
}
