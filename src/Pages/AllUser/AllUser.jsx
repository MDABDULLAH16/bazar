import React, { useEffect, useState } from "react";
import axios from "axios";
import useLoggedUser from "../../hooks/useLoggedUser";

const url = import.meta.env.VITE_BACKEND_URL;

const AllUser = () => {
  const { loggedUser } = useLoggedUser();
  const currentEmail = loggedUser?.email;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${url}/users`);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); 

 const handleMakeAdmin = async (email) => {
   try {
     const res = await axios.patch(`${url}/users/toggleRole?email=${email}`);
       const updatedUser = res.data;
       console.log({updatedUser});
       

     setUsers((prevUsers) =>
       prevUsers.map((u) =>
         u.email === email ? { ...u, role: updatedUser.newRole } : u
       )
     );

     alert("Role updated!");
   } catch (error) {
     console.error("Error making admin:", error);
     alert("Failed to update role.");
   }
 };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const isSelf = user.email === currentEmail;

              return (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">
                    <img
                      src={user.image || "https://via.placeholder.com/40"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>

                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>

                  <td className="px-4 py-2 capitalize">
                    {isSelf ? (
                      <span className="text-purple-600 font-bold">
                        Super Admin
                      </span>
                    ) : (
                      user.role
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {isSelf ? (
                      <span className="text-gray-400">No Action</span>
                    ) : user.role !== "admin" ? (
                      <button
                        onClick={() => handleMakeAdmin(user.email)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user.email)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete Admin
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
