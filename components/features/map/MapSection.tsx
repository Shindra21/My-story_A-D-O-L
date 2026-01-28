"use client";
import { useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// 1. DỮ LIỆU ĐỊA ĐIỂM (Data nằm luôn tại đây cho sạch)
const MAP_LOCATIONS = [
  {
    id: "vung-tau",
    name: "Vũng Tàu",
    coords: [107.08426, 10.34599] as [number, number],
  },
  {
    id: "da-lat",
    name: "Đà Lạt",
    coords: [108.45831, 11.94041] as [number, number],
  },
  {
    id: "dong-nai",
    name: "Đồng Nai",
    coords: [107.05, 10.95] as [number, number],
  }
];

export default function MapSection() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !mapContainerRef.current || mapRef.current) return;

    // --- FIX LỖI ACCESS TOKEN ---
    const mb = mapboxgl as any;
    const actualMapbox = mb.default || mb;
    actualMapbox.accessToken = token;

    // 2. KHỞI TẠO BẢN ĐỒ
    const mapInstance = new actualMapbox.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11", // Style tối chuyên nghiệp
      center: [108.2772, 14.0583],
      zoom: 4.5,
      projection: { name: 'globe' } // Hiệu ứng quả địa cầu
    });

    mapRef.current = mapInstance;

    // Hiệu ứng xoay nhẹ quả địa cầu khi mới vào
    mapInstance.on('style.load', () => {
      mapInstance.setFog({
        color: 'rgb(186, 210, 235)', // Màu khí quyển
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.02,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6
      });
    });

    // 3. VẼ MARKERS VÀ HIỆU ỨNG CLICK
    MAP_LOCATIONS.forEach((point) => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      
      el.innerHTML = `
        <div class="marker-glow"></div>
        <div class="marker-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3" fill="black"/>
          </svg>
        </div>
        <div class="marker-label">${point.name}</div>
      `;

      // Khi bấm vào ghim, bản đồ sẽ lướt (FlyTo) đến đó
      el.addEventListener('click', () => {
        mapInstance.flyTo({
          center: point.coords,
          zoom: 10,
          speed: 1.2,
          curve: 1.4,
          essential: true
        });
      });

      new actualMapbox.Marker({
        element: el,
        anchor: 'bottom' // Chốt chân ghim không bị trôi
      })
      .setLngLat(point.coords)
      .addTo(mapInstance);
    });

    return () => mapInstance.remove();
  }, [token]);

  return (
    <section className="w-full h-screen bg-black relative overflow-hidden">
      {/* 4. CSS ĐƯỢC NHÚNG TRỰC TIẾP - KHÔNG LO SAI ĐƯỜNG DẪN */}
      <style jsx global>{`
        .custom-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }

        .marker-glow {
          position: absolute;
          bottom: 0;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(250, 204, 21, 0.4) 0%, rgba(250, 204, 21, 0) 70%);
          border-radius: 50%;
          transform: translateY(50%);
          z-index: -1;
          animation: pulse 2s infinite ease-in-out;
        }

        .marker-icon {
          color: #facc15;
          filter: drop-shadow(0 0 8px rgba(250, 204, 21, 0.6));
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .custom-marker:hover .marker-icon {
          transform: scale(1.3) translateY(-5px);
          color: #fff;
        }

        .marker-label {
          color: white;
          font-size: 11px;
          font-weight: 600;
          background: rgba(0, 0, 0, 0.7);
          padding: 2px 10px;
          border-radius: 20px;
          margin-top: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          white-space: nowrap;
          pointer-events: none;
        }

        @keyframes pulse {
          0%, 100% { transform: translateY(50%) scale(0.8); opacity: 0.3; }
          50% { transform: translateY(50%) scale(1.1); opacity: 0.5; }
        }
      `}</style>

      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Lớp phủ hiệu ứng điện ảnh cho các cạnh màn hình */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
      
      {/* Nút Reset View (Tùy chọn) */}
      <div className="absolute top-10 right-10 flex flex-col gap-2">
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 text-white text-xs">
          Hành trình của Nhật Anh
        </div>
      </div>
    </section>
  );
}