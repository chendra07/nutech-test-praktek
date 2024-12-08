"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthToken = validateAuthToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responses_util_1 = require("../utils/responses.util");
const utils_1 = require("../utils");
const user_service_1 = require("../modules/user/user.service");
async function validateAuthToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return responses_util_1.responses.res401(req, res, null, (0, utils_1.t)("response.not_found", {
            property: (0, utils_1.t)("property.auth.auth_token", null, req),
        }, req));
    }
    const userData = await new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, utils_1.envi.JWT_AUTH_SECRET, (err, userData) => {
            if (err) {
                reject(null);
            }
            resolve(userData);
        });
    }).catch((_) => null);
    if (!userData) {
        return responses_util_1.responses.res401(req, res, null, (0, utils_1.t)("general.error.invalid_credential", null, req));
    }
    const user = await (0, user_service_1.findOneUserById)(userData.id);
    if (!user) {
        responses_util_1.responses.res401(req, res, null, (0, utils_1.t)("response.not_found", {
            property: (0, utils_1.t)("property.auth.auth_token", null, req),
        }, req));
    }
    req.user = user;
    next();
}
