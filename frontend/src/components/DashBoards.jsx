import React, { useEffect, useState } from "react";
import DashCard from "./DashCard";
import { Button, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { taskInSuccess } from "../redux/task/taskSlice";
import { useNavigate } from "react-router-dom";

const DashBoards = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.task);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const accessCardUser = boards.filter(
    (board) =>
      board.createdBy === currentUser._id ||
      board.users.includes(currentUser._id)
  );

  const getBoards = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/board");
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
          All Boards ({accessCardUser.length})
        </h5>
      </div>
      {accessCardUser.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-5">
          <p className="text-xl font-semibold">
            You don't have any Board, Creat one by visiting Home!
          </p>
          <Button
            className="mt-4"
            color="blue"
            onClick={() => navigate("/dashboard?tab=dash")}
          >
            Home
          </Button>
        </div>
      )}
      <div className="flex gap-2 flex-wrap">
        {boards &&
          boards.map((board) => <DashCard key={board._id} board={board} />)}
      </div>
    </div>
  );
};

export default DashBoards;
