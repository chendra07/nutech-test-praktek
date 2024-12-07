import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { envi, envValidator, t } from "./utils";
import middleware from "i18next-http-middleware";
import i18next from "./modules/i18n/i18n";
import { responses } from "./utils/responses.util";

export const app = express();
envValidator(envi);

app.use(helmet());
app.use(middleware.handle(i18next));
app.use(
  cors({
    origin: envi.WHITELIST?.split(" "),
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("nutech recruitment take home test");
});
