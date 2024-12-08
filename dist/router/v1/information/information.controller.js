"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetAllBanner = httpGetAllBanner;
exports.httpGetAllPPOBService = httpGetAllPPOBService;
const banner_service_1 = require("../../../modules/banner/banner.service");
const responses_util_1 = require("../../../utils/responses.util");
const PPOBService_service_1 = require("../../../modules/ppobService/PPOBService.service");
async function httpGetAllBanner(req, res) {
    const result = await (0, banner_service_1.findAllBanner)();
    return responses_util_1.responses.res200(req, res, result);
}
async function httpGetAllPPOBService(req, res) {
    const result = await (0, PPOBService_service_1.findAllPPOBService)();
    return responses_util_1.responses.res200(req, res, result);
}
