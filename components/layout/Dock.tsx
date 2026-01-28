"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS } from "@/constants"; 

export default function Dock() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      {/* Container chính: Glassmorphism sạch sẽ */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        
        {NAV_ITEMS.map((item) => (
          <Link href={`#${item.id}`} key={item.id}>
            <motion.div
              onHoverStart={() => setHovered(item.id)}
              onHoverEnd={() => setHovered(null)}
              // Animation "Magnification" mượt mà
              whileHover={{ scale: 1.3, y: -5, margin: "0 10px" }}
              whileTap={{ scale: 0.9 }}
              className="relative p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Icon lấy từ config */}
              <item.icon 
                size={20} 
                className={`transition-colors duration-300 ${
                  hovered === item.id ? item.color : "text-white/60"
                }`} 
              />

              {/* Tooltip hiển thị tên */}
              {hovered === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -45, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 border border-white/10 rounded-lg backdrop-blur-md"
                >
                  <span className="text-[10px] font-bold tracking-wider text-white uppercase whitespace-nowrap">
                    {item.name}
                  </span>
                  {/* Mũi tên nhỏ trỏ xuống */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45 border-r border-b border-white/10"></div>
                </motion.div>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}