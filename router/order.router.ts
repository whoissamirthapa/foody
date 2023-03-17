import { Router } from "express";
import { OrderController } from "../controller/order.controller.js";
import {
    isAdminSuperAdmin,
    isAuth,
    isUserAdminSuperAdmin,
} from "../middleware/auth.middleware.js";
import { VerifyUser } from "../middleware/verify.middleware.js";

const router: Router = Router();
const orderContoller = new OrderController();
const verifyUser = new VerifyUser();

router.post("/create", isAuth, orderContoller.createOrder);
router.get(
    "/all",
    isAuth,
    isUserAdminSuperAdmin,
    verifyUser.isVerified,
    orderContoller.getAllOrders
);
router.get("/:orderId", isAuth, isUserAdminSuperAdmin, orderContoller.getOrder);
router.get(
    "/summary",
    isAuth,
    isUserAdminSuperAdmin,
    verifyUser.isVerified,
    orderContoller.getSummaryOrder
);
router.get("/mine", isAuth, orderContoller.getMineOrder);
router.put("/:orderId/pay", isAuth, orderContoller.payOrder);
router.put(
    "/:orderId/deliver",
    isAuth,
    isAdminSuperAdmin,
    verifyUser.isVerified,
    orderContoller.deliverOrder
);
router.put("/:orderId/cancel", isAuth, orderContoller.cancelOrder);
router.delete(
    "/:orderId/delete",
    isAuth,
    isAdminSuperAdmin,
    verifyUser.isVerified,
    orderContoller.deleteOrder
);

export default router;
