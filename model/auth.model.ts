import mongoose from "mongoose";

export interface IAuth extends Document {
    email: string;
    name: string;
    number: number;
    password: string;
    cpassword: string;
    role: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
}

const authSchema: mongoose.Schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        number: {
            type: Number,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        cpassword: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "subscriber",
            enum: ["user", "subscriber", "admin", "superadmin"],
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        isPhoneVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IAuth>("Auth", authSchema);
