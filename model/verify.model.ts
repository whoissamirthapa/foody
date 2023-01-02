import mongoose from "mongoose";

export interface IEmailToken extends Document {
    user: mongoose.Schema.Types.ObjectId;
    token: string;
    createdAt: Date;
}

const emailTokenSchema: mongoose.Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 24 * 60 * 60, // 1 day
    },
});

export default mongoose.model<IEmailToken>("EmailToken", emailTokenSchema);
