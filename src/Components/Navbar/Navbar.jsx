import { Link, NavLink } from "react-router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Navbar.css";
import { use, useContext } from "react";
import { AuthContext, ProductContext } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import { Menu } from "lucide-react";
import useLoggedUser from "../../hooks/useLoggedUser";
// import { getFromDb } from "../../utils/AddToLocalDB";

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);
  const { loggedUser } = useLoggedUser();
  const currentUser = loggedUser;
  const { carts } = use(ProductContext);

  // const carts = getFromDb() || [];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🧩 Navigation Links
 const isAdmin =
   currentUser?.role === "admin" || currentUser?.role === "super-admin";

 const navLinks = (
   <div className="flex flex-col lg:flex-row gap-3 items-center">
     {isAdmin ? (
       // -------------------- ADMIN NAV --------------------
       <>
         <li className="hover:bg-[#FBBD23] hover:text-white px-2 py-1 rounded">
           <NavLink to="/myProfile/allProducts">All Products</NavLink>
         </li>

         <li className="hover:bg-[#FBBD23] hover:text-white px-2 py-1 rounded">
           <NavLink to="/myProfile">Dashboard</NavLink>
         </li>
       </>
     ) : (
       // -------------------- USER NAV --------------------
       <>
         <li className="hover:bg-[#FBBD23] hover:text-white px-2 py-1 rounded">
           <NavLink to="/">Home</NavLink>
         </li>
         <li className="hover:bg-[#FBBD23] hover:text-white px-2 py-1 rounded">
           <NavLink to="/reviews">Reviews</NavLink>
         </li>

         <li className="hover:bg-[#FBBD23] hover:text-white px-2 py-1 rounded">
           <NavLink to="/myProfile">Dashboard</NavLink>
         </li>

         <li className="hover:bg-[#FBBD23] hover:text-white relative text-2xl px-2 py-1 rounded">
           <NavLink to="/cart">
             <AiOutlineShoppingCart />
             <span className="absolute -top-2 -right-2 bg-warning text-xs rounded-full px-1.5 text-white">
               {carts.length}
             </span>
           </NavLink>
         </li>
       </>
     )}

     {/* Guest Login */}
     {!user && (
       <li className="ml-4 px-2 py-1 hover:bg-[#FBBD23] hover:text-white rounded">
         <NavLink to="/login">Login</NavLink>
       </li>
     )}
   </div>
 );


  return (
    <div className="navbar bg-base-300 px-6 md:px-10 lg:px-14 sticky top-0 z-50 shadow-md">
      {/* Brand */}
      <div className="flex-1">
        <NavLink
          to="/"
          className="btn btn-ghost normal-case text-xl font-bold text-primary"
        >
          UrbanCart
        </NavLink>
      </div>

      {/* Mobile Menu */}
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <Menu></Menu>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-52 font-semibold"
          >
            {navLinks}
            {/* ✅ Mobile: show user info if logged in */}
            {user && (
              <li className="mt-2 border-t pt-2">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-500 mt-2 font-semibold"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-none items-center space-x-6">
        <ul className="menu menu-horizontal font-semibold text-base">
          {navLinks}
        </ul>

        {/* ✅ User Info (Desktop) */}
        {!loading && user && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="profile"
                className="w-8 h-8 rounded-full border border-gray-400"
              />
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {user.displayName || user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
