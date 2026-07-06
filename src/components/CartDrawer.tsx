"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 30 }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="animate-slide-in" style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "min(440px, 100%)", background: "#FAFAF7", zIndex: 31, display: "flex", flexDirection: "column", boxShadow: "-4px 0 24px rgba(0,0,0,0.15)", fontFamily: "'Times New Roman', Times, serif" }}>

        {/* Header Drawer */}
        <div style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #ECEAE3" }}>
          <h2 style={{ margin: 0, fontSize: 18, color: "#1E2A3D", flex: 1 }}>Keranjang</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#666", fontSize: 22, lineHeight: 1 }}>✕</button>
        </div>

        {/* Isi Keranjang */}
        <div style={{ flex: 1, overflowY: "auto", padding: 18 }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 60, color: "#b3a78f" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🛒</div>
              <p style={{ fontSize: 14 }}>Keranjang masih kosong.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 12, background: "white", borderRadius: 12, padding: 10, border: "1px solid #ECEAE3", alignItems: "center" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <div style={{ fontSize: 28, background: "#FAFAF7", borderRadius: 9, width: 48, height: 48, display: "grid", placeItems: "center", flexShrink: 0 }}>
                    {item.image_url
                      ? <img src={item.image_url} alt={item.nama_produk} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 9 }} />
                      : "📦"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>{item.nama_produk}</div>
                    <div style={{ fontSize: 13, color: "#1E2A3D", fontWeight: 800 }}>{RP(item.harga)}</div>
                  </div>
                  {/* Qty Control */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#FAFAF7", borderRadius: 8, padding: 3 }}>
                    <button onClick={() => updateQuantity(item.id, item.kuantitas - 1)} style={{ background: "white", border: "1px solid #ECEAE3", color: "#1E2A3D", width: 28, height: 28, borderRadius: 6, display: "grid", placeItems: "center", cursor: "pointer", fontFamily: "'Times New Roman', Times, serif" }}>−</button>
                    <span style={{ fontWeight: 700, fontSize: 14, minWidth: 18, textAlign: "center" }}>{item.kuantitas}</span>
                    <button onClick={() => updateQuantity(item.id, item.kuantitas + 1)} style={{ background: "white", border: "1px solid #ECEAE3", color: "#1E2A3D", width: 28, height: 28, borderRadius: 6, display: "grid", placeItems: "center", cursor: "pointer", fontFamily: "'Times New Roman', Times, serif" }}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#BC4749", fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: "'Times New Roman', Times, serif" }}>Hapus</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Drawer */}
        {cartItems.length > 0 && (
          <div style={{ padding: 18, borderTop: "1px solid #ECEAE3", background: "white" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ color: "#666", fontSize: 14 }}>Subtotal</span>
              <span style={{ fontWeight: 800, fontSize: 20, color: "#1E2A3D" }}>{RP(cartTotal)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              style={{ display: "block", width: "100%", background: "#1E2A3D", color: "white", border: "none", borderRadius: 12, padding: "14px 0", fontWeight: 800, fontSize: 15, textAlign: "center", textDecoration: "none", fontFamily: "'Times New Roman', Times, serif" }}
            >
              Lanjut ke Pembayaran →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
