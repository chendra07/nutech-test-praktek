"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpPostRegister = httpPostRegister;
const responses_util_1 = require("../../../utils/responses.util");
async function httpPostRegister(req, res) {
    const { email, password } = req.body;
    return responses_util_1.responses.res200(req, res, {
        token: "hehe accessToken",
    }, "User data created");
    // sequelizeCfg
    //   .transaction(async (t) => {
    //   })
    //   .catch((error) => {
    //     return responses.res500(req, res, null, error.toString());
    //   });
}
