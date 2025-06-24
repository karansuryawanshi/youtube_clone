// Entry point with route definitions and lazy loading
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./index.css";
import { ChannelProvider } from "./context/ChannelContext";
import { UserProvider } from "./context/UserContext";
import { SearchProvider } from "./context/SearchContext.jsx";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading.jsx";

// Lazy load route components for better performance
const App = lazy(() => import("./App.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const VideoPlayer = lazy(() => import("./pages/VideoPlayer.jsx"));
const MyChannel = lazy(() => import("./pages/MyChannel.jsx"));
const EditVideo = lazy(() => import("./pages/EditVideo.jsx"));
const CreateChannel = lazy(() => import("./pages/CreateChannel.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx"));

// Define routes using react-router
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />, // Fallback for invalid routes
    children: [
      {
        path: "/",
        element: (
          <Suspense
            fallback={
              <div>
                <Loading />
              </div>
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/videos/:id",
        element: (
          <Suspense
            fallback={
              <div>
                <Loading />
              </div>
            }
          >
            <VideoPlayer />
          </Suspense>
        ),
      },
      {
        path: "/my-channel",
        element: (
          <Suspense
            fallback={
              <div>
                <Loading />
              </div>
            }
          >
            <MyChannel />
          </Suspense>
        ),
      },
      {
        path: "/edit-video/:id",
        element: (
          <Suspense
            fallback={
              <div>
                <Loading />
              </div>
            }
          >
            <EditVideo />
          </Suspense>
        ),
      },
      {
        path: "/create-channel",
        element: (
          <Suspense
            fallback={
              <div>
                <Loading />
              </div>
            }
          >
            <CreateChannel />
          </Suspense>
        ),
      },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);

// Render the application with context providers and toast container
createRoot(document.getElementById("root")).render(
  <>
    <SearchProvider>
      <ChannelProvider>
        <UserProvider>
          <RouterProvider router={appRouter} />
        </UserProvider>
      </ChannelProvider>
    </SearchProvider>
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
