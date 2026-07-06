"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

export default function RiwayatTransaksiPage() {
  const [pesanan, setPesanan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("pesanan").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setPesanan(data || []); setLoading(false); });
  }, []);

  if (loading) return <div style={{ color: "#7a6f5d" }}>Memuat riwayat...</div>;

  if (pesanan.length === 0) return (
    <div style={{ textAlign: "center", color: "#999", marginTop: 50 }}>
      <div style={{ fontSize: 40, opacity: 0.4 }}>📖</div>
      <p style={{ maxWidth: 260, margin: "10px auto 0", fontSize: 13 }}>Riwayat transaksi online akan muncul di sini setelah ada pesanan.</p>
    </div>
  );

  return (
    <div style={{ background: "white", borderRadius: 14, border: "1px solid #ECEAE3", overflow: "hidden", maxWidth: 700 }}>
      {pesanan.map((o: any, i: number) => (
        <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: i < pesanan.length - 1 ? "1px solid #f4f1ea" : "none" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{o.nama_pemesan}</div>
            <div style={{ fontSize: 11, color: "#999" }}>{new Date(o.created_at).toLocaleString("id-ID")} · {o.metode_bayar}</div>
          </div>
          <b style={{ color: "#2D6A4F", fontSize: 14 }}>+{RP(o.total)}</b>
        </div>
      ))}
    </div>
  );
}
