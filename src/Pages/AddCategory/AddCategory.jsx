import {   useState } from "react";
 

const AddCategory = () => {
   
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = { name, image };

    await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });

    alert("Category added!");
    setName("");
    setImage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Add Category
        </h2>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Category Name
          </label>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Category Image URL
          </label>
          <input
            type="text"
            placeholder="Category Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-300 text-white py-2 rounded-lg hover:bg-amber-400 transition-colors font-semibold"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
