import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { envi, envValidator, t } from "./utils";
import middleware from "i18next-http-middleware";
import i18next from "./modules/i18n/i18n";
import bodyParser from "body-parser";
import { responses } from "./utils/responses.util";
import { dataSource } from "./modules/db/datasource";
import { SeederEntity } from "./modules/db/entities/seeder.entity";

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

app.get("/", (req: Request, res: Response): any => {
  return responses.res200(req, res, null, "nutech recruitment take home test");
});

app.get("/a", async (req: Request, res: Response): Promise<any> => {
  const x = await dataSource.manager.transaction(async (t) => {
    return await t.find(SeederEntity);
  });
  console.log(x);

  return responses.res200(req, res, null, "nutech recruitment take home test");
});
