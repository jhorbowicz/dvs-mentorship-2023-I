import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";
import WeekOne from "./week-one/WeekOne";
import WeeksTwoAndThree from "./weeks-two-and-three/WeeksTwoAndThree";
import WeeksFourToSix from "./weeks-four-to-six/WeeksFourToSix";
import WeeksEightAndNine from "./weeks-eight-and-nine/WeeksEightAndNine";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/week-1",
    element: <WeekOne />,
  },
  {
    path: "/weeks-2-and-3",
    element: <WeeksTwoAndThree />,
  },
  {
    path: "/weeks-4-to-6",
    element: <WeeksFourToSix />,
  },
  {
    path: "/weeks-8-and-9",
    element: <WeeksEightAndNine />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
);
