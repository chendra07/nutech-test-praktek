import { Request, Response } from "express";
import {
  updateUserById,
  UserEntityType,
} from "../../../modules/user/user.service";
import { responses } from "../../../utils/responses.util";
import {
  createTransactionPayment,
  createTransactionTopUp,
  findAllTransaction,
} from "../../../modules/transaction/transaction.service";
import { BodyTopUpType } from "./validator/topup.validator";
import { dataSource } from "../../../modules/db/datasource";
import { BodyPurchaseType } from "./validator/trxPurchase.validator";
import { findOnePPOBServiceByServCode } from "../../../modules/ppobService/PPOBService.service";
import { t } from "../../../utils";
import { QueryHistoryPaginationType } from "./validator/trxHistory.validator";

const numToIdr = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export async function httpGetAmount(req: Request, res: Response): Promise<any> {
  const user = (req as any).user as UserEntityType;

  return responses.res200(req, res, {
    amount: user.amount,
  });
}

export async function httpPostTopUp(req: Request, res: Response): Promise<any> {
  const user = (req as any).user as UserEntityType;
  const body = req.body as BodyTopUpType;

  return await dataSource.manager.transaction(async (t) => {
    await createTransactionTopUp(user, body.top_up_amount, t);

    const updatedUser = await updateUserById(
      {
        user: {
          ...user,
          amount: user.amount + body.top_up_amount,
        },
        file: null,
      },
      t
    );

    return responses.res200(req, res, { balance: updatedUser.amount });
  });
}

export async function httpPostPayment(
  req: Request,
  res: Response
): Promise<any> {
  const user = (req as any).user as UserEntityType;
  const body = req.body as BodyPurchaseType;

  const ppobService = await findOnePPOBServiceByServCode(body.service_code);

  if (!ppobService) {
    return responses.res404(
      req,
      res,
      null,
      t("property.ppob_service.service_code", null, req)
    );
  }

  const newAmount = user.amount - ppobService.service_tariff;

  if (newAmount < 0) {
    return responses.res409(
      req,
      res,
      null,
      t(
        "response.not_enough_balance",
        {
          amount: numToIdr.format(user.amount),
          service_tariff: numToIdr.format(ppobService.service_tariff),
        },
        req
      )
    );
  }

  return await dataSource.manager.transaction(async (trx) => {
    await createTransactionPayment(user, ppobService, trx);

    const updatedUser = await updateUserById(
      {
        user: {
          ...user,
          amount: newAmount,
        },
        file: null,
      },
      trx
    );

    return responses.res200(req, res, { balance: updatedUser.amount });
  });
}

export async function httpGetTransactionHistory(
  req: Request,
  res: Response
): Promise<any> {
  const user = (req as any).user as UserEntityType;
  const query = req.query as unknown as QueryHistoryPaginationType;
  const result = await findAllTransaction(user, query);

  return responses.res200(req, res, result);
}
