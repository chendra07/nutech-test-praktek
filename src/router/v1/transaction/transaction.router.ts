import express, { Request, Response } from "express";
import { validateAuthToken } from "../../../middlewares/auth.middleware";
import {
  httpGetAmount,
  httpGetTransactionHistory,
  httpPostPayment,
  httpPostTopUp,
} from "./transaction.controller";
import { validateInput_TopUp } from "./validator/topup.validator";
import { validateInput_Purchase } from "./validator/trxPurchase.validator";
import { validateQuery_HistoryPagination } from "./validator/trxHistory.validator";

export const transactionRouter = express.Router();

transactionRouter.get("/balance", validateAuthToken, httpGetAmount);
transactionRouter.post(
  "/topup",
  validateAuthToken,
  validateInput_TopUp,
  httpPostTopUp
);
transactionRouter.post(
  "/transaction",
  validateAuthToken,
  validateInput_Purchase,
  httpPostPayment
);
transactionRouter.get(
  "/transaction/history",
  validateAuthToken,
  validateQuery_HistoryPagination,
  httpGetTransactionHistory
);
