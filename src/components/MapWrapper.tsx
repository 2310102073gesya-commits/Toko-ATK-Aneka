"use client";

import dynamic from "next/dynamic";

// Memuat MapPicker secara dinamis (tanpa SSR) karena Leaflet membutuhkan akses ke object 'window' browser
const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-foreground/5 animate-pulse rounded-xl flex items-center justify-center text-foreground/50 border border-foreground/10">
      <span className="font-semibold tracking-widest text-sm uppercase">Memuat Peta...</span>
    </div>
  )
});

export default MapPicker;
