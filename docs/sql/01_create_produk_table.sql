-- Hapus tabel jika sudah ada agar skemanya bersih (termasuk dependensinya)
DROP TABLE IF EXISTS public.produk CASCADE;

-- Buat tabel produk
CREATE TABLE public.produk (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_produk TEXT NOT NULL,
    kategori TEXT NOT NULL,
    merek TEXT,
    harga NUMERIC NOT NULL,
    stok INTEGER NOT NULL DEFAULT 0,
    rating NUMERIC DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.produk ENABLE ROW LEVEL SECURITY;

-- Buat policy agar semua orang bisa membaca (SELECT) data produk
CREATE POLICY "Public profiles are viewable by everyone."
ON public.produk FOR SELECT
USING ( true );

-- Insert dummy data
INSERT INTO public.produk (nama_produk, kategori, merek, harga, stok, rating, image_url)
VALUES
    ('Pulpen Gel Hitam', 'Alat Tulis', 'Standard', 4500, 340, 4.8, 'https://via.placeholder.com/150/1c2331/d4af37?text=Pulpen+Gel'),
    ('Buku Tulis 38 Lembar', 'Buku', 'Sinar Dunia', 3500, 520, 4.9, 'https://via.placeholder.com/150/1c2331/d4af37?text=Buku+Tulis'),
    ('Lakban Bening Besar', 'Perlengkapan', 'Daimaru', 12000, 155, 4.7, 'https://via.placeholder.com/150/1c2331/d4af37?text=Lakban'),
    ('Kertas HVS A4 70gsm', 'Kertas', 'PaperOne', 55000, 50, 4.9, 'https://via.placeholder.com/150/1c2331/d4af37?text=Kertas+HVS'),
    ('Spidol Boardmarker Hitam', 'Alat Tulis', 'Snowman', 8500, 120, 4.8, 'https://via.placeholder.com/150/1c2331/d4af37?text=Spidol');
