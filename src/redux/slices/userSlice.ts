import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../mock/users";

interface UserState {
  users: User[];
  currentPage: number;
  totalPages: number;
  total: number;
  selectedUser: User | null;
  searchTerm: string;
  deletedUsersCount: number;
}

const initialState: UserState = {
  users: [],
  currentPage: 1,
  totalPages: 1,
  total: 0,
  selectedUser: null,
  searchTerm: "",
  deletedUsersCount: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (
      state,
      action: PayloadAction<{
        users: User[];
        total: number;
        totalPages: number;
      }>
    ) => {
      state.users = action.payload.users;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.total -= 1;
      state.totalPages = Math.ceil(state.total / 5);
      state.deletedUsersCount += 1;
      if (state.selectedUser?.id === action.payload) {
        state.selectedUser = null;
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
  },
});

export const {
  setUsers,
  setCurrentPage,
  setSelectedUser,
  deleteUser,
  setSearchTerm,
} = userSlice.actions;
export default userSlice.reducer;
