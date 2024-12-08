"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("@jorgebodega/typeorm-seeding");
const path = __importStar(require("path"));
const seeder_entity_1 = require("../entities/seeder.entity");
const utils_1 = require("../../../utils");
class UserSeeder extends typeorm_seeding_1.Seeder {
    constructor() {
        super(...arguments);
        this.name = "user";
        this.date = 1726282490;
    }
    async run(dataSource) {
        const seederRepo = dataSource
            .createEntityManager()
            .getRepository(seeder_entity_1.SeederEntity);
        const latestSeed = await seederRepo.findOne({
            where: {
                name: this.name,
            },
        });
        if ((latestSeed === null || latestSeed === void 0 ? void 0 : latestSeed.date) >= this.date) {
            return;
        }
        try {
            const filePath = path.join(process.cwd(), "assets/user.csv");
            const extractedCsv = await (0, utils_1.csvExtractor)(filePath, {
                separator: ",",
            });
            const values = [];
            const placeholders = extractedCsv
                .map((user, index) => {
                const startIndex = index * 7;
                values.push(user.id, user.email, (0, utils_1.hashPassword)(user.password), user.first_name, user.last_name, user.amount, null);
                return `($${startIndex + 1}, $${startIndex + 2}, $${startIndex + 3}, $${startIndex + 4}, $${startIndex + 5}, $${startIndex + 6}, $${startIndex + 7})`;
            })
                .join(", ");
            await dataSource.manager.transaction(async (t) => {
                const query = ` INSERT INTO "user" (id, email, password, first_name, last_name, amount, file_id) VALUES ${placeholders} `;
                await t.query(query, values);
            });
            await seederRepo.save({
                name: this.name,
                date: this.date,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = UserSeeder;
