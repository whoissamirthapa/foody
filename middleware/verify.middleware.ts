import { NextFunction, Request, Response } from "express";
import User from "../model/auth.model.js";

export class VerifyUser {
    isVerifiedEmail = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id, isEmailVerified } = req.user;
        if (!id) {
            res.status(400).json({
                error: "User not found",
            });
        }

        if (isEmailVerified) {
            next();
        } else {
            res.status(400).json({
                error: "email is not verified",
            });
        }
    };
    isVerifiedPhone = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id, isPhoneVerified } = req.user;
        if (!id) {
            res.status(400).json({
                error: "User not found",
            });
        }

        if (isPhoneVerified) {
            next();
        } else {
            res.status(400).json({
                error: "Phone is not verified",
            });
        }
    };
    isVerified = async (req: Request, res: Response, next: NextFunction) => {
        const { id, isEmailVerified, isPhoneVerified } = req.user;
        if (!id) {
            res.status(400).json({
                error: "User not found",
            });
            return;
        }
        if (isEmailVerified && isPhoneVerified) {
            next();
        } else {
            res.status(400).json({
                error: "User(email, number) is not verified",
            });
        }
    };
    isLoginPhoneVerified = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { number } = req.body;
        if (!number) {
            res.status(400).json({
                error: "Invalid number",
            });
            return;
        }

        const user = await User.findOne({ number });
        if (!user) {
            res.status(400).json({
                error: "User not found",
            });
            return;
        }

        if (user.isPhoneVerified) {
            //console.log("user is verified");
            next();
        } else {
            res.status(400).json({
                error: "Phone is not verified",
            });
        }
    };
}
