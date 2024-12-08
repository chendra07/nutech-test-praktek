"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nIsUUID = I18nIsUUID;
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
const translation_util_1 = require("./translation.util");
function I18nIsUUID(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isUUID",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return (0, uuid_1.validate)(value);
                },
                defaultMessage(args) {
                    return (0, translation_util_1.t)("class_validator.Is_UUID", args);
                },
            },
        });
    };
}
