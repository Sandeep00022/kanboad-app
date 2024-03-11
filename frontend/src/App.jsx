import { Route, Routes } from "react-router-dom";
import OAuth from "./components/OAuth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { DragDropContext } from "react-beautiful-dnd";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import SingleBoard from "./pages/SingleBoard";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskSucess } from "./redux/task/taskSlice";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";

const App = () => {
  const { allTask } = useSelector((state) => state.task);

  let Unassigned;
  let InProgress;
  let Pending;
  let Done;

  if (allTask.length > 0) {
    Unassigned = allTask.filter((task) => task.status === "Unassigned");
    InProgress = allTask.filter((task) => task.status === "In Development");
    Pending = allTask.filter((task) => task.status === "Pending Review");
    Done = allTask.filter((task) => task.status === "Done");
  }

  const dispatch = useDispatch();

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedTask = { ...allTask[source.index] };

    let newStatus;
    switch (destination.droppableId) {
      case "unassigned":
        newStatus = "Unassigned";
        break;
      case "in-development":
        newStatus = "In Development";
        break;
      case "pending-review":
        newStatus = "Pending Review";
        break;
      case "done":
        newStatus = "Done";
        break;
      default:
        return;
    }

    draggedTask.status = newStatus;

    await updateTaskStatus(draggedTask._id, newStatus);
  };

  const updateTaskStatus = async (id, newStatus) => {
    let payload;
    if (newStatus === "Unassigned") {
      payload = {
        status: newStatus,
        assignedUser: null,
      };
    } else {
      payload = {
        status: newStatus,
      };
    }

    try {
      const res = await fetch(`/api/task/editTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      dispatch(updateTaskSucess(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:id" element={<SingleBoard />} />
          </Route>
        </Routes>
      </DragDropContext>
    </>
  );
};

export default App;
