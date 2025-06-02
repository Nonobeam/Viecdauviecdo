import ChangeColorToggle from "@/components/ChangeColorToggle";
import DarkModeToggle from "@/components/DarkModeToggle";
import useDarkMode from "@/hooks/useDarkMode";
import { Outlet } from "react-router-dom";

const PaymentLayout = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <ChangeColorToggle />
      <DarkModeToggle />
      <Outlet />
    </div>
  );
}

export default PaymentLayout;
