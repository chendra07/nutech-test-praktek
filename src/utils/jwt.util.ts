/* eslint-disable @typescript-eslint/no-unused-vars */
import * as jwt from "jsonwebtoken";
import { envi } from "./environment.util";

export type JWTType = {
  userId: string;
  idToken: string;
  iat?: number;
  exp?: number;
};

export type RefreshTokenJson = {
  idAuthToken: string;
  idRefreshToken: string;
};

export function generateAuthToken(data: JWTType) {
  return jwt.sign(data, envi.JWT_AUTH_SECRET, {
    algorithm: "HS256",
    expiresIn: envi.JWT_AUTH_EXPIRE,
  });
}

export function generateRefreshToken(data: JWTType) {
  return jwt.sign(data, envi.JWT_REFRESH_SECRET, {
    algorithm: "HS256",
    expiresIn: envi.JWT_REFRESH_EXPIRE,
  });
}

// export function generateEmailToken(data: JWTType) {
//   return jwt.sign(data, envi.JWT_EMAIL_SECRET, {
//     algorithm: 'HS256',
//     expiresIn: envi.JWT_EMAIL_EXPIRE,
//   });
// }

// export function generatePasswordToken(data: JWTType) {
//   return jwt.sign(data, envi.JWT_PASSWORD_SECRET, {
//     algorithm: 'HS256',
//     expiresIn: envi.JWT_PASSWORD_EXPIRE,
//   });
// }

export async function verifyAndExtractJWT(secret: string, token: string) {
  return (await new Promise((resolve, _) => {
    jwt.verify(token, secret, (err, extractedToken: JWTType) => {
      if (err) {
        resolve(null);
      }

      if (!extractedToken?.userId || !extractedToken?.idToken) {
        resolve(null);
      }

      resolve(extractedToken);
    });
  })) as JWTType;
}
