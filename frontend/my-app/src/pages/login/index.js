import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center 
                 bg-[linear-gradient(to_bottom_right,_#06b6d4_10%,_#6366f1_50%,_#0ea5e9_100%)]
                 px-4"
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
