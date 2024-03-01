import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import InviteModal from "./InviteModal";
import { updateBoardSuccess } from "../redux/task/taskSlice";

const DashCard = ({ board }) => {
  const [editedtitle, seteditedTitle] = useState(board.title || "");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [singleData, setSingleData] = useState(board);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editError, setEditError] = useState(null);
  const [tab, setTab] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const navigate = useNavigate();

  const handleEditTitle = async () => {
    try {
      const res = await fetch(
        `api/board/update/${board._id}/${currentUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editedtitle,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setEditError(data.message);
      } else {
        setSingleData({
          ...singleData,
          title: editedtitle,
        });
        dispatch(updateBoardSuccess(data));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white p-2 rounded-md overflow-hidden  ">
      <div className="">
        <h3 className="text-xl font-semibold truncate">{singleData.title}</h3>
        <p className="text-sm text-gray-400">
          Owned by {currentUser._id === board.createdBy ? "you" : board.name}
        </p>
      </div>
      <div className="mt-4 flex gap-6">
        <div className="flex gap-2">
          {currentUser._id === board.createdBy && (
            <>
              <Button
                className="text-blue-700"
                onClick={() => setShowInviteModal(true)}
                color="white"
              >
                <FiUserPlus className="mr-2" /> invite
              </Button>
              <Button
                className="text-blue-700"
                onClick={() => setShowModal(true)}
                color="white"
              >
                <FaPen className="mr-2" /> Edit board
              </Button>
            </>
          )}
        </div>
        <div>
          {(currentUser._id === board.createdBy ||
            board.users.includes(currentUser._id)) && (
            <Button
              onClick={() => navigate(`/dashboard/${board._id}`)}
              className="text-blue-700"
              color="white"
            >
              Open
            </Button>
          )}
        </div>
        <div>
          {currentUser._id === board.createdBy && (
            <Button
              onClick={() => setShowDeleteModal(true)}
              className="text-red-500"
              color="white"
            >
              X
            </Button>
          )}
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
          <div className="flex flex-col gap-2 ">
            <div className="">
              <p>Update board Title</p>
              <TextInput
                value={editedtitle}
                onChange={(e) => seteditedTitle(e.target.value)}
                placeholder="Enter board name"
              ></TextInput>
            </div>
            <div>
              <div className="flex justify-between gap-2">
                <Button
                  className="  w-full hover:bg-red-500"
                  onClick={() => {
                    setShowModal(false);
                    seteditedTitle("");
                  }}
                  color="red"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEditTitle}
                  disabled={editedtitle === ""}
                  className="w-full"
                >
                  Edit
                </Button>
              </div>
              {editError && (
                <Alert className="mt-5" color={"failure"}>
                  {editError}
                </Alert>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <div className="text-md font-semibold">
              Are you sure you want to Delete this board?
            </div>
            <div className="flex gap-2 justify-between mt-3">
              <Button
                className="w-full"
                color="blue"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button className="w-full" color="red">
                Yes,Delete
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <InviteModal
        board={board}
        showModal={showInviteModal}
        setShowModal={setShowInviteModal}
      />
    </div>
  );
};

export default DashCard;
