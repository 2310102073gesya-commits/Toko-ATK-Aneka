"use client";

import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import { useState } from "react";
import Link from "next/link";
import MapWrapper from "@/components/MapWrapper";
import { supabase } from "@/lib/supabase";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

const KURIR = [
  { id: "gosend",  nama: "GoSend Instant",  emoji: "🛵", est: "30–60 menit", ongkir: 12000 },
  { id: "maxim",   nama: "Maxim Kirim",      emoji: "🏍️", est: "40–70 menit", ongkir: 9000  },
  { id: "grab",    nama: "GrabExpress",      emoji: "🟢", est: "30–60 menit", ongkir: 13000 },
  { id: "jne",     nama: "JNE Reguler",      emoji: "📦", est: "2–3 hari",    ongkir: 18000 },
];

const BAYAR = [
  { id: "qris",      nama: "QRIS",          emoji: "🔳", ket: "Scan pakai bank/e-wallet apa aja" },
  { id: "transfer",  nama: "Transfer Bank", emoji: "🏦", ket: "Transfer Bank Mandiri"             },
];

// Generate nomor pesanan unik: ATK-XXXX
const buatNomorPesanan = () => {
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  const ts   = Date.now().toString(36).slice(-3).toUpperCase();
  return `ATK-${ts}${rand}`;
};

type Tahap = "alamat" | "kurir" | "bayar" | "selesai";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [tahap, setTahap]           = useState<Tahap>("alamat");
  const [form, setForm]             = useState({ nama: "", hp: "", alamat: "", lat: 0, lng: 0 });
  const [kurirPilih, setKurirPilih] = useState<string | null>(null);
  const [bayarPilih, setBayarPilih] = useState<string | null>(null);
  const [nomorPesanan, setNomorPesanan] = useState("");
  const [menyimpan, setMenyimpan]   = useState(false);
  const [orderedItems, setOrderedItems] = useState<any[]>([]);

  const ongkir = kurirPilih ? (KURIR.find(k => k.id === kurirPilih)?.ongkir || 0) : 0;
  const total  = cartTotal + ongkir;
  const judul: Record<Tahap, string> = { alamat: "Alamat Pengiriman", kurir: "Pilih Kurir", bayar: "Pembayaran", selesai: "" };

  // Simpan pesanan ke Supabase
  const selesaikan = async () => {
    setMenyimpan(true);
    const nomor = buatNomorPesanan();
    const kurirNama  = KURIR.find(k => k.id === kurirPilih)?.nama || "";
    const bayarNama  = BAYAR.find(b => b.id === bayarPilih)?.nama || "";

    const itemsJSON = cartItems.map(item => ({
      id: item.id,
      nama: item.nama_produk,
      harga: item.harga,
      qty: item.kuantitas
    }));

    setOrderedItems(itemsJSON);

    await supabase.from("pesanan").insert({
      nomor_pesanan: nomor,
      nama_pemesan:  form.nama,
      no_hp:         form.hp,
      alamat:        form.alamat,
      lat:           form.lat,
      lng:           form.lng,
      kurir:         kurirNama,
      metode_bayar:  bayarNama,
      total:         total,
      status:        "menunggu",
      items:         itemsJSON
    });

    setNomorPesanan(nomor);
    clearCart?.();
    setMenyimpan(false);
    setTahap("selesai");
  };

  // Halaman kosong
  if (cartItems.length === 0 && tahap !== "selesai") {
    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'Times New Roman', Times, serif" }}>
        <Header />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
          <h2 style={{ color: "#1E2A3D", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Keranjang Kosong</h2>
          <p style={{ color: "#5A6B7B", fontSize: 13, marginBottom: 20 }}>Belum ada barang yang Anda pilih.</p>
          <Link href="/toko" style={{ background: "#1E2A3D", color: "white", padding: "12px 24px", borderRadius: 12, fontWeight: 700, textDecoration: "none", fontFamily: "'Times New Roman', Times, serif" }}>
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  // Halaman SELESAI
  if (tahap === "selesai") {
    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'Times New Roman', Times, serif", display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
          <div style={{ textAlign: "center", width: "100%", maxWidth: 400 }}>
            <div style={{ width: 60, height: 60, borderRadius: 999, background: "#1E2A3D", display: "grid", placeItems: "center", margin: "0 auto 14px", color: "#C9A24B", fontSize: 24 }}>✓</div>
            <h2 style={{ margin: 0, color: "#1E2A3D", fontSize: 20, fontWeight: 700 }}>Pesanan Berhasil Dikirim!</h2>
            <p style={{ color: "#666", fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>
              Makasih <b>{form.nama}</b>. Pesanan kamu sedang diproses oleh toko.
            </p>

            {/* NOTA ONLINE */}
            <div style={{ background: "white", border: "1px solid #ECEAE3", borderRadius: 14, padding: "16px 18px", textAlign: "left", margin: "20px 0", boxShadow: "0 6px 18px rgba(0,0,0,0.02)" }}>
              <div style={{ textAlign: "center", borderBottom: "2px dashed #ECEAE3", paddingBottom: 10, marginBottom: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#1E2A3D", letterSpacing: 1.5 }}>NOTA PEMBELIAN</div>
                <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>TOKO ATK ANEKA</div>
              </div>

              {/* Rincian Pesanan */}
              <div style={{ fontSize: 12, display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
                <Row k="Nomor Pesanan" v={nomorPesanan} />
                <Row k="Tanggal"        v={new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })} />
                <Row k="Nama Pembeli"  v={form.nama} />
                <Row k="No. WhatsApp"   v={form.hp} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                  <span style={{ color: "#888" }}>Alamat</span>
                  <span style={{ fontWeight: 600, color: "#1E2A3D", maxWidth: "70%", textAlign: "right" }}>{form.alamat}</span>
                </div>
              </div>

              {/* Rincian Produk */}
              <div style={{ borderTop: "1px dashed #ECEAE3", borderBottom: "1px dashed #ECEAE3", padding: "10px 0", marginBottom: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                {orderedItems.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                    <span style={{ color: "#333" }}>{item.nama} <span style={{ color: "#888", fontSize: 11 }}>x{item.qty}</span></span>
                    <span style={{ fontWeight: 700, color: "#1E2A3D" }}>{RP(item.harga * item.qty)}</span>
                  </div>
                ))}
              </div>

              {/* Rincian Biaya */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <Row k="Subtotal Barang" v={RP(total - ongkir)} />
                <Row k={`Ongkir (${KURIR.find(k => k.id === kurirPilih)?.nama})`} v={RP(ongkir)} />
                <div style={{ borderTop: "1px solid #eee", marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <b style={{ fontSize: 13, color: "#1E2A3D" }}>TOTAL BAYAR</b>
                  <b style={{ fontSize: 16, color: "#C9A24B", fontWeight: 800 }}>{RP(total)}</b>
                </div>
              </div>

              <div style={{ marginTop: 12, background: "#F4ECDF", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: "#7a6f5d", textAlign: "center", fontWeight: 600 }}>
                Metode Pembayaran: {BAYAR.find(b => b.id === bayarPilih)?.nama}
              </div>
            </div>

            {/* Tombol Lacak */}
            <Link href={`/lacak?nomor=${nomorPesanan}`} style={{ display: "block", background: "#C9A24B", color: "#1E2A3D", padding: "13px 0", borderRadius: 12, fontWeight: 800, textDecoration: "none", fontSize: 14, marginBottom: 10, fontFamily: "'Times New Roman', Times, serif" }}>
              📦 Lacak Status Pengiriman
            </Link>
            <Link href="/toko" style={{ display: "block", background: "#1E2A3D", color: "white", padding: "12px 0", borderRadius: 12, fontWeight: 700, textDecoration: "none", fontSize: 13, fontFamily: "'Times New Roman', Times, serif" }}>
              Kembali Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Halaman Checkout Utama
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'Times New Roman', Times, serif" }}>
      <Header />

      {/* Header */}
      <div style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #ECEAE3", background: "white" }}>
        {tahap !== "alamat" && (
          <button onClick={() => setTahap(tahap === "kurir" ? "alamat" : "kurir")} style={{ background: "none", border: "none", cursor: "pointer", color: "#666", fontSize: 20 }}>←</button>
        )}
        <h2 style={{ margin: 0, fontSize: 18, color: "#1E2A3D", flex: 1, fontWeight: 700 }}>{judul[tahap]}</h2>
      </div>

      <div style={{ padding: "18px 18px 120px" }}>

        {/* TAHAP 1: ALAMAT */}
        {tahap === "alamat" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Nama Penerima"  value={form.nama}   onChange={v => setForm({...form, nama: v})}   placeholder="Nama lengkap" />
            <Field label="No. WhatsApp"   value={form.hp}     onChange={v => setForm({...form, hp: v})}     placeholder="08xxxxxxxxxx" />
            <Field label="Alamat (patokan/detail)" value={form.alamat} onChange={v => setForm({...form, alamat: v})} placeholder="Nama jalan, no rumah, patokan" textarea />
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 }}>Pin Lokasi di Peta</label>
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #ECEAE3" }}>
                <MapWrapper onLocationSelect={(lat, lng) => setForm(f => ({...f, lat, lng}))} />
              </div>
              {form.lat !== 0 && <p style={{ fontSize: 11, color: "#1E2A3D", margin: "4px 0 0", fontWeight: 600 }}>📍 {form.lat.toFixed(6)}, {form.lng.toFixed(6)}</p>}
            </div>
          </div>
        )}

        {/* TAHAP 2: KURIR */}
        {tahap === "kurir" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 12, color: "#8a6d3b", margin: "0 0 4px", background: "#FCF3DD", padding: "8px 12px", borderRadius: 8 }}>
              ⚠️ Demo: ongkir & estimasi ini contoh.
            </p>
            {KURIR.map(k => (
              <button key={k.id} onClick={() => setKurirPilih(k.id)} style={{ display: "flex", alignItems: "center", gap: 12, background: "white", border: `2px solid ${kurirPilih === k.id ? "#1E2A3D" : "#ECEAE3"}`, borderRadius: 12, padding: 14, cursor: "pointer", textAlign: "left", fontFamily: "'Times New Roman', Times, serif" }}>
                <span style={{ fontSize: 26 }}>{k.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#222" }}>{k.nama}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{k.est}</div>
                </div>
                <div style={{ fontWeight: 800, color: "#1E2A3D", fontSize: 14 }}>{RP(k.ongkir)}</div>
                {kurirPilih === k.id && <span style={{ color: "#1E2A3D", fontSize: 18 }}>✓</span>}
              </button>
            ))}
          </div>
        )}

        {/* TAHAP 3: BAYAR */}
        {tahap === "bayar" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "white", borderRadius: 12, padding: 14, border: "1px solid #ECEAE3" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666", marginBottom: 6 }}><span>Subtotal barang</span><span>{RP(cartTotal)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666", marginBottom: 8 }}><span>Ongkir</span><span>{RP(ongkir)}</span></div>
              <div style={{ borderTop: "1px dashed #ddd", margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, color: "#1E2A3D" }}><span>Total bayar</span><span>{RP(total)}</span></div>
            </div>
            {BAYAR.map(b => (
              <button key={b.id} onClick={() => setBayarPilih(b.id)} style={{ display: "flex", alignItems: "center", gap: 12, background: "white", border: `2px solid ${bayarPilih === b.id ? "#1E2A3D" : "#ECEAE3"}`, borderRadius: 12, padding: 14, cursor: "pointer", textAlign: "left", fontFamily: "'Times New Roman', Times, serif" }}>
                <span style={{ fontSize: 24 }}>{b.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#222" }}>{b.nama}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{b.ket}</div>
                </div>
                {bayarPilih === b.id && <span style={{ color: "#1E2A3D", fontSize: 18 }}>✓</span>}
              </button>
            ))}

            {/* Tampilan QRIS jika dipilih */}
            {(bayarPilih === "qris" || bayarPilih === "gopay" || bayarPilih === "shopeepay") && (
              <div style={{ background: "white", border: "1px solid #ECEAE3", borderRadius: 14, padding: "16px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center", marginTop: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1E2A3D" }}>Silakan Scan QRIS Toko ATK Fauzi</div>
                <div style={{ border: "2px solid #E3D6BF", borderRadius: 12, padding: 6, background: "white" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/qris.png" alt="QRIS Toko ATK Fauzi" style={{ width: "240px", height: "auto", display: "block" }} />
                </div>
                <div style={{ fontSize: 11, color: "#7a6f5d", lineHeight: 1.5 }}>
                  NMID: <b>ID1025418377376</b><br/>
                  Scan menggunakan GoPay, ShopeePay, OVO, Dana, LinkAja, atau m-Banking Anda, lalu klik <b>Bayar Sekarang</b>.
                </div>
              </div>
            )}

            {/* Tampilan Rekening jika transfer */}
            {bayarPilih === "transfer" && (
              <div style={{ background: "white", border: "1px solid #ECEAE3", borderRadius: 14, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1E2A3D" }}>Informasi Rekening Transfer</div>
                <div style={{ background: "#FAFAF7", borderRadius: 10, padding: 12, border: "1px solid #ECEAE3" }}>
                  <div style={{ fontSize: 11, color: "#888" }}>BANK MANDIRI</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#1E2A3D", margin: "2px 0 4px", letterSpacing: 0.5 }}>149-00-1929969-4</div>
                  <div style={{ fontSize: 12, color: "#5A6B7B" }}>a/n RUSTIYATI</div>
                </div>
                <div style={{ fontSize: 11, color: "#7a6f5d", lineHeight: 1.5, textAlign: "center" }}>
                  Silakan transfer senilai <b>{RP(total)}</b> ke rekening di atas, lalu klik <b>Bayar Sekarang</b>.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Tombol */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: 18, background: "white", borderTop: "1px solid #ECEAE3" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: "#666", fontSize: 14 }}>{tahap === "alamat" ? "Subtotal" : "Total"}</span>
          <span style={{ fontWeight: 800, fontSize: 20, color: "#1E2A3D" }}>{RP(tahap === "alamat" ? cartTotal : total)}</span>
        </div>
        <FooterBtn tahap={tahap} setTahap={setTahap} form={form} kurirPilih={kurirPilih} bayarPilih={bayarPilih} selesaikan={selesaikan} menyimpan={menyimpan} />
      </div>
    </div>
  );
}

// ===== Helper =====

function Field({ label, value, onChange, placeholder, textarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean }) {
  const base: React.CSSProperties = { width: "100%", padding: "11px 12px", borderRadius: 10, border: "1px solid #ECEAE3", background: "white", fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "'Times New Roman', Times, serif" };
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 }}>{label}</label>
      {textarea ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={base} /> : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={base} />}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
      <span style={{ color: "#888" }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
    </div>
  );
}

function FooterBtn({ tahap, setTahap, form, kurirPilih, bayarPilih, selesaikan, menyimpan }: any) {
  const cfg: Record<string, { label: string; next: () => void; ok: boolean }> = {
    alamat: { label: "Lanjut Pilih Kurir",   next: () => setTahap("kurir"), ok: !!(form.nama && form.hp && form.alamat && form.lat) },
    kurir:  { label: "Lanjut ke Pembayaran", next: () => setTahap("bayar"), ok: !!kurirPilih },
    bayar:  { label: menyimpan ? "Memproses..." : "Bayar Sekarang", next: selesaikan, ok: !!bayarPilih && !menyimpan },
  };
  const c = cfg[tahap];
  if (!c) return null;
  return (
    <button onClick={c.ok ? c.next : undefined} disabled={!c.ok} style={{ width: "100%", background: c.ok ? "#1E2A3D" : "#b3bcc8", color: "white", border: "none", borderRadius: 12, padding: "14px 0", fontWeight: 800, fontSize: 15, cursor: c.ok ? "pointer" : "not-allowed", fontFamily: "'Times New Roman', Times, serif" }}>
      {c.label}
    </button>
  );
}
