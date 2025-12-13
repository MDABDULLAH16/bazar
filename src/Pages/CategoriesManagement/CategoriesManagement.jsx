import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CategoriesManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosSecure.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    }
  };

  // delete category
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await axiosSecure.delete(`/categories/${id}`);
      toast.success("Category deleted");
      setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // open edit modal
  const openEditModal = (category) => {
    setSelectedCategory(category);
    document.getElementById("editCategoryModal").showModal();
  };

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedCategory = {
      name: form.name.value,
      image: form.image.value,
    };

    try {
      await axiosSecure.patch(
        `/categories/${selectedCategory._id}`,
        updatedCategory
      );

      toast.success("Category updated");

      // update UI instantly
      setCategories(
        categories.map((cat) =>
          cat._id === selectedCategory._id
            ? { ...cat, ...updatedCategory }
            : cat
        )
      );

      document.getElementById("editCategoryModal").close();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories Management</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>

                <td>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>

                <td className="font-semibold">{category.name}</td>

                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => openEditModal(category)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(category._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <dialog id="editCategoryModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Category</h3>

          {selectedCategory && (
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="label">Category Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedCategory.name}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Image URL</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={selectedCategory.image}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    document.getElementById("editCategoryModal").close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default CategoriesManagement;
