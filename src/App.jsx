import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout/layout";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loaders.js";

const HomePage = React.lazy(() => import("./routes/homePage/homePage.jsx"));
const ListPage = React.lazy(() => import("./routes/listPage/listPage.jsx"));
const SinglePage = React.lazy(() =>
  import("./routes/singlePage/singlePage.jsx")
);
const ProfilePage = React.lazy(() =>
  import("./routes/profilePage/profilePage.jsx")
);
const Login = React.lazy(() => import("./routes/login/login.jsx"));
const Register = React.lazy(() => import("./routes/register/register.jsx"));
const NewPostPage = React.lazy(() =>
  import("./routes/newPostPage/newPostPage.jsx")
);
const ProfileUpdatePage = React.lazy(() =>
  import("./routes/profileUpdatePage/profileUpdatePage.jsx")
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
