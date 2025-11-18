import React, { useContext, useEffect } from "react";
import { AuthContext, ProductContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
 
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const { products, setProducts } = useContext(ProductContext);

  // Fetch products by user email
  useEffect(() => {
    if (user?.email) {
      fetch(`${BACKEND_URL}/productRequest?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [user]);

  // Handle delete
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    fetch(`https://urban-server-brown.vercel.app/productRequest/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setProducts(products.filter((p) => p._id !== id));
          toast.success("Product deleted successfully!");
        } else {
          toast.error("Failed to delete product.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center dark:text-gray-200">
        My Requested Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No products found.
        </p>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-4 bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product image */}
              <img
                src={product.img}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              {/* Product details */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold dark:text-gray-100">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {product.description || "No description available."}
                </p>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1 block">
                  Price: {product.price ? `$${product.price}` : "Not listed"}
                </span>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
