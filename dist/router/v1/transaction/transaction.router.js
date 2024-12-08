"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const transaction_controller_1 = require("./transaction.controller");
const topup_validator_1 = require("./validator/topup.validator");
const trxPurchase_validator_1 = require("./validator/trxPurchase.validator");
const trxHistory_validator_1 = require("./validator/trxHistory.validator");
exports.transactionRouter = express_1.default.Router();
exports.transactionRouter.get("/balance", auth_middleware_1.validateAuthToken, transaction_controller_1.httpGetAmount);
exports.transactionRouter.post("/topup", auth_middleware_1.validateAuthToken, topup_validator_1.validateInput_TopUp, transaction_controller_1.httpPostTopUp);
exports.transactionRouter.post("/transaction", auth_middleware_1.validateAuthToken, trxPurchase_validator_1.validateInput_Purchase, transaction_controller_1.httpPostPayment);
exports.transactionRouter.get("/transaction/history", auth_middleware_1.validateAuthToken, trxHistory_validator_1.validateQuery_HistoryPagination, transaction_controller_1.httpGetTransactionHistory);
