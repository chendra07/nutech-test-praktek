import { dataSource } from "../db/datasource";
import { v4 as uuidv4 } from "uuid";
import { UserEntityType } from "../user/user.service";
import { EntityManager } from "typeorm";
import { PPOBServiceEntityType } from "../ppobService/PPOBService.service";

export type TransactionEntityType = {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  user_id: string;
  service_code_id: string;
};

export async function createTransactionTopUp(
  user: UserEntityType,
  amount: number,
  t: EntityManager
) {
  const uuid = uuidv4();

  const query = ` INSERT INTO "transaction" (invoice_number, description, transaction_type, total_amount, service_code_id, user_id) VALUES ($1, $2, $3, $4, $5, $6)`;
  await t.query(query, [
    uuid,
    "Top Up balance",
    "TOPUP",
    amount,
    null,
    user.id,
  ]);

  return {
    invoice_number: uuid,
    description: "Top Up balance",
    transaction_type: "TOPUP",
    total_amount: amount,
    service_code_id: null,
    user_id: user.id,
  } as TransactionEntityType;
}

export async function createTransactionPayment(
  user: UserEntityType,
  ppobService: PPOBServiceEntityType,
  t: EntityManager
) {
  const uuid = uuidv4();

  const query = ` INSERT INTO "transaction" (invoice_number, description, transaction_type, total_amount, service_code_id, user_id) VALUES ($1, $2, $3, $4, $5, $6)`;
  await t.query(query, [
    uuid,
    ppobService.service_code,
    "PAYMENT",
    ppobService.service_tariff,
    ppobService.service_code,
    user.id,
  ]);

  return {
    invoice_number: uuid,
    description: ppobService.service_name,
    transaction_type: "PAYMENT",
    total_amount: ppobService.service_tariff,
    service_code_id: null,
    user_id: user.id,
  } as TransactionEntityType;
}

type TrxPagInput = { offset: number; limit: number };
export async function findAllTransaction(
  user: UserEntityType,
  { limit, offset }: TrxPagInput
) {
  const query = `SELECT * FROM "transaction" WHERE user_id = $1 ORDER BY created_on DESC LIMIT $2 OFFSET $3`;

  const result = await dataSource.manager.query(query, [
    user.id,
    limit,
    offset,
  ]);

  return result as TransactionEntityType[];
}
