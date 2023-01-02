import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        if (token) {
            jwt.verify(
                token,
                process.env.JWT_SECRET || "abuefajbfweofbajsdbf9waeffaios",
                (err, decoded) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Unauthorized",
                        });
                    }
                    if (decoded === undefined && typeof decoded === "string") {
                        return res.status(401).json({
                            message: "Unauthorized",
                        });
                    }
                    if (typeof decoded === "string") {
                        return;
                    } else {
                        req.user = decoded;
                    }
                }
            );
            next();
        } else {
            res.status(401).send("Unauthorized");
        }
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const role = req.user?.role;
    if (role === "admin") {
        next();
    }
};

export const isSuperAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const role = req.user?.role;
    if (role === "superadmin") {
        next();
    }
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const role = req.user?.role;
    if (role === "user") {
        next();
    }
};

export const isUserAdminSuperAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const role = req.user?.role;
    if (role === "user" || role === "admin" || role === "superadmin") {
        next();
    }
};

export const isAdminSuperAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const role = req.user?.role;
    if (role === "admin" || role === "superadmin") {
        next();
    }
};
