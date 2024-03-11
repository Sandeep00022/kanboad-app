import { Alert, Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/user/signup", {
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
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="  p-3 mt-4 rounded-2xl shadow-xl bg-white">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="username" />
          </div>
          <TextInput
            id="username"
            type="username"
            value={formData.username}
            placeholder="username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>
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
            {loading ? "Signing up.." : "Sign Up"}
          </Button>
          <div className="flex mt-2 gap-2 items-center justify-between">
            <p className="text-sm">already have an account</p>
            <Button onClick={() => navigate("/login")} outline>
              Login
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
  );
};

export default Signup;
