"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery_HistoryPagination = validateQuery_HistoryPagination;
const zod_1 = require("zod");
const utils_1 = require("../../../../utils");
const responses_util_1 = require("../../../../utils/responses.util");
function validateQuery_HistoryPagination(req, res, next) {
    const zodQueryHistoryPagination = zod_1.z.object({
        limit: zod_1.z.preprocess((val) => Number(val), zod_1.z
            .number({
            message: (0, utils_1.t)("class_validator.is_not_empty", {
                property: (0, utils_1.t)("property.pagination.limit", null, req),
            }, req),
        })
            .min(1, {
            message: (0, utils_1.t)("class_validator.is_not_empty", {
                property: (0, utils_1.t)("property.pagination.limit", null, req),
            }, req),
        })
            .max(100, {
            message: (0, utils_1.t)("class_validator.max", {
                property: (0, utils_1.t)("property.pagination.limit", null, req),
                max: 100,
            }, req),
        })),
        offset: zod_1.z.preprocess((val) => Number(val), zod_1.z
            .number({
            message: (0, utils_1.t)("class_validator.is_not_empty", {
                property: (0, utils_1.t)("property.pagination.offset", null, req),
            }, req),
        })
            .min(0, {
            message: (0, utils_1.t)("class_validator.is_not_empty", {
                property: (0, utils_1.t)("property.pagination.offset", null, req),
            }, req),
        })),
    });
    console.log(req.query);
    const verifyZod = zodQueryHistoryPagination.safeParse(req.query);
    if (!verifyZod.success) {
        const translatedErrors = (0, utils_1.extractZodError)(verifyZod.error);
        return responses_util_1.responses.res400(req, res, null, translatedErrors);
    }
    next();
}
