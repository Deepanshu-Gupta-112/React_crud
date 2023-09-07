import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-white text-2xl font-semibold mb-4 md:mb-0">
          Crud App
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:underline transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/create_user"
            className="text-white hover:underline transition duration-300"
          >
            Create User
          </Link>
          <Link
            to="/delete_user"
            className="text-white hover:underline transition duration-300"
          >
            Delete User
          </Link>
          <Link
            to="/update_user"
            className="text-white hover:underline transition duration-300"
          >
            Update User
          </Link>
        </div>
      </div>
    </nav>
  );
};
