// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoPlayer from "./pages/VideoPlayer.jsx";
import Home from "./pages/Home.jsx";
import MyChannel from "./pages/MyChannel.jsx";
import { ChannelProvider } from "./context/ChannelContext";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { UserProvider } from "./context/UserContext";
import CreateChannel from "./pages/CreateChannel.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditVideo from "./pages/EditVideo.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/videos/:id", element: <VideoPlayer /> },
      { path: "/my-channel", element: <MyChannel /> },
      { path: "/edit-video/:id", element: <EditVideo /> },
      { path: "/create-channel", element: <CreateChannel /> },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    {/* <StrictMode> */}
    <SearchProvider>
      <ChannelProvider>
        <UserProvider>
          <RouterProvider router={appRouter} />
        </UserProvider>
      </ChannelProvider>
    </SearchProvider>
    {/* </StrictMode> */}
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Zoom}
    />
  </>
);
