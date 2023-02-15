import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Iprops = {
    isAuth: boolean;
    redirect: string;
    children: JSX.Element;
};

const OutProtectedRoutes: React.FC<Iprops> = ({
    isAuth,
    redirect = "/",
    children,
}) => {
    if (isAuth) {
        return <Navigate to={redirect} />;
    }
    return children ? children : <Outlet />;
};

export default OutProtectedRoutes;
