import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBoardSuccess } from "../redux/task/taskSlice";

const BoardEditModal = ({ setShowModal, board, showModal }) => {
  const [editedtitle, seteditedTitle] = useState(board.title || "");
  const [editError, setEditError] = useState(null);
  const [singleData, setSingleData] = useState(board);
  console.log("board in modal", board);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleEditTitle = async () => {
    try {
      const res = await fetch(
        `https://kanboad-app-1.onrender.com/api/board/update/${board._id}/${currentUser._id}`,
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
        console.log("updatedData",data)
       dispatch(updateBoardSuccess(data));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default BoardEditModal;
