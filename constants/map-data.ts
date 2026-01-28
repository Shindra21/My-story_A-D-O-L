// app/constants/map-data.ts

export interface Location {
  id: string;
  name: string;
  type: 'beach' | 'city' | 'mountain' | 'forest'; // Định nghĩa các loại địa hình
  coordinates: [number, number]; // [Kinh độ, Vĩ độ]
  desc: string;
  img: string;
}

export const LOCATIONS: Location[] = [
  {
    id: 'vung-tau',
    name: 'Vung Tau City',
    type: 'beach',
    coordinates: [107.0843, 10.3460], 
    desc: 'The Starting Point. Lv.1',
    img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'sai-gon',
    name: 'Ho Chi Minh City',
    type: 'city',
    coordinates: [106.660172, 10.762622],
    desc: 'Quest Hub. Lv.21',
    img: 'https://images.unsplash.com/photo-1560965318-7b4455f5247f?q=80&w=400&auto=format&fit=crop',
  }
  // Muốn thêm địa điểm mới? Copy đoạn trên paste xuống dưới là xong!
];