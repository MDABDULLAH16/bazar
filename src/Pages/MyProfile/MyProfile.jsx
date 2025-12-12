import React from "react";
import { NavLink, Outlet } from "react-router";
import useLoggedUser from "../../hooks/useLoggedUser";

const MyProfile = () => {
  const { loggedUser } = useLoggedUser();
  const role = loggedUser?.role; // optional chaining in case loggedUser is null

  // Define links for user and admin
  const userLinks = [
    { to: "", label: "My Profile" },
    { to: "myRequest", label: "My Request" },
    { to: "cart", label: "My Cart" },
    { to: "addReview", label: "Add Review" },
  ];

  const adminLinks = [
    { to: "", label: "My Profile" },
    { to: "allUser", label: "All User" },
    { to: "addProduct", label: "Add Product" },
    { to: "allProducts", label: "All Products" },
    { to: "addCategory", label: "Add Category" },
  ];

  const linksToRender = role === "admin"||'super-admin' ? adminLinks : userLinks;

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6 flex-wrap">
        {linksToRender.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === ""}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default MyProfile;
