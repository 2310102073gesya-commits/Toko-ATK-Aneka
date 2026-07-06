# Product Backlog: Toko ATK Aneka

## 1. Setup & Arsitektur Sistem
**Epik**: Melakukan inisialisasi proyek dan konfigurasi lingkungan pengembangan sesuai dengan tumpukan teknologi (Tech Stack) yang ada pada Blueprint.
- [ ] Inisialisasi proyek Next.js 14 dengan App Router sebagai frontend.
- [ ] Konfigurasi Tailwind CSS untuk mempermudah styling (tema Navy-Gold).
- [ ] Setup project di Supabase (PostgreSQL) sebagai database utama.
- [ ] Konfigurasi tabel-tabel utama (Produk, Pesanan, dll) dan implementasikan Row Level Security (RLS) pada Supabase untuk mengamankan data (Data Terisolasi).
- [ ] Setup dan konfigurasi Supabase Auth khusus untuk login akun Google bagi pemilik toko.
- [ ] Integrasikan repositori GitHub dengan Vercel untuk memfasilitasi hosting gratis dan deployment otomatis.

## 2. Katalog Produk (Modul 01)
**Epik**: Membuat halaman katalog produk yang mudah digunakan pelanggan untuk melihat dan mencari produk.
- [ ] Sebagai pelanggan, saya ingin melihat daftar produk yang dikelompokkan berdasarkan kategori.
- [ ] Sebagai pelanggan, saya ingin melihat detail produk (merek, harga, rating, status stok) sehingga saya bisa memutuskan untuk membeli.
- [ ] Sebagai pelanggan, saya ingin menggunakan fitur pencarian untuk menemukan produk spesifik dengan cepat.
- [ ] Sebagai pelanggan, saya ingin memfilter produk berdasarkan kriteria tertentu (misalnya harga atau kategori).

## 3. Keranjang & Checkout (Modul 02)
**Epik**: Membuat fitur keranjang belanja dan proses checkout yang bertahap untuk kemudahan transaksi pelanggan.
- [ ] Sebagai pelanggan, saya ingin menambahkan produk ke keranjang belanja.
- [ ] Sebagai pelanggan, saya ingin dapat mengatur jumlah (kuantitas) produk yang ingin dibeli di dalam keranjang.
- [ ] Sebagai pelanggan, saya ingin melihat ringkasan pesanan dan total harga di keranjang belanja.
- [ ] Sebagai pelanggan, saya ingin melakukan proses checkout secara bertahap (pengisian alamat -> pemilihan kurir -> pembayaran).

## 4. Peta Alamat (Modul 03)
**Epik**: Mengintegrasikan fitur peta (Leaflet + OpenStreetMap) agar pelanggan dapat menandai lokasi rumah untuk keakuratan pengiriman.
- [ ] Sebagai pelanggan, saya ingin dapat menandai (pin) lokasi pengiriman pada peta interaktif yang tersedia secara gratis.
- [ ] Sebagai sistem, saya ingin menyimpan koordinat alamat pelanggan (latitude, longitude) secara presisi untuk diteruskan ke layanan API kurir.

## 5. Pembayaran Otomatis (Modul 04)
**Epik**: Mengintegrasikan payment gateway (Midtrans / Xendit) untuk memproses pembayaran otomatis dari pelanggan.
- [ ] Sebagai pelanggan, saya ingin memilih metode pembayaran yang beragam (QRIS, GoPay, ShopeePay, Transfer Bank).
- [ ] Sebagai pelanggan, saya ingin menerima konfirmasi pembayaran secara otomatis setelah berhasil membayar, tanpa perlu mengunggah bukti transfer manual.
- [ ] Sebagai pemilik toko, saya ingin sistem memverifikasi pembayaran secara otomatis dan memperbarui status pesanan secara real-time.
- [ ] Sebagai pengembang, saya ingin memastikan kredensial pembayaran dan API tersimpan aman di server, tidak terekspos di sisi browser (Client).

## 6. Kurir Otomatis (Modul 05)
**Epik**: Mengintegrasikan API kurir (Biteship) untuk menampilkan biaya pengiriman (ongkir) real-time dan memesan pengiriman secara otomatis.
- [ ] Sebagai pelanggan, saya ingin melihat biaya ongkos kirim secara real-time berdasarkan titik lokasi (pin) yang sudah saya tentukan di peta.
- [ ] Sebagai pelanggan, saya ingin dapat memilih berbagai layanan jasa kurir yang tersedia (GoSend, Grab, JNE).
- [ ] Sebagai pemilik toko, saya ingin sistem secara otomatis meneruskan pesanan/request pickup (penjemputan) ke kurir instan sesaat setelah status pembayaran menjadi berhasil/terkonfirmasi.

## 7. Dashboard Owner (Modul 06)
**Epik**: Membuat dashboard eksklusif bagi pemilik toko (menggunakan autentikasi Google) untuk memantau performa bisnis, stok, dan arus kas secara real-time.
- [ ] Sebagai pemilik toko, saya ingin login ke dashboard menggunakan akun Google yang terdaftar (Auth Guard).
- [ ] Sebagai sistem, saya harus memblokir akses ke dashboard bagi pengguna yang emailnya belum didaftarkan sebagai pemilik/admin.
- [ ] Sebagai pemilik toko, saya ingin melihat ringkasan omzet, estimasi laba/rugi, dan total nilai stok yang ada di toko.
- [ ] Sebagai pemilik toko, saya ingin memantau arus kas harian (kas masuk, kas keluar, dan saldo akhir).
- [ ] Sebagai pemilik toko, saya ingin melihat laporan penjualan per kategori dan daftar produk terlaris.
- [ ] Sebagai pemilik toko, saya ingin mendapatkan peringatan (restock alert) apabila ada produk yang stoknya mulai menipis.
- [ ] Sebagai pemilik toko, saya ingin dapat mengelola (tambah, edit, hapus) data produk dan stok secara manual jika diperlukan.
- [ ] Sebagai pemilik toko, saya ingin melihat antrean pesanan masuk (order online) dan memantau status pesanan tersebut secara real-time.
