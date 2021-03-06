import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="text-center ">
      <div className="hero flex justify-center relative text-gray-800">
        <video
          muted
          autoPlay
          loop
          src="/videos/kanban-video.mp4"
          className="w-full min-h-screen object-cover lg:w-3/4 opacity-20 "
        ></video>
        <div className="absolute flex flex-col pt-24  lg:pt-0 lg:justify-center items-center h-full hero-text">
          <p className="flex items-center mb-5 text-3xl lg:text-6xl">
            Introducing Boardlia{" "}
            <img
              src="/images/kanban-logo.png"
              className="h-10 lg:h-14 ml-3"
              alt="logo"
            />{" "}
          </p>
          <p className="text-xl lg:text-3xl">
            Organize all your tasks at a Drag and Drop
          </p>
          <Link
            to="/login"
            className="text-xl bg-gray-800 text-white rounded shadow py-2 px-5 mt-5 border border-gray-800 hover:bg-white hover:text-gray-800"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
