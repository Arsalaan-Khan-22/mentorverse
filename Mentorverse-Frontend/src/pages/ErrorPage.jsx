import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-8">
      <h1 className="text-5xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-6">
        {error?.statusText || error?.message || "Something went wrong."}
      </p>
      <p className="text-lg mb-6">{error?.status && `Error Code: ${error.status}`}</p>
      <Link
        to="/"
        className="px-6 py-3 bg-(--primary-color) text-white font-semibold rounded-lg hover:bg-(--primary-color)"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
