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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpPostRegister = httpPostRegister;
exports.httpPostLogin = httpPostLogin;
exports.httpGetProfile = httpGetProfile;
exports.httpPutUpdate = httpPutUpdate;
exports.httpPutUpdateProfileImage = httpPutUpdateProfileImage;
const responses_util_1 = require("../../../utils/responses.util");
const user_service_1 = require("../../../modules/user/user.service");
const utils_1 = require("../../../utils");
const datasource_1 = require("../../../modules/db/datasource");
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = require("../../../modules/file/multer.config");
const path = __importStar(require("path"));
const cloudinary_service_1 = require("../../../modules/cloudinary/cloudinary.service");
const file_service_1 = require("../../../modules/file/file.service");
async function httpPostRegister(req, res) {
    const body = req.body;
    const foundAnotherUser = await (0, user_service_1.findOneUserByEmail)(body.email.trim());
    if (foundAnotherUser) {
        return responses_util_1.responses.res409(req, res, null, (0, utils_1.t)("general.error.already_exists", {
            property: (0, utils_1.t)("property.user.email", null, req),
        }, req));
    }
    return await datasource_1.dataSource.manager.transaction(async (trx) => {
        await (0, user_service_1.createUser)(body, trx);
        return responses_util_1.responses.res200(req, res, null, (0, utils_1.t)("general.info.created", {
            property: (0, utils_1.t)("property.user.user", null, req),
        }, req));
    });
}
async function httpPostLogin(req, res) {
    const body = req.body;
    const user = await (0, user_service_1.findOneUserByEmail)(body.email.trim());
    if (!user) {
        return responses_util_1.responses.res401(req, res, null, (0, utils_1.t)("general.error.invalid_credential", null, req));
    }
    if (!(0, utils_1.isPasswordMatch)(body.password, user.password)) {
        return responses_util_1.responses.res401(req, res, null, (0, utils_1.t)("general.error.invalid_credential", null, req));
    }
    const authToken = (0, utils_1.generateAuthToken)({
        id: user.id,
        email: user.email,
    });
    return responses_util_1.responses.res200(req, res, {
        token: authToken,
    }, (0, utils_1.t)("general.info.success", {
        property: (0, utils_1.t)("property.general.login", null, req),
    }, req));
}
async function httpGetProfile(req, res) {
    const user = req.user;
    return responses_util_1.responses.res200(req, res, {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: user.profile_image,
    });
}
async function httpPutUpdate(req, res) {
    const oldUser = req.user;
    const body = req.body;
    return await datasource_1.dataSource.manager.transaction(async (trx) => {
        const user = await (0, user_service_1.updateUserById)({
            user: Object.assign(Object.assign({}, oldUser), { first_name: (body === null || body === void 0 ? void 0 : body.first_name) || oldUser.first_name, last_name: (body === null || body === void 0 ? void 0 : body.last_name) || oldUser.last_name }),
            file: null,
        }, trx);
        return responses_util_1.responses.res200(req, res, {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_image: user.profile_image,
        });
    });
}
const upload = (0, multer_1.default)({
    storage: multer_config_1.multerStorageCfg,
    limits: { fileSize: 1 * 1000 * 1000, files: 1 }, //1MB
}).single("file");
async function httpPutUpdateProfileImage(req, res) {
    await upload(req, res, async (_) => {
        const user = req.user;
        if (!(req === null || req === void 0 ? void 0 : req.file)) {
            return responses_util_1.responses.res400(req, res, {}, (0, utils_1.t)("class_validator.is_not_empty", {
                property: (0, utils_1.t)("property.user.profile_picture", null, req),
            }, req));
        }
        const isValid = (0, utils_1.isFileMimeValid)(req.file, [
            "image/png",
            "image/jpeg",
            "image/.png",
            "image/.jpeg",
        ]);
        if (!isValid) {
            return responses_util_1.responses.res400(req, res, {}, (0, utils_1.t)("general.error.accpet_specific_extension", {
                extensions: ["png", "jpeg"].join(", "),
            }));
        }
        const filePath = path.join("/temp", req.file.filename);
        const fileBuffer = await (0, utils_1.readFile)(filePath);
        const fileName = req.file.filename.split("#")[1];
        return await datasource_1.dataSource.manager.transaction(async (trx) => {
            const cloudinaryResponse = await (0, cloudinary_service_1.cloudinary_uploadFile)({
                fileBuffer,
                fileName: fileName,
                savePath: "nutech/profile",
            });
            const createdFile = await (0, file_service_1.createFile)({
                original_name: fileName,
                path: cloudinaryResponse.secure_url,
                source: "cloudinary",
            }, trx);
            const result = await (0, user_service_1.updateUserById)({
                user,
                file: createdFile,
            }, trx);
            await (0, utils_1.deleteFile)(filePath);
            return responses_util_1.responses.res200(req, res, {
                email: result.email,
                first_name: result.first_name,
                last_name: result.last_name,
                profile_image: result.profile_image,
            }, (0, utils_1.t)("general.info.updated", {
                property: (0, utils_1.t)("property.user.profile_picture", null, req),
            }, req));
        });
    });
}
