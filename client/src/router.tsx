import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./containers/about";
import Login from "./containers/auth/login";
import Register from "./containers/auth/register";
import ContactPage from "./containers/contact";
import Home from "./containers/home";
import MenuPage from "./containers/menu";
import ServicePage from "./containers/service";
import Test from "./test";
import { RootState } from "./store";
import ProtectedRoute from "./utils/protected.route";
import Dashboard from "./containers/dashboard";
import Error404 from "./containers/404";

const Router: React.FC = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/service" element={<ServicePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/test" element={<Test />} />
                    <Route
                        path="/login"
                        element={
                            <ProtectedRoute isAuth={isAuth} redirect={"/"}>
                                <Login />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <ProtectedRoute isAuth={isAuth} redirect={"/"}>
                                <Register />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Router;
