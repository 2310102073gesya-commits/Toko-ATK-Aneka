-- Buat tabel pesanan
CREATE TABLE IF NOT EXISTS public.pesanan (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_pelanggan TEXT NOT NULL,
    no_wa TEXT NOT NULL,
    alamat TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, lunas, dikirim, selesai
    total_harga NUMERIC NOT NULL,
    kurir TEXT,
    ongkir NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Buat tabel item_pesanan (detail barang yang dibeli)
CREATE TABLE IF NOT EXISTS public.item_pesanan (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pesanan_id UUID REFERENCES public.pesanan(id) ON DELETE CASCADE,
    produk_id UUID REFERENCES public.produk(id) ON DELETE RESTRICT,
    harga_satuan NUMERIC NOT NULL,
    kuantitas INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Aktifkan RLS
ALTER TABLE public.pesanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.item_pesanan ENABLE ROW LEVEL SECURITY;

-- Berikan izin pada public untuk melakukan Insert (membuat pesanan baru)
GRANT INSERT ON public.pesanan TO anon;
GRANT INSERT ON public.pesanan TO authenticated;
GRANT INSERT ON public.item_pesanan TO anon;
GRANT INSERT ON public.item_pesanan TO authenticated;

-- (Opsional: buat policy yang memungkinkan public untuk melakukan INSERT)
CREATE POLICY "Public can insert pesanan" ON public.pesanan FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert item_pesanan" ON public.item_pesanan FOR INSERT WITH CHECK (true);
