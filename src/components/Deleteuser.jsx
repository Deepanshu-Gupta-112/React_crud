import React, { useState } from "react";

export const Deleteuser = ({ data, setData }) => {
  const [emailToDelete, setEmailToDelete] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const handleInputChange = (e) => {
    setEmailToDelete(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    try {
      const deletedUserEmail = emailToDelete;
      setData((prevData) => {
        const newDataArray = prevData.filter(
          (user) => user.email !== deletedUserEmail
        );
        return newDataArray;
      });

      setDeleteMessage("User deleted successfully");
      setEmailToDelete("");
    } catch (error) {
      console.error("Error deleting user:", error);
      setDeleteMessage("Error deleting user");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Delete User</h1>
      <form onSubmit={handleDelete} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="emailToDelete"
            className="block text-sm font-medium text-gray-700"
          >
            Email to Delete:
          </label>
          <input
            type="email"
            name="emailToDelete"
            required
            value={emailToDelete}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete User"}
        </button>

        {deleteMessage && (
          <p
            className={`mt-2 ${
              deleteMessage.includes("Error")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {deleteMessage}
          </p>
        )}
      </form>
    </div>
  );
};
