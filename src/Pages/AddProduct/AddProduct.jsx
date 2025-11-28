import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    img: "",
    name: "",
    description:'',
    price: "",
    star: 3.9,
    categoryId: "",
    email: user?.email || "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      img: formData.img,
      name: formData.name,
      description:formData.description,
      price: parseFloat(formData.price),
      star: parseFloat(formData.star),
      categoryId: formData.categoryId,
      email: formData.email,
    };

    await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Product Add Successful");
        }
      });

    setFormData({
      img: "",
      name: "",
      description:'',
      price: "",
      star: 3.9,
      categoryId: "",
      email: user?.email || "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Product Image */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Product Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product Description"
            className="px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            step="0.01"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Star Rating */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Star Rating</label>
          <input
            type="number"
            name="star"
            value={formData.star}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* User Email (Read-Only) */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1">Your Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
