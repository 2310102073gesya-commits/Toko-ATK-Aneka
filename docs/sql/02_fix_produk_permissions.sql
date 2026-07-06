-- Berikan akses ke role 'anon' (pengguna publik/tanpa login) untuk membaca tabel produk
GRANT SELECT ON public.produk TO anon;

-- Berikan akses ke role 'authenticated' (pengguna yang login) untuk membaca tabel produk
GRANT SELECT ON public.produk TO authenticated;
