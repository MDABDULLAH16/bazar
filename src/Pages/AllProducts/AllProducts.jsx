import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import axios from "axios";
import Container from "../../Components/Container/Container";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";


const url = import.meta.env.VITE_BACKEND_URL;

const AllProducts = () => {
  const products = useLoaderData();

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Search + filter
  useEffect(() => {
    let updated = products;

    if (searchTerm.trim() !== "") {
      updated = updated.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updated);
    setCurrentPage(1);
  }, [searchTerm, products]);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // ---------------- DELETE FUNCTION ----------------
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${url}/products/${id}`);

      // Remove from state
      const updated = filteredProducts.filter((p) => p._id !== id);
      setFilteredProducts(updated);

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  // ---------------- OPEN EDIT MODAL ----------------
  const handleEdit = (product) => {
    setEditProduct(product); // pre-fill modal
    setShowModal(true);
  };

  // ---------------- PATCH UPDATE ----------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, price, image } = e.target;

      const updatedData = {
        name: name.value,
        price: price.value,
        image: image.value,
      };

      const res = await axios.patch(
        `${url}/products/${editProduct._id}`,
        updatedData
      );

      // Update UI instantly
      const updatedList = filteredProducts.map((item) =>
        item._id === editProduct._id ? { ...item, ...updatedData } : item
      );

      setFilteredProducts(updatedList);
      setShowModal(false);
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      <Container>
        {/* Search */}
        <input
          type="text"
          className="input w-full border border-gray-300 p-2 rounded-md"
          placeholder="Search your product"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Table */}
        <div className="overflow-x-auto mt-6">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, idx) => (
                  <tr key={product._id}>
                    <th>{indexOfFirst + idx + 1}</th>

                    <td>
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-md border"
                      />
                    </td>

                    <td>{product.name}</td>
                    <td>${product.price}</td>

                    <td className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn btn-sm btn-info gap-1"
                      >
                        <Edit size={16} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-sm btn-error gap-1"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${
                    page === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}

        {/* ---------------- EDIT MODAL ---------------- */}
        {showModal && editProduct && (
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Edit Product</h3>

              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  name="name"
                  defaultValue={editProduct.name}
                  className="input input-bordered w-full"
                  placeholder="Product Name"
                  required
                />

                <input
                  name="price"
                  type="number"
                  defaultValue={editProduct.price}
                  className="input input-bordered w-full"
                  placeholder="Price"
                  required
                />

                <input
                  name="image"
                  defaultValue={editProduct.img}
                  className="input input-bordered w-full"
                  placeholder="Image URL"
                  required
                />

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </Container>
    </div>
  );
};

export default AllProducts;
