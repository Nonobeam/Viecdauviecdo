import ChangeColorToggle from "@/components/ChangeColorToggle";
import { Outlet } from "react-router-dom";

const PaymentLayout = () => {
  return (
    <div className={`min-h-screen bg-background`}>
      <Outlet />
    </div>
  );
}

export default PaymentLayout;
