import { Avatar, Button, Modal, Tooltip } from "flowbite-react";
import React, { useState } from "react";
import TaskEditModal from "./TaskEditModal";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskSuccess } from "../redux/task/taskSlice";

const TaskCard = ({ task, index }) => {
  console.log(index);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`/api/task/deleteTask/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(deleteTaskSuccess(taskId));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(currentUser._id, task.assignedUser?._id);

  return (
    <div>
      <Draggable draggableId={task._id} index={index}>
        {(provided) => (
          <div
            onClick={() => setShowModal(true)}
            className={`p-3 m-2 ${
              task.status === "Done"
                ? "bg-green-300"
                : currentUser._id === task.assignedUser?._id
                ? "bg-orange-400"
                : "bg-sky-400"
            } rounded-md hover:cursor-pointer`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold">{task.title}</div>
              <div className="">
                {task.assignedUser && task.status !== "Unassigned" ? (
                  <Tooltip
                    content={
                      currentUser.email === task.assignedUser?.email
                        ? "You"
                        : task.assignedUser?.email
                    }
                  >
                    <Avatar img={task.profilePicture} rounded />
                  </Tooltip>
                ) : (
                  <Tooltip content={"task not asssigned"}>
                    <Avatar img={task.profilePicture} rounded />
                  </Tooltip>
                )}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-700 line-clamp-2">
                {task.description}
              </p>
            </div>
          </div>
        )}
      </Draggable>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="xl"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="p-1">
            <div className="flex items-center justify-between">
              <div>
                <p>
                  {" "}
                  Viewing task to:{" "}
                  <span className="font-semibold">{task.status}</span>
                </p>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setShowEditModal(true);
                    setShowModal(false);
                  }}
                  className="text-blue-600"
                  color="white"
                >
                  Edit task
                </Button>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center gap-10">
              <div>
                <label className="text-xs text-gray-500 mb-2" htmlFor="">
                  Assigned to
                </label>
                <div className="flex items-center gap-2">
                  <Avatar img={task.assignedUser?.profilePicture} rounded />
                  {task.assignedUser ? (
                    <p className="text-sm font-semibold">
                      {task.assignedUser?.email}
                    </p>
                  ) : (
                    <p className="text-sm">Not Assigned</p>
                  )}
                </div>
              </div>
              <div className="font-semibold text-purple-600">
                by: {task.assignedBy}
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs text-gray-500 mb-2" htmlFor="">
                Due date & time
              </label>
              <p className="text-sm text-red-500">
                {new Date(task.dueDate).toLocaleString()}
              </p>
            </div>
            <div className="">
              <label className="text-xs text-gray-500 mb-2" htmlFor="">
                Description
              </label>
              <p className="text-xs">{task.description}</p>
            </div>
            <Button
              onClick={() => deleteTask(task._id)}
              className="w-full mt-2"
              color="red"
            >
              Delete Task
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <TaskEditModal
        showModal={showEditModal}
        task={task}
        setShowModal={setShowEditModal}
      />
    </div>
  );
};

export default TaskCard;
