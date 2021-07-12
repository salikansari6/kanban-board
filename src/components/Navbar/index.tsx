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

  useEffect(() => {
    axios
      .get("http://localhost:4000/user", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data));
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-3 flex lg:px-20">
      <Link to="/" className="flex navbar-brand justify-center items-center">
        <img src="/images/kanban-logo.png" className="h-6 w-6" alt="logo" />
        <h1 className="ml-2 text-2xl">Boardify</h1>
      </Link>
      <div className="links flex ml-auto justify-around items-center w-1/3">
        <Link to="/kanban">Kanban</Link>
        {user ? (
          <img
            src={user.photo}
            alt="avatar"
            className="avatar rounded-full h-10 w-10 cursor-pointer"
          />
        ) : (
          <a
            href="http://localhost:4000/auth/google/"
            className="bg-gray-700 rounded py-1 px-3"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
