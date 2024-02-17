import { Router } from "express";
import {
  changePassword,
  deleteUser,
  editUser,
  forgotPassword,
  getUser,
  login,
  logout,
  refreshToken,
  register,
  resetPassword,
  sendForgotPasswordLink,
  verifyEmail,
} from "../controllers/user/index.js";
import { auth, imageUpload } from "../middlewares/index.js";

const router = Router();

// AUTH
router.post("/", register);
router.post("/login", login);
// router.post('/logout', auth, logout);
router.post("/verify-email/:token", verifyEmail);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", auth, forgotPassword);
// router.post('/send-verification-code', sendVerificationCode);
router.post("/send-forgot-password-link", sendForgotPasswordLink);
router.post("/reset-password/:token", resetPassword);

// EDIT
// router.post('/change-password', auth, changePassword);
// router.put('/', auth, imageUpload, editUser);
router.put("/", auth, editUser);

router.get("/", auth, getUser);
// router.delete('/', auth, deleteUser);

export default router;
