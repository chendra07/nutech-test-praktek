import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { responses } from "../utils/responses.util";
import { envi, JWTType, t } from "../utils";
import { dataSource } from "../modules/db/datasource";
import { findOneUserById } from "../modules/user/user.service";

export async function validateAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return responses.res401(
      req,
      res,
      null,
      t(
        "response.not_found",
        {
          property: t("property.auth.auth_token", null, req),
        },
        req
      )
    );
  }

  const userData: any = await new Promise((resolve, reject) => {
    jwt.verify(token, envi.JWT_AUTH_SECRET!, (err, userData) => {
      if (err) {
        reject(null);
      }
      resolve(userData as any);
    });
  }).catch((_) => null);

  if (!userData) {
    return responses.res401(
      req,
      res,
      null,
      t("general.error.invalid_credential", null, req)
    );
  }

  const user = await findOneUserById(userData.id);

  if (!user) {
    responses.res401(
      req,
      res,
      null,
      t(
        "response.not_found",
        {
          property: t("property.auth.auth_token", null, req),
        },
        req
      )
    );
  }

  (req as any).user = user;
  next();
}
