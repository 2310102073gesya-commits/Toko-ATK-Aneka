/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  nama_produk: string;
  kategori: string;
  merek?: string;
  harga: number;
  stok: number;
  terjual?: number;
  rating: number;
  image_url: string;
  emoji?: string;
}

const AMBANG = 10;
const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const cartItem = cartItems.find(i => i.id === product.id);
  const qty = cartItem?.kuantitas || 0;
  const habis = product.stok === 0;
  const laris = (product.terjual || 0) >= 150;

  return (
    <div style={{ background: "white", borderRadius: 12, border: "1px solid #ECEAE3", overflow: "hidden", display: "flex", flexDirection: "column", opacity: habis ? 0.6 : 1 }}>
      {/* Gambar / Emoji */}
      <div style={{ position: "relative", aspectRatio: "1", background: "#FAFAF7", display: "grid", placeItems: "center", borderBottom: "1px solid #ECEAE3" }}>
        {product.image_url ? (
          <img src={product.image_url} alt={product.nama_produk} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontSize: 40, opacity: 0.5 }}>{product.emoji || "📦"}</span>
        )}
        {/* Badge Terlaris */}
        {laris && (
          <span style={{ position: "absolute", top: 8, left: 8, background: "#C9A24B", color: "#1E2A3D", fontSize: 9.5, fontWeight: 800, padding: "3px 8px", borderRadius: 6 }}>TERLARIS</span>
        )}
        {/* Badge Sisa Stok */}
        {product.stok <= AMBANG && !habis && (
          <span style={{ position: "absolute", top: 8, right: 8, background: "#BC4749", color: "white", fontSize: 9.5, fontWeight: 800, padding: "3px 8px", borderRadius: 6 }}>Sisa {product.stok}</span>
        )}
        {/* Badge Habis */}
        {habis && (
          <span style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 800 }}>HABIS</span>
        )}
      </div>

      {/* Info Produk */}
      <div style={{ padding: 11, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 9.5, color: "#C9A24B", fontWeight: 700, letterSpacing: 0.5 }}>
          {(product.merek || product.kategori).toUpperCase()}
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#222", minHeight: 33, lineHeight: 1.3, marginTop: 1 }}>
          {product.nama_produk}
        </div>
        <div style={{ fontWeight: 800, color: "#1E2A3D", fontSize: 16, margin: "5px 0" }}>
          {RP(product.harga)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#5A6B7B", marginBottom: 10 }}>
          <span>⭐ {product.rating.toFixed(1)}</span>
          {product.terjual && <><span style={{ color: "#ccc" }}>|</span><span>{product.terjual} terjual</span></>}
        </div>

        {/* Tombol */}
        {habis ? (
          <button disabled style={{ marginTop: "auto", background: "#eee", color: "#aaa", border: "none", borderRadius: 9, padding: "9px 0", fontWeight: 700, fontSize: 13, fontFamily: "'Times New Roman', Times, serif", cursor: "not-allowed" }}>
            Habis
          </button>
        ) : qty === 0 ? (
          <button onClick={() => addToCart(product)} style={{ marginTop: "auto", background: "#1E2A3D", color: "white", border: "none", borderRadius: 9, padding: "9px 0", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Times New Roman', Times, serif" }}>
            + Keranjang
          </button>
        ) : (
          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#1E2A3D", borderRadius: 9, padding: 4 }}>
            <button onClick={() => updateQuantity(product.id, qty - 1)} style={{ background: "rgba(255,255,255,0.18)", border: "none", color: "white", width: 30, height: 30, borderRadius: 7, display: "grid", placeItems: "center", cursor: "pointer", fontSize: 16 }}>−</button>
            <span style={{ color: "white", fontWeight: 800, fontSize: 15 }}>{qty}</span>
            <button onClick={() => addToCart(product)} disabled={qty >= product.stok} style={{ background: "rgba(255,255,255,0.18)", border: "none", color: "white", width: 30, height: 30, borderRadius: 7, display: "grid", placeItems: "center", cursor: "pointer", fontSize: 16, opacity: qty >= product.stok ? 0.4 : 1 }}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}
