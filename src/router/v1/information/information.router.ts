import express from "express";
import {
  httpGetAllBanner,
  httpGetAllPPOBService,
} from "./information.controller";

export const informationRouter = express.Router();

informationRouter.get("/banner", httpGetAllBanner);
informationRouter.get("/services", httpGetAllPPOBService);
