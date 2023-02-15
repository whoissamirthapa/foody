import { createSlice } from "@reduxjs/toolkit";

interface IauthState {
    isLoading: boolean;
    isAuth: boolean;
    loggedinErr: string;
    error: string | null;
    regData: any | null;
    logData: any | null;
    infoVerify: any | null;
}
const initialState = {
    isLoading: false,
    isAuth: false,
    error: "",
    loggedinErr: "",
    regData: {},
    logData: {},
    infoVerify: {},
} as IauthState;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authLoading: (state) => {
            state.isLoading = true;
            return state;
        },
        registerSucess: (state, action) => {
            state.isLoading = false;
            state.regData = action.payload.data;
            return state;
        },
        registerFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            return state;
        },
        removeRegData: (state) => {
            state.regData = {};
            return state;
        },
        loginSucess: (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.logData = action.payload.data;
            return state;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            return state;
        },
        removeLogData: (state) => {
            state.logData = {};
            return state;
        },
        verifyNumberSucess: (state, action) => {
            state.isLoading = false;
            state.infoVerify = action.payload;
            state.regData = action.payload.data;
            return state;
        },
        verifyNumberFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            return state;
        },
        removeVerifyData: (state) => {
            state.infoVerify = {};
            return state;
        },
        removeError: (state) => {
            state.error = "";
            return state;
        },
        loggedinErr: (state, action) => {
            state.isLoading = false;
            state.loggedinErr = action.payload.error;
            return state;
        },
        authLoggedOut: (state) => {
            state.isAuth = false;
            return state;
        },
    },
    extraReducers: {},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
