"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetAmount = httpGetAmount;
exports.httpPostTopUp = httpPostTopUp;
exports.httpPostPayment = httpPostPayment;
exports.httpGetTransactionHistory = httpGetTransactionHistory;
const user_service_1 = require("../../../modules/user/user.service");
const responses_util_1 = require("../../../utils/responses.util");
const transaction_service_1 = require("../../../modules/transaction/transaction.service");
const datasource_1 = require("../../../modules/db/datasource");
const PPOBService_service_1 = require("../../../modules/ppobService/PPOBService.service");
const utils_1 = require("../../../utils");
const numToIdr = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
});
async function httpGetAmount(req, res) {
    const user = req.user;
    return responses_util_1.responses.res200(req, res, {
        amount: user.amount,
    });
}
async function httpPostTopUp(req, res) {
    const user = req.user;
    const body = req.body;
    return await datasource_1.dataSource.manager.transaction(async (t) => {
        await (0, transaction_service_1.createTransactionTopUp)(user, body.top_up_amount, t);
        const updatedUser = await (0, user_service_1.updateUserById)({
            user: Object.assign(Object.assign({}, user), { amount: user.amount + body.top_up_amount }),
            file: null,
        }, t);
        return responses_util_1.responses.res200(req, res, { balance: updatedUser.amount });
    });
}
async function httpPostPayment(req, res) {
    const user = req.user;
    const body = req.body;
    const ppobService = await (0, PPOBService_service_1.findOnePPOBServiceByServCode)(body.service_code);
    if (!ppobService) {
        return responses_util_1.responses.res404(req, res, null, (0, utils_1.t)("property.ppob_service.service_code", null, req));
    }
    const newAmount = user.amount - ppobService.service_tariff;
    if (newAmount < 0) {
        return responses_util_1.responses.res409(req, res, null, (0, utils_1.t)("response.not_enough_balance", {
            amount: numToIdr.format(user.amount),
            service_tariff: numToIdr.format(ppobService.service_tariff),
        }, req));
    }
    return await datasource_1.dataSource.manager.transaction(async (trx) => {
        await (0, transaction_service_1.createTransactionPayment)(user, ppobService, trx);
        const updatedUser = await (0, user_service_1.updateUserById)({
            user: Object.assign(Object.assign({}, user), { amount: newAmount }),
            file: null,
        }, trx);
        return responses_util_1.responses.res200(req, res, { balance: updatedUser.amount });
    });
}
async function httpGetTransactionHistory(req, res) {
    const user = req.user;
    const query = req.query;
    const result = await (0, transaction_service_1.findAllTransaction)(user, query);
    return responses_util_1.responses.res200(req, res, result);
}
