import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router";

import { use } from "react";
import { ProductContext } from "../../../contexts/AuthContext";
import useLoggedUser from "../../../hooks/useLoggedUser";

const Card = ({ product }) => {
  const { name, img, price, star, _id } = product;
  const { loggedUser } = useLoggedUser();

  const handleAddToCart = async (productId) => {
    if (!loggedUser?.email) {
      return alert("Please login to add to cart");
    }

    await fetch("http://localhost:3000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loggedUser.email,
        productId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert('ad to cart')
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full mx-auto">
      <Link
        to={`/productDetails/${_id}`}
        className="relative group w-full overflow-hidden"
      >
        <img
          src={img}
          alt={name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

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

      <div className="flex items-center justify-between px-4 pb-4">
        <button
          onClick={() => handleAddToCart(_id)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <AiOutlineHeart className="text-3xl text-red-500" />
        </button>

        <button
          onClick={() => handleAddToCart(_id)}
          className="btn btn-warning text-white font-semibold hover:scale-105 transition-transform duration-200 px-4 py-2 rounded-lg"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};


export default Card;
