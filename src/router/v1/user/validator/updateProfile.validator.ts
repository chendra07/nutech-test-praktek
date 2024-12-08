import { z } from "zod";
import { extractZodError, passwordValidator, t } from "../../../../utils";
import { NextFunction, Request, Response } from "express";
import { responses } from "../../../../utils/responses.util";

export type BodyUpdateProfileType = {
  first_name: string;
  last_name: string;
};

export function validateInput_UpdateProfile(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const zodBodyUpdateProfile = z.object({
    first_name: z
      .string({
        message: t(
          "class_validator.is_not_empty",
          {
            property: t("property.user.first_name", null, req),
          },
          req
        ),
      })
      .min(1, {
        message: t(
          "class_validator.is_not_empty",
          {
            property: t("property.user.first_name", null, req),
          },
          req
        ),
      })
      .max(20, {
        message: t(
          "class_validator.max",
          {
            property: t("property.user.first_name", null, req),
            max: 20,
          },
          req
        ),
      }),
    last_name: z
      .string({
        message: t(
          "class_validator.is_not_empty",
          { property: t("property.user.last_name", null, req) },
          req
        ),
      })
      .min(1, {
        message: t(
          "class_validator.is_not_empty",
          { property: t("property.user.last_name", null, req) },
          req
        ),
      })
      .max(20, {
        message: t(
          "class_validator.max",
          {
            property: t("property.user.last_name", null, req),
            max: 20,
          },
          req
        ),
      }),
  });

  const verifyZod = zodBodyUpdateProfile.safeParse(req.body);

  if (!verifyZod.success) {
    const translatedErrors = extractZodError(verifyZod.error);
    return responses.res400(req, res, null, translatedErrors);
  }

  next();
}
