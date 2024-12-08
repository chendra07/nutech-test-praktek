"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = t;
exports.extractZodError = extractZodError;
const i18n_1 = __importDefault(require("../modules/i18n/i18n"));
function t(key, options, req) {
    return (req ? req.t(key, options) : i18n_1.default.t(key, options));
}
function extractZodError(error, type = "input") {
    if (error) {
        const result = error.errors.map((issue) => {
            return type ? `${type} ${issue.message}` : issue.message;
        });
        return result.join(", ");
    }
}
