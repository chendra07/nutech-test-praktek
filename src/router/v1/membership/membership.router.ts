import express, { Request, Response } from "express";
import { validateInput_Login } from "./validator/login.validator";
import {
  httpGetProfile,
  httpPostLogin,
  httpPostRegister,
  httpPutUpdate,
  httpPutUpdateProfileImage,
} from "./membership.controller";
import { validateInput_Register } from "./validator/register.validator";
import { validateAuthToken } from "../../../middlewares/auth.middleware";
import { validateInput_UpdateProfile } from "./validator/updateProfile.validator";

export const authRouter = express.Router();

authRouter.post("/login", validateInput_Login, httpPostLogin);
authRouter.post("/register", validateInput_Register, httpPostRegister);
authRouter.get("/profile", validateAuthToken, httpGetProfile);
authRouter.put(
  "/profile/update",
  validateAuthToken,
  validateInput_UpdateProfile,
  httpPutUpdate
);
authRouter.put("/profile/image", validateAuthToken, httpPutUpdateProfileImage);
