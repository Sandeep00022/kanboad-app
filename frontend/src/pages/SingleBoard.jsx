import React, { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import { useDispatch, useSelector } from "react-redux";
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
import InviteModal from "../components/InviteModal";
import TaskCard from "../components/TaskCard";
import {
  addTaskSuccess,
  allTaskSucces,
  assignedUsersSuccess,
} from "../redux/task/taskSlice";
import { Droppable } from "react-beautiful-dnd";

const SingleBoard = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskStatus, setTaskStatus] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskForm, settaskFrom] = useState({
    title: "",
    description: "",
    date: "",
  });

  const dispatch = useDispatch();

  let Unassigned;
  let InProgress;
  let Pending;
  let Done;

  const { boards, allTask } = useSelector((state) => state.task);

  if (allTask.length > 0) {
    Unassigned = allTask.filter((task) => task.status === "Unassigned");
    InProgress = allTask.filter((task) => task.status === "In Development");
    Pending = allTask.filter((task) => task.status === "Pending Review");
    Done = allTask.filter((task) => task.status === "Done");
  }

  const { id } = useParams();
  const board = boards.find((board) => board._id === id);

  const getInvitedUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/board/${board._id}/${board.createdBy}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setInvitedUsers(data.users);
        dispatch(assignedUsersSuccess(data.users));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload;
    if (taskForm.users) {
      payload = {
        title: taskForm.title,
        boardId: board._id,
        userId: board.createdBy,
        assignedUser: taskForm.users,
        description: taskForm.description,
        dueDate: taskForm.date,
        status: taskForm.status,
      };
    } else {
      payload = {
        title: taskForm.title,
        boardId: board._id,
        userId: board.createdBy,
        description: taskForm.description,
        dueDate: taskForm.date,
        status: taskForm.status,
      };
    }

    if (taskForm.users && !taskForm.status) {
      return setFormError("PLease Select status");
    }

    try {
      const res = await fetch(`/api/task/create`, {
        method: "POST",
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
        settaskFrom({
          title: "",
          description: "",
          date: "",
        });
        setTasks([data, ...tasks]);
        dispatch(addTaskSuccess(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Alltasks = async () => {
    try {
      const res = await fetch(`/api/task/${board._id}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setTasks(data);
        dispatch(allTaskSucces(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvitedUsers();
    Alltasks();
  }, []);

  const handlechange = (e) => {
    settaskFrom({ ...taskForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      <div className=" border border-b-red-500 bg-[#F5F5F6] flex flex-col  p-3 w-full">
        <div className=" flex justify-between p-2 mt-0 rounded w-full bg-white">
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
        <div className=" flex gap-4 flex-wrap p-4 ">
          <div className=" bg-white rounded-lg w-[350px] p-3">
            <div className="flex justify-between bg-white items-center m-2 gap-[140px]">
              <h3 className="text-sm font-semibold">Unassigned</h3>
              <div className=" flex gap-2 ">
                <h4 className="text-sm font-semibold ">{Unassigned?.length}</h4>
                <button>
                  <BsThreeDotsVertical />
                </button>
              </div>
            </div>
            <Droppable droppableId="unassigned">
              {(provided) => (
                <div
                  style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  className="bg-white h-[70vh] overflow-y-auto scrollbar-hide"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {Unassigned?.map((task, index) => (
                    <TaskCard key={task._id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
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
          <div className=" bg-white rounded-lg w-[350px] p-3">
            <div className="flex justify-between bg-white items-center m-2 gap-[140px]">
              <h3 className="text-sm font-semibold">In Development</h3>
              <div className=" flex gap-2">
                <h4 className="text-sm font-semibold">{InProgress?.length}</h4>
                <button>
                  <BsThreeDotsVertical />
                </button>
              </div>
            </div>
            <Droppable droppableId="in-development">
              {(provided) => (
                <div
                  style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  className="bg-white h-[70vh] overflow-y-auto scrollbar-hide"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {InProgress?.map((task, index) => (
                    <TaskCard key={task._id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Button
              onClick={() => {
                setTaskStatus("In Development");
                setShowModal(true);
              }}
              color="blue"
              className="w-full mt-3"
            >
              <FaPlus className="mr-2" /> Add Task
            </Button>
          </div>
          <div className="bg-white rounded-lg w-[350px] p-3">
            <div className="flex justify-between bg-white items-center m-2 gap-[140px]">
              <h3 className="text-sm font-semibold">Pending Review</h3>
              <div className=" flex gap-2">
                <h4 className="text-sm font-semibold">{Pending?.length}</h4>
                <button>
                  <BsThreeDotsVertical />
                </button>
              </div>
            </div>
            <Droppable droppableId="pending-review">
              {(provided) => (
                <div
                  style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  className="bg-white h-[70vh] overflow-y-auto scrollbar-hide"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {Pending?.map((task, index) => (
                    <TaskCard key={task._id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Button
              onClick={() => {
                setTaskStatus("Pending Review");
                setShowModal(true);
              }}
              color="blue"
              className="w-full mt-3"
            >
              <FaPlus className="mr-2" /> Add Task
            </Button>
          </div>
          <div className="bg-white rounded-lg w-[350px] p-3">
            <div className="flex justify-between bg-white items-center m-2 gap-[140px]">
              <h3 className="text-sm font-semibold">Done</h3>
              <div className=" flex gap-2">
                <h4 className="text-sm font-semibold">{Done?.length}</h4>
                <button>
                  <BsThreeDotsVertical />
                </button>
              </div>
            </div>
            <Droppable droppableId="done">
              {(provided) => (
                <div
                  style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  className="bg-white h-[70vh] overflow-y-auto scrollbar-hide"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {Done?.map((task, index) => (
                    <TaskCard key={task._id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Button
              onClick={() => {
                setTaskStatus("Done");
                setShowModal(true);
              }}
              color="blue"
              className="w-full mt-3"
            >
              <FaPlus className="mr-2" /> Add Task
            </Button>
          </div>
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
          <form onSubmit={handleSubmit}>
            <div className="">
              <p>
                Add new task to:{" "}
                <span className="font-semibold">{taskStatus}</span>
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
                value={taskForm.dueDate}
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
              {taskForm.users && (
                <Select
                  name="status"
                  value={taskForm.status}
                  onChange={handlechange}
                  className="mt-2"
                >
                  <option value="">Add status</option>
                  <option value="In Development">In Development</option>
                  <option value="Pending Review">Pending Reviews</option>
                  <option value="Done">Done</option>
                </Select>
              )}
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
                Add Task
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
      {/* inviite user modal */}
      <InviteModal
        showModal={showInviteModal}
        setShowModal={setShowInviteModal}
        board={board}
        onget={getInvitedUsers}
      />
    </div>
  );
};

export default SingleBoard;
