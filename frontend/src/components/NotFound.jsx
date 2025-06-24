// https://github.com/karansuryawanshi/ShoppyGlobe-E-commerce

import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

const NotFound = () => {
  // component to show wrong route
  const routerError = useRouteError();
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-4xl font-extrabold text-neutral-600 mb-2">
          {routerError?.status} - {routerError?.statusText}
        </h1>
        <p className="text-gray-700 mb-4">{routerError?.error?.message}</p>
        <Link to="/" className="text-blue-600 underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
