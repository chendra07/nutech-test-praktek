import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { responses } from "../utils/responses.util";
import { envi, t } from "../utils";

export function validateAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return responses.res401(
      req,
      res,
      null,
      t("response.not_found", {
        variable: t("property.auth.auth_token"),
      })
    );
  }

  jwt.verify(token, envi.JWT_AUTH_SECRET!, (err, userData) => {
    if (err) {
      return responses.res403(
        req,
        res,
        null,
        t("general.error.invalid_credential")
      );
    }

    (req as any).userData = userData;
    next();
  });
}
