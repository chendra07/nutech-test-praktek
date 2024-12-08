import { z } from "zod";
import { extractZodError, t } from "../../../../utils";
import { NextFunction, Request, Response } from "express";
import { responses } from "../../../../utils/responses.util";

export type BodyPurchaseType = {
  service_code: string;
};

export function validateInput_Purchase(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const zodBodyPurchase = z.object({
    service_code: z
      .string({
        message: t(
          "class_validator.is_not_empty",
          {
            property: t("property.transaction.service_code", null, req),
          },
          req
        ),
      })
      .min(1, {
        message: t(
          "class_validator.is_not_empty",
          {
            property: t("property.transaction.service_code", null, req),
          },
          req
        ),
      }),
  });

  const verifyZod = zodBodyPurchase.safeParse(req.body);

  if (!verifyZod.success) {
    const translatedErrors = extractZodError(verifyZod.error);
    return responses.res400(req, res, null, translatedErrors);
  }

  next();
}
