"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

// Logo Aneka persis referensi
function LogoAneka({ kecil = false }: { kecil?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 2 }}>
        <span style={{ width: kecil ? 16 : 30, height: 1, background: "rgba(255,255,255,0.45)" }} />
        <span style={{ color: "#C9A24B", fontSize: kecil ? 8 : 11 }}>▶</span>
        <span style={{ width: kecil ? 16 : 30, height: 1, background: "rgba(255,255,255,0.45)" }} />
      </div>
      <div style={{ color: "white", fontWeight: 700, fontSize: kecil ? 16 : 26, letterSpacing: kecil ? 2.5 : 7, paddingLeft: kecil ? 2.5 : 7 }}>
        ANEKA
      </div>
      <div style={{ color: "#C9A24B", fontSize: kecil ? 6.5 : 9.5, letterSpacing: 2, marginTop: kecil ? 1 : 4 }}>
        ALAT TULIS KANTOR
      </div>
    </div>
  );
}

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header style={{ background: "#1E2A3D", padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40 }}>
      <Link href="/toko" style={{ textDecoration: "none" }}>
        <LogoAneka kecil />
      </Link>

      <button
        onClick={() => setIsCartOpen(true)}
        style={{ position: "relative", background: "#C9A24B", border: "none", color: "#1E2A3D", padding: "9px 14px", borderRadius: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, fontSize: 18, fontFamily: "'Times New Roman', Times, serif" }}
        aria-label="Keranjang"
      >
        🛒
        {cartCount > 0 && (
          <span style={{ position: "absolute", top: -7, right: -7, background: "#BC4749", color: "white", borderRadius: 999, fontSize: 11, fontWeight: 800, minWidth: 20, height: 20, display: "grid", placeItems: "center", padding: "0 5px" }}>
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}
