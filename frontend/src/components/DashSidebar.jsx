import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { CiHome } from "react-icons/ci";
import { HiUser } from "react-icons/hi";
import { LuClipboardSignature } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
const DashSidebar = () => {
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
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=dash"}>
            <Sidebar.Item
              active={tab === "dash" || !tab}
              as="div"
              icon={CiHome}
            >
              Home
            </Sidebar.Item>
          </Link>
          <Link to={"/dashboard?tab=board"}>
            <Sidebar.Item
              style={{ backgroundColor: tab === "board" ? "#E9EBFC" : "" }}
              active={tab === "board"}
              as="div"
              icon={LuClipboardSignature}
            >
              Boards
            </Sidebar.Item>
          </Link>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item active={tab === "profile"} icon={HiUser} as="div">
              Profile
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
