// NavBar + Footer
import React from "react";
import { Outlet, Link } from "react-router-dom";

function MainLayout () {
  return (
    <>
      {/* <NavBar /> */}
      <nav className="bg-blue-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* The Link component takes care of updating the history in the browser */}
          <Link to="/" className="text-white text-lg font-bold">
            Travel
          </Link>
          <div className="flex space-x-4">
            <Link to="/menu" className="text-gray-300 hover:text-white">
              Menu
            </Link>
            <Link to="/posts" className="text-gray-300 hover:text-white">
              Posts
            </Link>
            <Link to="/login" className="text-gray-300 hover:text-white">
              Log In
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
