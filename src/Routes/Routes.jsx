import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import RequestProduct from "../Pages/RequestProduct/RequestProduct";
import Login from "./../Pages/Login/Login";
import Cart from "../Pages/Cart/Cart";
import Signup from "../Pages/Signup/Signup";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoutes";
import MyProducts from "../Pages/MyProducts/MyProducts";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Profile from "../Pages/MyProfile/Profile";
import AllReviews from "../Pages/AllReviews/AllReviews";
import ReviewPost from "../Pages/ReviewPost/ReviewPost";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,

        Component: Home,
      },
      { path: "/login", Component: Login },
      { path: "/signup", Component: Signup },

      {
        path: "/products",
        loader: async () => {
          const res = await fetch(
            `${BACKEND_URL}/products`
          );
          const data = await res.json();
          return data;
        },
        Component: Products,
      },

      {
        path: "cart",
        loader: async () => {
          const res = await fetch(`${BACKEND_URL}/products`);
          const data = await res.json();
          return data;
        },
        Component: Cart,
      },
      
      {
        path: "reviews",
        loader: async () => {
          const res = await fetch(`${BACKEND_URL}/reviews`);
          const data = await res.json();
          return data;
        },
        Component: AllReviews,
      },
      {
        path: "/productDetails/:id",
        loader: async ({ params }) => {
          const res = await fetch(
            `${BACKEND_URL}/products/${params.id}`
          );
          const data = await res.json();

          return data || null;
        },
        Component: ProductDetails,
      },
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
        children: [
          { index: true, Component: Profile },
          { path: "myRequest", Component: MyProducts },
          {
            path: "cart",
            loader: async () => {
              const res = await fetch(`${BACKEND_URL}/products`);
              const data = await res.json();
              return data;
            },
            Component: Cart,
          },
          {
            path: "addReview",
            Component: ReviewPost,
          },
        ],
      },
      {
        path: "/requestProduct",
        element: (
          <PrivateRoute>
            <RequestProduct></RequestProduct>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
