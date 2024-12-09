"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionTopUp = createTransactionTopUp;
exports.createTransactionPayment = createTransactionPayment;
exports.findAllTransaction = findAllTransaction;
const datasource_1 = require("../db/datasource");
const uuid_1 = require("uuid");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
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
    const result = (await datasource_1.dataSource.manager.query(query, [
        user.id,
        limit,
        offset,
    ]));
    const modifiedResult = (result === null || result === void 0 ? void 0 : result.length)
        ? result.map((_a) => {
            var { updated_on, deleted_on, created_on } = _a, rest = __rest(_a, ["updated_on", "deleted_on", "created_on"]);
            return (Object.assign(Object.assign({}, rest), { created_on: (0, moment_timezone_1.default)(created_on)
                    .tz("Asia/Jakarta")
                    .format("YYYY-MM-DD HH:mm:ss") }));
        })
        : [];
    return modifiedResult;
}
