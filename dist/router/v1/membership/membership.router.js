"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const login_validator_1 = require("./validator/login.validator");
const membership_controller_1 = require("./membership.controller");
const register_validator_1 = require("./validator/register.validator");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const updateProfile_validator_1 = require("./validator/updateProfile.validator");
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/login", login_validator_1.validateInput_Login, membership_controller_1.httpPostLogin);
exports.authRouter.post("/register", register_validator_1.validateInput_Register, membership_controller_1.httpPostRegister);
exports.authRouter.get("/profile", auth_middleware_1.validateAuthToken, membership_controller_1.httpGetProfile);
exports.authRouter.put("/profile/update", auth_middleware_1.validateAuthToken, updateProfile_validator_1.validateInput_UpdateProfile, membership_controller_1.httpPutUpdate);
exports.authRouter.put("/profile/image", auth_middleware_1.validateAuthToken, membership_controller_1.httpPutUpdateProfileImage);
