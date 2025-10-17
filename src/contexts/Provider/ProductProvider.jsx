import { createContext, useState } from "react";

export const ProductContext = createContext(null);
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const productInfo = {
    asset: "gold",
    products,
    setProducts,
  };
  return (
    <ProductContext.Provider value={productInfo}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
