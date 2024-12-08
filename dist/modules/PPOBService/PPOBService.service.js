"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPPOBService = findAllPPOBService;
exports.findOnePPOBServiceByServCode = findOnePPOBServiceByServCode;
const datasource_1 = require("../db/datasource");
async function findAllPPOBService() {
    const result = await datasource_1.dataSource.manager.query(`SELECT p.service_code, p.service_name, p.service_tariff, f.path as banner_image FROM "ppob_service" p left join "file" f on p.file_id = f.id`, []);
    return result;
}
async function findOnePPOBServiceByServCode(serviceCode) {
    const result = await datasource_1.dataSource.manager.query(`SELECT * FROM "ppob_service" WHERE service_code = $1`, [serviceCode]);
    return result[0];
}
