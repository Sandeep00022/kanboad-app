import React, { useState } from "react";
import { Modal, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const InviteModal = ({ showModal, setShowModal, board, onget }) => {
  const [userIdsError, setUserIdsError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userIds, setUserIds] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleSearchUser = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`https://kanboad-app-1.onrender.com/api/user?search=${query}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data);
        setSelectedUsers(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvite = async () => {
    if (userIds.length == 0) {
      return setUserIdsError("select user first");
    }
    try {
      const res = await fetch(
        `https://kanboad-app-1.onrender.com/api/board/update/${board._id}/${board.createdBy}`,
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
        setShowModal(false);
        onget();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
      <Modal.Header />
      <Modal.Body>
        <div className="flex gap-2">
          <TextInput
            onChange={(e) => handleSearchUser(e.target.value)}
            className="w-full"
            placeholder="Invite other users"
          />
        </div>
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
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
        )}
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
        <Button onClick={handleInvite} className="w-full mt-2" color="blue">
          Invite Selected Users
        </Button>
        {userIdsError && (
          <Alert className="mt-5" color={"failure"}>
            {userIdsError}
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default InviteModal;
