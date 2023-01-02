import mongoose from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    countInStock: number;
    rating: number;
    numReviews: number;
    reviews: Array<{
        reviewerId: mongoose.Schema.Types.ObjectId;
        name: string;
        rating: number;
        comment: string;
    }>;
}

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        subCategory: {
            type: String,
            required: false,
        },
        brand: {
            type: String,
            required: false,
        },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        reviews: [
            {
                reviewerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                name: { type: String, required: true },
                comment: { type: String },
                rating: { type: Number, required: true },
            },
            {
                timestamp: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IProduct>("Product", productSchema);
