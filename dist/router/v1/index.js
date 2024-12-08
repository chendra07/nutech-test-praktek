"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
const express_1 = __importDefault(require("express"));
const membership_router_1 = require("./membership/membership.router");
const information_router_1 = require("./information/information.router");
const transaction_router_1 = require("./transaction/transaction.router");
exports.v1Router = express_1.default.Router();
// v1Router.use("/auth", authRouter);
exports.v1Router.use(membership_router_1.authRouter);
exports.v1Router.use(information_router_1.informationRouter);
exports.v1Router.use(transaction_router_1.transactionRouter);
