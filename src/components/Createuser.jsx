import React from "react";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";

export const Createuser = (props) => {
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState(false);
  const data = props.data;
  const setData = props.setData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const newUser = await response.json();
      setData((prevData) => {
        const newDataArray = Object.values(prevData);
        newDataArray.push(newUser);
        return newDataArray;
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
      });
      setCreating(false);
      setMessage(true);
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Create New User</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone:
          </label>
          <input
            type="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create User
        </button>

        {creating ? (
          <div className="mt-2 flex items-center space-x-2">
            <PropagateLoader color={"#1E40AF"} size={12} />
            <span>Creating...</span>
          </div>
        ) : message ? (
          <span className="mt-2 text-green-600">Successfully Added</span>
        ) : (
          <span className="mt-2"></span>
        )}
      </form>
    </div>
  );
};
