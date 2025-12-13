import { NavLink } from "react-router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useContext } from "react";
import { Menu } from "lucide-react";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

import "./Navbar.css";
import { AuthContext, ProductContext } from "../../contexts/AuthContext";
import { auth } from "../../firebase/firebase.config";
import useLoggedUser from "../../hooks/useLoggedUser";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { loggedUser, loading } = useLoggedUser();
  const { carts = [] } = useContext(ProductContext);

  const isAdmin =
    !loading &&
    (loggedUser?.role === "admin" || loggedUser?.role === "super-admin");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      {isAdmin ? (
        <>
          <li>
            <NavLink to="/myProfile/allProducts">All Products</NavLink>
          </li>
          <li>
            <NavLink to="/myProfile">Dashboard</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/reviews">Reviews</NavLink>
          </li>          
          <li>
            <NavLink to="/myProfile">Dashboard</NavLink>
          </li>
          <li className="relative text-2xl">
            <NavLink to="/cart">
              <AiOutlineShoppingCart />
              <span className="absolute -top-2 -right-2 bg-warning text-xs rounded-full px-1.5 text-white">
                {carts.length}
              </span>
            </NavLink>
          </li>
        </>
      )}

      {!user && (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-300 sticky top-0 z-50 shadow-md px-4">
      {/* LEFT: Logo */}
      <div className="navbar-start">
        <NavLink
          to="/"
          className="btn btn-ghost text-xl font-bold text-primary"
        >
          UrbanCart
        </NavLink>
      </div>

      {/* RIGHT: Desktop Menu */}
      <div className="navbar-end hidden lg:flex items-center gap-6">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>

        {user && (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt="profile"
              className="w-8 h-8 rounded-full border"
            />
            <span className="font-semibold">
              {user.displayName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* RIGHT: Mobile Menu */}
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <Menu />
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-56 font-semibold"
          >
            {navLinks}

            {user && (
              <div className="mt-3 border-t pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500 font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
