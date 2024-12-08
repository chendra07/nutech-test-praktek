import { z } from "zod";
import { extractZodError, t } from "../../../../utils";
import { NextFunction, Request, Response } from "express";
import { responses } from "../../../../utils/responses.util";

export type BodyTopUpType = {
  top_up_amount: number;
};

const numToIdr = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export function validateInput_TopUp(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const zodBodyTopUp = z.object({
    top_up_amount: z
      .number({
        message: t(
          "class_validator.is_not_empty",
          {
            property: t("property.transaction.top_up_amount", null, req),
          },
          req
        ),
      })
      .min(1000, {
        message: t(
          "class_validator.min",
          {
            property: t("property.transaction.top_up_amount", null, req),
            min: numToIdr.format(1000),
          },
          req
        ),
      })
      .max(10000000, {
        message: t(
          "class_validator.max",
          {
            property: t("property.transaction.top_up_amount", null, req),
            min: numToIdr.format(10000000),
          },
          req
        ),
      }),
  });

  const verifyZod = zodBodyTopUp.safeParse(req.body);

  if (!verifyZod.success) {
    const translatedErrors = extractZodError(verifyZod.error);
    return responses.res400(req, res, null, translatedErrors);
  }

  next();
}
