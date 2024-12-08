"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput_UpdateProfile = validateInput_UpdateProfile;
const zod_1 = require("zod");
const utils_1 = require("../../../../utils");
const responses_util_1 = require("../../../../utils/responses.util");
function validateInput_UpdateProfile(req, res, next) {
    const zodBodyUpdateProfile = zod_1.z.object({
        first_name: zod_1.z
            .string({
            message: (0, utils_1.t)("class_validator.is_not_empty", {
                property: (0, utils_1.t)("property.user.first_name", null, req),
            }, req),
        })
            .min(1, {
            message: (0, utils_1.t)("class_validator.is_not_empty", {
                property: (0, utils_1.t)("property.user.first_name", null, req),
            }, req),
        })
            .max(20, {
            message: (0, utils_1.t)("class_validator.max", {
                property: (0, utils_1.t)("property.user.first_name", null, req),
                max: 20,
            }, req),
        }),
        last_name: zod_1.z
            .string({
            message: (0, utils_1.t)("class_validator.is_not_empty", { property: (0, utils_1.t)("property.user.last_name", null, req) }, req),
        })
            .min(1, {
            message: (0, utils_1.t)("class_validator.is_not_empty", { property: (0, utils_1.t)("property.user.last_name", null, req) }, req),
        })
            .max(20, {
            message: (0, utils_1.t)("class_validator.max", {
                property: (0, utils_1.t)("property.user.last_name", null, req),
                max: 20,
            }, req),
        }),
    });
    const verifyZod = zodBodyUpdateProfile.safeParse(req.body);
    if (!verifyZod.success) {
        const translatedErrors = (0, utils_1.extractZodError)(verifyZod.error);
        return responses_util_1.responses.res400(req, res, null, translatedErrors);
    }
    next();
}
