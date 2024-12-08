"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionTopUp = createTransactionTopUp;
exports.createTransactionPayment = createTransactionPayment;
exports.findAllTransaction = findAllTransaction;
const datasource_1 = require("../db/datasource");
const uuid_1 = require("uuid");
async function createTransactionTopUp(user, amount, t) {
    const uuid = (0, uuid_1.v4)();
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
    };
}
async function createTransactionPayment(user, ppobService, t) {
    const uuid = (0, uuid_1.v4)();
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
    };
}
async function findAllTransaction(user, { limit, offset }) {
    const query = `SELECT * FROM "transaction" WHERE user_id = $1 ORDER BY created_on DESC LIMIT $2 OFFSET $3`;
    const result = await datasource_1.dataSource.manager.query(query, [
        user.id,
        limit,
        offset,
    ]);
    return result;
}
