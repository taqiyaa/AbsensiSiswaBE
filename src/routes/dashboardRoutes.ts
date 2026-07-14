import { Router } from "express";

import { getDashboard } from "../controllers/dashboardController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get(
    "/",
    authenticateToken,
    getDashboard
);

export default router;