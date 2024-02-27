import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashBoards from "../components/DashBoards";
import DashHome from "../components/DashHome";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "board" && <DashBoards />}
      {tab === "dash" && <DashHome />}
    </div>
  );
};

export default Dashboard;
