
import MapSection from "@/components/features/map/MapSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      <MapSection />
      {/* Tạm thời để một dòng chữ để biết web đang chạy */}
      <h1 className="text-4xl font-thin tracking-[0.5em] uppercase text-white/50">
        Nhat Anh <span className="text-white">Portfolio</span>
      </h1>
    </main>
  );
}