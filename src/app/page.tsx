import Link from "next/link";

const KONTAK = {
  waAdmin: "6282189333923",
  waText:  "Halo Toko Aneka, saya mau tanya produk",
  lokasiMaps: "https://maps.app.goo.gl/vHzg9sQb8Ywh5WeR8?g_st=ic",
  instagram:  "https://www.instagram.com/tokoatkaneka_bpp?igsh=MXNobTQwcXZkOXZwbg==",
};

// SVG Icons
const IcoExt   = () => <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const IcoWa    = () => <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>;
const IcoStore = () => <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l1-5h16l1 5"/><path d="M4 9v11h16V9"/><path d="M9 22V12h6v10"/></svg>;
const IcoPin   = () => <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoIg    = () => <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>;

export default function LandingPage() {
  const waLink = `https://wa.me/${KONTAK.waAdmin}?text=${encodeURIComponent(KONTAK.waText)}`;

  const TAUTAN = [
    {
      icon: <IcoWa />,
      label: "WA Admin",
      sub: "Fast Respon",
      href: waLink,
      utama: true,
    },
    {
      icon: <IcoStore />,
      label: "Kunjungi Toko Online",
      sub: "Belanja & checkout langsung",
      href: "/toko",
      utama: true,
    },
    {
      icon: <IcoPin />,
      label: "Lokasi Store",
      sub: "Buka di Google Maps",
      href: KONTAK.lokasiMaps,
      utama: false,
    },
    {
      icon: <IcoIg />,
      label: "Instagram",
      sub: "@tokoatkaneka_bpp",
      href: KONTAK.instagram,
      utama: false,
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F4ECDF",
      fontFamily: "'Times New Roman', Times, serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "50px 20px 30px",
    }}>

      {/* Logo Aneka */}
      <div style={{ marginBottom: 6, textAlign: "center", userSelect: "none" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 2 }}>
          <span style={{ width: 30, height: 1, background: "rgba(30,42,61,0.3)" }} />
          <span style={{ color: "#C9A24B", fontSize: 11 }}>▶</span>
          <span style={{ width: 30, height: 1, background: "rgba(30,42,61,0.3)" }} />
        </div>
        <div style={{ color: "#1E2A3D", fontWeight: 700, fontSize: 30, letterSpacing: 7, paddingLeft: 7 }}>
          ANEKA
        </div>
        <div style={{ color: "#5A6B7B", fontSize: 9.5, letterSpacing: 2, marginTop: 4 }}>
          ALAT TULIS KANTOR
        </div>
        <div style={{ color: "rgba(30,42,61,0.4)", fontSize: 8, letterSpacing: 2, marginTop: 1 }}>
          BALIKPAPAN
        </div>
      </div>

      {/* Deskripsi */}
      <p style={{
        color: "#7a6f5d", fontSize: 13, margin: "18px 0 28px",
        textAlign: "center", maxWidth: 330, lineHeight: 1.5,
      }}>
        Pusat alat tulis &amp; perlengkapan kantor terlengkap di Balikpapan.
        Produk original, harga bersaing, kirim cepat sampai tujuan.
      </p>

      {/* Daftar Tautan */}
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 12 }}>
        {TAUTAN.map((t, i) => {
          const cardStyle: React.CSSProperties = {
            display: "flex", alignItems: "center", gap: 14,
            width: "100%", background: "white",
            border: `1px solid ${t.utama ? "#C9A24B" : "#E3D6BF"}`,
            borderRadius: 14, padding: "12px 16px",
            cursor: "pointer", textDecoration: "none",
            boxSizing: "border-box", fontFamily: "'Times New Roman', Times, serif",
          };

          const isi = (
            <>
              <span style={{
                display: "grid", placeItems: "center",
                width: 44, height: 44, borderRadius: "50%",
                background: t.utama ? "#C9A24B" : "white",
                color: t.utama ? "white" : "#1E2A3D",
                flexShrink: 0,
                border: t.utama ? "none" : "1px solid #E3D6BF",
              }}>
                {t.icon}
              </span>
              <span style={{ flex: 1, textAlign: "left" }}>
                <span style={{ display: "block", color: "#1E2A3D", fontWeight: 700, fontSize: 15 }}>{t.label}</span>
                <span style={{ display: "block", color: "#7a6f5d", fontSize: 12 }}>{t.sub}</span>
              </span>
              <span style={{ color: "#b3a78f" }}><IcoExt /></span>
            </>
          );

          // Internal link → pakai Link. External link → pakai <a>
          if (t.href.startsWith("/")) {
            return (
              <Link key={i} href={t.href} style={cardStyle}>
                {isi}
              </Link>
            );
          }
          return (
            <a key={i} href={t.href} target="_blank" rel="noreferrer" style={cardStyle}>
              {isi}
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <p style={{ color: "#b3a78f", fontSize: 11, marginTop: 34 }}>
        © 2026 Toko Aneka · Balikpapan
      </p>
    </div>
  );
}
