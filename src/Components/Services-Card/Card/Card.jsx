import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router";

import { use } from "react";
import { ProductContext } from "../../../contexts/AuthContext";

const Card = ({ product,   }) => {
  const { name, img, price, star, id } = product;
  const { addToCart } = use(ProductContext);
  const handleAddToCart = (id) => {
    addToCart(id);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full  mx-auto">
      {/* Image Section */}
      <Link
        to={`/productDetails/${id}`}
        className="relative group w-full overflow-hidden"
      >
        <img
          src={img}
          alt={name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {star && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full ">
            {star}% OFF
          </span>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
          {name}
        </h2>

        <div className="mt-2 flex items-baseline space-x-1">
          <span className="text-sm text-gray-500 dark:text-gray-400">from</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            €{price}
          </span>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex items-center justify-between px-4 pb-4">
        {/* Add to Wishlist Button */}
        <button
          onClick={() => {
            handleAddToCart(id);
          }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          title="Add to Wishlist"
        >
          <AiOutlineHeart className="text-3xl text-red-500" />
        </button>

        {/* Buy Now Button */}
        <button
          onClick={() => {
            handleAddToCart(id);
          }}
          className="btn btn-warning text-white font-semibold hover:scale-105 transition-transform duration-200 px-1 lg:px-4 lg:py-2 rounded-lg "
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Card;
