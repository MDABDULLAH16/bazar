import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const MyAddedProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const email = user?.email;

  // Fetch categories
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch products added by this user
  useEffect(() => {
    if (email) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/products?email=${email}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    }
  }, [email]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Product deleted successfully!");
        setProducts(products.filter((prod) => prod._id !== id));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    }
  };

  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat._id === id);
    return category ? category.name : "Unknown";
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        My Added Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products added yet.</p>
      ) : (
        <div className="space-y-4">
          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-4">
            {products.map((prod) => (
              <div
                key={prod._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col"
              >
                <img
                  src={prod.img}
                  alt={prod.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-lg">{prod.name}</h3>
                <p>Price: ${prod.price.toFixed(2)}</p>
                <p>Star: {prod.star}</p>
                <p>Category: {getCategoryName(prod.categoryId)}</p>
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Star</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, index) => (
                  <tr key={prod._id} className="text-center">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      <img
                        src={prod.img}
                        alt={prod.name}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="px-4 py-2 border">{prod.name}</td>
                    <td className="px-4 py-2 border">
                      ${prod.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border">{prod.star}</td>
                    <td className="px-4 py-2 border">
                      {getCategoryName(prod.categoryId)}
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleDelete(prod._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedProducts;
