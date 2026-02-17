import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useEffect } from "react";
import { useUpgrade } from "../context/UpgradeContext";
import { setUpgradeHandler } from "../api/upgradeHandler";
import UpgradeModal from "../components/UpgradeModal";

const AppLayout = () => {
    const { showUpgrade } = useUpgrade();

useEffect(() => {
  setUpgradeHandler(showUpgrade);
}, []);

  return (
<div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout