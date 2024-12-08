"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const i18n_1 = __importDefault(require("./modules/i18n/i18n"));
const body_parser_1 = __importDefault(require("body-parser"));
const responses_util_1 = require("./utils/responses.util");
const router_1 = require("./router");
exports.app = (0, express_1.default)();
(0, utils_1.envValidator)(utils_1.envi);
exports.app.use((0, helmet_1.default)());
exports.app.use(body_parser_1.default.json());
exports.app.use(i18next_http_middleware_1.default.handle(i18n_1.default));
exports.app.use((0, cors_1.default)({
    origin: (_a = utils_1.envi.WHITELIST) === null || _a === void 0 ? void 0 : _a.split(" "),
    credentials: true,
}));
exports.app.get("/", (req, res) => {
    return responses_util_1.responses.res200(req, res, null, "nutech recruitment take home test");
});
exports.app.use(router_1.indexRouter);
// app.post(
//   "/a",
//   validateInput_Register,
//   async (req: Request, res: Response): Promise<any> => {
//     const x = await dataSource.manager.transaction(async (t) => {
//       return await t.find(SeederEntity);
//     });
//     return responses.res200(
//       req,
//       res,
//       null,
//       "nutech recruitment take home test"
//     );
//   }
// );
