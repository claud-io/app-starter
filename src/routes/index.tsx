import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useAuth } from "../hooks";
import Layout from "../components/Layout";
import ErrorPage from "./ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "./Settings";
import Home from "./Home";
import Login from "./Login";

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

const Router = () => {
  const { initialized } = useAuth();
  if (!initialized) {
    return;
  }

  const router = createBrowserRouter([...privateRoutes, ...publicRoutes]);
  return <RouterProvider router={router} />;
};

export default Router;
