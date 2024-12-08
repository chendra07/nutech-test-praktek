"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const app_1 = require("./app");
const datasource_1 = require("./modules/db/datasource");
async function startServer() {
    //run any async actions here (connect db, load csv files, etc.)
    await datasource_1.dataSource.initialize();
    app_1.app.listen(utils_1.envi.PORT, () => {
        console.log(`[server]: Server is running at ${utils_1.envi.BACKEND_BASEURL}:${utils_1.envi.PORT}`);
    });
}
startServer();
