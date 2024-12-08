"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = createFile;
const uuid_1 = require("uuid");
async function createFile({ original_name, path, source }, t) {
    const uuid = (0, uuid_1.v4)();
    await t.query(`INSERT INTO "file" (id, path, source, original_name) VALUES ($1, $2, $3, $4)`, [uuid, path, source, original_name]);
    return {
        id: uuid,
        path,
        source,
        original_name,
    };
}
