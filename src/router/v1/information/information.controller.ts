import { Request, Response } from "express";
import { findAllBanner } from "../../../modules/banner/banner.service";
import { responses } from "../../../utils/responses.util";
import { findAllPPOBService } from "../../../modules/ppobService/ppobService.service";

export async function httpGetAllBanner(
  req: Request,
  res: Response
): Promise<any> {
  const result = await findAllBanner();

  return responses.res200(req, res, result);
}

export async function httpGetAllPPOBService(
  req: Request,
  res: Response
): Promise<any> {
  const result = await findAllPPOBService();

  return responses.res200(req, res, result);
}
