import { z } from "zod";
import { extractZodError, t } from "../../../../utils";
import { NextFunction, Request, Response } from "express";
import { responses } from "../../../../utils/responses.util";

export type QueryHistoryPaginationType = {
  limit: number;
  offset: number;
};

export function validateQuery_HistoryPagination(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const zodQueryHistoryPagination = z.object({
    limit: z
      .number({
        message: t(
          "class_validator.is_not_empty",
          {
            property: t("property.pagination.limit", null, req),
          },
          req
        ),
      })
      .min(1, {
        message: t(
          "class_validator.is_not_empty",
          {
            property: t("property.pagination.limit", null, req),
          },
          req
        ),
      })
      .max(100, {
        message: t(
          "class_validator.max",
          {
            property: t("property.pagination.limit", null, req),
            max: 100,
          },
          req
        ),
      }),
    offset: z
      .number({
        message: t(
          "class_validator.is_not_empty",
          {
            property: t("property.pagination.offset", null, req),
          },
          req
        ),
      })
      .min(0, {
        message: t(
          "class_validator.is_not_empty",
          {
            property: t("property.pagination.offset", null, req),
          },
          req
        ),
      }),
  });

  const verifyZod = zodQueryHistoryPagination.safeParse(req.query);

  if (!verifyZod.success) {
    const translatedErrors = extractZodError(verifyZod.error);
    return responses.res400(req, res, null, translatedErrors);
  }

  next();
}
