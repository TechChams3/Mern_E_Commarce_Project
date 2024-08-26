import React from "react";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../Redux/api/userApislice";
import Loader from "../../Component/Loader";
import Message from "../../Component/Message";
import { setCredientials } from "../../Redux/features/auth/authSlice";

const UserLint = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const { deleteUser } = useDeleteUserMutation();
  const { updateUser } = useUpdateUserMutation();
  const [editableUserId, seteditableUserId] = useState(null);
  const [editableName, seteditableName] = useState("");
  const [exitableUserEmail, seteditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deletehandeler = async (id) => {
    if (window.confirm("are you sure")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User delete successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  const toggleEdit = (id, username, email) => {
    seteditableUserId(id);
    seteditableUserEmail(email);
    seteditableName(username);
  };

  const updateHandeler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableName,
        email: exitableUserEmail,
      });

      setCredientials(null);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">
          {error?.data.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Admin</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableName}
                          onChange={(e) => seteditableName(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />

                        <button
                          onClick={() => updateHandeler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={exitableUserEmail}
                          onChange={(e) => seteditableUserEmail(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandeler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p>{user.email}</p>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deletehandeler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserLint;
