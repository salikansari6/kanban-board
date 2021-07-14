import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type User = {
  _id: string;
  name: string;
  photo: string;
  googleId: string;
};

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const toggleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get("/user", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data));
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-3 flex lg:px-20 relative">
      <Link to="/" className="flex navbar-brand justify-center items-center">
        <img src="/images/kanban-logo.png" className="h-6 w-6" alt="logo" />
        <h1 className="ml-2 text-2xl">Boardlia</h1>
      </Link>
      <div className="links flex ml-auto justify-around items-center w-1/3">
        {user && <Link to="/kanban">Kanban</Link>}
        <div className="avatar-wrapper relative">
          {user ? (
            <img
              src={user.photo}
              alt="avatar"
              onClick={toggleShowOptions}
              className="avatar rounded-full h-10 w-10 cursor-pointer"
            />
          ) : (
            <a
              href={`${
                process.env.NODE_ENV === "development"
                  ? process.env.REACT_APP_PROXY_URL
                  : ""
              }/auth/google`}
              className="bg-gray-700 rounded py-1 px-3"
            >
              Login
            </a>
          )}
          {showOptions && (
            <ul className="options w-24 rounded border shadow-md border-gray-700 absolute right-0 p-2 ml bg-white text-gray-900 z-10">
              <li>
                <a
                  href={`${
                    process.env.NODE_ENV === "development"
                      ? process.env.REACT_APP_PROXY_URL
                      : ""
                  }/logout`}
                  className=""
                >
                  Log Out
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
