import { Route, Routes } from "react-router-dom";
import OAuth from "./components/OAuth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import SingleBoard from "./pages/SingleBoard";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<SingleBoard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
