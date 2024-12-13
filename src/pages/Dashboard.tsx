import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaginatedUsers } from "../mock/users";
import { UserModal } from "../components/UserModal";
import {
  deleteUser,
  setCurrentPage,
  setSearchTerm,
  setSelectedUser,
  setUsers,
} from "../redux/slices/userSlice";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentPage, users, total, totalPages, selectedUser, searchTerm } =
    useSelector((state: RootState) => state.users);

  useEffect(() => {
    const data = getPaginatedUsers(currentPage, 5, searchTerm);
    dispatch(setUsers(data));
  }, [currentPage, searchTerm, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDelete = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));

      if (users.length === 1 && currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1));
      }
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 lg:mb-8 bg-gradient-to-r from-blue-500 to-blue-600 p-4 lg:p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-0">
            User Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold shadow-sm"
          >
            Logout
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Role
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Join Date
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <svg
                            className="w-5 h-5 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.role === "Admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {user.joinDate}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => dispatch(setSelectedUser(user))}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm gap-4">
          <div className="text-sm font-medium text-gray-600 w-full sm:w-auto text-center sm:text-left">
            Showing {users.length} of {total} users
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() =>
                dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))
              }
              disabled={currentPage === 1}
              className="px-4 lg:px-5 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-all duration-200 font-medium shadow-sm"
            >
              Previous
            </button>
            <button
              onClick={() =>
                dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))
              }
              disabled={currentPage === totalPages}
              className="px-4 lg:px-5 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-all duration-200 font-medium shadow-sm"
            >
              Next
            </button>
          </div>
        </div>

        {selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={() => dispatch(setSelectedUser(null))}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
