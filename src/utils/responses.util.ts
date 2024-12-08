import { Request, Response } from "express";
import { t } from "./translation.util";
import { TFunction } from "i18next";

//OK
function res200(
  req: Request,
  res: Response,
  body: any = null,
  message?: TFunction | string
) {
  return res.status(200).json({
    status: 200,
    message: t(
      "response.ok",
      { additionalMsg: message ? `: ${message}` : "." },
      req
    ),
    data: body,
  });
}

//Created
function res201(
  req: Request,
  res: Response,
  body: any = null,
  message?: TFunction | string
) {
  return res.status(201).json({
    status: 201,
    message: t(
      "response.created",
      {
        additionalMsg: message ? `: ${message}` : ".",
      },
      req
    ),
    data: body,
  });
}

//Bad Request
function res400(
  req: Request,
  res: Response,
  body: any = null,
  message?: TFunction | string
) {
  return res.status(400).json({
    status: 400,
    message: t(
      "response.badrequest",
      {
        additionalMsg: message ? `: ${message}` : ".",
      },
      req
    ),
    data: body,
  });
}

//Unauthorized
function res401(
  req: Request,
  res: Response,
  body: any = null,
  message?: TFunction | string
) {
  return res.status(401).json({
    status: 401,
    message: t(
      "response.unauthorized",
      {
        additionalMsg: message ? `: ${message}` : ".",
      },
      req
    ),
    data: body,
  });
}

//Forbidden
function res403(
  req: Request,
  res: Response,
  body: any = null,
  message?: TFunction | string
) {
  return res.status(403).json({
    status: 403,
    message: t(
      "response.forbidden",
      {
        additionalMsg: message ? `: ${message}` : ".",
      },
      req
    ),
    data: body,
  });
}

//Not Found
function res404(
  req: Request,
  res: Response,
  body: any = null,
  message?: TFunction | string
) {
  return res.status(404).json({
    status: 404,
    message: t(
      "response.not_found",
      { property: message ? `: ${message}` : "." },
      req
    ),
    data: body,
  });
}

//Conflict
function res409(
  req: Request,
  res: Response,
  body: any = null,
  message?: TFunction | string
) {
  return res.status(409).json({
    status: 409,
    message: t(
      "response.conflict",
      {
        additionalMsg: message ? `: ${message}` : ".",
      },
      req
    ),
    data: body,
  });
}

//Internal Server Error
function res500(
  req: Request,
  res: Response,
  body: any = null,
  message?: TFunction | string
) {
  return res.status(500).json({
    status: 500,
    message: t(
      "response.internal_server_error",
      {
        additionalMsg: message ? `: ${message}` : ".",
      },
      req
    ),
    data: body,
  });
}

export const responses = {
  res200,
  res201,
  res400,
  res401,
  res403,
  res404,
  res409,
  res500,
};
