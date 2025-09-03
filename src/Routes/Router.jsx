import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import CategoryList from "../Pages/ProductCategory/CategoryList";
import ProductList from "../Pages/ProductCategory/ProductList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/categories",
        element: <CategoryList></CategoryList>,
      },
      {
        path: "/category/:id",
        element: <ProductList></ProductList>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);
