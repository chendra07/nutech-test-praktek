"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput_Register = validateInput_Register;
const zod_1 = require("zod");
const utils_1 = require("../../../../utils");
const responses_util_1 = require("../../../../utils/responses.util");
const zodBodyRegister = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, {
        message: (0, utils_1.t)("class_validator.is_not_empty"),
    })
        .email({
        message: (0, utils_1.t)("class_validator.is_email"),
    })
        .max(50, {
        message: (0, utils_1.t)("class_validator.too_long"),
    }),
    password: zod_1.z
        .string()
        .min(1, {
        message: (0, utils_1.t)("class_validator.is_not_empty"),
    })
        .min(8, {
        message: (0, utils_1.t)("class_validator.too_short"),
    }),
    first_name: zod_1.z
        .string()
        .min(1, {
        message: (0, utils_1.t)("class_validator.is_not_empty"),
    })
        .max(20, {
        message: (0, utils_1.t)("class_validator.too_long"),
    }),
    last_name: zod_1.z
        .string()
        .min(1, {
        message: (0, utils_1.t)("class_validator.is_not_empty"),
    })
        .max(20, {
        message: (0, utils_1.t)("class_validator.too_long"),
    }),
});
function validateInput_Register(req, res, next) {
    const verifyZod = zodBodyRegister.safeParse(req.body);
    if (!verifyZod.success) {
        const translatedErrors = (0, utils_1.translateZodError)(req, verifyZod.error);
        return responses_util_1.responses.res400(req, res, null, translatedErrors);
    }
    const { password } = req.body;
    if (!(0, utils_1.passwordValidator)(password)) {
        return responses_util_1.responses.res400(req, res, null, (0, utils_1.t)("class_validator.strong_password", { property: (0, utils_1.t)("property.user.password", {}, req) }, req));
    }
    next();
}
