import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegistrationTrend, RegionData } from "../../mock/analytics";

interface DateRange {
  startDate: string;
  endDate: string;
}

interface AnalyticsState {
  selectedRegion: string | null;
  dateRange: DateRange;
  filteredRegistrationTrend: RegistrationTrend[];
  filteredRegionData: RegionData[];
}

const initialState: AnalyticsState = {
  selectedRegion: null,
  dateRange: {
    startDate: "",
    endDate: "",
  },
  filteredRegistrationTrend: [],
  filteredRegionData: [],
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setSelectedRegion: (state, action: PayloadAction<string | null>) => {
      state.selectedRegion = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
    setFilteredData: (
      state,
      action: PayloadAction<{
        registrationTrend: RegistrationTrend[];
        regionData: RegionData[];
      }>
    ) => {
      state.filteredRegistrationTrend = action.payload.registrationTrend;
      state.filteredRegionData = action.payload.regionData;
    },
  },
});

export const { setSelectedRegion, setDateRange, setFilteredData } = analyticsSlice.actions;
export default analyticsSlice.reducer;
