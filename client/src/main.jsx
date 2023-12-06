import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { Provider, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store.js";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./pages/signIn/signIn.jsx";
import NavBar from "./components/navbar.jsx";
import SignUp from "./pages/signUp/signUp.jsx";
import Home from "./pages/home/home.jsx";
import { useSelector } from "react-redux";
import { fetchUser, userSelector } from "./redux/reducers/user.reducer.js";
//check loged in user
const IsLogedIn = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  //fetch user async
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  //if alredy loged in
  //else return landing home page

  if (user.logedin) {
    return <>{children}</>;
  } else {
    return <Navigate to="/sign-in" />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        index: true,
        element: (
          <IsLogedIn>
            <App />
          </IsLogedIn>
        ),
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>
);
