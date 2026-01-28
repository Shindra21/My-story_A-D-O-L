// src/constants/map-locations.ts
export const MAP_LOCATIONS = [
  
   {
  id: "vung-tau",
  name: "Vũng Tàu",
  provinceName: "Ba Ria - Vung Tau", // PHẢI CÓ DẤU CÁCH XUNG QUANH DẤU GẠCH
  coords: [107.08426, 10.34599] as [number, number],
  status: "unlocked",
  },
  {
    id: "da-lat",
    name: "Đà Lạt",
    provinceName: "Lam Dong", // Thêm dòng này luôn cho đồng bộ
    coords: [108.45831, 11.94041] as [number, number],
    status: "locked",
  }
];