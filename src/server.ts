import { envi } from "./utils";
import { app } from "./app";
import { dataSource } from "./modules/db/datasource";

async function startServer() {
  //run any async actions here (connect db, load csv files, etc.)
  await dataSource.initialize();

  app.listen(envi.PORT, () => {
    console.log(
      `[server]: Server is running at ${envi.BACKEND_BASEURL}:${envi.PORT}`
    );
  });
}

startServer();
