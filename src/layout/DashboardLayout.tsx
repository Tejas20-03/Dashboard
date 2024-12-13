import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 bg-grid-pattern">
      {!isSidebarOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      <div
        className={`fixed lg:static w-64 h-full bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-10`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <NavLink
            to="/dashboard"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 hover:bg-blue-50 transition-colors ${
                isActive ? "bg-blue-50 border-r-4 border-blue-500" : ""
              }`
            }
          >
            <span className="text-gray-800">User Dashboard</span>
          </NavLink>
          <NavLink
            to="/analytics"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 hover:bg-blue-50 transition-colors ${
                isActive ? "bg-blue-50 border-r-4 border-blue-500" : ""
              }`
            }
          >
            <span className="text-gray-800">Analytics Dashboard</span>
          </NavLink>
        </nav>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-5"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 overflow-auto lg:ml-0">
        <div className="lg:p-6 p-4 pt-16 lg:pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
