"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

function BarisKas({ label, nilai }: { label: string; nilai: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", fontSize: 13.5 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 7, color: "#444" }}>
        <span style={{ color: nilai >= 0 ? "#2D6A4F" : "#BC4749", fontWeight: 700 }}>{nilai >= 0 ? "↑" : "↓"}</span>
        {label}
      </span>
      <span style={{ fontWeight: 700, color: nilai >= 0 ? "#2D6A4F" : "#BC4749" }}>
        {nilai < 0 ? `(${RP(Math.abs(nilai))})` : RP(nilai)}
      </span>
    </div>
  );
}

export default function ArusKasPage() {
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
    const omzet = produk.reduce((s, p) => s + (p.harga || 0) * (p.terjual || 0), 0);
    const hpp   = produk.reduce((s, p) => s + (p.modal || 0) * (p.terjual || 0), 0);
    const totalBeban = beban.reduce((s, b) => s + (b.jumlah || 0), 0);
    const saldo = omzet - hpp - totalBeban;
    return { omzet, hpp, totalBeban, saldo };
  }, [produk, beban]);

  if (loading) return <div style={{ color: "#7a6f5d" }}>Memuat data...</div>;

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ background: "white", borderRadius: 14, padding: 16, border: "1px solid #ECEAE3" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, color: "#1E2A3D" }}>💰 Laporan Arus Kas</h3>
        <BarisKas label="Kas Masuk — Penjualan" nilai={stat.omzet} />
        <BarisKas label="Kas Keluar — Beli Stok (HPP)" nilai={-stat.hpp} />
        <BarisKas label="Kas Keluar — Beban Operasional" nilai={-stat.totalBeban} />
        <div style={{ borderTop: "1px solid #e8e4d9", margin: "8px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
          <b style={{ fontSize: 15, color: "#1E2A3D" }}>Saldo Kas Akhir</b>
          <b style={{ fontSize: 17, color: stat.saldo >= 0 ? "#2D6A4F" : "#BC4749" }}>{RP(stat.saldo)}</b>
        </div>
      </div>
    </div>
  );
}
