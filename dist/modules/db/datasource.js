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
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("../../utils");
const seeder_entity_1 = require("./entities/seeder.entity");
const _1733587750277_firstInit_1 = require("./migration/1733587750277-firstInit");
const user_entity_1 = require("../user/entities/user.entity");
const file_entity_1 = require("../file/entities/file.entity");
const banner_entity_1 = require("../banner/entities/banner.entity");
const ppobService_entity_1 = require("../ppobService/entities/ppobService.entity");
const transaction_entity_1 = require("../transaction/entities/transaction.entity");
const _1733641634112_setupAllTable_1 = require("./migration/1733641634112-setupAllTable");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const dataSourceOption = {
    type: "postgres",
    host: utils_1.envi.DB_HOST,
    port: utils_1.envi.DB_PORT,
    username: utils_1.envi.DB_USERNAME,
    password: utils_1.envi.DB_PASSWORD,
    database: utils_1.envi.DB_NAME,
    entities: [
        seeder_entity_1.SeederEntity,
        user_entity_1.UserEntity,
        file_entity_1.FileEntity,
        banner_entity_1.BannerEntity,
        ppobService_entity_1.PPOBServiceEntity,
        transaction_entity_1.TransactionEntity,
    ],
    migrations: [_1733587750277_firstInit_1.FirstInit1733587750277, _1733641634112_setupAllTable_1.SetupAllTable1733641634112],
    extra: {
        connectionLimit: 3,
        ssl: {
            ca: fs.readFileSync(path.join(process.cwd(), "ap-southeast-2-bundle.pem")),
        },
    },
};
exports.dataSource = new typeorm_1.DataSource(dataSourceOption);
