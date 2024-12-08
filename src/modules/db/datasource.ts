import { DataSource, DataSourceOptions } from "typeorm";
import { envi } from "../../utils";
import { SeederEntity } from "./entities/seeder.entity";
import { FirstInit1733587750277 } from "./migration/1733587750277-firstInit";
import { UserEntity } from "../user/entities/user.entity";
import { FileEntity } from "../file/entities/file.entity";
import { BannerEntity } from "../banner/entities/banner.entity";
import { TransactionEntity } from "../transaction/entities/transaction.entity";
import { SetupAllTable1733641634112 } from "./migration/1733641634112-setupAllTable";
import * as fs from "fs";
import * as path from "path";
import { PPOBServiceEntity } from "../ppobService/entities/PPOBService.entity";

const dataSourceOption: DataSourceOptions = {
  type: "postgres",
  host: envi.DB_HOST,
  port: envi.DB_PORT,
  username: envi.DB_USERNAME,
  password: envi.DB_PASSWORD,
  database: envi.DB_NAME,
  entities: [
    SeederEntity,
    UserEntity,
    FileEntity,
    BannerEntity,
    PPOBServiceEntity,
    TransactionEntity,
  ],
  migrations: [FirstInit1733587750277, SetupAllTable1733641634112],
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
