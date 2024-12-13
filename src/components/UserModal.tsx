import { User } from "../mock/users";

interface UserModalProps {
  user: User;
  onClose: () => void;
}

export const UserModal = ({ user, onClose }: UserModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-50 to-purple-50 -m-6 p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
              <svg
                className="w-6 h-6 text-white"
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
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              User Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-white hover:shadow-md transition-all"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {[
            { label: "ID", value: user.id },
            { label: "Name", value: user.name },
            { label: "Email", value: user.email },
            { label: "Role", value: user.role },
            { label: "Join Date", value: user.joinDate },
          ].map((item) => (
            <div key={item.label} className="border-b border-gray-100 pb-3 flex justify-between">
              <label className="text-sm text-gray-500 block">
                {item.label}
              </label>
              <p className="text-gray-800 font-medium text-center">
                {item.label === "Role" ? (
                  <span
                    className={`inline-block px-3 py-0.5 rounded-full text-sm ${
                      item.value === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.value}
                  </span>
                ) : (
                  item.value
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
