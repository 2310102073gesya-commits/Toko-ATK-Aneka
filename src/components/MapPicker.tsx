"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  defaultLocation?: { lat: number; lng: number };
}

// Komponen internal: klik peta untuk pin
function LocationMarker({ position, setPosition, onLocationSelect }: any) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return position === null ? null : <Marker position={position} icon={customIcon} />;
}

// Komponen internal: gerak ke koordinat baru
function MapMover({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo(target, 16, { duration: 1.2 });
  }, [target, map]);
  return null;
}

// Hasil pencarian Nominatim
interface HasilGeo {
  display_name: string;
  lat: string;
  lon: string;
}

export default function MapPicker({ onLocationSelect, defaultLocation }: MapPickerProps) {
  const center = defaultLocation || { lat: -1.265386, lng: 116.831200 };
  const [position, setPosition] = useState<L.LatLngExpression | null>(
    defaultLocation ? [defaultLocation.lat, defaultLocation.lng] : null
  );
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);

  // State pencarian
  const [cari, setCari] = useState("");
  const [hasil, setHasil] = useState<HasilGeo[]>([]);
  const [loadingCari, setLoadingCari] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Debounce pencarian alamat
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (cari.trim().length < 3) { setHasil([]); return; }

    debounceRef.current = setTimeout(async () => {
      setLoadingCari(true);
      try {
        const q = encodeURIComponent(cari + " Indonesia");
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=6&addressdetails=1&countrycodes=id`);
        const data = await res.json();
        setHasil(data);
        setShowDropdown(true);
      } catch (_) { }
      setLoadingCari(false);
    }, 600);
  }, [cari]);

  const pilihHasil = (item: HasilGeo) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    const pos: [number, number] = [lat, lng];
    setPosition(pos);
    setFlyTarget(pos);
    onLocationSelect(lat, lng);
    setCari(item.display_name);
    setShowDropdown(false);
    setHasil([]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>

      {/* ===== Kotak Pencarian Alamat ===== */}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", border: "1px solid #ECEAE3", borderRadius: 10, padding: "8px 12px" }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <input
            type="text"
            value={cari}
            onChange={e => { setCari(e.target.value); setShowDropdown(true); }}
            onFocus={() => hasil.length > 0 && setShowDropdown(true)}
            placeholder="Cari nama jalan / kelurahan / patokan…"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: "'Times New Roman', Times, serif", background: "transparent" }}
          />
          {loadingCari && <span style={{ fontSize: 11, color: "#888" }}>Mencari...</span>}
          {cari && <button onClick={() => { setCari(""); setHasil([]); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 16, lineHeight: 1 }}>✕</button>}
        </div>

        {/* Dropdown hasil */}
        {showDropdown && hasil.length > 0 && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "white", border: "1px solid #ECEAE3", borderRadius: 10, zIndex: 9999, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", marginTop: 4, overflow: "hidden" }}>
            {hasil.map((item, i) => (
              <button key={i} onClick={() => pilihHasil(item)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", border: "none", background: "white", cursor: "pointer", fontSize: 12.5, borderBottom: i < hasil.length - 1 ? "1px solid #f4f1ea" : "none", fontFamily: "'Times New Roman', Times, serif", lineHeight: 1.4 }}
                onMouseEnter={e => (e.currentTarget.style.background = "#FAFAF7")}
                onMouseLeave={e => (e.currentTarget.style.background = "white")}
              >
                <span style={{ marginRight: 6 }}>📍</span>
                {item.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      <p style={{ fontSize: 11, color: "#888", margin: 0 }}>
        Ketik nama jalan lalu pilih dari saran, atau langsung klik titik di peta untuk pasang pin.
      </p>

      {/* ===== Peta Leaflet ===== */}
      <div style={{ height: 280, width: "100%", borderRadius: 12, overflow: "hidden", border: "1px solid #ECEAE3", position: "relative" }}>
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
          onClick={() => setShowDropdown(false)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} onLocationSelect={onLocationSelect} />
          <MapMover target={flyTarget} />
        </MapContainer>

        {/* Label status */}
        <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, background: "rgba(255,255,255,0.92)", padding: "5px 10px", borderRadius: 8, fontSize: 11, textAlign: "center", zIndex: 1000, pointerEvents: "none", fontFamily: "'Times New Roman', Times, serif" }}>
          {position ? "📍 Lokasi terpilih — geser pin jika perlu" : "Cari alamat di atas atau klik peta untuk pasang pin"}
        </div>
      </div>
    </div>
  );
}
