import { Label, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { LOGIN_REQUEST } from "../../../saga/types";
import { ToastContainer, toast } from "react-toastify";
import { authActions } from "../../../saga/reducer/auth.reducer";

const Login = () => {
    const dispatch = useDispatch();
    const logData = useSelector((state: RootState) => state.auth.logData);
    const errorLogin = useSelector((state: RootState) => state.auth.error);

    const navigate = useNavigate();
    const [loginData, setLoginData] = React.useState({
        number: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log(loginData);
        if (!loginData.number || !loginData.password) {
            toast.error("Please fill all inputs!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        dispatch({ type: LOGIN_REQUEST, payload: loginData });
    };

    useEffect(() => {
        if (errorLogin) {
            toast.error(errorLogin, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            const timer = setTimeout(() => {
                dispatch(authActions.removeError());
            }, 5500);

            return () => clearTimeout(timer);
        }
    }, [errorLogin]);

    useEffect(() => {
        if (logData) {
            const isEmpty = Object.values(logData).every(
                (value) => value === ""
            );
            if (!isEmpty) {
                // if (window !== undefined) {
                //     localStorage.setItem("fDataOody", JSON.stringify(logData));
                // }
                toast.success("Login Successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                const timer = setTimeout(() => {
                    navigate("/");
                }, 2200);

                return () => clearTimeout(timer);
            }
        }
    }, [logData]);

    return (
        <>
            <Helmet>
                <title>Register | Foody</title>
            </Helmet>
            <div className="px-[3px] caslkdf flex items-center justify-center md:px-[20px]">
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
                <section className="login_main_container flex flex-col-reverse md:flex-row my-16">
                    <section className="login-container py-4 md:py-24 px-4 md:pr-8 bg-white">
                        <header className="text-2xl mb-2">Login</header>
                        <section>
                            <form
                                className="flex flex-col w-1/1 block gap-4"
                                style={{ width: "100%" }}
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="number"
                                            value="Your number"
                                        />
                                    </div>
                                    <TextInput
                                        id="number"
                                        type="number"
                                        name="number"
                                        placeholder="Your number"
                                        onChange={handleChange}
                                        value={loginData.number}
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password"
                                            value="Your password"
                                        />
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Your password"
                                        onChange={handleChange}
                                        value={loginData.password}
                                    />
                                </div>

                                <div className="flex flex-wrap justify-between">
                                    <Link
                                        to={"/forgot_pw"}
                                        className="underline decoration-1 hover:text-blue-500"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                    className="px-1.32 py-2 w-[100px] text-white bg-orange-400 rounded-md"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </section>
                    </section>
                    <section className="login_register p-2 mb-16 md:mb-0 md:text-white flex items-center justify-center">
                        <div>
                            <h2 className="text-center text-4xl mb-4">
                                Welcome Back,
                            </h2>
                            <p className="w-10/12 m-auto">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Cupiditate facere numquam
                                velit ex nam vel odit repellendus, animi nulla
                                doloremque? Lorem ipsum dolor, sit amet
                                consectetur adipisicing elit. Aperiam delectus
                                sit quae distinctio iste saepe! Dignissimos
                                provident perferendis porro veritatis.
                            </p>
                            <div className="text-center mt-4 text-xl">
                                Does not have an account? <br />
                                <Link to={"/register"}>
                                    <button className="mt-3 text-[16px] bg-orange-400 rounded-lg text-white hover:shadow-lg px-8 py-1.5">
                                        Register
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </>
    );
};

export default Login;
