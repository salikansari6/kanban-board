import React from "react";
import GoogleIcon from "../assets/GoogleIcon";

const Login = () => {
  return (
    <div className="login  flex pt-5 lg:pt-0 lg:items-center justify-center min-h-screen">
      <div className="content-wrapper flex">
        <img
          src="/images/illustration1.svg"
          className="w-1/2 hidden lg:block opacity-80"
          alt=""
        />
        <div className="login-form flex flex-col items-center justify-around p-5 lg:w-1/2">
          <p className="text-2xl lg:text-4xl text-gray-800 text-center font-medium mb-5  lg:w-2/3">
            Boardlia requires you to Login to manage and save all your tasks.
            Login and ease managing and orgainizing your tasks
          </p>

          <a
            href={`${
              process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_PROXY_URL
                : ""
            }/auth/google`}
            className="bg-red-500 transform transition hover:scale-105 hover:shadow-md mb flex text-xl text-white py-3 px-5 rounded shadow font-bold"
          >
            <GoogleIcon />
            <p className="ml-3 ">Login with Google</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
