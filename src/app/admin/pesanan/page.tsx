"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

const STATUS_LIST = [
  { key: "menunggu",     label: "Menunggu",     warna: "#888",    bg: "#F5F5F5" },
  { key: "dikonfirmasi", label: "Dikonfirmasi", warna: "#1E2A3D", bg: "#E7D4A3" },
  { key: "dikemas",      label: "Dikemas",      warna: "#7a3e00", bg: "#FFF3CD" },
  { key: "dikirim",      label: "Dikirim",      warna: "#1a4fbd", bg: "#DBEAFE" },
  { key: "selesai",      label: "Selesai",      warna: "#2D6A4F", bg: "#EAF3EE" },
];

const URUTAN = ["menunggu", "dikonfirmasi", "dikemas", "dikirim", "selesai"];

export default function PesananMasukPage() {
  const [pesanan, setPesanan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("semua");

  const fetch = async () => {
    const { data } = await supabase.from("pesanan").select("*").order("created_at", { ascending: false });
    setPesanan(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await supabase.from("pesanan").update({ status }).eq("id", id);
    setPesanan(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    setUpdating(null);
  };

  const cetakResi = (o: any) => {
    const w = window.open("", "_blank", "width=600,height=700");
    if (!w) return;
    const itemsHtml = (o.items || []).map((item: any) => `
      <tr>
        <td style="padding: 6px 0; border-bottom: 1px solid #eee;">${item.nama} x ${item.qty}</td>
        <td style="padding: 6px 0; text-align: right; border-bottom: 1px solid #eee;">${RP(item.harga * item.qty)}</td>
      </tr>
    `).join("");

    w.document.write(`
      <html>
        <head>
          <title>Resi Pembelian - ${o.nomor_pesanan}</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace; padding: 20px; color: #000; font-size: 14px; }
            .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 15px; }
            .title { font-size: 18px; font-weight: bold; margin: 0; }
            .info { margin-bottom: 15px; line-height: 1.4; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            .total-section { border-top: 2px dashed #000; padding-top: 10px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; border-top: 1px dashed #000; padding-top: 10px; }
            @media print {
              body { padding: 0; }
              @page { size: auto; margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">TOKO ATK ANEKA</div>
            <div style="font-size: 11px; margin-top: 3px;">Balikpapan · WA: 082189333923</div>
          </div>
          <div class="info">
            <b>NO. PESANAN:</b> ${o.nomor_pesanan}<br/>
            <b>TANGGAL    :</b> ${new Date(o.created_at).toLocaleString("id-ID")}<br/>
            <b>PEMESAN    :</b> ${o.nama_pemesan}<br/>
            <b>NO. HP     :</b> ${o.no_hp}<br/>
            <b>ALAMAT     :</b> ${o.alamat}<br/>
            <b>KURIR      :</b> ${o.kurir || "-"}<br/>
            <b>PEMBAYARAN :</b> ${o.metode_bayar || "-"}<br/>
          </div>
          <table class="table">
            <thead>
              <tr style="border-bottom: 1px solid #000;">
                <th style="text-align: left; padding-bottom: 5px;">Item</th>
                <th style="text-align: right; padding-bottom: 5px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div class="total-section">
            <div style="display: flex; justify-content: space-between;">
              <span>TOTAL BAYAR:</span>
              <span>${RP(o.total)}</span>
            </div>
          </div>
          <div class="footer">
            Terima Kasih Telah Berbelanja!<br/>
            Toko ATK Aneka Balikpapan
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    w.document.close();
  };

  const tampil = filterStatus === "semua" ? pesanan : pesanan.filter(p => p.status === filterStatus);

  if (loading) return <div style={{ color: "#7a6f5d" }}>Memuat pesanan...</div>;

  return (
    <div>
      {/* Filter */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {["semua", ...URUTAN].map(s => {
          const info = STATUS_LIST.find(x => x.key === s);
          const aktif = filterStatus === s;
          return (
            <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: "6px 14px", borderRadius: 999, border: "none", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "'Times New Roman', Times, serif", background: aktif ? "#1E2A3D" : "#ECEAE3", color: aktif ? "white" : "#444" }}>
              {s === "semua" ? `Semua (${pesanan.length})` : `${info?.label} (${pesanan.filter(p => p.status === s).length})`}
            </button>
          );
        })}
      </div>

      {tampil.length === 0 ? (
        <div style={{ textAlign: "center", color: "#999", marginTop: 50 }}>
          <div style={{ fontSize: 40, opacity: 0.4 }}>🧾</div>
          <p style={{ fontSize: 13, marginTop: 10 }}>Belum ada pesanan{filterStatus !== "semua" ? ` dengan status "${filterStatus}"` : ""}.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 680 }}>
          {tampil.map((o: any) => {
            const info  = STATUS_LIST.find(s => s.key === o.status) || STATUS_LIST[0];
            const idx   = URUTAN.indexOf(o.status);
            const prevS = idx > 0 ? URUTAN[idx - 1] : null;
            const nextS = idx < URUTAN.length - 1 ? URUTAN[idx + 1] : null;

            return (
              <div key={o.id} style={{ background: "white", borderRadius: 14, padding: 16, border: "1px solid #ECEAE3" }}>
                {/* Baris atas */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#888", letterSpacing: 1 }}>{o.nomor_pesanan}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#1E2A3D" }}>{o.nama_pemesan}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{o.no_hp} · {new Date(o.created_at).toLocaleString("id-ID")}</div>
                  </div>
                  {/* Badge Status */}
                  <span style={{ fontSize: 11, fontWeight: 800, color: info.warna, background: info.bg, padding: "5px 12px", borderRadius: 999, flexShrink: 0 }}>
                    {info.label}
                  </span>
                </div>

                {/* Detail Barang Belanjaan */}
                {o.items && Array.isArray(o.items) && o.items.length > 0 && (
                  <div style={{ fontSize: 12.5, color: "#444", marginBottom: 10, padding: "10px 12px", background: "#F4ECDF", borderRadius: 10, border: "1px solid #E3D6BF" }}>
                    <div style={{ fontWeight: 700, fontSize: 11, color: "#7a6f5d", letterSpacing: 0.5, marginBottom: 6 }}>BARANG BELANJAAN:</div>
                    {o.items.map((item: any, idx: number) => (
                      <div key={idx} style={{ display: "flex", justifySpace: "between", justifyContent: "space-between", marginBottom: 3 }}>
                        <span>• {item.nama} <span style={{ color: "#888", fontSize: 11 }}>x{item.qty}</span></span>
                        <span style={{ fontWeight: 600 }}>{RP(item.harga * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Alamat & Info */}
                <div style={{ fontSize: 12.5, color: "#555", marginBottom: 10, padding: "8px 10px", background: "#FAFAF7", borderRadius: 8 }}>
                  📍 {o.alamat}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 12 }}>
                  <span>🚚 {o.kurir || "-"} · 💳 {o.metode_bayar || "-"}</span>
                  <b style={{ color: "#1E2A3D", fontSize: 14 }}>{RP(o.total)}</b>
                </div>

                {/* Tombol Update Status & Cetak */}
                <div style={{ borderTop: "1px dashed #eee", paddingTop: 12, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>AKSI:</span>
                  {prevS && (
                    <button onClick={() => updateStatus(o.id, prevS)} disabled={updating === o.id} style={{ padding: "5px 12px", borderRadius: 8, border: "1px solid #ECEAE3", background: "white", color: "#888", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'Times New Roman', Times, serif" }}>
                      ← {STATUS_LIST.find(s => s.key === prevS)?.label}
                    </button>
                  )}
                  {nextS && (
                    <button onClick={() => updateStatus(o.id, nextS)} disabled={updating === o.id} style={{ padding: "5px 14px", borderRadius: 8, border: "none", background: "#1E2A3D", color: "white", fontSize: 11, fontWeight: 800, cursor: "pointer", fontFamily: "'Times New Roman', Times, serif" }}>
                      {updating === o.id ? "..." : `${STATUS_LIST.find(s => s.key === nextS)?.label} →`}
                    </button>
                  )}
                  {o.status === "selesai" && <span style={{ fontSize: 11, color: "#2D6A4F", fontWeight: 700 }}>✓ Pesanan selesai</span>}

                  {/* Tombol Cetak Resi */}
                  <button onClick={() => cetakResi(o)} style={{ padding: "5px 12px", borderRadius: 8, border: "1px solid #1E2A3D", background: "white", color: "#1E2A3D", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'Times New Roman', Times, serif", display: "flex", alignItems: "center", gap: 4 }}>
                    🖨️ Cetak Resi
                  </button>

                  {/* WA Pelanggan */}
                  <a href={`https://wa.me/${o.no_hp?.replace(/\D/g, "")}?text=${encodeURIComponent(`Halo ${o.nama_pemesan}, pesanan kamu nomor ${o.nomor_pesanan} sudah ${STATUS_LIST.find(s => s.key === o.status)?.label?.toLowerCase() || o.status}.`)}`} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", padding: "5px 12px", borderRadius: 8, background: "#25D366", color: "white", fontSize: 11, fontWeight: 700, textDecoration: "none", fontFamily: "'Times New Roman', Times, serif" }}>
                    💬 WA
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
