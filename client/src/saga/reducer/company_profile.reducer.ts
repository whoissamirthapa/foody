import { createSlice } from "@reduxjs/toolkit";

const companyProfileSlice = createSlice({
  name: "companyProfile",
  initialState: {
    isLoading: false,
    error: "",
    contactUsData: {},
  },
  reducers: {
    getContactUsDataLoading: (state) => {
      state.isLoading = true;
      return state;
    },
    getContactUsDataSuccess: (state, action) => {
      state.isLoading = false;
      state.contactUsData = action.payload.data;
      return state;
    },
    getContactUsDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      return state;
    },
    removeContactError: (state) => {
      state.error = "";
      return state;
    },
  },
});

export const companyProfileActions = companyProfileSlice.actions;
export default companyProfileSlice.reducer;
