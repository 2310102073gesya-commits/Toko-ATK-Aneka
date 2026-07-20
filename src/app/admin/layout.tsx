"use client";

import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

const RP = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

const MENU = [
  {
    grup: "KASIR & TRANSAKSI",
    items: [
      { id: "pesanan",  label: "Pesanan Masuk",     path: "/admin/pesanan",  emoji: "🧾" },
      { id: "riwayat", label: "Riwayat Transaksi",  path: "/admin/riwayat",  emoji: "📖" },
    ],
  },
  {
    grup: "DASHBOARD & LAPORAN",
    items: [
      { id: "ringkasan",  label: "Ringkasan",          path: "/admin",            emoji: "📊" },
      { id: "labarugi",  label: "Laba Rugi",           path: "/admin/labarugi",   emoji: "📄" },
      { id: "penjualan", label: "Laporan Penjualan",   path: "/admin/penjualan",  emoji: "📈" },
      { id: "aruskas",   label: "Arus Kas",            path: "/admin/aruskas",    emoji: "💰" },
      { id: "pengeluaran", label: "Catat Pengeluaran", path: "/admin/pengeluaran", emoji: "💸" },
    ],
  },
  {
    grup: "INVENTORY & STOK",
    items: [
      { id: "stok", label: "Stok & Restock", path: "/admin/stok", emoji: "📦" },
    ],
  },
  {
    grup: "DATA MASTER",
    items: [
      { id: "produk", label: "Daftar Produk", path: "/admin/produk", emoji: "🗃️" },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const cekUkuran = () => {
      setIsMobile(window.innerWidth < 992);
    };
    cekUkuran();
    window.addEventListener("resize", cekUkuran);
    return () => window.removeEventListener("resize", cekUkuran);
  }, []);

  // Tutup sidebar otomatis jika berpindah halaman di mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const allItems = MENU.flatMap(g => g.items);
  const activeItem = allItems.find(i => i.path === pathname) || allItems.find(i => pathname.startsWith(i.path) && i.path !== "/admin") || allItems[2];

  return (
    <AdminGuard>
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Times New Roman', Times, serif", position: "relative" }}>

        {/* Backdrop overlay di mobile */}
        {isMobile && isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 90 }}
          />
        )}

        {/* ===== SIDEBAR ===== */}
        <aside style={{
          width: 230,
          background: "#1E2A3D",
          color: "white",
          flexShrink: 0,
          position: isMobile ? "fixed" : "sticky",
          left: isMobile ? (isSidebarOpen ? 0 : -230) : 0,
          top: 0,
          bottom: 0,
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
          transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isMobile && isSidebarOpen ? "4px 0 24px rgba(0,0,0,0.25)" : "none"
        }}>

          {/* Logo + Badge */}
          <div style={{ padding: "18px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 2 }}>
              <span style={{ width: 16, height: 1, background: "rgba(255,255,255,0.45)" }} />
              <span style={{ color: "#C9A24B", fontSize: 8 }}>▶</span>
              <span style={{ width: 16, height: 1, background: "rgba(255,255,255,0.45)" }} />
            </div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 16, letterSpacing: 2.5 }}>ANEKA</div>
            <div style={{ color: "#C9A24B", fontSize: 6.5, letterSpacing: 2, marginTop: 1 }}>ALAT TULIS KANTOR · BALIKPAPAN</div>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <span style={{ fontSize: 9, letterSpacing: 1, background: "#C9A24B", color: "#1E2A3D", padding: "3px 12px", borderRadius: 999, fontWeight: 800 }}>OWNER MODE</span>
            </div>
          </div>

          {/* Navigasi */}
          <nav style={{ flex: 1, padding: "12px 10px" }}>
            {MENU.map(g => (
              <div key={g.grup} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 9.5, letterSpacing: 1, color: "rgba(255,255,255,0.4)", fontWeight: 700, padding: "0 8px 6px" }}>
                  {g.grup}
                </div>
                {g.items.map(it => {
                  const aktif = pathname === it.path;
                  return (
                    <Link key={it.id} href={it.path} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, background: aktif ? "#C9A24B" : "transparent", color: aktif ? "#1E2A3D" : "rgba(255,255,255,0.85)", fontWeight: aktif ? 700 : 500, fontSize: 13, textDecoration: "none", marginBottom: 2 }}>
                      <span style={{ fontSize: 14 }}>{it.emoji}</span> {it.label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Footer Sidebar */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 6, cursor: "pointer", background: "none", border: "none", fontFamily: "'Times New Roman', Times, serif" }}>
              ← Keluar
            </button>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>v1.0 · Toko Aneka</div>
          </div>
        </aside>

        {/* ===== KONTEN KANAN ===== */}
        <main style={{ flex: 1, minWidth: 0, background: "#FAFAF7", display: "flex", flexDirection: "column", paddingLeft: isMobile ? 0 : 0 }}>

          {/* Top Header */}
          <div style={{ background: "white", borderBottom: "1px solid #ECEAE3", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#1E2A3D", padding: "4px 8px", marginLeft: -8, display: "flex", alignItems: "center" }}
              >
                ☰
              </button>
            )}
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: 0, fontSize: 18, color: "#1E2A3D", fontWeight: 800 }}>{activeItem?.label}</h1>
              <div style={{ fontSize: 11.5, color: "#5A6B7B" }}>Toko Aneka — Balikpapan</div>
            </div>
          </div>

          <div style={{ padding: isMobile ? 12 : 20, flex: 1 }}>
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
