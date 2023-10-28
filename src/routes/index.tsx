import { RouteObject } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Layout from "../components/Layout";
import ErrorPage from "./ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "./Settings";

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
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
];

const publicRoutes: RouteObject[] = [{ path: "/login", Component: Login }];

export { privateRoutes, publicRoutes };
