import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import Card from "../../Components/Services-Card/Card/Card";
import Container from "../../Components/Container/Container";

const Products = () => {
  const {  id } = useParams();
  const products = useLoaderData();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // ✅ Filter logic — runs whenever catId or searchTerm changes
  useEffect(() => {
    let updatedProducts = products;

    if (id) {
      updatedProducts = updatedProducts.filter(
        (p) =>  (p.category?.id) ==  (id)
      );
    }

    if (searchTerm.trim() !== "") {
      updatedProducts = updatedProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // reset pagination after filtering
  }, [id, searchTerm, products]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="my-10">
      <Container>
        <div className="my-10">
          {/* Search Bar */}
          <input
            type="text"
            className="input w-full border border-gray-300 p-2 rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your product"
          />

          {/* Products Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>

          {/* Pagination */}
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
        </div>
      </Container>
    </div>
  );
};

export default Products;
