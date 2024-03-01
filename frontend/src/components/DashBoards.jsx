import React, { useEffect, useState } from "react";
import DashCard from "./DashCard";
import { Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { taskInSuccess } from "../redux/task/taskSlice";

const DashBoards = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.task);

  const getBoards = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://kanboad-app-1.onrender.com/api/board");
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(taskInSuccess(data.boards));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center item-center w-full min-h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className=" bg-[#F5F5F6] p-3 w-full">
      <div className="mb-3">
        <h5 className="text-sm font-semibold">
          All Boards ({boards.length})
        </h5>
      </div>
      <div className="flex gap-2 flex-wrap">
        {boards &&
          boards.map((board) => <DashCard key={board._id} board={board} />)}
      </div>
    </div>
  );
};

export default DashBoards;
