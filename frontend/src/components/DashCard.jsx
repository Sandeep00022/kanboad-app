import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { useSelector } from "react-redux";

const DashCard = ({ board }) => {
  const [editedtitle, seteditedTitle] = useState(board.title || "");
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [editError, setEditError] = useState(null);

  console.log(board.title);

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
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
          <Button className="text-blue-700" color="white">
            Open
          </Button>
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
              <p>Create new board</p>
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
    </div>
  );
};

export default DashCard;
