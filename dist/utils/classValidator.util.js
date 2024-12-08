"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMiddleware = validateMiddleware;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateMiddleware(type) {
    return (req, res, next) => {
        console.log("Hi");
        const dto = (0, class_transformer_1.plainToInstance)(type, req === null || req === void 0 ? void 0 : req.body);
        console.log("hi");
        (0, class_validator_1.validate)(dto).then((errors) => {
            console.log(errors);
            if (errors.length > 0) {
                const errorMessages = errors.map((err) => {
                    return Object.values(err.constraints || {}).join(", ");
                });
                return res.status(400).json({ errors: errorMessages });
            }
            else {
                next();
            }
        });
    };
}
