// src/layout/AdminLayout.js
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-1/6 bg-[#6020F0] text-white min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <ul>
          <li className="mb-2">
            <Link to="volunteers" className="flex items-center gap-4 px-4 py-2 rounded hover:bg-white hover:text-[#6020F0]">
              Manage Volunteers
            </Link>
          </li>
          <li className="mb-2">
            <Link to="crisis" className="flex items-center gap-4 px-4 py-2 rounded hover:bg-white hover:text-[#6020F0]">
              Manage Crisis
            </Link>
          </li>
          <li className="mb-2">
            <Link to="reports" className="flex items-center gap-4 px-4 py-2 rounded hover:bg-white hover:text-[#6020F0]">
              Daily Reports
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
