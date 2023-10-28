import { RouteObject } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Layout from "../components/Layout";
import ErrorPage from "./ErrorPage";
import ProtectedRoute from "./ProtectedRoute";

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ],
  },
];

const publicRoutes: RouteObject[] = [{ path: "/login", Component: Login }];

export { privateRoutes, publicRoutes };
