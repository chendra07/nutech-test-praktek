import { envi } from "./utils";
import { app } from "./app";

async function startServer() {
  //run any async actions here (connect db, load csv files, etc.)
  //   await openConnection();

  app.listen(envi.PORT, () => {
    console.log(
      `[server]: Server is running at ${envi.BACKEND_BASEURL}:${envi.PORT}`
    );
  });
}

startServer();
