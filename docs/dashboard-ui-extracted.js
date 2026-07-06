const {
  useState,
  useMemo,
  useEffect,
  useRef
} = React;

// ====== ikon sederhana (SVG inline pengganti lucide) ======
const Ico = ({
  d,
  s = 18,
  f = "none",
  sw = 2,
  c = "currentColor",
  fill
}) => /*#__PURE__*/React.createElement("svg", {
  width: s,
  height: s,
  viewBox: "0 0 24 24",
  fill: fill || "none",
  stroke: c,
  strokeWidth: sw,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, d);
const I = {
  cart: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "21",
      r: "1"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "20",
      cy: "21",
      r: "1"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
    }))
  }),
  plus: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "5",
      x2: "12",
      y2: "19"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    })),
    s: 15
  }),
  minus: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    }),
    s: 15
  }),
  x: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "18",
      y1: "6",
      x2: "6",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "6",
      x2: "18",
      y2: "18"
    })),
    s: 22
  }),
  search: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "21",
      x2: "16.65",
      y2: "16.65"
    })),
    s: 18
  }),
  check: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement("polyline", {
      points: "20 6 9 17 4 12"
    })
  }),
  pin: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    })),
    s: 16
  }),
  store: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 9l1-5h16l1 5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 9v11h16V9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 22V12h6v10"
    })),
    s: 15
  }),
  dash: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "9"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "5"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "12",
      width: "7",
      height: "9"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "16",
      width: "7",
      height: "5"
    })),
    s: 15
  }),
  back: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "19",
      y1: "12",
      x2: "5",
      y2: "12"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 19 5 12 12 5"
    })),
    s: 14
  }),
  star: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    }),
    s: 11,
    fill: "#C9A24B",
    c: "#C9A24B"
  }),
  wa: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
    }),
    s: 22
  }),
  ig: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "2",
      y: "2",
      width: "20",
      height: "20",
      rx: "5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "17.5",
      y1: "6.5",
      x2: "17.5",
      y2: "6.5"
    })),
    s: 22
  }),
  ext: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "15 3 21 3 21 9"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "10",
      y1: "14",
      x2: "21",
      y2: "3"
    })),
    s: 16
  }),
  logout: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "16 17 21 12 16 7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "12",
      x2: "9",
      y2: "12"
    })),
    s: 15
  }),
  menu: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "12",
      x2: "21",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "6",
      x2: "21",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "18",
      x2: "21",
      y2: "18"
    })),
    s: 22
  }),
  trUp: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
      points: "23 6 13.5 15.5 8.5 10.5 1 18"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "17 6 23 6 23 12"
    }))
  }),
  trDown: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
      points: "23 18 13.5 8.5 8.5 13.5 1 6"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "17 18 23 18 23 12"
    }))
  }),
  alert: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "9",
      x2: "12",
      y2: "13"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "17",
      x2: "12",
      y2: "17"
    }))
  }),
  box: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
    }))
  }),
  money: /*#__PURE__*/React.createElement(Ico, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "1",
      x2: "12",
      y2: "23"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
    }))
  })
};
const KONTAK = {
  waAdmin: "6281234567890",
  waText: "Halo Toko Aneka, saya mau tanya produk",
  lokasiMaps: "https://maps.google.com/?q=Toko+Aneka+Balikpapan",
  instagram: "https://instagram.com/"
};
const EMAIL_OWNER = ["yaww@gmail.com"];
const C = {
  bg: "#FAFAF7",
  navy: "#1E2A3D",
  navyDark: "#161F2E",
  gold: "#C9A24B",
  goldSoft: "#E7D4A3",
  teks: "#1E2A3D",
  teks2: "#5A6B7B",
  border: "#ECEAE3",
  merah: "#BC4749",
  hijau: "#2D6A4F",
  merahBg: "#FDECEC",
  krem: "#F4ECDF",
  kremGaris: "#E3D6BF",
  kremSub: "#7a6f5d"
};
const SERIF = "'Times New Roman', Times, serif";
const RP = n => "Rp" + Math.round(n).toLocaleString("id-ID");
const AMBANG = 10;
const PRODUK_AWAL = [{
  id: 1,
  nama: "Pulpen Gel Standard 0.5",
  merek: "Standard",
  kategori: "Alat Tulis",
  harga: 4500,
  modal: 3000,
  stok: 120,
  terjual: 340,
  rating: 4.9,
  emoji: "🖊️"
}, {
  id: 2,
  nama: "Pensil 2B Faber-Castell (12)",
  merek: "Faber-Castell",
  kategori: "Alat Tulis",
  harga: 18000,
  modal: 12500,
  stok: 80,
  terjual: 95,
  rating: 4.8,
  emoji: "✏️"
}, {
  id: 3,
  nama: "Buku Tulis Sinar Dunia 38",
  merek: "Sinar Dunia",
  kategori: "Buku",
  harga: 3500,
  modal: 2400,
  stok: 8,
  terjual: 520,
  rating: 5.0,
  emoji: "📓"
}, {
  id: 4,
  nama: "Buku Gambar A4 Kiky",
  merek: "Kiky",
  kategori: "Buku",
  harga: 6000,
  modal: 4200,
  stok: 60,
  terjual: 78,
  rating: 4.7,
  emoji: "📔"
}, {
  id: 5,
  nama: "Penghapus Joyko Putih",
  merek: "Joyko",
  kategori: "Alat Tulis",
  harga: 2000,
  modal: 1200,
  stok: 150,
  terjual: 210,
  rating: 4.8,
  emoji: "🧼"
}, {
  id: 6,
  nama: "Penggaris 30cm Butterfly",
  merek: "Butterfly",
  kategori: "Alat Tulis",
  harga: 5000,
  modal: 3300,
  stok: 90,
  terjual: 64,
  rating: 4.6,
  emoji: "📏"
}, {
  id: 7,
  nama: "Spidol Snowman Whiteboard",
  merek: "Snowman",
  kategori: "Alat Tulis",
  harga: 8500,
  modal: 5500,
  stok: 6,
  terjual: 130,
  rating: 4.9,
  emoji: "🖍️"
}, {
  id: 8,
  nama: "Map Plastik Folder Bantex",
  merek: "Bantex",
  kategori: "Kantor",
  harga: 3000,
  modal: 1800,
  stok: 110,
  terjual: 88,
  rating: 4.7,
  emoji: "📁"
}, {
  id: 9,
  nama: "Stapler Joyko + Isi",
  merek: "Joyko",
  kategori: "Kantor",
  harga: 22000,
  modal: 16000,
  stok: 30,
  terjual: 42,
  rating: 4.8,
  emoji: "📎"
}, {
  id: 10,
  nama: "Lakban Bening Daimaru",
  merek: "Daimaru",
  kategori: "Kantor",
  harga: 12000,
  modal: 8000,
  stok: 5,
  terjual: 155,
  rating: 4.9,
  emoji: "📦"
}, {
  id: 11,
  nama: "Sticky Notes Joyko Warna",
  merek: "Joyko",
  kategori: "Kantor",
  harga: 9000,
  modal: 6000,
  stok: 70,
  terjual: 112,
  rating: 4.8,
  emoji: "🗒️"
}, {
  id: 12,
  nama: "Tip-Ex Kenko Kertas",
  merek: "Kenko",
  kategori: "Alat Tulis",
  harga: 7000,
  modal: 4500,
  stok: 65,
  terjual: 71,
  rating: 4.6,
  emoji: "⬜"
}];
const BEBAN = [{
  nama: "Sewa Lapak / Toko",
  jumlah: 500000
}, {
  nama: "Listrik & Wi-Fi",
  jumlah: 250000
}, {
  nama: "Gaji Staff",
  jumlah: 1000000
}];
const KATEGORI_IKON = [{
  nama: "Alat Tulis",
  emoji: "✏️",
  ket: "Pulpen, pensil, dll"
}, {
  nama: "Buku",
  emoji: "📓",
  ket: "Tulis & gambar"
}, {
  nama: "Kantor",
  emoji: "💼",
  ket: "Map, stapler, dll"
}];
const KEUNGGULAN = [{
  emoji: "🚚",
  judul: "Antar Cepat",
  ket: "Via kurir instan se-Balikpapan"
}, {
  emoji: "🛡️",
  judul: "Produk Original",
  ket: "Merek terpercaya & bergaransi"
}, {
  emoji: "🏷️",
  judul: "Harga Bersaing",
  ket: "Langsung dari toko, hemat"
}];
const KURIR = [{
  id: "gojek",
  nama: "GoSend Instant",
  emoji: "🛵",
  est: "30–60 menit",
  ongkir: 12000
}, {
  id: "maxim",
  nama: "Maxim Kirim",
  emoji: "🏍️",
  est: "40–70 menit",
  ongkir: 9000
}, {
  id: "grab",
  nama: "GrabExpress",
  emoji: "🟢",
  est: "30–60 menit",
  ongkir: 13000
}, {
  id: "jne",
  nama: "JNE Reguler",
  emoji: "📦",
  est: "2–3 hari",
  ongkir: 18000
}];
const BAYAR = [{
  id: "qris",
  nama: "QRIS",
  emoji: "🔳",
  ket: "Scan pakai bank/e-wallet apa aja"
}, {
  id: "gopay",
  nama: "GoPay",
  emoji: "🟢",
  ket: "Bayar dari saldo GoPay"
}, {
  id: "shopeepay",
  nama: "ShopeePay",
  emoji: "🟠",
  ket: "Bayar dari saldo ShopeePay"
}, {
  id: "transfer",
  nama: "Transfer Bank",
  emoji: "🏦",
  ket: "BCA / Mandiri / BRI"
}];
function LogoAneka({
  kecil,
  warnaTeks = "white"
}) {
  const garis = warnaTeks === "white" ? "rgba(255,255,255,0.45)" : "rgba(30,42,61,0.3)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: kecil ? 16 : 30,
      height: 1,
      background: garis
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.gold,
      fontSize: kecil ? 8 : 11
    }
  }, "\u25B6"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: kecil ? 16 : 30,
      height: 1,
      background: garis
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      color: warnaTeks,
      fontWeight: 700,
      fontSize: kecil ? 16 : 30,
      letterSpacing: kecil ? 2.5 : 7,
      fontFamily: SERIF,
      paddingLeft: kecil ? 2.5 : 7
    }
  }, "ANEKA"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: warnaTeks === "white" ? C.gold : C.teks2,
      fontSize: kecil ? 6.5 : 9.5,
      letterSpacing: 2,
      marginTop: kecil ? 1 : 4
    }
  }, "ALAT TULIS KANTOR"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: warnaTeks === "white" ? "rgba(255,255,255,0.5)" : "#aaa",
      fontSize: kecil ? 5.5 : 8,
      letterSpacing: 2,
      marginTop: 1
    }
  }, "BALIKPAPAN"));
}
const GoogleIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 48 48"
}, /*#__PURE__*/React.createElement("path", {
  fill: "#EA4335",
  d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#4285F4",
  d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#FBBC05",
  d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#34A853",
  d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
}));
function App() {
  const [halaman, setHalaman] = useState("landing");
  const [produk, setProduk] = useState(PRODUK_AWAL);
  const [pesananMasuk, setPesananMasuk] = useState([]);
  const [ownerLogin, setOwnerLogin] = useState(false);
  const mintaOwner = () => setHalaman("owner");
  if (halaman === "landing") return /*#__PURE__*/React.createElement(Landing, {
    masukToko: () => setHalaman("toko"),
    masukOwner: mintaOwner
  });
  if (halaman === "owner" && !ownerLogin) return /*#__PURE__*/React.createElement(LoginOwner, {
    onLogin: () => setOwnerLogin(true),
    kembali: () => setHalaman("landing")
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: C.bg,
      fontFamily: SERIF
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 14px",
      background: C.navyDark,
      position: "sticky",
      top: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setHalaman("landing"),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      background: "rgba(255,255,255,0.08)",
      border: "none",
      color: "rgba(255,255,255,0.8)",
      padding: "7px 12px",
      borderRadius: 8,
      cursor: "pointer",
      fontSize: 12.5,
      fontWeight: 600,
      fontFamily: SERIF
    }
  }, I.back, " Beranda"), halaman === "owner" && ownerLogin && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: C.gold,
      fontSize: 12.5,
      fontWeight: 700
    }
  }, I.dash, " Mode Owner")), halaman === "toko" ? /*#__PURE__*/React.createElement(Pelanggan, {
    produk: produk,
    setProduk: setProduk,
    tambahPesanan: o => setPesananMasuk(p => [o, ...p])
  }) : /*#__PURE__*/React.createElement(Owner, {
    produk: produk,
    setProduk: setProduk,
    pesananMasuk: pesananMasuk,
    keluar: () => {
      setOwnerLogin(false);
      setHalaman("landing");
    }
  }));
}
function LoginOwner({
  onLogin,
  kembali
}) {
  const [fase, setFase] = useState("mulai");
  const [emailDitolak, setEmailDitolak] = useState("");
  const akun = [{
    email: EMAIL_OWNER[0],
    nama: "Pemilik Toko Aneka",
    owner: true
  }, {
    email: "pelanggan88@gmail.com",
    nama: "Budi Pelanggan",
    owner: false
  }];
  const pilih = a => {
    setFase("proses");
    setTimeout(() => {
      if (EMAIL_OWNER.includes(a.email)) onLogin();else {
        setEmailDitolak(a.email);
        setFase("ditolak");
      }
    }, 800);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: C.krem,
      fontFamily: SERIF,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 18,
      border: `1px solid ${C.kremGaris}`,
      padding: "32px 26px",
      width: "100%",
      maxWidth: 370,
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(LogoAneka, {
    warnaTeks: C.navy,
    kecil: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      background: "#F0E6D2",
      color: C.navy,
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: 1,
      padding: "4px 12px",
      borderRadius: 999,
      marginBottom: 16
    }
  }, "AREA OWNER"), fase === "mulai" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 6px",
      fontSize: 20,
      color: C.navy,
      fontWeight: 700
    }
  }, "Masuk Dashboard"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 22px",
      fontSize: 13,
      color: C.kremSub,
      lineHeight: 1.5
    }
  }, "Halaman ini khusus pemilik toko. Pelanggan tidak bisa mengakses laporan & stok."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFase("pilih"),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      background: "white",
      border: "1px solid #dadce0",
      borderRadius: 10,
      padding: "12px 0",
      fontSize: 14,
      fontWeight: 600,
      color: "#3c4043",
      cursor: "pointer",
      fontFamily: SERIF
    }
  }, /*#__PURE__*/React.createElement(GoogleIcon, null), " Masuk dengan Google")), fase === "pilih" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 4px",
      fontSize: 18,
      color: C.navy,
      fontWeight: 700
    }
  }, "Pilih akun"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 18px",
      fontSize: 12.5,
      color: C.kremSub
    }
  }, "untuk lanjut ke Dashboard Toko Aneka"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      textAlign: "left"
    }
  }, akun.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.email,
    onClick: () => pilih(a),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "white",
      border: "none",
      borderBottom: "1px solid #f0f0f0",
      padding: "12px 6px",
      cursor: "pointer",
      fontFamily: SERIF
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      background: a.owner ? C.gold : "#8ab4f8",
      color: "white",
      display: "grid",
      placeItems: "center",
      fontWeight: 700,
      fontSize: 15
    }
  }, a.nama[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13.5,
      color: "#202124",
      fontWeight: 600
    }
  }, a.nama), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 12,
      color: "#5f6368"
    }
  }, a.email))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "#b3a78f",
      marginTop: 16,
      textAlign: "left",
      lineHeight: 1.4
    }
  }, "\uD83D\uDCA1 Coba dua-duanya: akun owner \u2192 masuk, akun pelanggan \u2192 ditolak.")), fase === "proses" && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      border: `3px solid ${C.kremGaris}`,
      borderTopColor: C.gold,
      borderRadius: "50%",
      margin: "0 auto 14px",
      animation: "putar 0.8s linear infinite"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: C.kremSub
    }
  }, "Memverifikasi akun\u2026")), fase === "ditolak" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: C.merahBg,
      display: "grid",
      placeItems: "center",
      margin: "0 auto 14px",
      color: C.merah
    }
  }, I.x), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 6px",
      fontSize: 18,
      color: C.merah,
      fontWeight: 700
    }
  }, "Akses Ditolak"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px",
      fontSize: 13,
      color: C.kremSub,
      lineHeight: 1.5
    }
  }, "Email ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.navy
    }
  }, emailDitolak), " bukan pemilik toko. Hanya email owner yang bisa masuk."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11.5,
      color: "#b3a78f",
      background: "#FBF7EE",
      borderRadius: 8,
      padding: "8px 10px",
      margin: "14px 0 0",
      lineHeight: 1.4
    }
  }, "\u2705 Inilah pengaman aslinya: walau pelanggan nemu halaman ini, tetap ditolak."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFase("pilih"),
    style: {
      marginTop: 16,
      background: C.navy,
      color: "white",
      border: "none",
      borderRadius: 10,
      padding: "10px 20px",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: SERIF
    }
  }, "Coba akun lain")), /*#__PURE__*/React.createElement("button", {
    onClick: kembali,
    style: {
      marginTop: 18,
      background: "none",
      border: "none",
      color: C.kremSub,
      fontSize: 12.5,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontFamily: SERIF
    }
  }, I.back, " Kembali ke beranda")));
}
function Landing({
  masukToko,
  masukOwner
}) {
  const [ketuk, setKetuk] = useState(0);
  const waLink = `https://wa.me/${KONTAK.waAdmin}?text=${encodeURIComponent(KONTAK.waText)}`;
  const tautan = [{
    icon: I.wa,
    label: "WA Admin",
    sub: "Fast Respon",
    href: waLink,
    utama: true
  }, {
    icon: I.store,
    label: "Kunjungi Toko Online",
    sub: "Belanja & checkout langsung",
    onClick: masukToko,
    utama: true
  }, {
    icon: I.pin,
    label: "Lokasi Store",
    sub: "Buka di Google Maps",
    href: KONTAK.lokasiMaps
  }, {
    icon: I.ig,
    label: "Instagram",
    sub: "@tokoaneka",
    href: KONTAK.instagram
  }];
  const ketukLogo = () => {
    const n = ketuk + 1;
    setKetuk(n);
    if (n >= 5) {
      setKetuk(0);
      masukOwner();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: C.krem,
      fontFamily: SERIF,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "50px 20px 30px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: ketukLogo,
    style: {
      marginBottom: 6,
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement(LogoAneka, {
    warnaTeks: C.navy
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      color: C.kremSub,
      fontSize: 13,
      margin: "18px 0 28px",
      textAlign: "center",
      maxWidth: 330,
      lineHeight: 1.5
    }
  }, "Pusat alat tulis & perlengkapan kantor terlengkap di Balikpapan. Produk original, harga bersaing, kirim cepat sampai tujuan."), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 400,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, tautan.map((t, i) => {
    const isi = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "grid",
        placeItems: "center",
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: t.utama ? C.gold : "white",
        color: t.utama ? "white" : C.navy,
        flexShrink: 0,
        border: t.utama ? "none" : `1px solid ${C.kremGaris}`
      }
    }, t.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        color: C.navy,
        fontWeight: 700,
        fontSize: 15
      }
    }, t.label), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        color: C.kremSub,
        fontSize: 12
      }
    }, t.sub)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#b3a78f"
      }
    }, I.ext));
    const style = {
      display: "flex",
      alignItems: "center",
      gap: 14,
      width: "100%",
      background: "white",
      border: `1px solid ${t.utama ? C.gold : C.kremGaris}`,
      borderRadius: 14,
      padding: "12px 16px",
      cursor: "pointer",
      textDecoration: "none",
      boxSizing: "border-box",
      fontFamily: SERIF
    };
    return t.onClick ? /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: t.onClick,
      style: style
    }, isi) : /*#__PURE__*/React.createElement("a", {
      key: i,
      href: t.href,
      target: "_blank",
      rel: "noreferrer",
      style: style
    }, isi);
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#b3a78f",
      fontSize: 11,
      marginTop: 34
    }
  }, "\xA9 2026 Toko Aneka \xB7 Balikpapan"), ketuk > 0 && ketuk < 5 && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#cbbfa6",
      fontSize: 10,
      marginTop: 4
    }
  }, 5 - ketuk, " ketukan lagi untuk area owner\u2026"));
}
function Pelanggan({
  produk,
  setProduk,
  tambahPesanan
}) {
  const [keranjang, setKeranjang] = useState({});
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [cari, setCari] = useState("");
  const [buka, setBuka] = useState(false);
  const [tahap, setTahap] = useState("keranjang");
  const [form, setForm] = useState({
    nama: "",
    hp: "",
    alamat: "",
    lat: null,
    lng: null
  });
  const [kurirPilih, setKurirPilih] = useState(null);
  const [bayarPilih, setBayarPilih] = useState(null);
  const produkTampil = useMemo(() => produk.filter(p => (kategoriAktif === "Semua" || p.kategori === kategoriAktif) && (p.nama.toLowerCase().includes(cari.toLowerCase()) || p.merek.toLowerCase().includes(cari.toLowerCase()))), [produk, kategoriAktif, cari]);
  const items = useMemo(() => Object.entries(keranjang).filter(([, q]) => q > 0).map(([id, qty]) => ({
    ...produk.find(p => p.id === +id),
    qty
  })), [keranjang, produk]);
  const totalItem = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.harga * i.qty, 0);
  const ongkir = kurirPilih ? KURIR.find(k => k.id === kurirPilih).ongkir : 0;
  const total = subtotal + ongkir;
  const tambah = id => setKeranjang(k => ({
    ...k,
    [id]: (k[id] || 0) + 1
  }));
  const kurang = id => setKeranjang(k => ({
    ...k,
    [id]: Math.max(0, (k[id] || 0) - 1)
  }));
  const selesaikan = () => {
    setProduk(prev => prev.map(p => {
      const it = items.find(i => i.id === p.id);
      return it ? {
        ...p,
        stok: Math.max(0, p.stok - it.qty),
        terjual: p.terjual + it.qty
      } : p;
    }));
    tambahPesanan({
      id: Date.now(),
      nama: form.nama,
      hp: form.hp,
      items,
      subtotal,
      ongkir,
      total,
      kurir: KURIR.find(k => k.id === kurirPilih)?.nama,
      bayar: BAYAR.find(b => b.id === bayarPilih)?.nama,
      waktu: new Date().toLocaleString("id-ID")
    });
    setTahap("selesai");
  };
  const reset = () => {
    setKeranjang({});
    setForm({
      nama: "",
      hp: "",
      alamat: "",
      lat: null,
      lng: null
    });
    setKurirPilih(null);
    setBayarPilih(null);
    setTahap("keranjang");
    setBuka(false);
  };
  const judul = {
    keranjang: "Keranjang",
    alamat: "Alamat Pengiriman",
    kurir: "Pilih Kurir",
    bayar: "Pembayaran",
    selesai: ""
  }[tahap];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    style: {
      background: C.navy,
      padding: "12px 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 52,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: "scale(0.85)",
      transformOrigin: "left"
    }
  }, /*#__PURE__*/React.createElement(LogoAneka, {
    kecil: true
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setTahap("keranjang");
      setBuka(true);
    },
    style: {
      position: "relative",
      background: C.gold,
      border: "none",
      color: C.navy,
      padding: "9px 14px",
      borderRadius: 10,
      fontWeight: 700,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, I.cart, totalItem > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -7,
      right: -7,
      background: C.merah,
      color: "white",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 800,
      minWidth: 20,
      height: 20,
      display: "grid",
      placeItems: "center",
      padding: "0 5px"
    }
  }, totalItem))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${C.navy}, #2A3A52)`,
      padding: "22px 18px 24px",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      background: "rgba(201,162,75,0.2)",
      color: C.gold,
      fontSize: 11,
      fontWeight: 700,
      padding: "4px 12px",
      borderRadius: 999,
      marginBottom: 10
    }
  }, "\u2605 Toko ATK Terlengkap di Balikpapan"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 24,
      fontWeight: 800,
      lineHeight: 1.2
    }
  }, "Semua kebutuhan tulis & kantor,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.gold
    }
  }, "satu toko.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      color: "rgba(255,255,255,0.7)",
      fontSize: 13
    }
  }, "Ratusan produk siap kirim. Pesan online, sampai ke rumah."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 14,
      top: 13,
      color: "#999"
    }
  }, I.search), /*#__PURE__*/React.createElement("input", {
    value: cari,
    onChange: e => setCari(e.target.value),
    placeholder: "Cari produk atau merek...",
    style: {
      width: "100%",
      padding: "13px 14px 13px 42px",
      borderRadius: 12,
      border: "none",
      background: "white",
      fontSize: 14,
      boxSizing: "border-box",
      outline: "none",
      color: "#222",
      fontFamily: SERIF
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 1,
      background: C.border,
      borderBottom: `1px solid ${C.border}`
    }
  }, KEUNGGULAN.map(k => /*#__PURE__*/React.createElement("div", {
    key: k.judul,
    style: {
      background: "white",
      padding: "12px 8px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      marginBottom: 2
    }
  }, k.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.navy
    }
  }, k.judul), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.teks2,
      marginTop: 1,
      lineHeight: 1.2
    }
  }, k.ket)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 18px 4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 800,
      color: C.navy
    }
  }, "Kategori Produk"), kategoriAktif !== "Semua" && /*#__PURE__*/React.createElement("button", {
    onClick: () => setKategoriAktif("Semua"),
    style: {
      background: "none",
      border: "none",
      color: C.gold,
      fontSize: 12.5,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: SERIF
    }
  }, "Lihat semua \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
      gap: 10
    }
  }, KATEGORI_IKON.map(k => {
    const aktif = kategoriAktif === k.nama;
    return /*#__PURE__*/React.createElement("button", {
      key: k.nama,
      onClick: () => setKategoriAktif(aktif ? "Semua" : k.nama),
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "16px 8px",
        borderRadius: 12,
        border: "1.5px solid",
        borderColor: aktif ? C.gold : C.border,
        background: aktif ? "#FCF7EC" : "white",
        cursor: "pointer",
        fontFamily: SERIF
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "grid",
        placeItems: "center",
        width: 42,
        height: 42,
        borderRadius: 10,
        background: aktif ? C.gold : C.bg,
        fontSize: 20
      }
    }, k.emoji), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        fontWeight: 700,
        color: C.navy
      }
    }, k.nama), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.teks2
      }
    }, k.ket));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 18px 6px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 800,
      color: C.navy
    }
  }, kategoriAktif === "Semua" ? "Semua Produk" : kategoriAktif), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: C.teks2
    }
  }, produkTampil.length, " produk")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
      gap: 12,
      padding: "8px 18px 100px"
    }
  }, produkTampil.map(p => {
    const qty = keranjang[p.id] || 0;
    const habis = p.stok === 0;
    const laris = p.terjual >= 150;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        background: "white",
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        opacity: habis ? 0.6 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        aspectRatio: "1",
        background: C.bg,
        display: "grid",
        placeItems: "center",
        borderBottom: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 40,
        opacity: 0.5
      }
    }, p.emoji), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        bottom: 6,
        right: 6,
        background: "rgba(255,255,255,0.85)",
        color: "#aaa",
        fontSize: 8.5,
        padding: "2px 6px",
        borderRadius: 5
      }
    }, "foto produk"), laris && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 8,
        left: 8,
        background: C.gold,
        color: C.navy,
        fontSize: 9.5,
        fontWeight: 800,
        padding: "3px 8px",
        borderRadius: 6
      }
    }, "TERLARIS"), p.stok <= AMBANG && !habis && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 8,
        right: 8,
        background: C.merah,
        color: "white",
        fontSize: 9.5,
        fontWeight: 800,
        padding: "3px 8px",
        borderRadius: 6
      }
    }, "Sisa ", p.stok)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 11,
        display: "flex",
        flexDirection: "column",
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9.5,
        color: C.gold,
        fontWeight: 700,
        letterSpacing: 0.5
      }
    }, p.merek.toUpperCase()), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        fontWeight: 600,
        color: "#222",
        minHeight: 33,
        lineHeight: 1.3,
        marginTop: 1
      }
    }, p.nama), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        color: C.navy,
        fontSize: 16,
        margin: "5px 0 5px"
      }
    }, RP(p.harga)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        color: C.teks2,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 2
      }
    }, I.star, " ", p.rating.toFixed(1)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#ccc"
      }
    }, "|"), /*#__PURE__*/React.createElement("span", null, p.terjual, " terjual")), habis ? /*#__PURE__*/React.createElement("button", {
      disabled: true,
      style: {
        marginTop: "auto",
        background: "#eee",
        color: "#aaa",
        border: "none",
        borderRadius: 9,
        padding: "9px 0",
        fontWeight: 700,
        fontSize: 13,
        fontFamily: SERIF
      }
    }, "Habis") : qty === 0 ? /*#__PURE__*/React.createElement("button", {
      onClick: () => tambah(p.id),
      style: {
        marginTop: "auto",
        background: C.navy,
        color: "white",
        border: "none",
        borderRadius: 9,
        padding: "9px 0",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer",
        fontFamily: SERIF
      }
    }, "+ Keranjang") : /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: C.navy,
        borderRadius: 9,
        padding: 4
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => kurang(p.id),
      style: qtyBtn
    }, I.minus), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "white",
        fontWeight: 800,
        fontSize: 15
      }
    }, qty), /*#__PURE__*/React.createElement("button", {
      onClick: () => tambah(p.id),
      disabled: qty >= p.stok,
      style: {
        ...qtyBtn,
        opacity: qty >= p.stok ? 0.4 : 1
      }
    }, I.plus))));
  })), buka && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: () => tahap !== "selesai" && setBuka(false),
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      zIndex: 30
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      right: 0,
      top: 0,
      bottom: 0,
      width: "min(440px, 100%)",
      background: C.bg,
      zIndex: 31,
      display: "flex",
      flexDirection: "column",
      boxShadow: "-4px 0 24px rgba(0,0,0,0.15)"
    }
  }, tahap === "selesai" ? /*#__PURE__*/React.createElement(SelesaiView, {
    form: form,
    total: total,
    bayar: BAYAR.find(b => b.id === bayarPilih),
    reset: reset
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      borderBottom: `1px solid ${C.border}`
    }
  }, tahap !== "keranjang" && /*#__PURE__*/React.createElement("button", {
    onClick: () => setTahap(tahap === "alamat" ? "keranjang" : tahap === "kurir" ? "alamat" : "kurir"),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#666",
      padding: 0
    }
  }, I.back), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 18,
      color: C.navy,
      flex: 1
    }
  }, judul), /*#__PURE__*/React.createElement("button", {
    onClick: () => setBuka(false),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#666"
    }
  }, I.x)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: 18
    }
  }, tahap === "keranjang" && /*#__PURE__*/React.createElement(KeranjangView, {
    items: items,
    tambah: tambah,
    kurang: kurang
  }), tahap === "alamat" && /*#__PURE__*/React.createElement(AlamatView, {
    form: form,
    setForm: setForm
  }), tahap === "kurir" && /*#__PURE__*/React.createElement(KurirView, {
    kurirPilih: kurirPilih,
    setKurirPilih: setKurirPilih
  }), tahap === "bayar" && /*#__PURE__*/React.createElement(BayarView, {
    bayarPilih: bayarPilih,
    setBayarPilih: setBayarPilih,
    total: total,
    subtotal: subtotal,
    ongkir: ongkir
  })), items.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      borderTop: `1px solid ${C.border}`,
      background: "white"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#666",
      fontSize: 14
    }
  }, tahap === "keranjang" ? "Subtotal" : "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 20,
      color: C.navy
    }
  }, RP(tahap === "keranjang" ? subtotal : total))), /*#__PURE__*/React.createElement(FooterBtn, {
    tahap: tahap,
    setTahap: setTahap,
    form: form,
    kurirPilih: kurirPilih,
    bayarPilih: bayarPilih,
    selesaikan: selesaikan
  }))))));
}
function FooterBtn({
  tahap,
  setTahap,
  form,
  kurirPilih,
  bayarPilih,
  selesaikan
}) {
  const cfg = {
    keranjang: {
      label: "Lanjut ke Alamat",
      next: () => setTahap("alamat"),
      ok: true
    },
    alamat: {
      label: "Lanjut Pilih Kurir",
      next: () => setTahap("kurir"),
      ok: form.nama && form.hp && form.alamat && form.lat
    },
    kurir: {
      label: "Lanjut ke Pembayaran",
      next: () => setTahap("bayar"),
      ok: !!kurirPilih
    },
    bayar: {
      label: "Bayar Sekarang",
      next: selesaikan,
      ok: !!bayarPilih
    }
  }[tahap];
  return /*#__PURE__*/React.createElement("button", {
    onClick: cfg.ok ? cfg.next : undefined,
    disabled: !cfg.ok,
    style: {
      width: "100%",
      background: cfg.ok ? C.navy : "#b3bcc8",
      color: "white",
      border: "none",
      borderRadius: 12,
      padding: "14px 0",
      fontWeight: 800,
      fontSize: 15,
      cursor: cfg.ok ? "pointer" : "not-allowed",
      fontFamily: SERIF
    }
  }, cfg.label);
}
function KeranjangView({
  items,
  tambah,
  kurang
}) {
  if (items.length === 0) return /*#__PURE__*/React.createElement(Kosong, {
    emoji: "\uD83D\uDED2",
    teks: "Keranjang masih kosong."
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, items.map(i => /*#__PURE__*/React.createElement("div", {
    key: i.id,
    style: {
      display: "flex",
      gap: 12,
      background: "white",
      borderRadius: 12,
      padding: 10,
      border: `1px solid ${C.border}`,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      background: C.bg,
      borderRadius: 9,
      width: 48,
      height: 48,
      display: "grid",
      placeItems: "center"
    }
  }, i.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, i.nama), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.navy,
      fontWeight: 800
    }
  }, RP(i.harga))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: C.bg,
      borderRadius: 8,
      padding: 3
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => kurang(i.id),
    style: qtyBtnDark
  }, I.minus), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      minWidth: 18,
      textAlign: "center"
    }
  }, i.qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => tambah(i.id),
    style: qtyBtnDark
  }, I.plus)))));
}
function AlamatView({
  form,
  setForm
}) {
  const mapRef = useRef(null),
    mapObj = useRef(null),
    markerObj = useRef(null);
  const [memuat, setMemuat] = useState(true);
  useEffect(() => {
    let batal = false;
    function init() {
      if (batal || !mapRef.current || mapObj.current || !window.L) return;
      const L = window.L;
      const awal = [form.lat || -1.2654, form.lng || 116.8312];
      const map = L.map(mapRef.current).setView(awal, 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 19
      }).addTo(map);
      const marker = L.marker(awal, {
        draggable: true
      }).addTo(map);
      const upd = ll => setForm(f => ({
        ...f,
        lat: +ll.lat.toFixed(6),
        lng: +ll.lng.toFixed(6)
      }));
      marker.on("dragend", e => upd(e.target.getLatLng()));
      map.on("click", e => {
        marker.setLatLng(e.latlng);
        upd(e.latlng);
      });
      mapObj.current = map;
      markerObj.current = marker;
      if (!form.lat) upd({
        lat: awal[0],
        lng: awal[1]
      });
      setMemuat(false);
      setTimeout(() => map.invalidateSize(), 200);
    }
    if (window.L) init();else {
      const t = setInterval(() => {
        if (window.L) {
          clearInterval(t);
          init();
        }
      }, 200);
      return () => {
        batal = true;
        clearInterval(t);
      };
    }
    return () => {
      batal = true;
    };
  }, []);
  const lokasiku = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos => {
      const {
        latitude,
        longitude
      } = pos.coords;
      setForm(f => ({
        ...f,
        lat: +latitude.toFixed(6),
        lng: +longitude.toFixed(6)
      }));
      if (mapObj.current) {
        mapObj.current.setView([latitude, longitude], 16);
        markerObj.current.setLatLng([latitude, longitude]);
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nama Penerima",
    value: form.nama,
    onChange: v => setForm({
      ...form,
      nama: v
    }),
    placeholder: "Nama lengkap"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "No. WhatsApp",
    value: form.hp,
    onChange: v => setForm({
      ...form,
      hp: v
    }),
    placeholder: "08xxxxxxxxxx"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Alamat (patokan/detail)",
    value: form.alamat,
    onChange: v => setForm({
      ...form,
      alamat: v
    }),
    placeholder: "Nama jalan, no rumah, RT/RW, patokan",
    textarea: true
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#444"
    }
  }, "Pin Lokasi di Peta"), /*#__PURE__*/React.createElement("button", {
    onClick: lokasiku,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: C.bg,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "5px 10px",
      fontSize: 12,
      fontWeight: 600,
      color: C.navy,
      cursor: "pointer",
      fontFamily: SERIF
    }
  }, I.pin, " Lokasi saya")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: 12,
      overflow: "hidden",
      border: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: mapRef,
    style: {
      height: 220,
      width: "100%",
      background: "#e8e8e8"
    }
  }), memuat && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
      background: "#f0ede5",
      color: "#999",
      fontSize: 13
    }
  }, "Memuat peta\u2026")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "#888",
      margin: "6px 0 0"
    }
  }, "Geser pin atau ketuk peta buat tandai lokasi rumah kamu."), form.lat && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: C.navy,
      margin: "4px 0 0",
      fontWeight: 600
    }
  }, "\uD83D\uDCCD ", form.lat, ", ", form.lng)));
}
function KurirView({
  kurirPilih,
  setKurirPilih
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "#8a6d3b",
      margin: "0 0 4px",
      background: "#FCF3DD",
      padding: "8px 12px",
      borderRadius: 8
    }
  }, "\u26A0\uFE0F Demo: ongkir & estimasi ini contoh. Versi asli akan ambil tarif real-time."), KURIR.map(k => /*#__PURE__*/React.createElement("button", {
    key: k.id,
    onClick: () => setKurirPilih(k.id),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "white",
      border: "2px solid",
      borderColor: kurirPilih === k.id ? C.navy : C.border,
      borderRadius: 12,
      padding: 14,
      cursor: "pointer",
      textAlign: "left",
      fontFamily: SERIF
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26
    }
  }, k.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: "#222"
    }
  }, k.nama), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#888"
    }
  }, k.est)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      color: C.navy,
      fontSize: 14
    }
  }, RP(k.ongkir)), kurirPilih === k.id && /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.navy
    }
  }, I.check))));
}
function BayarView({
  bayarPilih,
  setBayarPilih,
  total,
  subtotal,
  ongkir
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 12,
      padding: 14,
      border: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement(Row, {
    k: "Subtotal barang",
    v: RP(subtotal)
  }), /*#__PURE__*/React.createElement(Row, {
    k: "Ongkir",
    v: RP(ongkir)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px dashed #ddd",
      margin: "8px 0"
    }
  }), /*#__PURE__*/React.createElement(Row, {
    k: /*#__PURE__*/React.createElement("b", null, "Total bayar"),
    v: /*#__PURE__*/React.createElement("b", {
      style: {
        color: C.navy
      }
    }, RP(total))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, BAYAR.map(b => /*#__PURE__*/React.createElement("button", {
    key: b.id,
    onClick: () => setBayarPilih(b.id),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "white",
      border: "2px solid",
      borderColor: bayarPilih === b.id ? C.navy : C.border,
      borderRadius: 12,
      padding: 14,
      cursor: "pointer",
      textAlign: "left",
      fontFamily: SERIF
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, b.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: "#222"
    }
  }, b.nama), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#888"
    }
  }, b.ket)), bayarPilih === b.id && /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.navy
    }
  }, I.check)))), bayarPilih === "qris" && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      background: "white",
      borderRadius: 12,
      padding: 16,
      border: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      height: 150,
      margin: "0 auto",
      background: "repeating-conic-gradient(#1E2A3D 0% 25%, white 0% 50%) 50% / 18px 18px",
      borderRadius: 8
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "#888",
      marginTop: 10
    }
  }, "Scan QRIS ini (contoh). Versi asli pakai QR dari Midtrans.")));
}
function SelesaiView({
  form,
  total,
  bayar,
  reset
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 70,
      height: 70,
      borderRadius: 999,
      background: C.navy,
      display: "grid",
      placeItems: "center",
      margin: "0 auto 18px",
      color: C.gold
    }
  }, I.check), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      color: C.navy,
      fontSize: 22
    }
  }, "Pesanan berhasil!"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#666",
      fontSize: 14,
      marginTop: 8
    }
  }, "Makasih ", form.nama || "kak", "! Pembayaran ", /*#__PURE__*/React.createElement("b", null, RP(total)), " via ", /*#__PURE__*/React.createElement("b", null, bayar?.nama), " diterima (simulasi). Pesanan masuk ke dashboard Owner."), /*#__PURE__*/React.createElement("button", {
    onClick: reset,
    style: {
      marginTop: 22,
      background: C.navy,
      color: "white",
      border: "none",
      borderRadius: 11,
      padding: "12px 24px",
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: SERIF
    }
  }, "Belanja lagi")));
}
const MENU = [{
  grup: "KASIR & TRANSAKSI",
  items: [{
    id: "pesanan",
    label: "Pesanan Masuk",
    emoji: "🧾"
  }, {
    id: "riwayat",
    label: "Riwayat Transaksi",
    emoji: "📖"
  }]
}, {
  grup: "DASHBOARD & LAPORAN",
  items: [{
    id: "ringkasan",
    label: "Ringkasan",
    emoji: "📊"
  }, {
    id: "labarugi",
    label: "Laba Rugi",
    emoji: "📄"
  }, {
    id: "penjualan",
    label: "Laporan Penjualan",
    emoji: "📈"
  }, {
    id: "aruskas",
    label: "Arus Kas",
    emoji: "💰"
  }]
}, {
  grup: "INVENTORY & STOK",
  items: [{
    id: "stok",
    label: "Stok & Restock",
    emoji: "📦"
  }]
}, {
  grup: "DATA MASTER",
  items: [{
    id: "produk",
    label: "Daftar Produk",
    emoji: "🗃️"
  }]
}];
function Owner({
  produk,
  setProduk,
  pesananMasuk,
  keluar
}) {
  const [tab, setTab] = useState("ringkasan");
  const [sidebarBuka, setSidebarBuka] = useState(false);
  const stat = useMemo(() => {
    const omzet = produk.reduce((s, p) => s + p.harga * p.terjual, 0);
    const hpp = produk.reduce((s, p) => s + p.modal * p.terjual, 0);
    const labaKotor = omzet - hpp;
    const totalBeban = BEBAN.reduce((s, b) => s + b.jumlah, 0);
    const labaBersih = labaKotor - totalBeban;
    const nilaiStok = produk.reduce((s, p) => s + p.modal * p.stok, 0);
    const perluRestock = produk.filter(p => p.stok <= AMBANG);
    const terlaris = [...produk].sort((a, b) => b.terjual - a.terjual).slice(0, 5);
    return {
      omzet,
      hpp,
      labaKotor,
      totalBeban,
      labaBersih,
      nilaiStok,
      perluRestock,
      terlaris,
      margin: omzet ? labaKotor / omzet * 100 : 0
    };
  }, [produk]);
  const judulTab = MENU.flatMap(g => g.items).find(i => i.id === tab)?.label || "Dashboard";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      minHeight: "calc(100vh - 52px)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    className: "sidebar-aneka",
    "data-buka": sidebarBuka,
    style: {
      width: 230,
      background: C.navy,
      color: "white",
      flexShrink: 0,
      position: "sticky",
      top: 52,
      height: "calc(100vh - 52px)",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 16px",
      borderBottom: "1px solid rgba(255,255,255,0.1)"
    }
  }, /*#__PURE__*/React.createElement(LogoAneka, {
    kecil: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      letterSpacing: 1,
      background: C.gold,
      color: C.navy,
      padding: "3px 12px",
      borderRadius: 999,
      fontWeight: 800
    }
  }, "OWNER MODE"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      padding: "12px 10px"
    }
  }, MENU.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.grup,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      letterSpacing: 1,
      color: "rgba(255,255,255,0.4)",
      fontWeight: 700,
      padding: "0 8px 6px"
    }
  }, g.grup), g.items.map(it => {
    const aktif = tab === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => {
        setTab(it.id);
        setSidebarBuka(false);
      },
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 10px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        marginBottom: 2,
        background: aktif ? C.gold : "transparent",
        color: aktif ? C.navy : "rgba(255,255,255,0.85)",
        fontWeight: aktif ? 700 : 500,
        fontSize: 13,
        textAlign: "left",
        fontFamily: SERIF
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, it.emoji), " ", it.label);
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      fontSize: 10,
      color: "rgba(255,255,255,0.4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: keluar,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "rgba(255,255,255,0.7)",
      fontSize: 13,
      marginBottom: 8,
      cursor: "pointer"
    }
  }, I.logout, " Keluar"), "v1.0 \xB7 Toko Aneka")), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderBottom: `1px solid ${C.border}`,
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 52,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSidebarBuka(v => !v),
    className: "btn-menu-aneka",
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.navy,
      display: "none"
    }
  }, I.menu), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 18,
      color: C.navy,
      fontWeight: 800
    }
  }, judulTab), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.teks2
    }
  }, "Toko Aneka \u2014 Balikpapan"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.teks2
    }
  }, "OMZET TOTAL"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      color: C.navy,
      fontSize: 15
    }
  }, RP(stat.omzet))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.teks2
    }
  }, stat.labaBersih >= 0 ? "LABA BERSIH" : "RUGI BERSIH"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      color: stat.labaBersih >= 0 ? C.hijau : C.merah,
      fontSize: 15
    }
  }, RP(Math.abs(stat.labaBersih)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, tab === "ringkasan" && /*#__PURE__*/React.createElement(Ringkasan, {
    stat: stat,
    pesananMasuk: pesananMasuk
  }), tab === "labarugi" && /*#__PURE__*/React.createElement(LabaRugi, {
    stat: stat
  }), tab === "penjualan" && /*#__PURE__*/React.createElement(Penjualan, {
    produk: produk
  }), tab === "aruskas" && /*#__PURE__*/React.createElement(ArusKas, {
    stat: stat
  }), tab === "stok" && /*#__PURE__*/React.createElement(StokRestock, {
    produk: produk,
    setProduk: setProduk
  }), tab === "produk" && /*#__PURE__*/React.createElement(DaftarProduk, {
    produk: produk
  }), tab === "pesanan" && /*#__PURE__*/React.createElement(PesananMasuk, {
    pesananMasuk: pesananMasuk
  }), tab === "riwayat" && /*#__PURE__*/React.createElement(RiwayatTransaksi, {
    pesananMasuk: pesananMasuk
  }))));
}
function Ringkasan({
  stat,
  pesananMasuk
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Kartu, {
    icon: I.money,
    label: "Omzet Total",
    nilai: RP(stat.omzet),
    warna: C.navy
  }), /*#__PURE__*/React.createElement(Kartu, {
    icon: stat.labaBersih >= 0 ? I.trUp : I.trDown,
    label: stat.labaBersih >= 0 ? "Laba Bersih" : "Rugi Bersih",
    nilai: RP(Math.abs(stat.labaBersih)),
    warna: stat.labaBersih >= 0 ? C.hijau : C.merah,
    sub: `Margin kotor ${stat.margin.toFixed(1)}%`
  }), /*#__PURE__*/React.createElement(Kartu, {
    icon: I.box,
    label: "Nilai Stok (modal)",
    nilai: RP(stat.nilaiStok),
    warna: C.teks2
  }), /*#__PURE__*/React.createElement(Kartu, {
    icon: I.alert,
    label: "Perlu Restock",
    nilai: `${stat.perluRestock.length} produk`,
    warna: stat.perluRestock.length ? C.merah : C.hijau
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    judul: "\u2B50 Produk Paling Diminati"
  }, stat.terlaris.map((p, i) => {
    const max = stat.terlaris[0].terjual;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600
      }
    }, i + 1, ". ", p.emoji, " ", p.nama), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#888"
      }
    }, p.terjual)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8,
        background: "#f0ede5",
        borderRadius: 999,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: `${p.terjual / max * 100}%`,
        background: C.navy,
        borderRadius: 999
      }
    })));
  })), /*#__PURE__*/React.createElement(Panel, {
    judul: "\u26A0\uFE0F Segera Restock"
  }, stat.perluRestock.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: C.hijau,
      fontSize: 13,
      margin: 0
    }
  }, "\u2713 Semua stok aman.") : stat.perluRestock.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #f0ede5"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, p.emoji, " ", p.nama), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.merah,
      background: C.merahBg,
      padding: "3px 10px",
      borderRadius: 999
    }
  }, "sisa ", p.stok))))), /*#__PURE__*/React.createElement(Panel, {
    judul: "Pesanan Online Terbaru"
  }, pesananMasuk.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#999",
      fontSize: 13,
      margin: 0
    }
  }, "Belum ada pesanan online. Checkout dari mode Pelanggan buat lihat di sini.") : pesananMasuk.slice(0, 4).map(o => /*#__PURE__*/React.createElement("div", {
    key: o.id,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: "1px solid #f0ede5"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, o.nama), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999"
    }
  }, o.items.length, " item \xB7 ", o.bayar, " \xB7 ", o.kurir)), /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.navy,
      fontSize: 14
    }
  }, RP(o.total))))));
}
function LabaRugi({
  stat
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    judul: "\uD83D\uDCC4 Laporan Laba Rugi"
  }, /*#__PURE__*/React.createElement(BarisLR, {
    label: "Pendapatan Usaha (Omzet)",
    nilai: stat.omzet,
    tebal: true
  }), /*#__PURE__*/React.createElement(BarisLR, {
    label: "Beban Pokok Penjualan (HPP)",
    nilai: -stat.hpp,
    merah: true
  }), /*#__PURE__*/React.createElement(Garis, null), /*#__PURE__*/React.createElement(BarisLR, {
    label: "Laba Kotor",
    nilai: stat.labaKotor,
    tebal: true,
    warna: C.hijau
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.teks2,
      fontWeight: 700,
      letterSpacing: 0.5,
      marginBottom: 6
    }
  }, "BEBAN OPERASIONAL"), BEBAN.map(b => /*#__PURE__*/React.createElement(BarisLR, {
    key: b.nama,
    label: b.nama,
    nilai: -b.jumlah,
    merah: true,
    kecil: true
  })), /*#__PURE__*/React.createElement(BarisLR, {
    label: "Total Beban Operasional",
    nilai: -stat.totalBeban,
    merah: true
  }), /*#__PURE__*/React.createElement(Garis, null), /*#__PURE__*/React.createElement("div", {
    style: {
      background: stat.labaBersih >= 0 ? "#EAF3EE" : C.merahBg,
      borderRadius: 10,
      padding: "12px 14px",
      marginTop: 8,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: stat.labaBersih >= 0 ? C.hijau : C.merah,
      fontSize: 15
    }
  }, stat.labaBersih >= 0 ? "LABA BERSIH" : "RUGI BERSIH"), /*#__PURE__*/React.createElement("b", {
    style: {
      color: stat.labaBersih >= 0 ? C.hijau : C.merah,
      fontSize: 17
    }
  }, RP(Math.abs(stat.labaBersih))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11.5,
      color: "#999",
      marginTop: 12
    }
  }, "Angka omzet & HPP dihitung dari total produk terjual. Beban operasional masih contoh \u2014 di versi asli bisa kamu input sendiri tiap bulan."));
}
function Penjualan({
  produk
}) {
  const perKategori = useMemo(() => {
    const map = {};
    produk.forEach(p => {
      map[p.kategori] = (map[p.kategori] || 0) + p.harga * p.terjual;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [produk]);
  const maxKat = Math.max(...perKategori.map(k => k[1]));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    judul: "\uD83D\uDCC8 Omzet per Kategori"
  }, perKategori.map(([kat, val]) => /*#__PURE__*/React.createElement("div", {
    key: kat,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, kat), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.navy,
      fontWeight: 700
    }
  }, RP(val))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      background: "#f0ede5",
      borderRadius: 999,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${val / maxKat * 100}%`,
      background: C.navy,
      borderRadius: 999
    }
  }))))), /*#__PURE__*/React.createElement(Panel, {
    judul: "Rincian Penjualan per Produk"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, [...produk].sort((a, b) => b.harga * b.terjual - a.harga * a.terjual).map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #f4f1ea",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", null, p.emoji, " ", p.nama), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#999"
    }
  }, p.terjual, "x"), /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.navy,
      minWidth: 80,
      textAlign: "right"
    }
  }, RP(p.harga * p.terjual))))))));
}
function ArusKas({
  stat
}) {
  const masuk = stat.omzet,
    keluarHPP = stat.hpp,
    keluarBeban = stat.totalBeban;
  const saldo = masuk - keluarHPP - keluarBeban;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    judul: "\uD83D\uDCB0 Laporan Arus Kas"
  }, /*#__PURE__*/React.createElement(BarisKas, {
    label: "Kas Masuk \u2014 Penjualan",
    nilai: masuk
  }), /*#__PURE__*/React.createElement(BarisKas, {
    label: "Kas Keluar \u2014 Beli Stok (HPP)",
    nilai: -keluarHPP
  }), /*#__PURE__*/React.createElement(BarisKas, {
    label: "Kas Keluar \u2014 Beban Operasional",
    nilai: -keluarBeban
  }), /*#__PURE__*/React.createElement(Garis, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 15,
      color: C.navy
    }
  }, "Saldo Kas Akhir"), /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 17,
      color: saldo >= 0 ? C.hijau : C.merah
    }
  }, RP(saldo)))));
}
function StokRestock({
  produk,
  setProduk
}) {
  const ubah = (id, d) => setProduk(prev => prev.map(p => p.id === id ? {
    ...p,
    stok: Math.max(0, p.stok + d)
  } : p));
  const setStok = (id, v) => setProduk(prev => prev.map(p => p.id === id ? {
    ...p,
    stok: Math.max(0, parseInt(v) || 0)
  } : p));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: C.teks2,
      margin: 0
    }
  }, "Atur stok tiap produk. Baris merah = stok menipis (\u2264 ", AMBANG, "), segera restock."), produk.map(p => {
    const low = p.stok <= AMBANG;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "white",
        borderRadius: 12,
        padding: 12,
        border: "1px solid",
        borderColor: low ? "#F5C2C2" : C.border
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 24,
        background: C.bg,
        borderRadius: 9,
        width: 44,
        height: 44,
        display: "grid",
        placeItems: "center",
        flexShrink: 0
      }
    }, p.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, p.nama), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#888"
      }
    }, "Jual ", RP(p.harga), " \xB7 Modal ", RP(p.modal))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => ubah(p.id, -1),
      style: qtyBtnDark
    }, I.minus), /*#__PURE__*/React.createElement("input", {
      value: p.stok,
      onChange: e => setStok(p.id, e.target.value),
      style: {
        width: 46,
        textAlign: "center",
        padding: "6px 4px",
        borderRadius: 8,
        border: "1px solid",
        borderColor: low ? C.merah : C.border,
        fontWeight: 800,
        color: low ? C.merah : C.navy,
        fontSize: 14,
        outline: "none",
        fontFamily: SERIF
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => ubah(p.id, 10),
      style: {
        ...qtyBtnDark,
        width: "auto",
        padding: "0 8px",
        fontSize: 11,
        fontWeight: 700,
        color: C.navy
      }
    }, "+10")));
  }));
}
function DaftarProduk({
  produk
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 14,
      border: `1px solid ${C.border}`,
      overflow: "hidden",
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr 0.7fr 0.7fr 0.6fr",
      padding: "12px 16px",
      background: C.navy,
      color: "white",
      fontSize: 11.5,
      fontWeight: 700,
      letterSpacing: 0.5
    }
  }, /*#__PURE__*/React.createElement("span", null, "PRODUK"), /*#__PURE__*/React.createElement("span", null, "MEREK"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "MODAL"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "JUAL"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, "STOK")), produk.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr 0.7fr 0.7fr 0.6fr",
      padding: "11px 16px",
      fontSize: 13,
      background: i % 2 ? "#FBFAF6" : "white",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, p.emoji, " ", p.nama), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.teks2
    }
  }, p.merek), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right",
      color: C.teks2
    }
  }, RP(p.modal)), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right",
      fontWeight: 700,
      color: C.navy
    }
  }, RP(p.harga)), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right",
      fontWeight: 700,
      color: p.stok <= AMBANG ? C.merah : C.teks
    }
  }, p.stok))));
}
function PesananMasuk({
  pesananMasuk
}) {
  if (pesananMasuk.length === 0) return /*#__PURE__*/React.createElement(Kosong, {
    emoji: "\uD83E\uDDFE",
    teks: "Belum ada pesanan masuk. Coba checkout dari mode Pelanggan dulu."
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      maxWidth: 640
    }
  }, pesananMasuk.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.id,
    style: {
      background: "white",
      borderRadius: 12,
      padding: 14,
      border: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, o.nama), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#888"
    }
  }, o.hp, " \xB7 ", o.waktu)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.navy,
      background: C.goldSoft,
      padding: "4px 10px",
      borderRadius: 999,
      height: "fit-content"
    }
  }, "Baru")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#555",
      marginBottom: 8
    }
  }, o.items.map(i => `${i.nama} ×${i.qty}`).join(", ")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 12,
      color: "#888",
      borderTop: "1px dashed #eee",
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDE9A ", o.kurir, " \xB7 \uD83D\uDCB3 ", o.bayar), /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.navy
    }
  }, RP(o.total))))));
}
function RiwayatTransaksi({
  pesananMasuk
}) {
  if (pesananMasuk.length === 0) return /*#__PURE__*/React.createElement(Kosong, {
    emoji: "\uD83D\uDCD6",
    teks: "Riwayat transaksi online akan muncul di sini setelah ada pesanan."
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 14,
      border: `1px solid ${C.border}`,
      overflow: "hidden",
      maxWidth: 700
    }
  }, pesananMasuk.map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: o.id,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      borderBottom: i < pesananMasuk.length - 1 ? "1px solid #f4f1ea" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, o.nama), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999"
    }
  }, o.waktu, " \xB7 ", o.bayar)), /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.hijau,
      fontSize: 14
    }
  }, "+", RP(o.total)))));
}
function Kartu({
  icon,
  label,
  nilai,
  warna,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 14,
      padding: 14,
      border: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: warna,
      marginBottom: 8
    }
  }, icon, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      color: "#888"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 18,
      color: warna
    }
  }, nilai), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#aaa",
      marginTop: 2
    }
  }, sub));
}
function Panel({
  judul,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "white",
      borderRadius: 14,
      padding: 16,
      border: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 14px",
      fontSize: 15,
      color: C.navy
    }
  }, judul), children);
}
function Row({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#666"
    }
  }, k), /*#__PURE__*/React.createElement("span", null, v));
}
function Kosong({
  emoji,
  teks
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      color: "#999",
      marginTop: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      opacity: 0.4
    }
  }, emoji), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 260,
      margin: "10px auto 0",
      fontSize: 13
    }
  }, teks));
}
function Garis() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid #e8e4d9",
      margin: "8px 0"
    }
  });
}
function BarisLR({
  label,
  nilai,
  tebal,
  merah,
  kecil,
  warna
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: kecil ? "3px 0 3px 12px" : "5px 0",
      fontSize: kecil ? 12.5 : 13.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: tebal ? 700 : 400,
      color: kecil ? "#888" : "#444"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: tebal ? 800 : 600,
      color: warna || (merah ? C.merah : C.teks)
    }
  }, nilai < 0 ? `(${RP(Math.abs(nilai))})` : RP(nilai)));
}
function BarisKas({
  label,
  nilai
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "7px 0",
      fontSize: 13.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      color: "#444"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: nilai >= 0 ? C.hijau : C.merah,
      fontWeight: 700
    }
  }, nilai >= 0 ? "↑" : "↓"), label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: nilai >= 0 ? C.hijau : C.merah
    }
  }, nilai < 0 ? `(${RP(Math.abs(nilai))})` : RP(nilai)));
}
const qtyBtn = {
  background: "rgba(255,255,255,0.18)",
  border: "none",
  color: "white",
  width: 30,
  height: 30,
  borderRadius: 7,
  display: "grid",
  placeItems: "center",
  cursor: "pointer"
};
const qtyBtnDark = {
  background: "white",
  border: `1px solid ${C.border}`,
  color: C.navy,
  width: 28,
  height: 28,
  borderRadius: 6,
  display: "grid",
  placeItems: "center",
  cursor: "pointer"
};
function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea
}) {
  const base = {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 10,
    border: `1px solid ${C.border}`,
    background: "white",
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none",
    fontFamily: SERIF
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#444",
      display: "block",
      marginBottom: 6
    }
  }, label), textarea ? /*#__PURE__*/React.createElement("textarea", {
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    rows: 3,
    style: base
  }) : /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    style: base
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));