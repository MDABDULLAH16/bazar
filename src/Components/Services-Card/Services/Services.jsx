import React, { useContext, useEffect, useState } from "react";
import Page from "../../Page/Page";
import Card from "../Card/Card";
import "./Services.css";
import { ProductContext } from "../../../contexts/Provider/ProductProvider";
const Services = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("FakeData.json")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const [showparPage, setshowparPage] = useState(10);

  const [pagination, setPagination] = useState({
    start: 0,
    end: showparPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  const handleAddToCart = (product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
  };

  return (
    <div className="grid-cols-5 m-20">
      <div className="grid lg:grid-cols-5 gap-y-6 gap-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {product.slice(pagination.start, pagination.end).map((product) => (
          <Card
            product={product}
            key={product.id}
            handleAddToCart={handleAddToCart}
          ></Card>
        ))}
      </div>
      <Page
        showparPage={showparPage}
        onPaginationChange={onPaginationChange}
        total={product.length}
      ></Page>
    </div>
  );
};

export default Services;
