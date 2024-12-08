import express, { Request, Response } from "express";
import { validateAuthToken } from "../../../middlewares/auth.middleware";
import { httpGetAmount } from "./transaction.controller";

export const transactionRouter = express.Router();

transactionRouter.get("/balance", validateAuthToken, httpGetAmount);
