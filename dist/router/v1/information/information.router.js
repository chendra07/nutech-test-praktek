"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.informationRouter = void 0;
const express_1 = __importDefault(require("express"));
const information_controller_1 = require("./information.controller");
exports.informationRouter = express_1.default.Router();
exports.informationRouter.get("/banner", information_controller_1.httpGetAllBanner);
exports.informationRouter.get("/services", information_controller_1.httpGetAllPPOBService);
