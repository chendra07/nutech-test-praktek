import { Request, Response } from "express";
import { UserEntityType } from "../../../modules/user/user.service";
import { responses } from "../../../utils/responses.util";

export async function httpGetAmount(req: Request, res: Response): Promise<any> {
  const user = (req as any).user as UserEntityType;

  return responses.res200(req, res, {
    amount: user.amount,
  });
}
