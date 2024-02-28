import { Button } from "flowbite-react";
import React from "react";
import { FaPen } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { useSelector } from "react-redux";

const DashCard = ({ board }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-white p-2 rounded-md">
      <div className="">
        <h3 className="text-xl font-semibold">{board.title}</h3>
        <p className="text-sm text-gray-400">Owned By {board.name}</p>
      </div>
      <div className="mt-4 flex gap-6">
        <div className="flex gap-2">
          {currentUser._id === board.createdBy && (
            <>
              <Button className="text-blue-700" color="white">
                <FiUserPlus className="mr-2" /> invite
              </Button>
              <Button className="text-blue-700" color="white">
                <FaPen className="mr-2" /> Edit board
              </Button>
            </>
          )}
        </div>
        <div>
          <Button className="text-blue-700" color="white">
            Open
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashCard;
