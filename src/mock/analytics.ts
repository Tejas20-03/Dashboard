export interface RegistrationTrend {
  month: string;
  users: number;
}

export interface RegionData {
  region: string;
  users: number;
}

export const registrationTrend: RegistrationTrend[] = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 150 },
  { month: "Mar", users: 180 },
  { month: "Apr", users: 220 },
  { month: "May", users: 250 },
  { month: "Jun", users: 280 },
];

export const regionData: RegionData[] = [
  { region: "North America", users: 450 },
  { region: "Europe", users: 320 },
  { region: "Asia", users: 280 },
  { region: "South America", users: 190 },
  { region: "Africa", users: 150 },
];

export const getAnalyticsData = () => {
  const totalUsers = 1390;
  const activeUsers = Math.floor(totalUsers * 0.75);
  const inactiveUsers = totalUsers - activeUsers;

  const userStatusData = [
    { name: "Active", value: activeUsers },
    { name: "Inactive", value: inactiveUsers },
  ];

  return {
    registrationTrend,
    regionData,
    userStatusData,
  };
};
