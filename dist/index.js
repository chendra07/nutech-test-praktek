"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const i18n_1 = __importDefault(require("./modules/i18n/i18n"));
const app = (0, express_1.default)();
(0, utils_1.envValidator)(utils_1.envi);
app.use((0, helmet_1.default)());
app.use(i18next_http_middleware_1.default.handle(i18n_1.default));
app.use((0, cors_1.default)({
    origin: (_a = utils_1.envi.WHITELIST) === null || _a === void 0 ? void 0 : _a.split(" "),
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("nutech recruitment test");
});
app.listen(utils_1.envi.PORT, () => {
    console.log(`[server]: Server is running at ${utils_1.envi.BACKEND_BASEURL}:${utils_1.envi.PORT}`);
});
