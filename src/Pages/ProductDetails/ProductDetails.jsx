import { useLoaderData } from "react-router";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineShoppingCart,
} from "react-icons/ai";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { use } from "react";
import { ProductContext } from "../../contexts/AuthContext";

const ProductDetails = () => {
  const product = useLoaderData();

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-xl">Product not found.</p>
      </div>
    );
  }
  const { name, img, price, star, category, id } = product;
  const { addToCart } = use(ProductContext);
  const handleAddToCart = (id) => {
    addToCart(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6 md:px-16 lg:px-32 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* ✅ Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <img
            src={img}
            alt={name}
            className="rounded-2xl shadow-xl w-full max-w-md object-cover hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* ✅ Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
              {name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Category:{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {category?.name}
              </span>
            </p>
          </div>

          {/* ✅ Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) =>
              i < star ? (
                <AiFillStar key={i} className="text-yellow-500 text-xl" />
              ) : (
                <AiOutlineStar key={i} className="text-yellow-500 text-xl" />
              )
            )}
            <span className="text-gray-600 dark:text-gray-400 ml-2">
              ({star} / 5)
            </span>
          </div>

          {/* ✅ Price */}
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ${price.toFixed(2)}
          </div>

          {/* ✅ Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Upgrade your experience with <strong>{name}</strong> — built for
            modern style, durability, and performance. Designed with precision
            and made from premium materials, it’s perfect for everyday use or
            workouts. Limited stock available!
          </p>

          {/* ✅ Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => handleAddToCart(id)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all"
            >
              <AiOutlineShoppingCart className="text-xl" />
              Add to Cart
            </button>
            <button className="bg-black dark:bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl shadow-md transition-all">
              Buy Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
