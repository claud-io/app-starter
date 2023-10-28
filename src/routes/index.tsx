import { RouteObject } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoot";
import ErrorPage from "./ErrorPage";

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
