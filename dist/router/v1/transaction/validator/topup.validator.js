"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput_TopUp = validateInput_TopUp;
const zod_1 = require("zod");
const utils_1 = require("../../../../utils");
const responses_util_1 = require("../../../../utils/responses.util");
const numToIdr = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
});
function validateInput_TopUp(req, res, next) {
    const zodBodyTopUp = zod_1.z.object({
        top_up_amount: zod_1.z
            .number({
            message: (0, utils_1.t)("class_validator.is_not_empty", {
                property: (0, utils_1.t)("property.transaction.top_up_amount", null, req),
            }, req),
        })
            .min(1000, {
            message: (0, utils_1.t)("class_validator.min", {
                property: (0, utils_1.t)("property.transaction.top_up_amount", null, req),
                min: numToIdr.format(1000),
            }, req),
        })
            .max(10000000, {
            message: (0, utils_1.t)("class_validator.max", {
                property: (0, utils_1.t)("property.transaction.top_up_amount", null, req),
                min: numToIdr.format(10000000),
            }, req),
        }),
    });
    const verifyZod = zodBodyTopUp.safeParse(req.body);
    if (!verifyZod.success) {
        const translatedErrors = (0, utils_1.extractZodError)(verifyZod.error);
        return responses_util_1.responses.res400(req, res, null, translatedErrors);
    }
    next();
}
