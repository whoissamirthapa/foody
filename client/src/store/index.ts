import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../saga/reducer/auth.reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga";
import companyProfileReducer from "../saga/reducer/company_profile.reducer";

const sagaMiddleware = createSagaMiddleware();
const storeApp = configureStore({
  reducer: {
    auth: authReducer,
    companyProfile: companyProfileReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof storeApp.getState>;
export default storeApp;
