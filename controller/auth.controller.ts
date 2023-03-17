import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/auth.model.js";
import client from "twilio";

export interface UObject {
    id: string;
    name: string;
    email: string;
    role: string;
    number: number;
}

export interface IDecodedToken {
    decoded: any;
}
declare const process: {
    env: {
        JWT_SECRET: string;
        SERVICE_ID: string;
        ACCOUNT_SID: string;
        AUTH_TOKEN: string;
    };
};

// const clientM = client(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export default class AuthController {
    registerUser = async (req: Request, res: Response) => {
        const { name, email, number, password, cpassword } = req.body;
        if (
            name.trim() === "" ||
            email.trim() === "" ||
            number === null ||
            password.trim() === "" ||
            cpassword.trim() === ""
        ) {
            res.status(400).json({
                error: "Please enter all fields",
            });
            return;
        }
        if (password !== cpassword) {
            res.status(400).json({
                error: "Passwords do not match",
            });
            return;
        }

        User.findOne(
            {
                $or: [{ email: email }, { number: number }],
            },
            (err: string, user: object) => {
                if (err) {
                    res.status(400).json({
                        error: "Error occured",
                    });
                    return;
                }
                if (user) {
                    res.status(400).json({
                        error: "User already exists",
                    });
                    return;
                }
            }
        );

        // -------------------------------------------------
        // const userExist = await User.findOne({
        //     $or: [{ email: email }, { number: number }],
        // })
        // if (useExist) {
        //     res.status(400).json({
        //         error: "User already exists",
        //     });
        //     return;
        // }
        //--------------------------------------------------

        const hash = bcrypt.hashSync(password, 12);

        const user = await new User({
            email,
            name,
            number,
            password: hash,
            cpassword: hash,
        }).save();
        if (!user) {
            return res.status(400).json({ error: "User Creation failed" });
        }

        // ------------------------number verification----------------------
        // if (user) {
        //     const phoneNumber = "+977 " + String(number);
        //     clientM.verify
        //         .services(process.env.SERVICE_ID)
        //         .verifications.create({
        //             to: phoneNumber,
        //             channel: "sms",
        //         })
        //         .then((verification) => {
        //             res.status(200).json({
        //                 message: "Verification code sent",
        //                 data: {
        //                     _id: user._id,
        //                     name: user.name,
        //                     email: user.email,
        //                     number: user.number,
        //                     role: user.role,
        //                 },
        //             });
        //         });
        // }
    };

    // verifyNumber = async (req: Request, res: Response) => {
    //     const { number, code } = req.body;
    //     if (!number || !code) {
    //         res.status(400).json({
    //             error: "Invalid Link",
    //         });
    //         return;
    //     }
    //     const phoneNumber = "+977 " + String(number);
    //     clientM.verify
    //         .services(process.env.SERVICE_ID)
    //         .verificationChecks.create({
    //             to: phoneNumber,
    //             code,
    //         })
    //         .then(async (verification) => {
    //             //console.log(verification);
    //             if (verification.status === "approved") {
    //                 const userVerified = await User.findOneAndUpdate(
    //                     { number: number },
    //                     { $set: { isPhoneVerified: true } },
    //                     { new: true }
    //                 );
    //                 res.status(200).json({
    //                     message: "Number verified successfully",
    //                     data: userVerified,
    //                 });
    //             } else {
    //                 res.status(400).json({
    //                     error: "Invalid code",
    //                 });
    //             }
    //         });
    // };

    loginUser = async (req: Request, res: Response) => {
        const { number, password } = req.body;
        if (number === null || password === "") {
            res.status(400).json({
                error: "Please enter all fields",
            });
            return;
        }

        try {
            const user = await User.findOne({ number });

            if (!user) {
                res.status(400).json({
                    error: "User not found",
                });
                return;
            }

            const matching = await bcrypt.compare(password, user.password);
            if (!matching) {
                res.status(400).json({
                    error: "Credentials do not match",
                });
                return;
            }
            const jwtUser = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                number: user.number,
                isEmailVerified: user.isEmailVerified,
                isPhoneVerified: user.isPhoneVerified,
            };
            const token = jwt.sign(
                jwtUser,
                process.env.JWT_SECRET || "abuefajbfweofbajsdbf9waeffaios",
                {
                    expiresIn: "30d",
                }
            );
            if (token) {
                res.cookie("foodyToken", token, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                });
                res.status(200).json({
                    message: "User loggedin Successfully!",
                    token,
                    data: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        number: user.number,
                        isEmailVerified: user.isEmailVerified,
                        isPhoneVerified: user.isPhoneVerified,
                    },
                });
                return;
            }
            return;
        } catch (error) {
            console.log("error in login " + error);
        }
    };

    verifyEmail = async (req: Request, res: Response) => {
        const { id } = req.user;
        if (id === null) {
            res.status(400).json({
                error: "Please enter all fields",
            });
            return;
        }
        try {
            const user = await User.findById(id);
            if (!user) {
                res.status(400).json({
                    error: "User not found",
                });
                return;
            }
            user.isEmailVerified = true;
            await user.save();
            res.status(200).json({
                message: "Email verified successfully",
            });
        } catch (error) {
            console.log("error in verifyEmail " + error);
        }
    };

    loggedIn = async (req: Request, res: Response) => {
        const token = req.cookies?.foodyToken;
        if (!token) {
            res.status(400).json({
                error: "Please login first",
            });
            return;
        }
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || "abuefajbfweofbajsdbf9waeffaios"
            );
            req.loggedIn = decoded;

            if (req.loggedIn) {
                const user = await User.findById(req.loggedIn.id);
                if (user) {
                    return res.status(200).json({
                        message: "User loggedin!",
                        data: {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            number: user.number,
                            isEmailVerified: user.isEmailVerified,
                            isPhoneVerified: user.isPhoneVerified,
                        },
                    });
                }
            }
        } catch (error) {
            console.log("error in loggedin " + error);
        }
    };

    logoutUser = async (req: Request, res: Response) => {
        res.clearCookie("foodyToken");
        res.status(200).json({
            message: "User loggedout Successfully!",
        });
    };

    getAllSubscriber = async (req: Request, res: Response) => {
        const user = req.user;
        if (user.role !== "admin" || user.role !== "superadmin") {
            res.status(400).json({
                error: "You are not authorized to get subscriber info",
            });
            return;
        }
        if (user.role === "admin" || user.role === "superadmin") {
            try {
                const subscribers = await User.find({ role: "subscriber" });
                if (!subscribers) {
                    res.status(400).json({
                        error: "No subscribers found",
                    });
                    return;
                }
                res.status(200).json({
                    message: "Subscribers found",
                    data: subscribers,
                });
            } catch (error) {
                console.log("error in getAllSubscriber " + error);
            }
        }
    };

    deleteSubscriber = async (req: Request, res: Response) => {
        const user = req.user;

        if (user.role !== "admin" || user.role !== "superadmin") {
            res.status(400).json({
                error: "You are not authorized to delete subscriber",
            });
            return;
        }
        if (user.role === "admin" || user.role === "superadmin") {
            try {
                if (!req.params.subscriberId) {
                    res.status(400).json({
                        error: "Please provide subscriber id",
                    });
                    return;
                }
                const deletedSubscriber = await User.findOneAndRemove({
                    $and: [
                        { _id: req.params.subscriberId },
                        { role: "subscriber" },
                    ],
                });
                if (deletedSubscriber) {
                    res.status(200).json({
                        message: "Subscriber deleted successfully",
                        data: deletedSubscriber,
                    });
                }
            } catch (error) {
                console.log("error in deleteSubscriber " + error);
            }
        }
    };
}
