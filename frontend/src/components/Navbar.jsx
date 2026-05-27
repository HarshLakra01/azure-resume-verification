import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

function Navbar() {

  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token whenever route changes
  useEffect(() => {

    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);

  }, [location]);

  // Logout Function
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/login";

  };

  return (

    <nav className="bg-gray-950 text-white shadow-lg border-b border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-400"
        >
          Azure Resume System
        </Link>

        {/* Navigation */}
        <div className="flex gap-6 items-center">

          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>

          {/* Logged OUT */}
          {!isLoggedIn && (
            <>

              <Link
                to="/login"
                className="hover:text-blue-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>

            </>
          )}

          {/* Logged IN */}
          {isLoggedIn && (
            <>

              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/upload"
                className="hover:text-blue-400 transition"
              >
                Upload Resume
              </Link>

              <Link
                to="/admin"
                className="hover:text-blue-400 transition"
              >
                Admin
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>

            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;