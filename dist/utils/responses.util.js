"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = void 0;
const translation_util_1 = require("./translation.util");
//OK
function res200(req, res, body = null, message) {
    return res.status(200).json({
        status: 200,
        message: (0, translation_util_1.t)("response.ok", { additionalMsg: message ? `: ${message}` : "." }, req),
        data: body,
    });
}
//Created
function res201(req, res, body = null, message) {
    return res.status(201).json({
        status: 201,
        message: (0, translation_util_1.t)("response.created", {
            additionalMsg: message ? `: ${message}` : ".",
        }, req),
        data: body,
    });
}
//Bad Request
function res400(req, res, body = null, message) {
    return res.status(400).json({
        status: 400,
        message: (0, translation_util_1.t)("response.badrequest", {
            additionalMsg: message ? `: ${message}` : ".",
        }, req),
        data: body,
    });
}
//Unauthorized
function res401(req, res, body = null, message) {
    return res.status(401).json({
        status: 401,
        message: (0, translation_util_1.t)("response.unauthorized", {
            additionalMsg: message ? `: ${message}` : ".",
        }, req),
        data: body,
    });
}
//Forbidden
function res403(req, res, body = null, message) {
    return res.status(403).json({
        status: 403,
        message: (0, translation_util_1.t)("response.forbidden", {
            additionalMsg: message ? `: ${message}` : ".",
        }, req),
        data: body,
    });
}
//Not Found
function res404(req, res, body = null, message) {
    return res.status(404).json({
        status: 404,
        message: (0, translation_util_1.t)("response.not_found", { property: message ? `${message}` : "." }, req),
        data: body,
    });
}
//Conflict
function res409(req, res, body = null, message) {
    return res.status(409).json({
        status: 409,
        message: (0, translation_util_1.t)("response.conflict", {
            additionalMsg: message ? `: ${message}` : ".",
        }, req),
        data: body,
    });
}
//Internal Server Error
function res500(req, res, body = null, message) {
    return res.status(500).json({
        status: 500,
        message: (0, translation_util_1.t)("response.internal_server_error", {
            additionalMsg: message ? `: ${message}` : ".",
        }, req),
        data: body,
    });
}
exports.responses = {
    res200,
    res201,
    res400,
    res401,
    res403,
    res404,
    res409,
    res500,
};
