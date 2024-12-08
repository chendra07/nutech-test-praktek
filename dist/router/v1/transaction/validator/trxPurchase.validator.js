"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput_Purchase = validateInput_Purchase;
const zod_1 = require("zod");
const utils_1 = require("../../../../utils");
const responses_util_1 = require("../../../../utils/responses.util");
function validateInput_Purchase(req, res, next) {
    const zodBodyPurchase = zod_1.z.object({
        service_code: zod_1.z
            .string({
            message: (0, utils_1.t)("class_validator.is_not_empty", {
                property: (0, utils_1.t)("property.transaction.service_code", null, req),
            }, req),
        })
            .min(1, {
            message: (0, utils_1.t)("class_validator.is_not_empty", {
                property: (0, utils_1.t)("property.transaction.service_code", null, req),
            }, req),
        }),
    });
    const verifyZod = zodBodyPurchase.safeParse(req.body);
    if (!verifyZod.success) {
        const translatedErrors = (0, utils_1.extractZodError)(verifyZod.error);
        return responses_util_1.responses.res400(req, res, null, translatedErrors);
    }
    next();
}
