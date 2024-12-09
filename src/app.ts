import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { envi, envValidator, isFileMimeValid, t } from "./utils";
import middleware from "i18next-http-middleware";
import i18next from "./modules/i18n/i18n";
import bodyParser from "body-parser";
import { responses } from "./utils/responses.util";
import { dataSource } from "./modules/db/datasource";
import { SeederEntity } from "./modules/db/entities/seeder.entity";
import { validateInput_Register } from "./router/v1/membership/validator/register.validator";
import { multerStorageCfg } from "./modules/file/multer.config";
import multer from "multer";
import { indexRouter } from "./router";

export const app = express();
envValidator(envi);

app.use(helmet());
app.use(bodyParser.json());

app.use(middleware.handle(i18next));
app.use(
  cors({
    origin: envi.WHITELIST?.split(" "),
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response): any => {
  return responses.res200(req, res, null, "nutech recruitment take home test");
});

app.use(indexRouter);
