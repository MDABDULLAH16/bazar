 
import { NavLink, useLoaderData,   } from "react-router";
import { BsSearch, BsFillPersonFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Navbar.css";

const Navbar = () => {
  const products = useLoaderData();
  console.log(products);
  
 
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/requestProduct">Request Product</NavLink>
      </li>
      <li>
        <NavLink to="/products"> Products</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/cart" className="relative text-2xl">
          <AiOutlineShoppingCart />
          <span className="absolute -top-2 -right-2 bg-warning text-xs rounded-full px-1.5 text-white">
            {(0)}
          </span>
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/search">
          {" "}
          <BsSearch />
        </NavLink>
      </li> */}
    </>
  );
  return (
    <div className="navbar bg-base-300 px-6 md:px-10 lg:px-14 sticky top-0 z-50">
      {/* Brand */}
      <div className="flex-1">
        <NavLink
          to="/"
          className="btn btn-ghost normal-case text-xl font-bold text-primary"
        >
          UrbanCart
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          {/* Mobile Dropdown Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-52 font-semibold"
          >
         {navLinks}
          </ul>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-none items-center space-x-6">
        <ul className="menu menu-horizontal font-semibold text-base">
           {navLinks}
        </ul>

        {/* Icons (Desktop) */}
        
      </div>
    </div>
  );
};

export default Navbar;
