import { Outlet, Link } from "react-router-dom";

function NavBar() {
return (
    <>
      {/* <NavBar /> */}
      <nav className="bg-blue-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* The Link component takes care of updating the history in the browser */}
          <Link to="/" className="text-white text-lg font-bold">
            Travel Blog
          </Link>
          <div className="flex space-x-4">
            <Link to="/create" className="text-gray-300 hover:text-white">
              Create New Post
            </Link>
            <Link to="/posts/:id" className="text-gray-300 hover:text-white">
              Posts
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
}

export default NavBar