import React, { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
const OAuth = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user);

  const handleGoogleClick = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ propmt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch(`/api/user/google`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));

        navigate("/dashboard?tab=dash");
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleGoogleClick}
        className="mt-10"
        gradientDuoTone={"purpleToPink"}
      >
        <FaGoogle className="mr-2" />
        {loading ? <Spinner /> : " Continue with google"}
      </Button>
    </div>
  );
};

export default OAuth;
