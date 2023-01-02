import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import { sendVerifyEmailLink } from "../controller/verify.controller.js";
import { isAdminSuperAdmin, isAuth } from "../middleware/auth.middleware.js";
import { VerifyUser } from "../middleware/verify.middleware.js";

const router = Router();
const authController = new AuthController();
const verifyUser = new VerifyUser();

router.post("/register", authController.registerUser);

router.post("/verify-number", authController.verifyNumber);

router.post(
    "/login",
    verifyUser.isLoginPhoneVerified,
    authController.loginUser
);

router.get("/verify-email", isAuth, sendVerifyEmailLink);

router.post("/:userId/verify-email/:token", authController.loginUser);

router.post("/loggedin", authController.loggedIn);

router.post("/logout", authController.logoutUser);

router.get(
    "/get-subscriber",
    isAuth,
    isAdminSuperAdmin,
    verifyUser.isVerified,
    authController.getAllSubscriber
);

router.delete(
    "/delete-subscriber/:subscriberId",
    isAuth,
    isAdminSuperAdmin,
    verifyUser.isVerified,
    authController.deleteSubscriber
);

export default router;
