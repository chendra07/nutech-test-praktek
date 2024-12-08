"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllBanner = findAllBanner;
const datasource_1 = require("../db/datasource");
async function findAllBanner() {
    const result = await datasource_1.dataSource.manager.query(`SELECT b.banner_name, b.description, f.path as banner_image FROM "banner" b left join "file" f on b.file_id = f.id`, []);
    return result;
}
