import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router";
import useLoggedUser from "../../../hooks/useLoggedUser";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { ProductContext } from "../../../contexts/AuthContext";

const url = import.meta.env.VITE_BACKEND_URL;

const Card = ({ product }) => {
  const { carts, setCarts } = useContext(ProductContext);
  const { name, img, price, star, _id } = product;
  const { loggedUser } = useLoggedUser();

  const handleAddToCart = async (productId) => {
    if (!loggedUser?.email) return toast.error("Please login to add to cart");
    // ❗ Stop duplicate cart items
    if (carts.some((item) => item.productId === productId)) {
      return toast.error("Product already added to cart");
    }
    const cartItem = {
      email: loggedUser.email,
      productId,
      quantity: 1,
    };

    try {
      const response = await axios.post(`${url}/cart/add`, cartItem);

      console.log("Cart Response:", response.data);

      if (response.data.insertedId || response.data.success) {
        toast.success("Product added to cart");
        setCarts((prevProducts) => [...prevProducts, productId]);
        console.log(carts);
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding to cart");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full mx-auto">
      <Link to={`/productDetails/${_id}`}>
        <img
          src={img}
          alt={name}
          className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
          {name}
        </h2>
        <div className="mt-2 flex items-baseline space-x-1">
          <span className="text-sm text-gray-500 dark:text-gray-400">from</span>
          <span className="text-xl font-bold">€{price}</span>
        </div>
      </div>

      <div className="flex items-center flex-col gap-2 justify-between px-4 pb-4">
       

        <button
          onClick={() => handleAddToCart(_id)}
          className="btn w-full btn-warning text-white font-semibold hover:scale-105 transition-transform px-4 py-2 rounded-lg"
        >
          Add To Cart
        </button>
        <Link
          to={`/productDetails/${_id}`}
          className="btn w-full bg-red-500 text-white font-semibold hover:scale-105 transition-transform px-4 py-2 rounded-lg"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
