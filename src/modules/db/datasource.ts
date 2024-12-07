import { DataSource, DataSourceOptions } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import { envi } from "../../utils";

const dataSourceOption: DataSourceOptions = {
  type: "postgres",
  host: envi.DB_HOST,
  port: envi.DB_PORT,
  username: envi.DB_USERNAME,
  password: envi.DB_PASSWORD,
  database: envi.DB_NAME,
  entities: [],
  migrations: [],
  extra: {
    connectionLimit: 3,
    ssl: {
      ca: fs.readFileSync(
        path.join(process.cwd(), "ap-southeast-2-bundle.pem")
      ),
    },
  },
};

export const dataSource = new DataSource(dataSourceOption);
