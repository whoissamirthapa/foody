import nodemailer from "nodemailer";

export const mail = async (email: string, subject: string, html: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST || "smtp.gmail.com",
            service: process.env.SERVICE || "gmail",
            port: Number(process.env.PORT) || 587,
            secure: Boolean(process.env.SECURE) || false,
            auth: {
                user: process.env.USER || "",
                pass: process.env.PASS || "",
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: html,
        });
    } catch (error) {}
};
