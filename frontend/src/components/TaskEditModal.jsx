import {
  Alert,
  Button,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTaskSucces, updateTaskSucess } from "../redux/task/taskSlice";

const TaskEditModal = ({ setShowModal, showModal, task }) => {
  const [formError, setFormError] = useState(null);
  const [taskForm, setTaskFrom] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    date: task.dueDate,
  });

  const dispatch = useDispatch();
  const { invitedUsers } = useSelector((state) => state.task);

  const handlechange = (e) => {
    setTaskFrom({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload;
    if (
      task.status === "Unassigned" &&
      taskForm.users &&
      taskForm.status === "Unassigned"
    ) {
      return setFormError("Please select a status other than 'Unassigned'.");
    }
    if (taskForm.users) {
      payload = {
        title: taskForm.title,
        assignedUser: taskForm.users,
        description: taskForm.description,
        dueDate: taskForm.date,
        status: taskForm.status,
      };
    } else {
      payload = {
        title: taskForm.title,
        assignedUser: null,
        description: taskForm.description,
        dueDate: taskForm.date,
        status: taskForm.status,
      };
    }

    try {
      const res = await fetch(`/api/task/editTask/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setFormError(data.message);
      } else {
        setShowModal(false);
        setFormError(null);

        dispatch(updateTaskSucess(data));
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
          <form onSubmit={handleSubmit}>
            <div className="">
              <p>
                Edit task to:{" "}
                <span className="font-semibold">{task.status}</span>
              </p>
            </div>
            <div className="">
              {" "}
              <TextInput
                value={taskForm.title}
                name="title"
                onChange={handlechange}
                className="mt-2"
                type="text"
                placeholder="Enter task title"
              />
              <TextInput
                value={taskForm.date}
                onChange={handlechange}
                name="date"
                className="mt-2"
                type="datetime-local"
                placeholder="Select deadline"
              />
              <Select name="users" onChange={handlechange} className="mt-2">
                <option value="">Assign to</option>
                {invitedUsers.length &&
                  invitedUsers.map((invitedUser) => (
                    <option value={invitedUser._id} key={invitedUser._id}>
                      {invitedUser.username}
                    </option>
                  ))}
              </Select>
              <Select
                name="status"
                value={taskForm.status}
                onChange={handlechange}
                className="mt-2"
              >
                <option value="">Add status</option>
                <option value="Unassigned">Unassigned</option>
                <option value="In Development">In Development</option>
                <option value="Pending Review">Pending Reviews</option>
                <option value="Done">Done</option>
              </Select>
              <Textarea
                value={taskForm.description}
                name="description"
                onChange={handlechange}
                className="mt-2"
                placeholder="Enter decription here"
              />
            </div>
            <div className="flex justify-between mt-2 gap-2">
              <Button
                color="gray"
                className="w-full"
                onClick={() => {
                  setShowModal(false);
                  setFormError(null);
                }}
                outline
              >
                Cancel
              </Button>
              <Button type="submit" color="blue" className="w-full">
                Edit Task
              </Button>
            </div>
            {formError && (
              <Alert color="red" className="mt-2">
                {formError}
              </Alert>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskEditModal;
