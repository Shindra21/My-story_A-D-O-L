import React from 'react';
import { Location } from '@/constants/map-data';
import { motion } from 'framer-motion';

interface MapTooltipProps {
  x: number;
  y: number;
  data: Location;
}

export default function MapTooltip({ x, y, data }: MapTooltipProps) {
  return (
    <motion.div 
        className="pointer-events-none absolute z-50 flex flex-col items-center gap-2"
        style={{ 
            left: x, 
            top: y,
            x: "-50%", // Căn giữa chiều ngang (Giữ nguyên)
        }}
        // --- CẤU HÌNH ANIMATION ĐÃ FIX ---
        
        // 1. Lúc bắt đầu: Kéo lên 100% chiều cao + 15px
        initial={{ opacity: 0, scale: 0.8, y: "calc(-100% - 15px)" }} 

        // 2. Lúc lơ lửng: Kéo lên 100% + dao động từ 25px đến 35px
        animate={{ 
            opacity: 1, 
            scale: 1, 
            // Quan trọng: Dùng calc để giữ vị trí nằm TRÊN marker
            y: ["calc(-100% - 25px)", "calc(-100% - 35px)"] 
        }}   

        // 3. Lúc biến mất
        exit={{ opacity: 0, scale: 0.8, y: "calc(-100% - 15px)" }}

        // 4. Cấu hình chuyển động
        transition={{ 
            // Cấu hình chung
            scale: { type: "spring", stiffness: 300, damping: 25 },
            opacity: { duration: 0.2 },

            // Cấu hình riêng cho Y (Lơ lửng vô tận)
            y: {
                duration: 2,         // Nhịp thở chậm rãi (2s)
                repeat: Infinity,    // Lặp lại mãi mãi
                repeatType: "reverse", // Lên -> Xuống -> Lên
                ease: "easeInOut"    // Mượt mà
            }
        }}
    >
        {/* Khung nội dung */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-[#00ffcc] p-3 rounded-md shadow-[0_0_15px_rgba(0,255,204,0.4)] w-64 text-center">
            
            {/* Ảnh Thumb */}
            <div className="w-full h-24 mb-2 overflow-hidden rounded border border-white/10 relative group">
                <img src={data.img} alt={data.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>

            {/* Tên */}
            <h3 className="text-[#00ffcc] font-serif font-bold tracking-widest uppercase text-sm drop-shadow-md">
                {data.name}
            </h3>
            
            {/* Gạch ngang */}
            <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto my-1"></div>

            {/* Mô tả */}
            <p className="text-[10px] text-gray-300 font-mono">
                {data.desc}
            </p>
        </div>

        {/* Mũi tên (Quan trọng: Đã sửa lại vị trí để nó dính vào đáy box) */}
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#00ffcc] relative -top-[1px]"></div>
    </motion.div>
  );
}