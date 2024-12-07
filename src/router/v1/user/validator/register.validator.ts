import { z } from "zod";
import { passwordValidator, t, translateZodError } from "../../../../utils";
import { NextFunction, Request, Response } from "express";
import { responses } from "../../../../utils/responses.util";

const zodBodyRegister = z.object({
  email: z
    .string()
    .min(1, {
      message: t("class_validator.is_not_empty"),
    })
    .email({
      message: t("class_validator.is_email"),
    })
    .max(50, {
      message: t("class_validator.too_long"),
    }),
  password: z
    .string()
    .min(1, {
      message: t("class_validator.is_not_empty"),
    })
    .min(8, {
      message: t("class_validator.too_short"),
    }),
  first_name: z
    .string()
    .min(1, {
      message: t("class_validator.is_not_empty"),
    })
    .max(20, {
      message: t("class_validator.too_long"),
    }),
  last_name: z
    .string()
    .min(1, {
      message: t("class_validator.is_not_empty"),
    })
    .max(20, {
      message: t("class_validator.too_long"),
    }),
});

export type BodyRegisterType = z.infer<typeof zodBodyRegister>;

export function validateInput_Register(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const verifyZod = zodBodyRegister.safeParse(req.body);

  if (!verifyZod.success) {
    const translatedErrors = translateZodError(req, verifyZod.error);
    return responses.res400(req, res, null, translatedErrors);
  }

  const { password } = req.body as BodyRegisterType;

  if (!passwordValidator(password)) {
    return responses.res400(
      req,
      res,
      null,
      t(
        "class_validator.strong_password",
        { property: t("property.user.password", {}, req) },
        req
      )
    );
  }

  next();
}
