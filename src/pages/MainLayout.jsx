import { Outlet } from "react-router-dom";
import ChangeColorToggle from "@/components/ChangeColorToggle";
import DarkModeToggle from "@/components/DarkModeToggle";
import Header from "@/components/Header";
import { useDarkMode } from "@/hooks/DarkModeContext";

export default function MainLayout() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <ChangeColorToggle />
      <DarkModeToggle />
      <Header />
      <Outlet />
    </div>
  );
}
