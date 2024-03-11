import React, { useState } from "react";

import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Signup from "../components/Signup";
import backgroundImg from "../assets/background.jpg";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { signInSuccess } from "../redux/user/userSlice";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  if (currentUser) {
    return <Navigate to="/dashboard?tab=dash" />;
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log(data.message);
        setFormError(data.message);
      } else {
        setFormError(null);
        dispatch(signInSuccess(data));
        navigate("/dashboard?tab=dash");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between mb-0 backimg ">
      <div className="flex flex-col items-center mt-4 justify-center">
        <h1 className="text-2xl text-blue-600 font-semibold">
          Login to Kanboard
        </h1>
        <div className=" p-3 mt-4 rounded-2xl shadow-xl bg-white">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="email" />
              </div>
              <TextInput
                value={formData.email}
                id="email"
                type="email"
                placeholder="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-6">
              <div className="mb-2 block">
                <Label htmlFor="password" value="password" />
              </div>
              <TextInput
                value={formData.password}
                id="password"
                type="password"
                placeholder="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full"
                gradientDuoTone={"purpleToPink"}
              >
                {loading ? "Login in.." : "Login"}
              </Button>
              <div className="flex gap-2 mt-2 justify-between w-full">
                <Button onClick={() => navigate("/")} outline>
                  Signup
                </Button>
                <Button onClick={()=>navigate("/forgotpassword")} className="flex-1" outline>
                  forgot password
                </Button>
              </div>
              {formError && (
                <Alert color="red" className="mt-2">
                  {formError}
                </Alert>
              )}
            </div>
          </form>
        </div>
        <OAuth />
      </div>
      <div className="border mb-0  mt-10 bg-purple-200">
        <div className="border mb-0 flex flex-col items-center justify-center   mt-10 bg-purple-300">
          <div className="border mb- w-[90%] flex flex-col justify-center items-center mt-10 bg-purple-400">
            <div className="border mb-0 w-[90%]  h-[20vh] mt-10 bg-purple-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
