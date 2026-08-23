import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DesktopSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="flex-1 max-w-2xl w-full mx-auto md:py-8">{children}</div>
        <BottomNavigation />
      </div>
    </div>
  );
}
