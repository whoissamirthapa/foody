import { Label, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../../assets/logo.png";
import { validator } from "./helper";
import "react-toastify/dist/ReactToastify.css";
import { REGISTER_REQUEST, VERIFY_NUMBER } from "../../../saga/types";
import { RootState } from "../../../store";
import { Modal, Button } from "flowbite-react";
import { authActions } from "../../../saga/reducer/auth.reducer";

interface IInfo {
    name: boolean;
    email: boolean;
    number: boolean;
    password: string | boolean;
    cpassword: boolean;
    cpasswordV: string;
}
const Register = () => {
    const dispatch = useDispatch();
    const registeredRes = useSelector((state: RootState) => state.auth.regData);
    const verifyRes = useSelector((state: RootState) => state.auth.infoVerify);
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        number: "",
        password: "",
        cpassword: "",
        name: "",
        email: "",
    });

    const [numberInfo, setNumberInfo] = React.useState(false);
    const [verifyCode, setVerifyCode] = React.useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [info, setInfo] = React.useState({
        name: false,
        email: false,
        number: false,
        password: "",
        cpassword: false,
        cpasswordV: "",
    } as IInfo);

    const [agree, setAgree] = React.useState(false);

    //email validation
    const emailKeyHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const novalidate = validator(e.target.name, e.target.value);
        if (novalidate) {
            setInfo((prevState) => {
                return { ...prevState, email: true };
            });
            return;
        }
        setInfo((prevState) => {
            return { ...prevState, email: false };
        });
    };

    //name validation
    const nameKeyHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const novalidate = validator(e.target.name, e.target.value);
        if (novalidate) {
            setInfo((prevState) => {
                return { ...prevState, name: true };
            });
            return;
        }
        setInfo((prevState) => {
            return { ...prevState, name: false };
        });
    };

    //number validation
    const numberKeyHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const novalidate = validator(e.target.name, e.target.value);
        if (novalidate) {
            setInfo((prevState) => {
                return { ...prevState, number: true };
            });
            return;
        }
        setInfo((prevState) => {
            return { ...prevState, number: false };
        });
    };

    //password validation
    const passwordKeyHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const novalidate = validator(e.target.name, e.target.value);
        if (novalidate) {
            setInfo((prevState) => {
                return { ...prevState, password: novalidate };
            });
            return;
        }
        setInfo((prevState) => {
            return { ...prevState, password: "" };
        });
    };

    //confirm password
    const cpasswordKeyHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData.password !== e.target.value) {
            //console.log(formData.password);
            setInfo((prevState) => {
                return { ...prevState, cpassword: true };
            });
            return;
        }
        setInfo((prevState) => {
            return {
                ...prevState,
                cpassword: false,
                cpasswordV: "Passoword match",
            };
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            !formData.name.trim() ||
            !formData.email.trim().toLocaleLowerCase() ||
            !formData.number ||
            !formData.password ||
            !formData.cpassword
        ) {
            toast.error("Please fill required inputs!", {
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
        if (!agree) {
            document.querySelector(".agreeme")!.innerHTML =
                "Please agree to terms and conditions";
            return;
        }
        dispatch({ type: REGISTER_REQUEST, payload: formData });
    };

    useEffect(() => {
        const isEmpty = Object.keys(registeredRes).length === 0;
        if (!isEmpty) {
            setNumberInfo(!numberInfo);
            // if (numberInfo === false) {
            //     dispatch(authActions.removeRegData());
            // }
        }
    }, [registeredRes]);

    const handleVerify = () => {
        dispatch({
            type: VERIFY_NUMBER,
            payload: { number: registeredRes.number, code: verifyCode },
        });
    };

    const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerifyCode(e.target.value);
    };

    useEffect(() => {
        const isEmpty = Object.keys(verifyRes).length === 0;
        if (!isEmpty) {
            toast.success("Verification Successful", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/login");
            setNumberInfo(!numberInfo);
            setFormData({
                number: "",
                password: "",
                cpassword: "",
                name: "",
                email: "",
            });
            setAgree(false);
            setInfo({
                name: false,
                email: false,
                number: false,
                password: "",
                cpassword: false,
                cpasswordV: "",
            });
            // if (numberInfo === false) {
            //     dispatch(authActions.removeVerifyData());
            // }
        }
    }, [verifyRes]);

    console.log(registeredRes);
    return (
        <>
            <Helmet>
                <title>Register | Foody</title>
            </Helmet>
            <div className="px-[3px] py-4 md:py-8 caslkdf flex flex-col items-center justify-center md:px-[20px]">
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

                <Modal
                    show={numberInfo}
                    onClose={() => setNumberInfo(!numberInfo)}
                >
                    <Modal.Header>Verify Number</Modal.Header>

                    <Modal.Body>
                        <div className="space-y-6">
                            <div>Enter your Code</div>
                            <input
                                type={"number"}
                                name="code"
                                value={verifyCode}
                                onChange={handleVerifyChange}
                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleVerify}>I accept</Button>
                    </Modal.Footer>
                </Modal>

                <section className="register_main_container flex flex-col md:flex-row my-16">
                    <section className="register_login md:w-1/2 p-2 mb-16 md:mb-0 md:text-white flex items-center justify-center">
                        <div>
                            <h2 className="text-center text-4xl mb-4">
                                Welcome to Foody,
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
                                Already have an account? <br />
                                <Link to={"/login"}>
                                    <button className="mt-3 text-[16px] bg-orange-400 rounded-lg text-white hover:shadow-lg px-8 py-1.5">
                                        Login
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                    <section className="register-container md:w-1/2 py-4 px-4 md:pr-8 bg-white">
                        <header className="text-2xl mb-2">Register</header>
                        <section>
                            <form
                                className="flex flex-col w-1/1 block gap-4"
                                style={{ width: "100%" }}
                                onSubmit={handleSubmit}
                            >
                                <section className="flex justify-between w-1/1">
                                    <div style={{ width: "49%" }}>
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="name"
                                                value="Your name"
                                            />
                                        </div>
                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="Your name"
                                            required={false}
                                            value={formData.name}
                                            onChange={handleChange}
                                            onKeyUp={nameKeyHandle}
                                        />
                                        {info.name && (
                                            <span className="text-red-700">
                                                Please enter valid name
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ width: "49%" }}>
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
                                            value={formData.number}
                                            onChange={handleChange}
                                            onKeyUp={numberKeyHandle}
                                        />
                                        {info.number && (
                                            <span className="text-red-700">
                                                Please enter valid number
                                            </span>
                                        )}
                                    </div>
                                </section>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="email1"
                                            value="Your email"
                                        />
                                    </div>
                                    <TextInput
                                        id="email1"
                                        type="email"
                                        name="email"
                                        placeholder="name@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onKeyUp={emailKeyHandle}
                                    />
                                    {info.email && (
                                        <span className="text-red-700">
                                            Please enter valid email
                                        </span>
                                    )}
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
                                        value={formData.password}
                                        onChange={handleChange}
                                        onKeyUp={passwordKeyHandle}
                                    />
                                    {info.password && (
                                        <span className="text-red-700">
                                            {info.password}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="cpassword"
                                            value="Confirm password"
                                        />
                                    </div>
                                    <TextInput
                                        id="cpassword"
                                        type="password"
                                        name="cpassword"
                                        placeholder="Confirm password"
                                        value={formData.cpassword}
                                        onChange={handleChange}
                                        onKeyUp={cpasswordKeyHandle}
                                    />
                                    {info.cpassword && (
                                        <span className="text-red-700">
                                            Password should match
                                        </span>
                                    )}
                                    {!info.cpassword && info.cpasswordV && (
                                        <span className={"text-green-700"}>
                                            Password matched
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="flex flex-col items-center justify-start gap-2">
                                        <div className="w-full">
                                            <input
                                                type={"checkbox"}
                                                name="agree"
                                                id="agree"
                                                onChange={() =>
                                                    setAgree(!agree)
                                                }
                                                className="mr-2"
                                            />

                                            <label htmlFor="agree">
                                                Agree Terms and conditions
                                            </label>
                                        </div>
                                        <p
                                            className={
                                                "text-red-700 agreeme w-full"
                                            }
                                        ></p>
                                    </div>
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
                </section>
            </div>
        </>
    );
};

export default Register;
