"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";

const KEUNGGULAN = [
  { emoji: "🚚", judul: "Antar Cepat",     ket: "Via kurir instan se-Balikpapan" },
  { emoji: "🛡️", judul: "Produk Original", ket: "Merek terpercaya & bergaransi"  },
  { emoji: "🏷️", judul: "Harga Bersaing",  ket: "Langsung dari toko, hemat"      },
];

export default function TokoPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedKat, setSelectedKat] = useState("Semua");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("produk")
        .select("*")
        .order("nama_produk", { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const kategoris = Array.from(new Set(products.map(p => p.kategori)));
  const filteredProducts = selectedKat === "Semua"
    ? products
    : products.filter(p => p.kategori === selectedKat);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'Times New Roman', Times, serif" }}>
      <Header />

      {/* Hero Banner */}
      <div style={{ background: "linear-gradient(135deg, #1E2A3D, #2A3A52)", padding: "22px 18px 24px", color: "white" }}>
        <div style={{ display: "inline-block", background: "rgba(201,162,75,0.2)", color: "#C9A24B", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, marginBottom: 10 }}>
          ★ Toko ATK Terlengkap di Balikpapan
        </div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, lineHeight: 1.2 }}>
          Semua kebutuhan tulis &amp; kantor,{" "}
          <span style={{ color: "#C9A24B" }}>satu toko.</span>
        </h1>
        <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
          Ratusan produk siap kirim. Pesan online, sampai ke rumah.
        </p>
      </div>

      {/* Strip 3 Keunggulan */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "#ECEAE3", borderBottom: "1px solid #ECEAE3" }}>
        {KEUNGGULAN.map(k => (
          <div key={k.judul} style={{ background: "white", padding: "12px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 20, marginBottom: 2 }}>{k.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1E2A3D" }}>{k.judul}</div>
            <div style={{ fontSize: 10, color: "#5A6B7B", marginTop: 1, lineHeight: 1.2 }}>{k.ket}</div>
          </div>
        ))}
      </div>

      <main style={{ padding: "18px 18px 100px" }}>
        {error && (
          <div style={{ background: "#FDECEC", color: "#BC4749", padding: 12, borderRadius: 10, marginBottom: 16, fontSize: 13, fontWeight: 600 }}>
            Gagal memuat produk: {error}
          </div>
        )}

        {/* Header Produk + Filter */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#1E2A3D" }}>
            {selectedKat === "Semua" ? "Semua Produk" : selectedKat}
          </h2>
          <span style={{ fontSize: 12, color: "#5A6B7B" }}>{filteredProducts.length} produk</span>
        </div>

        {/* Bar Kategori */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, scrollbarWidth: "none" }}>
          {["Semua", ...kategoris].map((kat) => {
            const aktif = selectedKat === kat;
            return (
              <button
                key={kat}
                onClick={() => setSelectedKat(kat)}
                style={{
                  whiteSpace: "nowrap",
                  padding: "7px 16px",
                  borderRadius: 999,
                  border: aktif ? "none" : "1px solid #ECEAE3",
                  background: aktif ? "#1E2A3D" : "white",
                  color: aktif ? "white" : "#1E2A3D",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Times New Roman', Times, serif"
                }}
              >
                {kat}
              </button>
            );
          })}
        </div>

        {/* Grid Produk */}
        {loading ? (
          <div style={{ color: "#7a6f5d", fontSize: 14, textAlign: "center", padding: "40px 0" }}>Memuat produk...</div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <h3 style={{ color: "#1E2A3D", fontWeight: 700 }}>Belum ada produk</h3>
            <p style={{ color: "#5A6B7B", fontSize: 13 }}>Tidak ada produk untuk kategori ini.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 12, marginTop: 12 }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <footer style={{ textAlign: "center", padding: 16, fontSize: 11, color: "#b3a78f", borderTop: "1px solid #ECEAE3" }}>
        © 2026 Toko Aneka · Balikpapan
      </footer>
    </div>
  );
}
