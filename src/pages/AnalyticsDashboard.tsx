import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { getAnalyticsData } from "../mock/analytics";
import AnalyticsFilters from "../components/AnalyticsFilter";
import { useEffect } from "react";
import { setFilteredData } from "../redux/slices/analyticsSlice";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AnalyticsDashboard = () => {
  const dispatch = useDispatch();
  const { total, deletedUsersCount } = useSelector(
    (state: RootState) => state.users
  );
  const { selectedRegion, dateRange, filteredRegistrationTrend, filteredRegionData } = useSelector(
    (state: RootState) => state.analytics
  );
  const activeUsers = Math.floor(total * 0.8);
  const { registrationTrend, regionData, userStatusData } = getAnalyticsData();

  useEffect(() => {
    let filteredTrend = [...registrationTrend];
    let filteredRegions = [...regionData];

    if (selectedRegion) {
      filteredRegions = regionData.filter((region) => region.region === selectedRegion);
    }

    if (dateRange.startDate && dateRange.endDate) {
      filteredTrend = registrationTrend.filter((item) => {
        const itemDate = new Date(`2023-${item.month}-01`);
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);
        return itemDate >= start && itemDate <= end;
      });
    }

    dispatch(setFilteredData({
      registrationTrend: filteredTrend,
      regionData: filteredRegions,
    }));
  }, [selectedRegion, dateRange, dispatch, registrationTrend, regionData]);

  const displayedRegistrationTrend = filteredRegistrationTrend.length > 0 
    ? filteredRegistrationTrend 
    : registrationTrend;
  
  const displayedRegionData = filteredRegionData.length > 0 
    ? filteredRegionData 
    : regionData;

  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-gray-800">
          Analytics Dashboard
        </h1>

        <AnalyticsFilters />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
            <h2 className="text-base lg:text-lg font-semibold text-gray-600">Total Users</h2>
            <p className="text-3xl lg:text-4xl font-bold text-blue-600 mt-2">{total}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
            <h2 className="text-base lg:text-lg font-semibold text-gray-600">Active Users</h2>
            <p className="text-3xl lg:text-4xl font-bold text-green-600 mt-2">{activeUsers}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
            <h2 className="text-base lg:text-lg font-semibold text-gray-600">Deleted Users</h2>
            <p className="text-3xl lg:text-4xl font-bold text-red-600 mt-2">{deletedUsersCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
            <h2 className="text-base lg:text-lg font-semibold text-gray-600 mb-4">
              User Registration Trend
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={displayedRegistrationTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
            <h2 className="text-base lg:text-lg font-semibold text-gray-600 mb-4">
              User Status Distribution
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {userStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 lg:col-span-2">
            <h2 className="text-base lg:text-lg font-semibold text-gray-600 mb-4">
              Users by Region
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayedRegionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8">
                    {displayedRegionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
