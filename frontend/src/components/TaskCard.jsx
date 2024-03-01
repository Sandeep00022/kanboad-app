import { Avatar, Button, Modal, Tooltip } from "flowbite-react";
import React, { useState } from "react";
import TaskEditModal from "./TaskEditModal";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div>
      <Draggable draggableId={task._id.toString()} index={index}>
        {(provided) => (
          <div
            onClick={() => setShowModal(true)}
            className="p-3 m-2 bg-[#F5F5F6] rounded-md hover:cursor-pointer"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold">{task.title}</div>
              <div className="">
                {task.assignedUser && task.status !== "Unassigned" ? (
                  <Tooltip content={task.assignedUser?.email}>
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
              <p className="text-xs text-gray-500 line-clamp-2">
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
        size="md"
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
            <div className="mt-3">
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
