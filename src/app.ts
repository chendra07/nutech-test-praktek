import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { envi, envValidator, t } from "./utils";
import middleware from "i18next-http-middleware";
import i18next from "./modules/i18n/i18n";
import { verifyToken } from "./middlewares/auth.middleware";
import { verifyInput_Register } from "./router/v1/user/validator/user.validator";
import bodyParser from "body-parser";

export const app = express();
envValidator(envi);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/", verifyInput_Register, (req: Request, res: Response) => {
  res.send("nutech recruitment take home test");
});
