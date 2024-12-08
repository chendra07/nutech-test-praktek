import { Request, Response } from "express";
import { responses } from "../../../utils/responses.util";
import { BodyRegisterType } from "./validator/register.validator";

export async function httpPostRegister(req: Request, res: Response) {
  const { email, password } = req.body as BodyRegisterType;

  return responses.res200(
    req,
    res,
    {
      token: "hehe accessToken",
    },
    "User data created"
  );

  // sequelizeCfg
  //   .transaction(async (t) => {
  //   })
  //   .catch((error) => {
  //     return responses.res500(req, res, null, error.toString());
  //   });
}
