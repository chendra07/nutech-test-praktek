import { Seeder } from "@jorgebodega/typeorm-seeding";
import * as path from "path";
import { SeederEntity } from "../entities/seeder.entity";
import { DataSource } from "typeorm";
import { csvExtractor, hashPassword } from "../../../utils";

type CsvType = {
  id: string;
  banner_name: string;
  description: string;
  file_id: string;
};

export default class BannerSeeder extends Seeder {
  name = "banner";
  date = 1726937588;

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
      const filePath = path.join(process.cwd(), "assets/ppob_banner.csv");

      const extractedCsv: CsvType[] = await csvExtractor(filePath, {
        separator: ",",
      });

      const values = [];
      const placeholders = extractedCsv
        .map((banner, index) => {
          const startIndex = index * 4;
          values.push(
            banner.id,
            banner.banner_name,
            banner.description,
            banner.file_id
          );
          return `
          ($${startIndex + 1}, $${startIndex + 2}, $${startIndex + 3}, $${
            startIndex + 4
          })`;
        })
        .join(", ");

      await dataSource.manager.transaction(async (t) => {
        const query = ` INSERT INTO "banner" (id, banner_name, description, file_id) VALUES ${placeholders} `;
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
