import React from "react";
import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
const OAuth = () => {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ propmt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        onClick={handleGoogleClick}
        className="mt-10"
        gradientDuoTone={"purpleToBlue"}
      >
        <FaGoogle className="mr-2" />
        Continue with google
      </Button>
    </div>
  );
};

export default OAuth;
