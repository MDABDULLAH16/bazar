import { useEffect, useState,  } from "react";
import { getFromDb } from "../../utils/AddToLocalDB";
import { toast } from "react-toastify";
import { ProductContext } from "../AuthContext";

// Make sure you export this context


const ProductProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);

  const [products, setProducts] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = getFromDb() || [];
    setCarts(storedCart);
  }, []);

  // Add product to cart dynamically
  const addToCart = (id) => {
    if (carts.includes(id)) {
      toast.error("This product is already in the cart!");
      return false; // already exists
    }

    const updatedCart = [...carts, id];
    setCarts(updatedCart); // update state -> triggers re-render
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // persist to localStorage
    toast.success("Product added successfully!");
    return true;
  };

   const removeFromCart = (id) => {
     if (!carts.includes(id)) return; // item not in cart

     const updatedCart = carts.filter((pid) => pid !== id);
     setCarts(updatedCart);
     localStorage.setItem("cart", JSON.stringify(updatedCart)); // persist changes
     toast.info("Product removed from cart");
   };
  const productInfo = {
    carts,
    addToCart, // provide add function to children
    removeFromCart,
    products,
    setProducts,
  };

  return (
    <ProductContext value={productInfo}>
      {children}
    </ProductContext>
  );
};

export default ProductProvider;
