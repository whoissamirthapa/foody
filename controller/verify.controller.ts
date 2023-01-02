import { Request, Response } from "express";
import { mail } from "../utils/sendMail.js";
import crypto from "crypto";
import User from "../model/auth.model.js";
import EmailToken from "../model/verify.model.js";

export const sendVerifyEmailLink = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        res.status(400).json({
            error: "User not found",
        });
        return;
    }
    const emailToken = await new EmailToken({
        user: user.id,
        token: crypto.randomBytes(32).toString("hex"),
    }).save();

    if (!emailToken) {
        return res.status(400).json({ error: "Email Token Creation failed" });
    }

    const link = `${process.env.BASE_URL}/api/auth/${user.id}/verify-email/${emailToken.token}`;
    await mail(
        user.email,
        "Verify your email",
        `
        <h3>Welcome to Foody</h3>
        <p>
        Please click on the link below to verify your email address. 
        This is required to confirm ownership of the email address.
        </p>
        <a href="${link}">Click to verify your email</a>
        <p>
        If you're having trouble, try copying and pasting the following URL into your browser:
        <br />
        ${link}
        </p>
        
        <p>
        This link is valid for 24 hours only. If it has expired, you can request a new link.
        </p>
        <br/>
        <br/>
        <p>
        Thank you,<br />
        Foody<br />
        <a href="${process.env.BASE_URL}">${process.env.BASE_URL}</a>
        </p>
        `
    );
};

export const verifyEmail = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const token = req.params.token;
    if (!userId) {
        res.status(400).json({
            error: "Invalid Link",
        });
        return;
    }

    try {
        const user = await User.findById(userId);
        if (user?.isEmailVerified) {
            res.status(400).json({
                error: "Email already verified",
            });
            return;
        }
        if (!user) {
            res.status(400).json({
                error: "Invalid Link",
            });
            return;
        }

        const emailToken = await EmailToken.findOne({
            $and: [{ user: userId }, { token: token }],
        });

        if (!emailToken) {
            return res.status(400).json({ message: "Invalid Link" });
        }
        user.isEmailVerified = true;
        await user.save();
        await emailToken.remove();
        res.status(200).json({
            message: "Email verified successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
