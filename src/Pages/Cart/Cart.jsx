import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useLoggedUser from "../../hooks/useLoggedUser";
import axios from "axios";
import { ProductContext } from "../../contexts/AuthContext";

const url = import.meta.env.VITE_BACKEND_URL;
const SHIPPING_COST = 5;

const Cart = () => {
  const { setCarts } = useContext(ProductContext);
  const { loggedUser, loading } = useLoggedUser();

  if (loading) return null; // or spinner
  const [cart, setCart] = useState({
    items: [],
    subtotal: 0,
    total: 0,
  });

  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    if (loggedUser?.email) {
      axios
        .get(`${url}/cart/${loggedUser.email}`)
        .then((res) => {
          setCart(res.data);
          setCartState(res.data.items || []);
          setCarts(res.data.items || []);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedUser]);

  // const subtotal = cartState.reduce((acc, p) => acc + p.price * p.quantity, 0);
  // const total = subtotal + SHIPPING_COST;

  const updateQuantity = (productId, delta) => {
    setCartState((prev) =>
      prev.map((p) =>
        p.productId === productId
          ? { ...p, quantity: Math.max(1, p.quantity + delta) }
          : p
      )
    );
  };

  const removeProduct = (productId) => {
    console.log({ productId });

    const updatedCartState = cartState.filter((p) => p.productId !== productId);
    setCartState(updatedCartState);
    toast.info("Product removed from cart");

    // Optionally, call backend to remove item
    axios
      .delete(`${url}/cart/${loggedUser?.email}/item/${productId}`)
      .catch((err) => console.error(err));
  };

  if (cartState.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-600">
          Your cart is empty
        </h2>
      </div>
    );

  // Calculate subtotal and total dynamically in frontend
  const subtotal = cartState.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const total = subtotal + SHIPPING_COST;

  const paymentInfo = {
    price: total,
    quantity: cartState.length,
    email: loggedUser.email,
  };
  const handleBuyNow = async () => {
    console.log(paymentInfo);

    await axios
      .post(`${url}/create-checkout-session`, paymentInfo)
      .then((res) => {
        console.log(res.data);
        window.open(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
      {/* Left: Cart Items */}
      <div className="flex-1 flex flex-col gap-6">
        {cartState.map((product) => (
          <div
            key={product.productId}
            className="flex flex-col md:flex-row items-center gap-4 border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-28 h-28 object-cover rounded-md"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500">${product.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(product.productId, -1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-2">{product.quantity}</span>
                <button
                  onClick={() => updateQuantity(product.productId, 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="font-semibold">
                ${product.price * product.quantity}
              </p>
              <button
                onClick={() => removeProduct(product.productId)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Summary Panel */}
      <div className="w-full lg:w-96 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col gap-4 sticky top-6 h-fit shadow-md">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${SHIPPING_COST.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2 border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={handleBuyNow}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
