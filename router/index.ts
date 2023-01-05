import { Router } from "express";
import authRouter from "./auth.router.js";
import productRouter from "./product.router.js";
import orderRouter from "./order.router.js";
import companyProfileRouter from "./company_profile.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/company-profile", companyProfileRouter);

export default router;
