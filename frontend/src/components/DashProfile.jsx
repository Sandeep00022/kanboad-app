import { Avatar, Button } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  bg-[#F5F5F6]  flex flex-col items-center    p-3 w-full">
      <div className=" flex items-center gap-2 mt-10">
        <Avatar img={currentUser?.profilePicture} rounded />
        <div>
          <h4 className="text-xl ">{currentUser.username}</h4>
          <h6 className="text-sm">{currentUser.email}</h6>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="border-red-600 mt-3 bg-white p-1 text-red-600 rounded-lg w-[300px]"
      >
        Logout
      </button>
    </div>
  );
};

export default DashProfile;
