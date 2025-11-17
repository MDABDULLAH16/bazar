import React from "react";
import { NavLink, Outlet } from "react-router";

const MyProfile = () => {
  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        {/* ✅ make them relative paths */}
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }
        >
          My Profile
        </NavLink>

        <NavLink
          to="myRequest"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }
        >
          My Request
        </NavLink>

        <NavLink
          to="cart" // ✅ relative path
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }
        >
          My Cart
        </NavLink>
        <NavLink
          to="addReview" // ✅ relative path
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }
        >
          Add Review
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default MyProfile;
