import React, { useEffect, useState } from "react";
import Card from "../Services-Card/Card/Card";
import Container from "../Container/Container";
import { Link } from "react-router";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const TopProducts = () => {
  const [topProducts, setTopProducts] = useState([]);
  // console.log(topProducts);

  useEffect(() => {
    fetch(`${BACKEND_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const top10 = data.slice(0, 12);
        setTopProducts(top10);
      });
  }, []);
  return (
    <div>
      <Container>
        <h1 className="font-bold  text-5xl pl-20 my-6">
          Top <span className="text-red-600">products</span>{" "}
        </h1>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {topProducts.map((product) => (
            <Card key={product.id} product={product}></Card>
          ))}
        </div>
        <div className="text-center my-6">
          <Link to='/products' className=" ">
            <button className="btn btn-warning text-white font-semibold hover:scale-105 transition-transform duration-200 px-1 lg:px-4 lg:py-2 rounded-lg">
              Show all
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default TopProducts;
