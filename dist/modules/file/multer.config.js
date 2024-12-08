"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerStorageCfg = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
exports.multerStorageCfg = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const dir = path_1.default.join(process.cwd(), "/temp");
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, (0, utils_1.dateToUnix)() + "#" + (0, uuid_1.v4)() + path_1.default.extname(file.originalname));
    },
});
