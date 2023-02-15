import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { IoCart } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

import Cart from "../cart";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { LOGGED_OUT } from "../../saga/types";
import { cartItems } from "../../dummyData";

const NavbarTop: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const user = useSelector((state: RootState) => state.auth.logData);

    const [modal, setModal] = useState(false);
    const [myRole, setMyRole] = useState(false);
    const [cartLength, setCartLength] = useState<number>(0);

    useEffect(() => {
        if (user) {
            if (
                user.role === "admin" ||
                user.role === "superadmin" ||
                user.role === "user"
            ) {
                setMyRole(true);
            } else {
                setMyRole(false);
            }
        }
    }, [user]);

    const handleLogout = () => {
        dispatch({ type: LOGGED_OUT, payload: {} });
    };

    useEffect(() => {
        if (window !== undefined) {
            const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");

            if (cart?.Items?.length > 0) {
                setCartLength(cart?.Items?.length);
            } else {
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            }
        }
    }, []);

    return (
        <Navbar
            fluid={true}
            rounded={true}
            className="bg-transparent bg-[#dbd9d965]"
        >
            <Navbar.Brand href="http://localhost:3000/">
                <img src={Logo} className="mr-3 h-9 sm:h-14" alt="Logo" />
                <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
                    Foody
                </span>
            </Navbar.Brand>
            <div className="flex items-center md:order-2">
                <button
                    onClick={() => setModal(!modal)}
                    className="border-none outline-none relative mr-3"
                >
                    <IoCart className="homeCartIcon h-8 w-8 text-orange-500 mr-[10px]" />
                    <span className="absolute top-0 px-1 py-0.1 text-white rounded-full bg-red-600 text-[13px]">
                        {cartLength > 0 ? cartLength : ""}
                    </span>
                </button>
                <Cart modal={modal} setModal={setModal} />

                {isAuth && (
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={
                            <Avatar
                                alt="User settings"
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded={true}
                            />
                        }
                    >
                        <div style={{ backgroundColor: "#fff" }}>
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {user.name}
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    {user.email}
                                </span>
                            </Dropdown.Header>
                            {myRole && <Dropdown.Item>Dashboard</Dropdown.Item>}
                            <Dropdown.Item>My Cart</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>
                                Sign out
                            </Dropdown.Item>
                        </div>
                    </Dropdown>
                )}
                {!isAuth && (
                    <Link to="/login" className="text-orange-500">
                        <button className="bg-orange-400 text-white rounded-full px-4 py-2 mr-2 hover:shadow-xl">
                            Login
                        </button>
                    </Link>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link>
                    <span
                        className={`text-lg ${
                            location.pathname === "/" && "text-orange-400 "
                        } hover:text-orange-400`}
                    >
                        <Link
                            to={"/"}
                            // onClick={() =>
                            //   navDispatch({ type: identifierNav.HOME, payload: "" })
                            // }
                        >
                            Home
                        </Link>
                    </span>
                </Navbar.Link>
                <Navbar.Link>
                    <span
                        className={`text-lg ${
                            location.pathname == "/menu" && " text-orange-400 "
                        }  hover:text-orange-400`}
                    >
                        <Link
                            to={"/menu"}
                            // onClick={() =>
                            //   navDispatch({ type: identifierNav.MENU, payload: "" })
                            // }
                        >
                            Menu
                        </Link>
                    </span>
                </Navbar.Link>
                <Navbar.Link>
                    <span
                        className={`text-lg  ${
                            location.pathname === "/service" &&
                            "text-orange-400"
                        }  hover:text-orange-400`}
                    >
                        <Link
                            to={"/service"}
                            // onClick={() =>
                            //   navDispatch({ type: identifierNav.SERVICES, payload: "" })
                            // }
                        >
                            Services
                        </Link>
                    </span>
                </Navbar.Link>
                <Navbar.Link>
                    <span
                        className={`text-lg ${
                            location.pathname === "/about" && "text-orange-400"
                        }  hover:text-orange-400`}
                    >
                        <Link
                            to={"/about"}
                            // onClick={() =>
                            //   navDispatch({ type: identifierNav.ABOUT, payload: "" })
                            // }
                        >
                            About
                        </Link>
                    </span>
                </Navbar.Link>
                <Navbar.Link>
                    <span
                        className={`text-lg  ${
                            location.pathname === "/contact" &&
                            "text-orange-400"
                        }  hover:text-orange-400`}
                    >
                        <Link
                            to={"/contact"}
                            // onClick={() =>
                            //   navDispatch({ type: identifierNav.CONTACT, payload: "" })
                            // }
                        >
                            Contact
                        </Link>
                    </span>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarTop;
