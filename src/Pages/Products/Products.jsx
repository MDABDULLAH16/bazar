import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Card from "./../../Components/Services-Card/Card/Card";
import Container from "./../../Components/Container/Container";

const Products = () => {
  const products = useLoaderData();
  const [searchProduct, setSearchProduct] = useState(products);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // first page 24 items

  const handleSearch = (e) => {
    const search = e.target.value.trim().toLowerCase();
    const searchProducts = products.filter((product) =>
      product.name.toLowerCase().includes(search)
    );
    setSearchProduct(searchProducts);
    setCurrentPage(1); // reset to first page when searching
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = searchProduct.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(searchProduct.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="my-10">
      <Container>
        <div className="my-10">
          <input
            type="text"
            className="input"
            onChange={handleSearch}
            required
            placeholder="Search your product"
          />

          {/* products */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
            {currentProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
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
                      : "bg-gray-200"
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
