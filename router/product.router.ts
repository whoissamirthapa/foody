import ProductController from "../controller/product.controller.js";
import { Router } from "express";
import upload from "../middleware/imageupload.js";
import {
    isAuth,
    isUserAdminSuperAdmin,
} from "../middleware/auth.middleware.js";
import { VerifyUser } from "../middleware/verify.middleware.js";

const router = Router();
const productController = new ProductController();
const verifyUser = new VerifyUser();

router.post(
    "/create",
    isAuth,
    isUserAdminSuperAdmin,
    verifyUser.isVerified,
    upload.single("productImage"),
    productController.createProduct
);
router.get("/get-all", isAuth, productController.getProducts);
router.get("/get/:productId", productController.getProduct);
router.get("/get/:category", productController.getProductsByCategory);
router.put(
    "/update/:productId",
    isAuth,
    isUserAdminSuperAdmin,
    verifyUser.isVerified,
    upload.single("productImage"),
    productController.updateProduct
);
router.post("/:productId/review", isAuth, productController.addReview);
router.delete(
    "/delete/:productId",
    isAuth,
    isUserAdminSuperAdmin,
    verifyUser.isVerified,
    productController.deleteProduct
);

export default router;
