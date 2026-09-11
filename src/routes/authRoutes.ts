import { Router } from "express";
import { register, login, getCallerIdentity } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { validateRegistration, validateLogin } from "../middlewares/validateMiddleware";

const router = Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/sts/caller-identity", authenticateToken, getCallerIdentity);

export default router;
