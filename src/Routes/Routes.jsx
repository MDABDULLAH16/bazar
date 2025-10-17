import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import RequestProduct from "../Pages/RequestProduct/RequestProduct";
import Login from './../Pages/Login/Login';
import Cart from "../Pages/Cart/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        // loader: async () => {
        //   const res = await fetch("/Products.json");
        //   const data = await res.json();
        //   const categories = data.map((item) => item.category);
        //   return categories;
        // },
        Component: Home,
      },
      { path: "/login", Component: Login },
      { path: "/cart", Component: Cart },
      {
        path: "/products",
        loader: async () => {
          const res = await fetch("/Products.json");
          const data = await res.json();          
          return data;
        },
        Component: Products,
      },
      { path: "/requestProduct", Component: RequestProduct },
    ],
  },
]);
