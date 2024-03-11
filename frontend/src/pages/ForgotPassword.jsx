import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
   
  const handleEmail = async () => {
    try {
      const res = await fetch("/api/user/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex  justify-center items-center ">
      <div className="mt-8 shadow-lg p-3">
        <h2 className="text-xl mb-2">Enter your Email here</h2>
        <TextInput
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2"
          placeholder="enter your email"
        />
        <Button
          className="w-full"
          gradientDuoTone={"purpleToBlue"}
          onClick={handleEmail}
        >
          Send email verification
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
