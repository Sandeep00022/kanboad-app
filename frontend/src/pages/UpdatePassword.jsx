import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        return setError("password and confirm password do not match");
      }
      const res = await fetch(`/api/user/updatepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          token,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        setError(null);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("?")[1];
    setToken(urlToken);
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center mt-7">
      <div className=" p-3 shadow-xl rounded-md">
        <h1 className="text-xl">Update your password here</h1>
        <TextInput
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2"
          placeholder="Enter your new password"
        />
        <TextInput
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-2"
          placeholder="confirm Password"
        />
        <Button
          className="w-full mt-2"
          gradientDuoTone={"purpleToBlue"}
          onClick={handleUpdatePassword}
        >
          {loading ? "updating password" : " update your password"}
        </Button>
        {error && (
          <Alert color="red" className="mt-2">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
