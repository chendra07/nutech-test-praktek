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
exports.envi = void 0;
exports.environmentValidator = environmentValidator;
exports.stringToBoolean = stringToBoolean;
exports.envValidator = envValidator;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
var EnvironmentEnum;
(function (EnvironmentEnum) {
    EnvironmentEnum["production"] = "production";
    EnvironmentEnum["staging"] = "staging";
    EnvironmentEnum["development"] = "development";
})(EnvironmentEnum || (EnvironmentEnum = {}));
function environmentValidator(envString) {
    if (Object.values(EnvironmentEnum).includes(envString)) {
        return envString;
    }
    return null;
}
function isEnvValid(value) {
    if (typeof value === "number" && isNaN(value)) {
        return true;
    }
    else if (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean") {
        return false;
    }
    else {
        return true;
    }
}
function stringToBoolean(str) {
    const lowerStr = str === null || str === void 0 ? void 0 : str.toLowerCase();
    return lowerStr === "true";
}
/**
 * Checks if all the environment variables used in the application are defined and valid.
 * If any of the variables are undefined or fail a custom validation filter, trigger error to prevent project from running.
 *
 * @throws {Error} If any environment variable is undefined or invalid
 */
function envValidator(envi) {
    let isValid = true;
    const listOfInvalidEnv = [];
    for (const envKey in envi) {
        if (envi[envKey] === undefined || isEnvValid(envi[envKey])) {
            isValid = false;
            listOfInvalidEnv.push(envKey);
        }
    }
    if (!isValid) {
        throw new Error(`ENV [${listOfInvalidEnv.join(", ")}] is undefined or invalid`);
    }
}
exports.envi = {
    NODE_ENV: environmentValidator(process.env.NODE_ENV),
    PORT: +process.env.PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: +process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    WHITELIST: process.env.WHITELIST,
    CLD_NAME: process.env.CLD_NAME,
    CLD_API_KEY: process.env.CLD_API_KEY,
    CLD_API_SECRET: process.env.CLD_API_SECRET,
    BCRYPT_SALT: +process.env.BCRYPT_SALT,
    JWT_AUTH_SECRET: process.env.JWT_AUTH_SECRET,
    JWT_AUTH_EXPIRE: process.env.JWT_AUTH_EXPIRE,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,
};
