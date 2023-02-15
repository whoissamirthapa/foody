import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Router from "./router";
import { authActions } from "./saga/reducer/auth.reducer";
import { LOGGED_IN } from "./saga/types";
import { RootState } from "./store";

function App() {
    const dispatch = useDispatch();
    const loggedinErr = useSelector(
        (state: RootState) => state.auth.loggedinErr
    );
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    // useEffect(() => {
    //     if (window !== undefined) {
    //         const jsonFoodyUser = localStorage.getItem("fDataOody");
    //         if (jsonFoodyUser !== null || jsonFoodyUser !== undefined) {
    //             const foodyUser = JSON.parse(jsonFoodyUser!);
    //             //console.log(foodyUser);
    //             if (foodyUser) {
    //                 dispatch(authActions.loginSucess({ data: foodyUser }));
    //             }
    //         }
    //     }
    // }, []);

    useEffect(() => {
        dispatch({ type: LOGGED_IN, payload: {} });
    }, []);

    useEffect(() => {
        if (loggedinErr) {
            const timer = setTimeout(() => {
                dispatch(authActions.loggedinErr(""));
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [loggedinErr]);

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Router />
        </div>
    );
}

export default App;
