import React, { useState } from "react";
import DashSidebar from "../components/DashSidebar";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Alert,
  Button,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { FaPen, FaPlus } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";

const SingleBoard = () => {
  const { boards } = useSelector((state) => state.task);
  const [showModal, setShowModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [userIdsError, setUserIdsError] = useState(null);

  const storeUserIds = (id, name) => {
    let payload = {
      id: id,
      name: name,
    };

    if (
      !userIds.some(
        (user) => user.id === payload.id && user.name === payload.name
      )
    ) {
      setUserIds([...userIds, payload]);
    }
  };

  const handleIvitedUser = async () => {
    if (userIds.length == 0) {
      return setUserIdsError("select user first");
    }
    try {
      const res = await fetch(
        `/api/board/update/${board._id}/${board.createdBy}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            users: userIds.map((user) => user.id),
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setUserIdsError(data.message);
      } else {
        setShowInviteModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userIds);
  const { id } = useParams();
  const board = boards.find((board) => board._id === id);

  const handleSearchUser = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/user?search=${query}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data);
        setSelectedUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      <div className=" border border-b-red-500 bg-[#F5F5F6] flex flex-col items-center p-3 w-full">
        <div className=" flex justify-between w-full bg-white">
          <div className="flex  items-center gap-2">
            <p className="font-semibold">{board.title}</p>
            <Button
              onClick={() => setShowInviteModal(true)}
              className="text-blue-700"
              color="white"
            >
              <FiUserPlus className="mr-2" /> invite
            </Button>
          </div>
          <div className="">
            <Button
              className="text-blue-700"
              onClick={() => setShowModal(true)}
              color="white"
            >
              <FaPen className="mr-2" /> Edit board
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="border border-red-500">
            <div className="flex justify-between items-center gap-[200px] w-full">
              <h3 className="text-sm font-semibold">Unassigned</h3>
              <div className=" flex gap-2">
                <h4 className="text-sm font-semibold">6</h4>
                <button>
                  <BsThreeDotsVertical />
                </button>
              </div>
            </div>
            <Button
              onClick={() => {
                setTaskStatus("Unassigned");
                setShowModal(true);
              }}
              color="blue"
              className="w-full mt-3"
            >
              <FaPlus className="mr-2" /> Add Task
            </Button>
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <form>
            <div className="">
              <p>
                Add new task to:{" "}
                <span className="font-semibold">{taskStatus}</span>
              </p>
            </div>
            <div className="">
              {" "}
              <TextInput
                className="mt-2"
                type="text"
                placeholder="Enter task title"
              />
              <TextInput
                className="mt-2"
                type="date"
                placeholder="Select deadline"
              />
              <Select className="mt-2">
                <option value="">Assign to</option>
              </Select>
              <Textarea className="mt-2" placeholder="Enter decription here" />
            </div>
            <div className="flex justify-between mt-2 gap-2">
              <Button color="gray" className="w-full" outline>
                Cancel
              </Button>
              <Button color="blue" className="w-full">Add Task</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* inviite user modal */}
      <Modal
        show={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex gap-2">
            <TextInput
              onChange={(e) => handleSearchUser(e.target.value)}
              className="w-full"
              placeholder="Invite other users"
            />
          </div>
          <div className="flex gap-2 m-3">
            {userIds.length &&
              userIds.map((name) => (
                <div
                  className="flex gap-1  p-2 w-[85px] bg-green-600 rounded-lg text-white "
                  key={name.id}
                >
                  <p className="truncate"> {name.name}</p>
                  <button
                    onClick={() =>
                      setUserIds((prev) =>
                        prev.filter((user) => user.id !== name.id)
                      )
                    }
                    className="hover:text-red-600"
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
          <div>
            {selectedUsers &&
              selectedUsers.map((user) => (
                <div
                  className="flex justify-between border border-gray-300 rounded-md mt-1 p-2 hover:bg-blue-400 hover:text-white"
                  key={user._id}
                  onClick={() => storeUserIds(user._id, user.username)}
                >
                  <p className="line-clamp-2">{user.username}</p>
                </div>
              ))}
          </div>
          <Button
            onClick={handleIvitedUser}
            className="w-full mt-2"
            color="blue"
          >
            Invite Selected Users
          </Button>
          {userIdsError && (
            <Alert className="mt-5" color={"failure"}>
              {userIdsError}
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SingleBoard;
