import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import { envi, envValidator } from "./utils";

dotenv.config();

const app: Express = express();
envValidator(envi);
app.use(helmet());
app.use(
  cors({
    origin: envi.WHITELIST?.split(" "),
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(envi.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${envi.PORT}`);
});
