"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AnimatePresence } from 'framer-motion'; // 1. Import Framer Motion
import { LOCATIONS, Location } from '@/constants/map-data';
import MapTooltip from './MapTooltip';
import '@/styles/map-marker.css';

// Hàm lấy icon
const getIcon = (type: string) => {
    switch (type) {
        case 'beach': return '🌊';
        case 'city': return '🏙️';
        case 'mountain': return '⛰️';
        case 'forest': return '🌲';
        default: return '📍';
    }
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function MapSection() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  
  // State quản lý Hover
  const [hoverInfo, setHoverInfo] = useState<{ x: number, y: number, data: Location } | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // --- KHỞI TẠO MAP ---
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [107.0843, 10.3460],
      zoom: 6,
      projection: 'globe' as any,
    });

    // Hiệu ứng sương mù
    map.current.on('style.load', () => {
        map.current?.setFog({
            'color': 'rgb(12, 20, 35)', 
            'high-color': 'rgb(20, 30, 60)', 
            'space-color': 'rgb(11, 11, 25)',
            'star-intensity': 0.8
        });
    });

    // Sự kiện Map
    map.current.on('move', () => setHoverInfo(null));
    map.current.on('zoom', () => setHoverInfo(null));

    // --- VẼ MARKERS ---
    LOCATIONS.forEach((loc) => {
      const el = document.createElement('div');
      el.className = 'rpg-marker';
      el.innerHTML = `<div class="marker-icon">${getIcon(loc.type)}</div>`;

      // Hover Vào
      el.addEventListener('mouseenter', (e) => {
        e.stopPropagation();
        if (!map.current) return;
        
        const point = map.current.project(loc.coordinates);
        setHoverInfo({ x: point.x, y: point.y, data: loc });
        el.classList.add('active');
      });

      // Hover Ra
      el.addEventListener('mouseleave', () => {
        setHoverInfo(null);
        el.classList.remove('active');
      });

      // Click
      el.addEventListener('click', () => {
          map.current?.flyTo({ center: loc.coordinates, zoom: 12, speed: 1.5 });
      });

      new mapboxgl.Marker(el).setLngLat(loc.coordinates).addTo(map.current!);
    });

  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />

      {/* 2. Bọc AnimatePresence để xử lý hiệu ứng biến mất */}
      <AnimatePresence>
        {hoverInfo && (
            <MapTooltip 
                key="map-tooltip" // Cần key để React phân biệt
                x={hoverInfo.x} 
                y={hoverInfo.y} 
                data={hoverInfo.data} 
            />
        )}
      </AnimatePresence>

    </div>
  );
}