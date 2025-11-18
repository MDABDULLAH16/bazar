import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const ProductRequestForm = () => {
  const { user,   } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    priceRange: "",
    category: "",
    description: "",
    img: "",
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Request Submitted:", formData);
    // TODO: send data to your backend or Firebase
 
    fetch(`${BACKEND_URL}/productRequest`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Your Request Successful!");
          setFormData({
            name: "",
            priceRange: "",
            category: "",
            description: "",
            img: "",
            email: user.email,
          });
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 p-4">
      <div className="w-full max-w-lg bg-base-100 dark:bg-gray-900 shadow-2xl rounded-xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Product Request Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="label">
              <span className="label-text dark:text-gray-300">
                Product Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="Enter product name"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="label">
              <span className="label-text dark:text-gray-300">
                Price Range ($)
              </span>
            </label>
            <input
              type="number"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              required
              className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="e.g., 11.9"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">
              <span className="label-text dark:text-gray-300">Category</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="select select-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Fitness">Fitness</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="label">
              <span className="label-text dark:text-gray-300">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="textarea textarea-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="Describe your product request..."
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="label">
              <span className="label-text dark:text-gray-300">
                Product Image URL
              </span>
            </label>
            <input
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
              className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-warning text-white w-full mt-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 hover:dark:bg-gray-600 transition-all"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductRequestForm;
