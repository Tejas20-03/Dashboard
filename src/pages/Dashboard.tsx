import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaginatedUsers } from "../mock/users";
import { UserModal } from "../components/UserModal";
import {
  setCurrentPage,
  setSelectedUser,
  setUsers,
} from "../redux/slices/userSlice";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentPage, users, total, totalPages, selectedUser } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    const data = getPaginatedUsers(currentPage, 5);
    dispatch(setUsers(data));
  }, [currentPage, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => dispatch(setSelectedUser(user))}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition-transform hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-blue-500"
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
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span
                className={`px-3 py-1 rounded-full ${
                  user.role === "Admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.role}
              </span>
              <span className="text-gray-500">{user.joinDate}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {users.length} of {total} users
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() =>
              dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))
            }
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() =>
              dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition-colors"
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
  );
};

export default Dashboard;
