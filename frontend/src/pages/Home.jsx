import React from "react";

import OAuth from "../components/OAuth";
const Home = () => {
  return (
    <div className="">
      <h3 className="text-2xl text-center font-italic mt-9">
        Kan<span className="text-blue-700">Board</span>
      </h3>
      <div className="flex flex-col items-center justify-center pt-[100px] ">
        <h1 className="text-4xl font-semibold">Welcome to Kanboard</h1>
        <OAuth />
      </div>
      <div className="border mb-0  mt-10 bg-purple-200">
        <div className="border mb-0 flex flex-col items-center justify-center   mt-10 bg-purple-300">
          <div className="border mb- w-[90%] flex flex-col justify-center items-center mt-10 bg-purple-400">
            <div className="border mb-0 w-[90%]  h-[50vh] mt-10 bg-purple-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
