import { Request, Response } from "express";
import Order from "../model/order.model.js";
import User from "../model/auth.model.js";
import Product from "../model/product.model.js";

export class OrderController {
    async createOrder(req: Request, res: Response) {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = req.body;

        if (
            !shippingAddress ||
            !paymentMethod ||
            !itemsPrice ||
            !shippingPrice ||
            !taxPrice ||
            !totalPrice
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const user = req.user;

        if (orderItems.length === 0) {
            res.status(400).json({
                error: "Please add at least one item to your order",
            });
            return;
        }

        const order = await new Order({
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice: taxPrice ? taxPrice : 0,
            totalPrice,
            user: user.id,
        }).save();

        if (!order) {
            res.status(400).json({
                error: "Error occured",
            });
            return;
        }

        res.status(200).json({
            message: "Order created successfully",
            data: order,
        });
    }

    async getAllOrders(req: Request, res: Response) {
        const order = await Order.find();
        if (!order.length) {
            res.status(400).json({
                error: "Order not found",
            });
            return;
        }
        res.status(200).json({
            message: "Order found",
            data: order,
        });
    }

    async getSummaryOrder(req: Request, res: Response) {
        const order = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    numItems: { $sum: "$orderItems.quantity" },
                    totalPrice: { $sum: "$totalPrice" },
                },
            },
        ]);

        if (!order.length) {
            res.status(400).json({
                error: "Order not found",
            });
            return;
        }

        const user = await User.find();

        if (!user.length) {
            res.status(400).json({
                error: "User not found",
            });
            return;
        }

        const productCategory = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    numProducts: { $sum: 1 },
                },
            },
        ]);

        if (!productCategory.length) {
            res.status(400).json({
                error: "Product not found",
            });
            return;
        }

        res.status(200).json({
            message: "Order found",
            data: { order, user, productCategory },
        });
    }

    async getOrder(req: Request, res: Response) {
        const orderId = req.params.orderId;
        if (!orderId) {
            res.status(400).json({
                error: "Order id is required",
            });
            return;
        }
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(400).json({
                error: "Order not found",
            });
            return;
        }
        res.status(200).json({
            message: "Order found",
            data: order,
        });
    }

    async getMineOrder(req: Request, res: Response) {
        const user = req.user;
        if (!user) {
            res.status(400).json({
                error: "User not found",
            });
            return;
        }
        const order = await Order.find({ user: user.id });
        if (!order.length) {
            res.status(400).json({
                error: "Order not found",
            });
            return;
        }
        res.status(200).json({
            message: "Order found",
            data: order,
        });
    }

    async payOrder(req: Request, res: Response) {
        const orderId = req.params.orderId;
        if (!orderId) {
            res.status(400).json({
                error: "Order id is required",
            });
            return;
        }
        const order = await Order.findById(orderId).populate(
            "user",
            "name email phoneNumber"
        );
        if (!order) {
            res.status(400).json({
                error: "Order not found",
            });
            return;
        }

        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id: orderId,
            status: req.body.status,
            update_time: new Date(),
        };

        const paidOrder = await order.save();
        if (!paidOrder) {
            res.status(400).json({
                error: "Error occured on paid order",
            });
            return;
        }
        res.status(200).json({
            message: "Order paid successfully",
            data: paidOrder,
        });
    }

    async deliverOrder(req: Request, res: Response) {
        const orderId = req.params.orderId;
        if (!orderId) {
            res.status(400).json({
                error: "Order id is required",
            });
            return;
        }
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(400).json({
                error: "Order not found",
            });
            return;
        }
        order.isDelivered = true;
        order.deliveredAt = new Date();
        order.orderStatus = "Delivered";
        const updatedOrder = await order.save();
        if (!updatedOrder) {
            res.status(400).json({
                error: "Error occured in updating/deliver order",
            });
            return;
        }
        res.status(200).json({
            message: "Order updated successfully",
            data: updatedOrder,
        });
    }

    async cancelOrder(req: Request, res: Response) {
        const orderId = req.params.orderId;
        if (!orderId) {
            res.status(400).json({
                error: "Order id is required",
            });
            return;
        }
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(400).json({
                error: "Order not found",
            });
            return;
        }
        order.isCancelled = true;
        order.cancelledAt = new Date();
        order.orderStatus = "Cancelled";
        const updatedOrder = await order.save();

        if (!updatedOrder) {
            res.status(400).json({
                error: "Error occured in updating/cancel order",
            });
            return;
        }
        res.status(200).json({
            message: "Order cancelled successfully",
            data: updatedOrder,
        });
    }

    async deleteOrder(req: Request, res: Response) {
        const orderId = req.params.orderId;
        if (!orderId) {
            res.status(400).json({
                error: "Order id is required",
            });
            return;
        }
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(400).json({
                error: "Order not found",
            });
            return;
        }
        const deletedOrder = await order.remove();
        if (!deletedOrder) {
            res.status(400).json({
                error: "Error occured in deleting order",
            });
            return;
        }
        res.status(200).json({
            message: "Order deleted successfully",
            data: deletedOrder,
        });
    }
}
