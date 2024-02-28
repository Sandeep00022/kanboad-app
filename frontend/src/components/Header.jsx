import { Avatar, Navbar } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  //   console.log(currentUser);

  return (
    <div className="border-2  flex justify-between p-2">
      <div className=" mr-[-100px]">
        <Link to="/dashboard?tab=dash">
          <h3 className=" text-2xl text-center font-medium">
            Kan<span className="text-blue-700">Board</span>
          </h3>
        </Link>
      </div>
      <Link to="dashboard?tab=profile">
        <div className=" flex items-center gap-2 hover:cursor-pointer ">
          {currentUser ? (
            <>
              <h4>{currentUser.username}</h4>
              <Avatar img={currentUser?.profilePicture} rounded />
            </>
          ) : (
            ""
          )}
        </div>
      </Link>
    </div>
  );
};

export default Header;
