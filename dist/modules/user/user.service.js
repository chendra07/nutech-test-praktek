"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneUserById = findOneUserById;
exports.findOneUserByEmail = findOneUserByEmail;
exports.createUser = createUser;
exports.updateUserById = updateUserById;
const utils_1 = require("../../utils");
const datasource_1 = require("../db/datasource");
const uuid_1 = require("uuid");
async function findOneUserById(id) {
    const user = await datasource_1.dataSource.manager.query(`SELECT u.*, f.path as profile_image FROM "user" u left join "file" f on u.file_id = f.id WHERE u.id = $1`, [id]);
    return user[0];
}
async function findOneUserByEmail(email) {
    const user = await datasource_1.dataSource.manager.query(`SELECT u.*, f.path as profile_image FROM "user" u left join "file" f on u.file_id = f.id WHERE u.email = $1`, [email]);
    return user[0];
}
async function createUser({ email, first_name, last_name, password }, t) {
    const uuid = (0, uuid_1.v4)();
    const hash = (0, utils_1.hashPassword)(password);
    await t.query(`INSERT INTO "user" (id, email, password, first_name, last_name, amount, file_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [uuid, email, hash, first_name, last_name, 0, null]);
    return {
        id: uuid,
        email,
        password: hash,
        first_name,
        last_name,
        amount: 0,
        file_id: null,
    };
}
async function updateUserById(input, t) {
    const { user, file } = input;
    await t.query(`UPDATE "user" SET "password" = $1, "first_name" = $2, "last_name" = $3, "amount" = $4, "file_id" = $5 WHERE id = $6`, [
        user.password,
        user.first_name,
        user.last_name,
        user.amount,
        (file === null || file === void 0 ? void 0 : file.id) || (user === null || user === void 0 ? void 0 : user.file_id),
        user.id,
    ]);
    return Object.assign(Object.assign({}, user), { profile_image: file === null || file === void 0 ? void 0 : file.path });
}
