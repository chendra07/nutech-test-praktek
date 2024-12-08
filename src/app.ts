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

app.post(
  "/a",
  validateInput_Register,
  async (req: Request, res: Response): Promise<any> => {
    const x = await dataSource.manager.transaction(async (t) => {
      return await t.find(SeederEntity);
    });

    return responses.res200(
      req,
      res,
      null,
      "nutech recruitment take home test"
    );
  }
);

const upload = multer({
  storage: multerStorageCfg,
  limits: { fileSize: 1 * 1000 * 1000 },
}).single("file");

app.post("/image", async (req: Request, res: Response): Promise<any> => {
  upload(req, res, (_: any) => {
    if (!req?.file) {
      return responses.res400(
        req,
        res,
        {},
        t(
          "class_validator.is_not_empty",
          {
            property: t("property.user.profile_picture", null, req),
          },
          req
        )
      );
    }

    const isValid = isFileMimeValid(req.file, [
      "image/png",
      "image/jpeg",
      "image/.png",
      "image/.jpeg",
    ]);

    if (!isValid) {
      return responses.res400(
        req,
        res,
        {},
        t("general.error.accpet_specific_extension", {
          extensions: ["png", "jpeg"].join(", "),
        })
      );
    }

    return responses.res200(req, res, null);
  });
});
