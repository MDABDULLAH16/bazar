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
import AddProduct from "../Pages/AddProduct/AddProduct";
import AddCategory from "../Pages/AddCategory/AddCategory";
import MyAddedProducts from "../Pages/MyAddedProducts/MyAddedProducts";
import AllUser from "../Pages/AllUser/AllUser";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import PaymentSuccess from "../Pages/Payments/PaymentSuccess";
import PaymentCancel from "../Pages/Payments/PaymentCancelled";
 
import AllProducts from "../Pages/AllProducts/AllProducts";

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
      { path: "/payment-success", Component: PaymentSuccess },
      { path: "/payment-cancel", Component: PaymentCancel },
      {
        path: "request-product",
        element: (
          <PrivateRoute>
            <UserRoute>
              <RequestProduct></RequestProduct>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        loader: async () => {
          const res = await fetch(`${BACKEND_URL}/products`);
          const data = await res.json();
          return data;
        },
        Component: Products,
         
      },
      {
        path: "/products/:id",
        loader: async () => {
          const res = await fetch(`${BACKEND_URL}/products`);
          const data = await res.json();
          return data;
        },
        Component: Products,
      },

      {
        path: "cart",
        loader: async ({ params }) => {
          const res = await fetch(`${BACKEND_URL}/cart/${params.email}`);
          const data = await res.json();
          return data;
        },
        element: (
          <PrivateRoute>
            <UserRoute>
              <Cart></Cart>
            </UserRoute>
          </PrivateRoute>
        ),
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
          const res = await fetch(`${BACKEND_URL}/products/${params.id}`);
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
          {
            path: "myRequest",
            element: (
              <UserRoute>
                <MyProducts></MyProducts>
              </UserRoute>
            ),
          },
          {
            path: "allProducts",
            loader: async () => {
              const res = await fetch(`${BACKEND_URL}/products`);
              const data = await res.json();
              return data;
            },
            Component: AllProducts,
            
          },
          {
            path: "cart",
            loader: async () => {
              const res = await fetch(`${BACKEND_URL}/products`);
              const data = await res.json();
              return data;
            },
            element: (
              <UserRoute>
                <Cart></Cart>
              </UserRoute>
            ),
          },
          {
            path: "addReview",
            element: (
              <UserRoute>
                <ReviewPost></ReviewPost>
              </UserRoute>
            ),
          },
          {
            path: "allUser",
            element: (
              <AdminRoute>
                <AllUser></AllUser>
              </AdminRoute>
            ),
          },
          {
            path: "addCategory",
            element: (
              <AdminRoute>
                <AddCategory></AddCategory>
              </AdminRoute>
            ),
          },

          {
            path: "addProduct",
            element: (
              <AdminRoute>
                <AddProduct></AddProduct>
              </AdminRoute>
            ),
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
