import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaKey, FaUser } from "react-icons/fa";
import { useAuth } from "../provider/AuthContext";

const Layout = () => {
  const { user, logout } = useAuth(); // Access user state and logout function
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen">
      <aside className="w-1/6 bg-[#6020F0] text-white fixed top-0 left-0 h-full p-4">
        <h2 className="text-2xl font-bold mb-4">Employee Manager</h2>
        <ul>
          {!isAdminRoute ? (
            <>
              <li className="mb-2">
                <Link to="/" className="flex items-center gap-4 px-4 py-2 rounded hover:bg-white hover:text-[#6020F0]">
                  <FaHome /> Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/donation" className="flex items-center gap-4 px-4 py-2 rounded hover:bg-white hover:text-[#6020F0]">
                  <FaUser /> Donation
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/crisis" className="flex items-center gap-4 px-4 py-2 rounded hover:bg-white hover:text-[#6020F0]">
                  <FaKey /> Crisis
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/volunteers" className="flex items-center gap-4 px-4 py-2 rounded hover:bg-white hover:text-[#6020F0]">
                  <FaKey /> Volunteers
                </Link>
              </li>
              {user && user.role === "admin" && ( 
                <li className="mb-2">
                  <Link to="/admin" className="flex items-center gap-4 px-4 py-2 rounded hover:bg-white hover:text-[#6020F0]">
                    <FaKey /> Dashboard
                  </Link>
                </li>
              )}
            </>
          ) : null}
        </ul>

        <div className="mt-auto">
          {user ? ( 
            <>
              <div className="mb-2 text-white">
                {user.username}
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-4 px-4 py-2 rounded bg-white text-[#6020F0] hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : ( // If user is not logged in
            <>
              <Link to="/login" className="flex items-center gap-4 px-4 py-2 rounded bg-white text-[#6020F0] hover:bg-gray-200">
                Login
              </Link>
              <Link to="/register" className="flex items-center gap-4 px-4 py-2 rounded bg-white text-[#6020F0] hover:bg-gray-200 mt-2">
                Register
              </Link>
            </>
          )}
        </div>
      </aside>

      {/* Make the main content scrollable */}
      <main className="flex-1 p-6 ml-[16.6667%] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
