import { Avatar, Button } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="  bg-[#F5F5F6]  flex flex-col items-center    p-3 w-full">
      <div className=" flex items-center gap-2 mt-10">
        <Avatar img={currentUser?.profilePicture} rounded />
        <div>
          <h4 className="text-xl ">{currentUser.username}</h4>
          <h6 className="text-sm">{currentUser.email}</h6>
        </div>
      </div>
      <button className="border-red-600 mt-3 bg-white p-1 text-red-600 rounded-lg w-[300px]">
        Logout
      </button>
    </div>
  );
};

export default DashProfile;
