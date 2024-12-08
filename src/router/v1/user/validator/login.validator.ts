import { z } from "zod";
import { extractZodError, passwordValidator, t } from "../../../../utils";
import { NextFunction, Request, Response } from "express";
import { responses } from "../../../../utils/responses.util";

export type BodyLoginType = {
  email: string;
  password: string;
};

export function validateInput_Login(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const zodBodyLogin = z.object({
    email: z
      .string({
        message: t(
          "class_validator.is_not_empty",
          { property: t("property.user.email", null, req) },
          req
        ),
      })
      .min(1, {
        message: t(
          "class_validator.is_not_empty",
          { property: t("property.user.email", null, req) },
          req
        ),
      })
      .email({
        message: t("class_validator.is_email", null, req),
      })
      .max(50, {
        message: t(
          "class_validator.max",
          { property: t("property.user.email", null, req), max: 50 },
          req
        ),
      }),
    password: z
      .string({
        message: t(
          "class_validator.is_not_empty",
          {
            property: t("property.user.password", null, req),
          },
          req
        ),
      })
      .min(8, {
        message: t(
          "class_validator.min",
          {
            property: t("property.user.password", null, req),
            min: 8,
          },
          req
        ),
      }),
  });

  const verifyZod = zodBodyLogin.safeParse(req.body);

  if (!verifyZod.success) {
    const translatedErrors = extractZodError(verifyZod.error);
    return responses.res400(req, res, null, translatedErrors);
  }

  const { password } = req.body as BodyLoginType;

  if (!passwordValidator(password)) {
    return responses.res400(
      req,
      res,
      null,
      t(
        "class_validator.strong_password",
        { property: t("property.user.password", null, req) },
        req
      )
    );
  }

  next();
}
