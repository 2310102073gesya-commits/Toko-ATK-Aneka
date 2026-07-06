"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GoogleIcon = () => (
  <svg width={18} height={18} viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"pilih" | "email" | "register">("pilih");
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/admin` },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (mode === "register") {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) setError(signUpError.message);
      else {
        alert("Pendaftaran berhasil! Silakan cek email untuk verifikasi.");
        setMode("email");
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) setError("Email atau Password salah!");
      else router.push("/admin");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#F4ECDF", padding: 24, fontFamily: "'Times New Roman', Times, serif" }}>
      <div style={{ backgroundColor: "white", borderRadius: 18, border: "1px solid #E3D6BF", padding: "32px 26px", width: "100%", maxWidth: 370, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>

        {/* Logo */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 2 }}>
            <span style={{ width: 16, height: 1, backgroundColor: "rgba(30,42,61,0.3)" }} />
            <span style={{ color: "#C9A24B", fontSize: 8 }}>▶</span>
            <span style={{ width: 16, height: 1, backgroundColor: "rgba(30,42,61,0.3)" }} />
          </div>
          <div style={{ color: "#1E2A3D", fontWeight: 700, fontSize: 16, letterSpacing: 2.5 }}>ANEKA</div>
          <div style={{ color: "#5A6B7B", fontSize: 6.5, letterSpacing: 2, marginTop: 1 }}>ALAT TULIS KANTOR</div>
        </div>

        {/* Badge */}
        <div style={{ display: "inline-block", backgroundColor: "#F0E6D2", color: "#1E2A3D", fontSize: 10.5, fontWeight: 700, letterSpacing: 1, padding: "4px 12px", borderRadius: 999, marginBottom: 16 }}>
          AREA OWNER
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: "#FDECEC", color: "#BC4749", padding: 12, borderRadius: 8, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>
            {error}
          </div>
        )}

        {/* Mode: Pilih Metode */}
        {mode === "pilih" && (
          <>
            <h1 style={{ margin: "0 0 6px", fontSize: 20, color: "#1E2A3D", fontWeight: 700 }}>Masuk Dashboard</h1>
            <p style={{ margin: "0 0 22px", fontSize: 13, color: "#7a6f5d", lineHeight: 1.5 }}>
              Halaman ini khusus pemilik toko. Pelanggan tidak bisa mengakses laporan & stok.
            </p>

            {/* Tombol Google */}
            <button onClick={handleGoogleLogin} disabled={loading} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "white", border: "1px solid #dadce0", borderRadius: 10, padding: "12px 0", fontSize: 14, fontWeight: 600, color: "#3c4043", cursor: "pointer", fontFamily: "'Times New Roman', Times, serif", marginBottom: 12 }}>
              <GoogleIcon /> {loading ? "Memproses..." : "Masuk dengan Google"}
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "12px 0" }}>
              <span style={{ flex: 1, height: 1, background: "#ECEAE3" }} />
              <span style={{ fontSize: 11, color: "#b3a78f" }}>atau</span>
              <span style={{ flex: 1, height: 1, background: "#ECEAE3" }} />
            </div>

            {/* Tombol Email */}
            <button onClick={() => setMode("email")} style={{ width: "100%", background: "#1E2A3D", color: "white", border: "none", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Times New Roman', Times, serif" }}>
              Masuk dengan Email & Password
            </button>
          </>
        )}

        {/* Mode: Email Login / Register */}
        {(mode === "email" || mode === "register") && (
          <>
            <h1 style={{ margin: "0 0 6px", fontSize: 18, color: "#1E2A3D", fontWeight: 700 }}>
              {mode === "register" ? "Daftar Akun Admin" : "Masuk dengan Email"}
            </h1>
            <p style={{ margin: "0 0 18px", fontSize: 12.5, color: "#7a6f5d" }}>
              untuk lanjut ke Dashboard Toko Aneka
            </p>

            <form onSubmit={handleEmailAuth} style={{ textAlign: "left" }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 }}>Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1px solid #ECEAE3", background: "white", fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "'Times New Roman', Times, serif" }} placeholder="owner@tokoaneka.com" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 }}>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 10, border: "1px solid #ECEAE3", background: "white", fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "'Times New Roman', Times, serif" }} placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading} style={{ width: "100%", background: "#1E2A3D", color: "white", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Times New Roman', Times, serif" }}>
                {loading ? "Memproses..." : (mode === "register" ? "Daftar Sekarang" : "Masuk")}
              </button>
            </form>

            <div style={{ marginTop: 14 }}>
              <button onClick={() => setMode(mode === "register" ? "email" : "register")} style={{ color: "#1E2A3D", textDecoration: "underline", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: 12, fontFamily: "'Times New Roman', Times, serif" }}>
                {mode === "register" ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar"}
              </button>
            </div>

            <div style={{ marginTop: 8 }}>
              <button onClick={() => setMode("pilih")} style={{ color: "#b3a78f", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontFamily: "'Times New Roman', Times, serif" }}>
                ← Kembali
              </button>
            </div>
          </>
        )}

        {/* Footer */}
        <div style={{ marginTop: 18 }}>
          <Link href="/" style={{ color: "#7a6f5d", fontSize: 12.5, textDecoration: "none" }}>
            ← Kembali ke beranda
          </Link>
        </div>

      </div>
    </div>
  );
}
