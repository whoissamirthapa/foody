import axios from "../../axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { companyProfileActions } from "../reducer/company_profile.reducer";
import { CONTACTUS_REQUEST } from "../types";
import { ResponseGenerator } from "./auth.saga";

function* getContactUsData(action: { type: string; payload: object }) {
  yield put(companyProfileActions.getContactUsDataLoading());
  console.log(action.payload);
  try {
    const response: ResponseGenerator = yield call(() => {
      return axios.post("/api/company-profile/contact-us", action.payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
    console.log(response);
    yield put(companyProfileActions.getContactUsDataSuccess(response.data));
  } catch (error) {
    yield put(companyProfileActions.getContactUsDataFailure(error));
  }
}

export function* companyProfileSaga() {
  yield takeEvery(CONTACTUS_REQUEST, getContactUsData);
}
