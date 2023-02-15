import axios from "../../axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { authActions } from "../reducer/auth.reducer";
import {
  LOGGED_IN,
  LOGGED_OUT,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  VERIFY_NUMBER,
} from "../types";

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* register(action: { type: string; payload: object }) {
  yield put(authActions.authLoading());
  try {
    const response: ResponseGenerator = yield call(() => {
      return axios.post("/api/auth/register", action.payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    const { data } = response;
    yield put(authActions.registerSucess(data));
  } catch (error) {
    yield put(authActions.registerFailure(error));
  }
}

function* verifyNumber(action: { type: string; payload: object }) {
  try {
    const response: ResponseGenerator = yield call(() => {
      return axios.post("/api/auth/verify-number", action.payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    yield put(authActions.verifyNumberSucess(response.data));
  } catch (error) {
    //console.log(error);
  }
}

function* login(action: { type: string; payload: object }) {
  try {
    const response: ResponseGenerator = yield call(() => {
      return axios.post("/api/auth/login", action.payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    yield put(authActions.loginSucess(response.data));
  } catch (error: any) {
    console.log(error.response.data.error);
    yield put(authActions.loginFailure(error.response.data));
  }
}

function* loggedIn(action: { type: string; payload: object }) {
  try {
    const response: ResponseGenerator = yield call(() => {
      return axios.post("/api/auth/loggedin", {
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    yield put(authActions.loginSucess(response.data));
  } catch (error: any) {
    //console.log(error.response.data.error);
    yield put(authActions.loggedinErr(error.response.data));
  }
}

function* loggedOut(action: { type: string; payload: object }) {
  try {
    const response: ResponseGenerator = yield call(() => {
      return axios.post("/api/auth/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    //console.log(response.data);
    yield put(authActions.authLoggedOut());
    yield put(authActions.removeLogData());
  } catch (error: any) {
    console.log(error.response.data.error);
    yield put(authActions.loginFailure(error.response.data));
  }
}

export function* authSaga() {
  yield takeEvery(REGISTER_REQUEST, register);
  yield takeEvery(VERIFY_NUMBER, verifyNumber);
  yield takeEvery(LOGIN_REQUEST, login);
  yield takeEvery(LOGGED_IN, loggedIn);
  yield takeEvery(LOGGED_OUT, loggedOut);
}
