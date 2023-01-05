import { Router } from "express";
import { getContactUs } from "../controller/company_profile.controller.js";

const router = Router();

router.post("/contact-us", getContactUs);

export default router;
