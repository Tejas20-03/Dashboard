import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import { RootState, store } from "./redux/store";
import DashboardLayout from "./layout/DashboardLayout";

const AppRoutes = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = !!token;

  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
