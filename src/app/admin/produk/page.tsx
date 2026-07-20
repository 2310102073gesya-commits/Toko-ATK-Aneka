"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");
const AMBANG = 10;

const FORM_KOSONG = {
  nama_produk: "", merek: "", kategori: "Alat Tulis",
  harga: "", modal: "", stok: "", terjual: "0",
  rating: "5.0", emoji: "📦", image_url: "",
};
const KATEGORIS = ["Alat Tulis", "Buku", "Kantor"];

export default function AdminProdukPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...FORM_KOSONG });
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [pesan, setPesan] = useState<{ teks: string; ok: boolean } | null>(null);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("produk").select("*").order("nama_produk");
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const pilihFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Kompres & konversi ke base64 — langsung simpan ke DB, tanpa bucket
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setFotoPreview(base64);
      setForm(f => ({ ...f, image_url: base64 }));
    };
    reader.readAsDataURL(file);
    setFotoFile(file);
  };

  const uploadFoto = async (): Promise<string> => {
    // Foto sudah berupa base64 di form.image_url, tidak perlu upload
    return form.image_url || "";
  };

  const simpan = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setPesan(null);
    try {
      const imageUrl = await uploadFoto();
      const payload = {
        nama_produk: form.nama_produk,
        merek: form.merek,
        kategori: form.kategori,
        harga: Number(form.harga),
        modal: Number(form.modal),
        stok: Number(form.stok),
        terjual: Number(form.terjual),
        rating: Number(form.rating),
        emoji: form.emoji,
        image_url: imageUrl,
      };

      if (editId) {
        await supabase.from("produk").update(payload).eq("id", editId);
        setPesan({ teks: "✓ Produk berhasil diperbarui!", ok: true });
      } else {
        await supabase.from("produk").insert(payload);
        setPesan({ teks: "✓ Produk berhasil ditambahkan!", ok: true });
      }
      tutupForm();
      fetch();
    } catch (err: any) {
      setPesan({ teks: err.message || "Terjadi error.", ok: false });
    }
    setUploading(false);
  };

  const bukаEdit = (p: any) => {
    setForm({
      nama_produk: p.nama_produk, merek: p.merek || "", kategori: p.kategori,
      harga: p.harga, modal: p.modal || "", stok: p.stok, terjual: p.terjual || "0",
      rating: p.rating || "5.0", emoji: p.emoji || "📦", image_url: p.image_url || "",
    });
    setFotoPreview(p.image_url || "");
    setEditId(p.id);
    setShowForm(true);
  };

  const tutupForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm({ ...FORM_KOSONG });
    setFotoFile(null);
    setFotoPreview("");
  };

  const hapus = async (id: string, nama: string) => {
    if (!window.confirm(`Yakin hapus produk "${nama}"?`)) return;
    await supabase.from("produk").delete().eq("id", id);
    fetch();
  };

  const F = (label: string, key: keyof typeof FORM_KOSONG, type = "text", placeholder = "") => (
    <div>
      <label style={lblStyle}>{label}</label>
      <input type={type} value={form[key]} placeholder={placeholder} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={inputStyle} required />
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1E2A3D" }}>Daftar Produk</h2>
          <p style={{ margin: 0, fontSize: 12, color: "#5A6B7B" }}>{products.length} produk terdaftar</p>
        </div>
        <button onClick={() => { tutupForm(); setShowForm(true); }} style={{ background: "#1E2A3D", color: "white", border: "none", borderRadius: 10, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Times New Roman', Times, serif" }}>
          + Tambah Produk
        </button>
      </div>

      {/* Pesan Sukses / Error */}
      {pesan && (
        <div style={{ background: pesan.ok ? "#EAF3EE" : "#FDECEC", color: pesan.ok ? "#2D6A4F" : "#BC4749", padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          {pesan.teks}
        </div>
      )}

      {/* Modal Form Tambah/Edit */}
      {showForm && (
        <>
          <div onClick={tutupForm} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40 }} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "white", borderRadius: 18, padding: 24, width: "min(540px, 95vw)", maxHeight: "90vh", overflowY: "auto", zIndex: 50, fontFamily: "'Times New Roman', Times, serif", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#1E2A3D" }}>{editId ? "Edit Produk" : "Tambah Produk Baru"}</h3>
              <button onClick={tutupForm} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#666" }}>✕</button>
            </div>

            <form onSubmit={simpan} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Upload Foto */}
              <div>
                <label style={lblStyle}>Foto Produk</label>
                <label htmlFor="input-foto" style={{ display: "block", cursor: "pointer" }}>
                  <div style={{ width: "100%", height: 160, borderRadius: 12, border: "2px dashed #ECEAE3", display: "grid", placeItems: "center", background: "#FAFAF7", overflow: "hidden", position: "relative" }}>
                    {fotoPreview
                      ? <img src={fotoPreview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ textAlign: "center", color: "#b3a78f" }}>
                          <div style={{ fontSize: 32, marginBottom: 6 }}>📷</div>
                          <div style={{ fontSize: 12 }}>Klik untuk pilih foto dari HP/Komputer</div>
                        </div>
                    }
                  </div>
                </label>
                <input id="input-foto" type="file" accept="image/*" onChange={pilihFoto} style={{ display: "none" }} />
                {fotoPreview && <button type="button" onClick={() => { setFotoFile(null); setFotoPreview(""); setForm(f => ({...f, image_url: ""})); }} style={{ marginTop: 6, fontSize: 11, color: "#BC4749", background: "none", border: "none", cursor: "pointer" }}>✕ Hapus foto</button>}
              </div>

              {/* Grid 2 kolom */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {F("Nama Produk", "nama_produk", "text", "cth: Pulpen Gel 0.5mm")}
                {F("Merek", "merek", "text", "cth: Standard")}
                <div>
                  <label style={lblStyle}>Kategori</label>
                  <select value={form.kategori} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))} style={inputStyle}>
                    {KATEGORIS.map(k => <option key={k}>{k}</option>)}
                  </select>
                </div>
                {F("Emoji (opsional)", "emoji", "text", "📦")}
                {F("Harga Jual (Rp)", "harga", "number", "cth: 4500")}
                {F("Modal / HPP (Rp)", "modal", "number", "cth: 3000")}
                {F("Stok Awal", "stok", "number", "cth: 100")}
                {F("Rating (1-5)", "rating", "number", "cth: 4.8")}
              </div>

              {/* Tombol */}
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button type="button" onClick={tutupForm} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "1px solid #ECEAE3", background: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Times New Roman', Times, serif", color: "#666" }}>Batal</button>
                <button type="submit" disabled={uploading} style={{ flex: 2, padding: "12px 0", borderRadius: 10, background: uploading ? "#b3bcc8" : "#1E2A3D", color: "white", border: "none", fontSize: 13, fontWeight: 800, cursor: uploading ? "not-allowed" : "pointer", fontFamily: "'Times New Roman', Times, serif" }}>
                  {uploading ? "Menyimpan..." : (editId ? "Simpan Perubahan" : "Tambah Produk")}
                </button>
              </div>

              <p style={{ fontSize: 11, color: "#999", margin: 0 }}>
                💡 Foto disimpan langsung ke database. Pilih foto ukuran &lt;2MB untuk hasil terbaik (JPG/PNG/WebP).
              </p>
            </form>
          </div>
        </>
      )}

      {/* Tabel Produk */}
      {loading ? (
        <div style={{ color: "#7a6f5d", fontSize: 14 }}>Memuat produk...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#999" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
          <p>Belum ada produk. Klik "+ Tambah Produk" untuk mulai.</p>
        </div>
      ) : (
        <div className="table-responsive" style={{ background: "white", borderRadius: 14, border: "1px solid #ECEAE3", overflow: "hidden" }}>
          {/* Header tabel */}
          <div className="table-responsive-header" style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 0.8fr 0.8fr 1fr", padding: "12px 16px", background: "#1E2A3D", color: "white", fontSize: 11.5, fontWeight: 700, letterSpacing: 0.5 }}>
            <span>PRODUK</span><span>KATEGORI</span><span style={{ textAlign: "right" }}>HARGA</span><span style={{ textAlign: "center" }}>STOK</span><span style={{ textAlign: "center" }}>TERJUAL</span><span style={{ textAlign: "right" }}>AKSI</span>
          </div>
          {products.map((p, i) => (
            <div key={p.id} className="table-responsive-row" style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 0.8fr 0.8fr 1fr", padding: "10px 16px", fontSize: 13, background: i % 2 ? "#FBFAF6" : "white", alignItems: "center", borderBottom: "1px solid #f4f1ea" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
                {p.image_url
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={p.image_url} alt={p.nama_produk} style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                  : <div style={{ width: 36, height: 36, background: "#FAFAF7", borderRadius: 8, display: "grid", placeItems: "center", fontSize: 18, flexShrink: 0 }}>{p.emoji || "📦"}</div>
                }
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.nama_produk}</div>
                  <div style={{ fontSize: 10.5, color: "#888" }}>{p.merek || "Tanpa Merek"}</div>
                  {/* Info tambahan khusus mobile */}
                  <div className="show-on-mobile" style={{ fontSize: 11, color: "#5A6B7B", marginTop: 4 }}>
                    Kategori: <b>{p.kategori}</b> · Terjual: <b>{p.terjual || 0}</b>
                  </div>
                </div>
              </div>
              <span className="hide-on-mobile" style={{ color: "#5A6B7B" }}>{p.kategori}</span>
              
              {/* Harga */}
              <div className="flex-on-mobile" style={{ justifyContent: "space-between", width: "100%", fontSize: 12.5 }}>
                <span style={{ color: "#888" }}>Harga Jual:</span>
                <span style={{ fontWeight: 700, color: "#1E2A3D" }}>{RP(p.harga)}</span>
              </div>
              <span className="hide-on-mobile" style={{ textAlign: "right", fontWeight: 700, color: "#1E2A3D" }}>{RP(p.harga)}</span>
              
              {/* Stok */}
              <div className="flex-on-mobile" style={{ justifyContent: "space-between", width: "100%", fontSize: 12.5 }}>
                <span style={{ color: "#888" }}>Stok:</span>
                <span style={{ fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 999, background: (p.stok || 0) <= AMBANG ? "#FDECEC" : "#EAF3EE", color: (p.stok || 0) <= AMBANG ? "#BC4749" : "#2D6A4F" }}>{p.stok}</span>
              </div>
              <span className="hide-on-mobile" style={{ textAlign: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 999, background: (p.stok || 0) <= AMBANG ? "#FDECEC" : "#EAF3EE", color: (p.stok || 0) <= AMBANG ? "#BC4749" : "#2D6A4F" }}>{p.stok}</span>
              </span>
              
              <span className="hide-on-mobile" style={{ textAlign: "center", color: "#888" }}>{p.terjual || 0}x</span>
              
              {/* Aksi */}
              <div className="flex-on-mobile" style={{ gap: 14, justifyContent: "flex-end", width: "100%", borderTop: "1px dashed #eee", paddingTop: 8, marginTop: 4 }}>
                <button onClick={() => bukаEdit(p)} style={{ color: "#1E2A3D", fontSize: 12, fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "'Times New Roman', Times, serif" }}>Edit</button>
                <button onClick={() => hapus(p.id, p.nama_produk)} style={{ color: "#BC4749", fontSize: 12, fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "'Times New Roman', Times, serif" }}>Hapus</button>
              </div>
              <div className="hide-on-mobile" style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button onClick={() => bukаEdit(p)} style={{ color: "#1E2A3D", fontSize: 12, fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "'Times New Roman', Times, serif" }}>Edit</button>
                <button onClick={() => hapus(p.id, p.nama_produk)} style={{ color: "#BC4749", fontSize: 12, fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "'Times New Roman', Times, serif" }}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const lblStyle: React.CSSProperties = { fontSize: 12, fontWeight: 700, color: "#444", display: "block", marginBottom: 5 };
const inputStyle: React.CSSProperties = { width: "100%", padding: "9px 11px", borderRadius: 9, border: "1px solid #ECEAE3", fontSize: 13, outline: "none", fontFamily: "'Times New Roman', Times, serif", boxSizing: "border-box" };
