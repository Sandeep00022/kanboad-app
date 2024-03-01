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

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Check if the task was dropped outside a droppable area
    if (!destination) {
      return;
    }

    // Check if the task was dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Get the dragged task
    const draggedTask = { ...allTask[source.index] }

    // Determine the new status based on the destination droppableId
    let newStatus;
    switch (destination.droppableId) {
      case "unassigned":
        newStatus = "Unassigned";
        break;
      case "in-development":
        newStatus = "In Development";
        break;
      case "pending":
        newStatus = "pending-review";
        break;
      case "done":
        newStatus = "Done";
        break;
      default:
        return;
    }

    draggedTask.status = newStatus;

    dispatch(updateTaskSucess(draggedTask));
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
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
