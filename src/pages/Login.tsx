import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { mockLogin } from "../mock/auth";
import { RootState } from "../redux/store";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await mockLogin({ email, password });
      dispatch(loginSuccess(response.token));
    } catch (err) {
      dispatch(loginFailure("Invalid email or password" + err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600 text-center">
          Test credentials:
          <br />
          Email: user@example.com
          <br />
          Password: password123
        </div>
      </div>
      
      <footer className="mt-8 text-sm text-gray-600 text-center">
        Made with <span className="text-red-500">♥</span> by{" "}
        <a 
          href="https://www.tejaschhabra.tech" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Tejas Chhabra
        </a>
      </footer>
    </div>
  );
};

export default Login;
