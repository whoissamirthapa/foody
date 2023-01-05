import mongoose from "mongoose";

export interface IContactUs extends Document {
    name: string;
    address_location: string;
    email: string;
    mobile_no: number;
    subject: string;
    message: string;
}

const contactUsSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        address_location: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,

            trim: true,
            lowercase: true,
        },
        mobile_no: {
            type: Number,
            required: true,
            trim: true,
        },
        subject: {
            type: String,

            trim: true,
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IContactUs>("ContactUs", contactUsSchema);
