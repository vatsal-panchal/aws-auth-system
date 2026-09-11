import { Router } from "express";
import {
  register,
  login,
  getCallerIdentity,
  rotateAccessKey,
  deleteAccount,
} from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { validateRegistration, validateLogin } from "../middlewares/validateMiddleware";

const router = Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/sts/caller-identity", authenticateToken, getCallerIdentity);
router.post("/iam/rotate-access-key", authenticateToken, rotateAccessKey);
router.delete("/iam/user", authenticateToken, deleteAccount);

export default router;
