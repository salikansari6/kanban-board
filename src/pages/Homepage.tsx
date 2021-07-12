import React from "react";

const Homepage = () => {
  return (
    <div className="text-center ">
      <div className="hero flex justify-center relative text-gray-800">
        <video
          autoPlay
          loop
          src="/videos/kanban-video.mp4"
          className="w-3/4 opacity-20 "
        ></video>
        <div className="absolute flex flex-col  justify-center items-center h-full hero-text">
          <p className="flex items-center mb-5 lg:text-6xl">
            Introducing Boardify{" "}
            <img
              src="/images/kanban-logo.png"
              className="h-14 ml-3"
              alt="logo"
            />{" "}
          </p>
          <p className="text-3xl">Organize all your tasks at a Drag and Drop</p>
          <a
            href="/auth/google/"
            className="text-xl bg-gray-800 text-white rounded shadow py-2 px-5 lg:mt-5 border border-gray-800 hover:bg-white hover:text-gray-800"
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
