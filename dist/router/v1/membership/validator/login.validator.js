"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput_Login = validateInput_Login;
const zod_1 = require("zod");
const utils_1 = require("../../../../utils");
const responses_util_1 = require("../../../../utils/responses.util");
function validateInput_Login(req, res, next) {
    const zodBodyLogin = zod_1.z.object({
        email: zod_1.z
            .string({
            message: (0, utils_1.t)("class_validator.is_not_empty", { property: (0, utils_1.t)("property.user.email", null, req) }, req),
        })
            .min(1, {
            message: (0, utils_1.t)("class_validator.is_not_empty", { property: (0, utils_1.t)("property.user.email", null, req) }, req),
        })
            .email({
            message: (0, utils_1.t)("class_validator.is_email", null, req),
        })
            .max(50, {
            message: (0, utils_1.t)("class_validator.max", { property: (0, utils_1.t)("property.user.email", null, req), max: 50 }, req),
        }),
        password: zod_1.z
            .string({
            message: (0, utils_1.t)("class_validator.is_not_empty", {
                property: (0, utils_1.t)("property.user.password", null, req),
            }, req),
        })
            .min(8, {
            message: (0, utils_1.t)("class_validator.min", {
                property: (0, utils_1.t)("property.user.password", null, req),
                min: 8,
            }, req),
        }),
    });
    const verifyZod = zodBodyLogin.safeParse(req.body);
    if (!verifyZod.success) {
        const translatedErrors = (0, utils_1.extractZodError)(verifyZod.error);
        return responses_util_1.responses.res400(req, res, null, translatedErrors);
    }
    const { password } = req.body;
    if (!(0, utils_1.passwordValidator)(password)) {
        return responses_util_1.responses.res400(req, res, null, (0, utils_1.t)("class_validator.strong_password", { property: (0, utils_1.t)("property.user.password", null, req) }, req));
    }
    next();
}