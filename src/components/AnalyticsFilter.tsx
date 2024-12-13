import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setSelectedRegion,
  setDateRange,
} from "../redux/slices/analyticsSlice";
import { regionData } from "../mock/analytics";

const AnalyticsFilters = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value === "all" ? null : e.target.value;
    dispatch(setSelectedRegion(region));
  };

  const handleDateChange = () => {
    dispatch(
      setDateRange({
        startDate,
        endDate,
      })
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Region
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleRegionChange}
          >
            <option value="all">All Regions</option>
            {regionData.map((region) => (
              <option key={region.region} value={region.region}>
                {region.region}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onBlur={handleDateChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onBlur={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsFilters;
