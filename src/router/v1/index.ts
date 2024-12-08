import express from "express";
import { authRouter } from "./membership/membership.router";
import { informationRouter } from "./information/information.router";
import { transactionRouter } from "./transaction/transaction.router";

export const v1Router = express.Router();

// v1Router.use("/auth", authRouter);
v1Router.use(authRouter);
v1Router.use(informationRouter);
v1Router.use(transactionRouter);
