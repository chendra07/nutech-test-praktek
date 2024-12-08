import { Seeder } from "@jorgebodega/typeorm-seeding";
import * as path from "path";
import { SeederEntity } from "../entities/seeder.entity";
import { DataSource } from "typeorm";
import { csvExtractor, hashPassword } from "../../../utils";

type CsvType = {
  service_code: string;
  service_name: string;
  file_id: string;
  service_tariff: number;
};

export default class PPOBServiceSeeder extends Seeder {
  name = "PPOBService";
  date = 1733647529;

  async run(dataSource: DataSource) {
    const seederRepo = dataSource
      .createEntityManager()
      .getRepository(SeederEntity);

    const latestSeed = await seederRepo.findOne({
      where: {
        name: this.name,
      },
    });

    if (latestSeed?.date >= this.date) {
      return;
    }

    try {
      const filePath = path.join(process.cwd(), "assets/ppob_menu.csv");

      const extractedCsv: CsvType[] = await csvExtractor(filePath, {
        separator: ",",
      });

      const values = [];
      const placeholders = extractedCsv
        .map((ppobServ, index) => {
          const startIndex = index * 4;
          values.push(
            ppobServ.service_code,
            ppobServ.service_name,
            +ppobServ.service_tariff,
            ppobServ.file_id
          );
          return `
          ($${startIndex + 1}, $${startIndex + 2}, $${startIndex + 3}, $${
            startIndex + 4
          })`;
        })
        .join(", ");

      await dataSource.manager.transaction(async (t) => {
        const query = ` INSERT INTO "ppob_service" (service_code, service_name, service_tariff, file_id) VALUES ${placeholders} `;
        await t.query(query, values);
      });

      await seederRepo.save({
        name: this.name,
        date: this.date,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
