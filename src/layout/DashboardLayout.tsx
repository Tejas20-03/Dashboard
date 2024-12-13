import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 bg-grid-pattern">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <NavLink
            to="/dashboard"
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

      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
