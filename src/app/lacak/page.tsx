"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const TAHAP_STATUS = [
  { key: "menunggu",    label: "Pesanan Masuk",        emoji: "🧾", ket: "Pesanan kamu sudah kami terima"          },
  { key: "dikonfirmasi",label: "Pesanan Dikonfirmasi", emoji: "✅", ket: "Owner sudah konfirmasi pesananmu"        },
  { key: "dikemas",     label: "Sedang Dikemas",       emoji: "📦", ket: "Barang sedang dikemas dengan rapi"       },
  { key: "dikirim",     label: "Dalam Pengiriman",     emoji: "🚚", ket: "Kurir sedang mengantar pesananmu"        },
  { key: "selesai",     label: "Pesanan Tiba",         emoji: "🎉", ket: "Pesanan berhasil diterima. Terima kasih!" },
];

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

function LacakIsi() {
  const params = useSearchParams();
  const [nomor, setNomor]     = useState(params.get("nomor") || "");
  const [input, setInput]     = useState(params.get("nomor") || "");
  const [pesanan, setPesanan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const cari = async (n: string) => {
    if (!n.trim()) return;
    setLoading(true);
    setNotFound(false);
    setPesanan(null);
    const { data } = await supabase.from("pesanan").select("*").eq("nomor_pesanan", n.trim().toUpperCase()).single();
    if (data) { setPesanan(data); setNomor(n.trim().toUpperCase()); }
    else setNotFound(true);
    setLoading(false);
  };

  useEffect(() => {
    if (params.get("nomor")) cari(params.get("nomor")!);
  }, []);

  const idxAktif = pesanan ? TAHAP_STATUS.findIndex(t => t.key === pesanan.status) : -1;

  return (
      <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'Times New Roman', Times, serif" }}>
      {/* Header Simpel */}
      <div style={{ background: "#1E2A3D", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/toko" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none" }}>← Toko</Link>
        <div style={{ color: "white", fontWeight: 700, fontSize: 15, letterSpacing: 1 }}>ANEKA</div>
        <div style={{ width: 40 }} />
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "30px 18px 80px" }}>

        {/* Judul */}
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1E2A3D", margin: "0 0 4px" }}>Lacak Pesanan</h1>
        <p style={{ fontSize: 13, color: "#5A6B7B", margin: "0 0 22px" }}>Masukkan nomor pesanan yang kamu terima setelah checkout.</p>

        {/* Form Cari */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && cari(input)}
            placeholder="Contoh: ATK-AB1C2D"
            style={{ flex: 1, padding: "12px 14px", borderRadius: 11, border: "1px solid #ECEAE3", fontSize: 14, outline: "none", fontFamily: "'Times New Roman', Times, serif", background: "white", letterSpacing: 1, fontWeight: 700 }}
          />
          <button onClick={() => cari(input)} disabled={loading} style={{ background: "#1E2A3D", color: "white", border: "none", borderRadius: 11, padding: "0 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Times New Roman', Times, serif" }}>
            {loading ? "..." : "Cek"}
          </button>
        </div>

        {/* Not Found */}
        {notFound && (
          <div style={{ background: "#FDECEC", color: "#BC4749", padding: "14px 16px", borderRadius: 12, fontSize: 13, fontWeight: 600 }}>
            ❌ Nomor pesanan tidak ditemukan. Cek kembali nomor yang kamu masukkan.
          </div>
        )}

        {/* Hasil */}
        {pesanan && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Info Pesanan */}
            <div style={{ background: "white", borderRadius: 14, padding: 16, border: "1px solid #ECEAE3" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#888", letterSpacing: 1 }}>NOMOR PESANAN</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#1E2A3D", letterSpacing: 1.5 }}>{pesanan.nomor_pesanan}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#888" }}>TOTAL</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#1E2A3D" }}>{RP(pesanan.total)}</div>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #f4f1ea", paddingTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                <Baris k="Penerima"   v={pesanan.nama_pemesan} />
                <Baris k="Kurir"      v={pesanan.kurir || "-"} />
                <Baris k="Pembayaran" v={pesanan.metode_bayar || "-"} />
                <Baris k="Tanggal"    v={new Date(pesanan.created_at).toLocaleString("id-ID")} />
              </div>
            </div>

            {/* Timeline Status */}
            <div style={{ background: "white", borderRadius: 14, padding: 16, border: "1px solid #ECEAE3" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, color: "#1E2A3D", fontWeight: 700 }}>Status Pengiriman</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {TAHAP_STATUS.map((t, i) => {
                  const sudah   = i <= idxAktif;
                  const aktif   = i === idxAktif;
                  const terakhir = i === TAHAP_STATUS.length - 1;
                  return (
                    <div key={t.key} style={{ display: "flex", gap: 14 }}>
                      {/* Garis + Lingkaran */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 999, background: sudah ? "#1E2A3D" : "#ECEAE3", display: "grid", placeItems: "center", fontSize: 16, flexShrink: 0, border: aktif ? "3px solid #C9A24B" : "none" }}>
                          {sudah ? <span style={{ fontSize: aktif ? 18 : 14 }}>{t.emoji}</span> : <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ccc", display: "block" }} />}
                        </div>
                        {!terakhir && <div style={{ width: 2, flex: 1, background: sudah && i < idxAktif ? "#1E2A3D" : "#ECEAE3", minHeight: 24, margin: "3px 0" }} />}
                      </div>
                      {/* Teks */}
                      <div style={{ paddingBottom: terakhir ? 0 : 20, paddingTop: 6 }}>
                        <div style={{ fontSize: 13, fontWeight: aktif ? 800 : 600, color: sudah ? "#1E2A3D" : "#bbb" }}>{t.label}</div>
                        {sudah && <div style={{ fontSize: 11.5, color: aktif ? "#5A6B7B" : "#aaa", marginTop: 2 }}>{t.ket}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hubungi Admin */}
            <a href={`https://wa.me/6282189333923?text=${encodeURIComponent(`Halo, saya mau tanya pesanan nomor ${pesanan.nomor_pesanan}`)}`} target="_blank" rel="noreferrer" style={{ display: "block", background: "#25D366", color: "white", borderRadius: 12, padding: "13px 0", textAlign: "center", fontWeight: 700, fontSize: 14, textDecoration: "none", fontFamily: "'Times New Roman', Times, serif" }}>
              💬 Tanya Admin via WhatsApp
            </a>
          </div>
        )}

        {/* Link kembali */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/toko" style={{ color: "#5A6B7B", fontSize: 13, textDecoration: "none" }}>← Kembali ke Toko</Link>
        </div>
      </div>
    </div>
  );
}

function Baris({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
      <span style={{ color: "#888" }}>{k}</span>
      <span style={{ fontWeight: 600, color: "#1E2A3D" }}>{v}</span>
    </div>
  );
}

export default function LacakPage() {
  return <Suspense><LacakIsi /></Suspense>;
}
