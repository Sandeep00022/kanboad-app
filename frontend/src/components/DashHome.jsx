import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Spinner, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import DashCard from "./DashCard";
import {
  createBoardSuccess,
  recentlyVisitedBoardSuccess,
  taskInSuccess,
} from "../redux/task/taskSlice";
import { space } from "postcss/lib/list";
import { useNavigate } from "react-router-dom";

const DashHome = () => {
  const [showModal, setShowModal] = useState(null);
  const [title, setTitle] = useState("");
  const [postError, setPostError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { boards, recentVisitedBoards } = useSelector((state) => state.task);

  

  const present = boards.filter((board) => board.createdBy === currentUser._id);
 

  const HandleTitle = async () => {
    setCreateLoading(true);
    if (!title || title === "") {
      setPostError("please enter a title");
      return;
    }
    try {
      const res = await fetch(`/api/board/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPostError(data.message);
      } else {
        setTitle("");
        setPostError(null);
        setShowModal(false);
        navigate("/dashboard?tab=board");
        dispatch(createBoardSuccess(data));
      }
      setCreateLoading(false);
    } catch (error) {
      console.log(error);

      setCreateLoading(false);
    }
  };

  const getBoards = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/board?limit=3");
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setLoading(false);
        dispatch(taskInSuccess(data.boards));
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
    <div className=" bg-[#F5F5F6]  flex flex-col  p-3 w-full">
      {!present.length && (
        <div className="text-center items-center justify-center">
          <h3 className="text-xl font-bold">Nothing to show here</h3>
          <h4 className="text-xl text-gray-400">Create or join new board</h4>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 mt-4 text-white p-2 rounded-lg"
          >
            Create New Board
          </button>
        </div>
      )}
      <div className="mb-3">
        <h5 className="text-sm font-semibold">
          Recently viewed(Last {recentVisitedBoards?.length} Boards)
        </h5>
      </div>
      <div className="flex gap-2 flex-wrap">
        {recentVisitedBoards &&
          recentVisitedBoards?.map((board) => (
            <DashCard key={board._id} board={board} />
          ))}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-2 ">
            <div className="">
              <p>Create new board</p>
              <TextInput
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter board name"
              ></TextInput>
            </div>
            <div>
              <div className="flex justify-between gap-2">
                <Button
                  className="  w-full hover:bg-red-500"
                  onClick={() => {
                    setShowModal(false);
                    setTitle("");
                  }}
                  color="red"
                >
                  Cancel
                </Button>
                <Button
                  onClick={HandleTitle}
                  disabled={title === ""}
                  className="w-full"
                >
                  {loading ? (
                    <span>
                      <Spinner /> creating Board
                    </span>
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
              {postError && (
                <Alert className="mt-5" color={"failure"}>
                  {postError}
                </Alert>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashHome;
