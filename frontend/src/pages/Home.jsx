import React from "react";

import OAuth from "../components/OAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser) {
    return <Navigate to="/dashboard?tab=dash" />;
  }

  return (
    <div className="flex flex-col h-screen justify-between mb-0 ">
      <h3 className="text-2xl text-center font-medium mt-[150px]">
        Kan<span className="text-blue-700">Board</span>
      </h3>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold">Welcome to Kanboard</h1>
        <OAuth />
      </div>
      <div className="border mb-0  mt-10 bg-purple-200">
        <div className="border mb-0 flex flex-col items-center justify-center   mt-10 bg-purple-300">
          <div className="border mb- w-[90%] flex flex-col justify-center items-center mt-10 bg-purple-400">
            <div className="border mb-0 w-[90%]  h-[20vh] mt-10 bg-purple-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
