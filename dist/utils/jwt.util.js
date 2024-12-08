"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = generateAuthToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyAndExtractJWT = verifyAndExtractJWT;
/* eslint-disable @typescript-eslint/no-unused-vars */
const jwt = __importStar(require("jsonwebtoken"));
const environment_util_1 = require("./environment.util");
function generateAuthToken(data) {
    return jwt.sign(data, environment_util_1.envi.JWT_AUTH_SECRET, {
        algorithm: "HS256",
        expiresIn: environment_util_1.envi.JWT_AUTH_EXPIRE,
    });
}
function generateRefreshToken(data) {
    return jwt.sign(data, environment_util_1.envi.JWT_REFRESH_SECRET, {
        algorithm: "HS256",
        expiresIn: environment_util_1.envi.JWT_REFRESH_EXPIRE,
    });
}
// export function generateEmailToken(data: JWTType) {
//   return jwt.sign(data, envi.JWT_EMAIL_SECRET, {
//     algorithm: 'HS256',
//     expiresIn: envi.JWT_EMAIL_EXPIRE,
//   });
// }
// export function generatePasswordToken(data: JWTType) {
//   return jwt.sign(data, envi.JWT_PASSWORD_SECRET, {
//     algorithm: 'HS256',
//     expiresIn: envi.JWT_PASSWORD_EXPIRE,
//   });
// }
async function verifyAndExtractJWT(secret, token) {
    return (await new Promise((resolve, _) => {
        jwt.verify(token, secret, (err, extractedToken) => {
            if (err) {
                resolve(null);
            }
            if (!(extractedToken === null || extractedToken === void 0 ? void 0 : extractedToken.id)) {
                resolve(null);
            }
            resolve(extractedToken);
        });
    }));
}
