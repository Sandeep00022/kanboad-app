import { Route, Routes } from "react-router-dom";
import OAuth from "./components/OAuth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
     <>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
     </>
  );
};

export default App;
