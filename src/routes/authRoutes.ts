import { Router } from "express";
import { register, login, getCallerIdentity } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/sts/caller-identity", authenticateToken, getCallerIdentity);

export default router;
