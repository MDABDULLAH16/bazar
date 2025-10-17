import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Card from "./../../Components/Services-Card/Card/Card";
import Container from "./../../Components/Container/Container";

const Products = () => {
    const products = useLoaderData();
    const [searchProduct,setSearchProduct]= useState(products)
  const handleSearch = (e) => {
      const search = e.target.value;
      const text = search.trim().toLowerCase()
      const searchProducts = products.filter(product => product.name.toLowerCase().includes(text))
      setSearchProduct(searchProducts)
     
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

          {/* products  */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchProduct.map((product) => (
              <Card key={product.id} product={product}></Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Products;
