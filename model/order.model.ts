import mongoose from "mongoose";
import { IAuth } from "./auth.model.js";
import { IProduct } from "./product.model.js";
interface IOrder extends Document {
    orderItems: Array<{
        name: string;
        quantity: number;
        image: string;
        discount: number;
        promoCode: string;
        price: number;
        product: mongoose.Types.ObjectId | IProduct;
    }>;
    shippingAddress: {
        fullName: string;
        address: string;
        email: string;
        phoneNumber: number;
        city: string;
        street: string;
    };
    paymentMethod: string;
    paymentResult: {
        id: string;
        status: string;
        update_time: Date;
    };
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    user: mongoose.Types.ObjectId | IAuth;
    isPaid: boolean;
    paidAt: Date;
    isDelivered: boolean;
    isCancelled: boolean;
    orderStatus: string;
    deliveredAt: Date;
    cancelledAt: Date;
    createdAt: Date;
}

const orderSchema: mongoose.Schema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                discount: { type: Number, default: 0 },
                promoCode: { type: String, default: "" },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            email: { type: String, required: true },
            phoneNumber: { type: Number, required: true },
            city: { type: String, required: true },
            street: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        paymentResult: {
            id: String,
            status: String,
            update_time: Date,
        },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        isCancelled: { type: Boolean, defalut: false },
        orderStatus: {
            type: String,
            default: "Processing",
            enum: ["Processing", "Delivered", "Cancelled"],
        },
        deliveredAt: { type: Date },
        cancelledAt: { type: Date },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IOrder>("Order", orderSchema);
