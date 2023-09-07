import React, { useState } from "react";

export const Updateuser = ({ data, setData }) => {
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmailToUpdate(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const userToUpdate = data.find((user) => user.email === emailToUpdate);

      if (!userToUpdate) {
        throw new Error("User not found");
      }

      if (newName !== "") {
        userToUpdate.name = newName;
      }

      if (newPhone !== "") {
        userToUpdate.phone = newPhone;
      }

      setData([...data]);

      setUpdateMessage("User updated successfully");
      setEmailToUpdate("");
      setNewName("");
      setNewPhone("");
    } catch (error) {
      console.error("Error updating user:", error);
      setUpdateMessage("Error updating user");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Update User</h1>
      <form onSubmit={handleUpdate} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="emailToUpdate"
            className="block text-sm font-medium text-gray-700"
          >
            Email to Update:
          </label>
          <input
            type="email"
            name="emailToUpdate"
            required
            value={emailToUpdate}
            onChange={handleEmailChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="newName"
            className="block text-sm font-medium text-gray-700"
          >
            New Name:
          </label>
          <input
            type="text"
            name="newName"
            value={newName}
            onChange={handleNameChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="newPhone"
            className="block text-sm font-medium text-gray-700"
          >
            New Phone:
          </label>
          <input
            type="tel"
            name="newPhone"
            value={newPhone}
            onChange={handlePhoneChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update User"}
        </button>

        {updateMessage && (
          <p
            className={`mt-2 ${
              updateMessage.includes("Error")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {updateMessage}
          </p>
        )}
      </form>
    </div>
  );
};
